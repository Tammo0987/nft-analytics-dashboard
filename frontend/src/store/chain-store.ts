import {defineStore} from "pinia";

export interface Chain {
    name: string,
    id: number,
    scanBaseUrl: string
}

export const chains: Chain[] = [
    {
        name: "Polygon",
        id: 137,
        scanBaseUrl: 'https://polygonscan.com'
    },
    {
        name: "Ethereum",
        id: 1,
        scanBaseUrl: 'https://etherscan.io'
    }
];

export const testNetChains: Chain[] = chains.concat([
    {
        name: 'Mumbai',
        id: 80001,
        scanBaseUrl: 'https://mumbai.polygonscan.com'
    },
    {
        name: 'Kovan',
        id: 42,
        scanBaseUrl: 'https://kovan.etherscan.io/'
    }
]);

export const getScanBaseURLByChainId = (chainId: number) => testNetChains.find(value => value.id === chainId)?.scanBaseUrl

const useChainStore = defineStore('chain', {
    state: () => {
        return {
            selectedChain: chains[0],
        }
    }
});

export default useChainStore;