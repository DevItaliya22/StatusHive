"use client";
import { signIn } from "next-auth/react";

export default function SigninPage() {
    const handleSignin = () =>{
        // callback url will redirect user after signin
        signIn("google",{callbackUrl: "http://localhost:3000/"});
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <button onClick={handleSignin}>Signin button</button>
        </div>
    );
}