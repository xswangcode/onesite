<template>
    <div>
        <h2>表格布局</h2>
        <div v-loading="table_config.isloading">
            <el-row>
                <el-col :span="7"></el-col>
                <el-col :span="10" class="page-size-content">
                    <h3 class="font-color">第{{ pagination_config.currentPage }}页</h3>
                </el-col>
                <el-col :span="7"></el-col>
            </el-row>
            <el-row>
                <el-scrollbar height="70vh">
                    <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4" class="content-item" v-for="(it, idx) in maxDataSize">
                        <div class="grid-content">
                            <div> <el-image style=" height: 100%;"
                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
                            </div>
                            <div class="multi-line2">
                                文章名称-{{ it }}
                            </div>
                            <div>
                                <el-row>
                                    <!-- 点赞数量 -->
                                    <el-col :span="8" style="vertical-align: text-top;display:inline">
                                        <div>
                                            <el-icon style="top:2px">
                                                <Star />
                                            </el-icon>
                                            {{ idx }}
                                        </div>
                                    </el-col>
                                    <!-- 作者名字 -->
                                    <el-col :span="16" class="single-line-truncate"> 作者: 作者名字{{ it }} </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"> <el-link type="success" @click="love(it)">点赞</el-link></el-col>
                                    <el-col :span="16"> <el-link type="danger" @click="star(it)">收藏</el-link></el-col>
                                </el-row>
                            </div>
                        </div>

                    </el-col>
                </el-scrollbar>
            </el-row>
            <el-row style="margin-top: 15px;">
                <el-col>
                    <div style="margin-left:10px">
                        <el-pagination v-model:current-page="pagination_config.currentPage"
                            v-model:page-size="pagination_config.pageSize" :small="pagination_config.small"
                            :pager-count="pagination_config.pagerCount" :background="pagination_config.background"
                            :layout="pagination_config.layout" :total="pagination_config.total"
                            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref , onActivated} from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
const showTableList = ref([])
const maxDataSize = ref(24)
const table_config =reactive({
    isloading:true,
    data:[]
})


const love = (args) => {
    alert("点赞了" + args)
}
const star = (args) => {
    alert("收藏了" + args)
}
// 分页组件属性和事件
const pagination_config = reactive({
    currentPage: 1,
    pageSize: 24,
    small: true,
    background: false,
    total: 1000,
    pagerCount: 5,
    layout: "prev, pager, next, jumper"

})
const handleSizeChange = (args) => {
    pagination_config.pageSize = args
}
const handleCurrentChange = (args) => {
    pagination_config.currentPage = args 
    table_config.isloading = true
}

const resizeWindows = () => {
    if (window.innerWidth < 768) {
        pagination_config.small = true
        pagination_config.pagerCount = 5
        pagination_config.background = false
        pagination_config.layout = "prev, pager, next, jumper"
    }
    else {
        pagination_config.small = false
        pagination_config.pagerCount = 10
        pagination_config.background = true
        pagination_config.layout = "prev, pager, next, jumper"

    }
}

const loadTableData =  ()=>{
    let data = []
    table_config.data = data;
    table_config.isloading = false
}

const init = ()=>{
    resizeWindows()
    loadTableData()
}
init()
onMounted(() => {
    // / 监听浏览器窗口变化，动态计算表格高度，
    window.onresize = () => {
        return resizeWindows()
    }
})

</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
    border: 0px;
}

.page-size-content {
    text-align: center;

}

.font-color {
    color: rgb(52, 90, 90);
}

.el-col {
    border-radius: 4px;
}

.content {
    height: 400px;
}

.content-item {
    padding: 10px;
    font-size: 15px;
    font-family: serif;
}

.grid-content {
    border-radius: 4px;
    padding: 10px 10px 5px 10px;
    padding-bottom: 20px;
    height: auto;
    background-color: #e3e3e3;
    overflow: hidden;
}


.single-line-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.multi-line2 {
    width: 100%;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 这里是超出几行省略 */
    overflow: hidden;
}
</style>;
