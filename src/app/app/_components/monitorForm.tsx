
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

const regions = ["North America", "South America", "Europe", "Asia", "Africa", "Oceania"]

export default function MonitorForm() {
  const [method, setMethod] = useState("GET")
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])

  const handleRegionToggle = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : prev.length < 3 ? [...prev, region] : prev,
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  const handleTest = () => {
    // Implement test logic
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-bold mb-6">Create New Monitor</h1>
      <div className="space-y-2">
        <Label htmlFor="name">Monitor Name</Label>
        <Input id="name" placeholder="My API Monitor" />
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input id="tags" placeholder="api, production" />
      </div> */}


      <div className="space-y-2">
        <Label>HTTP Method</Label>
        <Select onValueChange={setMethod} defaultValue="GET">
          <SelectTrigger>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input id="url" placeholder="https://api.example.com" />
      </div>

      {method === "GET" && (
        <div className="space-y-2">
          <Label htmlFor="headers">Custom Headers (JSON)</Label>
          <Textarea id="headers" placeholder='{"Authorization": "Bearer token"}' />
        </div>
      )}

      {method === "POST" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="post-headers">Headers (JSON)</Label>
            <Textarea id="post-headers" placeholder='{"Content-Type": "application/json"}' />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Body (JSON)</Label>
            <Textarea id="body" placeholder='{"key": "value"}' />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>Scheduling</Label>
        <Select defaultValue="5">
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Every 1 minute</SelectItem>
            <SelectItem value="5">Every 5 minutes</SelectItem>
            <SelectItem value="15">Every 15 minutes</SelectItem>
            <SelectItem value="30">Every 30 minutes</SelectItem>
            <SelectItem value="60">Every 60 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Regions (Max 3)</Label>
        <div className="grid grid-cols-2 gap-2">
          {regions.map((region) => (
            <Card
              key={region}
              className={`cursor-pointer ${selectedRegions.includes(region) ? "border-primary" : ""}`}
              onClick={() => handleRegionToggle(region)}
            >
              <CardContent className="flex items-center justify-between p-2">
                <span>{region}</span>
                {selectedRegions.includes(region) && <span>✓</span>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Status Page</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select status page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="page1">Status Page 1</SelectItem>
            <SelectItem value="page2">Status Page 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Notification</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select notification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="notify1">Notification 1</SelectItem>
            <SelectItem value="notify2">Notification 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      
      <div className="flex items-center space-x-2">
        <Switch id="active" />
        <Label htmlFor="active">Active</Label>
      </div>

      <div className="flex space-x-2">
        <Button type="submit">Create Monitor</Button>
        <Button type="button" variant="outline" onClick={handleTest}>
          Test URL
        </Button>
      </div>
    </form>
  )
}

