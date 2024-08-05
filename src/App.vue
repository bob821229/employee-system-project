<template>
  <div class="common-layout">
    <el-container>

      <!-- 導覽列 -->
      <el-header v-if="!isLoginPage">
        <Header></Header>
      </el-header>

      <!-- 主內容 -->
      <el-main :class="{ 'login': isLoginPage }">
        <RouterView />
      </el-main>

      <!-- 頁腳 -->
      <el-footer v-if="!isLoginPage">
        Footer
      </el-footer>

    </el-container>
  </div>



</template>
<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue'
import { computed } from 'vue';
// 获取当前路由
const route = useRoute();

// 计算属性，用于判断当前路由是否是登录页
const isLoginPage = computed(() => route.path === '/login');
</script>

<style scoped>
.el-main {
  min-height: calc(100vh - 120px);
}

.login {
  height: 100vh;
}


.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: #f5f7fa;
}

.el-header {
  padding: 0;
}
</style>
