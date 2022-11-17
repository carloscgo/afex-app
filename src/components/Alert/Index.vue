<script setup lang="ts">
import { CAlert } from '@coreui/bootstrap-vue';
import { ref } from 'vue'

export interface Props {
  open: boolean | false;
  message: string;
}

const props = defineProps<Props>()

const visible = ref(props.open)

const emit = defineEmits(['onClose']);

const onClose = () => {
  visible.value = false

  emit('onClose')
}
</script>

<template>
  <CAlert color="danger" :visible="visible" dismissible @close="onClose">
    {{ props.message }}
  </CAlert>
</template>
