import type { LocationSuggestion } from "@/types/location";

const API_KEY = import.meta.env.VITE_LOCATIONIQ_KEY;

export async function searchLocations(
  query: string
): Promise<LocationSuggestion[]> {
  const response = await fetch(
    `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&limit=5&format=json`
  );

  if (!response.ok) throw new Error("Erro ao buscar local");

  return response.json();
}