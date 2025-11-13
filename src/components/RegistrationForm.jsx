import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Phone as PhoneIcon, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";


/**
 * RegistrationForm component
 * @param {Object} tour - Tour data
 * @param {boolean} open - Dialog open state
 * @param {Function} onClose - Close handler
 */
const RegistrationForm = ({ tour, open, onClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: 1,
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("registration.validation.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("registration.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("registration.validation.emailInvalid");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("registration.validation.phoneRequired");
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = t("registration.validation.phoneInvalid");
    }

    if (formData.numberOfPeople < 1) {
      newErrors.numberOfPeople = t("registration.validation.peopleMin");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await registerForTour({
        tourId: tour.id,
        tourTitle: tour.title,
        ...formData,
      });

      if (response.ok) {
        setShowSuccess(true);
        toast.success(t("registration.success"));
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            numberOfPeople: 1,
            notes: "",
          });
          setShowSuccess(false);
        }, 3000);
      }
    } catch (error) {
      toast.error(t("registration.error"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("registration.title")}</DialogTitle>
          <DialogDescription>
            <span className="font-semibold text-primary">{tour.title}</span>
            <br />
            {t("registration.subtitle")}
          </DialogDescription>
        </DialogHeader>

        {!showSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t("registration.form.name")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder={t("registration.form.namePlaceholder")}
                  className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                  maxLength={100}
                />
              </div>
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("registration.form.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder={t("registration.form.emailPlaceholder")}
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  maxLength={255}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">{t("registration.form.phone")}</Label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder={t("registration.form.phonePlaceholder")}
                  className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                  maxLength={20}
                />
              </div>
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            {/* Number of People */}
            <div className="space-y-2">
              <Label htmlFor="numberOfPeople">{t("registration.form.numberOfPeople")}</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="numberOfPeople"
                  type="number"
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={(e) => handleChange("numberOfPeople", parseInt(e.target.value) || 1)}
                  className={`pl-10 ${errors.numberOfPeople ? "border-destructive" : ""}`}
                />
              </div>
              {errors.numberOfPeople && (
                <p className="text-sm text-destructive">{errors.numberOfPeople}</p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">{t("registration.form.notes")}</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder={t("registration.form.notesPlaceholder")}
                rows={3}
                maxLength={1000}
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("registration.form.submitting") : t("registration.form.submit")}
            </Button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{t("registration.success")}</h3>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">{t("registration.organizer.title")}</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <PhoneIcon className="inline h-4 w-4 mr-2" />
                  <a href={`tel:${tour.organizer.phone}`} className="text-primary hover:underline">
                    {tour.organizer.phone}
                  </a>
                </p>
                <p>
                  <Mail className="inline h-4 w-4 mr-2" />
                  <a href={`mailto:${tour.organizer.email}`} className="text-primary hover:underline">
                    {tour.organizer.email}
                  </a>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("registration.organizer.hours")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;
