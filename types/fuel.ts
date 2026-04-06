export interface FuelItem {
    name: string;
    price: number;
    diff: number;
}

export interface FuelResponse {
    source: "cache" | "live";
    data: FuelItem[];
    note: string | null; // 👈 thêm
}

export type CacheData = {
    data: FuelItem[];
    note: string | null;
};