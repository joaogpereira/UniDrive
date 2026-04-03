import { useState } from "react";
import { Search } from "lucide-react";
import { SuggestionList } from "./SuggestionList";
import { useLocationAutocomplete } from "@/hooks/useLocationAutocomplete";
import type { LocationSuggestion } from "@/types/location";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: LocationSuggestion) => void;
  placeholder: string;
}

export function DestinationAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
}: Props) {
  const { results, loading } = useLocationAutocomplete(value);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-grow">
      <div className="bg-white rounded-full px-4 py-3 flex items-center">
        <Search className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border-none border-b-2 border-gray-300 focus:border-blue-500 bg-transparent focus:outline-none"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
      </div>

      {isOpen && (
        <SuggestionList
          results={results}
          loading={loading}
          onSelect={(place) => {
            onChange(place.display_name);
            onSelect(place);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
