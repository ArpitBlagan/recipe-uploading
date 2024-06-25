"use client";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignInSchema = z.object({
  email: z.string().email("Enter valid email"),
  password: z
    .string()
    .min(6, "Password should be atleast 6 characters long")
    .max(20, "Password should be atmost 20 characters long"),
});
type signin = z.infer<typeof SignInSchema>;
export const SigninForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signin>({ resolver: zodResolver(SignInSchema) });
  const onSubmit: SubmitHandler<signin> = async (data) => {
    console.log(data);
    setLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res?.error) {
      toast.error("something went wrong :(");
    } else {
      router.push("/");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form flex flex-col gap-3 md:w-1/2  w-full py-4 px-6 "
    >
      <p className="text-center">
        Donot have an account?{"   "}
        <Link href="/signup" className="underline">
          SignUp
        </Link>
      </p>
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
      <Button disabled={loading}>{loading ? "Signing in" : "SignIn"}</Button>
    </form>
  );
};
