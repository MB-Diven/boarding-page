import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import divenLogo from "../assets/logo_big.svg";
import divenLogoSmall from "../assets/logo_small.svg";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link } from "react-router";

const Header = () => {
  const pathname = window.location.pathname;
  const { t } = useTranslation();

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
              {t("landing.features.title")}
            </a>
            <a
              href="#how-it-works"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t("landing.howItWorks.title")}
            </a>
            <a
              href="#pricing"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t("landing.pricing.title")}
            </a>
            <a
              href="#testimonials"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t("landing.testimonials.title")}
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex gap-2 items-center space-x-2">
            <LanguageSwitcher />
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t("login.title")}
            </Link>
            <Button asChild>
              <Link to="/onboard">{t("landing.header.register")}</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
