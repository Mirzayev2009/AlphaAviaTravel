import { createElement, useEffect, useId, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bot, ArrowUp, ArrowUpRight, Map, Route, Bus, Square, RotateCcw, TriangleAlert } from "lucide-react";
import { sendMessage } from "@/lib/gemini";
import { createChatSession } from "@/lib/chat-session";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ChatMessage from "./ChatMessage";

gsap.registerPlugin(useGSAP);
const session = createChatSession(sendMessage);

export default function ChatPanel({ focusInput = false, headerActions, onNavigate, Title = "h2", Description = "p" }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { messages, draft: input, status } = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
  const loading = status === "loading";
  const inputId = useId();
  const root = useRef(null);
  const list = useRef(null);
  const field = useRef(null);
  const nearBottom = useRef(true);
  const previousCount = useRef(messages.length);
  const lastMessage = messages.at(-1);
  const previousMessage = useRef(lastMessage?.id);
  const previousStatus = useRef(status);
  const context = { language: i18n.resolvedLanguage || "en", page: location.pathname };
  useGSAP(() => {
    const arrived = lastMessage?.id !== previousMessage.current && !!lastMessage;
    const changedStatus = status !== previousStatus.current;
    previousMessage.current = lastMessage?.id;
    previousStatus.current = status;
    if (!arrived && !changedStatus) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const feedback = gsap.timeline({ defaults: { ease: "power2.out", clearProps: "transform,opacity", overwrite: "auto" } });
      if (arrived && (lastMessage.role === "user" || nearBottom.current)) {
        const latest = list.current.querySelector(".chat-message:last-child");
        feedback.fromTo(latest, { y: 5, opacity: .85 }, { y: 0, opacity: 1, duration: .2 }, 0);
      }
      if (changedStatus) feedback.fromTo(".chat-send svg", { opacity: .75 }, { opacity: 1, duration: .14 }, 0);
      const state = root.current.querySelector(".chat-thinking, .chat-feedback");
      if (changedStatus && state) feedback.fromTo(state, { opacity: .65 }, { opacity: 1, duration: .18 }, 0);
    });
    return () => media.revert();
  }, { scope: root, dependencies: [lastMessage?.id, status], revertOnUpdate: true });
  useEffect(() => { if (focusInput) field.current?.focus(); }, [focusInput]);
  useLayoutEffect(() => {
    if (!field.current) return;
    field.current.style.height = "auto";
    field.current.style.height = Math.min(field.current.scrollHeight, 144) + "px";
    if (messages.length && nearBottom.current && list.current) list.current.scrollTop = list.current.scrollHeight;
  }, [input, messages.length]);
  useEffect(() => {
    if (!list.current) return;
    if (!messages.length) { list.current.scrollTop = 0; nearBottom.current = true; previousCount.current = 0; return; }
    const ownMessage = messages.length !== previousCount.current && messages.at(-1)?.role === "user";
    if (nearBottom.current || ownMessage) list.current.scrollTop = list.current.scrollHeight;
    previousCount.current = messages.length;
  }, [messages, status]);
  function submit(event) {
    event.preventDefault();
    if (!loading) session.send(input, context);
  }
  return <div ref={root} className="chat-panel">
    <header className="chat-toolbar">
      <div className="chat-avatar" aria-hidden="true"><Bot size={21}/></div><div className="chat-toolbar-copy">{createElement(Title, { className: "chat-toolbar-title", title: t("chatbot.title") }, t("chatbot.title"))}{createElement(Description, { className: "chat-toolbar-description" }, t("chatbot.subtitle"))}</div>
      <div className="chat-toolbar-actions">{messages.length > 0 && <button className="chat-icon-button" type="button" onClick={() => { session.reset(); field.current?.focus(); }} aria-label={t("design.chatNew")} title={t("design.chatNew")}><RotateCcw size={18}/></button>}{headerActions}</div>
    </header>
    <div className="chat-messages" ref={list} onScroll={() => { const node = list.current; nearBottom.current = node.scrollHeight - node.scrollTop - node.clientHeight < 72; }}>
      {!messages.length ? <div className="chat-welcome">
        <div className="chat-welcome-icon" aria-hidden="true"><Bot size={30}/></div><h3>{t("design.chatWelcome")}</h3><p>{t("design.chatWelcomeDescription")}</p>
        <div className="chat-suggestions">{[[Map, "Tour"], [Route, "Route"], [Bus, "Transport"]].map(([Icon, key]) => <button type="button" key={key} onClick={() => { session.setDraft(t("design.chatPrompt" + key)); field.current?.focus(); }}>{createElement(Icon, { size: 19, "aria-hidden": true })}<span>{t("design.chatSuggestion" + key)}</span><ArrowUpRight size={15} aria-hidden="true"/></button>)}</div>
      </div> : <div className="chat-conversation" role="log" aria-live="polite" aria-relevant="additions" aria-label={t("chatbot.title")}>
        {messages.map((message) => <article key={message.id} className={"chat-message chat-message--" + message.role}>
          <span className="chat-message-label">{t(message.role === "user" ? "design.chatYou" : "chatbot.title")}</span>
          <div className="chat-bubble">{message.role === "assistant" ? <ChatMessage text={message.text}/> : <p>{message.text}</p>}</div>
        </article>)}
      </div>}
      {loading && <div className="chat-thinking" role="status"><span className="chat-thinking-mark" aria-hidden="true"/><span>{t("design.thinking")}</span></div>}
      {(status === "error" || status === "stopped") && <div className={"chat-feedback" + (status === "error" ? " chat-feedback--error" : "")} role={status === "error" ? "alert" : "status"}>
        {status === "error" && <TriangleAlert size={18} aria-hidden="true"/>}<p>{t(status === "error" ? "chatbot.error" : "design.chatStopped")}</p><button type="button" onClick={() => session.retry(context)}>{t("design.retry")}</button>
      </div>}
    </div>
    <form className="chat-input-area" onSubmit={submit}><div className="chat-input-row">
      <label className="sr-only" htmlFor={inputId}>{t("chatbot.placeholder")}</label><textarea ref={field} id={inputId} name="message" rows={1} autoComplete="off" value={input} maxLength={3000} onChange={(event) => session.setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229 && !window.matchMedia("(pointer: coarse)").matches) { event.preventDefault(); if (!loading) session.send(input, context); } }} placeholder={t("design.chatPlaceholder")} aria-describedby={inputId + "-hint"}/>
      {loading ? <button type="button" className="chat-send" onClick={session.stop} aria-label={t("design.chatStop")} title={t("design.chatStop")}><Square size={15} fill="currentColor"/></button> : <button type="submit" className="chat-send" disabled={!input.trim()} aria-label={t("chatbot.send")}><ArrowUp size={21}/></button>}
    </div><div className="chat-input-meta"><span id={inputId + "-hint"}>{t("design.chatInputHint")}</span><Link to="/contact" onClick={onNavigate}>{t("design.chatContact")}</Link></div></form>
  </div>;
}
