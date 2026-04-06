import { CacheData } from "@/types/fuel";

let cache: CacheData | null = null;
let lastFetch = 0;

const TTL = 5 * 60 * 1000; // 5 phút

export function getCache(): CacheData | null {
    const now = Date.now();

    if (cache && now - lastFetch < TTL) {
        return cache;
    }

    return null;
}

export function setCache(data: CacheData): void {
    cache = data;
    lastFetch = Date.now();
}
