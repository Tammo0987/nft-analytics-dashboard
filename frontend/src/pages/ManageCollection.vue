<template>
  <collection-overview :collection="collection" :address="collection.address"/>
  <nft-collection :address="collection.address"/>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import {useSigner} from "../composables";
import {ethers} from "ethers";
import erc721 from '../assets/ERC721.json';
import {useRoute} from "vue-router";
import CollectionOverview from "../components/collection/CollectionOverview.vue";
import {Collection} from "../api/covalent";
import NftCollection from "../components/NftCollection.vue";

export default defineComponent({
  name: "ManageCollection",
  components: {NftCollection, CollectionOverview},
  setup() {
    const name = ref('');
    const ticker = ref('');

    const address = useRoute().params.address as string;

    const collectionContract = new ethers.Contract(address, erc721, useSigner());

    collectionContract.name()
        .then((response: any) => name.value = response);

    collectionContract.symbol()
        .then((response: any) => ticker.value = response);

    const collection: Ref<Collection> = ref({
      name: name,
      marketCap: 0,
      dayVolume: 0,
      averagePrice: 0,
      transactions: 0,
      wallets: 0,
      address,
      ticker: ticker,
      soldToday: 0
    });

    // TODO move to which NFTs do I own?
    // const nfts = ref();
    //
    // getNFTsByAddress(useChainStore().selectedChain.id, '0xfC43f5F9dd45258b3AFf31Bdbe6561D97e8B71de')
    //     .then(items => nfts.value = items)
    //     .catch((error: any) => console.error(error));

    return {
      name,
      ticker,
      collection,
    }
  },
});
</script>
