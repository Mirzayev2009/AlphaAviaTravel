import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return <div className="site-layout">
    <a className="skip-link" href="#main-content">{t("design.skipToContent")}</a>
    <ScrollToTop/><Header/><main id="main-content" className="site-main" tabIndex={-1}><Outlet/></main><Footer/>
    {pathname !== "/chatbot" && <ChatBot/>}
  </div>;
}
