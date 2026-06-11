"use client";

import { useMemo, useState } from "react";
import type { AdminMediaItem } from "@/lib/adminMedia";

type AdminMediaManagerProps = {
  initialUploads: AdminMediaItem[];
};

function formatBytes(value?: number) {
  if (!value) {
    return "-";
  }

  if (value < 1024 * 1024) {
    return `${Math.round(value / 1024)} KB`;
  }

  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("sr-RS", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function AdminMediaManager({
  initialUploads,
}: AdminMediaManagerProps) {
  const [uploads, setUploads] = useState(initialUploads);
  const [filter, setFilter] = useState<"all" | "used" | "unused">("all");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const filteredUploads = useMemo(() => {
    if (filter === "used") {
      return uploads.filter((upload) => upload.used);
    }

    if (filter === "unused") {
      return uploads.filter((upload) => !upload.used);
    }

    return uploads;
  }, [filter, uploads]);

  const refreshUploads = async () => {
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/uploads");
    const payload = (await response.json()) as {
      uploads?: AdminMediaItem[];
      error?: string;
    };

    if (!response.ok || !payload.uploads) {
      setStatus("error");
      setMessage(payload.error || "Učitavanje slika nije uspelo.");
      return;
    }

    setUploads(payload.uploads);
    setStatus("idle");
  };

  const deleteUpload = async (upload: AdminMediaItem) => {
    const force = upload.used;
    const confirmation = force
      ? `Slika se koristi u:\n${upload.usedBy.join(
          "\n",
        )}\n\nDa li sigurno želite da je obrišete?`
      : "Da li sigurno želite da obrišete ovu nekorišćenu sliku?";

    if (!window.confirm(confirmation)) {
      return;
    }

    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/uploads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: upload.url, force }),
    });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error || "Brisanje slike nije uspelo.");
      return;
    }

    setUploads((current) => current.filter((item) => item.url !== upload.url));
    setStatus("idle");
    setMessage("Slika je obrisana.");
  };

  return (
    <section className="rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f56]">
            Media
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#4a382b]">
            Sačuvane slike
          </h2>
          <p className="mt-3 max-w-2xl text-[#5c4a3d]/75">
            Nekorišćene slike su bezbedne za brisanje. Korišćene slike obrišite
            samo ako želite da ih ručno uklonite iz postojećih objava.
          </p>
        </div>
        <button
          type="button"
          onClick={refreshUploads}
          disabled={status === "loading"}
          className="rounded-lg border border-[#5c4a3d]/25 px-5 py-3 font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8 disabled:opacity-60"
        >
          Osveži
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "unused", "used"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === item
                ? "border-[#5c4a3d] bg-[#5c4a3d] text-[#fdfaf6]"
                : "border-[#5c4a3d]/20 text-[#5c4a3d] hover:bg-[#5c4a3d]/8"
            }`}
          >
            {item === "all" ? "Sve" : item === "unused" ? "Nekorišćene" : "Korišćene"}
          </button>
        ))}
      </div>

      {message ? (
        <p
          className={`mt-4 font-semibold ${
            status === "error" ? "text-red-700" : "text-green-800"
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4">
        {filteredUploads.length > 0 ? (
          filteredUploads.map((upload) => (
            <article
              key={upload.url}
              className="grid gap-4 rounded-[1rem] border border-[#5c4a3d]/10 bg-[#f4efe6] p-4 md:grid-cols-[180px_1fr_auto]"
            >
              <div className="overflow-hidden rounded-lg bg-[#e8e0d5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={upload.url}
                  alt={upload.filename}
                  className="h-32 w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                      upload.used
                        ? "bg-[#5c4a3d] text-[#fdfaf6]"
                        : "bg-green-800 text-white"
                    }`}
                  >
                    {upload.used ? "Koristi se" : "Nekorišćena"}
                  </span>
                  <span className="rounded-full border border-[#5c4a3d]/20 px-3 py-1 text-xs font-semibold text-[#5c4a3d]">
                    {upload.source === "blob" ? "Vercel Blob" : "Local"}
                  </span>
                </div>
                <p className="break-all text-sm font-semibold text-[#4a382b]">
                  {upload.filename}
                </p>
                <p className="mt-2 text-sm text-[#5c4a3d]/70">
                  {formatBytes(upload.size)} / {formatDate(upload.uploadedAt)}
                </p>
                {upload.usedBy.length > 0 ? (
                  <p className="mt-2 text-sm text-[#5c4a3d]/75">
                    {upload.usedBy.join(", ")}
                  </p>
                ) : null}
              </div>
              <div className="flex items-start gap-2 md:justify-end">
                <a
                  href={upload.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-[#5c4a3d]/25 px-4 py-2 text-sm font-semibold text-[#5c4a3d]"
                >
                  Otvori
                </a>
                <button
                  type="button"
                  onClick={() => deleteUpload(upload)}
                  disabled={status === "loading"}
                  className="rounded-md border border-red-900/20 px-4 py-2 text-sm font-semibold text-red-800 disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-lg bg-[#f4efe6] p-5 text-[#5c4a3d]/75">
            Nema slika za izabrani filter.
          </p>
        )}
      </div>
    </section>
  );
}
