"use client";
import { signIn } from "next-auth/react";

export default function SigninPage() {
    const handleSignin = () =>{
        signIn("google");
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <button onClick={handleSignin}>Signin button</button>
        </div>
    );
}