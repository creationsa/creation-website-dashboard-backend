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

interface LegacyPoint {
  text_en?: string;
  text_ar?: string;
  description_en?: string;
  description_ar?: string;
  [key: string]: unknown;
}

function normalizePoints(points: LegacyPoint[]) {
  return points.map((point) => {
    if ("description_en" in point || "description_ar" in point) return point;

    const { text_en, text_ar, ...rest } = point;

    return {
      ...rest,
      label_en: "",
      label_ar: "",
      description_en: text_en ?? "",
      description_ar: text_ar ?? "",
    };
  });
}

interface LegacyTextBlock {
  block_type?: string;
  points?: LegacyPoint[];
  [key: string]: unknown;
}

interface LegacyTextItem {
  blocks?: LegacyTextBlock[];
  [key: string]: unknown;
}

function normalizeTextListItems(items: LegacyTextItem[]) {
  return items.map((item) => {
    if (!item.blocks) return item;

    return {
      ...item,
      blocks: item.blocks.map((block) => {
        if (block.block_type !== "list" || !block.points) return block;

        return { ...block, points: normalizePoints(block.points) };
      }),
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
        items?: LegacyTextItem[];
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

    if (typed.type === "text_list_section" && typed.content.items) {
      content = {
        ...content,
        items: normalizeTextListItems(typed.content.items),
      };
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
