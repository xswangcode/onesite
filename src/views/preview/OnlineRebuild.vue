<template>
  <div style="body_content">
    <el-card class="col-center">
      <el-row>
        <el-col> 
          <el-link type="success">{{data.title}}</el-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="myVideo">
            <VideoJs :videoSrc="data.videoSrc" :preview-img-src="data.imgSrc" />
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script setup name="OnlinePreview2">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import img404 from '../../assets/404.png'
// //找到你的组件地址引入进来
import VideoJs from '../../components/VideoPlay.vue'

// // 获取参数
const route = useRouter()

let this_href = route.currentRoute.value.params.href || 'https://cesium.com/public/SandcastleSampleData/big-buck-bunny_trailer.mp4'
let img = route.currentRoute.value.params.img || img404
let title = route.currentRoute.value.params.title || "这里什么也没有~"

const data = ref({
  videoSrc: this_href,
  imgSrc: img,
  title: title,
})



</script>
<style lang="scss" scoped>

// 默认横屏
.myVideo {
  width: 58vw;
  height: calc(58vw * 9 /16 - 10px);
  border: 2px solid  red;
}

// 竖屏時
@media screen and (max-width: 376px) and (max-height: 715px){ 
  .myVideo {
    height: calc(90vw * 9 /16 );
    width: 90vw;
    border: 2px solid  blue;
  }

  .el-card{
    padding: 0px 0 !important;
    height: 100%;
  }
  :deep(.el-card__body){
    padding: 0px 0 !important;
  }
} 


:deep(.videoPlay) {
  // 内部 
  width: 100%;
  height: 100%;
}

:deep(.video-js) {
  // 内部 
  width: 100%;
  height: 100%;
}
.el-card{
  padding: 5px 0 !important;
  height: 100%;
}
:deep(.el-card__body){
  padding: 5px 0 !important;
}
</style>
