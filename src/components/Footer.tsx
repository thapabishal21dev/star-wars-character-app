const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © StarWar {new Date().getFullYear()} - All Rights Reserved
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <p className="text-sm text-muted-foreground">
              Copyright {new Date().getFullYear()} - StarWar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
