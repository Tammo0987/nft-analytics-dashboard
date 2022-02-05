<template>
  <button class="p-4 bg-white w-20 mt-40" @click="deployContract">Test</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ethers} from "ethers";
import {createNFTCollectionContract, NFTCollectionMetadata} from "../api/nft-collection";

export default defineComponent({
  name: "Mint",
  setup() {
    const deployContract = async () => {
      const metadata: NFTCollectionMetadata = {
        name: 'Test',
        contractName: 'BoredApes',
        ticker: "BAP"
      }

      const collectionContract = await createNFTCollectionContract(metadata)

      const ethereum = (window as any).ethereum
      const provider = new ethers.providers.Web3Provider(ethereum, 'any');

      await provider.send('eth_requestAccounts', []);

      const signer = await provider.getSigner();

      const factory = new ethers.ContractFactory(collectionContract.abi, collectionContract.bytecode, signer);
      const contract = await factory.deploy();
      console.log(await contract.owner());
    }

    return {
      deployContract
    }
  }
})
</script>