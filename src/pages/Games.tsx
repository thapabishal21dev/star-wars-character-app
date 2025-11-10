import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Games = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Games</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
