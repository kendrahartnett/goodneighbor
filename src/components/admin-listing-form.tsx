"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Opportunity } from "@prisma/client";

type FieldErrors = Record<string, string>;

function localDate(value?: Date | null) {
  return value ? value.toISOString().slice(0, 16) : "";
}

export function AdminListingForm({ item }: { item?: Opportunity }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const initial = {
    slug: item?.slug ?? "", title: item?.title ?? "", organizationName: item?.organizationName ?? "",
    summary: item?.summary ?? "", description: item?.description ?? "", neighborhood: item?.neighborhood ?? "",
    organizerUrl: item?.organizerUrl ?? "", sourceUrl: item?.sourceUrl ?? "",
    verifiedAt: localDate(item?.verifiedAt) || localDate(new Date()), category: item?.category ?? "FOOD_SECURITY",
    dateType: item?.dateType ?? "ONGOING", status: item?.status ?? "DRAFT", startsAt: localDate(item?.startsAt), endsAt: localDate(item?.endsAt),
  };
  const errorFor = (field: string) => fieldErrors[field] && <small className="field-error" role="alert">{fieldErrors[field]}</small>;

  async function save(form: HTMLFormElement) {
    setBusy(true); setMessage(""); setFieldErrors({});
    const values = Object.fromEntries(new FormData(form));
    const startsAt = String(values.startsAt || ""); const endsAt = String(values.endsAt || "");
    const response = await fetch(item ? `/api/opportunities/${item.id}` : "/api/opportunities", {
      method: item ? "PATCH" : "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...values, startsAt: startsAt ? new Date(startsAt).toISOString() : null, endsAt: endsAt ? new Date(endsAt).toISOString() : null, verifiedAt: new Date(String(values.verifiedAt)).toISOString() }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setMessage(body.error?.message ?? "Unable to save this listing.");
      setFieldErrors(body.error?.fields ?? {});
      setBusy(false); return;
    }
    router.push("/admin"); router.refresh();
  }

  async function remove() {
    if (!item || !window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    setBusy(true); setMessage("");
    const response = await fetch(`/api/opportunities/${item.id}`, { method: "DELETE" });
    if (!response.ok) { setMessage("Unable to delete this listing."); setBusy(false); return; }
    router.push("/admin"); router.refresh();
  }

  return <form className="card listing-form" onSubmit={(event) => { event.preventDefault(); void save(event.currentTarget); }}>
    <section className="form-section"><h2>Opportunity basics</h2><p>Give visitors a clear, useful first impression.</p><div className="form-grid">
      <label className="form-label">Listing title <span className="required">Required</span><input required name="title" defaultValue={initial.title} /></label>{errorFor("title")}
      <label className="form-label">Organization <span className="required">Required</span><input required name="organizationName" defaultValue={initial.organizationName} /></label>{errorFor("organizationName")}
      <label className="form-label full">Short summary <span className="required">Required</span><input required name="summary" maxLength={280} defaultValue={initial.summary} /></label>{errorFor("summary")}
      <label className="form-label full">Description <span className="required">Required</span><textarea required name="description" rows={6} defaultValue={initial.description} /></label>{errorFor("description")}
      <label className="form-label">URL slug <span className="required">Required</span><input required name="slug" defaultValue={initial.slug} /></label>{errorFor("slug")}
      <label className="form-label">Category <select name="category" defaultValue={initial.category}><option value="FOOD_SECURITY">Food security</option><option value="ENVIRONMENT">Environment</option><option value="YOUTH_COMMUNITY">Youth & community</option><option value="HOUSING_HEALTH">Housing & health</option></select></label>{errorFor("category")}
    </div></section>
    <section className="form-section"><h2>Location & timing</h2><p>Dates are optional; use the time type to set expectations.</p><div className="form-grid">
      <label className="form-label">Chicago neighborhood or service area <span className="required">Required</span><input required name="neighborhood" defaultValue={initial.neighborhood} /></label>{errorFor("neighborhood")}
      <label className="form-label">Time type <select name="dateType" defaultValue={initial.dateType}><option value="ONGOING">Ongoing</option><option value="DATE_SPECIFIC">Date-specific</option><option value="NEXT_OCCURRENCE">Next occurrence</option></select></label>{errorFor("dateType")}
      <label className="form-label">Start date/time<input type="datetime-local" name="startsAt" defaultValue={initial.startsAt} /></label>{errorFor("startsAt")}
      <label className="form-label">End date/time<input type="datetime-local" name="endsAt" defaultValue={initial.endsAt} /></label>{errorFor("endsAt")}
    </div></section>
    <section className="form-section"><h2>Links & verification</h2><p>Published listings must point to official organizer information and include a verification date.</p><div className="form-grid">
      <label className="form-label full">Organizer action URL <span className="required">Required</span><input required type="url" name="organizerUrl" defaultValue={initial.organizerUrl} /></label>{errorFor("organizerUrl")}
      <label className="form-label full">Official source URL <span className="required">Required</span><input required type="url" name="sourceUrl" defaultValue={initial.sourceUrl} /></label>{errorFor("sourceUrl")}
      <label className="form-label">Last verified <span className="required">Required</span><input required type="datetime-local" name="verifiedAt" defaultValue={initial.verifiedAt} /></label>{errorFor("verifiedAt")}
      <label className="form-label">Publication status <select name="status" defaultValue={initial.status}><option value="DRAFT">Draft — admin only</option><option value="PUBLISHED">Published — public</option></select></label>{errorFor("status")}
    </div></section>
    {message && <p className="field-error" role="alert">{message}</p>}
    <div className="form-actions"><button className="button" disabled={busy}>{busy ? "Saving…" : "Save listing"}</button>{item && <button className="delete-button" type="button" disabled={busy} onClick={() => void remove()}>Delete listing</button>}</div>
  </form>;
}
