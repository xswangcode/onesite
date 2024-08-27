<template>
  <el-card class="col-center">
    <div>视频播放器🍲</div>
    <div>{{ data.title }}</div>
    <div class="myVideo">
      <VideoJs :videoSrc="data.videoSrc" :preview-img-src="data.imgSrc" />
    </div>
  </el-card>
</template>

<script setup name="OnlinePreview">
import { reactive, onBeforeUpdate } from 'vue'
import { useRouter } from 'vue-router'
import img404 from '../../assets/404.png'
// //找到你的组件地址引入进来
import VideoJs from '../../components/VideoPlay.vue'

// // 获取参数
const route = useRouter()
const data = reactive({})
const init = () => {
  let this_href = route.currentRoute.value.params.href || ''
  let img = route.currentRoute.value.params.img || img404
  let title = route.currentRoute.value.params.title || ""

  if (this_href.startsWith("/video")) {
    this_href = this_href.replace("//", '/')
  }
  data.videoSrc = this_href
  data.imgSrc = img
  data.title = title
} 

onBeforeUpdate(() => {
  init()
})


</script>
<style lang="scss" scoped>
.myVideo {
  height: 90%;
}
</style>
