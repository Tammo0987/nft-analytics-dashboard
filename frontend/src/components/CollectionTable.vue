<template>
  <div class="rounded overflow-auto mb-4 shadow-lg">
    <table class="min-w-full divide-y divide-gray-900">
      <thead class="bg-gray-900">
      <tr>
        <th v-for="column in columns" :key="column"
            @click="sortTable(column.key)"
            class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer">
          <div class="flex flex-row items-center">
            <div class="mr-2">{{ column.label }}</div>
            <img v-if="sort.key === column.key && sort.direction === 'ascending'"
                 src="../assets/icons/arrow-down.svg"
                 class="h-3 w-3"/>
            <img v-if="sort.key === column.key && sort.direction === 'descending'"
                 src="../assets/icons/arrow-up.svg"
                 class="h-3 w-3"/>
          </div>
        </th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-900">
      <tr v-for="collection in collectionToView" :key="collection.address"
          @click="goToCollection(collection.address)"
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
import {computed, defineComponent, PropType, Ref, ref} from "vue";
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
  setup (props) {
    const columns = ref([
      {
        key: 'name',
        label: 'Name'
      },
      {
        key: 'marketCap',
        label: 'Market Cap'
      },
      {
        key: 'dayVolume',
        label: '24H Volume'
      },
      {
        key: 'averagePrice',
        label: 'AVG Price'
      },
      {
        key: 'transactions',
        label: '# Transactions'
      },
      {
        key: 'wallets',
        label: '# Wallets'
      }
    ]);

    const sort = ref({key: '', direction: ''});

    const sortTable = (key: string) => {
      let direction = 'ascending';
      if (sort.value.key === key && sort.value.direction === 'ascending') {
        direction = 'descending';
      }

      sort.value = {key, direction}

      filterAndSort();
    };

    const router = useRouter();
    const chain = useChainStore().selectedChain

    function goToCollection(address: string) {
      router.push(`/collection/${chain.id}/${address}`);
    }

    const collectionToView: Ref<Collection[]> = ref([]);

    const filterAndSort = () => {
      const collection = props.collections.filter(collection => {
        if (props.query) {
          if (collection.name) {
            return collection.name.search(props.query) !== -1;
          } else {
            return collection.address.search(props.query) !== -1;
          }
        } else {
          return true;
        }
      })

      const {key, direction} = sort.value;

      collectionToView.value = collection.sort((a, b) => {
        if ((a as any)[key] < (b as any)[key]) {
          return direction === 'ascending' ? -1 : 1
        }

        if ((a as any)[key] > (b as any)[key]) {
          return direction === 'ascending' ? 1 : -1
        }

        return 0;
      });
    };

    const getIconClass = computed(() => {
      return 'fa ' + (sort.value.direction === 'ascending' ? 'fa-arrow-up' : 'fa-arrow-down');
    });

    filterAndSort();

    return {
      columns,
      goToCollection,
      collectionToView,
      useUSDFormat,
      sort,
      sortTable,
      getIconClass
    };
  }
});
</script>

<style scoped>

</style>