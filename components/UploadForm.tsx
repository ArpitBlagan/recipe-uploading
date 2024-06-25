"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import MarkdownIt from "markdown-it";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import FormButton from "./FormButton";
import { uploadFileAndPost } from "@/actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
const UploadForm = () => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect("/signin");
  }
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [preview, setPreview] = useState<null | any>(null);
  const [explaination, setExplaintation] = useState(
    `## Ingredients:\n ## Steps:\n`
  );
  function handleEditorChange({ html, text }: any) {
    console.log(html, text);
    setExplaintation(text);
  }
  return (
    <form
      className="w-8/12 flex flex-col gap-3"
      action={async (data) => {
        const res = await uploadFileAndPost(
          data,
          explaination,
          //@ts-ignore
          session.user?.id
        );
        if (res?.error) {
          toast.error(res.error);
        } else {
          //@ts-ignore
          toast.success(res.message);
          redirect("/posts");
        }
      }}
    >
      <div className="flex flex-col gap-2 items-start">
        <label>Title</label>
        <Input type="text" name="title" placeholder="Litti Chohka" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label>Cover Image </label>
        <Input
          type="file"
          name="file"
          className="cursor-pointer"
          onChange={async (e: any) => {
            const ff = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview(reader.result);
            };
            reader.readAsDataURL(ff);
          }}
        />
        {preview && (
          <div className="flex items-center justify-center w-full">
            <img
              src={preview}
              alt="Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 px-2">
        <label>Explaination</label>
        <MarkdownEditor
          value={explaination}
          style={{ height: "500px" }}
          renderHTML={(code) => mdParser.render(code)}
          onChange={handleEditorChange}
        />
      </div>
      <FormButton normal="Post" normalS="Posting" />
    </form>
  );
};

export default UploadForm;
