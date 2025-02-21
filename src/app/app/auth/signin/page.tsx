"use client";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SigninPage() {
    const url = `url(/bg${Math.floor(Math.random() * 4) + 1}.png)`
  return (
    <div 
      className="p-0 m-0 w-[100vw] h-[100vh] flex flex-col justify-between items-center relative
        bg-cover bg-center bg-fixed"
      style={{ backgroundImage: url }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="flex-1 flex justify-center items-center w-full z-10">
        <div className="grid gap-2 relative">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 bg-white text-black border-none hover:bg-gray-200 "
            onClick={() => signIn('google')}
          >
            <ChromeIcon className="h-5 w-5" />
            Sign up with Google
          </Button>
        </div>
      </div>

      <div
        className="text-[0px] select-none md:text-[150px] lg:text-[250px] text-center w-full m-0 relative z-10"
        style={{
          WebkitBackgroundClip: "text",
          MozBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          backgroundImage: "linear-gradient(to bottom, #000, #fff)",
        }}
      >
        StatusHive
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-white/50 text-sm z-10 text-center">
        By continuing, you agree to our Terms and Privacy Policy
        <br />
        Bro there are no such shits as privacy and terms here . 
        Exploit my service as much as you can .
      </div>
    </div>
  );
}