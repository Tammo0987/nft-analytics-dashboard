import {defineStore} from "pinia";

export interface Chain {
    name: string,
    id: number
}

export const chains: Chain[] = [
    {
        name: "Polygon",
        id: 137
    },
    {
        name: "Ethereum",
        id: 1
    },
];

const useChainStore = defineStore('chain', {
    state: () => {
        return {
            selectedChain: chains[0],
        }
    }
});

export default useChainStore;