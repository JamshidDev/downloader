
<template>
  <n-modal
      v-model:show="modalVisible"
      preset="card"
      :style="bodyStyle"
      :title="modalType? `Qo'shish` : `Tahrirlash`"
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
  >
    <div class="grid grid-cols-1 mt-4">
      <div class="px-4 mb-4">
        <n-form ref="formRef" :model="modalDetails" :rules="rules">
          <div class="grid grid-cols-2 gap-x-2">
            <n-form-item label="Nomi" path="name">
              <n-input v-model:value="modalDetails.name" type="text" placeholder="Kiriting"/>
            </n-form-item>
            <n-form-item label="Route" path="route">
              <n-input v-model:value="modalDetails.route" type="text" placeholder="Kiriting"/>
            </n-form-item>
            <n-form-item label="Icon" path="icon">
              <n-input v-model:value="modalDetails.icon" type="text" placeholder="Kiriting"/>
            </n-form-item>
            <n-form-item label="Status Text" path="statusText">
              <n-input v-model:value="modalDetails.statusText" type="text" placeholder="Kiriting"/>
            </n-form-item>
            <n-form-item label="Status route" path="status">
              <n-checkbox v-model:checked="modalDetails.status">
                Active status
              </n-checkbox>
            </n-form-item>
          </div>
        </n-form>
      </div>
      <div class="px-4 mt-2">
        <div class="grid grid-cols-2 gap-x-8">
          <n-button @click="modalVisible=false" type="error">
            <template #icon>
              <n-icon>
                <Save16Regular />
              </n-icon>
            </template>
            Yopish
          </n-button>
          <n-button @click="saveItem()" type="info" class="shadow-2xl">
            <template #icon>
              <n-icon>
                <Save16Regular />
              </n-icon>
            </template>
            Saqlash
          </n-button>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import {Save16Regular} from "@vicons/fluent";
import {useMenuRouteStore} from "@/store/modules/menuRouteStore.js";
const store = useMenuRouteStore();
import {ref,} from "vue";

const bodyStyle = {
  width: "600px"
}
let modalVisible = ref(false);
const modalType = ref(true);
const selectedItemId = ref(null);
const modalDetails = ref({
  name:null,
  icon:null,
  route:null,
  status:false,
  statusText:null,

})
const addItem = ()=>{
  modalType.value = true;
  modalDetails.value.name =null;
  modalDetails.value.route =null;
  modalDetails.value.status =false;
  modalDetails.value.statusText =null;
  modalDetails.value.icon =null;
  modalVisible.value = true;
}
const editItem =(data)=>{
  modalType.value = false;
  modalDetails.value.name =data.name;
  modalDetails.value.route =data.route;
  modalDetails.value.status =data.status;
  modalDetails.value.statusText =data.statusText;
  modalDetails.value.icon =data.icon;
  selectedItemId.value = data._id
  modalVisible.value = true;
}
const saveItem =()=>{
  formRef.value.validate((error)=>{
    if(!error && modalType.value){
      modalVisible.value = false;
      store._store(modalDetails.value);
    }else if(!error && !modalType.value){
      modalVisible.value = false;
      store._update({
        data:modalDetails.value,
        permission_id:selectedItemId.value
      })
    }
  })
}
const formRef = ref(null)
const rules = {
  name:{
    required: true,
    message: "Maydon to'ldirilishi shart!",
    trigger: ["change", "blur"]
  },
  route:{
    required: true,
    message: "Maydon to'ldirilishi shart!",
    trigger: ["change", "blur"]
  },
}

defineExpose({
  addItem,
  editItem,
});
</script>
