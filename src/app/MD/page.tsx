"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import snarkdown from "snarkdown";
import { saveAs } from "file-saver";
//import NavBar from "../../components/navbar";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Search from "../../components/search";
import Link from "next/link";
import SunIcon from "../../components/icons/sunicon";
import MoonIcon from "../../components/icons/moonicon";

interface MarkdownButton {
  label: string;
  data: string;
}

interface InsertMarkdownProps {
  markdownToInsert: string;
}

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>("# hey");
  const [name, setName] = useState<string>("untitled");
  const [toggle, setToggle] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // const toggleTheme = useCallback(() => {
  //   const newTheme = !isDarkMode;
  //   setIsDarkMode(newTheme);
  //   localStorage.setItem("theme", JSON.stringify(newTheme));
  // }, [isDarkMode]);

  // useEffect(() => {
  //   const storedTheme = localStorage.getItem("theme");
  //   try {
  //     if (storedTheme !== null && JSON.parse(storedTheme) !== isDarkMode) {
  //       toggleTheme();
  //     }
  //   } catch {
  //     console.log("Failed to read localstorage");
  //   }
  // }, [isDarkMode, toggleTheme]);

  const previousMarkdownRef = useRef<string>(markdown);

  useEffect(() => {
    if (iframeRef.current && markdown !== previousMarkdownRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
              <style>
                body {
                  margin: 0;
                  padding: 16px;
                  background-color: ${isDarkMode ? "#1a202c" : "white"};
                  color: ${isDarkMode ? "white" : "black"};
                }
              </style>
            </head>
            <body class="markdown-body">
              ${snarkdown(markdown)}
            </body>
          </html>
        `);
        iframeDoc.close();
      }
      previousMarkdownRef.current = markdown;
    }
  }, [markdown, isDarkMode]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMarkdownChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMarkdown(event.target.value);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    saveAs(blob, name + ".md");
  };

  const insertMarkdown = ({ markdownToInsert }: InsertMarkdownProps) => {
    if (textareaRef.current) {
      const cursorPosition = (textareaRef.current as HTMLTextAreaElement)
        .selectionStart;
      const newMarkdown =
        markdown.substring(0, cursorPosition) +
        markdownToInsert +
        markdown.substring(cursorPosition);

      setMarkdown(newMarkdown);
    }
  };

  const markdownButtons: MarkdownButton[] = [
    { label: "H1", data: "# " },
    { label: "H2", data: "## " },
    { label: "H3", data: "### " },
    { label: "Bold", data: "**bold text**" },
    { label: "Italic", data: "*italic text*" },
    { label: "Strikethrough", data: "~~strikethrough text~~" },
    { label: "Bullet List", data: "- " },
    { label: "Numbered List", data: "1. " },
    { label: "Link", data: "[link text](https://example.com)" },
    { label: "Image", data: "![alt text](image-url)" },
    { label: "Block Quote", data: "> " },
    { label: "Inline Code", data: "`inline code`" },
    { label: "Code Block", data: "```\ncode block\n```" },
    { label: "Horizontal Rule", data: "\n---\n" },
  ];

  function searchToggle() {
    setToggle(!toggle);
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast("Markdown Copied!!", {
        duration: 1500,
        icon: "✅",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <main
      className={`h-screen overflow-auto ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <nav>
        {/* <NavBar
        title={"GitHub Issue Finder"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      /> */}

        <div
          className={`py-4 px-6 flex items-center justify-between h-[69px] ${
            isDarkMode ? "bg-gray-800" : "bg-blue-500"
          }`}
        >
          <Link
            href="/"
            className={`mr-2 flex border items-center p-2 hover:bg-blue-700 transition-all duration-700 rounded-lg ${
              isDarkMode ? "border-gray-600" : ""
            }`}
          >
            <h1 className="text-sm md:text-2xl font-bold mr-4 ml-1">
              Web Dev Tools
            </h1>
            <p className="mr-2 text-sm">MD Editor</p>
          </Link>
          <div className="hidden  md:flex md:items-center">
            <input
              value={name}
              onChange={handleNameChange}
              className={`outline-none border text-sm rounded p-1.5 px-2 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            />
            <button
              onClick={handleDownload}
              className={`ml-2 mr-2 text-sm rounded p-1.5 px-2 hover:bg-gray-600 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-300 border-gray-200 text-black"
              }`}
            >
              Download
            </button>
            <div className="hidden lg:block ml-6">
              <Search isDarkMode={isDarkMode} />
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
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
        </div>
        <div className=" my-3 w-full flex justify-center items-center md:hidden ">
          <input
            value={name}
            onChange={handleNameChange}
            className={`outline-none border text-sm rounded p-1.5 px-2 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
          />
          <button
            onClick={handleDownload}
            className={`ml-2 mr-2 text-sm rounded p-1.5 px-2 hover:bg-gray-600 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-300 border-gray-200 text-black"
            }`}
          >
            Download
          </button>
          <div className="hidden lg:block ml-6">
            <Search isDarkMode={isDarkMode} />
          </div>
        </div>
      </nav>
      <div className="flex justify-between">
        <div className="flex flex-wrap justify-center md:justify-normal ">
          {markdownButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => insertMarkdown({ markdownToInsert: button.data })}
              className={`text-sm rounded px-2 py-2 hover:bg-gray-600 m-2 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-300 border-gray-200 text-black"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <section className="flex flex-col md:flex-row w-full h-[100%] gap-3">
        <section className="w-[96%] h-full  md:w-1/2 ml-2 mr-2 relative">
          <button
            onClick={copyToClipboard}
            className="absolute top-9 right-2 p-1 rounded hover:bg-opacity-20 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Copy to clipboard"
          >
            <ContentCopyIcon />
          </button>
          <h1>Markdown</h1>
          <textarea
            className={`border p-2 h-full w-full resize-none ${
              isDarkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            value={markdown}
            onChange={handleMarkdownChange}
            ref={textareaRef}
          />
        </section>
        <section className="w-[96%] md:w-1/2 h-full ml-2 mr-2 mt-6 md:mt-0 ">
          <h1>Output</h1>
          <iframe
            ref={iframeRef}
            className={`w-full h-full ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
            title="Parsed Markdown"
            style={{ border: "none" }} // Ensure no border styling affects the iframe's appearance
          />
        </section>
      </section>
      <Toaster />
    </main>
  );
}
