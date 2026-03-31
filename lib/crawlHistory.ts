import axios from "axios";
import * as cheerio from "cheerio";

interface FuelHistory {
    date: string;
    ron95: number;
    diesel: number;
}

export async function crawlHistory(): Promise<FuelHistory[]> {
    const { data } = await axios.get(
        "https://vnexpress.net/chu-de/gia-xang-dau-3026",
        { headers: { "User-Agent": "Mozilla/5.0" } }
    );

    const $ = cheerio.load(data);

    const links: string[] = [];

    // lấy link các bài viết
    $("h3.title-news a").each((_, el) => {
        const link = $(el).attr("href");
        if (link) links.push(link);
    });

    const results: FuelHistory[] = [];

    // crawl từng bài
    for (let i = 0; i < Math.min(links.length, 10); i++) {
        try {
            const { data: article } = await axios.get(links[i]);
            const $$ = cheerio.load(article);

            const date = $$(".date").first().text().slice(0, 10);

            let ron95 = 0;
            let diesel = 0;

            $$("table tr").each((_, row) => {
                const cols = $$(row).find("td");

                if (cols.length === 3) {
                    const name = $$(cols[0]).text();
                    const price = parseNumber($$(cols[1]).text());

                    if (name.includes("RON 95")) ron95 = price;
                    if (name.includes("diesel")) diesel = price;
                }
            });

            if (ron95 && diesel) {
                results.push({ date, ron95, diesel });
            }
        } catch (err) {
            console.log("skip", links[i]);
        }
    }

    return results.reverse(); // đúng timeline
}

function parseNumber(str: string) {
    return Number(str.replace(/\./g, "").replace(/[^\d]/g, ""));
}