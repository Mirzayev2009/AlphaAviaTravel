import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Bot } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ChatPanel from "./ChatPanel";
gsap.registerPlugin(useGSAP);

export default function ChatBot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const launcher = useRef(null);
  useGSAP(() => {
    if (!open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".floating-chat", { y: 12, scale: .98, opacity: .75 }, { y: 0, scale: 1, opacity: 1, duration: .32, ease: "power3.out", clearProps: "transform,opacity" });
  }, { scope: root, dependencies: [open], revertOnUpdate: true });
  useEffect(() => {
    if (!open) return;
    const escape = (event) => { if (event.key === "Escape") { setOpen(false); launcher.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  function close() { setOpen(false); launcher.current?.focus(); }
  return <div ref={root}>
    {open && <section className="floating-chat" role="dialog" aria-modal="false" aria-labelledby="floating-chat-title" id="floating-chat">
      <div className="floating-chat-header"><Bot size={21}/><h2 id="floating-chat-title">{t("chatbot.title")}</h2><button className="icon-button" aria-label={t("chatbot.close")} onClick={close}><X size={18}/></button></div><ChatPanel focusInput/>
    </section>}
    <button ref={launcher} className="chat-launcher" aria-label={t(open ? "chatbot.close" : "chatbot.open")} aria-expanded={open} aria-controls={open ? "floating-chat" : undefined} onClick={() => open ? close() : setOpen(true)}>{open ? <X size={22}/> : <MessageCircle size={23}/>}</button>
  </div>;
}
