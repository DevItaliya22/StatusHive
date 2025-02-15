"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useLocation } from "@/hooks/use-location";
import {
  Bell,
  Activity,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Disc as Discord,
  Mail,
  MessageSquare,
  Moon,
  Sun,
  Plus,
  ChevronUp,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface StatusItem {
  id: number;
  name: string;
  status: "online" | "offline" | "maintenance";
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [statusItems, setStatusItems] = useState<StatusItem[]>([]);
  const [monitor, setMonitor] = useState<any>([]);
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useLocation();
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [isMonitorOpen , setIsMonitorOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setStatusItems([
        { id: 1, name: "Status Page 1", status: "online" },
        { id: 2, name: "Status Page 2", status: "maintenance" },
        { id: 3, name: "Status Page 3", status: "offline" },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMonitor([
        { id: 1, name: "Monitor 1", status: "online" },
        { id: 2, name: "Monitor 2", status: "maintenance" },
        { id: 3, name: "Monitor 3", status: "offline" },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push("/auth/signin");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r border-zinc-100  bg-white dark:bg-black transition-all duration-300 shadow-lg",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="h-14 flex items-center justify-between px-4 border-b border-zinc-100 ">
        <span
          className={cn("font-semibold text-zinc-900 select-none", !isOpen && "hidden")}
        >
          Dashboard
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-zinc-100 "
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 py-4">
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100  rounded-md transition-colors">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className={cn("transition-all", !isOpen && "hidden")}>
                  Notifications
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  !isOpen && "hidden"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn("space-y-1 px-2", !isOpen && "hidden")}
            >
              {[
                {
                  icon: Discord,
                  label: "Discord",
                  path: "/notifications/discord",
                },
                { icon: Mail, label: "Email", path: "/notifications/email" },
                {
                  icon: MessageSquare,
                  label: "Slack",
                  path: "/notifications/slack",
                },
              ].map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal text-zinc-700 hover:bg-zinc-100  hover:text-zinc-900"
                  onClick={() => router.push(item.path)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger
              className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
            >
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className={cn("transition-all", !isOpen && "hidden")}>
                  Status
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/statuspage");
                  }}
                  className="p-1 rounded hover:bg-zinc-200 transition"
                >
                  {isOpen  && !isLoading && <Plus className="h-4 w-4 text-zinc-900" /> }
                  <span className="sr-only">Create Status Page</span> 
                </button>
                {isStatusOpen && !isLoading ? (
                  <ChevronUp className="h-4 w-4 transition-transform" />
                ) : (
                  <ChevronDown className="h-4 w-4 transition-transform" />
                )}
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent
              className={cn("space-y-1 px-2", !isOpen && "hidden")}
            >
              {isLoading ? (
                <div className="text-sm text-zinc-500 py-2">Loading...</div>
              ) : (
                statusItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal text-zinc-700 hover:bg-zinc-100  hover:text-zinc-900"
                    onClick={() => router.push(`/statuspage/${item.id}`)}
                  >
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        item.status === "online" && "bg-green-500",
                        item.status === "offline" && "bg-red-500",
                        item.status === "maintenance" && "bg-yellow-500"
                      )}
                    />
                    {item.name}
                  </Button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger
              className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
              onClick={() => setIsMonitorOpen(!isMonitorOpen)}
            >
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className={cn("transition-all", !isOpen && "hidden")}>
                  Monitors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/monitors");
                  }}
                  className="p-1 rounded hover:bg-zinc-200 transition"
                >
                  {isOpen  && !isLoading && <Plus className="h-4 w-4 text-zinc-900" /> }
                  <span className="sr-only">Create Monitors</span> 
                </button>
                {isStatusOpen && !isLoading ? (
                  <ChevronUp className="h-4 w-4 transition-transform" />
                ) : (
                  <ChevronDown className="h-4 w-4 transition-transform" />
                )}
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent
              className={cn("space-y-1 px-2", !isOpen && "hidden")}
            >
              {isLoading ? (
                <div className="text-sm text-zinc-500 py-2">Loading...</div>
              ) : (
                monitor.map((item:any) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal text-zinc-700 hover:bg-zinc-100  hover:text-zinc-900"
                    onClick={() => router.push(`/monitors/${item.id}`)}
                  >
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        item.status === "online" && "bg-green-500",
                        item.status === "offline" && "bg-red-500",
                        item.status === "maintenance" && "bg-yellow-500"
                      )}
                    />
                    {item.name}
                  </Button>
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-zinc-100  flex gap-x-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-zinc-700 hover:bg-zinc-100   hover:text-zinc-900"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span
            className={cn("transition-all", !isOpen && "hidden")}
            onClick={handleSignOut}
          >
            Logout
          </span>
        </Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
}
