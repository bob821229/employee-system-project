<template>

  <div style="width: 100%;max-width: 1500px;margin: auto;">
    <div style="display: flex;justify-content: space-between;padding: 10px 0;">
      <el-button  plain v-if="false" @click="dialogFormVisible = true">
        新增人員
      </el-button>
      <el-input v-model="searchText" style="width: 240px" placeholder="搜尋" />
    </div>
    <el-table :data="paginatedData" style="width: 100%" size="large" 
      border>
      <el-table-column width="120" header-align="center" fixed prop="employeeId" label="人員編號" />
      <el-table-column width="150" header-align="center" prop="userName" label="姓名" />
      <el-table-column width="250" header-align="center" prop="departmentCaption" label="部門"
        :filters="departments" :filter-method="filterHandler" filter-multiple />
      <el-table-column header-align="center" prop="professionalLicenseJsonString" label="專業證照" />
      <el-table-column width="200" align="center" header-align="center" fixed="right" label="編輯" v-if="role === '3'">
        <template #default="scope">
          <!-- <el-button type="primary" plain @click="editHandler(scope.row)">修改</el-button> -->
          <el-button type="success" plain @click="confirmDelete(scope.row)">
            啟用
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" header-align="center" fixed="right" label="個人簡歷">
        <template #default="scope">
          <el-button type="primary" plain @click="checkHandler(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" header-align="center" fixed="right" label="權限管理" v-if="role === '3'">
        <template #default="scope">
          <el-button type="primary" plain @click="openDialog(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;width: 100%">
      <div class="el-pagination-wrap" style="display: inline-block;margin-top: 20px;">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        background
        layout=" total, prev, pager, next,sizes"
        :total="filteredTableData.length"
        @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

  <!-- 刪除確認彈框 -->
  <el-dialog v-model="centerDialogVisible" title="警告" width="500" align-center>
    <span>您確定要啟用該筆資料?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteItem">
          確定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogFormVisible" title="新增人員" width="500" :show-close="false" :close-on-press-escape="false"
    :close-on-click-modal="false">
    <el-form ref="ruleFormRef2" :model="user" :rules="userRules">
      <el-form-item label="用戶名稱" prop="userName">
        <el-input v-model="user.userName" placeholder="請輸入名稱" />
      </el-form-item>
      <el-form-item label="權限" prop="role">
        <el-select v-model="user.role" placeholder="請選擇權限">
          <el-option disabled label="請選擇" value="" />
          <el-option label="員工" value="1" />
          <el-option label="主管" value="2" />
          <el-option label="人事" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="帳號" prop="account">
        <el-input v-model="user.account" placeholder="請輸入帳號" />
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="user.password" placeholder="請輸入密碼" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetValidateForm(ruleFormRef2)">取消</el-button>
        <el-button type="primary" @click="submitForm2(ruleFormRef2)">
          確認
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogRoleVisible" title="權限管理" width="500" :show-close="false" :close-on-press-escape="false"
    :close-on-click-modal="false">
    <el-form :model="tmpUser">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="tmpUser.userName" readonly />
      </el-form-item>
      <el-form-item label="權限" prop="role">
        <el-select v-model="tmpUser.role" placeholder="請選擇權限">
          <el-option disabled label="請選擇" value="" />
          <el-option label="員工" :value="1" />
          <el-option label="主管" :value="2" />
          <el-option label="人事" :value="3" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="editRole()">
          確認
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>
<script setup>
import { reactive, ref, onMounted, computed,inject } from 'vue'
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';

import { db } from '../api/firebaseConfig';
import {
  getDatabase, ref as dbRef, push, onValue, remove, query, equalTo, orderByChild, set
} from 'firebase/database';
import { ElMessage,ElLoading,ElMessageBox  } from 'element-plus';
import { apiGetUserList ,apiGetMetaDataList,apiEnableUser,apiGetProfile,apiGetResume,apiSaveUserRole} from '../api/api';

const options=ref([])

//引用dayjs
const dayjs = inject('dayjs')
const employeeStore = useEmployeeStore();
const router = useRouter();
const role = ref(employeeStore.getUserInfo.role)
const tmpRole = ref('')
//表單實體
const ruleFormRef2 = ref(null);
//數據
const user = ref({
  userName: '',//用戶名稱
  account: '',//帳號
  password: '',//密碼
  role: '',//權限等級 1:員工 2:主管 3:人事 0:未登入
  key: computed(() => {
    return user.value.account + user.value.password
  })
})

//數據驗證規則
const userRules = reactive({
  userName: [
    { required: true, message: '請輸入用戶名稱', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '請選擇權限等級', trigger: 'change' },
  ],
  account: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
  ]
})
//驗證表單
const submitForm2 = async (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 驗證成功
      ElMessage({
        message: '驗證成功',
        type: 'success',
      });
      dialogFormVisible.value = false
      employeeStore.resetTmpUserInfo(user.value.key, user.value.role, user.value.userName)
      router.push('/form');
    } else {
      ElMessage({
        message: '驗證失敗',
        type: 'error',
      });
    }
  });
}
//重置表單
const resetValidateForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  dialogFormVisible.value = false
}
// 是否顯示彈窗
const centerDialogVisible = ref(false)
//新增人員彈窗
const dialogFormVisible = ref(false)

//部門清單
const departments = ref([
  { text: '研究三所', value: '03' }
])


const tableData1 = ref([])

const searchText = ref('')
// 目前頁數
const currentPage = ref(1);
// 每頁顯示數量
const pageSize = ref(10); 
const filteredTableData = computed(() => {
  const searchTxt = searchText.value.trim().toLowerCase();
  if (!searchTxt) {
    return tableData1.value
  }
  return tableData1.value.filter(item => {

    let { employeeId, userName, departmentCaption, professionalLicenseJsonString } = item
    const licenseMatch = professionalLicenseJsonString.some(license => license.toLowerCase().includes(searchTxt));
    return (
      employeeId.toLowerCase().includes(searchTxt) ||
      userName.toLowerCase().includes(searchTxt) ||
      departmentCaption.toLowerCase().includes(searchTxt) ||
      licenseMatch
    );
  })
})
// 當前頁面的資料
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredTableData.value.slice(start, end);
});
const formatterDepartment=(row, column, cellValue, index)=>{
  let txt=''
  let result=departments.value.find((item)=>{
    return item.value==row.department
  })
  if(result){
    txt=result.text
  }
  return txt
}
//篩選函式
const filterHandler = (value, row, column) => {
  console.log('value:', value, 'row:', row, 'column:', column)
  return row.department === value
}
//編輯
const editHandler = async (data) => {
  const loadingInstance1 = ElLoading.service({ fullscreen: true })
  console.log('目前選定:', data.userId)
  try {
    const response = await apiGetProfile(data.userId)
    let formatData=dataFormatHandle(response.data)
        console.log("整理後e資料表:",formatData)
        employeeStore.setTmpBasicInformation(formatData)
    router.push('/form');
  } catch (error) {
    console.log(error)
  } finally{
        loadingInstance1.close()
  }
}

//取得
const fetchItems = () => {
  console.log("查員工資料表")
  tableData1.value.length = 0
  let itemsRef = dbRef(db, '/users');
  itemsRef = query(itemsRef, orderByChild('ifEnable'), equalTo(true));
  onValue(itemsRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const obj = childSnapshot.val();

      // obj.key = childKey;
      obj.firebaseKey = childKey;
      tableData1.value.push(obj);
    })
  });
  console.log("tableData1:", tableData1.value)
};
//取得員工資料表
const fetchEmployeeList = async()=>{

  try {
    //清空tableData1
    tableData1.value.length=0
    const response= await apiGetUserList(false)
    response.data.forEach((item)=>{
      // 對專業證照進行處理
      if(item.professionalLicenseJsonString){
        item.professionalLicenseJsonString=JSON.parse(item.professionalLicenseJsonString)
        item.professionalLicenseJsonString=item.professionalLicenseJsonString.map((license)=>{
          return license.captionZhTw
        })
      }
      // // 對部門進行處理
      // const departmentIndex=departments.value.findIndex((department)=>{
      //   return department.text===item.department
      // })
      // if(departmentIndex < 0){
      //   item.department=null
      // }else{
      //   item.department=departments.value[departmentIndex].value
      // }
    })
    console.log("員工清單:",response.data)
    tableData1.value=response.data
  } catch (error) {
    console.log(error)
  }
}
// 查看簡歷
const checkHandler = async (data) => {
  const loadingInstance1 = ElLoading.service({ fullscreen: true })

  console.log('目前選定:', data.userId)

  try {
    const result=await apiGetResume(data.userId)
    let formatData=dataFormat(result.data)
    console.log("整理後e個人簡歷:",formatData)
    employeeStore.setTmpCurriculumVitae(formatData)
    router.push('/about');
  } catch (error) {
    console.log(error)
  } finally{
    loadingInstance1.close()
  }
}

//暫存用戶權限
const tmpUser = ref({
  userName: '',
  userId: '', 
  role: ''
})

// 變更權限彈窗
const dialogRoleVisible = ref(false)
//修改權限談窗
const openDialog = (userData) => {
  let user = deepCopy(userData)
  tmpUser.value.userName = user.userName
  tmpUser.value.userId = user.userId
  tmpUser.value.role = user.userRole
  dialogRoleVisible.value = true
}
const closeDialog = () => {
  tmpUser.value.userName = ''
  tmpUser.value.role = ''
  tmpUser.value.userId = ''
  dialogRoleVisible.value = false
}
const editRole = () => {
  ElMessageBox.confirm(
    `確定要變更${tmpUser.value.userName}的權限嗎?`,
    '警告',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      try {
        let params={
        userId:'',
        role:''
      }
      params.userId=tmpUser.value.userId
      params.role=tmpUser.value.role

      const response=await apiSaveUserRole(params)
      if(response.data.success){
        ElMessage({
        type: 'success',
        message: response.data.message??'變更成功',
      })
      }else{
        ElMessage({
          type: 'error',
          message: response.data.message??'變更失敗',
        })
      }
      } catch (error) {
        console.log(error)
      }
      
    })
    .catch(() => {
      console.log('取消變更權限')
    })
  console.log(tmpUser.value)
  dialogRoleVisible.value = false
}


//被選定目標的UserId 
const selectedUserId = ref('')
// 刪除目標
const selectedItem = ref({})
// 選擇刪除目標
const confirmDelete = (obj) => {
  selectedItem.value = obj
  selectedUserId.value = obj.userId
  centerDialogVisible.value = true
}
//刪除
const deleteItem = async () => {
  try {
    console.log("啟用目標的UserId:",selectedUserId.value)   
    const response=await apiEnableUser(selectedUserId.value)
    if(response.data.success){
      ElMessage({
        message: response.data.message??'啟用成功',
        type: 'success',
        })
    }else{
      ElMessage({
        message: response.data.message??'啟用失敗',
        type: 'error',
        })
    }
  } catch (error) {
    console.log(error)
  }finally {
    // 關閉彈窗
    centerDialogVisible.value = false
    fetchEmployeeList(); // 刪除後重新獲取數據
  }

  // 更改狀態
  // try {
  //   selectedItem.value.ifEnable = false
  //   set(dbRef(db, `users/${selectedItem.value.firebaseKey}`), selectedItem.value);
  //   console.log('該資料已刪除');
  // } catch (error) {
  //   console.error('刪除失敗:', error);
  // } finally {
  //   centerDialogVisible.value = false;
  //   selectedItem.value.length = 0
  //   fetchEmployeeList(); // 刪除後重新獲取數據
  // }

  // 直接刪除
  // const itemRef = dbRef(db, `items/${selectedItem.value.key}`);
  // try {
  //   await remove(itemRef); // 等待刪除操作完成
  //   console.log(`Item ${selectedItem.value.key} deleted successfully`);
  //   fetchItems(); // 刪除後重新獲取數據
  // } catch (error) {
  //   console.error("Error deleting item: ", error);
  // } finally {
  //   centerDialogVisible.value = false;
  //   selectedItem.value.key = ''
  // }
};
// 深拷貝
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
//取得下拉選單
async function fetchOptions(){
  try {
    const result = await apiGetMetaDataList()
    console.log("@@opts:",result.data.departmentList)
    departments.value = result.data.departmentList

  } catch (error) {
    console.log(error)
  }
}
onMounted(async() => {
    // fetchItems()
    await fetchOptions()
    fetchEmployeeList()
  }
)
//===========把資料轉換成頁面要用的結構
function getDepartmentValue(department) {
    const departmentIndex = departments.value.findIndex(d => d.text === department);
    return departmentIndex >= 0 ? departments.value[departmentIndex].value : null;
}
// 人員資料表資料格式化
function dataFormatHandle(data){
        //部門 格式化
        const tmpDepartment = data.department || data.departmentFromADServer;
        if (tmpDepartment) {
            data.department = getDepartmentValue(tmpDepartment);
        } else {
            data.department = null;
        }
        
        //到職日 格式化
        data.arrivalDate=dayjs(data.arrivalDate).format('YYYY-MM-DD')
        //到職日 格式化
        data.birthday=dayjs(data.birthday).format('YYYY-MM-DD')
        //緊急聯絡人 格式化
        if(data.emergencyContacts.length==0){
            data.emergencyContacts.push({
            mobile: null,//緊急聯絡人手機
            name: null,//緊急聯絡人名稱
            phone: null,//緊急聯絡人電話
            relationship: null,//緊急聯絡人關係
            rid:null//緊急聯絡人編號
            })
            
        }
        // 工作經歷 格式化
        data.workExperiences.forEach((item) =>{
            let startDate=dayjs(item.startFrom).format('YYYY-MM')
            let endDate=dayjs(item.endAt).format('YYYY-MM')
            item.period=[startDate,endDate]
        })
        if(data.workExperiences.length==0){
            data.workExperiences.push({
            rid:null,
            company: null,//公司名稱
            position: null,//職務名稱
            salary: null,//薪資
            leavingReason: null,//離職原因
            period: [null, null]//服務起訖年月
        })
        }
        //教育經歷 格式化
        data.educationExperiences.forEach((item) =>{
            let startDate=dayjs(item.startFrom).format('YYYY-MM')
            let endDate=dayjs(item.endAt).format('YYYY-MM')
            item.period=[startDate,endDate]
        })
        if(data.educationExperiences.length==0){
            data.educationExperiences.push({
            rid:null,
            name: null,
            academicDegree: null,
            department: null,
            degreeStatus: null,
            period: [null, null],
        })
        }
        //駕照 格式化
        if(data.drvingLicense.length>0){
            const arr = data.drvingLicense.map(item => item.text);
            console.log("整理後e資料表駕照:", arr);
            data.drvingLicense = arr;
        }
        //特殊身分 格式化
        if(data.specialStatus.length>0){
            const arr = data.specialStatus.map(item => item.text);
            console.log("整理後e資料表身分:", arr);
            data.specialStatus = arr;
        }
        //語言 格式化
        if(data.languages.length>0){
            const arr = data.languages.map(item => item.text);
            console.log("整理後e資料表語言:", arr);
            data.languages = arr;
        }
        //特殊專長 格式化
        if(data.computerExpertise.length>0){
            const arr = data.computerExpertise.map(item => item.text);
            console.log("整理後e資料表專長:", arr);
            data.computerExpertise = arr;
        }
        //專業證照 格式化
        if(data.professionalLicense.length>0){
            const arr = data.professionalLicense.map(item => item.text);
            console.log("整理後e資料表證照:", arr);
            data.professionalLicense = arr;
        }
        return data
}
//個人簡歷資料格式化
function dataFormat(data){
        //經歷格式化
        data.workExperiences.forEach((item) =>{
            let startDate=dayjs(item.startFrom).format('YYYY-MM')
            let endDate=dayjs(item.endAt).format('YYYY-MM')
            item.period=[startDate,endDate]
        })
        if(data.workExperiences.length==0){
                data.workExperiences.push({
                company: null,
                position: null,
                period:[null,null]
            })
        }
        // 歷年著作格式化
        data.annualPublications.forEach((item) =>{
            item.date=dayjs(item.date).format('YYYY-MM')
        })

        //歷年參與之專案計畫格式化
        data.annualProjects.forEach((item) =>{
            let startDate=dayjs(item.startFrom).format('YYYY-MM')
            let endDate=dayjs(item.endAt).format('YYYY-MM')
            item.period=[startDate,endDate]
        })
        if(data.annualProjects.length==0){
            data.annualProjects.push({
            entrustUnit: null,
            projectName: null,
            period:[null,null]
            })
        }
        //特殊專長格式化
        if(data.computerExpertise.length>0){
            const arr = data.computerExpertise.map(item => item.text);
            console.log("整理後e資料表專長:", arr);
            data.computerExpertise = arr;
        }
        //專業證照格式化
        if(data.professionalLicense.length>0){
            const arr = data.professionalLicense.map(item => item.text);
            console.log("整理後e資料表證照:", arr);
            data.professionalLicense = arr;
        }
        return data
}
</script>

<style scoped lang="scss"></style>