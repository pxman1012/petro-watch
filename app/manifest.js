export default function manifest() {
    return {
        name: "Pxman Petro Lite",
        short_name: "Pxman Petro",
        description:
            "Cập nhật giá xăng dầu Việt Nam tại Pxman Petro",
        icons: [
            {
                // src: "https://salt.tikicdn.com/ts/upload/2f/51/80/5643672027a54bfa593300f53c91c12a.png",
                src: "/img/petro-icon.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any maskable",
            },
            {
                // src: "https://salt.tikicdn.com/ts/upload/2f/51/80/5643672027a54bfa593300f53c91c12a.png",
                src: "/img/petro-icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
        theme_color: "#c1c1c1",
        background_color: "#c1c1c1",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        related_applications: [
            {
                platform: "play",
                // url: "https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid",
                url: "/img/petro-icon.png",
                id: "vn.tiki.app.tikiandroid",
            },
            {
                platform: "itunes",
                // url: "https://apps.apple.com/vn/app/tiki-shopping-fast-shipping/id958100553",
                url: "/img/petro-icon.png",
            },
            {
                platform: "webapp",
                url: "https://pxman-petro-watch.vercel.app/manifest.json",
            },
        ],
        scope: "/",
    };
}
