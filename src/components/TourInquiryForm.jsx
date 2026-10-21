import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function TourInquiryForm({ tour }) {
  const { t, i18n } = useTranslation();
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", people: 1 });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const people = Number(form.people);
  const price = Number(tour.price) || 0;
  const money = (value) => new Intl.NumberFormat(i18n.resolvedLanguage || "en", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    if (!formRef.current.reportValidity()) return;
    if (!Number.isInteger(people) || people < 1) return;
    setPending(true); setError("");
    const payload = { ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), people, tourTitle: tour.title, unitPrice: price, totalPrice: price * people };
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/api/registrations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: controller.signal });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) throw new Error("inquiry-failed");
      setSubmitted(payload);
    } catch { setError(t("design.inquiryError")); }
    finally { clearTimeout(timer); setPending(false); }
  }
  return <section className="inquiry-section" id="inquiry"><div className="site-container inquiry-layout">
    <div className="inquiry-intro"><h2>{t("design.inquireTitle")}</h2><p>{t("design.inquireDescription")}</p><div className="inquiry-price">{money(price)}<small>{t("card.perPerson")}</small></div><a className="text-link" href="#itinerary">{t("tourDetail.FullAdventure.itinerary")}<ArrowRight size={16}/></a></div>
    {submitted ? <div className="success-panel" data-motion="feedback" role="status" aria-live="polite" tabIndex={-1}><CheckCircle2 size={36}/><h2>{t("design.inquiryReceived")}</h2><p>{t("design.inquiryFollowup")}</p><dl><dt>{t("tourDetail.confirmation.tour")}</dt><dd>{tour.title}</dd><dt>{t("tourDetail.confirmation.guests")}</dt><dd>{submitted.people}</dd><dt>{t("tourDetail.confirmation.totalCost")}</dt><dd>{money(submitted.totalPrice)}</dd></dl><a className="text-link" href="https://t.me/Tour_OrganizerUzbekistan" target="_blank" rel="noreferrer">{t("tourDetail.confirmation.contactAdminViaTelegram")}<ArrowRight size={16}/></a></div> :
      <form ref={formRef} className="inquiry-form" data-motion="form" data-motion-state={pending ? "pending" : "ready"} onSubmit={submit} aria-busy={pending}>
        <div className="field-grid">
          {[["name", "text", "name"], ["email", "email", "email"], ["phone", "tel", "tel"], ["people", "number", "off"]].map(([name, type, autocomplete]) => <div className="field" key={name}><label htmlFor={"inquiry-" + name}>{t("design." + name)} <span aria-hidden="true">*</span></label><input id={"inquiry-" + name} name={name} type={type} autoComplete={autocomplete} required min={name === "people" ? 1 : undefined} step={name === "people" ? 1 : undefined} maxLength={name === "people" ? undefined : 200} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} disabled={pending}/></div>)}
        </div>
        <div className="form-total"><span>{t("design.total")}</span><strong>{money(price * (Number.isFinite(people) && people > 0 ? people : 1))}</strong></div>
        {error && <p className="form-error" data-motion="feedback" role="alert">{error}</p>}
        <button className="button" type="submit" disabled={pending}>{t(pending ? "contact.form.submitting" : "design.sendInquiry")}<ArrowRight size={16}/></button><p className="form-note">{t("design.inquiryNote")}</p>
      </form>}
  </div></section>;
}
