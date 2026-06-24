import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Bot, User, Send, Sparkles, ArrowRight } from "lucide-react";
import { sendMessage } from "@/lib/gemini";

const ChatBotPage = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", text: t("chatbot.greeting") }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => inputRef.current?.focus(), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const history = messages.map(({ role, text }) => ({ role, text }));
      const reply = await sendMessage(text, history, i18n.language || "en", location.pathname);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: t("chatbot.error") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleViewTours = () => {
    navigate("/tours");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="h-8 w-8 text-white/90" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t("chatbot.pageTitle")}
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              {t("chatbot.pageSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Container */}
      <section className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col h-[600px] max-h-[calc(100vh-280px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-5 w-5 text-orange-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-5 py-3 rounded-2xl text-base leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white rounded-br-md"
                      : "bg-gray-50 text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-orange-600" />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chatbot.placeholder")}
                disabled={loading}
                className="flex-1 px-5 py-3 text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="h-12 w-12 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                aria-label={t("chatbot.send")}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center mt-3">
              <button
                onClick={handleViewTours}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 transition-colors"
              >
                {t("chatbot.browseTours")}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatBotPage;
