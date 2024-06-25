"use client";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
// import imageCompression from "browser-image-compression";
import { uploadFileAndSignUp } from "@/actions";
import FormButton from "./FormButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email("Enter valid email"),
  password: z
    .string()
    .min(6, "Password should be atleast 6 characters long")
    .max(20, "Password should be atmost 20 characters long"),
});
type signup = z.infer<typeof SignUpSchema>;
export const SignupForm = () => {
  const router = useRouter();
  const [preview, setPreview] = useState<null | any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signup>({ resolver: zodResolver(SignUpSchema) });

  return (
    <form
      action={async (data) => {
        toast("signing up user :|");
        const val = await uploadFileAndSignUp(data);
        if (val.error) {
          toast.error(val.error);
        } else {
          //@ts-ignore
          toast.success(val.message);
          router.push("/signin");
        }
      }}
      className="form flex flex-col gap-3 md:w-1/2  w-full py-4 px-6 "
    >
      <p className="text-center">
        Already have an account?{"   "}
        <Link href="/signin" className="underline">
          SignIn
        </Link>
      </p>
      <div className="flex flex-col gap-2 items-start">
        <label>Name</label>
        <Input type="text" placeholder="Arpit" {...register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label>Email</label>
        <Input
          type="email"
          placeholder="arpit@gmail.com"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label>Password</label>
        <Input
          type="password"
          placeholder="@123arpit"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label>Profile Image</label>
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
            // const options = {
            //   maxSizeMB: 0.8,
            //   maxWidthOrHeight: 1280,
            //   useWebWorker: true,
            // };
            // try {
            //   const compressedFile = await imageCompression(ff, options);
            //   setFile(compressedFile);
            // } catch (err) {
            //   console.log(err);
            // }
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
      <FormButton normal={"SignUp"} normalS={"Signing up"} />
    </form>
  );
};
