import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import "@/styles/journey-loader.css";

// Particle positions on the orbital ring (angle in degrees → x,y offset from center)
const PARTICLES = [
  { angle: 285, r: 99, size: 5,  delay: 0 },
  { angle: 305, r: 99, size: 3.5,delay: .18 },
  { angle: 255, r: 99, size: 3,  delay: .32 },
  { angle: 270, r: 99, size: 2.5,delay: .55 },
];

// Build SVG arc path for an orbital sweep
// cx/cy=110 so the SVG viewBox is 220x220
const ORBIT_R = 99;
const CX = 110;
const CY = 110;

function polarToXY(angleDeg, r) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

// Arc from 220° to 310° (clockwise, large-arc=0)
const ARC_START = polarToXY(220, ORBIT_R);
const ARC_END   = polarToXY(310, ORBIT_R);
const ARC_PATH  = `M ${ARC_START.x.toFixed(2)} ${ARC_START.y.toFixed(2)} A ${ORBIT_R} ${ORBIT_R} 0 0 1 ${ARC_END.x.toFixed(2)} ${ARC_END.y.toFixed(2)}`;

const JourneyLoaderMotion = lazy(
  () => import("./JourneyLoaderMotion").catch(() => ({ default: () => null }))
);

export default function JourneyLoader({
  label, fullPage = false, onIntroComplete, onExitComplete, ready = false,
}) {
  const scope = useRef(null);
  const callbacks = useRef({ onIntroComplete, onExitComplete });
  const completed = useRef({ intro: false, exit: false });
  const [introStarted, setIntroStarted] = useState(false);
  const finiteIntro = typeof onIntroComplete === "function";
  const startIntro = useCallback(() => setIntroStarted(true), []);

  const logoRef = useCallback((node) => {
    if (node?.complete) startIntro();
  }, [startIntro]);

  const finishIntro = useCallback(() => {
    if (completed.current.intro) return;
    completed.current.intro = true;
    callbacks.current.onIntroComplete?.();
  }, []);

  const finishExit = useCallback(() => {
    if (completed.current.exit) return;
    completed.current.exit = true;
    callbacks.current.onExitComplete?.();
  }, []);

  useEffect(() => {
    callbacks.current = { onIntroComplete, onExitComplete };
  }, [onIntroComplete, onExitComplete]);

  useEffect(() => {
    if (!finiteIntro || introStarted) return;
    const deadline = window.setTimeout(startIntro, 800);
    return () => window.clearTimeout(deadline);
  }, [finiteIntro, introStarted, startIntro]);

  useEffect(() => {
    if (!finiteIntro || !introStarted) return;
    const deadline = window.setTimeout(finishIntro, 2000);
    return () => window.clearTimeout(deadline);
  }, [finiteIntro, introStarted, finishIntro]);

  useEffect(() => {
    if (!ready) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deadline = window.setTimeout(finishExit, reduced ? 0 : 350);
    return () => window.clearTimeout(deadline);
  }, [ready, finishExit]);

  return (
    <div
      ref={scope}
      className={`journey-loader${fullPage ? " journey-loader--full-page" : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="journey-loader__composition">
        <div className="journey-loader__emblem" aria-hidden="true">
          {/* Ambient glow */}
          <div className="journey-loader__glow" />

          {/* Orbital ring + arc SVG */}
          <svg
            className="journey-loader__ring-svg"
            viewBox="0 0 220 220"
            fill="none"
            focusable="false"
            aria-hidden="true"
          >
            {/* Dashed orbit track */}
            <circle
              className="journey-loader__orbit"
              cx={CX} cy={CY} r={ORBIT_R}
            />
            {/* Traveling amber arc */}
            <path
              className="journey-loader__arc"
              d={ARC_PATH}
              stroke="#ff8a00"
            />
            {/* Origin dot */}
            <circle
              className="journey-loader__origin-dot"
              cx={ARC_START.x.toFixed(2)}
              cy={ARC_START.y.toFixed(2)}
              r="3"
              fill="#f9a12b"
              opacity=".55"
            />
          </svg>

          {/* Particle dots */}
          {PARTICLES.map((p, i) => {
            const { x, y } = polarToXY(p.angle, p.r);
            return (
              <span
                key={i}
                className="journey-loader__particle"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `calc(50% + ${(x - CX).toFixed(1)}px - ${p.size / 2}px)`,
                  top:  `calc(50% + ${(y - CY).toFixed(1)}px - ${p.size / 2}px)`,
                  opacity: 0,
                }}
              />
            );
          })}

          {/* Logo */}
          <img
            ref={logoRef}
            className="journey-loader__logo"
            src="/alpha%20logo.jpg"
            alt=""
            width="112"
            height="112"
            fetchPriority="high"
            decoding="async"
            onLoad={startIntro}
            onError={startIntro}
          />
        </div>

        {/* Progress bar */}
        <div className="journey-loader__progress" aria-hidden="true">
          <div className="journey-loader__progress-fill" />
        </div>

        {/* Label */}
        {label && <p className="journey-loader__label">{label}</p>}
      </div>

      <Suspense fallback={null}>
        <JourneyLoaderMotion
          scope={scope}
          finiteIntro={finiteIntro}
          introStarted={!finiteIntro || introStarted}
          ready={ready}
          onIntroComplete={finishIntro}
          onExitComplete={finishExit}
        />
      </Suspense>
    </div>
  );
}
