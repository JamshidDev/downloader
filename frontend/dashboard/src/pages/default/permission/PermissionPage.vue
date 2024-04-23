<script setup>
import {ref } from "vue";
import SimpleTable from "@/components/Table/SimpleTable.vue";
import CardPage from "@/components/Card/CardPage.vue";
import SimpleModal from "@/components/Modal/SimpleModal.vue";

const headerList = [
  {
    label: "#",
    width: `40px`,
  },
  {
    label: "Nomi",
    width: `300px`,
  },
  {
    label: "Menu",
    width: `300px`,
  },
  {
    label: "Route",
    width: `600px`,
  },
  {
    label: "Menu",

  },
  {
    label: "Amallar 3",
    width: `120px`,
  },
  {
    label: "Amallar",
    width: `80px`,
  },
];
const bodyList = [
  {
    name: "Nomi",
    menu: `menu`,
    route: `route`,
    menu_2: `route2`,
    menu_3: `route3`,
  },
  {
    name: "Nomi",
    menu: `menu`,
    route: `route`,
    menu_2: `route`,
    menu_3: `route3`,
  },
];
const bodyProperty=['number','name', 'menu', 'route','menu_2','menu_2', 'action'];
const loading = ref(false);
const modalRef = ref(null);
const handleEdit = (event)=>{
  console.log(modalRef.value.controlModal(true))

}

</script>

<template>
  <div class="grid grid-cols-1 px-4 pt-10">
    <CardPage>
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-xl">Huquqlar</h3>
          </div>
          <div>
            <n-button type="info">
              Qo'shish
            </n-button>
          </div>
        </div>
      </template>
      <template #default>
          <div class="flex justify-between mb-4">
              <div>
                <n-input :loading="loading" size="small" placeholder="Qidiruv..." />
              </div>
             <div>
             </div>
          </div>
          <simple-table
              :loading="loading"
              :actionButtons="['action-edit', 'action-delete']"
              :header-list="headerList"
              :body-list="bodyList"
              :body-property="bodyProperty"
              @edit-event="handleEdit($event)"
          ></simple-table>
      </template>
    </CardPage>
    <simple-modal ref="modalRef"></simple-modal>
  </div>
</template>
