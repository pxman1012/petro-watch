import FuelTable from "@/components/FuelTable";
// import { BACKGROUNDS } from "@/constants/ui";
import { getStableBg } from "@/lib/bg";
import { getFuel, getFuelHistory } from "@/services/fuel.service";

export const dynamic = "force-dynamic";

export default async function Page() {
    // const bg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    const bg = await getStableBg(); // ✅ nhớ await

    const [fuel, history] = await Promise.all([
        getFuel(),
        getFuelHistory(),
    ]);

    return (
        <main
            className="min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <div className="min-h-screen bg-black/40 backdrop-blur-sm px-4 py-10">
                <div className="max-w-6xl mx-auto bg-white/90 rounded-2xl shadow-xl p-6 md:p-10">

                    <h1 className="text-3xl font-bold text-center mb-8">
                        Giá bán lẻ xăng dầu hôm nay
                    </h1>

                    {/* TABLE */}
                    <FuelTable data={fuel} />

                    {/* CHART */}
                    {/* <FuelChart data={history} /> */}

                </div>
            </div>
        </main>
    );
}