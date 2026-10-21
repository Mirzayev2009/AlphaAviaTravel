import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { PageIntro } from "@/components/TravelUI";
const countries = [["United States", "US"], ["United Kingdom", "GB"], ["Germany", "DE"], ["France", "FR"], ["Spain", "ES"], ["Italy", "IT"], ["China", "CN"], ["Japan", "JP"], ["Australia", "AU"], ["Canada", "CA"], ["Uzbekistan", "UZ"], ["Russia", "RU"], ["Turkey", "TR"], ["UAE", "AE"], ["Thailand", "TH"], ["South Korea", "KR"], ["India", "IN"], ["Brazil", "BR"], ["Mexico", "MX"], ["Netherlands", "NL"]];
const purposes = ["Tourism", "Business", "Study", "Work", "Transit", "Medical", "Family Visit"];
const durations = ["Less than 15 days", "15-30 days", "1-3 months", "3-6 months", "More than 6 months"];
export default function VisaQuestion() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fromCountry: "", toCountry: "", nationality: "", visitPurpose: "", stayDuration: "" });
  const display = new Intl.DisplayNames([i18n.resolvedLanguage || "en"], { type: "region" });
  function submit(event) { event.preventDefault(); if (step === 1) setStep(2); else navigate("/visa/answer", { state: form }); }
  return <div className="visa-page"><PageIntro title={t("design.visaTitle")} description={t("design.visaSubtitle")}/>
    <section className="site-container catalog-section"><div className="visa-form-wrap">
      <ol className="visa-steps" aria-label={t("design.travelDetails")}>{[1, 2].map((value) => <li key={value} aria-current={step === value ? "step" : undefined} className={step >= value ? "is-current" : ""}><span>{step > value ? <Check size={16}/> : value}</span>{t(value === 1 ? "design.travelDetails" : "design.visitDetails")}</li>)}</ol>
      <form className="inquiry-form" onSubmit={submit}>
        <h2>{t(step === 1 ? "design.travelDetails" : "design.visitDetails")}</h2>
        {step === 1 ? ["fromCountry", "toCountry", "nationality"].map((name) => <div className="field mt-6" key={name}><label htmlFor={name}>{t("design." + name)}</label><select id={name} name={name} required value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })}><option value="">{t("design.choose")}</option>{countries.map(([name, code]) => <option key={code} value={name}>{display.of(code)}</option>)}</select></div>) :
          [["visitPurpose", purposes, "purpose", "visaPurposes"], ["stayDuration", durations, "duration", "visaDurations"]].map(([name, options, label, labels]) => <div className="field mt-6" key={name}><label htmlFor={name}>{t("design." + label)}</label><select id={name} name={name} required value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })}><option value="">{t("design.choose")}</option>{options.map((option, index) => <option key={option} value={option}>{t("design." + labels + "." + index)}</option>)}</select></div>)}
        <div className="visa-form-actions">{step === 2 && <button type="button" className="button button--secondary" onClick={() => setStep(1)}><ArrowLeft size={16}/>{t("design.back")}</button>}<button type="submit" className="button">{t(step === 1 ? "design.continue" : "design.checkVisa")}<ArrowRight size={16}/></button></div>
      </form>
    </div></section>
  </div>;
}
