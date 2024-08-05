<template>
    <el-form :model="currentData" label-position="top" :size="'large'">
        <h1 style="text-align: center;margin-top: 20px;">人員資料表</h1>
        <el-row :gutter="10">
            <!-- TODO 基本資料 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">基本資料</el-text>
                </el-divider>
            </el-col>
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="人員編號">
                    <el-input v-model="currentData.employeeId" placeholder="請輸入編號" />
                </el-form-item>
            </el-col>


            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="部門">
                    <el-select v-model="currentData.department" multiple placeholder="請選擇部門">
                        <el-option v-for="d in departments" :key="d.id" :label="d.name" :value="d.name" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="到職日">
                    <el-date-picker v-model="currentData.arrivalDate" type="date" style="width: 100%;"
                        placeholder="請選擇到職日" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="信箱">
                    <el-input v-model="currentData.email" placeholder="請輸入信箱" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="姓名">
                    <el-input v-model="currentData.name" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="身分證號">
                    <el-input v-model="currentData.idNumber" maxlength="10" show-word-limit placeholder="請輸入身分證號" />
                </el-form-item>
            </el-col>



            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="生日">
                    <el-date-picker v-model="currentData.birthday" type="date" style="width: 100%;"
                        placeholder="請選擇生日" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="6" :lg="3">
                <el-form-item label="性別">
                    <el-radio-group v-model="currentData.sex">
                        <el-radio value="男" size="large">男</el-radio>
                        <el-radio value="女" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :sm="24" :md="6" :lg="3">
                <el-form-item label="照片">
                    <el-upload
                        class="avatar-uploader"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                
            </el-col>



            <el-col :sm="24" :md="12" :lg="12">
                <el-form-item label="連絡電話">
                    <el-input v-model="currentData.homePhone" placeholder="請輸入連絡電話" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="12">
                <el-form-item label="行動電話">
                    <el-input v-model="currentData.phone" maxlength="10" show-word-limit placeholder="請輸入行動電話" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
                <el-form-item label="戶籍地址">
                    <el-input v-model="currentData.residenceAddress" placeholder="請輸入戶籍地址" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
                <el-form-item label="通訊地址">
                    <el-input v-model="currentData.mailingAddress" placeholder="請輸入通訊地址">
                        <template #append>
                            <el-button
                                @click="currentData.mailingAddress = currentData.residenceAddress">同戶籍地址</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8">
                <el-form-item label="特殊身分">
                    <el-select v-model="currentData.specialStatus" multiple placeholder="請選擇特殊身分">
                        <el-option v-for="s in specialStatus" :key="s" :label="s" :value="s" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8">
                <el-form-item label="駕照">
                    <el-select v-model="currentData.drvingLicense" multiple placeholder="請選擇駕照">
                        <el-option label="機車" value="機車" />
                        <el-option label="汽車" value="汽車" />
                        <!-- 依據實際需求加入更多選項 -->
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8">
                <el-form-item label="婚姻狀況">
                    <el-radio-group v-model="currentData.maritalStatus">
                        <el-radio value="已婚" size="large">已婚</el-radio>
                        <el-radio value="未婚" size="large">未婚</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>


            <!-- TODO 教育程度 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">教育程度</el-text>
                </el-divider>
            </el-col>

            <el-col :span="24">
                <el-form-item label="學歷">
                    <el-row style="width: 100%;" :gutter="10" v-for="(school, index) in currentData.schools"
                        :key="index" class="work-experience-item">
                        <el-col :span="6">
                            <el-form-item label="學校名稱">
                                <el-input v-model="school.name" placeholder="請輸入學校名稱" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="科系">
                                <el-input v-model="school.department" placeholder="請輸入科系" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="修業起訖年月">
                                <el-date-picker v-model="school.period" type="monthrange" range-separator="至"
                                    start-placeholder="開始年月" end-placeholder="結束年月" format="YYYY-MM"
                                    value-format="YYYY-MM" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item
                                style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                                <el-button type="success" @click="addSchool()">新增</el-button>
                                <el-button type="danger" @click="removeSchool(index)">刪除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>
            <!-- TODO 職務經歷 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">職務經歷</el-text>
                </el-divider>
            </el-col>

            <el-col :span="24">
                <el-form-item label="職務經歷">
                    <el-row style="width: 100%;" :gutter="10" v-for="(experience, index) in currentData.workExperience"
                        :key="index" class="work-experience-item">
                        <el-col :span="4">
                            <el-form-item label="公司名稱">
                                <el-input v-model="experience.company" placeholder="請輸入公司名稱" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="職務名稱">
                                <el-input v-model="experience.position" placeholder="請輸入職務名稱" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="薪資">
                                <el-input v-model="experience.salary" placeholder="請輸入薪資" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="離職原因">
                                <el-input v-model="experience.leavingReason" placeholder="請輸入離職原因" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="服務起訖年月">
                                <el-date-picker v-model="experience.period" type="monthrange" range-separator="至"
                                    start-placeholder="開始年月" end-placeholder="結束年月" format="YYYY-MM"
                                    value-format="YYYY-MM" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item
                                style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                                <el-button type="success" @click="addWorkExperience()">新增</el-button>
                                <el-button type="danger" @click="removeWorkExperience(index)">刪除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-col>

            <!-- TODO 職能及證照 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">職能及證照</el-text>
                </el-divider>
            </el-col>

            <el-col :sm="24" :md="8" :lg="8">
                <el-form-item label="語言能力">
                    <el-select v-model="currentData.languages" placeholder="選擇語言能力" multiple filterable allow-create
                        default-first-option :reserve-keyword="false">
                        <el-option v-for="item in languages" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :sm="24" :md="8" :lg="8">
                <el-form-item label="特殊專長">
                    <el-select v-model="currentData.computerExpertise" placeholder="選擇特殊專長" multiple filterable
                        allow-create default-first-option :reserve-keyword="false">
                        <el-option v-for="item in expertises" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :sm="24" :md="8" :lg="8">
                <el-form-item label="專業證照">
                    <el-input v-model="currentData.professionalLicense" placeholder="請輸入專業證照" />
                </el-form-item>
            </el-col>

            <!-- TODO 緊急聯絡人 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">緊急聯絡人</el-text>
                </el-divider>
            </el-col>

            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item label="姓名">
                    <el-input v-model="currentData.emergencyContact.name" placeholder="請輸入姓名" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item label="關係">
                    <el-input v-model="currentData.emergencyContact.relationship" placeholder="請輸入關係" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item label="電話">
                    <el-input v-model="currentData.emergencyContact.phone" placeholder="請輸入電話" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item label="行動電話">
                    <el-input v-model="currentData.emergencyContact.mobile" placeholder="請輸入行動電話" />
                </el-form-item>
            </el-col>



            <!-- TODO 薪資撥入帳號 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">薪資撥入帳號</el-text>
                    <el-text size="large" type="danger" tag="b">(請詳細填寫正確)</el-text>
                </el-divider>
            </el-col>


            <el-col :sm="12" :md="12" :lg="12">
                <el-form-item label="銀行帳號">
                    <el-input v-model="currentData.bank.account" placeholder="請輸入銀行帳號" />
                </el-form-item>
            </el-col>

            <el-col :sm="12" :md="12" :lg="12">
                <el-form-item label="銀行分行名稱">
                    <el-input v-model="currentData.bank.branchName" placeholder="請輸入銀行分行名稱" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="12" :lg="12">
                <el-form-item label="身分證正面" >
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        multiple
                        style="width: 100%;"
                    >
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            將檔案拖曳至此處或<em>點擊上傳</em>
                        </div>
                        <template #tip>
                        <div class="el-upload__tip">
                            請上傳 jpg/png 格式的檔案，且檔案大小小於 500KB
                        </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="12" :lg="12">
                <el-form-item label="身分證反面" >
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        multiple
                        style="width: 100%;"
                    >
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            將檔案拖曳至此處或<em>點擊上傳</em>
                        </div>
                        <template #tip>
                        <div class="el-upload__tip">
                            請上傳 jpg/png 格式的檔案，且檔案大小小於 500KB
                        </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-col>






            <el-col :span="24">
                <div style="text-align: center;margin: 20px 0;">
                    <el-button type="primary" @click="saveChanges">保存</el-button>
                    <el-button type="primary" @click="cancel">返回</el-button>
                </div>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup>
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';
import { db } from '../api/firebaseConfig';
import { getDatabase, ref as dbRef, push, onValue, remove, set } from 'firebase/database';

import { ref } from 'vue';

const imageUrl = ref('');

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

// 語言清單
const languages = ref(['國語', '台語', '客語', '英語', '日語']);
//技能清單
const expertises = ref(['Word', 'Excel', 'PowerPoint', 'GIS', 'Visio']);
//特殊身分清單
const specialStatus = ref(['原住民', '身心障礙'])

const departments = ref([
    { id: 1, name: '研究一所' },
    { id: 2, name: '研究二所' },
    { id: 3, name: '研究三所' },
    { id: 4, name: '研究四所' },
    { id: 5, name: '教育推廣處' },
    { id: 6, name: '國際合作處' },
    { id: 7, name: '數位發展處' },
    { id: 8, name: '林業研究發展中心' },
    { id: 9, name: '院長室' },
    { id: 10, name: '行政管理處' },
])
const employeeStore = useEmployeeStore();

//路由
const router = useRouter();
//目前顯示的資料
const currentData = ref(employeeStore.getEmployeeStore);

//新增學歷
const addSchool = () => {
    let arrLength = currentData.value.schools.length
    if (arrLength == 3) {
        alert("最多三筆")
    } else {
        currentData.value.schools.push({
            "name": "",
            "department": "",
            "period": []
        });
    }
}
//移除學歷
const removeSchool = (index) => {
    let arrLength = currentData.value.schools.length
    if (arrLength == 1) {
        alert("最少一筆")
    } else {
        currentData.value.schools.splice(index, 1);
    }
}
//新增工作經歷
const addWorkExperience = () => {
    let arrLength = currentData.value.workExperience.length
    if (arrLength == 3) {
        alert("最多三筆")
    } else {
        currentData.value.workExperience.push({
            company: '',
            position: '',
            start: '',
            end: '',
            description: ''
        });
    }
}
//移除工作經歷
const removeWorkExperience = (index) => {
    let arrLength = currentData.value.workExperience.length
    if (arrLength == 1) {
        alert("最少一筆")
    } else {
        currentData.value.workExperience.splice(index, 1);
    }
}

const addItem = () => {

    const itemsRef = dbRef(db, 'items');

    //啟用狀態
    currentData.value.ifEnable = true
    push(itemsRef, currentData.value);
};
const updateData = () => {

    set(dbRef(db, `items/${currentData.value.key}`), currentData.value);
}
const saveChanges = () => {
    if (currentData.value.key !== null) {
        alert("已修改資料")
        updateData()
    } else {
        // 沒key 新增人員
        alert("已新增資料")
        addItem()
    }

    cancel()

};
//清空資料 回到首頁
const cancel = () => {
    employeeStore.resetEmployeeStore()
    // 回到上一頁
    router.back();
};
</script>
<style scoped lang="scss">
.el-form {
    width: 80%;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px
}

.el-form-item {
    align-items: center;
}

.el-divider {
    margin: 50px 0 30px 0;
}
.avatar-uploader {
    border: 1px dashed #8c939d;
    border-radius: 10px;
    max-width: 100px;
    max-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border-color 0.3s ease; // 添加过渡效果，使颜色变化更加平滑

    &:hover {
        border-color: #409eff; // 悬停时改变边框颜色

        .avatar-uploader-icon {
            color: #409eff; // 悬停时改变图标颜色
        }
}}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>