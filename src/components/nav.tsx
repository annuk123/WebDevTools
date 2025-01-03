"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";

import { FaTools, FaInfo } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { IoMdGitPullRequest } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import SunIcon from "./icons/sunicon";
import MoonIcon from "./icons/moonicon";

import HamburgerMenu from "./hamburger-menu";
import GeneratorDropdown from "./dropdowns/generators";
import EditorDropdown from "./dropdowns/editors";
import OtherDropdown from "./dropdowns/others";

// interface NavProps {
//   isDarkMode: boolean;
//   toggleTheme: () => void;
// }

// interface DropdownRefs {
//   generator: React.RefObject<HTMLDivElement>;
//   editor: React.RefObject<HTMLDivElement>;
//   other: React.RefObject<HTMLDivElement>;
// }

// const Nav: React.FC<NavProps> = ({ isDarkMode, toggleTheme }) => {
//   //const [isDropdownOpen, setIsDropdownOpen] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
//   //const [open, setOpen] = useState(false);
//   const [open, setOpen] = useState<boolean>(false);
//   //const [isNavFixed, setIsNavFixed] = useState(false);
//   const [isNavFixed, setIsNavFixed] = useState<boolean>(false);
//   const dropdownRefs: DropdownRefs = {
//     generator: useRef<HTMLDivElement>(null),
//     editor: useRef<HTMLDivElement>(null),
//     other: useRef<HTMLDivElement>(null),
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const banner = document.querySelector("#banner");
//       const bannerHeight = banner ? (banner as HTMLElement).offsetHeight : 0;
//       if (window.scrollY >= bannerHeight) {
//         setIsNavFixed(true);
//       } else {
//         setIsNavFixed(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleDropdown = (category: string) => {
//     setIsDropdownOpen((prevState) =>
//       prevState === category ? null : category,
//     );
//   };

//   const handleClickOutside = useCallback(
//     (event: MouseEvent) => {
//       // Check if the click is outside of all dropdowns
//       if (
//         !dropdownRefs.generator.current?.contains(event.target as Node) &&
//         !dropdownRefs.editor.current?.contains(event.target as Node) &&
//         !dropdownRefs.other.current?.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(null);
//       }
//     },
//     [dropdownRefs],
//   );

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [handleClickOutside]);

//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme");
//     try {
//       if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
//         toggleTheme();
//       }
//     } catch {
//       console.log("Failed to read localstorage");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const togglePanel = () => {
//     setOpen((prev) => !prev);
//   };

//   const handleToggleTheme = () => {
//     localStorage.setItem("theme", JSON.stringify(!isDarkMode));
//     toggleTheme();
//   };

interface NavProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface DropdownRefs {
  generator: React.RefObject<HTMLDivElement>;
  editor: React.RefObject<HTMLDivElement>;
  other: React.RefObject<HTMLDivElement>;
}

const Nav: React.FC<NavProps> = ({ isDarkMode, toggleTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isNavFixed, setIsNavFixed] = useState<boolean>(false);

  // Use useMemo to ensure dropdownRefs remains stable
  const dropdownRefs: DropdownRefs = useMemo(
    () => ({
      generator: React.createRef<HTMLDivElement>(),
      editor: React.createRef<HTMLDivElement>(),
      other: React.createRef<HTMLDivElement>(),
    }),
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector("#banner");
      const bannerHeight = banner ? (banner as HTMLElement).offsetHeight : 0;
      if (window.scrollY >= bannerHeight) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = (category: string) => {
    setIsDropdownOpen((prevState) =>
      prevState === category ? null : category,
    );
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      // Check if the click is outside of all dropdowns
      if (
        !dropdownRefs.generator.current?.contains(event.target as Node) &&
        !dropdownRefs.editor.current?.contains(event.target as Node) &&
        !dropdownRefs.other.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(null);
      }
    },
    [dropdownRefs],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    try {
      if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
        toggleTheme();
      }
    } catch {
      console.log("Failed to read localStorage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePanel = () => {
    setOpen((prev) => !prev);
  };

  const handleToggleTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!isDarkMode));
    toggleTheme();
  };
  return (
    <nav
      className={`${
        isNavFixed ? "fixed top-0 z-40" : "relative"
      } ${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-500 text-black"}
     py-2 px-4 flex items-center justify-between lg:justify-around gap-1 w-full mb-8 min-w-80 transition-all duration-300`}
    >
      <div className="flex flex-0 items-center flex-shrink">
        <Link href="/" className="group">
          <h1 className="md:text-lg lg:text-xl font-bold group-hover:underline">
            Web Dev Tools
          </h1>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="relative hidden lg:block" ref={dropdownRefs.generator}>
          <button
            onClick={() => toggleDropdown("generator")}
            className={`focus:outline-none text-[0.58rem] font-semibold items-center sm:text-sm flex md:text-sm flex-1 p-2 hover:${
              isDarkMode ? "bg-gray-700" : "bg-blue-700"
            } transition-all duration-200 rounded-lg`}
          >
            <FaGears fontSize={20} className="mr-2" />
            Generator Tools
            <svg
              className={`${
                isDropdownOpen === "generator" ? "transform rotate-180" : ""
              } inline-block ml-[2px] w-[12px] h-4`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {isDropdownOpen === "generator" && (
            <GeneratorDropdown isDarkMode={isDarkMode} />
          )}
        </div>

        <div className="relative hidden lg:block" ref={dropdownRefs.editor}>
          <button
            onClick={() => toggleDropdown("editor")}
            className={`focus:outline-none text-[0.58rem] font-semibold items-center sm:text-sm flex md:text-sm flex-1 p-2 hover:${
              isDarkMode ? "bg-gray-700" : "bg-blue-700"
            } transition-all duration-200 rounded-lg`}
          >
            <RiEdit2Fill fontSize={20} className="mr-2" />
            Editor Tools
            <svg
              className={`${
                isDropdownOpen === "editor" ? "transform rotate-180" : ""
              } inline-block ml-[2px] w-[12px] h-4`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {isDropdownOpen === "editor" && (
            <EditorDropdown isDarkMode={isDarkMode} />
          )}
        </div>

        <div className="relative hidden lg:block " ref={dropdownRefs.other}>
          <button
            onClick={() => toggleDropdown("other")}
            className={`focus:outline-none text-[0.58rem] font-semibold items-center sm:text-sm flex md:text-sm flex-1 p-2 hover:${
              isDarkMode ? "bg-gray-700" : "bg-blue-700"
            } transition-all duration-200 rounded-lg`}
          >
            <FaTools fontSize={20} className="mr-2" />
            Other Tools
            <svg
              className={`${
                isDropdownOpen === "other" ? "transform rotate-180" : ""
              } inline-block ml-[2px] w-[12px] h-4`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {isDropdownOpen === "other" && (
            <OtherDropdown isDarkMode={isDarkMode} />
          )}
        </div>
      </div>

      <div className="justify-center hidden md:flex gap-2 md:gap-4 items-center lg:flex">
        <Link
          href="/about"
          className={`font-semibold text-[0.6rem] sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-200 rounded-lg flex items-center justify-center gap-2`}
        >
          <FaInfo fontSize={15} />
          About
        </Link>
        <Link
          href="/contribute"
          className={`font-semibold hidden md:flex text-[0.6rem] sm:text-sm p-2 hover:${
            isDarkMode ? "bg-gray-700" : "bg-blue-700"
          } transition-all duration-200 rounded-lg flex items-center justify-center gap-2`}
        >
          <IoMdGitPullRequest fontSize={20} />
          Contribute
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="text-white" />
            ) : (
              <MoonIcon className="text-black" />
            )}
          </button>
        </div>

        <div
          className="flex flex-col gap-2 lg:hidden cursor-pointer"
          onClick={togglePanel}
        >
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
          <span className="w-8 h-0.5 bg-black dark:bg-white"></span>
        </div>
        <HamburgerMenu
          open={open}
          togglePanel={togglePanel}
          isDarkMode={true}
        />
      </div>
    </nav>
  );
};

export default Nav;
function useCustomMemo(
  arg0: () => {
    generator: React.RefObject<HTMLDivElement>;
    editor: React.RefObject<HTMLDivElement>;
    other: React.RefObject<HTMLDivElement>;
  },
  arg1: never[],
): DropdownRefs {
  throw new Error("Function not implemented.");
}