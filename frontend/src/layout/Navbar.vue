<template>
  <header class="bg-gray-900 text-white flex items-center drop-shadow-md">
    <div class="flex items-center">
      <img src="../assets/logo.svg" alt="Logo" class="h-12 w-12 mx-5"/>
      <router-link v-for="item in navItems" :key="item" :to="item.link" class="px-4 py-8 text-xl hover:bg-gray-800">
        {{ item.label }}
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: 'Navbar',
  setup() {
    const navItems = ref([
      {
        label: 'NFT Market',
        link: '/market'
      },
      {
        label: 'NFT Manager',
        link: '/manager'
      },
      {
        label: 'NFT Wallet',
        link: '/wallet'
      }
    ]);
    return {
      navItems
    }
  },
});
</script>