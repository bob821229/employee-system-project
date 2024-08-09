<template>



    <el-form ref="ruleFormRef" :model="currentData" label-position="top" :size="'large'" :rules="rules">
        <h1 style="text-align: center;margin-top: 20px;">人員資料表</h1>
        <el-row :gutter="10">
            <!-- TODO 基本資料 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">基本資料</el-text>
                </el-divider>
            </el-col>
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="人員編號" prop="employeeId">
                    <el-input v-model="currentData.employeeId" placeholder="請輸入編號" />
                </el-form-item>
            </el-col>


            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="部門" prop="department">
                    <el-select v-model="currentData.department" placeholder="請選擇部門">
                        <el-option v-for="d in departments" :key="d.id" :label="d.name" :value="d.name" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="到職日" prop="arrivalDate">
                    <el-date-picker v-model="currentData.arrivalDate" type="date" style="width: 100%;"
                        placeholder="請選擇到職日" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="信箱" prop="email">
                    <el-input v-model="currentData.email" placeholder="請輸入信箱" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="currentData.name" placeholder="請輸入姓名" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="身分證號" prop="idNumber">
                    <el-input v-model="currentData.idNumber" maxlength="10" show-word-limit placeholder="請輸入身分證號" />
                </el-form-item>
            </el-col>



            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="currentData.birthday" type="date" style="width: 100%;"
                        placeholder="請選擇生日" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="6" :lg="3">
                <el-form-item label="性別" prop="sex">
                    <el-radio-group v-model="currentData.sex">
                        <el-radio value="男" size="large">男</el-radio>
                        <el-radio value="女" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :sm="24" :md="6" :lg="3">
                <el-form-item label="照片" prop="profileImageUrl">
                    <!-- <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false"
                        :on-change="handleFileChange" :before-upload="beforeAvatarUpload">

                        <el-avatar v-if="currentData.profileImageUrl" :src="currentData.profileImageUrl" fit="cover"
                            class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload> -->
                    <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false"
                        :on-change="changeProfileImage">

                        <el-avatar v-if="previewimageUrl || currentData.profileImageUrl"
                            :src="previewimageUrl || currentData.profileImageUrl" fit="cover" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>

            </el-col>



            <el-col :sm="24" :md="12" :lg="12">
                <el-form-item label="連絡電話" prop="homePhone">
                    <el-input v-model="currentData.homePhone" placeholder="請輸入連絡電話" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="12">
                <el-form-item label="行動電話" prop="phone">
                    <el-input v-model="currentData.phone" maxlength="10" show-word-limit placeholder="請輸入行動電話" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
                <el-form-item label="戶籍地址" prop="residenceAddress">
                    <el-input v-model="currentData.residenceAddress" placeholder="請輸入戶籍地址" />
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
                <el-form-item label="通訊地址" prop="mailingAddress">
                    <el-input v-model="currentData.mailingAddress" placeholder="請輸入通訊地址">
                        <template #append>
                            <el-button
                                @click="currentData.mailingAddress = currentData.residenceAddress">同戶籍地址</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8">
                <el-form-item label="特殊身分" prop="specialStatus">
                    <el-select v-model="currentData.specialStatus" multiple placeholder="請選擇特殊身分">
                        <el-option v-for="s in specialStatus" :key="s" :label="s" :value="s" />
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8">
                <el-form-item label="駕照" prop="drvingLicense">
                    <el-select v-model="currentData.drvingLicense" multiple placeholder="請選擇駕照">
                        <el-option label="機車" value="機車" />
                        <el-option label="汽車" value="汽車" />
                        <!-- 依據實際需求加入更多選項 -->
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8">
                <el-form-item label="婚姻狀況" prop="maritalStatus">
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
                <el-row style="width: 100%;align-items: end;" :gutter="10"
                    v-for="(school, index) in currentData.schools" :key="index" class="work-experience-item">
                    <el-col :span="6">
                        <el-form-item label="學校名稱" :prop="'schools.' + index + '.name'" :rules="{
                            required: true,
                            message: '請輸入學校名稱',
                            trigger: 'blur',
                        }">
                            <el-input v-model="school.name" placeholder="請輸入學校名稱" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="科系" :prop="'schools.' + index + '.department'" :rules="{
                            required: true,
                            message: '請輸入科系',
                            trigger: 'blur',
                        }">
                            <el-input v-model="school.department" placeholder="請輸入科系" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="修業起訖年月" :prop="'schools.' + index + '.period'" :rules="{
                            type: 'array',
                            required: true,
                            message: '請選擇修業起訖年月',
                            trigger: 'change',
                        }">
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
            </el-col>
            <!-- TODO 職務經歷 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">職務經歷</el-text>
                </el-divider>
            </el-col>

            <el-col :span="24">
                <el-row style="width: 100%;align-items: end;" :gutter="10"
                    v-for="(experience, index) in currentData.workExperience" :key="index" class="work-experience-item">
                    <el-col :span="4">
                        <el-form-item label="公司名稱" :prop="'workExperience.' + index + '.company'" :rules="{
                            required: true,
                            message: '請輸入公司名稱',
                            trigger: 'blur',
                        }">
                            <el-input v-model="experience.company" placeholder="請輸入公司名稱" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="職務名稱" :prop="'workExperience.' + index + '.position'" :rules="{
                            required: true,
                            message: '請輸入職務名稱',
                            trigger: 'blur',
                        }">
                            <el-input v-model="experience.position" placeholder="請輸入職務名稱" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="薪資" :prop="'workExperience.' + index + '.salary'" :rules="[{
                            required: true,
                            message: '請輸入薪資',
                            trigger: 'blur',
                        }, { type: 'number', message: '內容必須為數字' }]">
                            <el-input v-model.number="experience.salary" placeholder="請輸入薪資" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="離職原因" :prop="'workExperience.' + index + '.leavingReason'" :rules="{
                            required: true,
                            message: '請輸入離職原因',
                            trigger: 'blur',
                        }">
                            <el-input v-model="experience.leavingReason" placeholder="請輸入離職原因" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="服務起訖年月" :prop="'workExperience.' + index + '.period'" :rules="{
                            required: true,
                            message: '請輸入服務起訖年月',
                            trigger: 'blur',
                        }">
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
                <el-form-item label="姓名" prop="emergencyContact.name">
                    <el-input v-model="currentData.emergencyContact.name" placeholder="請輸入姓名" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item label="關係" prop="emergencyContact.relationship">
                    <el-input v-model="currentData.emergencyContact.relationship" placeholder="請輸入關係" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item label="電話" prop="emergencyContact.phone">
                    <el-input v-model="currentData.emergencyContact.phone" placeholder="請輸入電話" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item label="行動電話" prop="emergencyContact.mobile">
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
                <el-form-item label="銀行帳號" prop="bank.account">
                    <el-input v-model="currentData.bank.account" placeholder="請輸入銀行帳號" />
                </el-form-item>
            </el-col>

            <el-col :sm="12" :md="12" :lg="12">
                <el-form-item label="銀行分行名稱" prop="bank.branchName">
                    <el-input v-model="currentData.bank.branchName" placeholder="請輸入銀行分行名稱" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="12" :lg="12">
                <el-form-item label="身分證正面" prop="idCardFrontImageUrl">
                    <el-upload :show-file-list="false" :auto-upload="false" :on-change="changeIdCardFrontImage" drag
                        style="width: 100%;">
                        <el-avatar v-if="previewimageUrl1 || currentData.idCardFrontImageUrl"
                            :src="previewimageUrl1 || currentData.idCardFrontImageUrl" fit="cover" class="avatar" />
                        <div v-else>
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                將檔案拖曳至此處或<em>點擊上傳</em>
                            </div>
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
                <el-form-item label="身分證反面" prop="idCardBackImageUrl">
                    <el-upload :show-file-list="false" :auto-upload="false" :on-change="changeIdCardBackImage" drag
                        style="width: 100%;">
                        <el-avatar v-if="previewimageUrl2 || currentData.idCardBackImageUrl"
                            :src="previewimageUrl2 || currentData.idCardBackImageUrl" fit="cover" class="avatar" />
                        <div v-else>
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                將檔案拖曳至此處或<em>點擊上傳</em>
                            </div>
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
                    <el-button type="primary" @click="validateForm">驗證</el-button>
                    <el-button type="primary" @click="resetValidateForm">重置驗證</el-button>
                    <el-button type="primary" @click="submitForm">保存</el-button>
                    <el-button type="primary" @click="cancel">返回</el-button>
                </div>
            </el-col>
        </el-row>
    </el-form>

</template>

<script setup>
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';
import { db, storage } from '../api/firebaseConfig';
import { getDatabase, ref as dbRef, push, onValue, remove, set } from 'firebase/database';
import { ElMessage } from 'element-plus';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ref, reactive, onMounted, watch, computed } from 'vue';
// 創建一個響應式引用來存儲表單元素
const ruleFormRef = ref(null);


// 驗證大頭照
const validateProfileImage = (rule, value, callback) => {
    if (value === '' && previewimageUrl.value === null) {
        callback(new Error('請上傳照片'))
    } else {
        callback()
    }
}
// 驗證身分證正面
const validateIdCardFrontImage = (rule, value, callback) => {
    if (value === '' && previewimageUrl1.value === null) {
        callback(new Error('請上傳身分證正面照'))
    } else {
        callback()
    }
}
// 驗證身分證反面
const validateIdCardBackImage = (rule, value, callback) => {
    if (value === '' && previewimageUrl2.value === null) {
        callback(new Error('請上傳身分證反面照'))
    } else {
        callback()
    }
}

//驗證規則
const rules = reactive({
    profileImageUrl: [
        { required: true, message: '請上傳大頭貼', trigger: 'blur' }
    ],
    employeeId: [
        { required: true, message: '請輸入人員編號', trigger: 'blur' }
    ],
    department: [
        { required: true, message: '請選擇部門', trigger: 'change' }
    ],
    arrivalDate: [
        { type: 'date', required: true, message: '請選擇到職日', trigger: 'change' }
    ],
    name: [
        { required: true, message: "請輸入姓名", trigger: 'blur' },
        { whitespace: true, message: "用户名不能包含空格" },
    ],
    idNumber: [
        { required: true, message: '請輸入身分證號', trigger: 'blur' }
    ],
    sex: [
        { required: true, message: '請選擇性別', trigger: 'change' }
    ],
    birthday: [
        { type: 'date', required: true, message: '請選擇生日', trigger: 'change' }
    ],
    homePhone: [
        { required: true, message: '請輸入連絡電話', trigger: 'blur' },
        { pattern: /^0\d{1,3}-\d{6,8}$/, message: '請輸入正確的格式(ex:03-3216549)', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '請輸入行動電話', trigger: 'blur' },
        { pattern: /^09[0-9]{8}$/, message: '請輸入正確的手機格式', trigger: 'blur' }
    ],
    residenceAddress: [
        { required: true, message: '請輸入戶籍地址', trigger: 'blur' }
    ],
    mailingAddress: [
        { required: true, message: '請輸入通訊地址', trigger: 'blur' }
    ],
    email: [
        { required: true, type: 'email', message: '請輸入正確的信箱', trigger: 'blur' }
    ],
    maritalStatus: [
        { required: true, message: '請選擇婚姻狀況', trigger: 'change' }
    ],
    'emergencyContact.name': [
        {
            required: true,
            message: '請輸入緊急聯絡人姓名',
            trigger: 'blur'
        },
    ],
    'emergencyContact.relationship': [
        {
            required: true,
            message: '請輸入關係',
            trigger: 'blur'
        },
    ],
    'emergencyContact.phone': [
        { required: true, message: '請輸入連絡電話', trigger: 'blur' },
        { pattern: /^0\d{1,3}-\d{6,8}$/, message: '請輸入正確的手機格式', trigger: 'blur' }
    ],
    'emergencyContact.mobile': [
        {
            required: true,
            message: '請輸入行動電話',
            trigger: 'blur'
        },
        { pattern: /^09[0-9]{8}$/, message: '請輸入正確的手機格式', trigger: 'blur' }
    ],
    'bank.account': [
        {
            required: true,
            message: '請輸入銀行帳號',
            trigger: 'blur'
        },
    ],
    'bank.branchName': [
        {
            required: true,
            message: '請輸入分行名稱',
            trigger: 'blur'
        },
    ],
    profileImageUrl: [
        { validator: validateProfileImage, trigger: 'change' }
    ],
    idCardFrontImageUrl: [
        { validator: validateIdCardFrontImage, trigger: 'change' }
    ],
    idCardBackImageUrl: [
        { validator: validateIdCardBackImage, trigger: 'change' }
    ],
})



// 語言清單
const languages = ref(['國語', '台語', '客語', '英語', '日語']);
//技能清單
const expertises = ref(['Word', 'Excel', 'PowerPoint', 'GIS', 'Visio']);
//特殊身分清單
const specialStatus = ref(['原住民', '身心障礙'])
//部門清單
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
            key: Date.now(),
            name: "",
            department: "",
            period: []
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

//新增人員
const addItem = () => {

    const itemsRef = dbRef(db, 'items');

    //啟用狀態
    currentData.value.ifEnable = true
    push(itemsRef, currentData.value);
};

// 更新資料
const updateData = () => {

    set(dbRef(db, `items/${currentData.value.key}`), currentData.value);
}

// 提交表單的函數
const submitForm = () => {
    ruleFormRef.value.validate(async (valid) => {

        if (!valid) {//驗證失敗
            ElMessage.error('驗證失敗，請檢查輸入')
        } else {//驗證成功 開始上傳圖片跟存取資料
            ElMessage.success('驗證成功，可以提交表單')

            try {
                await upload('1'); // 等待上傳完成
                await upload('2'); // 等待上傳完成
                await upload('3'); // 等待上傳完成

                if (currentData.value.key !== null) {
                    //有key 更新資料
                    updateData();
                    ElMessage({
                        message: '已修改資料',
                        type: 'success',
                    });
                } else {
                    // 沒key 新增人員
                    addItem();
                    ElMessage({
                        message: '已新增資料',
                        type: 'success',
                    });
                }
                cancel();
            } catch (error) {
                console.error('上傳或保存資料失敗:', error);
                ElMessage({
                    message: '上傳或保存資料失敗',
                    type: 'error',
                });
            }
        }
    })
}

// 
// 驗證
const validateForm = (rule, value, callback) => {
    ruleFormRef.value.validate()

    // ruleFormRef.value.validate(async (valid) => {

    //     if (!valid) {//驗證失敗
    //         ElMessage.error('驗證失敗，請檢查輸入')
    //     } else {//驗證成功 開始上傳圖片跟存取資料
    //         ElMessage.success('驗證成功，可以提交表單')
    //     }
    // })
}
const resetValidateForm = () => {

    if (!ruleFormRef.value) return
    ruleFormRef.value.resetFields()
}
//清空資料 回到首頁
const cancel = () => {
    employeeStore.resetEmployeeStore()
    // 回到上一頁
    router.back();
};

// ======以下處理上傳========
const uploadProgress = ref(0);
// 大頭照預覽
const previewimageUrl = ref(null)//路徑暫存
const previewfile = ref(null)//檔案暫存
// 身分證正面預覽
const previewimageUrl1 = ref(null)//路徑暫存
const previewfile1 = ref(null)//檔案暫存
// 身分證反面預覽
const previewimageUrl2 = ref(null)//路徑暫存
const previewfile2 = ref(null)//檔案暫存

const changeProfileImage = async (event) => {
    const isJPG = event.raw.type === 'image/jpeg';
    const isPNG = event.raw.type === 'image/png';
    const isLt2M = event.size / 1024 / 1024 < 2;

    if (!isJPG && !isPNG) {
        ElMessage.error('上傳的大頭照只能是 JPG 或 PNG 格式!');
        return;
    }
    if (!isLt2M) {
        ElMessage.error('上傳的大頭照大小不能超過 2MB!');
        return;
    }

    // 設定預覽文件
    previewfile.value = event;
    const file = event.raw;

    if (file) {
        try {
            // 使用 Promise 處理 FileReader 的異步操作
            const result = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    resolve(e.target.result); // 成功讀取，返回結果
                };
                reader.onerror = function (error) {
                    reject(error); // 讀取失敗，返回錯誤
                };
                reader.readAsDataURL(file);
            });

            // 讀取成功後，將結果賦值給預覽圖片 URL
            previewimageUrl.value = result;

            // 所有操作完成後，進行表單驗證
        } catch (error) {
            ElMessage.error('讀取文件時發生錯誤');
            console.error(error);
        } finally {
            //重新驗證
            validateForm();

        }
    }
}

const changeIdCardFrontImage = async (event) => {
    const isJPG = event.raw.type === 'image/jpeg';
    const isPNG = event.raw.type === 'image/png';
    const isLt2M = event.size / 1024 / 1024 < 2;

    if (!isJPG && !isPNG) {
        ElMessage.error('只能是 JPG 或 PNG 格式!');
        return
    }
    if (!isLt2M) {
        ElMessage.error('上傳大頭照大小不能超過 2MB!');
        return
    }
    // console.log(event);
    previewfile1.value = event;
    const file = event.raw;
    console.log(file);


    if (file) {
        try {
            // 使用 Promise 處理 FileReader 的異步操作
            const result = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    resolve(e.target.result); // 成功讀取，返回結果
                };
                reader.onerror = function (error) {
                    reject(error); // 讀取失敗，返回錯誤
                };
                reader.readAsDataURL(file);
            });

            // 讀取成功後，將結果賦值給預覽圖片 URL
            previewimageUrl1.value = result;

            // 所有操作完成後，進行表單驗證
        } catch (error) {
            ElMessage.error('讀取文件時發生錯誤');
            console.error(error);
        } finally {
            //重新驗證
            validateForm();

        }
    }
}
const changeIdCardBackImage = async (event) => {
    const isJPG = event.raw.type === 'image/jpeg';
    const isPNG = event.raw.type === 'image/png';
    const isLt2M = event.size / 1024 / 1024 < 2;

    if (!isJPG && !isPNG) {
        ElMessage.error('只能是 JPG 或 PNG 格式!');
        return
    }
    if (!isLt2M) {
        ElMessage.error('上傳大頭照大小不能超過 2MB!');
        return
    }
    // console.log(event);
    previewfile2.value = event;
    const file = event.raw;
    console.log(file);


    if (file) {
        try {
            // 使用 Promise 處理 FileReader 的異步操作
            const result = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    resolve(e.target.result); // 成功讀取，返回結果
                };
                reader.onerror = function (error) {
                    reject(error); // 讀取失敗，返回錯誤
                };
                reader.readAsDataURL(file);
            });

            // 讀取成功後，將結果賦值給預覽圖片 URL
            previewimageUrl2.value = result;

            // 所有操作完成後，進行表單驗證
        } catch (error) {
            ElMessage.error('讀取文件時發生錯誤');
            console.error(error);
        } finally {
            //重新驗證
            validateForm();

        }
    }
}

//處理照片上傳
const upload = async (f) => {
    let file = null;
    if (f == '1') {
        file = previewfile.value;

    } else if (f == '2') {
        file = previewfile1.value;

    } else {
        file = previewfile2.value;
    }
    if (file) {
        console.log('filefile:', file);
        const fileRef = storageRef(storage, `images/${file.raw.name}`);
        const metadata = { contentType: file.raw.type };
        const uploadTask = uploadBytesResumable(fileRef, file.raw, metadata);

        // 返回一個新的 Promise，解析（resolve）當上傳成功，拒絕（reject）當上傳失敗
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadProgress.value = progress;
                    console.log(`Upload is ${progress}% done`);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // 當上傳出錯時拒絕（reject）這個 Promise
                    reject(error);
                },
                async () => {
                    // 當上傳成功時解析（resolve）這個 Promise
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    if (f == 1) {
                        file = previewfile.value;
                        currentData.value.profileImageUrl = downloadURL;

                    } else if (f == 2) {
                        file = previewfile1.value;
                        currentData.value.idCardFrontImageUrl = downloadURL;

                    } else {
                        file = previewfile2.value;
                        currentData.value.idCardBackImageUrl = downloadURL;
                    }
                    // currentData.value.profileImageUrl = downloadURL;
                    // console.log('profileImageUrl:', currentData.value.profileImageUrl);

                    console.log('File available at', downloadURL);
                    ElMessage({
                        message: '上傳成功',
                        type: 'success',
                    });

                    // 在此处可以将下载URL存储到Firebase数据库或其他地方
                    // const userId = 'your_user_id'; // 您可以根据实际情况获取用户ID
                    // const imageRef = dbRef(db, 'users/' + userId + '/profilePicture');
                    // await set(imageRef, downloadURL);
                    // console.log('文件URL成功存储到数据库');

                    resolve(); // 上傳成功，解析（resolve）這個 Promise
                }
            );
        });
    }
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
    border-radius: 6px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border-color 0.3s ease; // 添加过渡效果，使颜色变化更加平滑

    &:hover {
        border-color: #409eff; // 悬停时改变边框颜色

        .avatar-uploader-icon {
            color: #409eff; // 悬停时改变图标颜色
        }
    }
}

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



.avatar {
    margin: 2px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
}

.el-upload-dragger {
    padding: 0;
}
</style>