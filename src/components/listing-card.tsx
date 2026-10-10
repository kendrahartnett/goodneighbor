import Link from "next/link";
import type { Opportunity } from "@prisma/client";

const categories: Record<string, string> = {
  FOOD_SECURITY: "Food & hunger", ENVIRONMENT: "Environment",
  YOUTH_COMMUNITY: "Youth & community", HOUSING_HEALTH: "Housing & health",
};

export function ListingCard({ item }: { item: Opportunity }) {
  return <article className="card">
    <span className="category-chip">{categories[item.category] ?? item.category.replaceAll("_", " ")}</span>
    <h2><Link href={`/opportunities/${item.slug}`}>{item.title}</Link></h2>
    <p className="card-organization">{item.organizationName}</p>
    <p className="card-summary">{item.summary}</p>
    <div className="card-bottom"><span className="card-location">{item.neighborhood} · {item.dateType === "ONGOING" ? "Ongoing" : item.dateType === "DATE_SPECIFIC" ? "Date specific" : "Next occurrence"}</span><span className="card-verified">Verified {item.verifiedAt.toLocaleDateString("en-US", { timeZone: "America/Chicago", month: "short", day: "numeric", year: "numeric" })}</span><span className="card-action" aria-hidden="true">View details ↗</span></div>
  </article>;
}
