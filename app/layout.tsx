import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdSense from "@/components/AdSense";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    robots: {
        index: true,
        follow: true,
    },
    title: {
        template: '%s | Pxman Petro Watch',
        default: 'Pxman Petro Watch',
    },
    description:
        "Theo dõi giá xăng dầu Việt Nam mới nhất, cập nhật nhanh chóng và chính xác.",
    keywords: [
        'pxman',
        'petro',
        'pxman petro',
        'petro watch',
        'pxman petro watch',
        'Pxman Petro Watch',
        "giá xăng",
        "giá dầu",
        "xăng dầu Việt Nam",
        "giá xăng hôm nay",
        "RON95",
        "diesel",
    ],
    authors: [{ name: "Pxman" }],
    creator: "Pxman",
    metadataBase: new URL("https://pxman-petro-watch.vercel.app"),

    openGraph: {
        title: "Pxman Petro",
        description:
            "Theo dõi giá xăng dầu Việt Nam nhanh chóng và trực quan.",
        url: "https://pxman-petro-watch.vercel.app",
        siteName: "Pxman Petro Watch",
        locale: "vi_VN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pxman Petro Watch",
        description: "Theo dõi giá xăng dầu Việt Nam mới nhất",
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <head>
                <AdSense pId={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID || ''} />
            </head>

            <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
        </html>
    );
}
