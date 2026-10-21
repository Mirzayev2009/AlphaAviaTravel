import { useTranslation } from "react-i18next";
import { PageIntro } from "@/components/TravelUI";
import ChatPanel from "@/components/ChatPanel";
export default function ChatBotPage() {
  const { t } = useTranslation();
  return <div className="chat-page"><PageIntro title={t("chatbot.pageTitle")} description={t("chatbot.pageSubtitle")}/><section className="site-container"><ChatPanel/></section></div>;
}
