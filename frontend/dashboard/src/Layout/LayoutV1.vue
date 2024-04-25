<script setup>
import SidebarV1 from "@/Layout/components/SidebarV1.vue";
import {ref, computed} from "vue";
import AppHeader from "@/Layout/components/AppHeader.vue";

const openSidebar = ref(true);
const layoutClass = computed(()=>{
  return {
    open_sidebar:openSidebar.value,
    close_sidebar:!openSidebar.value,
  }
})

const controlSidebar=()=>{

}
</script>

<template>
<div class="layout-wrapper-v1" :class="layoutClass">
  <div class="sidebar-box">
    <SidebarV1></SidebarV1>
  </div>
  <div class="main-content">
    <app-header @sidebarEvent="openSidebar=!openSidebar"></app-header>
    <div class="main-page-content">
      <router-view />
    </div>
  </div>
</div>
</template>
