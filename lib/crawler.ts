// import axios from "axios";
// import * as cheerio from "cheerio";
// import { FuelItem } from "@/types/fuel";

// function parseNumber(str: string): number {
//     return Number(str.replace(/\./g, "").replace(/[^\d-]/g, ""));
// }

// export async function crawlFuel() {
//     const { data } = await axios.get<string>(
//         "https://vnexpress.net/chu-de/gia-xang-dau-3026",
//         {
//             headers: { "User-Agent": "Mozilla/5.0" },
//             timeout: 10000,
//         }
//     );

//     console.log('crawlFuel===', { data })

//     const $ = cheerio.load(data);

//     const result: FuelItem[] = [];

//     // 📌 crawl bảng
//     $("div.fck_detail.taxonomy_seo table tbody tr").each((_, el) => {
//         const tds = $(el).find("td");

//         if (tds.length === 3) {
//             const name = $(tds[0]).text().trim();
//             const price = parseNumber($(tds[1]).text());
//             const diff = parseNumber($(tds[2]).text());

//             if (!name.includes("Mặt hàng")) {
//                 result.push({ name, price, diff });
//             }
//         }
//     });

//     // 📌 lấy note (raw text)
//     let note: string | null = null;

//     const rawText = $("div.fck_detail").text();

//     const match = rawText.match(/Giá từ[^\n]+/);

//     if (match) {
//         note = match[0].trim();
//     }

//     console.log('crawl===', { result, note })

//     console.log($("table").length);
//     console.log($("div.fck_detail").length);

//     return {
//         data: result,
//         note,
//     };
// }

// =======================v2=========================

import puppeteer from "puppeteer";
import { FuelItem } from "@/types/fuel";

export async function crawlFuel() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
        "https://vnexpress.net/chu-de/gia-xang-dau-3026",
        { waitUntil: "domcontentloaded" }
    );

    // ✅ QUAN TRỌNG: chờ đúng data render xong
    await page.waitForFunction(() => {
        const rows = document.querySelectorAll(".taxonomy_seo table tr");
        return rows.length >= 4; // header + ít nhất 3 dòng data
    }, { timeout: 7000 });

    const data = await page.evaluate(() => {
        const table = document.querySelector(".taxonomy_seo table");
        if (!table) return { result: [], note: null };

        const rows = table.querySelectorAll("tr");

        // ✅ NOTE chuẩn (cột 2)
        const headerCols = rows[0]?.querySelectorAll("td, th") || [];
        const note = headerCols[1]
            ? (headerCols[1] as HTMLElement).innerText.replace(/\s+/g, " ").trim()
            : null;

        const result: FuelItem[] = [];

        rows.forEach((row, i) => {
            if (i === 0) return;

            const tds = row.querySelectorAll("td");
            if (tds.length < 3) return;

            const name = tds[0].innerText.trim();

            const price = Number(
                tds[1].innerText
                    .replace(/\./g, "")
                    .replace(",", ".")
                    .replace(/\s+/g, "")
            );

            // ✅ FIX dấu âm
            const diff = Number(
                tds[2].innerText
                    .replace(/\./g, "")
                    .replace(",", ".")
                    .replace(/\s+/g, "")
            );

            if (!name || isNaN(price)) return;

            result.push({ name, price, diff });
        });

        return { result, note };
    });

    await browser.close();

    return {
        data: data.result,
        note: data.note,
    };
}