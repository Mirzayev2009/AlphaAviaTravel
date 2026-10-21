import { PageIntro } from "@/components/TravelUI";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hmjbepqisyfqctddgqwj.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtamJlcHFpc3lmcWN0ZGRncXdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDU5MDUyOCwiZXhwIjoyMDgwMTY2NTI4fQ.o-iPHOLzGqesJMwOjwWuX68WhlNPPi_XphxL8ulPaZc";

// Create Supabase client for contact form
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.validation.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.validation.emailInvalid");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("contact.validation.subjectRequired");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.validation.messageRequired");
    }

    setErrors(newErrors);
    const first = Object.keys(newErrors)[0]; if (first) document.getElementById(first)?.focus();
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log("Submitting contact form:", formData);

      // Insert data into Alpha_contact table
      const { data, error } = await supabase
        .from("Alpha_contact")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        toast.error(`Error: ${error.message}`);
        throw error;
      }

      console.log("Contact form submitted successfully:", data);
      setSubmitted(true);
      toast.success(t("contact.success") || "Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(t("contact.error") || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return <><Toaster/>
    <PageIntro title={t("contact.title")} description={t("contact.subtitle")}/>
    <section className="section pt-4"><div className="site-container contact-layout">
      <div className="contact-form">
        <h2>{t("contact.sendMessage")}</h2>
        {submitted ? <div className="success-panel" role="status"><CheckCircle2 size={32}/><h2>{t("design.messageSent")}</h2><p>{t("contact.success")}</p><button className="button button--secondary" onClick={() => setSubmitted(false)}>{t("contact.sendMessage")}</button></div> :
        <form onSubmit={handleSubmit} noValidate aria-busy={loading}>
          {[["name", "text", "name"], ["email", "email", "email"], ["subject", "text", "off"]].map(([name, type, autoComplete]) => <div className="field" key={name}><label htmlFor={name}>{t("contact.form." + name)} *</label><input id={name} name={name} type={type} autoComplete={autoComplete} aria-required="true" aria-invalid={!!errors[name]} aria-describedby={errors[name] ? name + "-error" : undefined} value={formData[name]} onChange={(event) => handleChange(name, event.target.value)} maxLength={200} disabled={loading}/>{errors[name] && <p className="field-error" id={name + "-error"} role="alert">{errors[name]}</p>}</div>)}
          <div className="field"><label htmlFor="message">{t("contact.form.message")} *</label><textarea id="message" name="message" rows={6} maxLength={2000} value={formData.message} onChange={(event) => handleChange("message", event.target.value)} placeholder={t("contact.form.messagePlaceholder")} aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} disabled={loading}/>{errors.message && <p className="field-error" id="message-error" role="alert">{errors.message}</p>}</div>
          <button className="button mt-6 w-full" type="submit" disabled={loading}>{t(loading ? "contact.form.submitting" : "contact.form.submit")}<ArrowRight size={16}/></button>
        </form>}
      </div>
      <div>
        <div className="contact-info-item"><MapPin size={22}/><div><h2>{t("contact.info.office")}</h2><p>{t("contact.info.address")}</p></div></div>
        <div className="contact-info-item"><Phone size={22}/><div><h2>{t("contact.info.phone")}</h2><a href="tel:+998981013311">+998 98 101 33 11</a></div></div>
        <div className="contact-info-item"><Mail size={22}/><div><h2>{t("contact.info.email")}</h2><a href="mailto:alpha.avia.travel@gmail.com">alpha.avia.travel@gmail.com</a></div></div>
        <div className="contact-info-item"><Clock size={22}/><div><h2>{t("contact.info.hours")}</h2><p className="whitespace-pre-line">{t("contact.info.hoursDetail")}</p></div></div>
      </div>
    </div></section>
  </>;
};
export default Contact;
