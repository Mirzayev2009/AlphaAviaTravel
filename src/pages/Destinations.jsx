import { useState } from "react";
import { useTranslation } from "react-i18next";
import DestinationCard from "@/components/DestinationCard";
import DestinationDetailsDrawer from "@/components/DestinationDetailsDrawer";
import { PageIntro, LoadingCards, StateMessage } from "@/components/TravelUI";
import { useTravelData } from "@/hooks/use-travel-data";

export default function Destinations() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const query = useTravelData("destination", "destinations");
  return <>
    <PageIntro title={t("destinations.title")} description={t("destinations.subtitle")}/>
    <section className="catalog-section"><div className="site-container">
      {query.isPending ? <LoadingCards count={6}/> : query.isError ? <StateMessage title={t("design.loadError")} retry={() => query.refetch()}/> : <div className="destination-grid">{query.localized.map((destination) => <DestinationCard key={destination.id} destination={destination} onLearnMore={setSelected}/>)}</div>}
    </div></section>
    {selected && <DestinationDetailsDrawer key={selected.id} destination={selected} open onClose={() => setSelected(null)}/>}
  </>;
}
