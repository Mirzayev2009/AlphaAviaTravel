import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe, MessageCircle, ChevronDown, Check } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" }, { code: "ru", name: "Русский" },
  { code: "es", name: "Español" }, { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" }, { code: "zh", name: "中文" }, { code: "uz", name: "O‘zbek" },
];

export default function Header({ overlay = false }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const language = (i18n.resolvedLanguage || "en").split("-")[0];
  const items = [["home", "/"], ["tours", "/tours"], ["destinations", "/destinations"], ["services", "/services"], ["gallery", "/gallery"], ["about", "/about"], ["contact", "/contact"]];
  useEffect(() => {
    if (!overlay) return;
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [overlay]);
  useEffect(() => {
    if (!open) return;
    const escape = (event) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return <header className={`site-header${overlay ? " site-header--home" : ""}${overlay && !scrolled && !open ? " site-header--over-hero" : ""}`}>
    <div className="site-container header-inner">
      <Link className="brand-name" to="/" onClick={() => setOpen(false)}>Alpha <span>Avia</span> Travel</Link>
      <nav className="desktop-nav" aria-label={t("design.mainNavigation")}>
        {items.map(([key, path]) => <NavLink key={path} to={path} end={path === "/"}>{t("header.nav." + key)}</NavLink>)}
      </nav>
      <div className="header-actions">
        <Link to="/chatbot" className="header-assistant" aria-label={t("chatbot.navLabel")} onClick={() => setOpen(false)}><MessageCircle size={19}/></Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><button type="button" className="language-button" aria-label={t("header.language")}><Globe size={16}/><span>{language.toUpperCase()}</span><ChevronDown size={12}/></button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((item) => <DropdownMenuItem key={item.code} onSelect={() => i18n.changeLanguage(item.code)} className="min-h-11 gap-3">
              <span className="text-muted-foreground w-6 text-xs">{item.code.toUpperCase()}</span>{item.name}{language === item.code && <Check size={14} className="ml-auto" aria-hidden="true"/>}
            </DropdownMenuItem>)}
          </DropdownMenuContent>
        </DropdownMenu>
        <button ref={menuButton} type="button" className="menu-toggle" aria-label={t("header.toggleMenu")} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label={t("design.mainNavigation")}>
      {items.map(([key, path]) => <NavLink key={path} to={path} end={path === "/"} onClick={() => setOpen(false)}>{t("header.nav." + key)}</NavLink>)}
      <NavLink to="/chatbot" onClick={() => setOpen(false)}>{t("chatbot.navLabel")}</NavLink>
    </nav>}
  </header>;
}
