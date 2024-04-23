<script setup>
import {ref} from "vue";
const visible = ref(false);
const bodyStyle = {
  width: "600px"
}
const controlModal = (data)=>{
  visible.value = data;
}
const props = defineProps({
  title:{
    type:String,
    default:'Default title',
  }
})
defineExpose({
  controlModal
})
</script>
<template>
  <n-modal
      v-model:show="visible"
      preset="card"
      :style="bodyStyle"
      :title="title"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
  >
    <div class="grid grid-cols-1">
      <div class="px-4">
        <slot name="default"></slot>
      </div>
      <div class="border-t border-surface-line px-4">
        <slot name="footer"></slot>
      </div>
    </div>
  </n-modal>
</template>