import { z } from "zod";
import { ContactErrorMessages } from "./types";

export const createContactSchema = (errors: ContactErrorMessages) =>
  z.object({
    name: z
      .string()
      .min(1, { message: errors.name_required })
      .min(2, { message: errors.name_short }),

    email: z
      .string()
      .min(1, { message: errors.email_required })
      .email({ message: errors.email_invalid }),

    phone: z.string().min(1, { message: errors.phone_invalid }),
    company: z.string().min(1, { message: errors.company_required }),
    country: z.string().min(1, { message: errors.country_required }),

    message: z
      .string()
      .min(1, { message: errors.message_required })
      .min(10, { message: errors.message_short }),
  });

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
