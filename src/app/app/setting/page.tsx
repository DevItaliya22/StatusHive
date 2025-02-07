"use client";
import { useSession } from 'next-auth/react';
import React from 'react'
// https://app.statushive.devitaliya.me/setting page 
function Setting() {
    const {data:session} = useSession();
  return (
    <div>Setting
        {session && session.user ? <>Welcome {session?.user.email}</> : <>Please sign in</>}

    </div>
  )
}

export default Setting