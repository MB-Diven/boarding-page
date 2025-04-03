import { Button } from "./ui/button";

import divenLogo from "../assets/logo_big.svg";
import divenLogoSmall from "../assets/logo_small.svg";

const Header = () => {
  const pathname = window.location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-5 mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a
            href="/"
            className="hidden md:flex items-center max-h-[50px] max-w-[125px] space-x-2"
          >
            <img
              width={500}
              className="object-cover w-[550px] h-[250px]"
              src={divenLogo}
              alt="Diven logo"
            />
          </a>
          <a
            href="/"
            className="flex md:hidden max-w-[50px] object-cover max-h-[50px] items-center space-x-2"
          >
            <img
              width={125}
              height={125}
              src={divenLogoSmall}
              alt="Diven logo"
              className="object-cover w-[125px] h-[125px]"
            />
          </a>
          <nav className={`hidden gap-6 ${pathname === "/" ? "md:flex" : ""}`}>
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
