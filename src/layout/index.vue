<template>
  <el-container class="container">
    <el-aside :style="{ backgroundColor: themeConfig.backgroundColor }"
      ><Menu></Menu
    ></el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <div class="main-tabs flx-row" v-if="themeConfig.istags">
          <tabs></tabs>
        </div>

        <div class="main-box">
          <router-view :class="{ shake: disabled }" v-slot="{ Component }">
            <transition>
              <KeepAlive >
                <component :is="Component" />
              </KeepAlive>
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="layout">
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, watch } from 'vue'
import store from '../store/index.js'
import Header from './header/index.vue'
import Menu from './menu/index.vue'
import tabs from './Tabs/index.vue'
const themeConfig = store.getters.themeConfig

let router = useRouter()
const disabled = ref(false) 
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      disabled.value = true
      setTimeout(() => {
        disabled.value = false
      }, 1000)
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
