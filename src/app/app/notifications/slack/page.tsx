"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, AlertCircle } from "lucide-react"
import Link from "next/link"
import axios from "axios"

const fakeMonitors = [
  { id: "monitor1", name: "Production API", url: "https://api.example.com", status: "active" },
  { id: "monitor2", name: "Marketing Website", url: "https://www.example.com", status: "active" },
  { id: "monitor3", name: "Customer Dashboard", url: "https://dashboard.example.com", status: "active" },
]

export default function WebhookPage() {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [selectedMonitors, setSelectedMonitors] = useState<string[]>([])

  const handleSubmit = async () => {
    if (!webhookUrl || selectedMonitors.length === 0) {
      alert("Please provide both Webhook URL and select at least one monitor.")
      return
    }

    alert("Webhook added successfully")
  }

  const handleTest = async () => {
    try {
      const res = await axios.post("/api/notifications/test/slack", {
        webhookUrl,
      });
      if(res.data.success) {
        alert("Test message sent to Slack");
      }else {
        alert(res.data.error);
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
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Slack Webhook</h1>
          <p className="text-muted-foreground mt-2">Connect your Slack channel to receive monitor notifications</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="webhook-url" className="text-sm font-medium">
              Webhook URL
            </label>
            <Input
              id="webhook-url"
              placeholder="https://hooks.slack.com/services/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">Enter the webhook URL from your Slack channel</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Select Monitors</label>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fakeMonitors.map((monitor) => (
                <Card
                  key={monitor.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    selectedMonitors.includes(monitor.id) ? "border-primary" : ""
                  }`}
                  onClick={() => toggleMonitorSelection(monitor.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="font-medium">{monitor.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{monitor.url}</div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs text-muted-foreground capitalize">{monitor.status}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                Learn how to create a webhook URL in Slack&apos;s documentation
              </p>
              <Link
                href="https://api.slack.com/messaging/webhooks#getting_started"
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
  )
}
