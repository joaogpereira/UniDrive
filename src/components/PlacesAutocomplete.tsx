// src/components/PlacesAutocomplete.tsx
import { useEffect, useRef } from "react";
import { Input } from "./ui/input";



interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id: string;
}

export const PlacesAutocomplete = ({
  value,
  onChange,
  placeholder,
  id
}: PlacesAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, {
      types: ["geocode"],
      componentRestrictions: { country: "br" }, // restringe ao Brasil
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address);
      }
    });
  }, []);

  return (
    <Input
      ref={inputRef}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
    />
  );
};
