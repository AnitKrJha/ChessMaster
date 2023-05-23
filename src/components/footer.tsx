import { Bebas_Neue, Montserrat } from "next/font/google";
import { Github, Linkedin } from "lucide-react";
import React from "react";
import Link from "next/link";

type Props = {};

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const monst = Montserrat({ subsets: ["latin"], weight: ["400"] });

const Footer = (props: Props) => {
  return (
    <footer
      className={` ${monst.className} bg-gradient-to-t from-gray-800 via-gray-900 to-black  shadow `}
    >
      <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
        <span className="text-sm text-gray-100 sm-text-center">
          © 2023{" "}
          <Link
            href="https://thechessmaster.vercel.app"
            className="hover:underline"
          >
            TheChessMaster™
          </Link>
        </span>
        <ul className="flex flex-wrap items-centertext-sm font-medium text-gray-100 mt-0">
          <li className="flex">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/anitkrjha"
              className="mr-4 hover:underline sm-mr-6"
            >
              <Github size={24} />
            </Link>
          </li>
          <li>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://linkedin.in/in/anitjha"
              className="hover:underline"
            >
              <Linkedin size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
