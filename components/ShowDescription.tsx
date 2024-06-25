"use client";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownIt from "markdown-it";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const ShowDescription = ({ description }: any) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  useEffect(() => {
    console.log(description);
  }, []);
  return (
    <div className="porse">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
      {/* <MarkdownEditor
        theme="dark"
        value={description}
        style={{ height: "500px" }}
        renderHTML={(code) => mdParser.render(code)}
      /> */}
    </div>
  );
};

export default ShowDescription;
