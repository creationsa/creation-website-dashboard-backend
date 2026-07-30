type VideoProps = {
  src: string;
  poster: string;
  className?: string;
  containerClassName?: string;
};

export default function Video({
  src,
  poster,
  className,
  containerClassName,
}: VideoProps) {
  return (
    <div className={containerClassName}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className={className}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
