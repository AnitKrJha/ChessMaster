import { useState } from "react";
import { Check, Copy, CopyCheck } from "lucide-react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import toast from "react-hot-toast";

type Props = {
  text: string;
};

const monst = Montserrat({ subsets: ["latin"], weight: ["400"] });

const CopyText = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Link copied to Clipboard");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className=" relative flex items-center space-x-2 flex-grow px-2">
      <input
        type="text"
        value={text}
        placeholder={!text ? "create link >" : ""}
        className={`italic ${monst.className} text-white flex-1 pr-11 text-sm bg-white bg-opacity-25  rounded py-2 px-3 focus:outline-none`}
        readOnly
      />
      <button
        className="absolute flex-shrink-0 text-white text-sm font-medium  rounded-lg transition duration-300  border-black border-opacity-0 hover:border-opacity-100 focus:outline-none right-4"
        onClick={copyToClipboard}
      >
        {copied ? <Check /> : <Copy />}
      </button>
    </div>
  );
};

export default CopyText;
