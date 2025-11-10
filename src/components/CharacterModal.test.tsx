import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterModal from "./CharacterModal";

// Mock fetch for homeworld data
global.fetch = vi.fn();

describe("CharacterModal Integration Test", () => {
  const mockCharacter = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    species: [],
    created: "2014-12-09T13:50:51.644000Z",
    url: "https://swapi.dev/api/people/1/",
    image: "https://example.com/luke.jpg",
    homeworldName: "Tatooine",
    homeworldData: {
      name: "Tatooine",
      rotation_period: "23",
      orbital_period: "304",
      diameter: "10465",
      climate: "arid",
      gravity: "1 standard",
      terrain: "desert",
      surface_water: "1",
      population: "200000",
      residents: [],
      films: [],
      created: "2014-12-09T13:50:49.641000Z",
      edited: "2014-12-20T20:58:18.411000Z",
      url: "https://swapi.dev/api/planets/1/",
    },
    speciesNames: ["Human"],
    filmTitles: ["A New Hope"],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens modal with correct character details", async () => {
    const onClose = vi.fn();

    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    // Check if modal is open and displays character name
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

    // Check if character details are displayed
    expect(screen.getByText(/Height:/i)).toBeInTheDocument();
    expect(screen.getByText(/1\.72m/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass:/i)).toBeInTheDocument();
    expect(screen.getByText(/77 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/Date added:/i)).toBeInTheDocument();
    expect(screen.getByText(/09-12-2014/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of films:/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth year:/i)).toBeInTheDocument();
    expect(screen.getByText(/19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();

    // Check if homeworld details are displayed
    expect(screen.getByText(/Homeworld/i)).toBeInTheDocument();
    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Terrain:/i)).toBeInTheDocument();
    expect(screen.getByText(/desert/i)).toBeInTheDocument();
    expect(screen.getByText(/Climate:/i)).toBeInTheDocument();
    expect(screen.getByText(/arid/i)).toBeInTheDocument();
    expect(screen.getByText(/Population:/i)).toBeInTheDocument();
    expect(screen.getByText(/200000/i)).toBeInTheDocument();

    // Check if films are displayed
    expect(screen.getByText(/Films/i)).toBeInTheDocument();
    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
  });

  it("displays formatted date correctly", () => {
    const onClose = vi.fn();

    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    // Check if date is displayed (formatted as dd-MM-yyyy)
    expect(screen.getByText(/Date added:/i)).toBeInTheDocument();
    expect(screen.getByText(/09-12-2014/i)).toBeInTheDocument();
  });

  it("displays number of films correctly", () => {
    const onClose = vi.fn();

    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    // Check if number of films is displayed
    expect(screen.getByText(/Number of films:/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it("displays homeworld details correctly", () => {
    const onClose = vi.fn();

    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    // Verify all homeworld details are present
    expect(screen.getByText(/Homeworld/i)).toBeInTheDocument();
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Terrain:/i)).toBeInTheDocument();
    expect(screen.getByText(/desert/i)).toBeInTheDocument();
    expect(screen.getByText(/Climate:/i)).toBeInTheDocument();
    expect(screen.getByText(/arid/i)).toBeInTheDocument();
    expect(screen.getByText(/Population:/i)).toBeInTheDocument();
    expect(screen.getByText(/200000/i)).toBeInTheDocument();
  });

  it("does not render when character is null", () => {
    const onClose = vi.fn();

    const { container } = render(
      <CharacterModal character={null} isOpen={true} onClose={onClose} />
    );

    // Modal should not render any content when character is null
    expect(container.firstChild).toBeNull();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    // Find and click the close button
    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    // Verify onClose was called
    expect(onClose).toHaveBeenCalled();
  });
});
