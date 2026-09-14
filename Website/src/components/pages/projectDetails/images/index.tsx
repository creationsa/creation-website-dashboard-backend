import { ImagesProps } from "../types";
import ImageItem from "./ImageItem";
import TwoGrid from "./TwoGrid";

export default function Images({ images, title }: ImagesProps) {
  if (!images || images.length < 8) return null;

  return (
    <section className="container space-y-10">
      <ImageItem src={images[0]} full index={0} title={title} />

      <TwoGrid
        images={[images[1], images[2]]}
        startIndex={1}
        title={title}
      />

      <TwoGrid
        images={[images[3], images[4]]}
        startIndex={3}
        title={title}
      />

      <ImageItem src={images[5]} full index={5} title={title} />

      <TwoGrid
        images={[images[6], images[7]]}
        startIndex={6}
        title={title}
      />
    </section>
  );
}
