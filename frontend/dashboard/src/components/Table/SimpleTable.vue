<script setup>
import { Delete24Regular, Edit16Filled,Eye12Filled } from '@vicons/fluent';
const props = defineProps({
  loading:{
    type:Boolean,
    default:false,
  },
  headerList:{
    type:Array,
    default:[],
  },
  bodyList:{
    type:Array,
    default:[],
  },
  actionButtons:{
    type:Array,
    default:[],
  }
});
const emits = defineEmits(['viewEvent', 'editEvent', 'deleteEvent']);

const handleView =(data)=>{
  emits('viewEvent', data)
}
const handleEdit =(data)=>{
  emits('editEvent', data)
}
const handleDelete =(data)=>{
  emits('deleteEvent', data)
}


</script>

<template>
  <div class="grid grid-cols-1">
    <n-spin class="table-box" :show="loading" :delay="200">
      <n-table class="border-surface-line" :bordered="true" :single-line="false" size="small">
        <thead class="bg-surface-ground">
        <tr>
          <th v-for="header in headerList"
              :style="{
              width:header.width,
              maxWidth:header?.maxWidth,
              }"
              :key="header.label" class="bg-surface-ground font-semibold text-xs">{{header.label}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="body of bodyList" :key="body">
          <template v-for="item of headerList" :key="item">
            <td v-if="item.field !== 'action'">{{body[item.field]}}</td>
            <td v-else>
              <div class="flex justify-center gap-2">
                <n-button v-if="actionButtons.includes('action-view')" @click="handleView(body)" size="small" strong secondary circle type="warning">
                  <template #icon>
                    <n-icon><Eye12Filled /></n-icon>
                  </template>
                </n-button>
                <n-button v-if="actionButtons.includes('action-edit')" @click="handleEdit(body)" size="small" strong secondary circle type="info">
                  <template #icon>
                    <n-icon><Edit16Filled /></n-icon>
                  </template>
                </n-button>

                <n-popconfirm
                    @positive-click="handleDelete(body)"
                    :positive-text="'Ha'"
                    :negative-text="`Yo'q`"
                >
                  <template #trigger>
                    <n-button v-if="actionButtons.includes('action-delete')" size="small" strong secondary circle type="error">
                      <template #icon>
                        <n-icon><Delete24Regular /></n-icon>
                      </template>
                    </n-button>
                  </template>
                  <span class="text-xs">Haqiqattan ham bu amalni bajarmoqchimisiz?</span>
                </n-popconfirm>


              </div>
            </td>
          </template>

        </tr>
        </tbody>
      </n-table>
    </n-spin>
  </div>
</template>
