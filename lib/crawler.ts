import axios from "axios";
import * as cheerio from "cheerio";
import { FuelItem } from "@/types/fuel";

export async function crawlFuel(): Promise<FuelItem[]> {
    const { data } = await axios.get<string>(
        "https://vnexpress.net/chu-de/gia-xang-dau-3026",
        {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 10000,
        }
    );

    const $ = cheerio.load(data);
    const result: FuelItem[] = [];

    $("div.fck_detail.taxonomy_seo table tbody tr").each((_, el) => {
        const tds = $(el).find("td");

        if (tds.length === 3) {
            const name = $(tds[0]).text().trim();
            const price = parseNumber($(tds[1]).text());
            const diff = parseNumber($(tds[2]).text());

            if (!name.includes("Mặt hàng")) {
                result.push({ name, price, diff });
            }
        }
    });

    return result;
}

function parseNumber(str: string): number {
    return Number(str.replace(/\./g, "").replace(/[^\d-]/g, ""));
}