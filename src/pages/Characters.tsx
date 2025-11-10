import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CharacterCard from "@/components/CharacterCard";
import CharacterModal from "@/components/CharacterModal";
import SearchFilter from "@/components/SearchFilter";
import InlineFilter, { FilterOption } from "@/components/InlineFilter";
import Pagination from "@/components/Pagination";
import { Loader2, X, Globe, Film, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import charactersHero from "@/assets/characters-hero.jpg";

interface SWAPICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface SWAPIPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface SWAPISpecies {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string | null;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface SWAPIFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface AkababCharacter {
  id: number;
  name: string;
  image: string;
  [key: string]: any;
}

interface Character {
  // SWAPI data
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string; // URL
  films: string[]; // URLs
  species: string[]; // URLs
  created: string;
  url: string;
  // Resolved data
  image: string;
  homeworldName?: string;
  homeworldData?: SWAPIPlanet;
  speciesNames?: string[];
  speciesData?: SWAPISpecies[];
  filmTitles?: string[];
  filmData?: SWAPIFilm[];
}

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const itemsPerPage = 12;

  // Fetch images from akabab API and create a name-to-image map
  const fetchImageMap = async (): Promise<Map<string, string>> => {
    try {
      const response = await fetch(
        "https://akabab.github.io/starwars-api/api/all.json"
      );
      if (!response.ok) return new Map();
      const data: AkababCharacter[] = await response.json();
      const imageMap = new Map<string, string>();
      data.forEach((char) => {
        imageMap.set(char.name.toLowerCase(), char.image);
      });
      return imageMap;
    } catch (err) {
      return new Map();
    }
  };

  // Resolve character data: fetch homeworld, species, and films
  const resolveCharacterData = async (
    swapiChar: SWAPICharacter,
    imageMap: Map<string, string>
  ): Promise<Character> => {
    const image = imageMap.get(swapiChar.name.toLowerCase()) || "";

    // Fetch homeworld
    let homeworldName = "Unknown";
    let homeworldData: SWAPIPlanet | undefined;
    if (swapiChar.homeworld && swapiChar.homeworld !== "null") {
      try {
        const homeworldRes = await fetch(swapiChar.homeworld);
        const homeworldJson: SWAPIPlanet = await homeworldRes.json();
        homeworldName = homeworldJson.name;
        homeworldData = homeworldJson;
      } catch (err) {
        // Keep default
      }
    }

    // Fetch species
    const speciesNames: string[] = [];
    const speciesData: SWAPISpecies[] = [];
    if (swapiChar.species && swapiChar.species.length > 0) {
      try {
        const speciesPromises = swapiChar.species.map((url) =>
          fetch(url).then((r) => r.json())
        );
        const speciesResults: SWAPISpecies[] = await Promise.all(
          speciesPromises
        );
        speciesResults.forEach((species) => {
          speciesNames.push(species.name);
          speciesData.push(species);
        });
      } catch (err) {
        // Keep empty
      }
    }
    // If no species, set to "Unknown"
    if (speciesNames.length === 0) {
      speciesNames.push("Unknown");
    }

    // Fetch films
    const filmTitles: string[] = [];
    const filmData: SWAPIFilm[] = [];
    if (swapiChar.films && swapiChar.films.length > 0) {
      try {
        const filmPromises = swapiChar.films.map((url) =>
          fetch(url).then((r) => r.json())
        );
        const filmResults: SWAPIFilm[] = await Promise.all(filmPromises);
        filmResults.forEach((film) => {
          filmTitles.push(film.title);
          filmData.push(film);
        });
      } catch (err) {
        // Keep empty
      }
    }

    return {
      ...swapiChar,
      image,
      homeworldName,
      homeworldData,
      speciesNames,
      speciesData: speciesData.length > 0 ? speciesData : undefined,
      filmTitles,
      filmData,
    };
  };

  const fetchCharacters = async (
    url: string = "https://swapi.dev/api/people/"
  ) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch image map first
      const imageMap = await fetchImageMap();

      // Fetch characters from SWAPI
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch characters");
      const data: {
        results: SWAPICharacter[];
        next: string | null;
        previous: string | null;
      } = await response.json();

      // Resolve all character data
      const resolvedCharacters = await Promise.all(
        data.results.map((char) => resolveCharacterData(char, imageMap))
      );

      setCharacters(resolvedCharacters);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleNext = () => {
    if (nextPage) {
      setCurrentPage((prev) => prev + 1);
      fetchCharacters(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (previousPage) {
      setCurrentPage((prev) => prev - 1);
      fetchCharacters(previousPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  // Extract unique values for search and filters
  const characterNames = useMemo(() => {
    return characters.map((char) => char.name);
  }, [characters]);

  const homeworlds = useMemo(() => {
    const unique = new Set<string>();
    characters.forEach((char) => {
      if (char.homeworldName) unique.add(char.homeworldName);
    });
    return Array.from(unique).sort();
  }, [characters]);

  const films = useMemo(() => {
    const unique = new Set<string>();
    characters.forEach((char) => {
      if (char.filmTitles) {
        char.filmTitles.forEach((title) => unique.add(title));
      }
    });
    return Array.from(unique).sort();
  }, [characters]);

  const species = useMemo(() => {
    const unique = new Set<string>();
    characters.forEach((char) => {
      if (char.speciesNames) {
        char.speciesNames.forEach((speciesName) => unique.add(speciesName));
      }
    });
    return Array.from(unique).sort();
  }, [characters]);

  // Filter characters based on search and filters
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      // Search filter - only matches character name
      const matchesSearch =
        !searchText ||
        character.name.toLowerCase().includes(searchText.toLowerCase());

      // Category filters - must match all selected filters
      const matchesFilters = filters.every((filter) => {
        switch (filter.category) {
          case "homeworld":
            return character.homeworldName === filter.value;
          case "film":
            return character.filmTitles?.includes(filter.value) || false;
          case "species":
            return character.speciesNames?.includes(filter.value) || false;
          default:
            return true;
        }
      });

      return matchesSearch && matchesFilters;
    });
  }, [characters, searchText, filters]);

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filters]);

  // For client-side pagination of filtered results (when not using API pagination)
  const paginatedCharacters = useMemo(() => {
    // If we have filters/search, paginate client-side
    if (searchText || filters.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredCharacters.slice(startIndex, endIndex);
    }
    // Otherwise show all characters from current API page
    return filteredCharacters;
  }, [filteredCharacters, currentPage, searchText, filters]);

  // Determine if we should use API pagination or client-side pagination
  const useApiPagination = !searchText && filters.length === 0;

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${charactersHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">
            Characters
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 relative">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            All Characters
          </h2>

          {/* Search and Filter Layout - Same Line */}
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
            {/* Search Bar - Left Side */}
            <div className="flex-1 min-w-0 lg:min-w-[300px] ">
              <SearchFilter
                onSearchChange={setSearchText}
                characterNames={characterNames}
              />
            </div>

            {/* Filter Panel - Right Side */}
            <div className="flex-1 lg:flex-initial lg:min-w-[400px] lg:max-w-[500px]">
              <InlineFilter
                onFiltersChange={setFilters}
                homeworlds={homeworlds}
                films={films}
                species={species}
                activeFilters={filters}
              />
            </div>
          </div>

          {/* Active Filters Display Below Search and Filter */}
          {filters.length > 0 && (
            <div className="mb-4 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Active filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter, index) => (
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
                      onClick={() =>
                        setFilters(filters.filter((_, i) => i !== index))
                      }
                      className="ml-1 hover:bg-background/50 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${filter.value} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters([])}
                  className="h-7 text-xs"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive text-xl">{error}</p>
          </div>
        )}

        {!loading && !error && characters.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">No characters found</p>
          </div>
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            {filteredCharacters.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <p className="text-muted-foreground text-xl mb-2">
                  No characters found
                </p>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search or filter terms
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                  {paginatedCharacters.map((character, index) => (
                    <div
                      key={character.url}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <CharacterCard
                        name={character.name}
                        image={character.image}
                        homeworld={character.homeworldName}
                        species={character.speciesNames || []}
                        films={character.filmTitles || []}
                        onClick={() => handleCharacterClick(character)}
                      />
                    </div>
                  ))}
                </div>

                {useApiPagination ? (
                  <Pagination
                    currentPage={currentPage}
                    hasNext={!!nextPage}
                    hasPrevious={!!previousPage}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                  />
                ) : (
                  filteredCharacters.length > itemsPerPage && (
                    <Pagination
                      currentPage={currentPage}
                      hasNext={
                        currentPage <
                        Math.ceil(filteredCharacters.length / itemsPerPage)
                      }
                      hasPrevious={currentPage > 1}
                      onNext={() => {
                        if (
                          currentPage <
                          Math.ceil(filteredCharacters.length / itemsPerPage)
                        ) {
                          setCurrentPage((prev) => prev + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      onPrevious={() => {
                        if (currentPage > 1) {
                          setCurrentPage((prev) => prev - 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                    />
                  )
                )}
              </>
            )}
          </>
        )}
      </main>

      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Characters;
