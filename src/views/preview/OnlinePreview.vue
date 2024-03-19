<template>
  <el-card class="col-center">
    <div>视频播放器🍲🍲🍲🍲🍲🍲🍲</div>
    <div>{{ data.title }}</div>
    <div>{{ data.videoSrc }}
      <el-button type="link" @click="downloadFile(data.videoSrc)">下载</el-button>
    </div>
    <div class="mt10 myVideo">
      <VideoJs :videoSrc="data.videoSrc" :preview-img-src="data.imgSrc"/>
    </div>
  </el-card>
</template>

<script setup>
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import img404 from '../../assets/404.png'
// //找到你的组件地址引入进来
import VideoJs from '../../components/VideoPlay.vue'
import axios from '../../api/request'

// 获取参数
const route = useRouter()
const this_href = route.currentRoute.value.params.href || 'https://vjs.zencdn.net/v/oceans.mp4'
const img = route.currentRoute.value.params.img || img404
const title = route.currentRoute.value.params.title || ""

const data = reactive({
  videoSrc: this_href,
  imgSrc: img,
  title: title
})

const downloadFile = async (url) => {
  try{
    let filename = data.title + ".mp4";
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style.display = 'none'
    const url_l = new window.URL(url)
    a.href = url_l
    a.download = filename
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url_l)
  }catch (e){
    alert(e.message)

  }
}

</script>
<style lang="scss" scoped>
.myVideo {
  width: 90vw;
  height: auto;
}
</style>
