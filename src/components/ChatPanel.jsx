import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bot, ArrowUp, ArrowRight } from "lucide-react";
import { sendMessage } from "@/lib/gemini";

export default function ChatPanel({ focusInput = false }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const list = useRef(null);
  const field = useRef(null);
  const controller = useRef(null);
  useEffect(() => { if (focusInput) field.current?.focus(); return () => controller.current?.abort(); }, [focusInput]);
  useEffect(() => { if (list.current) list.current.scrollTop = list.current.scrollHeight; }, [messages, loading]);
  async function submit(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput(""); setMessages((items) => [...items, { role: "user", text }]); setLoading(true);
    controller.current = new AbortController();
    try {
      const reply = await sendMessage(text, messages, i18n.resolvedLanguage || "en", location.pathname, controller.current.signal);
      setMessages((items) => [...items, { role: "assistant", text: reply }]);
    } catch (error) {
      if (error.name !== "AbortError") { setMessages((items) => [...items, { role: "assistant", text: t("chatbot.error"), error: true }]); setInput((current) => current || text); }
    } finally { setLoading(false); }
  }
  return <div className="chat-panel">
    <div className="chat-messages" ref={list} role="log" aria-live="polite" aria-label={t("chatbot.title")}>
      <div className="chat-message"><Bot size={20} aria-hidden="true"/><p className="chat-bubble">{t("chatbot.greeting")}</p></div>
      {messages.map((message, index) => <div key={index} className={"chat-message" + (message.role === "user" ? " chat-message--user" : "") + (message.error ? " chat-message--error" : "")}>{message.role === "assistant" && <Bot size={20} aria-hidden="true"/>}<p className="chat-bubble">{message.text}</p></div>)}
      {loading && <p className="text-sm text-muted-foreground" role="status">{t("design.thinking")}</p>}
    </div>
    <form className="chat-input-area" onSubmit={submit}><div className="chat-input-row">
      <label className="sr-only" htmlFor="travel-chat-input">{t("chatbot.placeholder")}</label><input ref={field} id="travel-chat-input" name="message" autoComplete="off" value={input} maxLength={3000} onChange={(event) => setInput(event.target.value)} placeholder={t("chatbot.placeholder")} disabled={loading}/>
      <button type="submit" className="button" disabled={loading || !input.trim()} aria-label={t("chatbot.send")}><ArrowUp size={20}/></button>
    </div><Link className="text-link" to="/tours">{t("chatbot.browseTours")}<ArrowRight size={14}/></Link></form>
  </div>;
}
