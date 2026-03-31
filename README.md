```
Next.js App (FE + API routes)
        ↓
API Route (/api/fuel)
        ↓
Crawler (axios + cheerio)
        ↓
Cache (Vercel Edge / memory / ISR)
        ↓
Client (React UI)
```

Backend crawl (API)
```axios``` → fetch HTML
```cheerio``` → parse DOM (crawl)

Chart (UI)
```recharts``` → vẽ biểu đồ giá xăng