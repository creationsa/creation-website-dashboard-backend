import { ContactFormValues } from "./contactSchema";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const sendEmail = async (data: ContactFormValues) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "EmailJS environment variables are not configured. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.",
    );
  }
  const emailjs = (await import("emailjs-com")).default;

  return await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      country: data.country,
      message: data.message,
    },
    PUBLIC_KEY,
  );
};
