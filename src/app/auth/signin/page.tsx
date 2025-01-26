"use client";

import { signIn } from "next-auth/react";

export default function Signin(){
    const  handleSignin = () =>{
        signIn("google",{redirect:true});
    }
    return <>
    <button onClick={handleSignin}>Signin with google</button>
    </>
}