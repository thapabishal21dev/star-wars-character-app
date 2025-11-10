import { useState } from "react";
import { X, Globe, Film, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export interface FilterOption {
  category: "homeworld" | "film" | "species";
  value: string;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: FilterOption[]) => void;
  homeworlds: string[];
  films: string[];
  species: string[];
  activeFilters: FilterOption[];
}

const FilterSidebar = ({
  isOpen,
  onClose,
  onFiltersChange,
  homeworlds,
  films,
  species,
  activeFilters,
}: FilterSidebarProps) => {
  const [selectedCategory, setSelectedCategory] = useState<"homeworld" | "film" | "species">("homeworld");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const getOptionsForCategory = (category: "homeworld" | "film" | "species"): string[] => {
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

  const handleAddFilter = () => {
    if (selectedValue && selectedCategory) {
      const newFilter: FilterOption = {
        category: selectedCategory,
        value: selectedValue,
      };
      
      // Check if filter already exists
      const exists = activeFilters.some(
        (f) => f.category === newFilter.category && f.value === newFilter.value
      );
      
      if (!exists) {
        onFiltersChange([...activeFilters, newFilter]);
        setSelectedValue("");
      }
    }
  };

  const handleRemoveFilter = (filterToRemove: FilterOption) => {
    onFiltersChange(
      activeFilters.filter(
        (f) => !(f.category === filterToRemove.category && f.value === filterToRemove.value)
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

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-lg z-40 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Selection */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Filter By
            </label>

            <Select
              value={selectedCategory}
              onValueChange={(value: "homeworld" | "film" | "species") =>
                setSelectedCategory(value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homeworld">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Homeworld</span>
                  </div>
                </SelectItem>
                <SelectItem value="film">
                  <div className="flex items-center gap-2">
                    <Film className="h-4 w-4" />
                    <span>Film</span>
                  </div>
                </SelectItem>
                <SelectItem value="species">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Species</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Select Value
            </label>
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select a ${getCategoryLabel(selectedCategory)}`} />
              </SelectTrigger>
              <SelectContent>
                {getOptionsForCategory(selectedCategory).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleAddFilter}
            disabled={!selectedValue}
            className="w-full"
          >
            Add Filter
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-2 px-3 py-1.5"
                >
                  {getCategoryIcon(filter.category)}
                  <span className="text-xs font-medium">
                    {getCategoryLabel(filter.category)}: {filter.value}
                  </span>
                  <button
                    onClick={() => handleRemoveFilter(filter)}
                    className="ml-1 hover:bg-background/50 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${filter.value} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFiltersChange([])}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default FilterSidebar;

