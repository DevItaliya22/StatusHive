"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Monitor } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface FormData {
  title: string;
  subdomain: string;
  description: string;
  selectedMonitors: string[];
}

export default function StatusPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subdomain: "",
    description: "",
    selectedMonitors: [],
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<
    boolean | null
  >(null);

  const debouncedSubdomain = useDebounce(formData.subdomain, 500);

  const {
    data: monitors,
    isLoading:monitorsLoading,
    error,
  } = useQuery({
    queryKey: ["monitors"],
    queryFn: async () => {
      const response = await axios.get("/api/monitors");
      return response.data.monitors;
    },
  });

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/statuspage",formData)
      console.log(res.data)
      toast.success("Status page created successfully!");
    } catch (error) {
      console.error("Error creating status page:", error);
      toast.error("Error creating status page");
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    const checkSubdomain = async () => {
      if (!debouncedSubdomain) {
        setIsSubdomainAvailable(null);
        return;
      }
      setIsCheckingSubdomain(true);
      try {
        const response = await axios.get(
          `/api/subdomain/available?subdomain=${debouncedSubdomain}`
        );

        setIsSubdomainAvailable(response.data.available);
        if (response.data.available === false) {
          setErrors((prev) => ({
            ...prev,
            subdomain: "Subdomain is already taken by someone else",
          }));
        }else {
          setErrors((prev) => ({
            ...prev,
            subdomain: "",
          }));
        }
      } catch (error) {
        console.error("Error checking subdomain:", error);
        setErrors((prev) => ({
          ...prev,
          subdomain:
            "Subdomain should be longer than 3 letter and only alphabets are allowed.",
        }));
        setIsSubdomainAvailable(false);
      } finally {
        setIsCheckingSubdomain(false);
      }
    };

    checkSubdomain();
  }, [debouncedSubdomain]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [formData, isSubmitting,handleSubmit]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.subdomain.trim()) {
      newErrors.subdomain = "Subdomain is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.selectedMonitors.length === 0) {
      newErrors.selectedMonitors = ["Please select at least one monitor"];
    }
    if (!isSubdomainAvailable) {
      newErrors.subdomain = "Please choose an available subdomain";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleMonitor = (monitorId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedMonitors: prev.selectedMonitors.includes(monitorId)
        ? prev.selectedMonitors.filter((id) => id !== monitorId)
        : [...prev.selectedMonitors, monitorId],
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Status Page
          </h1>
          <p className="text-muted-foreground mt-2">
            Set up a public status page to showcase your service reliability
          </p>
        </div>

        <div className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Page Title
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={cn(errors.title && "border-destructive")}
              placeholder="My Service Status"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Subdomain Input */}
          <div className="space-y-2">
            <label htmlFor="subdomain" className="text-sm font-medium">
              Subdomain{" "}
              <p className="text-sm text-muted-foreground">
                Your status page will be available at{" "}
                {formData.subdomain || "subdomain"}.statushive.devitaliya.me
              </p>
            </label>
            <div className="relative">
              <Input
                id="subdomain"
                value={formData.subdomain}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subdomain: e.target.value.toLowerCase(),
                  }))
                }
                className={cn(
                  "pr-10",
                  isSubdomainAvailable && "border-green-500",
                  isSubdomainAvailable === false && "border-destructive"
                )}
                placeholder="my-service"
              />
              <div className="absolute right-3 top-2.5">
                {isCheckingSubdomain ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : isSubdomainAvailable ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : isSubdomainAvailable === false ? (
                  <X className="h-5 w-5 text-destructive" />
                ) : null}
              </div>
            </div>
            {errors.subdomain && (
              <p className="text-sm text-destructive">{errors.subdomain}</p>
            )}
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={cn(errors.description && "border-destructive")}
              placeholder="Describe what services are being monitored..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Monitor Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Monitors</label>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {monitorsLoading ? (
                [...Array(3)].map((_, i) => (
                  <Card key={i} className="cursor-pointer transition-colors hover:bg-accent">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (monitors && monitors?.map((monitor:Monitor) => (
                <Card
                  key={monitor.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-accent",
                    formData.selectedMonitors.includes(monitor.id.toString()) &&
                      "border-primary"
                  )}
                  onClick={() => toggleMonitor(monitor.id.toString())}
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
                          {monitor.active ? "active" : "inactive"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                )))}
            </div>
            {errors.selectedMonitors && (
              <p className="text-sm text-destructive">
                {errors.selectedMonitors}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Status Page...
              </>
            ) : (
              "Create Status Page"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Press Ctrl + S to save
          </p>
        </div>
      </div>
    </div>
  );
}
