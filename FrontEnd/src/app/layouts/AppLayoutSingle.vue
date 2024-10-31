<template>
  <q-layout>
    <page-drawer />
    <page-periodo />
    <q-page-container>
      <q-page>
        <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animated bounceInLeft">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts"></script>
