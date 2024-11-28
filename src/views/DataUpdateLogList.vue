<template>
  <div style="width: 100%;max-width: 1500px;margin: auto;align-items: flex-start;">

    <div style="display: flex;justify-content: space-between;padding: 10px 0;">
      <el-input v-model="searchText" style="width: 240px" placeholder="搜尋" />
      <div  style="display: flex;justify-content: space-around;align-items: center;gap: 10px;"> 
        <!-- {{ dateRange }} -->
      <span style="color: #909399;">查詢起訖:</span>
      <el-date-picker
        v-model="dateRange "
        type="daterange"
        range-separator="至"
        start-placeholder="開始日期"
        end-placeholder="結束日期"
        value-format="YYYY-MM-DD"
        @change="dateRangeChange"
      />
    </div>
    </div>
    <el-table :data="paginatedData" style="width: 100%" size="large" border @sort-change="sortChange"
      @filter-change="filterMethod">
      <el-table-column width="120" header-align="center" fixed prop="rid" label="編號" sortable="custom" />
      <el-table-column width="200" header-align="center" fixed prop="dataOwner" label="修改對象" />
      <el-table-column width="200" header-align="center" fixed prop="tableNameCaption" label="資料表名稱" />
      <el-table-column width="200" header-align="center" fixed prop="fieldNameCaption" label="欄位名稱"  />
      <el-table-column header-align="center" fixed prop="oldValue" label="修改前的舊值"  />
      <el-table-column header-align="center" fixed prop="newValue" label="修改後的新值" />
      <el-table-column width="200" header-align="center" fixed prop="updateUserName" label="編輯者" />
      <el-table-column  header-align="center" fixed prop="createDateTimeUtc8" label="變更時間" sortable="custom"/>
    </el-table>

    <div style="text-align:center;width: 100%">
      <div class="el-pagination-wrap" style="display: inline-block;margin-top: 20px;">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
          background layout=" total, prev, pager, next,sizes" :total="filterDepartmentData.length" />
      </div>
    </div>
  </div>
  <!-- 匯出按鈕 -->
  <div style="position: fixed;right: 20px; bottom: 20px;" v-if="config.dataUpdateLogList.isShowExportBtn">
    <el-tooltip content="匯出資料異動紀錄表" placement="left-start" effect="dark">
      <el-button :icon="Upload" type="primary" plain round @click="exportExcel()">匯出</el-button>
    </el-tooltip>
  </div>


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
import { apiGetUserList, apiGetMetaDataList, apiDisableUser, apiGetProfile, apiGetResume, apiSaveUserRole, apiGetUserListExcelFile ,apiGetFieldDataUpdateLogList} from '../api/api';

const config = inject('config')
const options = ref([])
const dialogResignVisible = ref(false)
//引用dayjs
const dayjs = inject('dayjs')
const employeeStore = useEmployeeStore();
const router = useRouter();
const role = ref(employeeStore.getUserInfo.role)


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

    let { rid, tableNameCaption, fieldNameCaption,oldValue,newValue,dataOwner,updateUserName,createDateTimeUtc8, professionalLicenseJsonString } = item
    // 檢查每個屬性是否為 null 或空字串
    const ridMatch = rid ? rid.toString().toLowerCase().includes(searchTxt) : false;
    const tableNameCaptionMatch = tableNameCaption ? tableNameCaption.toLowerCase().includes(searchTxt) : false;
    const fieldNameCaptionMatch = fieldNameCaption ? fieldNameCaption.toLowerCase().includes(searchTxt) : false;
    const oldValueMatch = oldValue ? oldValue.toLowerCase().includes(searchTxt) : false;
    const newValueMatch = newValue ? newValue.toLowerCase().includes(searchTxt) : false;
    const dataOwnerMatch = dataOwner ? dataOwner.toLowerCase().includes(searchTxt) : false;
    const updateUserNameMatch = updateUserName ? updateUserName.toLowerCase().includes(searchTxt) : false;
    const createDateTimeUtc8Match = createDateTimeUtc8 ? createDateTimeUtc8.toLowerCase().includes(searchTxt) : false;
    // const licenseMatch = professionalLicenseJsonString ? professionalLicenseJsonString.some(license => license.toLowerCase().includes(searchTxt)) : false;
    return (
      ridMatch ||
      tableNameCaptionMatch ||
      fieldNameCaptionMatch ||
      oldValueMatch ||
      newValueMatch ||
      dataOwnerMatch ||
      updateUserNameMatch ||
      createDateTimeUtc8Match 
    );
  })
})
//部門過濾
const filterDepartmentData = computed(() => {
  return filteredTableData.value.filter(el =>
    Object.entries(filterConditions.value).every(
      item => item[1].includes(el["departmentCaption"]) || item[1].length == 0
    )
  );
})
// 當搜尋條件改變,重置頁面
watch(filterDepartmentData, () => {
  currentPage.value = 1
})
// 當前頁面的資料
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filterDepartmentData.value.slice(start, end);
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


// 排序處理函數

// 记录筛选条件
let filterConditions = ref({});
function filterMethod(filters) {
  // 更新篩選條件
  Object.assign(filterConditions.value, filters);

}
const dateRange= ref([dayjs().subtract(1, 'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
//取得員工資料表
const fetchEmployeeList = async () => {

  try {
    //清空tableData1
    let from= dateRange.value[0]
    let to = dateRange.value[1]
    tableData1.value.length = 0
    const response = await apiGetFieldDataUpdateLogList(from,to)
    console.log("員工清單:", response.data)
    tableData1.value=response.data.map((item) => {
      
        item.createDateTimeUtc8= valueFormat('datetime',item.createDateTimeUtc8,'YYYY/MM/DD HH:mm:ss')
        item.newValue= valueFormat(item.dataType,item.newValue)
        item.oldValue= valueFormat(item.dataType,item.oldValue)
      
    }
    )
    tableData1.value = response.data
  } catch (error) {
    console.log(error)
  }
}
const valueFormat = (dataType,value, format = 'YYYY/MM/DD') => {
  if (value) {    
    // 驗證是否為有效日期=>true 格式化日期
    if (dataType=='datetime' && dayjs(value).isValid()) {
      return dayjs(value).format(format)
    } else {
      return value
    }
  }else{
    return 'N/A'
  }
}
const dateRangeChange = () => {
  let from= dateRange.value[0]
  let to = dateRange.value[1]
  let isBefore=dayjs(from).isBefore(dayjs(to)) 
  let diffDays = dayjs(to).diff(dayjs(from), 'day')
  if(!from||!to){
    ElMessage({
        message: '日期不能為空',
        type: 'error',
    });
  }else if(!isBefore){
    ElMessage({
        message: '開始日期不能大於結束日期',
        type: 'error',
    });
  }else if(diffDays>31){
    ElMessage({
        message: '日期範圍差距不得大於31天',
        type: 'error',
    });
  }else{
    fetchEmployeeList()
  }
}





// 深拷貝
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

onMounted(async () => {
  fetchEmployeeList()
}
)
//===========把資料轉換成頁面要用的結構
// 匯出員工清單
async function exportExcel() {
  try {
    const response = await apiGetUserListExcelFile(true)
    let url = response.data.data
    console.log("前往這網站:", url)
    window.open(url)
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang="scss"></style>