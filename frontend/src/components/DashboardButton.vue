<template>
  <button class="bg-sky-500 rounded shadow-lg px-4 py-2 text-white m-4" :label="label">{{ label }}</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Button",
  props: {
    label: {
      type: String,
      required: true
    }
  }
})
</script>