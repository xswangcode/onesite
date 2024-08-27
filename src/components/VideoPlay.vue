<template>
  <div class="videoPlay">
    <video
      ref="m3u8_video"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
    >
      <source :src="videoSrc" />
    </video>
  </div>
</template>
<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
const props = defineProps({
  videoSrc: String,
  previewImgSrc: String,
  autoPlay: Boolean,
})

const m3u8_video = ref()
let player
const initPlay = async () => {
  videojs.addLanguage('zh-CN', video_zhCN)
  await nextTick()
  const options = {
    muted: true,
    controls: true,
    autoplay: true,
    loop: true,
    language: 'zh-CN',
    techOrder: ['html5'],
    playbackRates: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5],
    poster: props.previewImgSrc
  }
  player = videojs(m3u8_video.value, options, () => {
    videojs.log('播放器已经准备好了!')
    if (props.autoPlay && props.videoSrc) {
      player.play()
    }
    player.on('ended', () => {
      videojs.log('播放结束了!')
    })
    player.on('error', () => {
      videojs.log('播放器解析出错!')
    })
  })
}
onMounted(() => {
  initPlay()
})
//直接改变路径测试
watch(
  () => props.videoSrc,
  () => {
    player.pause()
    player.src(props.videoSrc)
    player.load()
    if (props.videoSrc) {
      player.play()
    }
  }
)
onBeforeUnmount(() => {
  player?.dispose()
})
</script>
<style lang="scss" scoped>
.videoPlay { 
  .video-js { 
    width: 100%;
    height: 180px !important;
  }
} 
:deep(.vjs-tech) {
  width: 82vw;
}
</style>
