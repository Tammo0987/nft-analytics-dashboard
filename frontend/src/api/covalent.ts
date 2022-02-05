import axios from "axios";

export interface Collection {
    name: string,
    marketCap: number,
    dayVolume: number,
    averagePrice: number,
    transactions: number,
    wallets: number,
    address: string,
    ticker: string,
    soldToday: number,
}

export interface CollectionPrice {
    date: number,
    floorPriceUSD: number,
    floorPriceWei: number,
}

export type TokenId = string

export type ImageURL = string

function mapItemToCollection(item: any): Collection {
    return {
        name: item.collection_name,
        marketCap: item.market_cap_quote,
        dayVolume: item.volume_quote_24h || item.volume_quote_day,
        averagePrice: item.avg_volume_quote_24h,
        transactions: item.transaction_count_alltime,
        wallets: item.unique_wallet_purchase_count_alltime,
        address: item.collection_address,
        ticker: item.collection_ticker_symbol,
        soldToday: item.unique_token_ids_sold_count_day
    }
}

function mapItemToCollectionPrice(item: any): CollectionPrice {
    return {
        date: item.opening_date,
        floorPriceUSD: item.floor_price_quote_7d,
        floorPriceWei: item.floor_price_wei_7d
    }
}

function padTo2Digits(number: number) {
    return number.toString().padStart(2, '0');
}

function getPastDay(distance: number): string {
    const yesterday = new Date(Date.now() - 86400000 * distance);
    return [
        yesterday.getFullYear(),
        padTo2Digits(yesterday.getMonth() + 1),
        padTo2Digits(yesterday.getDate())
    ].join('-')
}

const client = axios.create({
    baseURL: 'https://api.covalenthq.com/v1/',
    timeout: 60000,
    params: {
        key: import.meta.env.VITE_COVALENT_API_KEY
    }
});

export async function getCollections(chain: number): Promise<Collection[]> {
    const response = await client.get(`/${chain}/nft_market/`)
    return response.data.data.items.map(mapItemToCollection);
}

export async function getCollection(chain: number, address: string): Promise<Collection> {
    const yesterday = getPastDay(2);
    const requestConfig = {
        params: {
            from: yesterday,
        }
    };

    const response = await client.get(`/${chain}/nft_market/collection/${address}/`, requestConfig);

    return mapItemToCollection(response.data.data.items[0]);
}

export async function getTokenIdByCollectionAddress(chain: number, address: string): Promise<TokenId[]> {
    return client.get(`/${chain}/tokens/${address}/nft_token_ids/`)
        .then(response => response.data.data.items.map((item: any) => item.token_id));
}

export async function getImageURLByTokenId(chain: number, address: string, token: TokenId): Promise<ImageURL> {
    const response = await client.get(`/${chain}/tokens/${address}/nft_metadata/${token}/`)
    return response.data.data.items[0].nft_data[0].external_data.image;
}

export async function getCollectionPreviewImageURL(chain: number, address: string): Promise<ImageURL> {
    const requestConfig = {
        params: {
            'page-size': 1
        }
    };

    const response = await client.get(`/${chain}/tokens/${address}/nft_token_ids/`, requestConfig);
    const tokenId = response.data.data.items.map((item: any) => item.token_id)[0];
    return await getImageURLByTokenId(chain, address, tokenId);
}

export async function getCollectionHistoryData(chain: number, address: string): Promise<CollectionPrice[]> {
    const today = getPastDay(0);
    const weekAgo = getPastDay(30);
    const requestConfig = {
        params: {
            from: weekAgo,
            to: today
        }
    }

    const response = await client.get(`/${chain}/nft_market/collection/${address}/`, requestConfig);

    return response.data.data.items.map(mapItemToCollectionPrice);
}