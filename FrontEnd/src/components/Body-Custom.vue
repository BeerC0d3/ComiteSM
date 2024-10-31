import {ref} from 'vue'
<template>
  <!-- <q-scroll-area class="page-body absolute-top fit"> -->
  <div class="body-box">
    <!-- <q-scroll-area class="page-body absolute-top fit" style="height: calc(100vh - 280px)"> -->
    <div class="container-template">
      <slot />
    </div>
    <!-- <div class="page-body-spacer-footer"></div> -->
    <!-- </q-scroll-area> -->
  </div>
  <!-- </q-scroll-area> -->
</template>
