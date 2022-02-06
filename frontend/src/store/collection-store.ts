import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";

export type CollectionAddress = string;



/*
 * Should be moved to a database to keep track of the created collections by address.
 * This is just a quick implementation without persistent data.
 */
const useCollectionStore = defineStore('collection', {
    state: () => {
        return {
            collections: useLocalStorage('collections', [] as CollectionAddress[]),
        }
    },
    actions: {
        addCollectionAddress(address: CollectionAddress) {
            this.collections.push(address);
        }
    }
});

export default useCollectionStore;