<template>
    <div>
        <h3>本地列表</h3>
        <el-row :span="24">
            <el-col :span="1" style="margin-left: 20px;"> 序号 </el-col>
            <el-col :span="16" style="margin-left: 20px;"> 名字 </el-col>
            <el-col :span="3"> 大小 </el-col>
            <el-col :span="3"> 时长 </el-col>
        </el-row> <el-row :span="24">
            <el-col :span="1" style="margin-left: 20px;">  </el-col>
            <el-col :span="16" style="margin-left: 20px;">
                <el-link type="success" @click="visit_dir('')"> <span style="font-size:25px">..</span> </el-link>
            </el-col>
            <el-col :span="3">  </el-col>  
        </el-row>
        <el-row v-for="(item,idx) in dataList" :span="24">
            <el-col :span="1" style="margin-left: 20px;"> {{ idx+1 }} </el-col>
            <el-col :span="16" style="margin-left: 15px;">
                <el-link type="success" @click="preview_video(item.path, item.name)" v-if="!item.isDirectory">{{
            item.name }} </el-link>
                <el-link type="primary" @click="visit_dir(item.name)" v-if="item.isDirectory">{{ item.name }} 【目录】</el-link>
            </el-col>
            <el-col :span="3"> {{ item.size }} </el-col>
            <el-col :span="3"> {{ new Date(item.createdAt).toLocaleString()  }} </el-col>

        </el-row>
    </div>
</template>

<script setup>
import { localFileList } from '../../api/modules/index';
import { onMounted, reactive, ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
const dataList = ref([])
const pathpath = ref("")
onMounted(() => {
    localFileList(pathpath.value).then(res => {
        console.log(res.data)
        dataList.value = res.data
    })
})


const preview_video = async (href, title) => {
    route.push({
        "name": "video-preview",
        "params": { href: "/video/"+pathpath.value+'/' + title, title: title },

    });
}


const visit_dir = async (path) => {
    pathpath.value = path;
    localFileList(pathpath.value).then(res => {
        console.log(res.data)
        dataList.value = res.data
    })
}
</script>