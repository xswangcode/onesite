<template>
    <div>
        <h2>预览</h2>
        <div>
            <el-row>
                <el-col :xs="1" :sm="4" :md="6" :lg="8" :xl="12"   v-for="(it, idx) in maxDataSize" >
                    <div class="content-item">
                        <div  class="grid-content ep-bg-purple">{{ idx + 1 }}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const showTableList = ref([])
const maxDataSize = ref(24)


</script>

<style scoped>
.el-col {
    border-radius: 4px;
}
.content-item{
    padding: 10px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.ep-bg-purple-light {
    background-color: red;

}

.ep-bg-purple {
    background-color: #66ccff;
}
</style>;
