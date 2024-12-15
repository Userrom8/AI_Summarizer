import { useState, useEffect, useContext } from "react";
import ThemeContext from "../services/theme";

import { logoLight, logoDark } from "../assets";

const Hero = () => {
  const { dark, setDark } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    const root = window.document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const modeToggle = () => {
    if (!dark) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide moon-star"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide sun"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v1" />
          <path d="M12 20v1" />
          <path d="M3 12h1" />
          <path d="M20 12h1" />
          <path d="m18.364 5.636-.707.707" />
          <path d="m6.343 17.657-.707.707" />
          <path d="m5.636 5.636.707.707" />
          <path d="m17.657 17.657.707.707" />
        </svg>
      );
    }
  };

  const [logo, setLogo] = useState(dark ? logoLight : logoDark);

  useEffect(() => {
    if (dark) {
      setLogo(logoLight);
    } else {
      setLogo(logoDark);
    }
  }, [dark]);

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <div className="flex items-center justify-center gap-2">
          <div
            className="[&_svg]:stroke-gray-600 [&_svg]:hover:stroke-gray-900 [&_svg]:dark:stroke-gray-400 [&_svg]:dark:hover:stroke-gray-200 h-8 w-8 flex justify-center items-center rounded-lg hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700 transition-colors"
            onClick={() => setDark(!dark)}
          >
            {modeToggle()}
          </div>
          <div className="h-4 w-0.5 bg-gray-400"></div>
          <button
            type="button"
            onClick={() =>
              window.open("https://github.com/Userrom8/AI_Summarizer")
            }
            className="black_btn ml-2"
          >
            Github
          </button>
        </div>
      </nav>

      <h1 className="head_text">
        Summerize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summerizer
        that transforms lenthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
