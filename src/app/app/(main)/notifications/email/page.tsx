"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Monitor } from "@prisma/client";
import {toast} from "sonner";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Email() {
  const [email, setEmail] = useState("");
  const [selectedMonitors, setSelectedMonitors] = useState<string[]>([]);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async () => {
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (selectedMonitors.length === 0) {
      toast.error("Please select at least one monitor.");
      return;
    }
    console.log(selectedMonitors);
    const res = await axios.post("/api/notifications/add/email", {
      email,
      monitorId : selectedMonitors
    })  
    if(res.data.success){ 
      toast.success("Email notification added successfully");
      setSelectedMonitors([]);
      setEmail("");
    }else{
      console.log(res.data);
      toast.error("Failed to add email notification");
    }
  };

  const handleTest = async () => {
    try {
      const res = await axios.post("/api/notifications/test/email", {
        email,
      });
      if (res.data.success) {
        toast.success("Test message sent to Email");
      } else {
        toast.error(res.data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { data: testedEmails, isLoading: testedEmailsLoading, error: testedEmailsError } = useQuery({
    queryKey: ['testedEmails'],
    queryFn: async () => {
      const response = await axios.get('/api/notifications/getTestedEmails');
      return response.data.testedEmails;
    }
  });

  const toggleMonitorSelection = (monitorId: string) => {
    setSelectedMonitors((prevSelected) =>
      prevSelected.includes(monitorId)
        ? prevSelected.filter((id) => id !== monitorId)
        : [...prevSelected, monitorId]
    );
  };
  const { data: monitorData, isLoading : monitorLoading, error : monitorError } = useQuery({
    queryKey: ['all_monitors'],
    queryFn: async () => {
      const response = await axios.get('/api/monitors');
      return response.data.monitors;
    }
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Add Email Notification
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect your email to receive monitor notifications
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">
              Enter the email address to receive notifications
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Select Monitors</label>
            <div className="text-xs text-muted-foreground truncate">
              This will overwrite the current notification settings
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {monitorLoading ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="cursor-pointer transition-colors hover:bg-accent">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-4 w-40" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-2 w-2 rounded-full" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                monitorData?.map((monitor: Monitor) => (
                  <Card
                    key={monitor.id}
                    className={`cursor-pointer transition-colors hover:bg-accent ${
                      selectedMonitors.includes(monitor.id.toString())
                        ? "border-primary"
                        : ""
                    }`}
                    onClick={() => toggleMonitorSelection(monitor.id.toString())}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="font-medium">{monitor.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {monitor.url}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          Current Notification : {monitor.discordNotificationOn ? "Discord" : monitor.emailNotificationOn ? "Email" : monitor.slackNotificationOn ? "Slack" : "None"}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-xs text-muted-foreground capitalize">
                            {monitor.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={handleSubmit} className="flex-1">
              Add Email Notification
            </Button>
            <Button variant="outline" onClick={handleTest}>
              Test Email
            </Button>
          </div>
        </div>

        <Separator />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tested Emails</h1>
          <p className="text-muted-foreground mt-2">
            These are the emails that have been tested for notifications
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {testedEmailsLoading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="hover:bg-accent transition-all">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24 mt-1" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              testedEmails?.map((email: string) => (
                <Card key={email} className="hover:bg-accent transition-all">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{email}</div>
                        <div className="text-xs text-muted-foreground">Verified Email</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500 text-white hover:bg-green-600">Tested</Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
