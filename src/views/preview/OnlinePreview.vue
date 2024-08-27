<template>
  <el-card class="col-center">
    <div>视频播放器🍲🍲🍲🍲🍲🍲🍲</div>
    <div>{{ data.title }}</div>
    <div class="mt10 myVideo">
      <VideoJs :videoSrc="data.videoSrc" :preview-img-src="data.imgSrc" />
    </div>
  </el-card>
</template>

<script setup name="online_preview">
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import img404 from '../../assets/404.png'
// //找到你的组件地址引入进来
import VideoJs from '../../components/VideoPlay.vue'

// 获取参数
const route = useRouter()
let this_href = route.currentRoute.value.params.href || ''
const img = route.currentRoute.value.params.img || img404
const title = route.currentRoute.value.params.title || ""

if(this_href.startsWith("/video")){
  this_href =   this_href.replace("//",'/')
}
const data = reactive({
  videoSrc: this_href,
  imgSrc: img,
  title: title
})

</script>
<style lang="scss" scoped>
.myVideo {
  width: 90vw;
  height: auto;
}
</style>
