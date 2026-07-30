import Header from "@/components/ui/Header";
import TextWithMotion from "@/components/ui/TextWithMotion";
import { ContactFormProps } from "../types";
import Form from "./Form";

export default function ContactForm({
  contact,
  locale,
  form_errors,
}: ContactFormProps) {
  const { form_title, form_description, form_sub_description, form_paragraph } =
    contact;

  return (
    <section className="container space-y-14">
      <Header
        title={form_title}
        description={form_description}
        subDescription={form_sub_description}
        lang={locale}
        hasContainer={false}
        styles="w-full xl:w-[65%]"
        inlineHeadings
      />

      <TextWithMotion text={form_paragraph} direction="end" />

      <Form contact={contact} form_errors={form_errors} locale={locale} />
    </section>
  );
}
