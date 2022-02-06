<template>
  <div class="bg-gray-800 rounded shadow-lg text-white flex flex-col w-72 mx-10 my-4">
    <div class="m-4">
      <img :src="nft.imageUrl" class="w-64 h-64">
    </div>
    <div class="mx-4 break-words">
      <div class="text-2xl"> {{ nft.name }}</div>
      <p class="my-4">
        Owner: {{ nft.owner }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {NFTMetadata} from "../api/covalent";

export default defineComponent({
  name: "NftItem",
  props: {
    nft: {
      type: Object as PropType<NFTMetadata>,
      required: true,
    }
  },
});
</script>