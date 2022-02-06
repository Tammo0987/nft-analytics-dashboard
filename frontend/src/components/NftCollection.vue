<template>
  <div class="my-4 bg-gray-700 rounded shadow-lg text-white">
    <div class="flex flex-row items-center justify-between">
      <h1 class="text-2xl m-4">NFTs</h1>
      <router-link :to="`/wallet/collection/${address}/mint`">
        <dashboard-button label="Mint NFT"/>
      </router-link>
    </div>
    <div>
      TODO
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useSigner, zeroAddress} from "../composables";
import {ethers} from "ethers";
import erc721 from '../assets/ERC721.json';
import DashboardButton from "./DashboardButton.vue";

export default defineComponent({
  name: "NftCollection",
  components: {DashboardButton},
  props: {
    address: {
      type: String,
      required: true,
    }
  },
  setup({address}) {
    const tokenContract = new ethers.Contract(address, erc721, useSigner());

    tokenContract.queryFilter(tokenContract.filters.Transfer(zeroAddress, null))
        .then((events: any) => events.map((event: any) => parseInt(event.args[2]._hex)))
        .then(async tokenIds => await Promise.all(tokenIds.map(async (tokenId: any) => await tokenContract.tokenURI(tokenId))))
        .catch((error: any) => console.error(error));

    // TODO use covalent api to get nft metadata

    return {};
  },
});
</script>
