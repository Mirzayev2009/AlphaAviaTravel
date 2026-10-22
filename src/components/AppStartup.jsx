import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import App from "../App";
import i18n, { ready } from "../i18n";
import { loadSiteMotion } from "../lib/site-motion-loader";
import JourneyLoader from "./JourneyLoader";

// This lives outside the router: only a new document (arrival/refresh) gets the intro.
export default function AppStartup() {
  const [languageReady, setLanguageReady] = useState(i18n.isInitialized);
  const [controllerReady, setControllerReady] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const completeIntro = useCallback(() => setIntroComplete(true), []);
  const revealPage = useCallback(() => setShowIntro(false), []);
  const completePage = useCallback(() => setPageReady(true), []);

  useEffect(() => {
    let alive = true;
    ready.then(() => { if (alive) setLanguageReady(true); });
    loadSiteMotion().then(() => { if (alive) setControllerReady(true); });
    return () => { alive = false; };
  }, []);

  useLayoutEffect(() => {
    if (!showIntro) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [showIntro]);

  const label = i18n.getResource(i18n.resolvedLanguage || i18n.language || "en", "translation", "design.loading")
    || i18n.getResource("en", "translation", "design.loading");

  return <>
    {languageReady && <div className="app-content" inert={showIntro} aria-hidden={showIntro || undefined}>
      <App motionReady={!showIntro} onPageReady={completePage}/>
    </div>}
    {showIntro && <div className="startup-overlay">
      <JourneyLoader fullPage label={label} onIntroComplete={completeIntro} onExitComplete={revealPage}
        ready={languageReady && controllerReady && pageReady && introComplete}/>
    </div>}
  </>;
}
