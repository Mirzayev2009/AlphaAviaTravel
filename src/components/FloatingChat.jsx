import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Dialog from "@radix-ui/react-dialog";
import { Expand, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ChatPanel from "./ChatPanel";

gsap.registerPlugin(useGSAP);
const query = () => window.matchMedia("(max-width: 767px), (max-height: 480px) and (pointer: coarse)");
const subscribe = (listener) => { const media = query(); media.addEventListener("change", listener); return () => media.removeEventListener("change", listener); };

export default function FloatingChat({ open, onClose, launcher }) {
  const { t } = useTranslation();
  const compact = useSyncExternalStore(subscribe, () => query().matches, () => false);
  const root = useRef(null);
  const [node, setNode] = useState(null);
  const attach = useCallback((value) => { root.current = value; setNode(value); }, []);
  useGSAP(() => {
    if (!node || !open) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(node, { y: compact ? 6 : 8, opacity: .9 }, { y: 0, opacity: 1, duration: .24, ease: "power2.out", clearProps: "transform,opacity" });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [node, compact, open], revertOnUpdate: true });
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!compact || !node || !open || !viewport) return;
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--chat-viewport-height", viewport.height + "px");
        node.style.setProperty("--chat-viewport-top", viewport.offsetTop + "px");
      });
    };
    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => { cancelAnimationFrame(frame); viewport.removeEventListener("resize", update); viewport.removeEventListener("scroll", update); };
  }, [compact, node, open]);
  return <Dialog.Root open={open} modal={compact} onOpenChange={(nextOpen) => { if (!nextOpen) onClose(); }}>
    <Dialog.Portal>
      {compact && <Dialog.Overlay className="chat-backdrop"/>}
      <Dialog.Content ref={attach} className="floating-chat" id="floating-chat" onOpenAutoFocus={(event) => { event.preventDefault(); if (compact) root.current?.focus(); }} onCloseAutoFocus={(event) => { event.preventDefault(); launcher.current?.focus(); }} onInteractOutside={(event) => { if (!compact) event.preventDefault(); }}>
        <ChatPanel focusInput={!compact} onNavigate={onClose} Title={Dialog.Title} Description={Dialog.Description} headerActions={<>
          <Link className="chat-icon-button" to="/chatbot" aria-label={t("design.chatExpand")} title={t("design.chatExpand")}><Expand size={18}/></Link>
          <Dialog.Close asChild><button type="button" className="chat-icon-button" aria-label={t("chatbot.close")}><X size={20}/></button></Dialog.Close>
        </>}/>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
