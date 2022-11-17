<script setup lang="ts">
import { ref } from 'vue'

import { CContainer } from '@coreui/bootstrap-vue'

import Form from './components/Form/Index.vue'
import Card from './components/Card/Index.vue'
import Modal from './components/Modal/Index.vue'

export interface Video {
  url?: string;
  title?: string;
  summary?: string;
  open: boolean | false;
}

const global = window

const videoData = ref<Video>({
  url: undefined,
  title: undefined,
  summary: undefined,
  open: false
})

const setVideo = (data: Video) => {
  videoData.value = {
    ...data,
    open: true
  }
}

const onClose = () => {
  videoData.value = {
    url: undefined,
    title: undefined,
    summary: undefined,
    open: false
  }
}
</script>

<template>
  {{ videoData }}
  <CContainer fluid class="main-content flex-column">
    <Form msg="Vite + Vue" @onSearch="(e: any) => global.console.log(e)" />

    <div class="card-videos">
      <Card url="https://www.youtube.com/watch?v=hHz8EXyVmMo" title="algo" summary="other" @onClick="setVideo" />
    </div>

    <Modal v-if="videoData.url" :video="videoData" @onClose="onClose" />
  </CContainer>
</template>

<style scoped>
.card-videos {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 79px;
  width: 100%;
}
</style>
