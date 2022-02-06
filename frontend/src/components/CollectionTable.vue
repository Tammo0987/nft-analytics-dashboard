<template>
  <div class="rounded overflow-auto mb-4 shadow-lg">
    <table class="min-w-full divide-y divide-gray-900">
      <thead class="bg-gray-900">
      <tr>
        <th v-for="column in columns" :key="column"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{{ column }}
        </th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-900">
      <tr v-for="collection in filteredCollections" :key="collection.address" @click="goToCollection(collection.address)"
          class="odd:bg-gray-800 hover:bg-gray-600 even:bg-gray-700 cursor-pointer">
        <td class="px-6 py-4">
          <div class="text-sm text-white">{{ collection.name || collection.address }}</div>
        </td>
        <td class="px-6 py-4">
          <div class="text-sm text-white">{{ useUSDFormat(collection.marketCap) }}</div>
        </td>
        <td class="px-6 py-4">
          <div class="text-sm text-white">{{ useUSDFormat(collection.dayVolume) }}</div>
        </td>
        <td class="px-6 py-4">
          <div class="text-sm text-white">{{ useUSDFormat(collection.averagePrice) }}</div>
        </td>
        <td class="px-6 py-4">
          <div class="text-sm text-white">{{ collection.transactions.toLocaleString() }}</div>
        </td>
        <td class="px-6 py-4">
          <div class="text-sm text-white">{{ collection.wallets.toLocaleString() }}</div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from "vue";
import {Collection} from '../api/covalent';
import {useRouter} from "vue-router";
import {useUSDFormat} from "../composables";
import useChainStore from "../store/chain-store";

export default defineComponent({
  name: "CollectionTable",
  props: {
    collections: {
      type: Object as PropType<Collection[]>,
      required: true
    },
    query: {
      type: String
    }
  },
  setup(props) {
    const columns = ref(['Name', 'Market Cap', '24H Volume', 'AVG Price', '# Transactions', '# Wallets']);

    const router = useRouter();

    const chain = useChainStore().selectedChain

    function goToCollection(address: string) {
      router.push(`/collection/${chain.id}/${address}`);
    }

    const filteredCollections = computed(() => props.collections.filter(collection => {
      if (props.query) {
        if (collection.name) {
          return collection.name.search(props.query) !== -1;
        } else {
          return collection.address.search(props.query) !== -1;
        }
      } else {
        return true;
      }
    }));

    return {
      columns,
      goToCollection,
      filteredCollections,
      useUSDFormat
    };
  }
});
</script>

<style scoped>

</style>