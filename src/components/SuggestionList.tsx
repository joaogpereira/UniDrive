import type { LocationSuggestion } from "@/types/location";

interface Props {
  results: LocationSuggestion[];
  loading: boolean;
  onSelect: (place: LocationSuggestion) => void;
}

export function SuggestionList({ results, loading, onSelect }: Props) {
  if (loading) {
    return (
      <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg p-3 text-sm z-50">
        Buscando locais...
      </div>
    );
  }

  if (!results.length) return null;

  return (
    <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-50 border">
      {results.map((place) => (
        <button
          key={place.place_id}
          type="button"
          onClick={() => onSelect(place)}
          className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-0"
        >
          {place.display_name}
        </button>
      ))}
    </div>
  );
}