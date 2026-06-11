"use client";

import { useState } from "react";
import RecommendationForm from "@/components/RecommendationForm";
import type { Recommendation } from "@/lib/recommendations";

type AdminRecommendationManagerProps = {
  initialRecommendations: Recommendation[];
  initialCategories: string[];
};

type CategoriesResponse = {
  categories?: string[];
  error?: string;
};

export default function AdminRecommendationManager({
  initialRecommendations,
  initialCategories,
}: AdminRecommendationManagerProps) {
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState("");
  const [editingCategoryValue, setEditingCategoryValue] = useState("");
  const [editingRecommendation, setEditingRecommendation] =
    useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoryStatus, setCategoryStatus] = useState<
    "idle" | "saving" | "error"
  >("idle");
  const [categoryMessage, setCategoryMessage] = useState("");

  const refreshRecommendations = async () => {
    setIsLoading(true);
    setError("");

    const response = await fetch("/api/admin/preporuke");

    if (!response.ok) {
      setError("Ne mogu da ucitam preporuke.");
      setIsLoading(false);
      return;
    }

    const payload = (await response.json()) as {
      recommendations: Recommendation[];
    };
    setRecommendations(payload.recommendations);
    setEditingRecommendation(null);
    setIsLoading(false);
  };

  const deleteRecommendation = async (id: string) => {
    if (!window.confirm("Da li sigurno brisete ovu preporuku?")) {
      return;
    }

    const response = await fetch(`/api/admin/preporuke/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Brisanje nije uspelo.");
      return;
    }

    await refreshRecommendations();
  };

  const togglePublished = async (recommendation: Recommendation) => {
    const response = await fetch(`/api/admin/preporuke/${recommendation.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...recommendation,
        published: !recommendation.published,
      }),
    });

    if (!response.ok) {
      setError("Promena statusa nije uspela.");
      return;
    }

    await refreshRecommendations();
  };

  const addCategory = async () => {
    setCategoryStatus("saving");
    setCategoryMessage("");

    const response = await fetch("/api/admin/preporuke/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newCategory }),
    });
    const payload = (await response.json()) as CategoriesResponse;

    if (!response.ok || !payload.categories) {
      setCategoryStatus("error");
      setCategoryMessage(payload.error || "Dodavanje kategorije nije uspelo.");
      return;
    }

    setCategories(payload.categories);
    setNewCategory("");
    setCategoryStatus("idle");
    setCategoryMessage("Kategorija je dodata.");
  };

  const startEditCategory = (category: string) => {
    setEditingCategory(category);
    setEditingCategoryValue(category);
    setCategoryMessage("");
  };

  const updateCategory = async () => {
    setCategoryStatus("saving");
    setCategoryMessage("");

    const response = await fetch("/api/admin/preporuke/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentCategory: editingCategory,
        nextCategory: editingCategoryValue,
      }),
    });
    const payload = (await response.json()) as CategoriesResponse;

    if (!response.ok || !payload.categories) {
      setCategoryStatus("error");
      setCategoryMessage(payload.error || "Izmena kategorije nije uspela.");
      return;
    }

    setCategories(payload.categories);
    setEditingCategory("");
    setEditingCategoryValue("");
    setCategoryStatus("idle");
    setCategoryMessage("Kategorija je izmenjena.");
  };

  const deleteCategory = async (category: string) => {
    if (
      !window.confirm(
        `Obrisati kategoriju "${category}" iz liste? Preporuke koje je vec koriste nece biti obrisane.`,
      )
    ) {
      return;
    }

    setCategoryStatus("saving");
    setCategoryMessage("");

    const response = await fetch("/api/admin/preporuke/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });
    const payload = (await response.json()) as CategoriesResponse;

    if (!response.ok || !payload.categories) {
      setCategoryStatus("error");
      setCategoryMessage(payload.error || "Brisanje kategorije nije uspelo.");
      return;
    }

    setCategories(payload.categories);
    setCategoryStatus("idle");
    setCategoryMessage("Kategorija je obrisana iz liste.");
  };

  return (
    <div className="grid gap-10">
      <RecommendationForm
        key={editingRecommendation?.id ?? "new-recommendation"}
        recommendation={editingRecommendation}
        categories={categories}
        onSaved={refreshRecommendations}
        onCancelEdit={() => setEditingRecommendation(null)}
      />

      <section className="rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f56]">
              Kategorije
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#4a382b]">
              Kategorije preporuka
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
              placeholder="Nova kategorija"
              className="rounded-lg border border-[#5c4a3d]/20 bg-[#f4efe6] px-4 py-3 text-[#4a382b] outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
            />
            <button
              type="button"
              onClick={addCategory}
              disabled={categoryStatus === "saving"}
              className="rounded-lg bg-[#5c4a3d] px-5 py-3 font-semibold text-[#fdfaf6] transition-colors hover:bg-[#47382f] disabled:opacity-60"
            >
              Dodaj
            </button>
          </div>
        </div>

        {categoryMessage ? (
          <p
            className={`mt-4 font-semibold ${
              categoryStatus === "error" ? "text-red-700" : "text-green-800"
            }`}
          >
            {categoryMessage}
          </p>
        ) : null}

        <div className="mt-5 grid gap-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category}
                className="flex flex-col gap-3 rounded-lg border border-[#5c4a3d]/20 bg-[#f4efe6] p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                {editingCategory === category ? (
                  <input
                    value={editingCategoryValue}
                    onChange={(event) =>
                      setEditingCategoryValue(event.target.value)
                    }
                    className="rounded-lg border border-[#5c4a3d]/20 bg-[#fdfaf6] px-3 py-2 font-semibold text-[#4a382b] outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
                  />
                ) : (
                  <span className="font-semibold text-[#5c4a3d]">
                    {category}
                  </span>
                )}
                <div className="flex flex-wrap gap-2">
                  {editingCategory === category ? (
                    <>
                      <button
                        type="button"
                        onClick={updateCategory}
                        disabled={categoryStatus === "saving"}
                        className="rounded-md bg-[#5c4a3d] px-4 py-2 text-sm font-semibold text-[#fdfaf6] disabled:opacity-60"
                      >
                        Sacuvaj
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCategory("")}
                        className="rounded-md border border-[#5c4a3d]/25 px-4 py-2 text-sm font-semibold text-[#5c4a3d]"
                      >
                        Odustani
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEditCategory(category)}
                      className="rounded-md bg-[#5c4a3d] px-4 py-2 text-sm font-semibold text-[#fdfaf6]"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteCategory(category)}
                    className="rounded-md border border-red-900/20 px-4 py-2 text-sm font-semibold text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#5c4a3d]/75">Nema definisanih kategorija.</p>
          )}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f56]">
              Upravljanje
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#4a382b]">
              Sve preporuke
            </h2>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-lg border border-[#5c4a3d]/25 px-5 py-3 font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8">
              Odjavi se
            </button>
          </form>
        </div>

        {isLoading ? (
          <p className="mt-6 rounded-lg bg-[#f4efe6] p-4 text-[#5c4a3d]/75">
            Ucitavam preporuke...
          </p>
        ) : null}
        {error ? <p className="mt-6 font-semibold text-red-700">{error}</p> : null}

        <div className="mt-6 grid gap-4">
          {recommendations.length > 0 ? (
            recommendations.map((recommendation) => (
              <article
                key={recommendation.id}
                className="grid gap-4 rounded-[1rem] border border-[#5c4a3d]/10 bg-[#f4efe6] p-5 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="mb-2 flex flex-wrap gap-3 text-sm font-semibold text-[#5c4a3d]/65">
                    <span>
                      {recommendation.published ? "Objavljeno" : "Draft"}
                    </span>
                    <span>/</span>
                    <span>{recommendation.slug}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#4a382b]">
                    {recommendation.title}
                  </h3>
                  <p className="mt-2 text-[#5c4a3d]/75">
                    {recommendation.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-start gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingRecommendation(recommendation)}
                    className="rounded-md bg-[#5c4a3d] px-4 py-2 text-sm font-semibold text-[#fdfaf6]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePublished(recommendation)}
                    className="rounded-md border border-[#5c4a3d]/25 px-4 py-2 text-sm font-semibold text-[#5c4a3d]"
                  >
                    {recommendation.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteRecommendation(recommendation.id)}
                    className="rounded-md border border-red-900/20 px-4 py-2 text-sm font-semibold text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-lg bg-[#f4efe6] p-5 text-[#5c4a3d]/75">
              Nema preporuka. Kreirajte prvu preporuku kroz formu iznad.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
