import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-5 mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">Diven</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            <a
              href="#features"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Testimonials
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex gap-2 items-center space-x-2">
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Login
            </a>
            <Button asChild>
              <a href="/onboard">Get Started</a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
