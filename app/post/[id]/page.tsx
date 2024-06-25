import { getPost, getComments } from "@/actions";
import Comment from "@/components/Comment";
import ShowDescription from "@/components/ShowDescription";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
const page = async ({ params }: any) => {
  const id = params.id;
  if (!id) {
    toast.error("Id required :(");
    redirect("/posts");
  }
  const recipe = await getPost(id);
  //@ts-ignore
  if (!recipe || recipe?.error) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center">
        <p>No Post with this id {id}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="h-[400px] w-full overflow-hidden flex items-center justify-center">
          <Image
            //@ts-ignore
            src={recipe?.image}
            alt="food items"
            width={1200}
            height={200}
            className="rounded-xl object-focus w-full"
          />
        </div>
        <p className="text-[30px]">
          {/* @ts-ignore */}
          {recipe?.title}
        </p>
        <ShowDescription
          description={
            // @ts-ignore
            recipe?.description
          }
        />
      </div>
      <div className="my-4">
        <Comment
          //@ts-ignore
          id={recipe.id}
        />
      </div>
    </div>
  );
};

export default page;
