import { createElement } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-grid">
      <div className="footer-brand"><Link className="brand-name" to="/">Alpha <span>Avia</span> Travel</Link><p>{t("footer.about")}</p></div>
      <div className="footer-column"><h3>{t("footer.quickLinks")}</h3><ul>{[["tours", "/tours"], ["destinations", "/destinations"], ["about", "/about"], ["gallery", "/gallery"], ["contact", "/contact"]].map(([key, path]) => <li key={key}><Link to={path}>{t("header.nav." + key)}</Link></li>)}</ul></div>
      <div className="footer-column footer-contact"><h3>{t("footer.contactInfo")}</h3><ul>
        <li>{t("contact.info.address")}</li><li><a href="tel:+998981013311">+998 98 101 33 11</a></li><li><a href="mailto:alpha.avia.travel@gmail.com">alpha.avia.travel@gmail.com</a></li>
      </ul></div>
      <div className="footer-column footer-social"><h3>{t("footer.followUs")}</h3><div className="social-links">
        {[[Facebook, "Facebook", "https://www.facebook.com/"], [Instagram, "Instagram", "https://www.instagram.com/"], [Twitter, "Twitter", "https://www.twitter.com/"]].map(([Icon, name, href]) => <a key={name} href={href} aria-label={name} target="_blank" rel="noreferrer">{createElement(Icon, { size: 18 })}</a>)}
      </div></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Alpha Avia Travel. {t("design.rights")}</span><span>Samarkand, Uzbekistan</span></div>
  </div></footer>;
}
