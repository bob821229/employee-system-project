<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" :ellipsis="false">
        <el-menu-item index="/form">人員資料表</el-menu-item>
        <el-menu-item index="/about">個人簡歷</el-menu-item>
        <el-menu-item index="/employeeList" v-if="role != '1'">人員資料表清單</el-menu-item>


        <span style="margin-left: auto; display: flex; align-items: center;margin-right: 10px;">
            <el-dropdown>
                <span class="el-dropdown-link" style="display: flex; align-items: center;">
                    <el-icon :size="20" color="#fff" style="margin-right: 8px;">
                        <UserFilled />
                    </el-icon>
                    <span style="color: #fff;">{{ userName }}</span>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </el-menu>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
const employeeStore = useEmployeeStore();
const userName = ref(employeeStore.getUserInfo.userName || '未登入')
const role = ref(employeeStore.getUserInfo.role || '0')
const router = useRouter();

const route = useRoute()
//目前路徑
const activeIndex = computed(() => route.path)
function logout() {
    //登出
    router.push('/');
}


</script>

<style scoped lang="scss">
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
}
</style>