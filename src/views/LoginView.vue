<template>
  <div class="login-wrap">
    <el-card>
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
        label-width="auto" class="demo-ruleForm">
        <el-form-item label="帳號" prop="userName" label-position="top">
          <el-input v-model="ruleForm.userName" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密碼" prop="pass" label-position="top">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="Confirm" prop="checkPass" label-position="top">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登入
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user';
const router = useRouter();
const userStore = useUserStore();
const ruleFormRef = ref()



const validateUserName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the UserName'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  userName: '',
  pass: '',
  checkPass: '',
})

const rules = reactive({
  userName: [{ validator: validateUserName, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 登入驗證
      if (ruleForm.userName === 'user' && ruleForm.pass === 'pass') {
        userStore.login(ruleForm.userName);
        const redirect = router.currentRoute.value.query.redirect || '/';
        router.push(redirect);
      } else {
        alert('無效的帳號或密碼');
      }
    } else {
      console.log('error submit!');
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
.el-card {
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>