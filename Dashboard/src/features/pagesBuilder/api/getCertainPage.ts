import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { PageFormValues } from "../components/pagesBuilderForm/pageSchema";

interface LegacyAccordionItem {
  content_en?: string;
  content_ar?: string;
  content_blocks?: unknown[];
  [key: string]: unknown;
}

function normalizeAccordionItems(items: LegacyAccordionItem[]) {
  return items.map((item) => {
    if (item.content_blocks?.length) return item;

    const { content_en, content_ar, ...rest } = item;

    return {
      ...rest,
      content_blocks: [
        {
          subtitle_en: "",
          subtitle_ar: "",
          description_en: content_en ?? "",
          description_ar: content_ar ?? "",
        },
      ],
    };
  });
}

function normalizeAdvancedOverviewStats(content: Record<string, unknown>) {
  const result = { ...content };

  for (const num of [1, 2, 3, 4]) {
    const legacyKey = `stat${num}_number`;
    if (legacyKey in result && !(`${legacyKey}_en` in result)) {
      const value = result[legacyKey] ?? "";
      result[`${legacyKey}_en`] = value;
      result[`${legacyKey}_ar`] = value;
      delete result[legacyKey];
    }
  }

  return result;
}

function normalizeSections(sections: unknown[]) {
  return sections.map((section) => {
    const typed = section as {
      type?: string;
      content?: Record<string, unknown> & {
        accordion_items?: LegacyAccordionItem[];
      };
    };

    if (!typed.content) return section;

    let content: Record<string, unknown> = typed.content;

    if (typed.content.accordion_items) {
      content = {
        ...content,
        accordion_items: normalizeAccordionItems(typed.content.accordion_items),
      };
    }

    if (typed.type === "advanced_overview_section") {
      content = normalizeAdvancedOverviewStats(content);
    }

    return { ...typed, content };
  });
}

export async function getCertainPage(
  id: number,
): Promise<PageFormValues & { metadata_id: number | null }> {
  const { data } = await instance.get(endpoints.pageBuilder.byId(id));

  const page = data?.data;

  return {
    ...page,
    sections: normalizeSections(page?.sections ?? []),
  };
}
