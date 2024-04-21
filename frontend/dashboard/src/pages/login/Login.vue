<script setup>
import {ref} from "vue";

const authFields =ref({
  login:null,
  password:null,
});
const loading = ref(false);

function auth(){
    loading.value = true;
}

</script>

<template>
  <div class=" bg-gradient-to-t from-dark to-gray-800 w-full min-h-screen relative login-page">
    <div class="w-full h-[20px]">

    </div>
    <div class="backdrop-blur-[8px]
  bg-gradient-to-t to-dark from-gray-800 border border-surface-800 rounded-2xl
  xl:mt-[100px] lg:mt-[100px] md:mt-[100px] mt-[20px]
  xl:w-[400px] lg:w-[400px] md:w-[400px]
  lg:mx-auto xl:mx-auto md:mx-auto mx-2
   shadow-1xl p-10">
      <h2 class="text-surface-500 text-center   font-semibold text-2xl uppercase">Tizimga kirish</h2>
      <div class="grid grid-cols-1 gap-y-6 mt-[80px]">
        <div>
          <label for="login" class="text-sm text-surface-500 mb-1 block pl-4">Login yoki username</label>
          <n-input v-model="authFields.login" round name="login" aria-autocomplete="none" class="login-input" size="large" placeholder="Login"/>
        </div>
        <div>
          <label for="login" class="text-sm text-surface-500 mb-1 block pl-4">Password</label>
          <n-input v-model="authFields.password" round name="password" type="password" show-password-on="mousedown" class="login-input" size="large"
                   placeholder="Password"/>
        </div>
        <div class="mt-10">
          <n-button @click="auth()" :loading="loading" class="w-full" type="info" round size="large">
            Tizimga kirish
          </n-button>
        </div>

      </div>

    </div>
    <div class="w-full absolute bottom-0 h-[50px] left-0 border-t border-surface-800 flex justify-center items-center">
      <img class="xl:w-[30px] lg:w-[30px] md:w-[30px] w-[24px] xl:h-[30px] lg:h-[30px] md:h-[30px] h-[24px]"
           src="@/resourse/logo/logo.png" alt="">
      <span class="text-surface-600 font-medium xl:text-base lg:text-base  text-xs ml-4">Admin Dashboard</span>
    </div>

  </div>
</template>