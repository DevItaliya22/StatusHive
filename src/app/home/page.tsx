import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import Link from "next/link";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { TextEffect } from "@/components/ui/text-effect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
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
          href="https://github.com/username/sealnotes"
          className="flex items-center gap-2 text-black dark:text-white"
        >
          <TextShimmer duration={2}>Sign in</TextShimmer>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="mx-auto">
        <div className="text-center space-y-8 px-4 py-16">
          <Link
            href="https://github.com/username/sealnotes"
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
                className="flex-1 min-w-6 border-0 border-b-2 border-gray-300 focus:border-b-1 focus:border-gray-500 focus:ring-0 bg-transparent rounded-none"
              />
              <span className="text-black dark:text-white whitespace-nowrap px-2 font-bold">
                .statushive.devitaliya.me
              </span>
            </div>
            <Button>Claim your subdomain</Button>
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
                a template. From there, customize the page with your brand’s
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
          className="text-[0px] md:text-[150px] lg:text-[250px] text-center bg-black w-full m-0 relative" // Added relative positioning
          style={{
            // background: "black",  // Removed redundant background
            WebkitBackgroundClip: "text",
            MozBackgroundClip: "text", // Add for Firefox
            backgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to bottom, #000, #fff)", // Gradient from white to gray
            border: "2px solid transparent", // Ensure border is transparent
            // borderColor: "transparent", // Removed redundant borderColor
            // backgroundOrigin: "border-box", // Removed - not needed with backgroundClip: text
            // backgroundClip: "content-box, border-box", // Simplified to backgroundClip: text
            // boxShadow: "2px 1000px 1px black inset", // Removed boxShadow for now
            zIndex: 1, // Ensure text is above the border
          }}
        >
          StatusHive
          <div
            className="absolute inset-0 rounded-lg pointer-events-none" // Overlay for the border effect
            style={{
              background: "linear-gradient(to top, white, rgba(255,255,255,0))", // Adjust gradient for shine
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              zIndex: 0, // Place border behind the text
            }}
          />
        </div>
      </main>
    </div>
  );
}
