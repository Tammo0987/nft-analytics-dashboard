<template>
  <div class="flex justify-between">
    <h1 class="text-white font-bold text-2xl my-8">NFT Collections</h1>
    <dropdown v-model="chain" :options="chains" class="my-8" @change="loadCollections"/>
  </div>
  <collection-table :collections="collections"/>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import CollectionTable from "../components/CollectionTable.vue";
import Dropdown from "../components/Dropdown.vue";
import {Collection, getCollections} from "../api/covalent";

export default defineComponent({
  name: "Dashboard",
  components: {CollectionTable, Dropdown},
  setup() {
    const chains = [
      {label: "Ethereum", value: 1},
      {label: "Polygon", value: 137},
      {label: "Avalanche", value: 43114}
    ];

    const chain = ref(chains[0]);

    const collections: Ref<Collection[]> = ref([]);

    function loadCollections() {
      collections.value = [];

      try {
        const response = getCollections(chain.value.value);
        response.then((result) => collections.value = result);
      } catch (e: unknown) {
        console.error(e);
      }
    }

    loadCollections()

    return {
      collections, chains, chain, loadCollections
    }
  }
});
</script>
