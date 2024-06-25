import { GithubIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-start mx-8 my-2 font-mono">
      <hr />
      <div>
        <h1>Made with ❤️ By Arpit Blagan 🇮🇳</h1>
      </div>
      <div>
        <a href="https://github.com/ArpitBlagan" target="_blank">
          <GithubIcon width={50} height={30} />
        </a>
      </div>
      <div>
        <a
          href="https://www.linkedin.com/in/arpit-blagan-79081b193/"
          target="_blank"
        >
          <LinkedinIcon width={50} height={30} />
        </a>
      </div>
      <div className="flex-1 flex justify-end items-center gap-4">
        <Link href="/" className="font-semibold text-xl">
          Recipe Listing App
        </Link>
      </div>
    </div>
  );
};

export default Footer;
