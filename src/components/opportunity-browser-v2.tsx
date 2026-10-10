"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Opportunity } from "@prisma/client";
import { ListingCard } from "@/components/listing-card";

const categories = ["ALL", "FOOD_SECURITY", "ENVIRONMENT", "YOUTH_COMMUNITY", "HOUSING_HEALTH"] as const;
const timeTypes = ["ALL", "ONGOING", "DATE_SPECIFIC", "NEXT_OCCURRENCE"] as const;
const label = (value: string) => value === "ALL" ? "All" : value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());

export function OpportunityBrowserV2({ items }: { items: Opportunity[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "ALL");
  const [timeType, setTimeType] = useState(searchParams.get("time") ?? "ALL");
  const filtered = useMemo(() => items.filter((item) => {
    const matchesQuery = `${item.title} ${item.organizationName} ${item.neighborhood} ${item.summary}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "ALL" || item.category === category) && (timeType === "ALL" || item.dateType === timeType);
  }), [items, query, category, timeType]);
  function update(nextQuery = query, nextCategory = category, nextTimeType = timeType) {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory !== "ALL") params.set("category", nextCategory);
    if (nextTimeType !== "ALL") params.set("time", nextTimeType);
    router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false });
  }
  function reset() { setQuery(""); setCategory("ALL"); setTimeType("ALL"); router.replace(pathname, { scroll: false }); }
  return <>
    <label htmlFor="opportunity-search">Search opportunities</label>
    <input id="opportunity-search" value={query} onChange={(event) => { setQuery(event.target.value); update(event.target.value); }} placeholder="Organization, neighborhood, or interest" style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 20px" }} />
    <fieldset><legend>Category</legend>{categories.map((option) => <button type="button" aria-pressed={category === option} onClick={() => { setCategory(option); update(query, option); }} key={option}>{label(option)}</button>)}</fieldset>
    <fieldset><legend>Availability</legend>{timeTypes.map((option) => <button type="button" aria-pressed={timeType === option} onClick={() => { setTimeType(option); update(query, category, option); }} key={option}>{label(option)}</button>)}</fieldset>
    <p aria-live="polite">{filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"}</p>
    {filtered.length ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>{filtered.map((item) => <ListingCard key={item.id} item={item} />)}</div> : <div className="card"><h2>No opportunities match those filters.</h2><p>Try a broader search, or reset to see all verified Chicago listings.</p><button type="button" onClick={reset}>Clear filters</button></div>}
  </>;
}
