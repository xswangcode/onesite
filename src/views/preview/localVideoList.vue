<template>
    <div>
        <h3>本地列表</h3>
        <el-row  :span="24">
            <el-col :span="18">  名字 </el-col>
            <el-col :span="3">  大小 </el-col>
        </el-row>
        <el-row v-for="item in dataList" :span="24">
            <el-col :span="18"> <el-link type="success" @click="preview_video(item.path,item.name)">{{ item.name }} </el-link> </el-col>
            <el-col :span="3"> {{ item.size }} </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { localFileList } from '../../api/modules/index';
import { onMounted, reactive, ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
const dataList = ref([])

onMounted(() => {
    localFileList().then(res => {
        console.log(res.data)
        dataList.value = res.data
    })
})


const preview_video = async (href , title) => {
  route.push({
    "name": "video-preview",
    "params": { href: "/video/"+title,   title: title },
  });
}

</script>