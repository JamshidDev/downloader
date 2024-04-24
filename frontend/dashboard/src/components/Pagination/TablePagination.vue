<template>
  <div class="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1   gap-4 w-full">
    <div class="flex xl:justify-start lg:justify-start md:justify-start justify-center">
      <span class="text-grey-color font-normal"><span class="font-semibold  primary-text">{{total}}</span> tadan <span class="font-semibold primary-text ml-4">{{(page -1)*pageSize}} - {{page*pageSize}}</span> gacha ko'rsatilmoqda</span>
    </div>
    <div class="flex xl:justify-end lg:justify-end md:justify-end justify-center">
      <n-pagination
          v-model:page="page"
          v-model:page-size="pageSize"
          :page-count="page_count"
          show-size-picker
          :page-sizes="pageSizes"
          @update:page-size="changePageSize"
          @update:page="changePage"
      />
    </div>

  </div>

</template>

<script setup>

import {ref, onMounted, watch } from "vue";
const props = defineProps({
  total:{
    type:Number,
    default:0,
  },
  page:{
    type:Number,
    default:1,
  },
  per_page:{
    type:Number,
    default:10,
  },

})

const emits = defineEmits(['changePage'])

const page = ref(1)
const pageSize = ref(10)
const pageSizes = [
  {
    label: "10 tadan ko'rsatish",
    value: 10
  },
  {
    label: "20 tadan ko'rsatish",
    value: 20
  },
  {
    label: "30 tadan ko'rsatish",
    value: 30
  },
  {
    label: "50 tadan ko'rsatish",
    value: 50
  },
  {
    label: "100 tadan ko'rsatish",
    value: 100
  }
];
const page_count = ref(0)

watch(()=>props.page, (new_val, old_val)=>{
  page.value = new_val;
})

watch(()=>props.total, (new_val, old_val)=>{
  page_count.value  = Math.ceil(Math.ceil(new_val / pageSize.value));
})
const changePageSize = (per_page)=>{
  page.value = 1;
  page_count.value  = Math.ceil(Math.ceil(props.total / per_page))
  emits('changePage', {
    page:page.value,
    per_page:per_page
  })
}

const changePage = (current_page)=>{
  emits('changePage', {
    page:current_page,
    per_page:pageSize.value
  })
}

onMounted(()=>{
  page.value = props.page;
  pageSize.value = props.per_page;
  pageSizes.value = props.total
  page_count.value  = Math.ceil(Math.ceil(props.total / pageSize.value));
})


</script>