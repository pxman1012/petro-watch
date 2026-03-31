import { BACKGROUNDS } from "@/constants/ui";
import { getFuel, getFuelHistory } from "@/services/fuel.service";

export const dynamic = "force-dynamic";

export default async function Page() {
    const bg =
        BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

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
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left">Mặt hàng</th>
                                    <th className="p-3 text-right">Giá (đồng/lít)</th>
                                    <th className="p-3 text-right">So với kỳ trước</th>
                                </tr>
                            </thead>

                            <tbody>
                                {fuel.map((item) => (
                                    <tr key={item.name} className="border-t">
                                        <td className="p-3">{item.name}</td>

                                        <td className="p-3 text-right font-medium">
                                            {item.price.toLocaleString()}
                                        </td>

                                        <td
                                            className={`p-3 text-right font-medium ${item.diff > 0
                                                    ? "text-red-500"
                                                    : "text-green-600"
                                                }`}
                                        >
                                            {item.diff > 0 ? "+" : ""}
                                            {item.diff.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* CHART */}
                    {/* <FuelChart data={history} /> */}

                </div>
            </div>
        </main>
    );
}