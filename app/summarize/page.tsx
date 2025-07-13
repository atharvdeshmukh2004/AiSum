"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "@/config/firebaseConfig";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { toast } from "sonner";
import { chatSession } from "@/config/AiConfig";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

const summarizePage = () => {
 
  const [open, setOpen] = useState(false);
  const [userText, setUserText] = useState("");
  const [loading, setloading] = useState(false);

  const { isAuth, userEmail } = useGetUserInfo();

  const router = useRouter();

  const signInWithGoogle = async() => {
    const result = await signInWithPopup(auth, provider)

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

    console.log(result)
  }

   const generateSummary = async () => {
     if (!isAuth) {
       setOpen(true);
       return;
     }

      if (userText.split("").length == 0) {
        toast("Paste or enter text .");
        return;
      }

     if (userText.split("").length < 20) {
       toast("Text is too small to summarize.");
       return;
     }

     setloading(true);

     const prompt = `Summarize this text ${userText}`;
     const result = await chatSession.sendMessage(prompt);

     setloading(false);

     console.log("Summarized Text: ", result.response.text());

     saveSummary(result.response.text());
  };
  
    const saveSummary = async (summary: string) => {
      setloading(true);
      const id = Date.now().toString();

      await setDoc(doc(db, "Summaries", id), {
        userText,
        summary,
        userEmail,
        id,
      });

      setloading(false);

      router.push(`/summary/${id}`);
    };
 
  return (
    <div className="bg-[#f5f5f5] flex flex-col justify-center items-center px-4 md:px-12 h-[90vh]">
      <div className=" bg-white w-full h-[70vh] shadow-md rounded-2xl flex p-2">
        <textarea
          onChange={(e)=>setUserText(e.target.value)}
          className="w-full rounded-l-2xl p-5 resize-none md:border-r focus:outline-none "
          placeholder='Enter or paste your text and press "Generate summary"'
        />

        <textarea
          disabled
          className="w-full rounded-r-2xl p-5 resize-none focus:outline-none hidden md:inline-flex"
        />
      </div>

      <Button className="mt-8" onClick={generateSummary}>
        {loading?"Generating...":"Generate summary"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>SIgn In with Google</DialogTitle>
            <DialogDescription>
              Please sign in to access the text summarization feature. Logging
              in ensures a personalized experience and saves your progress.
            </DialogDescription>
            <Button className="mt-8" onClick={signInWithGoogle}>
              Sign In with Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default summarizePage;
