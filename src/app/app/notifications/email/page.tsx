"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

const fakeMonitors = [
  {
    id: "monitor1",
    name: "Production API",
    url: "https://api.example.com",
    status: "active",
  },
  {
    id: "monitor2",
    name: "Marketing Website",
    url: "https://www.example.com",
    status: "active",
  },
  {
    id: "monitor3",
    name: "Customer Dashboard",
    url: "https://dashboard.example.com",
    status: "active",
  },
];

export default function Email() {
  const [email, setEmail] = useState("");
  const [selectedMonitors, setSelectedMonitors] = useState<string[]>([]);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async () => {
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (selectedMonitors.length === 0) {
      alert("Please select at least one monitor.");
      return;
    }

    alert("Email notification added successfully");
  };

  const handleTest = async () => {
    try {
      const res = await axios.post("/api/notifications/test/email", {
        email,
      });
      if(res.data.success) {
        alert("Test message sent to Email");
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
    );
  };

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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fakeMonitors.map((monitor) => (
                <Card
                  key={monitor.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    selectedMonitors.includes(monitor.id)
                      ? "border-primary"
                      : ""
                  }`}
                  onClick={() => toggleMonitorSelection(monitor.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="font-medium">{monitor.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {monitor.url}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs text-muted-foreground capitalize">
                          {monitor.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
      </div>
    </div>
  );
}
