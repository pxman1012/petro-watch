// src/lib/bg.ts
import { headers } from "next/headers";
import { BACKGROUNDS } from "@/constants/ui";

export async function getStableBg() {
    const h = await headers(); // ✅ FIX

    const key =
        h.get("x-forwarded-for") ||
        h.get("user-agent") ||
        "default";

    let hash = 0;

    for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) - hash + key.charCodeAt(i);
        hash |= 0;
    }

    return BACKGROUNDS[Math.abs(hash) % BACKGROUNDS.length];
}