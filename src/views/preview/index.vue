<template>
  <div>
    <div v-loading="table_config.isloading">
      <el-row :span="24">
        <el-col class="content-item" :span="22" :lg="23">
          <!-- <el-col :span="24"> -->
          <el-input v-model="search_content" type="text" @keyup.enter.native="handleSearch()" style="max-width: 94vw" placeholder="关键词" class="input-with-select">
            <template #prepend>
              <el-select v-model="searchselectValue"  style="width:100px;">
                <el-option v-for="item in search_option" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
            <template #append>
              <el-button :icon="Search" @click="handleSearch" />
            </template>
            <template #suffix>
              <el-select v-model="selectValue" placeholder="类别" style="width: 110px;margin-right:-11px" class="select1">
                <el-option v-for="item in selectoptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-input>
        </el-col>
        <el-col :span="2" :lg="1"  >
          <el-switch v-model="showPic" width="30" style="transform: rotate(90deg);"></el-switch>
        </el-col>
      </el-row>

      <el-row :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
        <el-col :xs="6" :sm="8" :md="8" :lg="8" :xl="8">
          <el-link @click="handleCurrentChange(pagination_config.currentPage - 1)" style="padding-left: 10px;">
            上一页</el-link>
        </el-col>
        <el-col :xs="13" :sm="8" :md="8" :lg="8" :xl="8" class="page-size-content">
          <h3 class="font-color">第{{ pagination_config.currentPage }}页</h3>
        </el-col>
        <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6" style="text-align: right;">
          <el-link @click="handleCurrentChange(pagination_config.currentPage + 1)"> 下一页</el-link>
        </el-col>
      </el-row>

      <!-- data -->
      <el-row class="content_row">
        <el-scrollbar style="height: calc(90vh - 120px)" ref="congtentScrollbar">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="content-item" v-for="(it, idx) in table_config.data">
            <div class="grid-content">
              <div style="display:none">
                {{ it.id }}
              </div>
              <div style="width: 300px;height: 230px; text-align:center"
                @click="preview_video(it.href, it.imgurl, it.title)">
                <el-image style="max-width: 100%;max-height: 100%;" :src="it.imgurl" v-show="showPic" />
              </div>
              <div class="multi-line2">
                {{ it.title }}
              </div>
              <div>
                <el-row style="padding: 8px 0 8px 0;">
                  <!-- 作者名字 -->
                  <el-col :span="12" class="single-line-truncate"> 作者: {{ it.otherInfo["作者"] }}</el-col>
                  <el-col :span="4">
                    <el-link type="success" @click="love(it)">点赞</el-link>
                  </el-col>
                  <el-col :span="4">
                    <el-link type="danger" @click="star(it)">收藏</el-link>
                  </el-col>
                  <el-col :span="4">
                    <el-link type="warning" @click="down(it.href, it.title)">下载</el-link>
                  </el-col>
                </el-row>
                <el-row>
                  <!-- 点赞数量 -->
                  <el-col :span="8" class="info" style="vertical-align: text-top;display:inline">
                    <div>
                      <el-icon style="top:2px">
                        <el-icon>
                          <CollectionTag />
                        </el-icon>
                      </el-icon>
                      热度
                      {{ it.otherInfo["热度"] }}
                    </div>
                  </el-col>
                  <el-col :span="8" class="info">
                    <div>
                      <el-icon style="top:2px">
                        <Star />
                      </el-icon>
                      收藏
                      {{ it.otherInfo["收藏"] }}
                    </div>
                  </el-col>
                  <el-col :span="8" class="info">
                    <div>
                      <el-icon style="top:2px">
                        <el-icon>
                          <ChatLineRound />
                        </el-icon>
                      </el-icon>
                      留言
                      {{ it.otherInfo["留言"] }}
                    </div>
                  </el-col>

                </el-row>

              </div>
            </div>

          </el-col>
        </el-scrollbar>
      </el-row>

      <!-- 分頁 -->
      <el-row style="margin-top: 15px;">
        <el-col>
          <div style="margin-top: -15px">
            <el-pagination v-model:current-page="pagination_config.currentPage"
              v-model:page-size="pagination_config.pageSize" :small="pagination_config.small"
              :pager-count="pagination_config.pagerCount" :background="pagination_config.background"
              :layout="pagination_config.layout" :total="pagination_config.total" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup name="video_page">
import { downApi, showIndexList, searchIndexList, loadVideoLink } from '../../api/modules/index';
import { onMounted, reactive, ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
import { Search } from '@element-plus/icons-vue';

const route = useRouter()
const congtentScrollbar = ref(null)
const search_content = ref("")
const table_config = reactive({
  isloading: false,
  data: []
})
const selectoptions = [{
  value: 'category=ori&viewtype=basic',
  label: '91原创',
}, {
  label: '当前最热',
  value: 'category=hot&viewtype=basic',
}, {
  label: '本月最热',
  value: 'category=top&viewtype=basic',
}, {
  label: '非付费',
  value: 'category=nonpaid&viewtype=basic',
}, {
  label: '10min以上',
  value: 'category=long&viewtype=basic',
}, {
  label: '20min以上',
  value: 'category=longer&viewtype=basic',
}, {
  label: '本月收藏',
  value: 'category=tf&viewtype=basic',
}, {
  label: '本月加精',
  value: 'category=rf&viewtype=basic',
}, {
  label: '高清',
  value: 'category=hd&viewtype=basic',
}, {
  label: '每月最热',
  value: 'category=top&m=-1&viewtype=basic',
}, {
  label: '本月收藏',
  value: 'category=tf&viewtype=basic',
}, {
  label: '本月讨论',
  value: 'category=md&viewtype=basic',
}, {
  label: '收藏最多',
  value: 'category=mf&viewtype=basic',
},

]
const search_option = [
  {
    value: 'search_videos',
    label: '搜索视频',
  },
  {
    value: 'search_video_id',
    label: 'VideoID',
  },
  {
    value: 'search_users',
    label: '搜索用户',
  }
]
const selectValue = ref('category=hot&viewtype=basic')
const searchselectValue = ref('search_videos')
const showPic = ref()
const content_height = ref(69)

const love = (args) => {
  alert("点赞了" + args)
}
const star = (args) => {
  alert("收藏了" + args)
}
const down = async (link, name) => {
  let response = await downApi(link, name).then(res => {
    ElMessage.success("[" + name + "] - " + res.data);
  }).catch(err => {
    ElMessage.error(err);
  })
}
// 分页组件属性和事件
const pagination_config = reactive({
  currentPage: 1,
  pageSize: 24,
  small: true,
  background: false,
  total: 0,
  pagerCount: 5,
  layout: "prev, pager, next, jumper"

})
const handleSizeChange = (args) => {
  pagination_config.pageSize = args
}
const handleCurrentChange = (args) => {
  if (args <= 0) {
    args = 1
  }
  if (args >= pagination_config.pagerCount) {
    args = pagination_config.pagerCount
  }
  pagination_config.currentPage = args
  handleSearch()
}

/**需要登录挺麻烦的**/
const handleSearch = () => {
  if (search_content.value)
    searchTableData(search_content.value, searchselectValue.value)
  else {
    loadTableData();
  }
}


const resizeWindows = () => {
  if (window.innerWidth < 768) {
    pagination_config.small = true
    pagination_config.pagerCount = 5
    pagination_config.background = false
    pagination_config.layout = "prev, pager, next, jumper"
    content_height.value = 69 
  } else {
    pagination_config.small = false
    pagination_config.pagerCount = 21
    pagination_config.background = true
    pagination_config.layout = "prev, pager, next, jumper"
    content_height.value = 75


  }
  // 设置内容居中
  // 获取元素宽度
  // let list = document.getElementsByClassName("content-item")
  // if(list.length>0){
  //   let item = list[0]
  //   let item_width = item.clientWidth
  //   let page_width = window.innerWidth;
  //   let other = page_width % item_width;
  //   const content_row = document.getElementsByClassName("content_row")[0]
  //   content_row.style.left = (other/2) +'px';
  // }
}

const loadTableData = () => {
  table_config.isloading = true
  showIndexList(pagination_config.currentPage, selectValue.value).then(data => {
    if (data.data.errorbox) {
      return Promise.reject(data.data.errorbox)
    }
    table_config.data = data.data.data;
    pagination_config.total = data.data.totalPage * pagination_config.pageSize
    table_config.isloading = false
    // 回到最上面
    congtentScrollbar.value.setScrollTop(0)
  }).catch(err => {
    ElMessage.error(err)
    table_config.isloading = false
  })
  setTimeout(() => {
    if (table_config.isloading) {
      table_config.isloading = false
    }
  }, 5000);
}
const searchTableData = (keywords, type) => {
  table_config.isloading = true
  searchIndexList(keywords, type, pagination_config.currentPage).then(data => {
    if (data.data.errorbox) {
      return Promise.reject(data.data.errorbox)
    }
    table_config.data = data.data.data;
    pagination_config.total = data.data.totalPage * pagination_config.pageSize
    table_config.isloading = false
    // 回到最上面
    congtentScrollbar.value.setScrollTop(0)
  }).catch(err => {
    ElMessage.error(err)
    table_config.isloading = false
  })
  setTimeout(() => {
    if (table_config.isloading) {
      table_config.isloading = false
    }
  }, 5000);
}

const init = () => {
  resizeWindows()
  // loadTableData()
}

onMounted(() => {
  init()
  // / 监听浏览器窗口变化，动态计算表格高度，
  window.onresize = () => {
    return resizeWindows()
  }
})

const preview_video = async (href, img, title) => {
  let response = await loadVideoLink(href);
  route.push({
    "name": "video-preview",
    "params": { href: response.data, img: img, title: title },
  });
}

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
  padding-right: 5px;
  font-size: 15px;
  margin: 0 auto;
  font-family: Inter, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \5fae\8f6f\96c5\9ed1, Arial, sans-serif;
}

.grid-content {
  border-radius: 4px;
  padding: 10px 15px 5px 15px;
  padding-bottom: 20px;
  margin-bottom: 10px !important;
  height: 320px;
  width: 300px;
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
  height: 40px;
}

.info {
  font-size: 13px;
  font-weight: 500;
}

@keyframes widthzero {
  0% {
    width: 50px;
    padding: 0 11px;
  }

  50% { 
    opacity: 0.3; 
  } 
  75% { 
    opacity: 0.1; 
  } 
  100% {
    width: 0px;
    padding: 0px;
    opacity: 0;
  }
}
:deep(.el-input__inner:hover + .el-input__suffix) {
  animation-name: widthzero;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}
.content_row{
  border-top: 1px solid rgb(184, 182, 182) ;
  padding: 5px 0px;
  border-bottom: 1px solid rgb(184, 182, 182) ;
}
</style>;
