interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="font-fancy font-display relative mb-4 inline-block w-fit">
      <h1 className="text-xl font-semibold tracking-wider uppercase sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h1>

      <div className="absolute -bottom-4 left-0 flex w-full items-center gap-2 rtl:-bottom-6">
        <div className="bg-border-800 dark:bg-border-900 h-2 flex-1 rounded-full" />

        <div className="[&_span]:bg-border-800 [&_span]:dark:bg-border-900 flex gap-2 [&_span]:size-2 [&_span]:rounded-full">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
