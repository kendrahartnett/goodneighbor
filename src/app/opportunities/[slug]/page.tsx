import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const item = await prisma.opportunity.findFirst({
    where: { slug: (await params).slug, status: "PUBLISHED" },
  });

  if (!item) notFound();

  const date = item.dateType === "ONGOING"
    ? "Ongoing"
    : item.startsAt?.toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "long", timeStyle: "short" }) ?? "Contact organizer";

  return <article className="shell" style={{ paddingBlock: 56, maxWidth: 900 }}>
    <p>{item.category.replace("_", " ")} · {item.neighborhood}</p>
    <h1>{item.title}</h1>
    <p style={{ fontSize: 20 }}>{item.summary}</p>
    <dl>
      <dt>Organization</dt><dd>{item.organizationName}</dd>
      <dt>When</dt><dd>{date}</dd>
      {item.commitmentText && <><dt>Commitment</dt><dd>{item.commitmentText}</dd></>}
    </dl>
    <p>{item.description}</p>
    <a className="button" href={item.organizerUrl} target="_blank" rel="noopener noreferrer">Visit organizer (opens in a new tab)</a>
    <hr style={{ marginBlock: 32 }} />
    <p><strong>Verified:</strong> GoodNeighbor checked <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">the organizer’s official source</a> on {item.verifiedAt.toLocaleDateString("en-US", { timeZone: "America/Chicago", dateStyle: "long" })}. Confirm logistics directly with the organizer.</p>
  </article>;
}
