export interface SmartMediaContent {
  type: "image" | "video";
  file: string | null;
  poster: string | null;
  alt: string | null;
}
