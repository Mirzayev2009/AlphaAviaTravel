import { useTranslation } from "react-i18next";
import { TravelImage } from "./TravelUI";

export default function TeamGrid({ members = [] }) {
  const { t } = useTranslation();
  return <div className="team-grid">{members.map((member) => <article className="team-member" data-motion="card" key={member.id}>
    <div className="team-portrait"><TravelImage src={member.image} alt={member.name}/></div><h3>{member.name}</h3><p className="team-role">{member.role}</p><p className="team-languages">{member.languages?.join(" · ")}</p>
    <details className="team-bio" data-motion-disclosure><summary>{t("design.readBiography")}</summary><p>{member.bio}</p></details>
  </article>)}</div>;
}
