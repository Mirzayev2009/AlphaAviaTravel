import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export function useTravelData(file, rootKey) {
  const { i18n } = useTranslation();
  const query = useQuery({
    queryKey: ["travel", file],
    queryFn: async ({ signal }) => {
      const response = await fetch(`/data/${file}.json`, { signal });
      if (!response.ok) throw new Error("Unable to load travel information");
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  const data = query.data?.[rootKey] ?? query.data;
  const language = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const localized = data?.[language] ?? data?.en ?? [];
  return { ...query, data, localized, language };
}

export function categoryTours(data, category, language) {
  const group = data?.[category];
  return group?.[language] ?? group?.en ?? [];
}

export function findCatalogTour(data, id, language, option = 0) {
  if (!data) return null;
  for (const category of Object.keys(data)) {
    const group = data[category];
    const match = (group?.[language] ?? []).filter((tour) => tour.id === id)[option];
    if (match) return match;
  }
  // Some translated records use a language suffix in their ID.
  const stableId = String(id).replace(/_(en|ru|uz|es|fr|it|zh)$/, "");
  for (const category of Object.keys(data)) {
    const group = data[category];
    const match = (group?.[language] ?? group?.en ?? []).filter(
      (tour) => String(tour.id).replace(/_(en|ru|uz|es|fr|it|zh)$/, "") === stableId,
    )[option];
    if (match) return match;
    for (const records of Object.values(group ?? {})) {
      const fallback = Array.isArray(records) && records.filter((tour) => tour.id === id)[option];
      if (fallback) return fallback;
    }
  }
  return null;
}

export function imageUrl(path) {
  if (!path) return "";
  if (/^(https?:|data:|\/data\/)/.test(path)) return path;
  return path.startsWith("/images/") ? `/data${path}` : path;
}
