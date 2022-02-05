import axios from "axios";

export interface NFTCollectionMetadata {
    name: string,
    contractName: string,
    ticker: string,
}

export interface NFTCollectionContract {
    abi: string,
    bytecode: string
}

const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL as string,
    timeout: 10000,
});

export async function createNFTCollectionContract(metadata: NFTCollectionMetadata): Promise<NFTCollectionContract> {
    const requestConfig = {
        params: {
            metadata
        }
    };

    const response = await client.get('/generate', requestConfig);
    return response.data;
}