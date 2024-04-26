<script setup>
import {onMounted, ref} from "vue";
import SimpleTable from "@/components/Table/SimpleTable.vue";
import CardPage from "@/components/Card/CardPage.vue";
import ActionModal from "./components/ActionModal.vue";
import TablePagination from "@/components/Pagination/TablePagination.vue";
import {useMenuRouteStore} from "@/store/modules/menuRouteStore.js";

const modalRef = ref(null);
const store = useMenuRouteStore();
const params = ref({
  search:null,
})
const handleFilter = ()=>{
  store._filter(params.value.search)
}
onMounted(()=>{
  store._index();
})
</script>

<template>
  <div class="grid grid-cols-1 px-4 pt-6 pb-10">
    <CardPage :loading="store.loading">
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-xl">Menu Route</h3>
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
            <n-input :loading="store.loading" v-model:value="params.search"   @keyup.enter="handleFilter" size="small" placeholder="Qidiruv..." />
          </div>
          <div>
          </div>
        </div>
        <simple-table
            :actionButtons="['action-edit', 'action-delete']"
            :header-list="store.headerList"
            :body-list="store.bodyList"
            @edit-event="modalRef.editItem($event)"
            @delete-event="store.delete_permission($event._id)"
        ></simple-table>
      </template>
      <template #footer>
        <table-pagination
            :page="store.params.page"
            :per_page="store.params.per_page"
            :total="store.totalItem"
            @change-page="store._changePage($event)"
        ></table-pagination>
      </template>
    </CardPage>
    <action-modal ref="modalRef"></action-modal>
  </div>
</template>
