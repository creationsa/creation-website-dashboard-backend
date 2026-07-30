export const ARABIC_REGEX =
  /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\d\s\n\r\t.,!?'"()\-:;%®،؛؟]+$/;
export const ENGLISH_REGEX =
  /^[\p{Script=Latin}\p{M}\d\s.,!?'"()\-–—:;%®'\u2019|&©™/@+#$]+$/u;

export const THEME_STORAGE_KEY = "theme";

export const TOKEN_KEY = "token";

export const MIN_SEO_DESCRIPTION_LENGTH = 120;
export const MAX_SEO_DESCRIPTION_LENGTH = 250;

export const MIN_DESCRIPTION_LENGTH = 20;
export const MAX_DESCRIPTION_LENGTH = 500;

export const MIN_TITLE_LENGTH = 3;
export const MAX_TITLE_LENGTH = 100;

export const MIN_SLUG_LENGTH = 3;
export const MAX_SLUG_LENGTH = 100;

export const MIN_IMAGE_ALT_LENGTH = 3;
export const MAX_IMAGE_ALT_LENGTH = 100;

export const MIN_STAT_LENGTH = 2;
export const MAX_STAT_LENGTH = 50;
