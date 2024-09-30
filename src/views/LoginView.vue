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
            <el-button @click="addItem()">新增</el-button>
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
  key: 'abc789789',//帳號+密碼
  userName: '倪佩君',//用戶名
  role: '3',//權限等級 1:員工 2:主管 3:人事
  firebaseKey: '',//firebaseKey
  ifEnable: true,//是否啟用
  basicInformation: {
    arrivalDate: "2023-01-15",//到職日
    bank: {
      account: '123456789012',//銀行帳號
      branchName: '台北市南門分行',//分行名稱

    },//銀行資訊
    birthday: "1985-03-22",//生日
    computerExpertise: ["JavaScript",
      "Java",
      "Python"],//電腦專長
    department: '數位發展處',//進用部門
    drvingLicense: ["機車"],//駕照
    email: "zhangsan@example.com",//信箱
    emergencyContact: {
      mobile: '0987654321',// 行動電話
      name: '李四', // 緊急聯絡人姓名
      phone: '02-87654321', // 連絡電話
      relationship: '兄弟' // 關係
    },//緊急聯絡人資訊
    employeeId: 'E001',//人員編號
    homePhone: '02-12345678',//連絡電話
    idCardFrontImageUrl: "https://firebasestorage.googleapis.com/v0/b/employeesystemproject.appspot.com/o/images%2F%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202024-08-06%20132612.png?alt=media&token=19a4c2e1-e9bc-4525-8cc4-d8eb657ad44f", // 身分證正面照片 URL
    idCardBackImageUrl: "https://firebasestorage.googleapis.com/v0/b/employeesystemproject.appspot.com/o/images%2Fimg.jpg?alt=media&token=426bebb1-f32e-4666-9496-7e7a9d557938", // 身分證反面照片 URL
    idNumber: 'A123456789',//身分證號
    languages: ["中文", "英文"],//語言能力
    mailing: {
      address: '台北市中正區中山路1號',//通訊地址
      postalCode: '028',//郵遞區號
    },//通訊地址
    maritalStatus: '已婚',//婚姻狀況
    name: "倪佩君",//姓名
    phone: '0912345678',//行動電話
    positionTitle: '開發人員',//職稱
    professionalLicense: ['系統分析師 (CSM)'],//專業證照
    profileImageUrl: "https://firebasestorage.googleapis.com/v0/b/employeesystemproject.appspot.com/o/images%2Flabubu.jpg?alt=media&token=23e33f9a-6916-4349-b002-49cbda38f806", // 大頭貼 URL
    residence: {
      address: '台北市中正區中山路1號',//通訊地址
      postalCode: '028',//郵遞區號
    },//戶籍地址
    resignationDate: null,//離職日
    schools: [
      {
        academicDegree: '學士',//學位
        degreeStatus: "畢業",//畢業狀況
        name: "台灣大學",//學校名稱
        department: "資訊工程系",//科系
        period: ["2007-01",
          "2011-12"]//修業起訖年月
      }
    ],//學歷
    sex: '男',//性別
    specialStatus: ["原住民"],//特殊身分
    workExperience: [
      {
        company: "ABC科技公司",//公司名稱
        position: "軟體工程師",//職務名稱
        salary: 60000,//薪資
        leavingReason: "尋求更好發展",//離職原因
        period: ["2007-07",
          "2012-12"]//服務起訖年月
      }
    ],//職務經歷
  },//人員資料表
  curriculumVitae: {
    name: "倪佩君",//姓名
    educationalQualifications: '台灣科技大學碩士',//學歷
    expertise: '前端開發',//專長
    professionalLicense: ["高級軟體工程師證書", "GIS專業技術人員證照"],//專業證照
    workExperience: [
      { company: "ABC科技有限公司", period: ["2019-01", "2022-12"], position: "前端開發工程師" },
      { company: "XYZ互聯網公司", period: ["2023-01", "2024-08"], position: "前端團隊負責人" }
    ],//職務經歷
    annualPublications: [
      { category: "碩士論文", name: "《前端性能優化的最佳實踐》", period: "2022-01" },
      { category: "期刊", name: "《現代前端開發指南》", period: "2023-06" }
    ],//歷年著作
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
    ],//歷年計畫
  },//個人簡歷
})


//新增人員
const addItem = () => {

  // const itemsRef = dbRef(db, 'employees');
  const itemsRef = dbRef(db, 'users');
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
            firstItem.firebaseKey = firstKey;
            console.log(firstItem); // 這裡的 firstItem 是該 key 對應的資料
            // userN.value = firstItem
            let role = firstItem.role;
            employeeStore.setUserInfo(firstItem)

            if (role === '2' || role === '3') {
              router.push('/employeeList');
            } else if (role === '1') {
              router.push('/form');
            } else {
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