<script setup>
import {ref} from "vue";
const visible = ref(false);
const bodyStyle = {
  width: "600px"
}

const props = defineProps({
  title:{
    type:String,
    default:'Default title',
  },
  visible:{
    type:Boolean,
    default:false,
  }
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
    <div class="grid grid-cols-1 mt-4">
      <div class="px-4 mb-4">
        <slot name="default"></slot>
      </div>
      <div class="px-4 mt-2">
        <slot name="footer"></slot>
      </div>
    </div>
  </n-modal>
</template>