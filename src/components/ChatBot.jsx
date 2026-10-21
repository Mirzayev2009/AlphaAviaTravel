import { lazy, Suspense, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X } from "lucide-react";
const FloatingChat = lazy(() => import("./FloatingChat"));

export default function ChatBot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const launcher = useRef(null);
  function close() { setOpen(false); }
  return <>
    {hasOpened && <Suspense fallback={open ? <section className="floating-chat chat-loading" role="status"><p>{t("design.loading")}</p><button type="button" className="chat-icon-button" aria-label={t("chatbot.close")} onClick={() => { close(); launcher.current?.focus(); }}><X size={20}/></button></section> : null}><FloatingChat open={open} onClose={close} launcher={launcher}/></Suspense>}
    <button ref={launcher} className="chat-launcher" aria-label={t(open ? "chatbot.close" : "chatbot.open")} aria-expanded={open} aria-controls={open ? "floating-chat" : undefined} onClick={() => { if (open) close(); else { setHasOpened(true); setOpen(true); } }}>{open ? <X size={22}/> : <MessageCircle size={23}/>}</button>
  </>;
}
