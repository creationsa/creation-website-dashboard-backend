import { useLanguage } from "@/shared/hooks/useLanguage";
import { SearchIcon } from "@/shared/icons";
import { useEffect, useState } from "react";
import { getLanguageDirection } from "./getLanguageDirection";
import type { SearchInputProps } from "./types";

export default function SearchInput({
  value,
  onSearch,
  placeholder,
}: SearchInputProps) {
  const currentLanguage = useLanguage();
  const dir = getLanguageDirection(currentLanguage);
  const [text, setText] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setText(value);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (text !== value) onSearch(text);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [text, value, onSearch]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <SearchIcon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="input border-border-800 dark:border-border-900 h-15 rounded-xl border-2 bg-transparent ps-9"
      />
    </div>
  );
}
