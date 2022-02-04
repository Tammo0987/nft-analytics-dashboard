<template>
  <div class="flex justify-between items-center">
    <h1 class="text-white font-bold text-2xl my-8">NFT Collections</h1>
    <div class="flex flex-row items-center">
      <input v-model.lazy="query" name="Search" placeholder="Search" class="mr-8 h-14 pl-2 rounded outline-none selection:bg-gray-300"/>
      <dropdown v-model="chain" :options="chains" class="my-8" @change="loadCollections"/>
    </div>
  </div>

  <collection-table v-if="collections.length" :collections="collections" :chain="chain" :query="query"/>
  <div v-else class="flex justify-center items-center absolute top-0 left-0 w-screen h-screen">
    <spinner class=""/>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import CollectionTable from "../components/CollectionTable.vue";
import Dropdown from "../components/Dropdown.vue";
import {Collection, getCollections} from "../api/covalent";
import Spinner from "../components/Spinner.vue";

export default defineComponent({
  name: "Dashboard",
  components: {Spinner, CollectionTable, Dropdown},
  setup() {
    const chains = [
      {label: "Ethereum", value: 1},
      {label: "Polygon", value: 137},
      {label: "Avalanche", value: 43114}
    ];

    const query = ref('');

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
      collections, chains, chain, query, loadCollections
    }
  }
});
</script>
