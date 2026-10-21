import "@/styles/intro-backdrop.css";

/** Architectural curves echo the warm light and vaulted forms of the Silk Road. */
export default function IntroBackdrop({ className = "" }) {
  return <div className={`intro-backdrop ${className}`} aria-hidden="true">
    <svg className="intro-backdrop-art intro-backdrop-art--left" viewBox="0 0 420 480" fill="none" focusable="false" preserveAspectRatio="xMinYMid slice">
      <path d="M-175 454C-14 454 117 323 117 162V-84" stroke="#FFE8C7" strokeWidth="138"/>
      <path d="M-175 454C-14 454 117 323 117 162V-84" stroke="#FFD8A1" strokeWidth="78"/>
      <path d="M-175 454C-14 454 117 323 117 162V-84" stroke="#FFC36E" strokeWidth="28"/>
      <path d="M-175 454C-14 454 117 323 117 162V-84" stroke="#FFF0D8" strokeWidth="2"/>
      <path d="M-162 505C41 505 205 341 205 138V-84" stroke="#E7B577" strokeOpacity=".5"/>
      <path d="M-155 536C66 536 245 357 245 136V-84" stroke="#E7B577" strokeOpacity=".28"/>
    </svg>

    <svg className="intro-backdrop-art intro-backdrop-art--right" viewBox="0 0 520 480" fill="none" focusable="false" preserveAspectRatio="xMaxYMid slice">
      <path d="M590-90H218C66-90 7 49 81 177L306 566H650V-90Z" fill="#FFE5BC"/>
      <path d="M590-90H275C139-90 85 27 153 145L396 566H650V-90Z" fill="#FFD296"/>
      <path d="M590-90H334C213-90 166 11 226 115L487 566H650V-90Z" fill="#FFB65B"/>
      <path d="M590-90H395C290-90 247-3 299 87L577 566H650V-90Z" fill="#FA962F"/>
      <path d="M590-90H454C364-90 329-18 373 59L650 540V-90Z" fill="#E87D1C"/>
      <path d="M218-90C66-90 7 49 81 177L306 566" stroke="#FFF6E8" strokeWidth="2"/>
      <path d="M275-90C139-90 85 27 153 145L396 566" stroke="#FFF1D7" strokeOpacity=".75"/>
      <path d="M334-90C213-90 166 11 226 115L487 566" stroke="#FFF0D3" strokeOpacity=".7"/>
    </svg>

    <svg className="intro-backdrop-detail" viewBox="0 0 1440 420" fill="none" focusable="false" preserveAspectRatio="none">
      <path pathLength="1" d="M-80 368H54C153 368 211 327 249 259L315 142C355 71 404 40 464 40H518" stroke="#CE8B45" strokeOpacity=".2"/>
      <path pathLength="1" d="M1018 392H1049C1091 392 1128 370 1149 333L1229 194C1270 123 1328 84 1412 84H1500" stroke="#D18D43" strokeOpacity=".27"/>
    </svg>
  </div>;
}
