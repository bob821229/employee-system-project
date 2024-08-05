<template>

  <el-button @click="newHandler">新增人員</el-button>
  <div style="width: 100%;max-width: 1500px;margin: auto;">
    <el-table :data="tableData1" style="width: 100%" size="large" max-height="700" scrollbar-always-on="true" border>
      <el-table-column header-align="center" fixed prop="employeeId" label="人員編號" />
      <el-table-column header-align="center" prop="name" label="姓名" />
      <el-table-column header-align="center" prop="department" label="部門" :filters="departments"
        :filter-method="filterHandler" />
      <el-table-column header-align="center" prop="email" label="信箱" />
      <el-table-column align="center" header-align="center" fixed="right" label="編輯">
        <template #default="scope">
          <el-button type="primary" plain size="small" @click="editHandler(scope.row)">修改</el-button>
          <el-button type="danger" plain size="small" @click="confirmDelete(scope.row)">
            刪除
          </el-button>
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

</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';

import { db } from '../api/firebaseConfig';
import {
  getDatabase, ref as dbRef, push, onValue, remove, query, equalTo, orderByChild, set
} from 'firebase/database';
const employeeStore = useEmployeeStore();
const router = useRouter();
// 是否顯示彈窗
const centerDialogVisible = ref(false)
const departments = ref([
  { text: '研究一所', value: '研究一所' },
  { text: '研究二所', value: '研究二所' },
  { text: '研究三所', value: '研究三所' },
  { text: '研究四所', value: '研究四所' },
  { text: '數位發展處', value: '數位發展處' },
  { text: '教育推廣處', value: '教育推廣處' },
  { text: '國際合作處', value: '國際合作處' },
])
//個人資料
const model = ref({
  employeeId: '',//人員編號
  department: '',//進用部門
  arrivalDate: null,//到職日
  name: '',//姓名
  idNumber: '',//身分證號
  sex: '',//性別
  birthday: null,//生日
  homePhone: '',//連絡電話
  phone: '',//行動電話
  residenceAddress: '',//戶籍地址
  mailingAddress: '',//通訊地址
  email: '',//信箱
  specialStatus: [],//特殊身分
  drvingLicense: [],//駕照
  maritalStatus: [],//婚姻狀況
  schools: [
    {
      name: "",//學校名稱
      department: "",//科系
      period: null//修業起訖年月
    }
  ],//學歷
  workExperience: [
    {
      company: "",//公司名稱
      position: "",//職務名稱
      salary: null,//薪資
      leavingReason: "",//離職原因
      period: null//服務起訖年月
    }
  ],//職務經歷
  languages: [],//語言能力
  computerExpertise: [],//電腦專長
  professionalLicense: '',//專業證照
  emergencyContact: {
    name: '', // 緊急聯絡人姓名
    relationship: '', // 關係
    phone: '', // 連絡電話
    mobile: '' // 行動電話
  },//緊急聯絡人資訊
  bank: {
    account: '',//銀行帳號
    branchName: ''//分行名稱
  },//銀行資訊
})

const tableData = ref(
  [
    {
      "employeeId": "E001",
      "department": "研究一所",
      "arrivalDate": "2023-01-15",
      "name": "張三",
      "idNumber": "A123456789",
      "sex": "男",
      "birthday": "1985-03-22",
      "homePhone": "02-12345678",
      "phone": "0912345678",
      "residenceAddress": "台北市中正區中山路1號",
      "mailingAddress": "台北市中正區中山路1號",
      "email": "zhangsan@example.com",
      "specialStatus": ["原住民"],
      "drvingLicense": ["機車"],
      "maritalStatus": "已婚",
      "schools": [
        {
          "name": "台灣大學",
          "department": "資訊工程系",
          "period": ["2007-01", "2011-12"]
        },
        {
          "name": "台灣大學",
          "department": "資訊工程系",
          "period": ["2007-01", "2011-12"]
        }
      ],
      "workExperience": [
        {
          "company": "ABC科技公司",
          "position": "軟體工程師",
          "salary": 60000,
          "leavingReason": "尋求更好發展",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "languages": ["中文", "英文"],
      "computerExpertise": ["JavaScript", "Java", "Python"],
      "professionalLicense": "資訊安全管理師",
      "emergencyContact": {
        "name": "李四",
        "relationship": "兄弟",
        "phone": "02-87654321",
        "mobile": "0987654321"
      },
      "bank": {
        "account": "123456789012",
        "branchName": "台北市南門分行"
      }
    },
    {
      "employeeId": "E002",
      "department": "研究二所",
      "arrivalDate": "2022-09-01",
      "name": "李四",
      "idNumber": "B987654321",
      "sex": "女",
      "birthday": "1990-06-15",
      "homePhone": "03-12345678",
      "phone": "0987654321",
      "residenceAddress": "新竹市東區光復路100號",
      "mailingAddress": "新竹市東區光復路100號",
      "email": "lisi@example.com",
      "specialStatus": ["身心障礙"],
      "drvingLicense": ["機車"],
      "maritalStatus": "未婚",
      "schools": [
        {
          "name": "交通大學",
          "department": "電子工程系",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "workExperience": [
        {
          "company": "XYZ科技公司",
          "position": "硬體工程師",
          "salary": 55000,
          "leavingReason": "搬家",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "languages": ["中文", "日文"],
      "computerExpertise": ["C++", "VHDL"],
      "professionalLicense": "電子工程師證照",
      "emergencyContact": {
        "name": "王五",
        "relationship": "朋友",
        "phone": "03-87654321",
        "mobile": "0912345678"
      },
      "bank": {
        "account": "987654321098",
        "branchName": "新竹市民生分行"
      }
    },
    {
      "employeeId": "E003",
      "department": "研究三所",
      "arrivalDate": "2021-03-20",
      "name": "王五",
      "idNumber": "C135792468",
      "sex": "男",
      "birthday": "1980-12-05",
      "homePhone": "04-12345678",
      "phone": "0978654321",
      "residenceAddress": "台中市西區美村路200號",
      "mailingAddress": "台中市西區美村路200號",
      "email": "wangwu@example.com",
      "specialStatus": ["身心障礙", "原住民"],
      "drvingLicense": ["機車", "汽車"],
      "maritalStatus": "未婚",
      "schools": [
        {
          "name": "中興大學",
          "department": "會計學系",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "workExperience": [
        {
          "company": "財務顧問公司",
          "position": "財務分析師",
          "salary": 70000,
          "leavingReason": "家庭原因",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "languages": ["中文", "英文"],
      "computerExpertise": ["Excel", "SAP"],
      "professionalLicense": "會計師證照",
      "emergencyContact": {
        "name": "趙六",
        "relationship": "姐姐",
        "phone": "04-87654321",
        "mobile": "0987654321"
      },
      "bank": {
        "account": "567890123456",
        "branchName": "台中市大墩分行"
      }
    },
    {
      "employeeId": "E004",
      "department": "數位發展部",
      "arrivalDate": "2020-11-11",
      "name": "趙六",
      "idNumber": "D246810121",
      "sex": "女",
      "birthday": "1995-08-25",
      "homePhone": "05-12345678",
      "phone": "0965123456",
      "residenceAddress": "嘉義市西區林森路300號",
      "mailingAddress": "嘉義市西區林森路300號",
      "email": "zhaoliu@example.com",
      "specialStatus": [],
      "drvingLicense": [],
      "maritalStatus": "未婚",
      "schools": [
        {
          "name": "嘉義大學",
          "department": "行銷管理系",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "workExperience": [
        {
          "company": "行銷顧問公司",
          "position": "行銷專員",
          "salary": 45000,
          "leavingReason": "公司搬遷",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "languages": ["中文", "英語"],
      "computerExpertise": ["Photoshop", "Illustrator"],
      "professionalLicense": "行銷策劃師",
      "emergencyContact": {
        "name": "陳七",
        "relationship": "母親",
        "phone": "05-87654321",
        "mobile": "0935123456"
      },
      "bank": {
        "account": "345678901234",
        "branchName": "嘉義市民雄分行"
      }
    },
    {
      "employeeId": "E005",
      "department": "教育推廣部",
      "arrivalDate": "2021-06-01",
      "name": "陳七",
      "idNumber": "E135791357",
      "sex": "男",
      "birthday": "1992-11-11",
      "homePhone": "06-12345678",
      "phone": "0956123456",
      "residenceAddress": "台南市東區東門路400號",
      "mailingAddress": "台南市東區東門路400號",
      "email": "chenqi@example.com",
      "specialStatus": [],
      "drvingLicense": ["機車"],
      "maritalStatus": "未婚",
      "schools": [
        {
          "name": "成功大學",
          "department": "國際企業學系",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "workExperience": [
        {
          "company": "客服服務公司",
          "position": "客服專員",
          "salary": 40000,
          "leavingReason": "職業轉換",
          "period": ["2007-07", "2012-12"]
        }
      ],
      "languages": ["中文", "韓文"],
      "computerExpertise": ["Word", "Excel"],
      "professionalLicense": "客服服務證照",
      "emergencyContact": {
        "name": "楊八",
        "relationship": "父親",
        "phone": "06-87654321",
        "mobile": "0912345678"
      },
      "bank": {
        "account": "789012345678",
        "branchName": "台南市南區分行"
      }
    }
  ])
const tableData1 = ref([])
//篩選函式
const filterHandler = (value, row, column) => {
  const property = column['property']
  return row[property] === value
}
const editHandler = (data) => {
  console.log(data)
  employeeStore.setEmployeeStore(data)
  router.push('/form');

}
const newHandler = () => {
  employeeStore.resetEmployeeStore()
  router.push('/form');
}
const fetchItems = () => {
  tableData1.value.length = 0
  let itemsRef = dbRef(db, '/items');
  itemsRef = query(itemsRef, orderByChild('ifEnable'), equalTo(true));
  onValue(itemsRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const obj = childSnapshot.val();

      obj.key = childKey;
      tableData1.value.push(obj);
    })
  });
};
const tmpKey = ref('')
const selectedItem = ref({})

const confirmDelete = (obj) => {

  selectedItem.value = obj
  centerDialogVisible.value = true
}
const deleteItem = async () => {
  // 更改狀態
  try {
    selectedItem.value.ifEnable = false
    set(dbRef(db, `items/${selectedItem.value.key}`), selectedItem.value);
    console.log('該資料已刪除');
  } catch (error) {
    console.error('刪除失敗:', error);
  } finally {
    centerDialogVisible.value = false;
    selectedItem.value.length = 0
    fetchItems(); // 刪除後重新獲取數據

  }

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

onMounted(
  () => {
    fetchItems()
  }
)

</script>

<style scoped lang="scss"></style>