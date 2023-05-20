export default function ChooseLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="outer px-4 min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black pt-8 pb-4 overflow-x-hidden">
      <div className=" m-auto max-w-2xl border border-gray-600 px-4 rounded mt-8">
        {children}
      </div>
    </main>
  );
}
