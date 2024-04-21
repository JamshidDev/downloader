<script setup>
import {ref, computed, reactive} from "vue";

const openSidebar = ref(true);
const layoutClass = computed(()=>{
  return {
    open_sidebar:openSidebar.value,
    close_sidebar:!openSidebar.value,
  }
})
</script>

<template>
<div class="layout-wrapper-v1" :class="layoutClass">
  <div class="sidebar-box">
  </div>
  <div class="main-content flex justify-center items-center">
    <button @click="openSidebar=!openSidebar" class="bg-primary p-4 text-white rounded-2xl shadow-2xl">Control button</button>
  </div>
</div>
</template>
