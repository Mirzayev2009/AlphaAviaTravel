import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/TravelUI";
export default function NotFound() {
  const { t } = useTranslation();
  return <section className="section text-center"><PageIntro title="404" description={t("design.notFound")}/><Link className="button" to="/">{t("header.nav.home")}<ArrowRight size={16}/></Link></section>;
}
