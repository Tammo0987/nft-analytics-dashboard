<template>
  <div class="relative" @focusout="open = false" tabindex="0">
    <div @click="open = !open"
         class="bg-gray-900 text-white text-lg rounded drop-shadow-lg p-4 flex flex-row cursor-pointer">
      <span> {{ modelValue.name }} </span>
      <img
          src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=white"
          class="-mr-1 ml-2 mt-1 h-5 w-5"
      />
    </div>
    <transition>
      <div v-if="open"
           class="absolute right-0 mt-2 bg-gray-800 text-white text-lg rounded drop-shadow-lg cursor-pointer">
        <div v-for="option in options" :key="option.name" @click="selectValue(option)" class="p-4">
          {{ option.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "Dropdown",
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: null
  },
  setup(props, {emit}) {
    const open = ref(false);

    const selectValue = (option: any) => {
      open.value = false;
      emit('change', option);
    };

    return {
      open, selectValue
    }
  }
});
</script>