"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";

interface Props {
    data: {
        date: string;
        ron95: number;
        diesel: number;
    }[];
}

export default function FuelChart({ data }: Props) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">
                Diễn biến giá xăng, dầu trong nước
            </h2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    {/* GRID */}
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* X */}
                    <XAxis
                        dataKey="date"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={80}
                    />

                    {/* Y */}
                    <YAxis
                        tickFormatter={(v) => `${v / 1000}k`}
                    />

                    {/* TOOLTIP */}
                    <Tooltip
                        formatter={(value) => {
                            if (typeof value === "number") {
                                return value.toLocaleString() + " đ";
                            }
                            return value;
                        }}
                    />

                    {/* LEGEND */}
                    <Legend />

                    {/* LINE RON95 */}
                    <Line
                        type="monotone"
                        dataKey="ron95"
                        name="Xăng RON 95"
                        stroke="#2f855a"
                        strokeWidth={3}
                        dot={false}
                    />

                    {/* LINE DIESEL */}
                    <Line
                        type="monotone"
                        dataKey="diesel"
                        name="Dầu diesel"
                        stroke="#68d391"
                        strokeWidth={3}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}