<template>
  <div class="my-4 bg-gray-700 rounded shadow-lg text-white">
    <div class="flex flex-row items-center justify-between">
      <h1 class="text-3xl m-4">NFTs</h1>
      <router-link :to="`/manager/collection/${address}/mint`">
        <dashboard-button label="Mint NFT"/>
      </router-link>
    </div>
    <div class="grid grid-cols-4">
      <div v-for="nft in nfts" :key="nft.tokenId">
        <NftItem :nft="nft"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import DashboardButton from "./DashboardButton.vue";
import {getNFTMetadataByCollectionAddress, NFTMetadata} from "../api/covalent";
import {useLoggedInNetworkChainId} from "../composables";
import NftItem from "./NftItem.vue";

export default defineComponent({
  name: "NftCollection",
  components: {NftItem, DashboardButton},
  props: {
    address: {
      type: String,
      required: true,
    }
  },
  setup({address}) {
    const nfts: Ref<NFTMetadata[]> = ref([]);

    useLoggedInNetworkChainId()
        .then(async chainID => {
          nfts.value = await getNFTMetadataByCollectionAddress(chainID, address)
        })
        .catch(error => console.error(error));

    return {
      nfts
    };
  },
});
</script>
