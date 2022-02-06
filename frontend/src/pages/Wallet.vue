<template>
  <div class="my-4 bg-gray-700 rounded shadow-lg flex flex-row justify-between text-white p-4">
    <div>
      <h1 class="text-2xl">Your Collections</h1>
      <div class="mt-4">Logged in as: {{ address }}</div>
    </div>
    <div>
      <router-link to="/wallet/new-collection">
        <dashboard-button label="Create NFT Collection"/>
      </router-link>
    </div>
  </div>
  <div>
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
        <tr v-for="collection in collections" :key="collection.address" @click=""
            class="odd:bg-gray-800 hover:bg-gray-600 even:bg-gray-700 cursor-pointer">
          <td class="px-6 py-4">
            <div class="text-sm text-white">{{ collection.name }}</div>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-white">{{ collection.ticker }}</div>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm text-white">{{ collection.address }}</div>
          </td>
          <td class="px-6 py-4">
            <router-link :to="`/wallet/collection/${collection.address}`">
              <dashboard-button label="Manage" class="my-1 ml-0"/>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from "vue";
import {useSigner, useWeb3Provider} from "../composables";
import DashboardButton from "../components/DashboardButton.vue";
import useCollectionStore from "../store/collection-store";
import {ethers} from "ethers";
import erc721 from '../assets/ERC721.json';
import {CollectionMetadata} from "../api/covalent";

export default defineComponent({
  name: "Wallet",
  components: {DashboardButton},
  setup: function () {
    const signer = useSigner();
    const address = ref('');

    signer.getAddress()
        .then(response => address.value = response)
        .catch(error => console.error(error));

    const contractAddresses = useCollectionStore().collections;
    const collections: Ref<CollectionMetadata[]> = ref([]);

    const loadContracts = Promise.all(contractAddresses.map(async contractAddress => {
      const contract = new ethers.Contract(contractAddress, erc721, useWeb3Provider());
      try {
        return {
          name: await contract.name(),
          ticker: await contract.symbol(),
          address: contract.address
        }
      } catch (error) {
        return null;
      }
    }));

    loadContracts
        .then(items => items.filter(item => item) as CollectionMetadata[])
        .then(items => collections.value = items)
        .catch((error: any) => console.log(error));

    const columns = ref(['Name', 'Ticker', 'Address', 'Manage'])

    return {
      address,
      collections,
      columns
    }
  }
});
</script>