<template>
  <div
    id="guide"
    class="menu"
    :style="{
      width: store.getters.isCollapse == true ? '0px' : '150px',
      height: '100%',
      color: themeConfig.textColor,
    }"
  >
    <el-scrollbar style="height: 100%; max-height: 100vh">
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="store.getters.isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        :background-color="themeConfig.backgroundColor"
        :text-color="themeConfig.textColor"
        :active-text-color="themeConfig.primary"
      >
        <menuItems :menuList="menuList"></menuItems>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { getMenuList } from '../../api/modules/index.js'
import store from '../../store/index.js'
import menuItems from './components/menuItems.vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})
const menuList = ref([])
const handleOpen = (key, keyPath) => {
}
const handleClose = (key, keyPath) => {
}
const themeConfig = store.getters.themeConfig


onMounted(() => {
  getMenuList().then((res) => {
    menuList.value = res.data.data.menuList
  })
})
</script>

<style scoped lang="scss">
.menu {
  // width: 200px;
  .logo {
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
    img {
      width: 25px;
      vertical-align: middle;
    }
  }
}
</style>
