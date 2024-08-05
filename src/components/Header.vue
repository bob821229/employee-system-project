<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/">人員資料表</el-menu-item>
        <el-menu-item index="/about">個人簡歷</el-menu-item>
        

        <!-- <el-sub-menu index="2">
            <template #title>Workspace</template>
<el-menu-item index="about">About</el-menu-item>
<el-menu-item index="2-2">item two</el-menu-item>
<el-menu-item index="2-3">item three</el-menu-item>
<el-sub-menu index="2-4">
    <template #title>item four</template>
    <el-menu-item index="2-4-1">item one</el-menu-item>
    <el-menu-item index="2-4-2">item two</el-menu-item>
    <el-menu-item index="2-4-3">item three</el-menu-item>
</el-sub-menu>
</el-sub-menu> -->

    </el-menu>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref,computed } from 'vue'

const route = useRoute()
//目前路徑
const activeIndex= computed(() => route.path)

</script>

<style scoped lang="scss">


</style>