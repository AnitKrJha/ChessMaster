import Spinner from "@/lib/Chakra/spinner";

const Loading = () => {
  return (
    <div
      className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black w-scre
   min-h-[calc(100dvh_-_64px)] text-white grid place-items-center"
    >
      <Spinner width={50} height={50} />
    </div>
  );
};

export default Loading;
