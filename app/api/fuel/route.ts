import { crawlFuel } from "@/lib/crawler";
import { getCache, setCache } from "@/utils/cache";
import { FuelResponse } from "@/types/fuel";

export async function GET() {
    try {
        const cached = getCache();

        if (cached) {
            const res: FuelResponse = {
                source: "cache",
                data: cached,
            };

            return new Response(JSON.stringify(res), {
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
                },
            });
        }

        const data = await crawlFuel();

        setCache(data);

        const res: FuelResponse = {
            source: "live",
            data,
        };

        return new Response(JSON.stringify(res), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: (err as Error).message }),
            { status: 500 }
        );
    }
}