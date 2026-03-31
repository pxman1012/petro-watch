import { FuelItem, FuelHistory } from "@/interfaces/fuel";

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// GET current fuel
export async function getFuel(): Promise<FuelItem[]> {
    const res = await fetch(`${BASE_URL}/api/fuel`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch fuel data");
    }

    const json = await res.json();
    return json.data;
}

// GET history
export async function getFuelHistory(): Promise<FuelHistory[]> {
    const res = await fetch(`${BASE_URL}/api/fuel/history`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        return []; // tránh crash UI
    }

    return res.json();
}