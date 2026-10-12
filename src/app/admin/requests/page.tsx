import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Listing Requests" };

export default async function ListingRequests() {
  const admin = await requireAdmin();
  if (!admin.ok) redirect("/admin");
  const items = await prisma.listingRequest.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }] });
  return <section className="shell admin-page">
    <Link className="breadcrumb" href="/admin">← Back to dashboard</Link>
    <div className="admin-header"><div><p className="eyebrow">MANAGEMENT</p><h1>Listing Requests</h1><p className="muted">Suggestions are private until you verify and create a listing.</p></div><span className="inbox-count">{items.length} received</span></div>
    {items.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Submitted</th><th>Name</th><th>Contact</th><th>Summary</th><th>Photo</th><th><span className="sr-only">Action</span></th></tr></thead><tbody>{items.map((item) => <tr key={item.id}>
      <td data-label="Submitted">{item.createdAt.toLocaleDateString("en-US", { timeZone: "America/Chicago", dateStyle: "medium" })}</td>
      <td data-label="Name"><strong>{item.name}</strong></td>
      <td data-label="Contact"><span>{item.email}</span><br /><span className="card-meta">{item.contactInformation}</span></td>
      <td data-label="Summary"><span className="request-summary">{item.description}</span></td>
      <td data-label="Photo">{item.photoUrl ? "Attached" : "—"}</td>
      <td data-label="Action"><Link className="table-action" href={`/admin/requests/${item.id}`}>View request</Link></td>
    </tr>)}</tbody></table></div> : <div className="admin-empty"><h2>No listing requests yet.</h2><p>New suggestions from visitors will appear here.</p></div>}
  </section>;
}
