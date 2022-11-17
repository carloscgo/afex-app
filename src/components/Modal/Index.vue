<script setup lang="ts">
import { CModal, CModalBody, CModalHeader } from '@coreui/bootstrap-vue'
import { ref } from 'vue'

export type Video = {
    url?: string;
    title?: string;
    summary?: string;
    open: boolean | false;
}

export interface Props {
    video: Video
}

const props = defineProps<Props>()

const emit = defineEmits(['onClose']);

const visible = ref(props.video.open)
const iframeDisplay = ref('flex')

const onClose = () => {
    visible.value = false

    emit('onClose')
}

const onLoadIframe = () => { iframeDisplay.value = 'none' }

const ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
</script>

<template>
    <CModal alignment="center" size="xl" :visible="visible" @close="onClose" class="d-block show">
        <CModalHeader />
        <CModalBody>
            <div class="row">
                <div class="col-6 video-content">
                    <iframe allowfullscreen :src="props.video.url" :title="props.video.title" :allow="ALLOW"
                        @load="onLoadIframe" />
                </div>
                <div class="col-6 summary-content">
                    <h1>{{ props.video.title }}</h1>

                    <p>
                        {{ props.video.summary }}
                    </p>
                </div>
            </div>
        </CModalBody>
    </CModal>
</template>

<style scoped lang="scss">
.modal-header {
    border-bottom: none;
    padding-bottom: 0;
}

.modal-body {
    padding: 10px 39px 39px 39px;
}

.video-content {
    width: 492px;
    height: 308px;
    background-color: var(--bs-dark);
    position: relative;

    &::after {
        display: v-bind(iframeDisplay);
        align-items: center;
        justify-content: center;
        content: 'Loading...';
        color: var(--bs-white);
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    iframe {
        border: 0;
        width: 100%;
        height: 100%;
    }
}

.summary-content {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    color: var(--color-text);

    h1 {
        font-weight: 500;
        font-size: 24px;
        line-height: 38px;
    }

    p {
        font-weight: 400;
        font-size: 21px;
        line-height: 25px;
    }
}
</style>
