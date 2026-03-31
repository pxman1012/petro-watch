import { FuelItem } from "@/types/fuel";

interface Props {
    item: FuelItem;
}

export default function FuelCard({ item }: Props) {
    const isUp = item.diff > 0;

    return (
        <div className="p-4 rounded-2xl shadow bg-white flex justify-between items-center">
            <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">VND/L</p>
            </div>

            <div className="text-right">
                <p className="text-lg font-bold">
                    {item.price.toLocaleString()}
                </p>

                <p className={`text-sm ${isUp ? "text-red-500" : "text-green-600"}`}>
                    {isUp ? "▲" : "▼"} {Math.abs(item.diff).toLocaleString()}
                </p>
            </div>
        </div>
    );
}