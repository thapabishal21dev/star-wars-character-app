import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchTerm {
  id: string;
  text: string;
}

interface SearchFilterProps {
  onSearchChange: (searchText: string) => void;
  characterNames?: string[];
}

const SearchFilter = ({
  onSearchChange,
  characterNames = [],
}: SearchFilterProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions to only show character names
  const filteredSuggestions = characterNames.filter(
    (name) =>
      inputValue.length > 0 &&
      name.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    onSearchChange(inputValue);
  }, [inputValue, onSearchChange]);

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full bg-background rounded-lg">
      {/* Search Input */}
      <div className="relative ">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search characters by name..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10 pr-4 h-10 text-sm bg-background border-border transition-colors"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-red-500 border border-border rounded-md shadow-lg overflow-hidden animate-fade-in">
            <div className="max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors"
                >
                  <span className="text-foreground">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
export type { SearchTerm };
