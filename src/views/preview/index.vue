<template>
  <div>
    <div v-loading="table_config.isloading">
      <el-row :span="24">
        <el-col :span="24">
          <div style="width: 100vw">
            <h2>表格布局<el-switch v-model="showPic"></el-switch></h2>
          </div>
        </el-col>
      </el-row>

      <el-row :span="24">
        <el-col  class="content-item">
          <!-- <el-col :span="24"> -->
          <el-input v-model="search_content" style="max-width: 93vw" placeholder="关键词" class="input-with-select">
            <template #prepend>
              <el-select v-model="selectValue" placeholder="类别" style="width: 115px">
                <el-option v-for="item in selectoptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
            <template #append>
              <el-button style="width: 50px" :icon="Search" @click="handleSearch" />
            </template>
          </el-input>
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
      <el-row>
        <el-scrollbar height="70vh" ref="congtentScrollbar">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="content-item"
            v-for="(it, idx) in table_config.data">
            <div class="grid-content">
              <div style="display:none">
                {{ it.id }}
              </div>
              <div style="width: 380px;height: 255px;text-align:center"
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
      <el-row style="margin-top: 15px;">
        <el-col>
          <div style="margin-left:10px">
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

<script setup>
import { downApi, showIndexList, loadVideoLink } from '../../api/modules/index';
import { onMounted, reactive, ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
import { Search } from '@element-plus/icons-vue';

const route = useRouter()
const congtentScrollbar = ref(null)
const search_content = ref("")
const table_config = reactive({
  isloading: true,
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
  label: '10分钟以上',
  value: 'category=long&viewtype=basic',
}, {
  label: '20分钟以上',
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
const selectValue = ref('category=hot&viewtype=basic')
const showPic = ref()


const love = (args) => {
  alert("点赞了" + args)
}
const star = (args) => {
  alert("收藏了" + args)
}
const down = async (link, name) => {
  let response = await downApi(link, name).then(res => {
    ElMessage.success("[" + name + "]下载完成！");
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
  loadTableData()
}

/**需要登录挺麻烦的**/
const handleSearch = () => {
  if (search_content.value)
    alert(search_content.value)
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
  } else {
    pagination_config.small = false
    pagination_config.pagerCount = 10
    pagination_config.background = true
    pagination_config.layout = "prev, pager, next, jumper"

  }
}

const loadTableData = async () => {
  table_config.isloading = true
  let data = await showIndexList(pagination_config.currentPage, selectValue.value)
  table_config.data = data.data.data;
  pagination_config.total = data.data.totalPage * pagination_config.pageSize
  table_config.isloading = false
  // 回到最上面
  congtentScrollbar.value.setScrollTop(0)
}

const init = () => {
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
  padding: 10px;
  font-size: 15px;
  font-family: Inter, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \5fae\8f6f\96c5\9ed1, Arial, sans-serif;
}

.grid-content {
  border-radius: 4px;
  padding: 10px 10px 5px 10px;
  padding-bottom: 20px;
  height: 350px;
  width: 412px;
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


.info {
  font-size: 13px;
  font-weight: 500;
}
</style>;
