
<template>
  <div class="border border-surface-line bg-surface-section rounded">
    <n-spin :show="loading" :delay="200">
      <div class=" py-4 px-6 border-b border-surface-line">
        <slot name="header"></slot>
      </div>
      <div class="px-6 py-6">
        <slot name="default"></slot>
      </div>
      <div class="border-t border-surface-line py-4 px-6">
        <slot name="footer"></slot>
      </div>
    </n-spin>

  </div>
</template>
<script setup>
defineProps({
  loading:{
    type:Boolean,
    default:false,
  }
})
</script>