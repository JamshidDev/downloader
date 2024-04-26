<script setup>
import {onMounted, ref} from "vue";
import {usePermissionStore} from "@/store/modules/permissionStore.js"
import SimpleTable from "@/components/Table/SimpleTable.vue";
import CardPage from "@/components/Card/CardPage.vue";
import ActionModal from "./components/ActionModal.vue";
import TablePagination from "@/components/Pagination/TablePagination.vue";

const modalRef = ref(null);
const permissionStore = usePermissionStore();
const params = ref({
  search:null,
})
const handleFilter = ()=>{
  console.log(params.value.search)
    permissionStore.filter_permission(params.value.search)
}
onMounted(()=>{
  permissionStore.get_permission();
})
</script>

<template>
  <div class="grid grid-cols-1 px-4 pt-6 pb-10">
    <CardPage :loading="permissionStore.loading">
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-xl">Huquqlar</h3>
          </div>
          <div>
            <n-button @click="modalRef.addItem($event)" type="info">
              Qo'shish
            </n-button>
          </div>
        </div>
      </template>
      <template #default>
          <div class="flex justify-between mb-4">
              <div>
                <n-input :loading="permissionStore.loading" v-model:value="params.search"   @keyup.enter="handleFilter" size="small" placeholder="Qidiruv..." />
              </div>
             <div>
             </div>
          </div>
          <simple-table
              :actionButtons="['action-edit', 'action-delete']"
              :header-list="permissionStore.headerList"
              :body-list="permissionStore.bodyList"
              @edit-event="modalRef.editItem($event)"
              @delete-event="permissionStore.delete_permission($event._id)"
          ></simple-table>
      </template>
      <template #footer>
        <table-pagination
            :page="permissionStore.params.page"
            :per_page="permissionStore.params.per_page"
            :total="permissionStore.totalItem"
            @change-page="permissionStore.changePage($event)"
        ></table-pagination>
      </template>
    </CardPage>
    <action-modal ref="modalRef"></action-modal>
  </div>
</template>
