"use client";

import { useEffect, useRef } from "react";

type BlogEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const toolbarButtons = [
  { label: "B", title: "Bold", command: "bold" },
  { label: "I", title: "Italic", command: "italic" },
  { label: "H2", title: "Heading 2", command: "formatBlock", value: "h2" },
  { label: "H3", title: "Heading 3", command: "formatBlock", value: "h3" },
  { label: "P", title: "Paragraph", command: "formatBlock", value: "p" },
  { label: "UL", title: "Bullet list", command: "insertUnorderedList" },
  { label: "OL", title: "Numbered list", command: "insertOrderedList" },
];

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const runCommand = (command: string, commandValue?: string) => {
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML ?? "");
    editorRef.current?.focus();
  };

  const addLink = () => {
    const href = window.prompt("Unesite link");

    if (href) {
      runCommand("createLink", href);
    }
  };

  const addImage = () => {
    const src = window.prompt("Unesite URL slike");

    if (src) {
      runCommand("insertImage", src);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#5c4a3d]/20 bg-[#fdfaf6]">
      <div className="flex flex-wrap gap-2 border-b border-[#5c4a3d]/10 p-3">
        {toolbarButtons.map((button) => (
          <button
            key={`${button.command}-${button.value ?? button.label}`}
            type="button"
            title={button.title}
            onClick={() => runCommand(button.command, button.value)}
            className="h-9 min-w-9 rounded-md border border-[#5c4a3d]/15 px-3 text-sm font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8"
          >
            {button.label}
          </button>
        ))}
        <button
          type="button"
          onClick={addLink}
          className="h-9 rounded-md border border-[#5c4a3d]/15 px-3 text-sm font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8"
        >
          Link
        </button>
        <button
          type="button"
          onClick={addImage}
          className="h-9 rounded-md border border-[#5c4a3d]/15 px-3 text-sm font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8"
        >
          Slika
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-label="Sadržaj blog objave"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="min-h-80 px-5 py-4 leading-8 text-[#4a382b] outline-none [&_a]:font-semibold [&_a]:text-[#5c4a3d] [&_h2]:font-serif [&_h2]:text-3xl [&_h3]:font-serif [&_h3]:text-2xl [&_img]:my-5 [&_img]:max-h-96 [&_img]:rounded-xl [&_img]:object-cover [&_li]:ml-6 [&_ol]:list-decimal [&_p]:mb-4 [&_strong]:font-bold [&_ul]:list-disc"
        suppressContentEditableWarning
      />
    </div>
  );
}
