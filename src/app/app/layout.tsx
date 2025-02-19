import type React from "react" 
import { Sidebar } from "./_components/sideBar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background h-full ">
      <aside className="w-64 bg-background p-4 flex flex-col">
        <Sidebar></Sidebar>
      </aside>
     
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

 