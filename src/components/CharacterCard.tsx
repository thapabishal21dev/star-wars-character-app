import { Card } from "@/components/ui/card";
import starWarsLogo from "@/assets/star-wars-logo.jpg";

interface CharacterCardProps {
  name: string;
  image?: string;
  homeworld?: string;
  films?: string[];
  species?: string[];
  onClick: () => void;
}

const CharacterCard = ({
  name,
  image,
  homeworld,
  films,
  species,
  onClick,
}: CharacterCardProps) => {
  return (
    <Card
      className="group relative overflow-visible bg-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl w-[260px]"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-black flex items-center justify-center border border-border">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-auto object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = starWarsLogo;
            }}
          />
        ) : (
          <img
            src={starWarsLogo}
            alt="Star Wars Logo"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>

      <div className={`p-3 space-y-2 relative z-10  text-white  `}>
        <h3 className="text-lg font-bold text-primary">{name}</h3>

        {species?.length > 0 && (
          <p className="text-xs text-white/90 truncate">{species.join(", ")}</p>
        )}
      </div>
    </Card>
  );
};

export default CharacterCard;
