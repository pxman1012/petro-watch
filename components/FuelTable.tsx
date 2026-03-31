import { FuelItem } from "@/interfaces/fuel";

interface Props {
    data: FuelItem[];
}

export default function FuelTable({ data }: Props) {
    if (!data.length) {
        return (
            <div className="text-center py-10 text-gray-500">
                Không có dữ liệu
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Mặt hàng</th>
                        <th className="p-3 text-right">Giá (đồng/lít)</th>
                        <th className="p-3 text-right">So với kỳ trước</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.name}
                            className="border-t hover:bg-gray-50 transition"
                        >
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
    );
}