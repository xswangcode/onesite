<template>
  <el-card class="col-center">
    <div>视频播放器🍲🍲🍲🍲🍲🍲🍲</div>
    <div>{{ data.videoSrc }}</div>
    <div class="mt10 myVideo">
      <VideoJs :videoSrc="data.videoSrc" autoPlay/>
    </div>
  </el-card>
</template>

<script setup>
import {reactive} from 'vue'
import { useRouter } from 'vue-router'
// //找到你的组件地址引入进来
import VideoJs from '../../components/VideoPlay.vue'

// 获取参数
const route = useRouter()
const this_href =  route.currentRoute.value.params.href || 'https://vjs.zencdn.net/v/oceans.mp4'

const data = reactive({
  videoSrc: this_href,
})
</script>
<style lang="scss" scoped>
.myVideo {
  width: 50vw;
  height: auto;
}
</style>
