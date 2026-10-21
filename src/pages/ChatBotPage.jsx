import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ChatPanel from "@/components/ChatPanel";
import IntroBackdrop from "@/components/IntroBackdrop";
export default function ChatBotPage() {
  const { t } = useTranslation();
  return <div className="chat-page"><div className="site-container"><div className="chat-page-heading" data-motion="intro"><IntroBackdrop/><div className="intro-copy"><h1>{t("chatbot.pageTitle")}</h1><p>{t("chatbot.pageSubtitle")}</p></div><Link className="button button--secondary" to="/tours">{t("chatbot.browseTours")}<ArrowUpRight size={16}/></Link></div><section className="chat-workspace" aria-label={t("chatbot.title")}><ChatPanel/></section></div></div>;
}
