<template>

  <div style="width: 100%;max-width: 1500px;margin: auto;">
    <div style="display: flex;justify-content: space-between;padding: 10px 0;">
      <el-button plain v-if="false" @click="dialogFormVisible = true">
        新增人員
      </el-button>
      <el-input v-model="searchText" style="width: 240px" placeholder="搜尋" />
      <div class="block">
      <span class="demonstration" style="margin-right: 5px;"> <el-text>到職日區間</el-text></span>
      <el-date-picker
        v-model="arrivalDateRange"
        type="daterange"
        format="YYYY/MM/DD" value-format="YYYY-MM-DD"
        range-separator="至"
        start-placeholder="起始日期"
        end-placeholder="結束日期"
      />
      <!-- {{ arrivalDateRange }} -->
        <!-- {{ filterConditions }} -->
    </div>

    </div>
    <el-table :data="paginatedData" style="width: 100%" size="large" border @sort-change="sortChange"
      @filter-change="filterMethod">
      <el-table-column width="120" header-align="center" fixed prop="employeeId" label="人員編號" sortable="custom" />
      <el-table-column width="150" header-align="center" prop="userName" label="姓名" sortable="custom" />
      <el-table-column width="150" header-align="center" prop="userRole" label="權限"  column-key="userRole" :formatter="userRoleFormat" :filters="userRoleOptions" filter-multiple/>
      <el-table-column width="150" header-align="center" prop="department" label="部門" column-key="department"
        :filters="departmentOptions" :formatter="formatterDepartment" filter-multiple />
      <el-table-column width="120" header-align="center" prop="arrivalDate" label="到職日"
          :formatter="formatterArrivalDate"/>
      <el-table-column header-align="center" prop="professionalLicenseJsonString" label="專業證照" />
      <el-table-column width="200" align="center" header-align="center" fixed="right" label="人員資料表" v-if="role === '3'">
        <template #default="scope">
          <el-button type="primary" plain @click="editHandler(scope.row)">查看</el-button>
          <el-button type="primary" plain @click="exportUserCvFile1(scope.row)">下載</el-button>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" header-align="center" fixed="right" label="個人簡歷">
        <template #default="scope">
          <el-button type="primary" plain @click="checkHandler(scope.row)">查看</el-button>
          <el-button type="primary" plain @click="exportUserCvFile(scope.row)">下載</el-button>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" header-align="center" fixed="right" label="設定" v-if="role === '3'">
        <template #default="scope">
          <el-button type="primary" plain @click="openDialog(scope.row)">權限</el-button>
          <el-button type="danger" plain @click="confirmDelete(scope.row)">
            離職
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align:center;width: 100%">
      <div class="el-pagination-wrap" style="display: inline-block;margin-top: 20px;">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
          background layout=" total, prev, pager, next,sizes" :total="filterDateData.length" />
      </div>
    </div>
  </div>
  <!-- 匯出按鈕 -->
  <div style="position: fixed;right: 20px; bottom: 20px;" v-if="configExportBtn.employeeList.isShowExportBtn">
    <el-tooltip content="匯出人員資料表清單" placement="left-start" effect="dark">
      <el-button :icon="Upload" type="primary" plain round @click="exportExcel()">匯出</el-button>
    </el-tooltip>
  </div>
  <!-- 刪除確認彈框 -->
  <el-dialog v-model="centerDialogVisible" title="請選擇離職日期" width="500" align-center :before-close="handleClose">
    <!-- {{ deleteEmployee.lastWorkingDate }}<br> -->
    <el-date-picker v-model="deleteEmployee.lastWorkingDate" type="date" placeholder="請選擇離職日期" style="width: 100%;"
      format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
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
          <el-option label="人資" :value="3" />
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
  <el-dialog v-model="dialogResignVisible" title="離職設定" width="500" :show-close="false" :close-on-press-escape="false"
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
          <el-option label="人資" :value="3" />
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
import { reactive, ref, onMounted, computed, inject, watch } from 'vue'
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';

import { db } from '../api/firebaseConfig';
import {
  getDatabase, ref as dbRef, push, onValue, remove, query, equalTo, orderByChild, set
} from 'firebase/database';
import { ElMessage, ElLoading, ElMessageBox } from 'element-plus';
import { Upload } from '@element-plus/icons-vue'
import { apiGetUserList, apiGetMetaDataList, apiDisableUser, apiGetProfile, apiGetResume, apiSaveUserRole, apiGetUserListExcelFile,apiGetUserCvFile ,apiGetUserProfileFile} from '../api/api';
import qs from 'qs'
const configExportBtn = inject('config')
const dialogResignVisible = ref(false)
//引用dayjs
const dayjs = inject('dayjs')
const employeeStore = useEmployeeStore();
const router = useRouter();
const role = ref(employeeStore.getUserInfo.role)
const arrivalDateRange = ref(null)
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

//新增人員彈窗
const dialogFormVisible = ref(false)

//部門清單
const departments = ref([
  { text: '研究三所', value: '03' }
])


const tableData1 = ref([])
//搜尋字樣
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

    let { employeeId, userName, departmentCaption, professionalLicenseJsonString ,userRole} = item
    // 檢查每個屬性是否為 null 或空字串
    const employeeIdMatch = employeeId ? employeeId.toLowerCase().includes(searchTxt) : false;
    const userNameMatch = userName ? userName.toLowerCase().includes(searchTxt) : false;
    const departmentCaptionMatch = departmentCaption ? departmentCaption.toLowerCase().includes(searchTxt) : false;
    // const userRoleMatch = userRole ? userRole.toLowerCase().includes(searchTxt) : false;
    const licenseMatch = professionalLicenseJsonString ? professionalLicenseJsonString.some(license => license.toLowerCase().includes(searchTxt)) : false;
    return (
      employeeIdMatch ||
      userNameMatch ||
      departmentCaptionMatch ||
      // userRoleMatch ||
      licenseMatch
    );
  })
})

//部門過濾
const filterDepartmentData = computed(() => {
  return filteredTableData.value.filter(el =>
    Object.entries(filterConditions.value).every(
      item => item[1].includes(el["department"]) || item[1].includes(el["userRole"]) || item[1].length == 0
    )
  );
})

// 到職日過濾
const filterDateData = computed(() => {
  return filterDepartmentData.value.filter(el => {
    if (!arrivalDateRange.value || arrivalDateRange.value.length === 0) {
      return true; // 如果沒有選擇日期範圍,則不進行過濾
    }
    const startDate = dayjs(arrivalDateRange.value[0]);
    const endDate = dayjs(arrivalDateRange.value[1]);
    const arrivalDate = dayjs(el.arrivalDate);
    // 將日期設置為當天的開始和結束
    const startOfDay = startDate.startOf('day');
    const endOfDay = endDate.endOf('day');

    return (arrivalDate.isAfter(startOfDay) || arrivalDate.isSame(startOfDay)) &&
           arrivalDate.isBefore(endOfDay);
  });
});
// 當搜尋條件改變,重置頁面
watch(filterDateData, () => {
  currentPage.value = 1
})
// 當前頁面的資料
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filterDateData.value.slice(start, end);
});
const sortChange = ({ prop, order }) => {
  tableData1.value.sort(compare(prop, order));
}
const compare = (propertyName, sort) => {
  return function (obj1, obj2) {
    let value1 = obj1[propertyName]
    let value2 = obj2[propertyName]

    // 將 null 轉換為一個特殊的值
    if (value1 === null) value1 = 'Infinity'
    if (value2 === null) value2 = 'Infinity'

    // 如果兩個值都是字符串
    if (typeof value1 === 'string' && typeof value2 === 'string') {
      const res = value1.localeCompare(value2, 'zh')
      return sort === 'ascending' ? res : -res
    }

    // 如果兩個值都是數字
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return sort === 'ascending' ? value1 - value2 : value2 - value1
    }

    // 如果一個是字符串，一個是數字
    if (typeof value1 === 'string' && typeof value2 === 'number') {
      return sort === 'ascending' ? -1 : 1
    }
    if (typeof value1 === 'number' && typeof value2 === 'string') {
      return sort === 'ascending' ? 1 : -1
    }

    // 其他情況（如日期、布爾值等）
    if (value1 < value2) {
      return sort === 'ascending' ? -1 : 1
    } else if (value1 > value2) {
      return sort === 'ascending' ? 1 : -1
    } else {
      return 0
    }
  }
}

const formatterDepartment = (row, column, cellValue, index) => {
  let txt = ''
  let result = departments.value.find((item) => {
    return item.value == row.department
  })
  if (result) {
    txt = result.text
  }
  return txt
}
const formatterArrivalDate = (row, column, cellValue, index) => {
  let isDate=dayjs(row.arrivalDate).isValid()
  if(isDate){
    return dayjs(row.arrivalDate).format('YYYY-MM-DD')
  }else{
    return `N/A`
  }
}
const userRoleFormat=(row, column, cellValue, index)=>{
  let role=row.userRole
  if(role=='1'){
    return '員工'
  }else if(role=='2'){
    return '主管'
  }else if(role=='3'){
    return '人資'
  }else{
    return 'N/A'
  }
}
// 紀錄篩選條件
let filterConditions = ref({});
function filterMethod(filters) {
  // 更新篩選條件
  Object.assign(filterConditions.value, filters);

}
//編輯
const editHandler = async (data) => {
  const loadingInstance1 = ElLoading.service({ fullscreen: true })
  console.log('目前選定:', data.userId)
  try {
    const response = await apiGetProfile(data.userId)
    employeeStore.setTmpBasicInformation(response.data)
    router.push('/form');
  } catch (error) {
    console.log(error)
  } finally {
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
const fetchEmployeeList = async () => {

  try {
    //清空tableData1
    tableData1.value.length = 0
    const response = await apiGetUserList(true)
    response.data.forEach((item) => {
      // 對專業證照進行處理
      if (item.professionalLicenseJsonString) {
        item.professionalLicenseJsonString = JSON.parse(item.professionalLicenseJsonString)
        item.professionalLicenseJsonString = item.professionalLicenseJsonString.map((license) => {
          return license.captionZhTw
        })
      }
      // item.userRole=userRoleFormat(item.userRole)
    })
    console.log("員工清單:", response.data)
    tableData1.value = response.data
  } catch (error) {
    console.log(error)
  }
}
// 查看簡歷
const checkHandler = async (data) => {
  const loadingInstance1 = ElLoading.service({ fullscreen: true })

  console.log('目前選定:', data.userId)

  try {
    const result = await apiGetResume(data.userId)
    employeeStore.setTmpCurriculumVitae(result.data)
    router.push('/about');
  } catch (error) {
    console.log(error)
  } finally {
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
    .then(async () => {
      try {
        let params = {
          userId: '',
          role: ''
        }
        params.userId = tmpUser.value.userId
        params.role = tmpUser.value.role

        const response = await apiSaveUserRole(params)
        if (response.data.success) {
          ElMessage({
            type: 'success',
            message: response.data.message ?? '變更成功',
          })
          fetchEmployeeList(); // 變更後重新獲取數據
        } else {
          ElMessage({
            type: 'error',
            message: response.data.message ?? '變更失敗',
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


// 是否顯示彈窗
const centerDialogVisible = ref(false)


const tmplastWorkingDate = ref(null)
// 關閉離職日
const handleClose = () => {
  // 關閉談窗
  centerDialogVisible.value = false
  // 暫存離職日設為null
  tmplastWorkingDate.value = null
  deleteEmployee.value.lastWorkingDate = null

}
//被選定目標的UserId 
const selectedUserId = ref('')
// 刪除目標
const selectedItem = ref({})
const deleteEmployee = ref({
  userId: null,
  lastWorkingDate: null,
  userName: null
})
// 選擇刪除目標
const confirmDelete = (obj) => {
  deleteEmployee.value.userId = obj.userId
  deleteEmployee.value.userName = obj.userName
  selectedItem.value = obj

  selectedUserId.value = obj.userId
  centerDialogVisible.value = true
}
//刪除
const deleteItem = () => {
  if (deleteEmployee.value.lastWorkingDate == null) {
    ElMessage({
      message: '請選擇離職日',
      type: 'error',
    })
    return
  }
  let obj = deleteEmployee.value
  ElMessageBox.confirm(
    `確定將${obj.userName}設定為離職嗎?`,
    '警告',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {

    console.log("刪除目標:", obj)

    // api
    disableUser()
  })
    .catch(() => {
      console.log(`取消將${obj.userName}設定為離職`)
    })
}
const disableUser = async () => {
  try {
    console.log("刪除目標的UserId:", deleteEmployee.value)
    const response = await apiDisableUser(deleteEmployee.value)
    if (response.data.success) {
      ElMessage({
        message: response.data.message ?? '刪除成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: response.data.message ?? '刪除失敗',
        type: 'error',
      })
    }
  } catch (error) {
    console.log(error)
  } finally {
    // 關閉彈窗
    centerDialogVisible.value = false
    //初始化
    deleteEmployee.value = {
      userId: null,
      lastWorkingDate: null,
      userName: null
    }
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
//部門清單
const departmentOptions = ref([
  { text: '研究三所', value: '03' }
])
//部門清單
const userRoleOptions = ref([
  { text: '人資', value:3 },
  { text: '主管', value:2 },
  { text: '員工', value:1 },
])


//取得下拉選單
async function fetchOptions() {
  try {
    const result = await apiGetMetaDataList()
    console.log("@@opts:", result.data.departmentList)
    departments.value = result.data.departmentList
    departmentOptions.value = result.data.departmentList.map((item) => {
      return { text: item.text, value: item.value }
    })

  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  // fetchItems()
  await fetchOptions()
  fetchEmployeeList()
}
)
//===========把資料轉換成頁面要用的結構


// 匯出員工清單
async function exportExcel() {
let arrivalDateStart=null
let arrivalDateEnd=null
let keywords= searchText.value
let parameters = {
  fieldValueSets: []
};

Object.keys(filterConditions.value).forEach(field => {
  const values = filterConditions.value[field];
  values.forEach(value => {
    parameters.fieldValueSets.push({
      orGroupTag: field === "department" ? "grpDept" : "userRoleDept",
      fieldName: field === "department" ? "usr.department" : "usr.userRole",
      frontEndFieldValue: value.toString(),
      frontEndFieldType: "string"
    });
  });
});

if(arrivalDateRange.value){
  arrivalDateStart= arrivalDateRange.value[0]
  arrivalDateEnd= arrivalDateRange.value[1]
}
// console.log("@@obj:", obj)
// console.log("@@arrivalDateStart:", arrivalDateStart)
// console.log("@@arrivalDateEnd:", arrivalDateEnd)
// console.log("@@keywords:", keywords)
let urlx={
  ifEnable:true,
  arrivalDateStart:arrivalDateStart,
  arrivalDateEnd:arrivalDateEnd,
  keywords: keywords === '' ? null : keywords
}
const queryString = qs.stringify(urlx, { skipNulls: true });
console.log(queryString);
  try {
    const response = await apiGetUserListExcelFile(queryString,parameters)
    let url = response.data.data
    console.log("前往這網站:", url)
    window.open(url)
  } catch (error) {
    console.log(error);
  }
}
// 匯出個人簡歷
async function exportUserCvFile1(data) {
  let userId=data.userId
  console.log("userId:", userId)
  try {
    const response = await apiGetUserProfileFile(userId)
    let url = response.data.data
    console.log("前往這網站:", url)
    window.open(url)
  } catch (error) {
    console.log(error);
  }
}
// 匯出個人簡歷
async function exportUserCvFile(data) {
  let userId=data.userId
  console.log("userId:", userId)
  try {
    const response = await apiGetUserCvFile(userId)
    let url = response.data.data
    console.log("前往這網站:", url)
    window.open(url)
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang="scss"></style>