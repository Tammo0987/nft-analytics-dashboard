<template>
  <navbar />
  <div class="w-4/5 self-center flex flex-col flex-grow">
    <router-view />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Navbar from "./Navbar.vue";

export default defineComponent({
  name: "DashboardLayout",
  components: {Navbar}
});
</script>