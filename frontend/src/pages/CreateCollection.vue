<template>
  <div class="my-4 bg-gray-700 rounded shadow-lg flex flex-col justify-between text-white p-4">
    <h1 class="text-2xl">Create Collection</h1>

    <div class="flex flex-col text-black">
      <input v-model="metadata.name" placeholder="Name"
             class="mr-8 h-14 pl-2 rounded outline-none selection:bg-gray-300 my-4 bg-gray-100">
      <input v-model="metadata.contractName" placeholder="Contract Name"
             class="mr-8 h-14 pl-2 rounded outline-none selection:bg-gray-300 my-4 bg-gray-100">
      <input v-model="metadata.ticker" placeholder="Ticker"
             class="mr-8 h-14 pl-2 rounded outline-none selection:bg-gray-300 my-4 bg-gray-100">
      <div class="flex justify-end">
        <dashboard-button @click="createContract" :label="createButtonLabel" class="w-64 mr-8"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import DashboardButton from "../components/DashboardButton.vue";
import {useSigner, useWeb3Provider} from "../composables";
import {createNFTCollectionContract} from "../api/nft-collection";
import {ethers} from "ethers";
import {chains} from "../store/chain-store";
import useCollectionStore from "../store/collection-store";

export default defineComponent({
  name: "CreateCollection",
  components: {DashboardButton},
  setup() {
    const metadataTemplate = {
      name: '',
      contractName: '',
      ticker: ''
    };
    const metadata = ref(metadataTemplate);

    const createContract = async () => {
      if (metadata.value.name && metadata.value.contractName && metadata.value.ticker) {
        try {
          const contract = await createNFTCollectionContract(metadata.value)
          const signer = useSigner();
          const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, signer);
          const response = await factory.deploy();
          const contractAddress = response.address;
          useCollectionStore().addCollectionAddress(contractAddress);
          metadata.value = metadataTemplate;
        } catch (error: any) {
          console.error(error);
        }
      } else {
        alert('Form is not correct!');
      }
    };

    const networkName = ref('');
    const createButtonLabel = computed(() => {
      if (networkName.value) {
        return `Create on ${networkName.value}`;
      } else {
        return 'Create';
      }
    });

    useWeb3Provider()
        .getNetwork()
        .then(response => {
          networkName.value = chains.find(value => value.id === response.chainId)?.name || '';
        });

    return {
      metadata,
      createContract,
      createButtonLabel
    }
  }
});
</script>