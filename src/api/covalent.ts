import axios from "axios";

export interface Collection {
    name: string,
    marketCap: number,
    dayVolume: number,
    averagePrice: number,
    transactions: number,
    wallets: number
}

const client = axios.create({
    baseURL: 'https://api.covalenthq.com/v1/',
    timeout: 10000,
    params: {
        key: import.meta.env.VITE_COVALENT_API_KEY
    }
});

export async function getCollections(chain: number): Promise<Collection[]> {
    try {
        const response = await client.get(`/${chain}/nft_market/`);
        return Promise.resolve(response.data.data.items.map((collection: any) => {
            return {
                name: collection.collection_name,
                marketCap: collection.market_cap_quote,
                dayVolume: collection.volume_quote_24h,
                averagePrice: collection.avg_volume_quote_24h,
                transactions: collection.transaction_count_alltime,
                wallets: collection.unique_wallet_purchase_count_alltime
            };
        }));
    } catch (e: unknown) {
        return Promise.reject(e);
    }
}

