"use client";
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
// https://app.statushive.devitaliya.me/setting page 
// http://app.localhost:3000/setting
function Setting() {
    const {data:session} = useSession();
    const handleSignout = () =>{
        signOut({redirect:false});
    }
  return (
    <div>
        Setting
        {session && session.user ? <>Welcome {session?.user.email}
        <br />
        <button onClick={handleSignout}> signout </button></> : <>Please sign in</>}
    </div>

  )
}

export default Setting