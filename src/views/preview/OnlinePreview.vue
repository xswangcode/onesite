<template>
  <el-card class="col-center">
    <div>视频播放器🍲🍲🍲🍲🍲🍲🍲</div>
    <div>{{ data.videoSrc }}</div>
    <div class="mt10 myVideo">
      <VideoJs :videoSrc="data.videoSrc" :preview-img-src="data.imgSrc"  />
    </div>
  </el-card>
</template>

<script setup>
import {reactive} from 'vue'
import { useRouter } from 'vue-router'
import img404 from '../../assets/404.png'
// //找到你的组件地址引入进来
import VideoJs from '../../components/VideoPlay.vue'

// 获取参数
const route = useRouter()
const this_href =  route.currentRoute.value.params.href || 'https://vjs.zencdn.net/v/oceans.mp4'
const img =  route.currentRoute.value.params.img  ||  img404

const data = reactive({
  videoSrc: this_href,
  imgSrc: img
})
</script>
<style lang="scss" scoped>
.myVideo {
  width: 50vw;
  height: auto;
}
</style>
