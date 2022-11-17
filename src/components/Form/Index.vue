<script setup lang="ts">
import { ref } from 'vue'
import { CButton, CInputGroup } from '@coreui/bootstrap-vue';

const emit = defineEmits(['onSearch']);

const input = ref('')
</script>

<template>
  <form class="form-content" @submit.prevent="emit('onSearch', input)">
    <h1 class="title">Añadir nuevo video</h1>

    <CInputGroup class="mb-3">
      <CFormInput v-model="input" type="text" size="lg" placeholder="Añadir" aria-label="input-add"
        aria-describedby="input-addon" />

      <CButton color="primary" type="submit">Añadir</CButton>
    </CInputGroup>
  </form>
</template>

<style scoped lang="scss">
.form-content {
  width: 100%;
  margin-bottom: 134px;

  .title {
    font-size: 28.329px;
  }
}
</style>
