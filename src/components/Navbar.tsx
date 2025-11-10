import { Link, useLocation } from "react-router-dom";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-3xl font-bold tracking-wider">
            <span className="text-foreground">STAR</span>
            <span className="text-primary ml-2">WARS</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground"
            }`}
          >
            About
          </Link>
          <Link
            to="/characters"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/characters") ? "text-primary" : "text-foreground"
            }`}
          >
            Characters
          </Link>
          <Link
            to="/movies"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/movies") ? "text-primary" : "text-foreground"
            }`}
          >
            Movies & TV Shows
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => (window.location.href = "/login")}
          >
            <User />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
