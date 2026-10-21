import { lazy, Suspense, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import ScrollToTop from "./ScrollToTop";
const SiteMotion = lazy(() => import("./SiteMotion"));

export default function Layout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const root = useRef(null);
  const isChatPage = pathname.replace(/\/+$/, "") === "/chatbot";
  return <div ref={root} className="site-layout">
    <a className="skip-link" href="#main-content">{t("design.skipToContent")}</a>
    <ScrollToTop/><Header overlay={pathname === "/"}/><main id="main-content" className="site-main" tabIndex={-1}><Outlet/></main><Footer/>
    {!isChatPage && <ChatBot/>}
    <Suspense fallback={null}><SiteMotion root={root} page={pathname}/></Suspense>
  </div>;
}
