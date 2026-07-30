export default function loading() {
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="border-black-100 border-e-white-100 dark:border-white-100 dark:border-e-black-800 mx-auto my-20 size-[60px] animate-spin rounded-full border-8" />
    </div>
  );
}
