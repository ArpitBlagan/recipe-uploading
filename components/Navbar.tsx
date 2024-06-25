"use client";
import { ModeToggle } from "@/components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
const Navbar = () => {
  let { data: session } = useSession();
  //   if (!session) {
  //     redirect("/");
  //   }
  return (
    <div className="flex items-center border border-gray-600 rounded-xl py-2 px-5 font-mono gap-2">
      <div className="flex-1 md:text-[26px] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        <Link href="/">Recipe Listing App</Link>
      </div>
      <div className="flex items-center justify-end gap-5">
        {session && session.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="cursor-pointer">Profile</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem className="flex gap-3 items-center">
                <Image
                  alt="Card background"
                  className="rounded-xl"
                  src={session.user?.image as string}
                  width={50}
                  height={50}
                />
                <p>{session.user?.name}</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-gray-700">{session.user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/posts">Posts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant={"destructive"}
                  onClick={async (e) => {
                    e.preventDefault();
                    await signOut();
                  }}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-4 items-center">
            <Link href="/signup">SignUp</Link>
            <Link href="/signin">SignIn</Link>
          </div>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
