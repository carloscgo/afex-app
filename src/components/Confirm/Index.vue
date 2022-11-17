<script setup lang="ts">
import { CModal, CModalTitle, CModalBody, CModalHeader, CModalFooter, CButton } from '@coreui/bootstrap-vue'
import { ref } from 'vue'

export interface Props {
  message: string;
  open: boolean | false
}

const props = defineProps<Props>()

const emit = defineEmits(['onDecline', 'onAccept']);

const visible = ref(props.open)

const onClose = () => {
  visible.value = false

  emit('onDecline')
}

const onOk = () => {
  emit('onAccept')

  onClose()
}
</script>

<template>
  <CModal alignment="center" :keyboard="false" :visible="visible" class="d-block show" @close="onClose">
    <CModalHeader>
      <CModalTitle>Confirmacion</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <p>{{ message }}</p>
    </CModalBody>
    <CModalFooter class="footer-confirm">
      <CButton color="secondary" class="btn-confirm" @click="onClose">No</CButton>
      <CButton color="primary" class="btn-confirm" @click="onOk">Si</CButton>
    </CModalFooter>
  </CModal>
</template>

<style scoped lang="scss">
.footer-confirm {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .btn-confirm {
    width: 4.5rem;
  }
}
</style>