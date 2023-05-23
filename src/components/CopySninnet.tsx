import { useState } from "react";

type Props = {
  text: string;
};

const CopyText = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={text}
        className="flex-1 bg-white text-black rounded-lg py-2 px-3 focus:outline-none"
        readOnly
      />
      <button
        className="flex-shrink-0 bg-black text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-black border border-black border-opacity-0 hover:border-opacity-100 focus:outline-none"
        onClick={copyToClipboard}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyText;
