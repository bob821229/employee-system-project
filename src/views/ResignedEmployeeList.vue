<template>

  <div style="width: 100%;max-width: 1500px;margin: auto;">
    <div style="display: flex;justify-content: space-between;padding: 10px 0;">
      <el-input v-model="searchText" style="width: 240px" placeholder="搜尋" />
    </div>
    <el-table :data="filteredTableData" style="width: 100%" size="large" max-height="700" :scrollbar-always-on="true"
      border>
      <el-table-column width="120" header-align="center" fixed prop="employeeId" label="人員編號" />
      <el-table-column width="150" header-align="center" prop="userName" label="姓名" />
      <el-table-column width="250" header-align="center" prop="department" label="部門"
        :filters="departments" :filter-method="filterHandler" filter-multiple />
      <el-table-column header-align="center" prop="professionalLicense" label="專業證照" />
      <el-table-column width="200" align="center" header-align="center" fixed="right" label="編輯" v-if="role === '3'">
        <template #default="scope">
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
  </div>

  <!-- 刪除確認彈框 -->
  <el-dialog v-model="centerDialogVisible" title="警告" width="500" align-center>
    <span>您確定要刪除該筆資料?</span>
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
          <el-option label="員工" value="1" />
          <el-option label="主管" value="2" />
          <el-option label="人事" value="3" />
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
import { reactive, ref, onMounted, computed } from 'vue'
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';

import { db } from '../api/firebaseConfig';
import {
  getDatabase, ref as dbRef, push, onValue, remove, query, equalTo, orderByChild, set
} from 'firebase/database';
import { ElMessage } from 'element-plus';
import { getEmployeeList ,testApi,getProfile,getCurriculumVitae,getOptions} from '../api/api';
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
  { text: '研究一所', value: '研究一所' }
])


const tableData1 = ref([])

const searchText = ref('')

const filteredTableData = computed(() => {
  const searchTxt = searchText.value.trim().toLowerCase();
  if (!searchTxt) {
    return tableData1.value
  }
  return tableData1.value.filter(item => {

    let { employeeId, userName, department, professionalLicense } = item
    const licenseMatch = professionalLicense.some(license => license.toLowerCase().includes(searchTxt));
    return (
      employeeId.toLowerCase().includes(searchTxt) ||
      userName.toLowerCase().includes(searchTxt) ||
      department.toLowerCase().includes(searchTxt) ||
      licenseMatch
    );
  })
})

//篩選函式
const filterHandler = (value, row, column) => {
  console.log('value:', value, 'row:', row, 'column:', column)
  return row.basicInformation.department === value
}
//編輯
const editHandler = async (data) => {
  let obj={
    key:data.key
  }
  console.log('目前選定:', data)
  try {
    const response = await getProfile(obj)
    console.log("人員資料表:",response.data)
    employeeStore.setTmpBasicInformation(response.data)
    router.push('/form');
  } catch (error) {
    console.log(error)
  }
  // employeeStore.setTmpUserInfo(data)
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

      obj.firebaseKey = childKey;
      tableData1.value.push(obj);
    })
  });
  console.log("tableData1:", tableData1.value)
};
//取得員工資料表
const fetchEmployeeList = async()=>{
  let params={
    ifEnable:false
  }
  try {
    //清空tableData1
    tableData1.value.length=0
    const response= await getEmployeeList(params)
    console.log("員工清單:",response.data)
    tableData1.value=response.data
  } catch (error) {
    console.log(error)
  }
}
//準備刪除的員工


// 查看簡歷
const checkHandler = async (data) => {
  let params={
    key:data.key
  }
  console.log('目前選定:', data)

  try {
    const response = await getCurriculumVitae(params)
    console.log("人員資料表:",response.data)
    employeeStore.setTmpCurriculumVitae(response.data)
    router.push('/about');
  } catch (error) {
    console.log(error)
  }
  // employeeStore.setTmpUserInfo(data)
}

//暫存用戶權限
const tmpUser = ref({
  userName: '',
  role: ''
})
// 變更權限彈窗
const dialogRoleVisible = ref(false)
//修改權限談窗
const openDialog = (obj) => {
  let user = deepCopy(obj)
  tmpUser.value.userName = user.userName
  tmpUser.value.role = user.role
  dialogRoleVisible.value = true
}
const closeDialog = () => {
  tmpUser.value.userName = ''
  tmpUser.value.role = ''
  dialogRoleVisible.value = false
}
const editRole = () => {
  console.log(tmpUser.value)
  dialogRoleVisible.value = false
}



// 刪除目標
const selectedItem = ref({})
// 選擇刪除目標
const confirmDelete = (obj) => {
  selectedItem.value = obj
  centerDialogVisible.value = true
}
//刪除
const deleteItem = async () => {
  try {
    console.log("刪除目標:",selectedItem.value)   
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
    const result = await getOptions()
    // console.log("@@opts:",result.data.departmentList)
    departments.value = result.data.departmentList

  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
    // fetchItems()
    fetchEmployeeList()
    fetchOptions()
  }
)

</script>

<style scoped lang="scss"></style>