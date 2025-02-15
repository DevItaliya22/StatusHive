"use client";
import { useParams } from "next/navigation";

export default function StatusPage() {
    const {id} = useParams();
    return <>{id}</>
}