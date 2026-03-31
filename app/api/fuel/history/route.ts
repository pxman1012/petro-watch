import { crawlHistory } from "@/lib/crawlHistory";

export async function GET() {
    try {
        const data = await crawlHistory();

        return Response.json(data, {
            headers: {
                "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (err) {
        return Response.json({ error: "fail" }, { status: 500 });
    }
}