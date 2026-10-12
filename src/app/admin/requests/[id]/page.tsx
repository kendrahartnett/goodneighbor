import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Listing request details" };

export default async function ListingRequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin.ok) redirect("/admin");
  const item = await prisma.listingRequest.findUnique({ where: { id: (await params).id } });
  if (!item) notFound();
  return <article className="shell admin-page request-detail">
    <Link className="breadcrumb" href="/admin/requests">← Back to Listing Requests</Link>
    <div className="admin-header"><div><p className="eyebrow">SUBMITTED {item.createdAt.toLocaleDateString("en-US", { timeZone: "America/Chicago", dateStyle: "medium" })}</p><h1>{item.name}&apos;s suggestion</h1></div></div>
    <div className="request-detail-grid"><div className="request-detail-copy"><h2>Opportunity details</h2><p>{item.description}</p></div><aside className="request-contact"><h2>Contact</h2><dl><dt>Name</dt><dd>{item.name}</dd><dt>Email</dt><dd><a href={`mailto:${item.email}`}>{item.email}</a></dd><dt>Other contact</dt><dd>{item.contactInformation}</dd></dl></aside></div>
    {item.photoUrl && <section className="request-photo"><h2>Submitted photo</h2><Image src={`/api/listing-requests/${item.id}/photo`} alt={`Photo submitted by ${item.name} with the listing request`} width={900} height={600} unoptimized /></section>}
  </article>;
}
