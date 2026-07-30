import Video from "@/components/ui/Video";

export default function AboutBackground() {
  return (
    <Video
      src="https://creation.sa/videos/home.mp4"
      poster="https://creation.sa/images/coverVideos/creation_home_bg.jpg"
      containerClassName="absolute inset-0 h-full w-full"
      className="h-full w-full object-cover"
    />
  );
}
