<template>
    <div style="height: 80%;">
        <h3>本地列表</h3>
        <el-row :span="24">
            <el-col :span="2" :pull="0"> 序号 </el-col>
            <el-col :span="10" :pull="1" style="margin-left: 10px;" @click="orderBy('name')"> 名字
                <el-icon>
                    <ArrowUp v-if="sortedStatus['name'] > 0"></ArrowUp>
                    <ArrowDown v-else></ArrowDown>
                </el-icon>
            </el-col>
            <el-col :span="6" @click="orderBy('size')"> 大小
                <el-icon>
                    <ArrowUp v-if="sortedStatus['size'] > 0"></ArrowUp>
                    <ArrowDown v-else></ArrowDown>
                </el-icon>
            </el-col>
            <el-col :span="3" @click="orderBy('createdAt')"> 下载时间
                <el-icon>
                    <ArrowUp v-if="sortedStatus['createdAt'] > 0"></ArrowUp>
                    <ArrowDown v-else></ArrowDown>
                </el-icon> </el-col>
        </el-row> <el-row :span="24">
            <el-col :span="2" :pull="0"> </el-col>
            <el-col :span="10" :pull="1" style="margin-left: 10px;">
                <el-link type="success" @click="visit_dir('')"> <span style="font-size:25px">..</span> </el-link>
            </el-col>
        </el-row>
        <el-row v-for="(item, idx) in dataList" :span="24" style="padding-top: 20px;">
            <el-col :span="2" :pull="0"> {{ idx + 1 }} </el-col>
            <el-col :span="10" :pull="1" style="margin-left: 10px;margin-right: 13px;">
                <el-link type="success" @click="preview_video(item.path, item.name)" v-if="!item.isDirectory">{{
            item.name }} </el-link>
                <el-link type="primary" @click="visit_dir(item.name)" v-if="item.isDirectory">{{ item.name }}
                    【目录】</el-link>
            </el-col>
            <el-col :span="6"> {{ item.size }} </el-col>
            <el-col :span="3"> {{ new Date(item.createdAt).toLocaleTimeString() }} </el-col>
        </el-row>
    </div>
</template>

<script setup name="local_video">
import { localFileList } from '../../api/modules/index';
import { onMounted, reactive, ref, nextTick, onActivated } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
const dataList = ref([])
const pathpath = ref("")
const sortedStatus = reactive({
    createdAt: -1,
    name: -1,
    size: -1,
})
onMounted(() => {
    localFileList(pathpath.value).then(res => {
        dataList.value = res.data
    })
})

const orderBy = (bytag) => {

    let oldList = dataList.value
    if (sortedStatus[bytag]) {
        sortedStatus[bytag] = -1 * sortedStatus[bytag]
    }
    dataList.value = oldList.sort((a, b) => {
        return sortedStatus[bytag] * (a[bytag] > b[bytag] ? -1 : 1)
    })

}

const preview_video = async (href, title) => {
    route.push({
        "name": "video-preview",
        "params": { href: "/video/" + pathpath.value + '/' + title, title: title },
    });
}

const visit_dir = async (path) => {
    pathpath.value = path;
    localFileList(pathpath.value).then(res => {
        dataList.value = res.data
    })
}
</script>