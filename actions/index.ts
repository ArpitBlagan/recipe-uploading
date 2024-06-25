"use server";
import bcrypt from "bcryptjs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import dotenv from "dotenv";
dotenv.config();
const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_AWs_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_KEY as string,
  },
});
const uploadToS3 = async (file: any, name: any) => {
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME as string,
    Key: `${name}`,
    Body: file,
    ContentType: ["image/jpg", "image/png", "image/svg"],
  };

  const command = new PutObjectCommand(params as any);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return response;
  } catch (error) {
    throw error;
  }
};
export const uploadFileAndSignUp = async (data: any) => {
  let imageUrl;
  const file = data.get("file");
  if (file) {
    const fileStream = Buffer.from(await file.arrayBuffer());
    try {
      const res = await uploadToS3(fileStream, file.name);
      imageUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
      console.log(res, imageUrl);
    } catch (err) {
      console.log(err);
      return { error: "Image uploadation fail :(" };
    }
  }
  console.log(data);
  let hashed = await bcrypt.hash(data.get("password"), 10);
  try {
    await prisma.user.create({
      data: {
        name: data.get("name"),
        email: data.get("email"),
        password: hashed,
        image: imageUrl,
      },
    });
    return { message: "successfully signed up the user :)" };
  } catch (err) {
    return { error: "Falied to create a user :(" };
  }
};

export const uploadFileAndPost = async (
  data: any,
  explaination: string,
  id: string
) => {
  const file = data.get("file");
  const title = data.get("title");
  console.log(explaination);
  if (!file || title.length == 0) {
    return { error: "fileds are required :(" };
  }
  let imageUrl;
  if (file) {
    const fileStream = Buffer.from(await file.arrayBuffer());
    try {
      const res = await uploadToS3(fileStream, file.name);
      imageUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
      console.log(res, imageUrl);
    } catch (err) {
      console.log(err);
      return { error: "Image uploadation fail :(" };
    }
  }
  try {
    await prisma.post.create({
      data: {
        title: title,
        description: explaination,
        image: imageUrl as string,
        userId: id,
      },
    });
    revalidatePath("/posts");
    return { message: "Recipe posted successfully :)" };
  } catch (err) {
    console.log(err);
    return { error: "Not able to post recipe something went wrong :(" };
  }
};

export const getPosts = async () => {
  try {
    const recipes = await prisma.post.findMany({});
    return { recipes, message: "recipes fetched successfully :)" };
  } catch (err) {
    return { error: "something went wrong :(" };
  }
};

export const getPost = async (id: string) => {
  try {
    const recipe = await prisma.post.findFirst({
      where: {
        id,
      },
    });
    return recipe;
  } catch (err) {
    return { error: "something went wrong :(" };
  }
};

export const getComments = async (id: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
      include: {
        user: true,
      },
    });
    console.log("comments", comments);
    return comments;
  } catch (err) {
    console.log(err);
    return { error: "something went wrong :(" };
  }
};

export const addComment = async (data: any, postId: string, userId: string) => {
  console.log(data);
  try {
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        text: data.get("text"),
      },
    });
    return { message: "done" };
  } catch (err) {
    return { error: "something went wrong :(" };
  }
};
