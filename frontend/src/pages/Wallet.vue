<template>
  <div class="my-4 bg-gray-700 rounded shadow-lg text-white p-4">
    <h1 class="text-2xl">Your NFTs</h1>
    <div class="mt-4">Logged in as: {{ address }}</div>
  </div>

  <div class="my-4 bg-gray-700 rounded shadow-lg text-white">
    <h1 class="text-2xl m-4">NFTs</h1>
    <div class="grid grid-cols-4">
      <div v-for="nft in nfts" :key="nft.tokenId">
        <a v-if="nft.externalUrl" class="cursor-pointer" :href="nft.externalUrl" target="_blank">
          <NftItem :nft="nft"/>
        </a>
        <NftItem v-else :nft="nft"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import {useLoggedInNetworkChainId, useSigner} from "../composables";
import NftItem from "../components/NftItem.vue";
import {getNFTsByAddress, NFTMetadata} from "../api/covalent";

export default defineComponent({
  name: "Wallet",
  components: {NftItem},
  setup() {
    const address = ref('');

    useSigner().getAddress()
        .then(result => address.value = result)
        .catch(error => console.error(error));

    const nfts: Ref<NFTMetadata[]> = ref([]);

    useLoggedInNetworkChainId()
        .then(async chainID => {
          // TODO set real chain
          nfts.value = await getNFTsByAddress(1, await useSigner().getAddress());
        })
        .catch(error => console.error(error));

    return {
      address,
      nfts
    }
  },
});
</script>