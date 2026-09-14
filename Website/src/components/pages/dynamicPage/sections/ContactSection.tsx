import ContactForm from "@/components/common/contactForm";
import { LanguageType } from "@/i18n.config";
import getTrans from "@/lib/translation";

interface ContactSectionProps {
  locale: LanguageType;
}

export default async function ContactSection({ locale }: ContactSectionProps) {
  const [contact, form_errors] = await Promise.all([
    getTrans(locale, "contact"),
    getTrans(locale, "formErrors"),
  ]);

  return (
    <ContactForm contact={contact} locale={locale} form_errors={form_errors} />
  );
}
