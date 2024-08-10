<template>
  <el-row class="data-lists">
    <el-col>
      <h1>todoList:</h1>
      <ol>
        <li v-for="(it, idx) in todoList">{{ idx + 1 }}.
          <template v-if="it.isDone"><del>{{ it.title }}</del> </template>
          <template v-else>{{ it.title }} &nbsp;&nbsp;&nbsp;</template>
          <template v-if="!!it.link"> <el-link type="primary" :href="it.link" style="margin-left:30px">点我查看 </el-link> </template>
        </li>
      </ol>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const todoList = ref([])

const initData = () => {
  todoList.value.push({ isDone: true, title: "搭建框架" })
  todoList.value.push({ isDone: true, title: "完成div布局学习，使用完成flex 表格布局", link: "#/flex-layout" })
  todoList.value.push({ isDone: true, title: "完成本地浏览接口", link: "#/list-localfile" })
}
const addTabs = (link) => {
  route.push(link)
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
