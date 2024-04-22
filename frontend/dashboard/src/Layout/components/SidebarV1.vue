<script setup>
import { DrawerArrowDownload24Regular,ChevronDown24Filled, ArrowSyncCheckmark20Regular } from '@vicons/fluent';
import {ref} from "vue";
const selectedIndex = ref(null);
const currentRoute = ref(null);
const sidebarList = [
  {
    order:1,
    label:'Dashboard',
    icon:'time-close',
    route:'/dashboard',
    status:false,
    statusText:'New',
    subItems:[],
  },
  {
    order:2,
    label:'Admin menu',
    icon:'time-close',
    route:'/dashboard2',
    status:false,
    statusText:'New',
    subItems:[
      {
        order:1,
        label:'Permission',
        icon:'time-close',
        route:'/admin-permission',
        status:false,
        statusText:'New',
      },
      {
        order:2,
        label:'Role',
        icon:'time-close',
        route:'/admin-role',
        status:false,
        statusText:'New',
      },
      {
        order:3,
        label:'Menu route',
        icon:'time-close',
        route:'/admin-menu-route',
        status:false,
        statusText:'New',
      },
      {
        order:4,
        label:'Menu',
        icon:'time-close',
        route:'/admin-menu',
        status:false,
        statusText:'New',
      },
      {
        order:5,
        label:`Admin qo'shish`,
        icon:'time-close',
        route:'/admin-create',
        status:false,
        statusText:'New',
      },
    ],
  },
  {
    order:3,
    label:'Dashboard 3',
    icon:'time-close',
    route:'/dashboard3',
    status:false,
    statusText:'New',
    subItems:[],
  },
  {
    order:4,
    label:'UI Template',
    icon:'time-close',
    route:'/dashboard4',
    status:false,
    statusText:'New',
    subItems:[
      {
        order:1,
        label:'Permission',
        icon:'time-close',
        route:'/dashboard',
        status:false,
        statusText:'New',
      },
      {
        order:2,
        label:'Role',
        icon:'time-close',
        route:'/dashboard',
        status:false,
        statusText:'New',
      },
      {
        order:3,
        label:'Menu route',
        icon:'time-close',
        route:'/dashboard',
        status:false,
        statusText:'New',
      },
      {
        order:4,
        label:'Menu',
        icon:'time-close',
        route:'/dashboard',
        status:false,
        statusText:'New',
      },
      {
        order:5,
        label:`Admin qo'shish`,
        icon:'time-close',
        route:'/dashboard',
        status:false,
        statusText:'New',
      },
    ],
  },
];

function selectItemEvent(route, index){
  selectedIndex.value = index;
  currentRoute.value = route;
}
</script>

<template>
  <div class="sidebar-content-v1 w-full min-h-full flex flex-col">
    <div class="sidebar_header flex justify-center min-h-[50px] border-b border-bluegray-700">

    </div>
    <div class="sidebar_body px-2 text-surface-500">
      <template v-for="item of sidebarList" :key="item.order">
        <div @click="selectItemEvent(item.route, item.order)" v-if="item.subItems.length ===0" :class="[currentRoute === item.route && 'active-item']" class="single-item  flex cursor-pointer rounded-xl relative">
          <div class="item-icon  h-[40px] flex justify-center items-center">
            <n-icon class="text-xl font-bold">
              <DrawerArrowDownload24Regular />
            </n-icon>
          </div>
          <div class="item-title text-sm font-medium flex items-center overflow-hidden text-nowrap pl-2">{{item.label}}</div>
          <span class="single-item-tooltip h-[40px] flex justify-center items-center rounded-xl">{{item.label}}</span>
        </div>
        <div v-else class="multiple-item cursor-pointer rounded-xl relative">
          <div @click="selectItemEvent(null, item.order)" class="item-header flex justify-between">
            <div class="item-icon h-[40px] flex justify-center items-center">
              <n-icon class="text-xl font-bold">
                <DrawerArrowDownload24Regular />
              </n-icon>
            </div>
            <div class="item-title text-sm font-medium flex items-center justify-between overflow-hidden text-nowrap pl-2">
              <span>{{item.label}}</span>
              <div class="flex items-center justify-center mr-2">
                <n-icon class="font-bold text-sm">
                  <ChevronDown24Filled />
                </n-icon>
              </div>
            </div>
          </div>
          <div class="item-panel pl-7 overflow-hidden"  :style="{height:item.order === selectedIndex? `${item.subItems.length*46}px` : '0px'}">
            <div  v-for="subItem of item.subItems" :key="subItem.order" :class="[currentRoute === subItem.route && 'active-item']"  @click="selectItemEvent(subItem.route, item.order)" class="item-panel-items border border-[transparent] rounded-xl px-2 mb-1 flex">
              <div class="item-panel-items-icon h-[40px] flex justify-center items-center ">
                <n-icon class="text-xl font-bold">
                  <ArrowSyncCheckmark20Regular />
                </n-icon>
              </div>
              <div class="item-panel-items-title text-nowrap pl-2 overflow-hidden flex items-center">
                <span>{{subItem.label}}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>