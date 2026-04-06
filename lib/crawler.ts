import axios from "axios";
import * as cheerio from "cheerio";
import { FuelItem } from "@/types/fuel";

function parseNumber(str: string): number {
    return Number(str.replace(/\./g, "").replace(/[^\d-]/g, ""));
}

export async function crawlFuel() {
    const { data } = await axios.get<string>(
        "https://vnexpress.net/chu-de/gia-xang-dau-3026",
        {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 10000,
        }
    );

    const $ = cheerio.load(data);

    const result: FuelItem[] = [];

    // 📌 crawl bảng
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

    // 📌 lấy note (raw text)
    let note: string | null = null;

    const rawText = $("div.fck_detail").text();

    const match = rawText.match(/Giá từ[^\n]+/);

    if (match) {
        note = match[0].trim();
    }

    return {
        data: result,
        note,
    };
}