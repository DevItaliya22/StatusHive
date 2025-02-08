"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
const fakeStatusPages = ["statuspage1", "statuspage2", "statuspage3"];

export default function DiscordAlerts() {
  const [webhooks, setWebhooks] = useState<{ name: string; webhookUrl: string; statusPage: string; createdAt: string }[]>([]);

  const [name, setName] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [selectedPage, setSelectedPage] = useState(fakeStatusPages[0]);

  const addWebhook = () => {
    const newWebhook = {
      name,
      webhookUrl,
      statusPage: selectedPage,
      createdAt: new Date().toLocaleString(),
    };
    setWebhooks([...webhooks, newWebhook]);
    setName("");
    setWebhookUrl("");
  };

  return (
    <div className="p-6 max-w-2xl ">
      <div className="flex justify-left">
        <h1 className="text-3xl font-bold">Email Alerts</h1>
      </div>
      <div className="mt-6 space-y-4">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Webhook URL" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
        <Select onValueChange={setSelectedPage}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status Page" />
          </SelectTrigger>
          <SelectContent>
            {fakeStatusPages.map((page) => (
              <SelectItem key={page} value={page}>{page}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={addWebhook}>Add Webhook</Button>
      </div>
      <Separator className="my-6" />
      <h2 className="text-xl font-semibold">Created Webhooks</h2>
      <div className="mt-4 space-y-4">
        {webhooks.map((webhook, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
