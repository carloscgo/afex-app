<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { CContainer } from '@coreui/bootstrap-vue'

import Form from './components/Form/Index.vue'
import Card from './components/Card/Index.vue'
import Modal from './components/Modal/Index.vue'
import Loading from './components/Loading/Index.vue'
import Confirm from './components/Confirm/Index.vue'

import { search, DataService } from './utils/services'

export interface IVideo {
  id: string;
  key: string;
  url: string;
  title: string;
  summary: string;
  thumbnail: string;
}

export interface Video {
  key?: string;
  url?: string;
  title?: string;
  summary?: string;
  thumbnail?: string; open: boolean | false;
}

const videoData = ref<Video>({
  url: undefined,
  key: undefined,
  title: undefined,
  summary: undefined,
  open: false
})
const loading = ref(false)
const confirm = ref<string | null>(null)
const errorMessage = ref('')
const videos = ref<IVideo[]>([])

const setLoading = (value: boolean) => {
  loading.value = value
}

const setVideo = (data: Video) => {
  videoData.value = {
    ...data,
    open: true
  }
}

const getVideos = async () => {
  setLoading(true)

  videos.value = []

  const snapshot = await DataService.getAll() as any

  const error = DataService.getError()

  if (error) {
    setLoading(false)

    errorMessage.value = error

    return
  }

  snapshot.forEach((doc: any) => {
    const video = doc.data()

    video.key = doc.id;

    videos.value.push(video)
  })

  setLoading(false)
}

onMounted(async () => {
  await getVideos()
})

const removeVideo = async (id: string) => {
  setLoading(true)

  await DataService.delete(id)

  await getVideos()
}

const searchVideo = async (id: string) => {
  errorMessage.value = ''

  const ids = videos.value.map(({ id }) => id)

  if (ids.includes(id)) {
    errorMessage.value = 'El video fue agregado previamente.'

    return
  }

  setLoading(true)

  const response = await search(id)

  if (response.result) {
    const video: any = {
      ...response.result,
      url: `https://www.youtube.com/watch?v=${id}`
    }

    await DataService.create(video)

    const error = DataService.getError()

    if (error) {
      setLoading(false)

      errorMessage.value = error

      return
    }

    await getVideos()

    return
  }

  if (response.error) {
    errorMessage.value = response.error
  }
}

const onClose = () => {
  videoData.value = {
    url: undefined,
    title: undefined,
    summary: undefined,
    thumbnail: undefined,
    open: false
  }
}

const onConfirm = (idVideo: string) => {
  confirm.value = idVideo
}

const onDecline = () => {
  confirm.value = null
}

const openConfirm = computed(() => Boolean(confirm.value))
</script>

<template>
  <Loading v-if="loading" />

  <Confirm v-if="openConfirm" message="Esta seguro de quitar el video?" :open="openConfirm" @on-decline="onDecline"
    @on-accept="removeVideo(confirm as string)" />

  <CContainer fluid class="main-content flex-column">
    <Form @on-search="searchVideo" :message="errorMessage" />

    <div class="card-videos">
      <Card v-for="(item) in videos" :key="item.key" :url="item.url" :thumbnail="item.thumbnail" :title="item.title"
        :summary="item.summary" @on-click="setVideo" @on-delete="onConfirm(item.key)" />
    </div>

    <Modal v-if="videoData.url" :video="videoData" @on-close="onClose" />
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
