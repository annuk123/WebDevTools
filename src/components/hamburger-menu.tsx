"use client";

import React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { FaTools, FaInfo } from "react-icons/fa";
import { IoMdGitPullRequest } from "react-icons/io";
import { FaGears } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import Search from "./search";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import GeneratorDropdown from "./dropdowns/generators";
import EditorDropdown from "./dropdowns/editors";
import OtherDropdown from "./dropdowns/others";

// interface DropdownRefs {
//   [key: string]: React.RefObject<HTMLDivElement>;
// }

// interface HamburgerMenuProps {
//   open: boolean;
//   togglePanel: () => void;
//   isDarkMode: boolean;
// }
// interface ToggleDropdown {
//   (category: string): void;
// }

// const HamburgerMenu: React.FC<HamburgerMenuProps> =({ open, togglePanel, isDarkMode }) => {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const dropdownRefs: DropdownRefs = {
//     generator: useRef<HTMLDivElement>(null),
//     editor: useRef<HTMLDivElement>(null),
//     other: useRef<HTMLDivElement>(null),
//   };

//   // const handleClickOutside = (event) => {
//   //   if (menuRef.current && !menuRef.current.contains(event.target)) {
//   //     // Close all dropdowns if clicked outside the menu
//   //     setOpenDropdown(null);
//   //   } else {
//   //     // Check each dropdown individually
//   //     Object.keys(dropdownRefs).forEach((key) => {
//   //       if (
//   //         dropdownRefs[key].current &&
//   //         !dropdownRefs[key].current.contains(event.target)
//   //       ) {
//   //         if (openDropdown === key) {
//   //           setOpenDropdown(null); // Close the dropdown if clicked outside of it
//   //         }
//   //       }
//   //     });
//   //   }
//   // };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//       // Close all dropdowns if clicked outside the menu
//       setOpenDropdown(null);
//     } else {
//       // Check each dropdown individually
//       Object.keys(dropdownRefs).forEach((key) => {
//         if (
//           dropdownRefs[key].current &&
//           !dropdownRefs[key].current.contains(event.target as Node)
//         ) {
//           if (openDropdown === key) {
//             setOpenDropdown(null); // Close the dropdown if clicked outside of it
//           }
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openDropdown]);

//   const toggleDropdown: ToggleDropdown = (category) => {
//     setOpenDropdown((prevState) => (prevState === category ? null : category));
//   };

// interface HamburgerMenuProps {
//   open: boolean;
//   togglePanel: () => void;
//   isDarkMode: boolean;
// }
// interface ToggleDropdown {
//   (category: string): void;
// }

// interface DropdownRefs {
//   [key: string]: React.RefObject<HTMLDivElement>;
// }

// const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
//   open,
//   togglePanel,
//   isDarkMode,
// }) => {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // const dropdownRefs: DropdownRefs = {
//   //   generator: useRef<HTMLDivElement>(null),
//   //   editor: useRef<HTMLDivElement>(null),
//   //   other: useRef<HTMLDivElement>(null),
//   // };

//   const dropdownRefs: DropdownRefs = {
//     generator: useRef<HTMLDivElement>(null),
//     editor: useRef<HTMLDivElement>(null),
//     other: useRef<HTMLDivElement>(null),
//   };

//   // Memoize the handleClickOutside function
//   const handleClickOutside = useCallback(
//     (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         // Close all dropdowns if clicked outside the menu
//         setOpenDropdown(null);
//       } else {
//         // Check each dropdown individually
//         Object.keys(dropdownRefs).forEach((key) => {
//           if (
//             dropdownRefs[key].current &&
//             !dropdownRefs[key].current.contains(event.target as Node)
//           ) {
//             if (openDropdown === key) {
//               setOpenDropdown(null); // Close the dropdown if clicked outside of it
//             }
//           }
//         });
//       }
//     },
//     [dropdownRefs, openDropdown],
//   );

//   // Add/remove event listener for mouse clicks
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [handleClickOutside]);

//   const toggleDropdown: ToggleDropdown = (category) => {
//     setOpenDropdown((prevState) => (prevState === category ? null : category));
//   };

interface HamburgerMenuProps {
  open: boolean;
  togglePanel: () => void;
  isDarkMode: boolean;
}

interface DropdownRefs {
  generator: React.RefObject<HTMLDivElement>;
  editor: React.RefObject<HTMLDivElement>;
  other: React.RefObject<HTMLDivElement>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  open,
  togglePanel,
  isDarkMode,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const dropdownRefs: DropdownRefs = useMemo(
    () => ({
      generator: React.createRef<HTMLDivElement>(),
      editor: React.createRef<HTMLDivElement>(),
      other: React.createRef<HTMLDivElement>(),
    }),
    [],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        !dropdownRefs.generator.current?.contains(event.target as Node) &&
        !dropdownRefs.editor.current?.contains(event.target as Node) &&
        !dropdownRefs.other.current?.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
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

  const toggleDropdown = (category: string) => {
    setOpenDropdown((prevState) => (prevState === category ? null : category));
  };
  return (
    <Dialog
      open={open}
      onClose={togglePanel}
      className="relative z-10 lg:hidden"
    >
      <DialogBackdrop
        transition
        className={`fixed inset-0 ${
          isDarkMode ? "bg-opacity-75 bg-gray-900" : "bg-opacity-75 bg-gray-500"
        } transition-opacity duration-500 ease-in-out data-[closed]:opacity-0`}
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              ref={menuRef}
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={togglePanel}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl min-w-72 dark:bg-gray-800">
                <div className="px-4 sm:px-6"></div>
                <div className="relative mt-6 flex-1 flex flex-col justify-between gap-8 px-4 sm:px-6">
                  <div className="flex flex-col gap-8 mt-3">
                    <Search isDarkMode={isDarkMode} />

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => toggleDropdown("generator")}
                        className={`text-white font-bold p-4 text-sm sm:text-base bg-blue-500 dark:bg-gray-600 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2`}
                      >
                        <FaGears fontSize={20} className="mr-2" />
                        Generator Tools
                        <svg
                          className={`${
                            openDropdown === "generator"
                              ? "transform rotate-180"
                              : ""
                          } inline-block ml-1 w-4 h-4`}
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
                      <div ref={dropdownRefs.generator}>
                        {openDropdown === "generator" && (
                          <GeneratorDropdown isDarkMode={isDarkMode} />
                        )}
                      </div>

                      <button
                        onClick={() => toggleDropdown("editor")}
                        className="text-white font-bold text-sm sm:text-base p-4 bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
                      >
                        <RiEdit2Fill fontSize={20} className="mr-2 " />
                        Editor Tools
                        <svg
                          className={`${
                            openDropdown === "editor"
                              ? "transform rotate-180"
                              : ""
                          } inline-block ml-1 w-4 h-4 `}
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
                      <div
                        ref={dropdownRefs.editor}
                        className="bg-blue-500 dark:bg-gray-600"
                      >
                        {openDropdown === "editor" && (
                          <EditorDropdown isDarkMode={isDarkMode} />
                        )}
                      </div>

                      <button
                        onClick={() => toggleDropdown("other")}
                        className="text-white font-bold text-sm sm:text-base p-4 bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
                      >
                        <FaTools fontSize={20} className="mr-2" />
                        Other Tools
                        <svg
                          className={`${
                            openDropdown === "other"
                              ? "transform rotate-180"
                              : ""
                          } inline-block ml-1 w-4 h-4`}
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
                      <div ref={dropdownRefs.other}>
                        {openDropdown === "other" && (
                          <OtherDropdown isDarkMode={isDarkMode} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/about"
                      className="text-white font-bold text-[0.6rem]  sm:text-sm p-4 bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
                    >
                      <FaInfo fontSize={15} />
                      About
                    </Link>
                    <Link
                      href="/contribute"
                      className="text-white font-bold text-[0.6rem]  sm:text-sm  p-4 bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-700 rounded-lg flex items-center justify-center gap-2"
                    >
                      <IoMdGitPullRequest fontSize={20} />
                      Contribute
                    </Link>
                  </div>

                  <span className="text-sm text-gray-500 text-center dark:text-gray-400">
                    © {new Date().getFullYear()}{" "}
                    <Link href="/" className="hover:underline">
                      WebDevTools
                    </Link>
                    . All Rights Reserved.
                  </span>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HamburgerMenu;

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { FaTools, FaInfo } from "react-icons/fa";
// import { IoMdGitPullRequest } from "react-icons/io";
// import { FaGears } from "react-icons/fa6";
// import { RiEdit2Fill } from "react-icons/ri";
// import Search from "./search";
// import GeneratorDropdown from "./dropdowns/generators";
// import EditorDropdown from "./dropdowns/editors";
// import OtherDropdown from "./dropdowns/others";

// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";

// interface DropdownRefs {
//   [key: string]: React.RefObject<HTMLDivElement>;
// }

// interface HamburgerMenuProps {
//   open: boolean;
//   togglePanel: () => void;
//   isDarkMode: boolean;
// }

// const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
//   open,
//   togglePanel,
//   isDarkMode,
// }) => {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   const dropdownRefs: DropdownRefs = {
//     generator: useRef<HTMLDivElement>(null),
//     editor: useRef<HTMLDivElement>(null),
//     other: useRef<HTMLDivElement>(null),
//   };

//   // Handle clicks outside menu or dropdowns
//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       menuRef.current &&
//       !menuRef.current.contains(event.target as Node) &&
//       !Object.values(dropdownRefs).some(
//         (ref) => ref.current?.contains(event.target as Node)
//       )
//     ) {
//       setOpenDropdown(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = (category: string) => {
//     setOpenDropdown((prev) => (prev === category ? null : category));
//   };

//   return (
//     <Transition.Root show={open} as={React.Fragment}>
//       <Dialog as="div" className="relative z-10 lg:hidden" onClose={togglePanel}>
//         <Transition.Child
//           as={React.Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div
//             className={`fixed inset-0 ${
//               isDarkMode ? "bg-gray-900 bg-opacity-75" : "bg-gray-500 bg-opacity-75"
//             }`}
//           />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <Transition.Child
//                 as={React.Fragment}
//                 enter="transform transition ease-in-out duration-300 sm:duration-500"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-300 sm:duration-500"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel
//                   ref={menuRef}
//                   className="pointer-events-auto relative w-screen max-w-md bg-white dark:bg-gray-800 shadow-xl"
//                 >
//                   <div className="absolute top-0 left-0 -ml-8 pt-4 sm:-ml-10 sm:pr-4">
//                     <button
//                       type="button"
//                       className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
//                       onClick={togglePanel}
//                     >
//                       <span className="sr-only">Close menu</span>
//                       <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                     </button>
//                   </div>
//                   <div className="h-full flex flex-col gap-6 px-4 sm:px-6 py-6 overflow-y-scroll">
//                     <Search isDarkMode={isDarkMode} />

//                     <div className="flex flex-col gap-3">
//                       {/* Generator Dropdown */}
//                       <button
//                         onClick={() => toggleDropdown("generator")}
//                         className="text-white font-bold p-4 text-sm sm:text-base bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
//                       >
//                         <FaGears fontSize={20} className="mr-2" />
//                         Generator Tools
//                         <svg
//                           className={`${
//                             openDropdown === "generator" ? "rotate-180" : ""
//                           } transform w-4 h-4 ml-1`}
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 9l-7 7-7-7"
//                           />
//                         </svg>
//                       </button>
//                       <div ref={dropdownRefs.generator}>
//                         {openDropdown === "generator" && (
//                           <GeneratorDropdown isDarkMode={isDarkMode} />
//                         )}
//                       </div>

//                       {/* Editor Dropdown */}
//                       <button
//                         onClick={() => toggleDropdown("editor")}
//                         className="text-white font-bold p-4 text-sm sm:text-base bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
//                       >
//                         <RiEdit2Fill fontSize={20} className="mr-2" />
//                         Editor Tools
//                         <svg
//                           className={`${
//                             openDropdown === "editor" ? "rotate-180" : ""
//                           } transform w-4 h-4 ml-1`}
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 9l-7 7-7-7"
//                           />
//                         </svg>
//                       </button>
//                       <div ref={dropdownRefs.editor}>
//                         {openDropdown === "editor" && (
//                           <EditorDropdown isDarkMode={isDarkMode} />
//                         )}
//                       </div>

//                       {/* Other Dropdown */}
//                       <button
//                         onClick={() => toggleDropdown("other")}
//                         className="text-white font-bold p-4 text-sm sm:text-base bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
//                       >
//                         <FaTools fontSize={20} className="mr-2" />
//                         Other Tools
//                         <svg
//                           className={`${
//                             openDropdown === "other" ? "rotate-180" : ""
//                           } transform w-4 h-4 ml-1`}
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 9l-7 7-7-7"
//                           />
//                         </svg>
//                       </button>
//                       <div ref={dropdownRefs.other}>
//                         {openDropdown === "other" && (
//                           <OtherDropdown isDarkMode={isDarkMode} />
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex flex-col gap-3">
//                       <Link href="/about" className="text-white font-bold p-4 bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 rounded-lg flex items-center gap-2">
//                         <FaInfo fontSize={15} />
//                         About
//                       </Link>
//                       <Link href="/contribute" className="text-white font-bold p-4 bg-blue-500 dark:bg-gray-600 hover:bg-blue-700 rounded-lg flex items-center gap-2">
//                         <IoMdGitPullRequest fontSize={20} />
//                         Contribute
//                       </Link>
//                     </div>

//                     <span className="text-center text-sm text-gray-500 dark:text-gray-400">
//                       © {new Date().getFullYear()}{" "}
//                       <Link href="/" className="hover:underline">
//                         WebDevTools
//                       </Link>
//                       . All Rights Reserved.
//                     </span>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// export default HamburgerMenu;
