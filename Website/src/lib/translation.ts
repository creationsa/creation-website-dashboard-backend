import "server-only";

import { Locale } from "@/i18n.config";

const getTrans = async (locale: Locale, namespace: string) => {
  return import(`@/dictionaries/${locale}/${namespace}.json`).then(
    (m) => m.default,
  );
};

export default getTrans;
