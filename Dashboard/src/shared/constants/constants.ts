export const ARABIC_REGEX =
  /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\d\s\n\r\t.,!?'"()\-:;%®،؛؟]+$/;
export const ENGLISH_REGEX =
  /^[\p{Script=Latin}\p{M}\d\s.,!?'"()\-–—:;%®'•\u2019|&©™/@+#$]+$/u;

export const THEME_STORAGE_KEY = "theme";

export const TOKEN_KEY = "token";

export const DEFAULT_PAGE_SIZE = 10;

export const MIN_SEO_DESCRIPTION_LENGTH = 60;
export const MAX_SEO_DESCRIPTION_LENGTH = 250;

export const MIN_DESCRIPTION_LENGTH = 20;
export const MAX_DESCRIPTION_LENGTH = 700;

export const MIN_TITLE_LENGTH = 3;
export const MAX_TITLE_LENGTH = 100;

export const MIN_SLUG_LENGTH = 3;
export const MAX_SLUG_LENGTH = 100;

export const MIN_IMAGE_ALT_LENGTH = 2;
export const MAX_IMAGE_ALT_LENGTH = 300;

export const MIN_STAT_LENGTH = 2;
export const MAX_STAT_LENGTH = 50;

export const MIN_LINK_LENGTH = 3;
export const MAX_LINK_LENGTH = 300;

export const MIN_LONG_TITLE_LENGTH = 3;
export const MAX_LONG_TITLE_LENGTH = 150;

export const MIN_SUBTITLE_LENGTH = 3;
export const MAX_SUBTITLE_LENGTH = 200;

export const MIN_LONG_CONTENT_LENGTH = 3;
export const MAX_LONG_CONTENT_LENGTH = 1000;

export const MIN_SHORT_TITLE_LENGTH = 2;
export const MAX_SHORT_TITLE_LENGTH = 100;

export const MIN_SHORT_TEXT_LENGTH = 2;
export const MAX_SHORT_TEXT_LENGTH = 150;

export const MIN_BUTTON_TEXT_LENGTH = 2;
export const MAX_BUTTON_TEXT_LENGTH = 50;

export const MIN_STAT_NUMBER_LENGTH = 1;
export const MAX_STAT_NUMBER_LENGTH = 20;

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
];
export const ALLOWED_IMAGE_ACCEPT = "image/png,image/jpeg,image/svg+xml";
