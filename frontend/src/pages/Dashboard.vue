<template>
  <div class="flex justify-between items-center">
    <h1 class="text-white font-bold text-2xl my-8">NFT Collections</h1>
    <div class="flex flex-row items-center">
      <input v-model.lazy="query" name="Search" placeholder="Search"
             class="mr-8 h-14 pl-2 rounded outline-none selection:bg-gray-300"/>
      <dropdown :model-value="chain" @change="selectChain" :options="chains" class="my-8"/>
    </div>
  </div>
  <collection-table v-if="collections.length" :collections="collections" :query="query"/>
  <div v-else class="flex justify-center items-center absolute top-0 left-0 w-screen h-screen">
    <spinner/>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import CollectionTable from "../components/CollectionTable.vue";
import Dropdown from "../components/Dropdown.vue";
import {Collection, getCollections} from "../api/covalent";
import Spinner from "../components/Spinner.vue";
import useChainStore, {Chain, chains} from "../store/chain-store";

export default defineComponent({
  name: "Dashboard",
  components: {Spinner, CollectionTable, Dropdown},
  setup() {
    const chainStore = useChainStore();
    const selectedChain = ref(chainStore.selectedChain);

    const selectChain = (chain: Chain) => {
      chainStore.selectedChain = chain;
      selectedChain.value = chain;
      loadCollections();
    };

    const query = ref('');
    const collections: Ref<Collection[]> = ref([]);

    function loadCollections() {
      collections.value = [];

      getCollections(selectedChain.value.id)
          .then(result => collections.value = result)
          .catch(error => console.error(error));
    }

    loadCollections();

    return {
      collections, chains, chain: selectedChain, selectChain, query
    }
  }
});
</script>
