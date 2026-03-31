import { FuelItem, FuelHistory } from "@/interfaces/fuel";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// GET current fuel
export async function getFuel(): Promise<FuelItem[]> {
    const res = await fetch(`${BASE_URL}/api/fuel`, {
        // const res = await fetch("/api/fuel", {                                   // Dùng relative path để tận dụng cache của Next.js và tránh lỗi CORS khi chạy local
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
        // const res = await fetch(`/api/fuel/history`, {                            // Dùng relative path để tận dụng cache của Next.js và tránh lỗi CORS khi chạy local
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        return []; // tránh crash UI
    }

    return res.json();
}