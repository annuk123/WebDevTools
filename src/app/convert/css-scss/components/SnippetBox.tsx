interface SnippetBoxProps {
  setSnippet: (value: string) => void;
  snippet: string;
  isDarkMode: boolean;
  from: string;
}

export default function SnippetBox({
  setSnippet,
  snippet,
  isDarkMode,
  from,
}: SnippetBoxProps) {
  return (
    <textarea
      onChange={(e) => setSnippet(e.target.value)}
      className={`resize-none w-full shadow-inner p-4 border-0 ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
      placeholder={`Enter your ${from} here`}
      rows={10}
      value={snippet}
    ></textarea>
  );
}
