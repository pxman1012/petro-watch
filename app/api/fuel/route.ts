import { crawlFuel } from "@/lib/crawler";
import { getCache, setCache } from "@/utils/cache";

export async function GET() {
    try {
        const cached = getCache();

        if (cached) {
            return Response.json({
                source: "cache",
                ...cached,
            });
        }

        const fuel = await crawlFuel();
        // console.log({ fuel})

        setCache(fuel);

        return Response.json({
            source: "live",
            ...fuel,
        });
    } catch (err) {
        return Response.json({
            error: "Internal error",
            data: [],
            note: null,
        });
    }
}