<template>
  <header class="bg-gray-900 text-white flex items-center drop-shadow-md">
    <ul class="flex ml-4">
      <router-link v-for="item in navItems" :key="item" :to="item.link" class="px-4 py-8 text-xl hover:bg-gray-800">
        {{ item.label }}
      </router-link>
    </ul>
  </header>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: 'Navbar',
  setup() {
    const navItems = ref([
      {
        label: 'NFT Dashboard',
        link: '/dashboard'
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