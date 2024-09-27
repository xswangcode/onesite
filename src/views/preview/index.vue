<template>
  <div>
    <div v-loading="table_config.isloading">
      <el-row :span="24">
        <el-col class="content-item" :span="22" :lg="23">
          <!-- <el-col :span="24"> -->
          <el-input v-model="search_content" type="text" @keyup.enter.native="handleSearch()" style="max-width: 94vw"
            placeholder="关键词" class="input-with-select">
            <template #prepend>
              <el-select v-model="searchselectValue" style="width:100px;">
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
        <el-col :span="2" :lg="1">
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
        <el-scrollbar style="height: calc(90vh - 130px)" class="contetn_row_scrollbar" ref="congtentScrollbar">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="content-item" v-for="(it, idx) in table_config.data">
            <div class="grid-content">
              <div>
                <div class="flag flag-left">{{ idx+1  }}</div>
              </div>
            
              <div style="display:none">
                {{ it.id }}
              </div>
              <div style="width:100%; height:180px; text-align:center;"
                @click="preview_video(it.href, it.imgurl, it.title)">
                <el-image style="max-width:320px;height:180px;border-radius: 8px; " :src="it.imgurl" v-show="showPic" />
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
      <el-row style="margin-top: 20px;">
        <el-col>
          <div style="margin-top: -10px">
            <el-pagination v-model:current-page="pagination_config.currentPage"
              v-model:page-size="pagination_config.pageSize" :small="pagination_config.small"
              :pager-count="pagination_config.pagerCount" :background="pagination_config.background"
              :layout="pagination_config.layout" :total="pagination_config.total" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
        </el-col>
      </el-row>
      <div class="uptop" @click="upTop">
        <el-icon><Top /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup name="video_page">
import { downApi, showIndexList, searchIndexList, loadVideoLink } from '../../api/modules/index';
import { onMounted, reactive, ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
import store from '../../store/index.js'
import { Search } from '@element-plus/icons-vue';


const themeConfig = store.getters.themeConfig
const route = useRouter()
const congtentScrollbar = ref(null)
const search_content = ref("")
const table_config = reactive({
  isloading: false,
  data: [{ "id": 1010571, "href": "https://0729.9p47q.com/view_video.php?viewkey=0896600256c231055bf0&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010571.jpg", "title": "[原创] 家里沙发打桩本科空乘高颜值骚货（出完整版）", "otherInfo": { "添加时间": "44 小时  前", "作者": "szdysq199", "热度": "96152", "收藏": "1414", "留言": "25", "积分": "2000" } }, { "id": 1010572, "href": "https://0729.9p47q.com/view_video.php?viewkey=90973ecce66b85316539&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010572.jpg", "title": "约良家夜店骚妹子穿着丝袜看着就想艹 【点击简阶免费看续集完整版】", "otherInfo": { "添加时间": "42 小时  前", "作者": "Bbc柚子先生", "热度": "104980", "收藏": "1121", "留言": "12", "积分": "2000" } }, { "id": 1010593, "href": "https://0729.9p47q.com/view_video.php?viewkey=25dc2fca4697d4127aef&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010593.jpg", "title": "身材苗条小女友有点害羞 不及待想要啪啪 无套输出（点击简阶看完整版）", "otherInfo": { "添加时间": "42 小时  前", "作者": "大神约炮渠道", "热度": "57579", "收藏": "702", "留言": "8", "积分": "2000" } }, { "id": 1010587, "href": "https://0729.9p47q.com/view_video.php?viewkey=0e59b1ec802a7408b760&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010587.jpg", "title": "夜市大四女学生，一夜情完整版，多种角度 [点击简阶免费看完整版]", "otherInfo": { "添加时间": "42 小时  前", "作者": "小野郎君", "热度": "54899", "收藏": "712", "留言": "4", "积分": "2000" } }, { "id": 1010591, "href": "https://0729.9p47q.com/view_video.php?viewkey=401aa7251673a106414e&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010591.jpg", "title": "偷情短发良家人妻一直叫老公（点击简阶免费看完整版78分钟）", "otherInfo": { "添加时间": "42 小时  前", "作者": "gonganhuojing", "热度": "40924", "收藏": "774", "留言": "14", "积分": "2000" } }, { "id": 1010656, "href": "https://0729.9p47q.com/view_video.php?viewkey=856e3455fdba8fc344a3&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010656.jpg", "title": "[原创] 回归！百人斩之约炮朋友闺蜜小姨子超级骚货", "otherInfo": { "添加时间": "38 小时  前", "作者": "Sexbaby1", "热度": "57834", "收藏": "601", "留言": "13", "积分": "2000" } }, { "id": 1010494, "href": "https://0729.9p47q.com/view_video.php?viewkey=eb1606838459769fe7d3&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010494.jpg", "title": "[原创] 19岁的杨浦炮友 完整版已分享", "otherInfo": { "添加时间": "2 天  前", "作者": "bishangbi", "热度": "49180", "收藏": "560", "留言": "8", "积分": "2000" } }, { "id": 1010721, "href": "https://0729.9p47q.com/view_video.php?viewkey=4e715149d1367cbb9d6d&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010721.jpg", "title": "淫妻少妇在家偷情 高潮时候发现孩子在偷听", "otherInfo": { "添加时间": "26 小时  前", "作者": "子扬", "热度": "35690", "收藏": "614", "留言": "5", "积分": "0" } }, { "id": 1010535, "href": "https://0729.9p47q.com/view_video.php?viewkey=ad794b532b86447a181d&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010535.jpg", "title": "大学生情侣做爱，最真实的做爱【出各种大神合集】", "otherInfo": { "添加时间": "45 小时  前", "作者": "KG7981", "热度": "47035", "收藏": "521", "留言": "7", "积分": "2000" } }, { "id": 1010857, "href": "https://0729.9p47q.com/view_video.php?viewkey=7866facb0dc038b90a47&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010857.jpg", "title": "你们要的超神颜值眼镜妹，轻素颜无美颜纯天然（点击简阶免费看完整版）", "otherInfo": { "添加时间": "18 小时  前", "作者": "aimiyaw", "热度": "29899", "收藏": "650", "留言": "6", "积分": "0" } }, { "id": 1010696, "href": "https://0729.9p47q.com/view_video.php?viewkey=e07fb0de0d968fbb0724&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010696.jpg", "title": "这才是真正的多人天花板!轮番爆操射一胸刺激【点击简界免费看完整版】", "otherInfo": { "添加时间": "32 小时  前", "作者": "mi177duyanye", "热度": "32811", "收藏": "544", "留言": "5", "积分": "0" } }, { "id": 1010861, "href": "https://0729.9p47q.com/view_video.php?viewkey=7685ee037e3ec97c1a40&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010861.jpg", "title": "短发肥妹多次被操尿 床单湿透（点击简阶免费看女主完整版2部）", "otherInfo": { "添加时间": "18 小时  前", "作者": "Bbc柚子先生", "热度": "29245", "收藏": "510", "留言": "4", "积分": "0" } }, { "id": 1010804, "href": "https://0729.9p47q.com/view_video.php?viewkey=169202138&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010804.jpg", "title": "[原创] 2024年度最佳上海尤物交换", "otherInfo": { "添加时间": "22 小时  前", "作者": "bishangbi", "热度": "33351", "收藏": "443", "留言": "2", "积分": "0" } }, { "id": 1010801, "href": "https://0729.9p47q.com/view_video.php?viewkey=ddfee0e2fdd443c6430b&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010801.jpg", "title": "约拍170身材极品的小红书穿搭博主 随意蹂躏按摩棒插出白浆", "otherInfo": { "添加时间": "21 小时  前", "作者": "122417", "热度": "35214", "收藏": "358", "留言": "2", "积分": "0" } }, { "id": 1010453, "href": "https://0729.9p47q.com/view_video.php?viewkey=0c4f83324c73e432a6e8&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010453.jpg", "title": "后入健身房认识的波点黑丝妹妹", "otherInfo": { "添加时间": "2 天  前", "作者": "1798715142", "热度": "20741", "收藏": "441", "留言": "5", "积分": "2000" } }, { "id": 1010689, "href": "https://0729.9p47q.com/view_video.php?viewkey=0a45b937966a9b5050bb&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010689.jpg", "title": "[原创] 群友聚会认识的小姐姐 可以交换", "otherInfo": { "添加时间": "34 小时  前", "作者": "bishangbi", "热度": "38633", "收藏": "392", "留言": "10", "积分": "2000" } }, { "id": 1010539, "href": "https://0729.9p47q.com/view_video.php?viewkey=fb523215db99b5ed71bd&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010539.jpg", "title": "[原创] 黑丝骚妻性奴调教之路第三回", "otherInfo": { "添加时间": "46 小时  前", "作者": "家有骚妻调教中", "热度": "26403", "收藏": "348", "留言": "12", "积分": "2000" } }, { "id": 1010782, "href": "https://0729.9p47q.com/view_video.php?viewkey=2e79285633904cfcba87&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010782.jpg", "title": "女高！清纯/可爱小母狗（二）（有更多完整版……）", "otherInfo": { "添加时间": "23 小时  前", "作者": "zha2006", "热度": "19978", "收藏": "381", "留言": "3", "积分": "0" } }, { "id": 1010522, "href": "https://0729.9p47q.com/view_video.php?viewkey=416368436&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010522.jpg", "title": "极品肤白貌美大二学生妹，奶子大（完整版看禁止内容）", "otherInfo": { "添加时间": "47 小时  前", "作者": "smile98765", "热度": "32740", "收藏": "295", "留言": "11", "积分": "2000" } }, { "id": 1010541, "href": "https://0729.9p47q.com/view_video.php?viewkey=1809817018&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010541.jpg", "title": "极品反差少妇偷情", "otherInfo": { "添加时间": "45 小时  前", "作者": "Alxe6666", "热度": "22772", "收藏": "315", "留言": "6", "积分": "2000" } }, { "id": 1010697, "href": "https://0729.9p47q.com/view_video.php?viewkey=4ee0043c1144d5261c1d&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010697.jpg", "title": "3个单男轮操女友!场面失控淫乱视觉盛宴【点击简界免费看完整版】", "otherInfo": { "添加时间": "32 小时  前", "作者": "mi177duyanye", "热度": "21363", "收藏": "362", "留言": "2", "积分": "0" } }, { "id": 1010851, "href": "https://0729.9p47q.com/view_video.php?viewkey=3ed9629b07a138da1803&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010851.jpg", "title": "极品人妻少妇空姐琳琳和家里人打完电话换上黑丝（简阶免费看续集13部）", "otherInfo": { "添加时间": "18 小时  前", "作者": "gonganhuojing", "热度": "19074", "收藏": "371", "留言": "2", "积分": "0" } }, { "id": 1010864, "href": "https://0729.9p47q.com/view_video.php?viewkey=282101b30be2eacc0b72&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010864.jpg", "title": "【出各种大神合集】明眸妩媚少妇偷情", "otherInfo": { "添加时间": "12 小时  前", "作者": "chenrui123", "热度": "19020", "收藏": "390", "留言": "1", "积分": "0" } }, { "id": 1010518, "href": "https://0729.9p47q.com/view_video.php?viewkey=1255466447&page=1&c=zf342&viewtype=basic&category=hot", "imgurl": "https://1729130453.rsc.cdn77.org/thumb/1010518.jpg", "title": "[原创] 口爆淫女节选8分钟视频", "otherInfo": { "添加时间": "47 小时  前", "作者": "qaz6445996", "热度": "20476", "收藏": "309", "留言": "7", "积分": "2000" } }]
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
const css = reactive({contetnt_left_px:"" });

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
  // if (list.length > 0) {
    
  //   let item = list[0]
  //   let item_width = item.clientWidth-30
  //   let page_width = window.innerWidth;
  //   let other = page_width % item_width;
  //   css.contetnt_left_px = (other / 2) + 'px'
  //   console.log(css.contetnt_left_px+'px');
    
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

const upTop = ()=>{
  congtentScrollbar.value.setScrollTop(0)
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
  height: 280px;
  width: auto; /* 325px; */
  border: 1px solid #e3e3ee;
  background-color: rgb(249 249 249);
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

.content_row {
  border-top: 1px solid rgb(184, 182, 182);
  padding: 5px 0px;
  border-bottom: 1px solid rgb(184, 182, 182);
}

@media screen and (min-width: 1801px)  {
  .content-item {
    width: 16.6%;
  }
}

@media screen and (min-width: 1401px) and (max-width:1800px) {
  .content-item {
    width: 20%;
  }
}
@media screen and (min-width: 787px) and (max-width:1400px) {
  .content-item {
    width: 33%;
  }
}
/**平板*/
@media screen and (min-width: 501px) and (max-width:786px) {
  .content-item {
    width: 50%;
  }
}
/**手机*/
@media screen and (max-width: 500px) {
  .content-item {
      width: 100%;
  }
}


 .flag {
  position: relative;   
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 74px;
  background-color: v-bind("themeConfig.primary");
  color: #fff;
}
 .flag-left {
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  left: -32px;
  top: 0px;
}
 .flag-right {
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  right: -18px;
  top: 14px;
}

.uptop{
  top: -80px;
  position: relative;   
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 30px;
  float: right;
  right: 10px;
  border-radius: 25px;
  background-color: v-bind("themeConfig.primary");
  color: #fff;
}

</style>;
