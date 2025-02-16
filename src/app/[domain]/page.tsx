"use client"

import { Bell, Check, Clock } from "lucide-react"
import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"

// Generate 30 random status blocks
const statusBlocks = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  status: Math.random() > 0.1 ? "operational" : "error",
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
  requests: Math.floor(Math.random() * 300),
  failed: Math.floor(Math.random() * 5),
  responseTime: Math.floor(Math.random() * 500),
  uptime: (Math.random() * (99.99 - 98) + 98).toFixed(2),
}))

export default function StatusDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const statusPageName = "Dev"
  const monitorName = "monitorName"

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-10 py-12">
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <h1 className="text-2xl font-bold text-black">{statusPageName}</h1>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="bg-green-100 text-green-700 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>All Systems Operational</span>
              </div>
              <span className="text-sm text-gray-600">{currentTime.toLocaleDateString()+ " " + currentTime.toLocaleTimeString()}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span>{monitorName}</span>
                  <span className="text-sm text-gray-600">Last {statusBlocks.length} days</span>
                </div>
                <span className="text-green-600">
                  {(
                    (statusBlocks.filter((b) => b.status === "operational").length / statusBlocks.length) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </div>

              <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(10px,1fr))] gap-1">
                {statusBlocks.map((block) => (
                  <HoverCard key={block.id} openDelay={0.3} closeDelay={0.3}>
                    <HoverCardTrigger>
                        <div
                          className={`h-10 w-5 rounded-lg ${
                            block.status === "operational" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 p-0 bg-white border-gray-200" align="start">
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`px-2 py-1 text-xs rounded ${
                              block.status === "operational"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {block.status === "operational" ? "Operational" : "Error"}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {block.date.toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-gray-200" />

                      <div className="p-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Requests</span>
                          <span className="font-medium text-gray-900">{block.requests}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Failed</span>
                          <span className="font-medium text-red-600">{block.failed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Response Time</span>
                          <span className="font-medium text-gray-900">{block.responseTime}ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Uptime</span>
                          <span className="font-medium text-green-600">{block.uptime}%</span>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
            <Separator className="my-4 bg-gray-400 h-[2px]" />
            <div className="text-center space-y-2">
              <div className="inline-block p-3 rounded-full bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-black">No recent notices</h3>
              <p className="text-gray-600">There have been no reports within the last 7 days.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
