<script setup>

</script>

<template>
<div class="bg-dark w-full min-h-screen relative login-page">
  <div class="w-full h-[60px]" >

  </div>
  <div class="w-[400px] backdrop-blur-[8px] bg-dark border border-surface-800 rounded-2xl mt-[100px] mx-auto shadow-1xl p-10">
      <h2 class="text-surface-300 text-center   font-bold text-xl">Tizimga kirish</h2>
      <div class="grid grid-cols-1 gap-y-6 mt-[80px]">
        <div>
          <n-input name="login" aria-autocomplete="none" class="login-input" size="large" round placeholder="Login" />
        </div>
        <div>
          <n-input name="password" type="password" show-password-on="mousedown" class="login-input" size="large" round placeholder="Password" />
        </div>

      </div>

  </div>

</div>
</template>

<style scoped>

</style>