import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

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
  filmTitles?: string[];
}

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

const CharacterModal = ({
  character,
  isOpen,
  onClose,
}: CharacterModalProps) => {
  // Format date as dd-MM-yyyy
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!character) return null;

  // Convert height from cm to meters
  const heightInMeters =
    character.height !== "unknown"
      ? (parseFloat(character.height) / 100).toFixed(2)
      : "Unknown";

  // Number of films
  const numberOfFilms =
    character.filmTitles?.length || character.films?.length || 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-border  ">
        {!character ? (
          <div>No character selected</div>
        ) : (
          <div className="relative w-full">
            {/* Blurred background image at top 25% */}
            {character.image && (
              <div
                className="absolute top-0 left-0 right-0 h-[25%] bg-cover bg-center rounded-t-lg"
                style={{
                  backgroundImage: `url(${character.image})`,
                  filter: "blur(8px)",
                  zIndex: 0,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-transparent" />
              </div>
            )}

            <div className="relative z-10 flex flex-col md:flex-row w-full gap-4">
              {/* LEFT: Image (40%) */}
              <div className="md:w-2/5 w-full flex flex-col items-center">
                <div className="w-full h-64 md:h-[420px] overflow-hidden rounded-sm">
                  {character.image ? (
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Details (60%) */}
              <div className="md:w-3/5 w-full overflow-y-auto pr-2 space-y-6 max-h-[80vh]">
                {/* Name as header - prominently displayed */}
                <DialogHeader className="w-full">
                  <DialogTitle className="text-3xl md:text-4xl text-primary font-bold mb-4">
                    {character.name}
                  </DialogTitle>
                </DialogHeader>

                {/* Character Details */}
                <section className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-semibold">
                        Height:
                      </span>{" "}
                      {heightInMeters !== "Unknown"
                        ? `${heightInMeters}m`
                        : "Unknown"}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-semibold">
                        Mass:
                      </span>{" "}
                      {character.mass !== "unknown"
                        ? `${character.mass} kg`
                        : "Unknown"}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-semibold">
                        Date added:
                      </span>{" "}
                      {character.created
                        ? formatDate(character.created)
                        : "Unknown"}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-semibold">
                        Number of films:
                      </span>{" "}
                      {numberOfFilms}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-semibold">
                        Birth year:
                      </span>{" "}
                      {character.birth_year !== "unknown"
                        ? character.birth_year
                        : "Unknown"}
                    </p>
                    {character.speciesNames &&
                      character.speciesNames.length > 0 && (
                        <p className="text-muted-foreground">
                          <span className="text-foreground font-semibold">
                            Species:
                          </span>{" "}
                          {character.speciesNames.join(", ")}
                        </p>
                      )}
                  </div>
                </section>

                {/* Homeworld Details */}
                {character.homeworldData && (
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-primary/30">
                      Homeworld
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          <span className="text-foreground font-semibold">
                            Name:
                          </span>{" "}
                          {character.homeworldData.name}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="text-foreground font-semibold">
                            Terrain:
                          </span>{" "}
                          {character.homeworldData.terrain !== "unknown"
                            ? character.homeworldData.terrain
                            : "Unknown"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          <span className="text-foreground font-semibold">
                            Climate:
                          </span>{" "}
                          {character.homeworldData.climate !== "unknown"
                            ? character.homeworldData.climate
                            : "Unknown"}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="text-foreground font-semibold">
                            Population:
                          </span>{" "}
                          {character.homeworldData.population !== "unknown"
                            ? character.homeworldData.population
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Films */}
                {character.filmTitles && character.filmTitles.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-primary/30">
                      Films
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {character.filmTitles.map((title, index) => (
                        <span
                          key={index}
                          className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CharacterModal;
