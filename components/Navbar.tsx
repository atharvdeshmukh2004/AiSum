"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/config/firebaseConfig";
import { toast } from "sonner";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);

    const authInfo = {
      userId: result.user.uid,
      userEmail: result.user.email,
      name: result.user.displayName,
      isAuth: true,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(authInfo));
    }

    window.location.reload();

    toast("Successfuly signed in");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);

      if (typeof window !== "undefined") {
        localStorage.clear();
      }

      window.location.reload();

      toast("Logged out successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black text-white flex justify-between items-center py-4 px-5 ">
      <div className="text-2xl font-bold">
        <Link href={"/"}>AiSum</Link>
      </div>

      <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isAuth ? (
              <div>
                <Link href="/summarize" className="hover:underline">
                  <DropdownMenuItem>Summarize</DropdownMenuItem>
                </Link>

                <Link href="/history" className="hover:underline">
                  <DropdownMenuItem>History</DropdownMenuItem>
                </Link>

                <DropdownMenuItem onClick={signUserOut}>
                  Log Out
                </DropdownMenuItem>

                {/* <Button onClick={signUserOut}>Log Out</Button> */}
              </div>
            ) : (
              <div>
                <DropdownMenuItem onClick={signInWithGoogle}>
                  Sign In
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isAuth ? (
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/summarize" className="hover:underline">
            Summarize
          </Link>

          <Link href="/history" className="hover:underline">
            History
          </Link>

          <Button onClick={signUserOut}>Log Out</Button>
        </div>
      ) : (
        <div className="hidden md:flex items-center">
          <Button onClick={signInWithGoogle}>Sign In</Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
