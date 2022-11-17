<script setup lang="ts">
import { computed, ref } from "vue";
import { CCard } from '@coreui/bootstrap-vue';
import { CCloseButton } from '@coreui/vue/dist/index'

export interface Props {
    url: string;
    title: string;
    summary: string;
}

const props = defineProps<Props>()

const emit = defineEmits(['onClick']);

const idVideo = ref()

const miniature = computed(() => {
    const id = props.url?.match('[\\?&]v=([^&#]*)')?.[1]

    if (!idVideo) return false

    idVideo.value = id

    return `https://img.youtube.com/vi/${id}/sddefault.jpg`
});

const url = computed(() => `https://www.youtube.com/embed/${idVideo.value}`);
</script>

<template>
    <div v-if="miniature" class="video-content">
        <CCard class="card-video" @click="emit('onClick', { ...props, url })">
            <img :src="miniature" :alt="props.title">

            <div class="btn-remove">
                <CCloseButton white />
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
        background-image: v-bind(miniature) !important;
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
