<template>
  <div class="my-4 bg-gray-700 rounded shadow-lg flex flex-col justify-between text-white p-4">
    <h1 class="text-2xl">Mint NFT</h1>

    <div class="flex flex-col text-black">
      <input v-model="metadata.name" placeholder="Name"
             class="mr-8 h-14 pl-2 rounded outline-none selection:bg-gray-300 my-4 bg-gray-100">
      <input v-model="metadata.description" placeholder="Description"
             class="mr-8 h-14 pl-2 rounded outline-none selection:bg-gray-300 my-4 bg-gray-100">
      <input type="file" accept="image/*" @change="uploadImage"
             class="cursor-pointer bg-gray-100
              border border-gray-300
              text-gray-900
              focus:outline-none focus:border-transparent
              text-sm rounded mr-8">
      <div class="flex justify-end">
        <dashboard-button @click="mint" label="Mint" class="w-64 mr-8"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import DashboardButton from "../components/DashboardButton.vue";
import {File, NFTStorage} from 'nft.storage'
import {ethers} from "ethers";
import erc721 from '../assets/ERC721.json';
import {useSigner} from "../composables";

export default defineComponent({
  name: "Mint",
  components: {DashboardButton},
  setup() {
    const address = useRoute().params.address as string;
    const router = useRouter();

    const metadataTemplate = {
      name: '',
      description: '',
      image: new File([], ''),
    };

    const metadata = ref(metadataTemplate);

    const uploadImage = (event: any) => {
      metadata.value.image = event.target.files[0];
    };

    const mint = async () => {
      const {name, description, image} = metadata.value;

      if (!name) {
        return;
      }

      if (!description) {
        return;
      }

      if (!image) {
        return;
      }

      const client = new NFTStorage({
        token: import.meta.env.VITE_NFT_STORAGE_API_KEY as string,
        endpoint: new URL('https://api.nft.storage/upload')
      });

      const storedMetadata = await client.store(metadata.value)

      const contract = new ethers.Contract(address, erc721, useSigner());

      contract.mintNFT(address, storedMetadata.url)
          .then(() => {
            router.push(`/manager/collection/${address}`);
          })
          .catch((error: any) => console.error(error));
    };

    return {
      metadata,
      uploadImage,
      mint
    }
  },
});
</script>

<style scoped>
input[type=file]::-webkit-file-upload-button,
input[type=file]::file-selector-button {
  @apply text-white bg-sky-500 hover:bg-sky-600 font-medium text-sm cursor-pointer border-0 py-2.5 pl-4 pr-4;
}
</style>