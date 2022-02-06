<template>
  <div class="my-4 bg-gray-700 rounded shadow-lg flex flex-row text-white">
    <div class="m-4">
      <img v-if="imageSource" :src="imageSource" class="m-2 w-64 h-64"/>
      <div v-else class="w-64 h-64 flex justify-center items-center">
        <spinner  />
      </div>
    </div>
    <div class="flex flex-col justify-between m-6">
      <div class="mt-2">
        <h1 class="text-4xl text-bold">{{ collection.name }}</h1>
      </div>
      <div>
        <h2 class="text-bold text-3xl">Collection Address</h2>
        <div @click="goToScanSite" class="flex flex-row cursor-pointer">
          <div class="text-xl text-gray-200">{{ collection.address }}</div>
          <div class="ml-2 mt-0.5">
            <i class="fas fa-external-link-alt"/>
          </div>
        </div>
      </div>
      <div class="flex flex-row mb-2 text-lg">
        <div class="mr-8">
          <div class="text-xl">
            Ticker Symbol
          </div>
          <div class="text-gray-200">
            {{ collection.ticker }}
          </div>
        </div>
        <div class="flex flex-col mr-8">
          <div class="text-xl">
            24hr Volume
          </div>
          <div class="text-gray-200">
            {{ useUSDFormat(collection.dayVolume) }}
          </div>
        </div>
        <div>
          <div class="text-xl">
            24hr Sold Count
          </div>
          <div class="text-gray-200">
            {{ collection.soldToday }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, Ref, ref} from "vue";
import {Collection, getCollectionPreviewImageURL, ImageURL} from "../../api/covalent";
import {useUSDFormat} from "../../composables";
import {useRoute} from "vue-router";
import Spinner from "../Spinner.vue";

export default defineComponent({
  name: "CollectionOverview",
  components: {Spinner},
  props: {
    collection: {
      type: Object as PropType<Collection>,
      required: true
    },
  },
  setup() {
    const route = useRoute();
    const chainId = Number(route.params.chainId);
    const address = route.params.address as string;

    const imageSource: Ref<ImageURL> = ref('')

    if (chainId && address) {
      getCollectionPreviewImageURL(chainId, address)
          .then(imageURL => imageSource.value = imageURL);
    }

    const goToScanSite = () => {
      const baseUrl = chainId == 1 ? 'https://etherscan.io' : 'https://polygonscan.com';

      window.open(`${baseUrl}/address/${address}`, "_blank");
    };

    return {
      imageSource,
      goToScanSite,
      useUSDFormat
    }
  },
});
</script>

<style scoped>

</style>