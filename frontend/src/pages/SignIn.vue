<template>
  <div class="flex-grow flex flex-col justify-center items-center text-white">
    <p class="text-lg">Sign In with your Wallet!</p>
    <dashboard-button label="Sign In" @click="signIn"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import DashboardButton from "../components/DashboardButton.vue";
import {isMetaMaskConnected, useWeb3Provider} from "../composables";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name: "Signin",
  components: {DashboardButton},
  setup() {
    const router = useRouter();
    const route = useRoute();

    const signIn = async () => {
      const provider = useWeb3Provider();
      await provider.send('eth_requestAccounts', []);

      if (await isMetaMaskConnected()) {
        await router.push(route.redirectedFrom || '/wallet');
      }
    }

    return {
      signIn
    };
  }
})
</script>