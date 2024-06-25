"use client";
import { useSession } from "next-auth/react";
import FormButton from "./FormButton";
import { Input } from "./ui/input";
import { addComment } from "@/actions";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
const Comment = ({ id }: any) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getComments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/comment?postId=${id}`);
        console.log("cool", res.data);
        setComments(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("something went wrong file fetching comment :(");
      }
    };
    getComments();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {session && session.user && (
        <form
          className="flex gap-2"
          action={async (data) => {
            let text = data.get("text");
            if (!text) {
              toast.error("Text filed is required :(");
              return;
            }
            //@ts-ignore
            const res = await addComment(data, id, session.user.id);
            if (res.error) {
              toast.error("something went wrong while adding comment :(");
            } else {
              toast.success("Comment added successfully :)");
              setComments((prev) => {
                return [
                  {
                    user: {
                      email: session.user?.email,
                      name: session.user?.name,
                    },
                    text: data.get("text"),
                  },
                  ...prev,
                ];
              });
            }
          }}
        >
          <div className="flex-1">
            <Input type="text" name="text" placeholder="Must try recipe." />
          </div>
          <FormButton normal={"Comment"} normals="" />
        </form>
      )}
      <div className="flex flex-col gap-3">
        <p className="text-xl">Comments</p>
        {loading ? (
          <div className="flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          comments.map((ele: any, index: any) => {
            return (
              <div
                className="p-2 w-full rounded-xl border boder-gray-300 "
                key={index}
              >
                <h1 className="font-semibold">
                  {ele.user.name}{" "}
                  <span className="text-sm text-gray-600">
                    ({ele.user.email})
                  </span>
                </h1>
                <p className="pl-4">{ele.text}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comment;
