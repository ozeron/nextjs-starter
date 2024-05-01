import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { pgTable, PgTableFn } from 'drizzle-orm/pg-core';
import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { db, mySchema } from "./db/schema";


// Will properly map table names
const useVoiceTable: PgTableFn = (tableName, columns, options) => {
  return mySchema.table(tableName, columns, options)
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, useVoiceTable),
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })],
  basePath: "/api/auth",
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized: ({ request: { nextUrl }, auth: midAuth }) => {
      const isLoggedIn = Boolean(midAuth?.user);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        // Redirect unauthenticated users to the login page
        return isLoggedIn;
      } else if (isLoggedIn) {
        // Redirect authenticated users to the dashboard
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Allow unauthenticated users to access other pages
      return true;
    },
  },
} satisfies NextAuthConfig);
