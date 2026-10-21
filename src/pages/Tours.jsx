import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TourCard from "@/components/TourCard";
import { CategoryTabs, LoadingCards, PageIntro, StateMessage, TextLink } from "@/components/TravelUI";
import { useTravelData, categoryTours } from "@/hooks/use-travel-data";

export default function Tours() {
  const { t } = useTranslation();
  const [category, setCategory] = useState("uzbekistan");
  const [params] = useSearchParams();
  const query = useTravelData("tours", "tours");
  const records = categoryTours(query.data, category, query.language);
  const recommendations = (params.get("recommend") || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  return <>
    <PageIntro title={t("tours.title")} description={t("tours.subtitle")}/>
    <section className="catalog-section"><div className="site-container">
      <CategoryTabs value={category} onChange={setCategory}/>
      {!query.isPending && <p className="catalog-count" aria-live="polite">{t("design.tourCount", { count: records.length })}</p>}
      {query.isPending ? <LoadingCards count={6}/> : query.isError ? <StateMessage title={t("design.loadError")} description={t("design.retryDescription")} retry={() => query.refetch()}/> : records.length ?
        <div className="tour-grid">{records.map((tour, index) => {
          const option = records.slice(0, index).filter((item) => item.id === tour.id).length;
          return <TourCard key={tour.id + "-" + option} tour={tour} option={option} highlighted={recommendations.some((keyword) => [tour.id, tour.title, tour.destination].some((value) => value?.toLowerCase().includes(keyword)))}/>;
        })}</div> :
        <StateMessage title={t("design.noTours")} description={t("design.emptyTours")}><TextLink to="/contact">{t("header.nav.contact")}</TextLink></StateMessage>}
    </div></section>
  </>;
}
