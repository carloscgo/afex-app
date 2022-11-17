<script setup lang="ts">
import { ref, watch } from 'vue'
import { CButton, CInputGroup } from '@coreui/bootstrap-vue';
import Alert from '../Alert/Index.vue'

interface Props {
  message: string
}

const props = defineProps<Props>()

const emit = defineEmits(['onSearch']);

const input = ref('')
const message = ref(props.message)
const alertShow = ref(false)

const matchUrl = (url: string): boolean | string => {
  const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  const match = url.match(p)

  if (match) {
    return match[1]
  }

  return false;
}

watch(() => props.message, (newValue: Props['message']) => {
  message.value = newValue

  alertShow.value = Boolean(newValue)
})

const submitHandler = () => {
  const url = input.value
  const id = matchUrl(url)

  alertShow.value = !id

  if (!id) {
    message.value = 'La URL del video es invalida'

    return
  }

  input.value = ''

  emit('onSearch', id)
}

const closeAlert = () => {
  message.value = ''
  alertShow.value = false
}
</script>

<template>
  <Alert v-if="alertShow" :open="alertShow" :message="message" @on-close="closeAlert" class="w-100" />

  <form class="form-content" @submit.prevent="submitHandler">
    <h1 class="title">Añadir nuevo video</h1>

    <CInputGroup class="mb-3">
      <CFormInput v-model="input" type="url" size="lg" placeholder="Añadir" aria-label="input-add"
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
