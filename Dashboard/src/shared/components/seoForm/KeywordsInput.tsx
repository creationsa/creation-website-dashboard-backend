import type { KeywordsInputProps } from "@/shared/types/seo";
import { useState } from "react";

export default function KeywordsInput({ value, onChange }: KeywordsInputProps) {
  const [input, setInput] = useState("");

  const addKeyword = () => {
    const keyword = input.trim();

    if (!keyword) return;

    if (value.includes(keyword)) return;

    onChange([...value, keyword]);

    setInput("");
  };

  const removeKeyword = (keyword: string) => {
    onChange(value.filter((item) => item !== keyword));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {value.map((keyword) => (
          <button
            key={keyword}
            type="button"
            onClick={() => removeKeyword(keyword)}
            className="rounded-xl border p-2"
          >
            {keyword} <span className="text-red-400 dark:text-red-500">x</span>
          </button>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addKeyword();
          }
        }}
      />
    </div>
  );
}
