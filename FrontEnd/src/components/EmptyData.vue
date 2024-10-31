<template>
  <div class="empty-data absolute-center text-center">
    <q-icon :name="props.icon" size="100px" color="primary" />
    <div class="text-size-21 text-grey-14">
      {{ props.label }}
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  icon: {
    type: String,
    required: true,

  },
  label: {
    type: String,
    required: true,
  }
})

</script>
<style lang="scss">
.empty-data {
  top: 150px !important;
}
</style>
