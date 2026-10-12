"use client";

import Image from "next/image";
import { useState } from "react";

export function ListingPhoto({ id, url, alt, variant = "card" }: { id: string; url: string; alt: string; variant?: "card" | "detail" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  const privateUpload = url.includes(".private.blob.vercel-storage.com/");
  return <div className={`listing-photo listing-photo-${variant}`}>
    <Image src={privateUpload ? `/api/opportunities/${id}/photo` : url} alt={alt} fill sizes={variant === "card" ? "(max-width: 660px) 100vw, (max-width: 960px) 50vw, 33vw" : "(max-width: 900px) 100vw, 900px"} unoptimized={!privateUpload} onError={() => setFailed(true)} />
  </div>;
}
