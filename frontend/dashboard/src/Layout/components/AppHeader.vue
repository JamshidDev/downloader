<script setup>
import { h, defineComponent } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { SignOut20Regular, ChatMail20Regular,Person24Regular,PersonCall20Regular } from '@vicons/fluent';
const options = [
  {
    label: 'Xabarlar',
    key: 'user-message',
    icon () {
      return h(NIcon, null, {
        default: () => h(ChatMail20Regular)
      })
    },
  },
  {
    label: 'Profile',
    icon () {
      return h(NIcon, null, {
        default: () => h(Person24Regular)
      })
    },
    key: 'user-profile'
  },
  {
    label: 'Support',
    icon () {
      return h(NIcon, null, {
        default: () => h(PersonCall20Regular)
      })
    },
    key: 'user-support'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Chiqish',
    key: 'user-logout',
    icon () {
      return h(NIcon, null, {
        default: () => h(SignOut20Regular)
      })
    },
  },
]

const handleSelect = ()=>{

}
</script>

<template>
<div class="app-header-container flex justify-between w-full h-[50px] border-b border-surface-line bg-surface-section">
    <div></div>
    <div class="flex items-center mr-6">
      <n-dropdown
          :options="options"
          placement="bottom-start"
          trigger="click"
          @select="handleSelect"
      >
        <n-avatar
            class="cursor-pointer"
            round
            size="small"
            src="https://laravelui.spruko.com/synto/build/assets/img/users/12.jpg"
        />
      </n-dropdown>
    </div>
</div>
</template>
