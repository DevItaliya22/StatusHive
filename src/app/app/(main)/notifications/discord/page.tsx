"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, AlertCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Monitor } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"; 
export default function WebhookPage() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [selectedMonitors, setSelectedMonitors] = useState<string[]>([]);

  function validateDiscordWebhook(webhookUrl: string){
    return !webhookUrl.startsWith("https://discord.com/api/webhooks/")
  }

  const handleSubmit = async () => {
    if (!webhookUrl || selectedMonitors.length === 0) {
      toast.error("Please provide both Webhook URL and select at least one monitor.");
      return;
    }
    if(validateDiscordWebhook(webhookUrl)){
      toast.error("Invalid Webhook URL")
      return
    }
    const res = await axios.post("/api/notifications/add/discord", {  
      webhookUrl,
      monitorId: selectedMonitors,
    });
    if (res.data.success) {
      toast.success("Webhook added successfully");
      setSelectedMonitors([]);
      setWebhookUrl("");
    } else {
      toast.error("Failed to add webhook");
    }
  };

  const handleTest = async () => {
    try {
      const res = await axios.post("/api/notifications/test/discord", {
        webhookUrl,
      });
      if (res.data.success) {
        toast.success("Test message sent to Discord");
      } else {
        toast.error(res.data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleMonitorSelection = (monitorId: string) => {
    setSelectedMonitors((prevSelected) =>
      prevSelected.includes(monitorId)
        ? prevSelected.filter((id) => id !== monitorId)
        : [...prevSelected, monitorId]
    );
  };

  const {
    data: monitorData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["monitors"],
    queryFn: async () => {
      const response = await axios.get("/api/monitors");
      return response.data.monitors;
    },
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Add Discord Webhook
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect your Discord channel to receive monitor notifications
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="webhook-url" className="text-sm font-medium">
              Webhook URL
            </label>
            <Input
              id="webhook-url"
              placeholder="https://discord.com/api/webhooks/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">
              Enter the webhook URL from your Discord channel
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Select Monitors</label>
            <div className="text-xs text-muted-foreground truncate">
              This will overwrite the current notification settings
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
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
              Add Webhook
            </Button>
            <Button variant="outline" onClick={handleTest}>
              Test Webhook
            </Button>
          </div>
        </div>

        <Separator />

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <h2 className="text-sm font-medium">Need help setting up?</h2>
              <p className="text-sm text-muted-foreground">
                Learn how to create a webhook URL in Discord&apos;s
                documentation
              </p>
              <Link
                href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View setup guide
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
