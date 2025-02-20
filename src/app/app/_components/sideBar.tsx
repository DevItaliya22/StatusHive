"use client";
import {
  Activity,
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Server,
  Slack,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type CollapseState = {
  notification: boolean;
  statusPage: boolean;
  monitor: boolean;
};

export function AppSidebar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState<CollapseState>({
    notification: false,
    statusPage: false,
    monitor: false,
  });

  const router = useRouter();

  const notifications = [
    { title: "Email", icon: Mail },
    { title: "Slack", icon: Slack },
    { title: "Discord", icon: MessageSquare },
  ];

  const statuspages = [
    { id: "sp-1", name: "Main Website" },
    { id: "sp-2", name: "API Services" },
    { id: "sp-3", name: "Customer Portal" },
  ];

  const monitors = [
    { id: "mon-1", name: "Website Uptime", status: "green" },
    { id: "mon-2", name: "API Response Time", status: "red" },
    { id: "mon-3", name: "Database Health", status: "green" },
  ];

  const toggleCollapse = (section: keyof CollapseState) =>
    setIsCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));

  const handleRouting = (route:string) => {
    router.push(route);
  }

  return (
    <SidebarProvider className={className}>
      <Sidebar className="border-r bg-white">
        <SidebarHeader className="p-4">
          <div className="mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-gray-700 hover:bg-gray-100">
                  {/* <div className="size-6 rounded-lg bg-gray-200" /> */}
                  <Avatar>
                    <AvatarImage src={session?.user?.image ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-sm font-medium">{session?.user?.name}</p>
                    <ChevronDown className="size-4 text-gray-400" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px] bg-white">
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={()=>signOut()}
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Notifications Section */}
          <SidebarGroup>
            <div className="flex items-center justify-between px-2">
              <SidebarGroupLabel
                className="text-sm text-gray-700 select-none cursor-pointer"
                onClick={() => toggleCollapse("notification")}
              >
                <div className="flex items-center gap-2">
                  <Bell className="size-4" />
                  <span>Notifications</span>
                </div>
              </SidebarGroupLabel>
              <div className="flex items-center gap-2">
                {isCollapsed.notification ? (
                  <ChevronRight
                    className="size-4 cursor-pointer"
                    onClick={() => toggleCollapse("notification")}
                  />
                ) : (
                  <ChevronDown
                    className="size-4 cursor-pointer"
                    onClick={() => toggleCollapse("notification")}
                  />
                )}
              </div>
            </div>
            {!isCollapsed.notification && (
              <SidebarGroupContent className="flex">
                <div className="pl-6">
                  <Separator className="bg-gray-400" orientation="vertical" />
                </div>
                <SidebarMenu>
                  {notifications.map(({ title, icon: Icon }) => (
                    <SidebarMenuItem key={title}>
                      <SidebarMenuButton className="w-full pl-6 text-gray-700 hover:bg-gray-100" onClick={()=>handleRouting(`/notifications/${title.toLocaleLowerCase()}`)}>
                        <Icon className="size-4" />
                        <span className="ml-2 text-sm">{title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>

          {/* Status Pages Section */}
          <SidebarGroup>
            <div className="flex items-center justify-between px-2">
              <SidebarGroupLabel
                className="text-sm text-gray-700 select-none cursor-pointer"
                onClick={() => toggleCollapse("statusPage")}
              >
                <div className="flex items-center gap-2">
                  <Server className="size-4" />
                  <span>Status Pages</span>
                </div>
              </SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 text-gray-500 hover:text-gray-900"
                      onClick={()=>handleRouting("/statuspage")}
                    >
                      <Plus className="size-4" />
                      <span className="sr-only">Add Status Page</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Add Status Page</p>
                  </TooltipContent>
                </Tooltip>
                {isCollapsed.statusPage ? (
                  <ChevronRight
                    className="size-4 cursor-pointer"
                    onClick={() => toggleCollapse("statusPage")}
                  />
                ) : (
                  <ChevronDown
                    className="size-4 cursor-pointer"
                    onClick={() => toggleCollapse("statusPage")}
                  />
                )}
              </div>
            </div>
            {!isCollapsed.statusPage && (
              <SidebarGroupContent className="flex">
                <div className="pl-6">
                  <Separator className="bg-gray-400" orientation="vertical" />
                </div>
                <SidebarMenu>
                  {statuspages.map((page) => (
                    <SidebarMenuItem key={page.id}>
                      <SidebarMenuButton className="w-full pl-6 text-gray-700 hover:bg-gray-100" onClick={()=>handleRouting(`/statuspage/${page.id}`)}>
                        <span className="text-sm">{page.name}</span>
                        <span className="ml-2 text-xs text-zinc-500">
                          {page.id}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>

          {/* Monitors Section */}
          <SidebarGroup>
            <div className="flex items-center justify-between px-2">
              <SidebarGroupLabel
                className="text-sm text-gray-700 select-none cursor-pointer"
                onClick={() => toggleCollapse("monitor")}
              >
                <div className="flex items-center gap-2">
                  <Activity className="size-4" />
                  <span>Monitors</span>
                </div>
              </SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 text-gray-500 hover:text-gray-900"
                      onClick={()=>handleRouting("/monitors")}
                    >
                      <Plus className="size-4" />
                      <span className="sr-only">Add Monitor</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Add Monitor</p>
                  </TooltipContent>
                </Tooltip>
                {isCollapsed.monitor ? (
                  <ChevronRight
                    className="size-4 cursor-pointer"
                    onClick={() => toggleCollapse("monitor")}
                  />
                ) : (
                  <ChevronDown
                    className="size-4 cursor-pointer"
                    onClick={() => toggleCollapse("monitor")}
                  />
                )}
              </div>
            </div>
            {!isCollapsed.monitor && (
              <SidebarGroupContent className="flex">
                <div className="pl-6">
                  <Separator className="bg-gray-400" orientation="vertical" />
                </div>
                <SidebarMenu>
                  {monitors.map((monitor) => (
                    <SidebarMenuItem key={monitor.id}>
                      <SidebarMenuButton className="w-full pl-6 text-gray-700 hover:bg-gray-100" onClick={()=>handleRouting(`/monitors/${monitor.id}`)}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`size-2 rounded-full ${
                              monitor.status === "green"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          <span className="text-sm">{monitor.name}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
