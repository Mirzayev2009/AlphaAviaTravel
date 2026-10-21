import { createElement } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, FileText, Clock, Wallet, Calendar, Info } from "lucide-react";
import { PageIntro } from "@/components/TravelUI";

export default function VisaAnswer() {
  const { state: formData } = useLocation();
  const { t } = useTranslation();
  if (!formData?.fromCountry || !formData?.toCountry) return <Navigate to="/visa/questions" replace/>;

  const generateRequirements = () => {
    const requirements = {
      documents: [
        "Valid passport (minimum 6 months validity from travel date)",
        "Completed visa application form (signed)",
        "Recent passport-size photographs (2 copies, white background)",
        "Proof of accommodation (hotel booking or invitation letter)",
        "Return flight ticket or detailed travel itinerary",
        "Bank statements (last 3-6 months)",
        "Travel insurance policy covering medical expenses",
      ],
      processingTime: "5-10 business days",
      fee: "$100 - $150 USD",
      validity: "90 days from issue date",
      additional: [],
      tips: [
        "Apply at least 2-3 weeks before your intended travel date",
        "Ensure all documents are in English or officially translated",
        "Keep copies of all submitted documents",
      ],
    };

    // Add purpose-specific requirements
    switch (formData.visitPurpose) {
      case "Business":
        requirements.additional.push("Business invitation letter from host company");
        requirements.additional.push("Company registration documents");
        requirements.additional.push("Chamber of Commerce certificate");
        break;
      case "Study":
        requirements.additional.push("Acceptance letter from educational institution");
        requirements.additional.push("Proof of tuition payment or scholarship letter");
        requirements.additional.push("Academic transcripts");
        break;
      case "Work":
        requirements.additional.push("Employment contract from hiring company");
        requirements.additional.push("Work permit approval from immigration authorities");
        requirements.additional.push("Professional qualifications certificates");
        requirements.processingTime = "15-30 business days";
        requirements.fee = "$200 - $300 USD";
        break;
      case "Medical":
        requirements.additional.push("Medical appointment confirmation");
        requirements.additional.push("Doctor's letter explaining treatment needed");
        requirements.additional.push("Proof of payment for medical services");
        break;
      case "Family Visit":
        requirements.additional.push("Invitation letter from family member");
        requirements.additional.push("Proof of relationship (birth certificate, marriage certificate)");
        requirements.additional.push("Host's residence proof and ID copy");
        break;
    }

    // Add duration-specific requirements
    if (formData.stayDuration === "More than 6 months") {
      requirements.additional.push("Medical examination certificate from approved clinic");
      requirements.additional.push("Police clearance certificate");
      requirements.additional.push("Proof of sufficient funds for extended stay");
      requirements.processingTime = "20-30 business days";
    }

    return requirements;
  };

  const visaInfo = generateRequirements();
  return <div className="visa-page">
    <PageIntro title={t("design.visaResult")} description={formData.fromCountry + " → " + formData.toCountry}/>
    <section className="site-container catalog-section"><div className="visa-results">
      <div className="visa-summary" data-motion="composition"><h2>{t("design.visaOverview")}</h2><dl>{[["nationality", "nationality"], ["visitPurpose", "purpose"], ["stayDuration", "duration"]].map(([field, label]) => <div key={field}><dt>{t("design." + label)}</dt><dd>{formData[field]}</dd></div>)}</dl></div>
      <div className="visa-document-section" data-motion="composition"><FileText size={25}/><h2>{t("design.visaDocuments")}</h2><ul>{visaInfo.documents.map((document) => <li key={document}>{document}</li>)}</ul></div>
      {visaInfo.additional.length > 0 && <div className="visa-document-section" data-motion="composition"><h2>{t("design.visaAdditional")}</h2><ul>{visaInfo.additional.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      <div className="visa-facts" data-motion="composition">{[[Clock, "visaProcessing", visaInfo.processingTime], [Wallet, "visaFee", visaInfo.fee], [Calendar, "visaValidity", visaInfo.validity]].map(([Icon, key, value]) => <div key={key}>{createElement(Icon, { size: 23 })}<h3>{t("design." + key)}</h3><p>{value}</p></div>)}</div>
      <div className="visa-document-section" data-motion="composition"><h2>{t("design.visaTips")}</h2><ul>{visaInfo.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>
      <div className="visa-note" data-motion="composition"><Info size={21}/><p>{t("design.visaNote")}</p></div>
      <div className="visa-form-actions"><Link className="button button--secondary" to="/visa/questions"><ArrowLeft size={16}/>{t("design.visaAgain")}</Link><Link className="button" to="/contact">{t("header.nav.contact")}<ArrowRight size={16}/></Link></div>
    </div></section>
  </div>;
}
