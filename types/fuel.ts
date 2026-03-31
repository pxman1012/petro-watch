export interface FuelItem {
    name: string;
    price: number;
    diff: number;
}

export interface FuelResponse {
    source: "cache" | "live";
    data: FuelItem[];
}