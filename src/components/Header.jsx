import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t("header.nav.home"), path: "/" },
    { name: t("header.nav.tours"), path: "/tours" },
    { name: t("header.nav.destinations"), path: "/destinations" },
    { name: t("header.nav.about"), path: "/about" },
    { name: t("header.nav.gallery"), path: "/gallery" },
    { name: t("header.nav.contact"), path: "/contact" },
    { name: t("header.nav.services"), path: "/services" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center  space-x-2 font-bold text-xl text-orange-400 hover:opacity-80 transition-opacity">
          <span>AlphaTravel</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange-400 text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Language Selector & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2" aria-label={t("header.language")}>
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={i18n.language === lang.code ? "bg-muted" : ""}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
         <Link to="/visa/questions">
    
            <motion.button
              onClick={() => navigate("/visa/questions")}
              className="relative flex  items-center justify-center  px-4 py-2 rounded-xl font-semibold text-orange-500 bg-white border border-orange-300 shadow-md overflow-hidden transition-all duration-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              whileHover={{
                scale: 1.07,
                color: "#fff",
                backgroundColor: "#fb923c",
                boxShadow: "0 0 40px rgba(255,140,0,0.6)",
                transition: { type: "spring", stiffness: 200, damping: 12 },
              }}
              whileTap={{
                scale: 0.94,
                boxShadow: "0 0 20px rgba(255,100,0,0.7)",
              }}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="font-semibold"
              >
                VISA
              </motion.span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
              </motion.div>

              {/* Animated shimmer overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 opacity-0 rounded-xl"
                whileHover={{
                  opacity: 0.25,
                  x: [0, 50, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          
         </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-orange-400 text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
