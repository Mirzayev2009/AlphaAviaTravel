import { useTranslation } from "react-i18next";
import TeamGrid from "@/components/TeamGrid";
import { PageIntro, SectionHeading, TravelImage, LoadingCards, StateMessage } from "@/components/TravelUI";
import { useTravelData } from "@/hooks/use-travel-data";
export default function About() {
  const { t } = useTranslation();
  const team = useTravelData("team", "team");
  return <>
    <PageIntro title={t("about.title")} description={t("about.subtitle")}/>
    <section className="section pt-5"><div className="site-container about-story" data-motion="composition">
      <TravelImage src="/data/images/samarqand/registan_square.png" alt="Registan Square, Samarkand" sizes="(max-width: 768px) calc(100vw - 40px), 600px"/>
      <div className="about-story-copy"><p>{t("about.story")}</p><p>{t("about.mission")}</p></div>
    </div></section>
    <section className="section section--soft"><div className="site-container"><SectionHeading title={t("about.teamTitle")} description={t("about.teamSubtitle")}/>
      {team.isPending ? <LoadingCards/> : team.isError ? <StateMessage title={t("about.errorLoading")} retry={() => team.refetch()}/> : <TeamGrid members={team.localized}/>}
    </div></section>
  </>;
}
