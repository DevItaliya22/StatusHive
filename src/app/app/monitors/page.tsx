"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  active: z.boolean(),
  httpMethod: z.enum(["GET", "POST"]),
  url: z.string().url({ message: "Please enter a valid URL." }),
  headers: z.string(),
  body: z.string().optional(),
  frequency: z.string(),
  regions: z.array(z.string()).max(3, { message: "You can select up to 3 regions." }),
})

export default function MonitorForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      active: true,
      httpMethod: "GET",
      url: "",
      headers: "",
      body: "",
      frequency: "5m",
      regions: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      
      const response = await fetch("/api/monitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
  
      if (!response.ok) {
        throw new Error("Failed to create monitor")
      }
  
      toast.success("Monitor created successfully", {
        description: `Monitor "${values.name}" has been created.`,
      })
  
      // Optionally, you can reset the form or redirect the user
      form.reset()
      // Or redirect: router.push('/monitors')
    } catch (error) {
      toast.error("Failed to create monitor", {
        description: "Please try again or contact support if the problem persists.",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto py-6 px-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Monitors</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Monitor name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <FormDescription>Enable or disable this monitor</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="httpMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>HTTP Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="GET" />
                          </FormControl>
                          <FormLabel className="font-normal">GET</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="POST" />
                          </FormControl>
                          <FormLabel className="font-normal">POST</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://api.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="headers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Headers</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter custom headers in JSON format" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter custom headers in JSON format (e.g., {'Authorization": "Bearer token'})
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("httpMethod") === "POST" && (
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Request Body</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter request body in JSON format" className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>Enter the request body in JSON format for POST requests</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select check frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1m">Every 1 minute</SelectItem>
                        <SelectItem value="5m">Every 5 minutes</SelectItem>
                        <SelectItem value="15m">Every 15 minutes</SelectItem>
                        <SelectItem value="30m">Every 30 minutes</SelectItem>
                        <SelectItem value="1h">Every 1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regions"
                render={() => (
                  <FormItem>
                    <FormLabel>Regions</FormLabel>
                    <FormDescription>Select up to 3 regions to run the monitor from (click to toggle)</FormDescription>
                    <FormMessage />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["iad1", "sfo1", "sin1", "fra1", "syd1", "hnd1"].map((region) => (
                        <RegionBadge
                          key={region}
                          region={region}
                          selected={form.watch("regions").includes(region)}
                          onClick={() => {
                            const currentRegions = form.getValues("regions")
                            if (currentRegions.includes(region)) {
                              form.setValue(
                                "regions",
                                currentRegions.filter((r) => r !== region),
                              )
                            } else if (currentRegions.length < 3) {
                              form.setValue("regions", [...currentRegions, region])
                            }
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Monitor...
                  </>
                ) : (
                  "Create Monitor"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

function RegionBadge({ region, selected, onClick }: { region: string; selected: boolean; onClick: () => void }) {
  return (
    <Badge
      variant={selected ? "default" : "outline"}
      className={`cursor-pointer ${selected ? "bg-primary" : ""}`}
      onClick={onClick}
    >
      {region}
    </Badge>
  )
}

