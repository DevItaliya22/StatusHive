"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star } from 'lucide-react';
import Link from "next/link";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { TextEffect } from "@/components/ui/text-effect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session } = useSession();
  const baseUrl = process.env.NODE_ENV === "development" ? "http://app.localhost:3000" : "https://app.statushive.devitaliya.me";

  const [subdomain, setSubdomain] = useState("");
  const debouncedSubdomain = useDebounce<string>(subdomain, 200);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<
  boolean | null
>(null);
const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);
  const [errors, setErrors] = useState<{subdomain:string}>({subdomain:""});
  const [availMsg, setAvailMsg] = useState<string>("");
  const [waitingMsg, setWaitingMsg] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const checkSubdomain = async () => {
      if (!debouncedSubdomain) {
        setIsSubdomainAvailable(null);
        setWaitingMsg("");
        return;
      }
      setIsCheckingSubdomain(true);
      setWaitingMsg("Checking availability...");
      try {
        const response = await axios.get(
          `/api/subdomain/available?subdomain=${debouncedSubdomain}`
        );

        setIsSubdomainAvailable(response.data.available);
        if (response.data.available === false) {
          setErrors((prev) => ({
            subdomain: "Subdomain is already taken by someone else",
          }));
          setWaitingMsg("");
        } else {
          setErrors((prev) => ({
            subdomain: "",
          }));
          setWaitingMsg("Subdomain is available!");
        }
      } catch (error) {
        console.error("Error checking subdomain:", error);
        setErrors((prev) => ({
          subdomain:
            "Subdomain should be longer than 3 letters and only alphabets are allowed.",
        }));
        setIsSubdomainAvailable(false);
        setWaitingMsg("");
      } finally {
        setIsCheckingSubdomain(false);
      }
    };

    checkSubdomain();
  }, [debouncedSubdomain]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-20 py-10 max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-xl font-semibold text-black dark:text-white"
        >
          Statushive
        </Link>
        <Link
          href={session ? `${baseUrl}/dashboard` : `${baseUrl}/auth/signin`}
          className="flex items-center gap-2 text-black dark:text-white"
        >
          <TextShimmer duration={2}>{session ? "Dashboard" :"Sign in"}</TextShimmer>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="mx-auto">
        <div className="text-center space-y-8 px-4 py-16">
          <Link
            href="https://github.com/DevItaliya22/StatusHive"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-900 hover:bg-gray-200"
          >
            <TextShimmer duration={2}>Star us on Github</TextShimmer>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </Link>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Get a status page now.
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <TextEffect per="char" preset="fade">
              Monitor your API and website globally, identify performance
              issues, downtime and receive alerts before your users are
              affected.
            </TextEffect>
          </p>

          <div className="flex items-center justify-center gap-2 mx-auto flex-col">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <Input
                type="text"
                placeholder="subdomain"
                className="flex-1 min-w-6 border-0 border-b-2 border-gray-300  bg-transparent rounded-none focus:border-none focus:ring-0 focus:border-transparent"
                onChange={(e) => setSubdomain(e.target.value.toLocaleLowerCase())}  
              />
              <span className="text-black dark:text-white whitespace-nowrap px-2 font-bold">
                .statushive.devitaliya.me
              </span>
              
            </div>
            
            {waitingMsg && (
              <span className="text-gray-500 text-sm">{waitingMsg}</span>
            )}
            {!waitingMsg && errors.subdomain && (
              <span className="text-red-500 text-sm">{errors.subdomain}</span>
            )}
            {!waitingMsg && isSubdomainAvailable === true && (
              <span className="text-green-500 text-sm">Subdomain is available</span>
            )}
            <Button
            >
              <Link href={session?.user ? `https://app.statushive.devitaliya.me/statuspage?subdomain=${subdomain}`:`https://app.statushive.devitaliya.me/auth/signin`} className="text-white">
              Claim your subdomain
              </Link></Button>
          </div>
        </div>

        <div className="mx-auto max-w-2xl p-4 border border-gray-200 rounded-lg my-12 shadow-2xl">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I create a status page?
              </AccordionTrigger>
              <AccordionContent>
                You can easily create a status page by signing up and selecting
                a template. From there, customize the page with your brand&aops;s
                identity and configure monitoring for your services.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I have multiple locations for my status page?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can create multiple locations to represent different
                regions, services, or products with separate status updates for
                each.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I use a custom domain?</AccordionTrigger>
              <AccordionContent>
                Absolutely! You can link a custom domain to your status page,
                ensuring it fits seamlessly with your brand.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How can I enhance my status page?
              </AccordionTrigger>
              <AccordionContent>
                You can enhance your status page with premium features such as
                advanced monitoring, custom branding, and additional analytics
                to provide more value to your users.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div
          className="text-[0px] select-none md:text-[150px] lg:text-[250px] text-center bg-black w-full m-0 relative"
          style={{
            WebkitBackgroundClip: "text",
            MozBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to bottom, #000, #fff)",
            border: "2px solid transparent",
            zIndex: 1, 
          }}
        >
          StatusHive
          <div
            className="absolute inset-0 rounded-lg pointer-events-none" 
            style={{
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              zIndex: 0, 
            }}
          />
        </div>
      </main>
    </div>
  );
}
