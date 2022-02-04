<template>
  <table class="min-w-full divide-y divide-gray-200 shadow rounded">
    <thead class="bg-gray-50">
    <tr>
      <th v-for="column in columns" :key="column"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ column }}
      </th>
    </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 ">
    <tr v-for="collection in collections" :key="collection.name" @click="goToCollection(collection.name)"
        class="bg-white hover:bg-gray-100 cursor-pointer">
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">{{ collection.name }}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">{{ collection.marketCap }}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">{{ collection.dayVolume }}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">{{ collection.averagePrice }}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">{{ collection.transactions }}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">{{ collection.wallets }}</div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import {Collection} from '../api/covalent';
import {useRouter} from "vue-router";

export default defineComponent({
  name: "CollectionTable",
  props: {
    collections: {
      type: Object as PropType<Collection[]>,
      required: true
    },
  },
  setup() {
    const columns = ref(['Name', 'Market Cap', '24H Volume', 'AVG Price', '# Transactions', '# Wallets']);

    const router = useRouter();

    function goToCollection(name: string) {
      router.push(`/collection/${name}`);
    }

    return {
      columns,
      goToCollection
    };
  }
});
</script>

<style scoped>

</style>