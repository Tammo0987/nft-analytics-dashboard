<template>
  <navbar />
  <router-view />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Navbar from "./Navbar.vue";

export default defineComponent({
  name: "DashboardLayout",
  components: {Navbar}
});
</script>