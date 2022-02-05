<template>
  <div class="h-20 w-20">
    <svg class="animate-spin" viewBox="0 0 100 100">
      <circle cx="50" cy="50" fill="none" stroke="white" stroke-width="4" r="18"
              stroke-dasharray="80 30"/>
    </svg>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Spinner"
});
</script>