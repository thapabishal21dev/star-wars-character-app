# Star Wars Character Explorer

A modern web application for exploring Star Wars characters, their details, and related information from the Star Wars universe. Built with React, TypeScript, and Tailwind CSS.

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd star-wars-character-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Other Available Scripts

- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run tests using Vitest
- `npm run test:ui` - Run tests with UI interface

## ✨ What Was Implemented

### Core Features

1. **Character Search**

   - Search characters by name only
   - Real-time search with autocomplete suggestions
   - Character name suggestions dropdown

2. **Advanced Filtering System**

   - Filter on the right side with select buttons
   - Filter by three categories:
     - **Homeworld**: Filter characters by their home planet
     - **Film**: Filter characters by the films they appear in
     - **Species**: Filter characters by their species
   - Active filters displayed below the search bar with category indicators
   - Easy filter removal with individual or "Clear All" option

3. **Character Display**

   - Grid layout showing character cards
   - Character cards with name, homeworld, films, and species information
   - Pagination support for browsing through character pages
   - Responsive design for mobile, tablet, and desktop

4. **Character Modal**

   - Detailed character information modal
   - Displays biography, physical attributes, and homeworld details
   - Fetches and displays homeworld information dynamically
   - Formatted dates and measurements

5. **Integration Testing**
   - Comprehensive test suite for CharacterModal component
   - Tests verify modal opens with correct character details
   - Tests verify homeworld data fetching and display
   - Tests verify date formatting and data presentation

### Bonus Features

1. **Orbitron Font Integration**

   - Applied Orbitron font throughout the application for a futuristic Star Wars aesthetic
   - Font loaded from Google Fonts with variable weights (400-900)

2. **Enhanced UI/UX**

   - Smooth animations and transitions
   - Visual indicators for filter categories (icons for homeworld, film, species)
   - Active filter badges with category labels

3. **Performance Optimizations**
   - Memoized filter calculations for better performance
   - Efficient data fetching and caching
   - Optimized re-renders using React hooks

## 🎨 Design Choices & Trade-offs

### Design Choices

1. **Separate Search and Filter Systems**

   - **Choice**: Search is limited to character names only, while filtering uses a dedicated sidebar
   - **Rationale**: This provides clear separation of concerns - search is for quick name lookup, while filters are for complex multi-criteria filtering. This improves user experience by making the interface more intuitive.

2. **Filter Sidebar on Right Side**

   - **Choice**: Filters are in a fixed sidebar on the right side of the screen
   - **Rationale**: Keeps filters accessible without cluttering the main content area. The sidebar can be toggled open/closed, maintaining a clean interface when not in use.

3. **Active Filters Display Below Search Bar**

   - **Choice**: Active filters are shown as badges directly below the search bar
   - **Rationale**: Users can see what filters are applied at a glance without opening the sidebar. This provides immediate feedback and easy filter management.

4. **Orbitron Font**

   - **Choice**: Used Orbitron font family throughout the application
   - **Rationale**: Creates a futuristic, sci-fi aesthetic that matches the Star Wars theme. The font is readable and adds character to the application.

5. **AND Logic for Multiple Filters**
   - **Choice**: When multiple filters are applied, characters must match ALL filters
   - **Rationale**: This allows for precise filtering. Users can combine filters (e.g., "Tatooine" homeworld AND "A New Hope" film) to find specific character subsets.

### Trade-offs

https://akabab.github.io/starwars-api/api/all.json
**Add another api for listing character images**

- **api-link**: https://akabab.github.io/starwars-api/api/all.json,this api is used to fetch all
  character images

**Search Limited to Character Names**

- **Trade-off**: Users cannot search by homeworld, film, or species names in the search bar
- **Reason**: This simplifies the search interface and makes it faster. Users can use the filter sidebar for category-based filtering, which is more appropriate for those use cases.

**Single Page Character Loading**

- **Trade-off**: Only one page of characters is loaded at a time
- **Reason**: Reduces initial load time and memory usage. However, filters only apply to the current page.

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **React Router** - Routing
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities
- **Lucide React** - Icon library
- **SWAPI** - Star Wars API for character data

## 📁 Project Structure

```
src/
├── components/
│   ├── CharacterCard.tsx      # Character card component
│   ├── CharacterModal.tsx     # Character detail modal
│   ├── CharacterModal.test.tsx # Modal integration tests
│   ├── FilterSidebar.tsx       # Filter sidebar component
│   ├── SearchFilter.tsx        # Search input component
│   ├── Pagination.tsx          # Pagination controls
│   └── ui/                     # shadcn/ui components
├── pages/
│   └── Characters.tsx         # Main characters page
├── test/
│   └── setup.ts                # Test configuration
└── index.css                   # Global styles with Orbitron font
```

## 🧪 Testing

Run tests with:

```bash
npm run test
```

The test suite includes integration tests for the CharacterModal component, verifying that:

- The modal opens with correct character details
- Homeworld data is fetched and displayed correctly
- Dates and measurements are formatted properly
- The modal handles null character states

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Data provided by [SWAPI - The Star Wars API](https://swapi.dev/)
- Font: [Orbitron by Google Fonts](https://fonts.google.com/specimen/Orbitron)
