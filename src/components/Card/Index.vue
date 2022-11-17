<script setup lang="ts">
import { computed } from "vue";
import { CCard } from '@coreui/bootstrap-vue';
import { CCloseButton } from '@coreui/vue/dist/index'

export interface Props {
  key: string;
  url: string;
  title: string;
  summary: string;
  thumbnail: string;
}

const props = defineProps<Props>()

const emit = defineEmits(['onClick', 'onDelete']);

const url = computed(() => {
  const id = props.url?.match('[\\?&]v=([^&#]*)')?.[1]

  if (!id) return false

  return `https://www.youtube.com/embed/${id}`
})
</script>

<template>
  <div v-if="thumbnail" class="video-content">
    <CCard class="card-video">
      <img :src="thumbnail" :alt="props.title" @click="emit('onClick', { ...props, url })">

      <div class="btn-remove">
        <CCloseButton white @click="emit('onDelete', props.key)" />
      </div>
    </CCard>
  </div>
</template>

<style scoped lang="scss">
.video-content {
  width: 263px;
  height: 150px;

  .card-video {
    width: 100%;
    height: 100%;
    background-color: var(--bs-gray-900);
    background-image: v-bind(thumbnail) !important;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: 1;
    cursor: pointer;

    img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .btn-remove {
      width: 24px;
      height: 24px;
      font-weight: 900;
      padding: 5px;
      border-radius: 5px;
      position: absolute;
      background-color: var(--bs-dark);
      z-index: 2;
      left: calc(100% - 29px);
      top: 5px;
      display: flex;
      align-items: center;
      justify-content: center;

      .btn-close {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
