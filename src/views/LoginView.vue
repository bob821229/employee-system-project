<template>
  <div class="login-wrap">
    <el-card shadow="always">
      <template #header>
        <div class="card-header">
          <h1 style="text-align: center;">人事資料管理系統</h1>
        </div>
      </template>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
        <el-form-item label="網域帳號" prop="email" label-position="top">
          <el-input v-model="ruleForm.email" autocomplete="off" clearable @keyup.enter="login(ruleFormRef)" />
        </el-form-item>
        <el-form-item label="密碼" prop="password" label-position="top">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" show-password
            @keyup.enter="login(ruleFormRef)" />
        </el-form-item>
        <el-form-item label="" label-position="top">
          <el-checkbox v-model="rememberMe" label="記住我" />
        </el-form-item>
        <!-- {{ key }}<br> -->
        <div style="display: flex; justify-content: center;margin-top: 50px;">
          <div>
            <!-- <el-button type="primary" @click="submitForm(ruleFormRef)">
              登入
            </el-button> -->
            <el-button type="primary" @click="login(ruleFormRef)">
              登入
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            <el-button @click="addItem()" v-if="false">新增</el-button>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, ref, computed, onMounted, inject } from 'vue'
import { useEmployeeStore } from '../stores/employee';
import { ElMessage,ElLoading } from 'element-plus';
import { db } from '../api/firebaseConfig';
import {
  getDatabase, ref as dbRef, onValue, push as dbPush, remove, query, equalTo, orderByChild, set
} from 'firebase/database';
import { useRouter } from 'vue-router';
import { apiLogin, apiGetProfile, apiGetMetaDataList } from '../api/api';
//引用dayjs
const dayjs = inject('dayjs')
const router = useRouter();
const employeeStore = useEmployeeStore();
const ruleFormRef = ref()
//記住我選項
const rememberMe = ref(false)
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
onMounted(async () => {
  await fetchOptions()
  // 檢查是否有保存的帳號
  checkLocalStorage()
})

const options = ref({})
//取得下拉選單
async function fetchOptions() {
  try {
    const result = await apiGetMetaDataList()
    console.log("@@opts:", result.data)
    options.value = result.data
  } catch (error) {
    console.log(error)
  }
}
//新增人員
const addItem = () => {
  const itemsRef = dbRef(db, 'users');
  dbPush(itemsRef, obj.value);
};
// 檢查是否有保存的帳號
const checkLocalStorage = () => {
  const savedUserAccount = localStorage.getItem('savedUserAccount');

  // 如果有保存的帳號，則自動填充到表單中
  if (savedUserAccount) {
    ruleForm.value.email = savedUserAccount; // 自動填充帳號
  }
}
//登入表單
const ruleForm = ref({
  email: '',//帳號
  password: '',//密碼
})
// 帳號+密碼模擬登入(firebase用)
const key = computed(() => {
  return ruleForm.value.email + ruleForm.value.password
})
// 表單驗證規則
const rules = reactive({
  email: [{ required: true, message: '請輸入正確的網域帳號', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }]
})
// 登入(firebase用)
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
            // ========以下存取帳號==========
            if (rememberMe.value) {
              // 把信箱存到 localStorage
              localStorage.setItem('savedUserAccount', ruleForm.value.email);
            } else {
              // 把 localStorage 中的帳號刪除
              localStorage.removeItem('savedUserAccount');
            }
            // =============================
            const firstKey = keys[0];
            console.log(firstKey); // 這裡的 firstKey 就是 "-O3poUk0gA8ZdgKDFpIp"

            // 如果需要該 key 對應的資料
            const firstItem = data[firstKey];
            firstItem.firebaseKey = firstKey;
            console.log(firstItem); // 這裡的 firstItem 是該 key 對應的資料
            let role = firstItem.role;
            console.log("使用者資訊:", firstItem);
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
//登入
const login = async (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const loadingInstance1 = ElLoading.service({ fullscreen: true })
      try {
        // const response= await apiLogin()
        let params = {
          id: ruleForm.value.email,
          key: ruleForm.value.password
        }
        // const response= await testApi(loginFailed)
        const response = await apiLogin(params)
        console.log("登入狀態:", response.data)
        if (!response.data.success) {
          ElMessage({
            message: response.data.message,
            type: 'error',
          });
        } else {
          //取得員工資料
          // const employeeData = await testApi('userInfo1.json')
          //存取帳號
          savedUserAccount()
          // const employeeData = await testApi('userInfo3.json')
          const employeeData = response.data
          // const employeeData = await testApi('userInfo3.json')
          console.log("員工資料:", employeeData.data)
          let role = employeeData.data.role
          employeeStore.setUserInfo(employeeData.data)
          if (role === '2' || role === '3') {
            router.push('/employeeList');
          } else if (role === '1') {
            const result = await apiGetProfile()
            let formatData = dataFormatHandle(result.data)
            console.log("整理後e資料表:", formatData)
            employeeStore.setTmpBasicInformation(formatData)
            router.push('/form');
          } else {
            router.push('/login');
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        loadingInstance1.close()
      }
    } else {
      //驗證失敗
      ElMessage({
        message: '驗證失敗，請檢查輸入',
        type: 'error',
      });
    }
  });

}
const savedUserAccount = () => {
  // ========以下存取帳號==========
  if (rememberMe.value) {
    // 把信箱存到 localStorage
    localStorage.setItem('savedUserAccount', ruleForm.value.email);
  } else {
    // 把 localStorage 中的帳號刪除
    localStorage.removeItem('savedUserAccount');
  }
}
// 重製表格
const resetForm = (formEl) => {
  ruleForm.value.email = ''
  ruleForm.value.password = ''
  if (!formEl) return
  formEl.resetFields()
}

function getDepartmentValue(department,departmentFromADServer) {
  if(department){
    return department
  }else{
    const departmentIndex = options.value.departmentList.findIndex(d => d.text === departmentFromADServer);
    return departmentIndex >= 0 ? options.value.departmentList[departmentIndex].value : null;
  }
}
function dataFormatHandle(data) {
  // 輔助函數：格式化日期
  const formatDate = (date) => date ? dayjs(date).format('YYYY-MM-DD') : null;

  // 輔助函數：格式化陣列
  const formatArray = (arr) => arr?.map(item => item.text) ?? [];

  // 處理部門
  // data.department = data.departmentFromADServer
  //   ? getDepartmentValue(data.departmentFromADServer)
  //   : null;
  data.department = getDepartmentValue(data.department,data.departmentFromADServer)

  // 格式化日期字段
  data.arrivalDate = formatDate(data.arrivalDate);
  data.lastWorkingDate = formatDate(data.lastWorkingDate);
  data.birthday = formatDate(data.birthday);

  // 處理緊急聯絡人
  data.emergencyContacts = data.emergencyContacts?.length === 0
    ? [{ mobile: null, name: null, phone: null, relationship: null, rid: null }]
    : data.emergencyContacts;

  // 處理工作經歷
  data.workExperiences = data.workExperiences?.map(item => ({
    ...item,
    period: [dayjs(item.startFrom).format('YYYY-MM'), dayjs(item.endAt).format('YYYY-MM')]
  })) ?? [];

  // 處理教育經歷
  data.educationExperiences = data.educationExperiences?.map(item => ({
    ...item,
    period: [dayjs(item.startFrom).format('YYYY-MM'), dayjs(item.endAt).format('YYYY-MM')]
  })) ?? [];
  if (data.educationExperiences?.length === 0) {
    data.educationExperiences.push({
      rid: null,
      name: null,
      academicDegree: null,
      department: null,
      degreeStatus: null,
      period: [null, null]
    });
  }

  // 處理其他陣列字段
  data.drvingLicense = formatArray(data.drvingLicense);
  data.specialStatus = formatArray(data.specialStatus);
  data.languages = formatArray(data.languages);
  data.computerExpertise = formatArray(data.computerExpertise);
  data.professionalLicense = formatArray(data.professionalLicense);

  return data;
}
// 人員資料表資料格式化
function dataFormatHandle1(data) {
  //第一次登入還沒有員工資料時，從AD Server取得資料
  if (!data.department) {
    //部門 格式化
    const tmpDepartment = data.departmentFromADServer;
    if (tmpDepartment) {
      data.department = getDepartmentValue(tmpDepartment);
    } else {
      data.department = null;
    }
  }

  //到職日 格式化
  data.arrivalDate?dayjs(data.arrivalDate).format('YYYY-MM-DD'):null
  //離職日 格式化
  data.lastWorkingDate?dayjs(data.lastWorkingDate).format('YYYY-MM-DD'):null
  //到職日 格式化
  data.birthday?dayjs(data.birthday).format('YYYY-MM-DD'):null
  //緊急聯絡人 格式化
  if(data.emergencyContacts){
    if (data.emergencyContacts.length == 0) {
        data.emergencyContacts=[]
        data.emergencyContacts.push({
          mobile: null,//緊急聯絡人手機
          name: null,//緊急聯絡人名稱
          phone: null,//緊急聯絡人電話
          relationship: null,//緊急聯絡人關係
          rid: null//緊急聯絡人編號
        })
    }
  }
  
  // 工作經歷 格式化
  if(data.workExperiences){
    data.workExperiences.forEach((item) => {
      let startDate = dayjs(item.startFrom).format('YYYY-MM')
      let endDate = dayjs(item.endAt).format('YYYY-MM')
      item.period = [startDate, endDate]
    })
  }else{
    data.workExperiences=[]
  }
  
  
  //教育經歷 格式化
  if(data.educationExperiences){
    data.educationExperiences.forEach((item) => {
      let startDate = dayjs(item.startFrom).format('YYYY-MM')
      let endDate = dayjs(item.endAt).format('YYYY-MM')
      item.period = [startDate, endDate]
    })
  }
  if(data.educationExperiences){
    if (data.educationExperiences.length == 0) {
      data.educationExperiences=[]
      data.educationExperiences.push({
        rid: null,
        name: null,
        academicDegree: null,
        department: null,
        degreeStatus: null,
        period: [null, null],
      })
    }
  }
  //駕照 格式化
  if(data.drvingLicense){
    if (data.drvingLicense.length > 0 ) {
      const arr = data.drvingLicense.map(item => item.text);
      console.log("整理後e資料表駕照:", arr);
      data.drvingLicense = arr;
    }else{
      data.drvingLicense=[]
    }
  }
  //特殊身分 格式化
  if(data.specialStatus){
    if (data.specialStatus.length > 0) {
      const arr = data.specialStatus.map(item => item.text);
      console.log("整理後e資料表身分:", arr);
      data.specialStatus = arr;
    }
  }
  //語言 格式化
  if(data.languages){
    if (data.languages.length > 0) {
      const arr = data.languages.map(item => item.text);
      console.log("整理後e資料表語言:", arr);
      data.languages = arr;
    }
  }
  //特殊專長 格式化
  if(data.computerExpertise){
    if (data.computerExpertise.length > 0) {
      const arr = data.computerExpertise.map(item => item.text);
      console.log("整理後e資料表專長:", arr);
      data.computerExpertise = arr;
    }
  }
  //專業證照 格式化
  if(data.professionalLicense){
    if (data.professionalLicense.length > 0) {
      const arr = data.professionalLicense.map(item => item.text);
      console.log("整理後e資料表證照:", arr);
      data.professionalLicense = arr;
    }
  }
  return data
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