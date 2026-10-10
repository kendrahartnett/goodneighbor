import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAdmin } from "./actions";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const admin = await requireAdmin();
  if (!admin.ok && admin.status === 401) redirect("/admin/sign-in");

  if (!admin.ok) {
    return (
      <section className="shell admin-page">
        <div className="admin-notice">
          <p className="eyebrow">MANAGEMENT</p>
          <h1>Admin access unavailable</h1>
          <p role="alert">You are signed in with GitHub, but this account is not authorized to access GoodNeighbor administration. Please sign out and choose the configured admin account.</p>
          <form action={signOutAdmin}>
            <button className="button" type="submit">Sign out and choose another account</button>
          </form>
        </div>
      </section>
    );
  }

  const items = await prisma.opportunity.findMany({ orderBy: { updatedAt: "desc" } });
  const published = items.filter((item) => item.status === "PUBLISHED").length;
  return (
    <section className="shell admin-page">
      <div className="admin-header">
        <div><p className="eyebrow">MANAGEMENT</p><h1>Your dashboard</h1></div>
        <div className="admin-actions">
          <Link className="button" href="/admin/listings/new">New opportunity</Link>
          <form action={signOutAdmin}><button className="button-quiet" type="submit">Sign out</button></form>
        </div>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card"><strong>{items.length}</strong><span>Total listings</span></div>
        <div className="stat-card"><strong>{published}</strong><span>Published</span></div>
        <div className="stat-card"><strong>{items.length - published}</strong><span>Drafts</span></div>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Opportunity</th><th>Status</th><th>Verified</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>{items.map((item) => (
            <tr key={item.id}>
              <td data-label="Opportunity"><strong>{item.title}</strong><br /><span className="card-meta">{item.organizationName}</span></td>
              <td data-label="Status"><span className="status-badge" data-status={item.status}>{item.status}</span></td>
              <td data-label="Verified">{item.verifiedAt.toLocaleDateString("en-US", { timeZone: "America/Chicago", month: "short", day: "numeric", year: "numeric" })}</td>
              <td data-label="Actions"><Link className="table-action" href={`/admin/listings/${item.id}`}>Edit</Link></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  );
}
