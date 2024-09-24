<template>
  <div class="login-wrap">
    <el-card shadow="always">
      <template #header>
        <div class="card-header">
          <h1 style="text-align: center;">人事資料管理系統</h1>
        </div>
      </template>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
        <el-form-item label="帳號" prop="account" label-position="top">
          <el-input v-model="ruleForm.account" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item label="密碼" prop="password" label-position="top">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" show-password />
        </el-form-item>
        <!-- <el-form-item label="Confirm" prop="checkPass" label-position="top">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item> -->
        <!-- {{ key }}<br> -->
        <!-- name:{{ userN }} -->
        <div style="display: flex; justify-content: center;margin-top: 50px;">
          <div>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              登入
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            <!-- <el-button @click="addItem()">新增</el-button> -->
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import { useEmployeeStore } from '../stores/employee';
import { ElMessage } from 'element-plus';
import { db } from '../api/firebaseConfig';
import {
  getDatabase, ref as dbRef, onValue, push as dbPush, remove, query, equalTo, orderByChild, set
} from 'firebase/database';
import { useRouter } from 'vue-router'
const router = useRouter();
const employeeStore = useEmployeeStore();
const ruleFormRef = ref()

const userN = ref({})

let obj = ref({
  key: 'abc123123',//帳號+密碼
  userName: '許弘毅',//用戶名
  role: '1',//權限等級 1:員工 2:主管 3:人事
  basicInformation: {
    "arrivalDate": "2023-01-15",
    "bank": {
      "account": "123456789012",
      "branchName": "台北市南門分行"
    },
    "birthday": "1985-03-22",
    "computerExpertise": [
      "JavaScript",
      "Java",
      "Python"
    ],
    "department": "數位發展處",
    "drvingLicense": [
      "機車"
    ],
    "email": "zhangsan@example.com",
    "emergencyContact": {
      "mobile": "0987654321",
      "name": "李四",
      "phone": "02-87654321",
      "relationship": "兄弟"
    },
    "employeeId": "E001",
    "homePhone": "02-12345678",
    "idCardBackImageUrl": "https://firebasestorage.googleapis.com/v0/b/employeesystemproject.appspot.com/o/images%2F%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-08-06%20132612.png?alt=media&token=19a4c2e1-e9bc-4525-8cc4-d8eb657ad44f",
    "idCardFrontImageUrl": "https://firebasestorage.googleapis.com/v0/b/employeesystemproject.appspot.com/o/images%2Fimg.jpg?alt=media&token=426bebb1-f32e-4666-9496-7e7a9d557938",
    "idNumber": "A123456789",
    "ifEnable": true,
    "key": "-O3C40kxjE_Ta6sYf0Ls",
    "languages": [
      "中文",
      "英文"
    ],
    "mailingAddress": "台北市中正區中山路1號",
    "maritalStatus": "已婚",
    "name": "許弘毅",
    "phone": "0912345678",
    "professionalLicense": "資訊安全管理師",
    "profileImageUrl": "https://firebasestorage.googleapis.com/v0/b/employeesystemproject.appspot.com/o/images%2Flabubu.jpg?alt=media&token=23e33f9a-6916-4349-b002-49cbda38f806",
    "residenceAddress": "台北市中正區中山路1號",
    "schools": [
      {
        "department": "資訊工程系",
        "name": "台灣大學",
        "period": [
          "2007-01",
          "2011-12"
        ]
      },
      {
        "department": "資訊工程系",
        "name": "成功大學",
        "period": [
          "2007-01",
          "2011-12"
        ]
      },
      {
        "department": "化工系",
        "name": "清華大學",
        "period": [
          "2024-01",
          "2025-04"
        ]
      }
    ],
    "sex": "男",
    "specialStatus": [
      "原住民"
    ],
    "workExperience": [
      {
        "company": "ABC科技公司",
        "leavingReason": "尋求更好發展",
        "period": [
          "2007-07",
          "2012-12"
        ],
        "position": "軟體工程師",
        "salary": 60000
      }
    ]
  },//人員資料表
  curriculumVitae: {
    annualProjects: [
      {
        period: ["2020-04", "2021-10"],
        projectName: "基於Web技術的跨平台應用開發研究",
        sponsorUnit: "國家自然科學基金委員會"
      },
      {
        period: ["2022-01", "2023-06"],
        projectName: "大型電商平台的前端架構優化",
        sponsorUnit: "某知名互聯網公司"
      }
    ],
    annualPublications: [
      { category: "碩士論文", name: "《前端性能優化的最佳實踐》", period: "2022-01" },
      { category: "期刊", name: "《現代前端開發指南》", period: "2023-06" }
    ],
    educationalQualifications: "台灣科技大學碩士",
    expertise: "前端開發",
    key: "-O3W9yqRjFHugD1_bTfn",
    name: "許弘毅",
    professionalLicense: "高級軟體工程師證書",
    workExperience: [
      { company: "ABC科技有限公司", period: ["2019-01", "2022-12"], position: "前端開發工程師" },
      { company: "XYZ互聯網公司", period: ["2023-01", "2024-08"], position: "前端團隊負責人" }
    ]
  },//個人簡歷
})


//新增人員
const addItem = () => {

  const itemsRef = dbRef(db, 'employees');
  // const itemsRef = dbRef(db, 'users');
  dbPush(itemsRef, obj.value);
};

const ruleForm = ref({
  account: '',//帳號
  password: '',//密碼
})
const key = computed(() => {
  return ruleForm.value.account + ruleForm.value.password
})
const rules = reactive({
  account: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }]
})

const submitForm = (formEl) => {

  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      //驗證成功
      let itemsRef = dbRef(db, '/users');
      itemsRef = query(itemsRef, orderByChild('key'), equalTo(key.value));
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const keys = Object.keys(data);

          if (keys.length > 0) {
            const firstKey = keys[0];
            console.log(firstKey); // 這裡的 firstKey 就是 "-O3poUk0gA8ZdgKDFpIp"

            // 如果需要該 key 對應的資料
            const firstItem = data[firstKey];
            console.log(firstItem); // 這裡的 firstItem 是該 key 對應的資料
            userN.value = firstItem
            let role = firstItem.role;
            employeeStore.setUserInfo(firstItem)

            if (role === '2' || role === '3') {
              router.push('/employeeList');
            } else if (role === '1') {
              router.push('/form');
            } else {
              // reset
              router.push('/login');
            }
          }
        } else {
          console.log("No data found");
        }
      });
    } else {
      //驗證失敗
      ElMessage({
        message: '驗證失敗，請檢查輸入',
        type: 'error',
      });
    }
  });
};

const resetForm = (formEl) => {
  ruleForm.value.account = ''
  ruleForm.value.password = ''
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
.login-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-card {
  padding: 30px;
  min-width: 600px;
  min-height: 400px;
}
</style>