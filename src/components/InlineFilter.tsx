import { useState } from "react";
import { Globe, Film, Users, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface FilterOption {
  category: "homeworld" | "film" | "species";
  value: string;
}

interface InlineFilterProps {
  onFiltersChange: (filters: FilterOption[]) => void;
  homeworlds: string[];
  films: string[];
  species: string[];
  activeFilters: FilterOption[];
}

const InlineFilter = ({
  onFiltersChange,
  homeworlds,
  films,
  species,
  activeFilters,
}: InlineFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "homeworld" | "film" | "species"
  >("homeworld");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const getOptionsForCategory = (
    category: "homeworld" | "film" | "species"
  ): string[] => {
    switch (category) {
      case "homeworld":
        return homeworlds;
      case "film":
        return films;
      case "species":
        return species;
      default:
        return [];
    }
  };

  const handleValueChange = (value: string) => {
    if (value && selectedCategory) {
      const newFilter: FilterOption = {
        category: selectedCategory,
        value: value,
      };

      // Check if filter already exists
      const exists = activeFilters.some(
        (f) => f.category === newFilter.category && f.value === newFilter.value
      );

      if (!exists) {
        onFiltersChange([...activeFilters, newFilter]);
        setSelectedValue(""); // Reset value select after adding
      }
    }
  };

  // Filter out already selected values from the options
  const getAvailableOptions = (
    category: "homeworld" | "film" | "species"
  ): string[] => {
    const allOptions = getOptionsForCategory(category);
    const activeValuesForCategory = activeFilters
      .filter((f) => f.category === category)
      .map((f) => f.value);
    return allOptions.filter(
      (option) => !activeValuesForCategory.includes(option)
    );
  };

  const handleRemoveFilter = (filterToRemove: FilterOption) => {
    onFiltersChange(
      activeFilters.filter(
        (f) =>
          !(
            f.category === filterToRemove.category &&
            f.value === filterToRemove.value
          )
      )
    );
  };

  const getCategoryIcon = (category: "homeworld" | "film" | "species") => {
    switch (category) {
      case "homeworld":
        return <Globe className="h-3 w-3" />;
      case "film":
        return <Film className="h-3 w-3" />;
      case "species":
        return <Users className="h-3 w-3" />;
    }
  };

  const getCategoryLabel = (category: "homeworld" | "film" | "species") => {
    switch (category) {
      case "homeworld":
        return "Homeworld";
      case "film":
        return "Film";
      case "species":
        return "Species";
    }
  };

  return (
    <div className="w-full bg-background rounded-lg p-3 h-full flex flex-col">
      {/* Filter Selection - All in one horizontal line */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full">
        <div>
          <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">
            Filter By
          </h3>
        </div>
        <div className="flex-1 w-full sm:w-auto min-w-0">
          <Select
            value={selectedCategory}
            onValueChange={(value: "homeworld" | "film" | "species") => {
              setSelectedCategory(value);
              setSelectedValue(""); // Reset value when category changes
            }}
          >
            <SelectTrigger className="w-full h-10 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="homeworld">
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3" />
                  <span>Homeworld</span>
                </div>
              </SelectItem>
              <SelectItem value="film">
                <div className="flex items-center gap-2">
                  <Film className="h-3 w-3" />
                  <span>Film</span>
                </div>
              </SelectItem>
              <SelectItem value="species">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>Species</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 w-full sm:w-auto min-w-0">
          <Select value={selectedValue} onValueChange={handleValueChange}>
            <SelectTrigger className="w-full h-10 text-sm">
              <SelectValue
                placeholder={`Select ${getCategoryLabel(selectedCategory)}`}
              />
            </SelectTrigger>
            <SelectContent>
              {getAvailableOptions(selectedCategory).length > 0 ? (
                getAvailableOptions(selectedCategory).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))
              ) : (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  All {getCategoryLabel(selectedCategory).toLowerCase()}s
                  selected
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters - Always visible when there are filters */}
      {/* {activeFilters.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-border mt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">Active Filters ({activeFilters.length})</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange([])}
              className="h-5 text-xs px-1.5"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
            {activeFilters.map((filter, index) => (
              <Badge
                key={`${filter.category}-${filter.value}-${index}`}
                variant="secondary"
                className="flex items-center gap-1.5 px-2 py-1 text-xs"
              >
                {getCategoryIcon(filter.category)}
                <span className="font-medium">
                  {getCategoryLabel(filter.category)}: {filter.value}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFilter(filter);
                  }}
                  className="ml-1 hover:bg-background/50 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${filter.value} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default InlineFilter;
