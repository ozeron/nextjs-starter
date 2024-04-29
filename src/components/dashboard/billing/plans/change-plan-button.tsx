import { Button } from "@lemonsqueezy/wedges";
import Link from "next/link";

export function ChangePlan({ planId }: { planId: number }) {
  return (
    <Button size="sm" variant="outline" asChild>
      <Link href={`/dashboard/billing/change-plans/${planId.toString()}`}>
        Change plan
      </Link>
    </Button>
  );
}
