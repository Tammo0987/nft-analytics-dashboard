<template>
  <div v-if="Object.keys(collection).length">
    <collection-overview :collection="collection"/>
    <floor-price-chart/>
    <collection-preview/>
  </div>

  <div v-else class="flex justify-center items-center absolute top-0 left-0 w-screen h-screen">
    <spinner/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRoute} from "vue-router";

import CollectionOverview from "../components/collection/CollectionOverview.vue";
import FloorPriceChart from "../components/collection/FloorPriceChart.vue";
import CollectionPreview from "../components/collection/CollectionPreview.vue";
import {getCollection} from "../api/covalent";
import Spinner from "../components/Spinner.vue";

export default defineComponent({
  name: "Collection",
  components: {Spinner, CollectionPreview, FloorPriceChart, CollectionOverview},
  setup() {
    const route = useRoute();

    const chain = route.params.chainId;
    const address = route.params.address;

    const collection = ref({});

    getCollection(Number(chain), address as string)
        .then(item => collection.value = item)
        .catch(error => console.error(error));

    return {
      chain,
      address,
      collection
    };
  },
});
</script>

<style scoped>

</style>