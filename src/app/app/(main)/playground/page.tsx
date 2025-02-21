"use client";
import { useState } from "react";

export default function EdgeApiButtons() {

    const [url, setUrl] = useState("");
    const locations = [
        "arn1", "bom1", "cdg1", "cle1", "cpt1", "dub1", "fra1", "gru1", "hkg1",
        "hnd1", "iad1", "icn1", "kix1", "lhr1", "pdx1", "sfo1", "sin1", "syd1"
    ] as const;

    type Location = typeof locations[number];

    const sendRequest = async (location:Location) => {
        if (!url) return alert("Please enter a URL");
        try {
            const response = await fetch(`/api/edge/${location}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            console.log(`Response from ${location}:`, data);
        } catch (error) {
            console.error(`Error sending request to ${location}:`, error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="p-2 border rounded w-80"
            />
            <div className="grid grid-cols-3 gap-2">
                {locations.map((location) => (
                    <button
                        key={location}
                        onClick={() => sendRequest(location)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        {location.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}