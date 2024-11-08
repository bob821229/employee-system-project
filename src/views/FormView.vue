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
            <!-- 人員編號 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="人員編號" prop="employeeId">
                    <el-input v-model="currentData.employeeId" placeholder="請輸入編號" />
                </el-form-item>
            </el-col>

            <!-- 部門   -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="部門" prop="department">
                    <el-select v-model="currentData.department" placeholder="請選擇部門">
                        <el-option v-for="d in options.departmentList" :key="d.value" :label="d.text" :value="d.value" />
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- 到職日 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="到職日" prop="arrivalDate">
                    <el-date-picker v-model="currentData.arrivalDate" type="date" style="width: 100%;"
                        placeholder="請選擇到職日" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                </el-form-item>
            </el-col>
            <!-- 信箱 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="信箱" prop="email">
                    <el-input v-model="currentData.email" placeholder="請輸入信箱" />
                </el-form-item>
            </el-col>
            <!-- 姓名 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="currentData.userName" placeholder="請輸入姓名" />
                </el-form-item>
            </el-col>
            <!-- 身分證 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="身分證號" prop="idNumber">
                    <el-input v-model="currentData.idNumber" maxlength="10" show-word-limit placeholder="請輸入身分證號" />
                </el-form-item>
            </el-col>
            <!-- 生日 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="currentData.birthday" type="date" style="width: 100%;" placeholder="請選擇生日"
                        format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                </el-form-item>
            </el-col>
            <!-- 性別 -->
            <el-col :sm="24" :md="6" :lg="6">
                <el-form-item label="性別" prop="sex">
                    <el-radio-group v-model="currentData.sex">
                        <el-radio  v-for="d in options.sexList" :key="d.value" :label="d.text" :value="d.text" size="large">{{d.text}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <!-- 照片 -->
            <el-col :sm="24" :md="6" :lg="3" v-show="false">
                <el-form-item label="照片" prop="profileImageUrl">
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
            <!-- 連絡電話 -->
            <el-col :sm="24" :md="12" :lg="12">
                <el-form-item label="連絡電話" prop="homePhone">
                    <el-input v-model="currentData.homePhone" placeholder="請輸入連絡電話" />
                </el-form-item>
            </el-col>
            <!-- 行動電話 -->
            <el-col :sm="24" :md="12" :lg="12">
                <el-form-item label="行動電話" prop="phone">
                    <el-input v-model="currentData.phone" maxlength="10" show-word-limit placeholder="請輸入行動電話" />
                </el-form-item>
            </el-col>
            <!-- 戶籍郵遞區號 -->
            <el-col :sm="24" :md="24" :lg="4">
                <el-form-item label="戶籍地址郵遞區號" prop="residencePostalCode">
                    <el-input v-model="currentData.residencePostalCode" placeholder="請輸入戶籍地址郵遞區號" />
                </el-form-item>
            </el-col>
            <!-- 戶籍地址 -->
            <el-col :sm="24" :md="24" :lg="20">
                <el-form-item label="戶籍地址" prop="residenceAddress">
                    <el-input v-model="currentData.residenceAddress" placeholder="請輸入戶籍地址" />
                </el-form-item>
            </el-col>
            <!-- 通訊郵遞區號 -->
            <el-col :sm="24" :md="24" :lg="4">
                <el-form-item label="通訊地址郵遞區號" prop="mailingPostalCode">
                    <el-input v-model="currentData.mailingPostalCode" placeholder="請輸入通訊地址郵遞區號">
                    </el-input>
                </el-form-item>
            </el-col>
            <!-- 通訊地址 -->
            <el-col :sm="24" :md="24" :lg="20">
                <el-form-item label="通訊地址" prop="mailingAddress">
                    <el-input v-model="currentData.mailingAddress" placeholder="請輸入通訊地址">
                        <template #append>
                            <el-button @click="copyResidence">同戶籍地址</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-col>
            <!-- 職稱 -->
            <el-col :sm="24" :md="24" :lg="6" v-if="checkUser">
                <el-form-item label="職稱" prop="positionTitle">
                    <el-select v-model="currentData.positionTitle" placeholder="選擇職稱" filterable allow-create
                        default-first-option :reserve-keyword="false">
                        <el-option v-for="d in options.positionTitleList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- 特殊身分 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="特殊身分" prop="specialStatus">
                    <el-select v-model="currentData.specialStatus" multiple placeholder="請選擇特殊身分"
                        @change="handleSpecialStatusChange">
                        <el-option v-for="d in options.specialStatuList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- 駕照 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="駕照" prop="drvingLicense">
                    <el-select v-model="currentData.drvingLicense" multiple placeholder="請選擇駕照"
                        @change="handleLicenseChange">
                        <el-option v-for="d in options.drvingLicenseList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- 婚姻 -->
            <el-col :sm="24" :md="12" :lg="6">
                <el-form-item label="婚姻狀況" prop="maritalStatus">
                    <el-select v-model="currentData.maritalStatus" placeholder="請選擇婚姻狀況">
                        <el-option  v-for="d in options.maritalStatusList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- 離職日期 -->
            <el-col :span="24" v-if="checkUser">
                <el-form-item label="離職日期" prop=" resignationDate">
                    <el-date-picker v-model="currentData.resignationDate" type="date" style="width: 100%;"
                        placeholder="請選擇離職日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                    <!-- </el-input> -->
                </el-form-item>
            </el-col>

            <!-- TODO 教育程度 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">教育程度</el-text>
                </el-divider>
            </el-col>
            <!-- 學歷 -->
            <el-col :span="24">
                <el-row style="width: 100%;align-items: end;" :gutter="10"
                    v-for="(school, index) in currentData.educationExperiences" :key="index" class="work-experience-item">
                    <el-col :span="2">
                        <el-form-item label="學位" :prop="'educationExperiences.' + index + '.academicDegree'" :rules="{
                            required: true,
                            message: '請輸入學位',
                            trigger: 'change',
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    callback(new Error('請選擇學位'))
                                } else {
                                    callback()
                                }
                            }
                        }">
                            <el-select v-model="school.academicDegree" placeholder="請選擇學位">
                                <el-option disabled label="請選擇" value="" />
                                <el-option v-for="d in options.academicDegreeList" :key="d.value" :label="d.text" :value="d.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="學校名稱" :prop="'educationExperiences.' + index + '.name'" :rules="{
                            required: true,
                            message: '請輸入學校名稱',
                            trigger: 'blur',
                        }">
                            <el-input v-model="school.name" placeholder="請輸入學校名稱" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="科系" :prop="'educationExperiences.' + index + '.department'" :rules="{
                            required: true,
                            message: '請輸入科系',
                            trigger: 'blur',
                        }">
                            <el-input v-model="school.department" placeholder="請輸入科系" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label="畢業/肄業" :prop="'educationExperiences.' + index + '.degreeStatus'" :rules="{
                            required: true,
                            trigger: 'change',
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    callback(new Error('請選擇畢業/肄業!'))
                                } else {
                                    callback()
                                }
                            }
                        }">
                            <el-select v-model="school.degreeStatus" placeholder="請選擇畢業/肄業">
                                <el-option disabled label="請選擇" value="" />
                                <el-option v-for="d in options.graduateStatusList" :key="d.value" :label="d.text" :value="d.value"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="修業起訖年月" :prop="'educationExperiences.' + index + '.period'" :rules="{
                            type: 'array',
                            required: true,
                            trigger: 'change',
                            validator: (rule, value, callback) => {
                                if (value && value.length === 2 && value[0] !== null && value[1] !== null) {
                                    callback();
                                } else {
                                    callback(new Error('請選擇有效的修業起訖年月'));
                                }
                            }
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
            <!-- 職務經歷 -->
            <el-col :span="24">
                <el-row style="width: 100%;align-items: end;" :gutter="10"
                    v-for="(experience, index) in currentData.workExperiences" :key="index" class="work-experience-item">
                    <el-col :span="4">
                        <el-form-item label="公司名稱" :prop="'workExperiences.' + index + '.company'" :rules="{
                            required: true,
                            message: '請輸入公司名稱',
                            trigger: 'blur',
                        }">
                            <el-input v-model="experience.company" placeholder="請輸入公司名稱" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="職務名稱" :prop="'workExperiences.' + index + '.position'" :rules="{
                            required: true,
                            message: '請輸入職務名稱',
                            trigger: 'blur',
                        }">
                            <el-input v-model="experience.position" placeholder="請輸入職務名稱" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="薪資" :prop="'workExperiences.' + index + '.salary'" :rules="[{
                            required: true,
                            message: '請輸入薪資',
                            trigger: 'blur',
                        }, { type: 'number', message: '內容必須為數字' }]">
                            <el-input v-model.number="experience.salary" placeholder="請輸入薪資" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="離職原因" :prop="'workExperiences.' + index + '.leavingReason'" :rules="{
                            required: true,
                            message: '請輸入離職原因',
                            trigger: 'blur',
                        }">
                            <el-input v-model="experience.leavingReason" placeholder="請輸入離職原因" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="服務起訖年月" :prop="'workExperiences.' + index + '.period'" :rules="{
                            type: 'array',
                            required: true,
                            trigger: 'change',
                            validator: (rule, value, callback) => {
                                if (value && value.length === 2 && value[0] !== null && value[1] !== null) {
                                    callback();
                                } else {
                                    callback(new Error('請選擇有效的服務起訖年月'));
                                }
                            }
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
            <!-- 語言能力 -->
            <el-col :sm="24" :md="8" :lg="8">
                <el-form-item label="語言能力">
                    <el-select v-model="currentData.languages" placeholder="選擇語言能力" multiple filterable allow-create
                        default-first-option :reserve-keyword="false">
                        <el-option v-for="l in options.languageList" :key="l.value" :label="l.text" :value="l.text" />
                        <!-- <template #tag>
                            <el-tag v-for="l in currentData.languages" :key="l" closable type='info'>{{l}}</el-tag>
                        </template> -->
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- 特殊專長 -->
            <el-col :sm="24" :md="8" :lg="8">
                <el-form-item label="特殊專長">
                    <el-select v-model="currentData.computerExpertise" placeholder="選擇特殊專長" multiple filterable
                        allow-create default-first-option :reserve-keyword="false">
                        <el-option v-for="d in options.expertiseList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- 專業證照 -->
            <el-col :sm="24" :md="8" :lg="8">
                <el-form-item label="專業證照">
                    <!-- <el-input v-model="currentData.professionalLicense" placeholder="請輸入專業證照" /> -->
                    <el-select v-model="currentData.professionalLicense" placeholder="請輸入專業證照" multiple filterable
                        allow-create default-first-option :reserve-keyword="false">
                        <el-option v-for="d in options.professionalLicenseList" :key="d.value" :label="d.text" :value="d.text" />
                    </el-select>
                </el-form-item>
            </el-col>

            <!-- TODO 緊急聯絡人 -->
            <el-col :span="24">
                <el-divider>
                    <el-text size="large" tag="b">緊急聯絡人</el-text>
                </el-divider>
            </el-col>

            <!-- <el-col :sm="12" :md="6" :lg="6">
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
                <el-form-item label="連絡電話" prop="emergencyContact.phone">
                    <el-input v-model="currentData.emergencyContact.phone" placeholder="請輸入電話" />
                </el-form-item>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
                <el-form-item label="行動電話" prop="emergencyContact.mobile">
                    <el-input v-model="currentData.emergencyContact.mobile" maxlength="10" show-word-limit
                        placeholder="請輸入行動電話" />
                </el-form-item>
            </el-col> -->

            <!-- 緊急聯絡人 -->
            <el-col :span="24">
                <el-row style="width: 100%;align-items: end;" :gutter="10"
                    v-for="(emergencyContact, index) in currentData.emergencyContacts" :key="index" class="work-experience-item">
                    <el-col :span="5">
                        <el-form-item label="姓名" :prop="'emergencyContacts.' + index + '.name'" :rules="{
                            required: true,
                            message: '請輸入姓名',
                            trigger: 'blur',
                        }">
                            <el-input v-model="emergencyContact.name" placeholder="請輸入姓名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="關係" :prop="'emergencyContacts.' + index + '.relationship'" :rules="{
                            required: true,
                            message: '請輸入關係',
                            trigger: 'blur',
                        }">
                            <el-input v-model="emergencyContact.relationship" placeholder="請輸入關係" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="連絡電話" :prop="'emergencyContacts.' + index + '.phone'" :rules="[
                            { required: true, trigger: 'blur',validator:validatePhoneOrMobile },
                            { pattern: /^0\d{1,3}-\d{6,8}$/, message: '請輸入正確的格式(ex:02-123456)', trigger: 'blur' }
                        ]">
                            <el-input v-model="emergencyContact.phone" placeholder="請輸入連絡電話" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="行動電話" :prop="'emergencyContacts.' + index + '.mobile'" :rules="[
                            {
                                required: true,
                                trigger: 'blur',
                                validator:validatePhoneOrMobile
                            },
                            { pattern: /^09[0-9]{8}$/, message: '請輸入正確的手機格式(ex:0912345678)', trigger: 'blur' }
                        ]">
                            <el-input v-model="emergencyContact.mobile" placeholder="請輸入行動電話" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item
                            style="display: flex;align-items:flex-end;justify-content: center;width: 100%;height: 100%;">
                            <el-button type="success" @click="addeMergencyContacts()">新增</el-button>
                            <el-button type="danger" @click="removeeMergencyContacts(index)">刪除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-col>


            <!-- TODO 薪資撥入帳號 -->
            <el-col :span="24" v-show="false">
                <el-divider>
                    <el-text size="large" tag="b">薪資撥入帳號</el-text>
                    <el-text size="large" type="danger" tag="b">(請詳細填寫正確)</el-text>
                </el-divider>
            </el-col>

            <!-- 銀行帳號 -->
            <el-col :sm="12" :md="12" :lg="12" v-show="false">
                <el-form-item label="國泰世華銀行帳號" prop="bankAccount">
                    <el-input v-model="currentData.bankAccount" maxlength="12" show-word-limit placeholder="請輸入銀行帳號" />
                </el-form-item>
            </el-col>
            <!-- 銀行名稱 -->
            <el-col :sm="12" :md="12" :lg="12" v-show="false">
                <el-form-item label="國泰世華銀行分行名稱" prop="bankName">
                    <el-input v-model="currentData.bankName" placeholder="請輸入銀行分行名稱" />
                </el-form-item>
            </el-col>
            <!-- 身分證正面 -->
            <el-col :sm="12" :md="12" :lg="12" v-show="false">
                <el-form-item label="身分證正面" prop="idCardFrontImageUrl">
                    <el-upload :show-file-list="false" :auto-upload="false" :on-change="changeIdCardFrontImage" drag
                        style="width: 100%;">
                        <el-watermark v-if="previewimageUrl1 || currentData.idCardFrontImageUrl" class="watermark"
                            :content="config.content" :font="config.font" :z-index="config.zIndex"
                            :rotate="config.rotate" :gap="config.gap" :offset="config.offset">
                            <el-avatar :src="previewimageUrl1 || currentData.idCardFrontImageUrl" fit="cover"
                                class="avatar" />
                        </el-watermark>
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
            <!-- 身分證反面 -->
            <el-col :sm="12" :md="12" :lg="12" v-show="false">
                <el-form-item label="身分證反面" prop="idCardBackImageUrl">
                    <el-upload :show-file-list="false" :auto-upload="false" :on-change="changeIdCardBackImage" drag
                        style="width: 100%;">
                        <el-watermark v-if="previewimageUrl2 || currentData.idCardBackImageUrl" class="watermark"
                            :content="config.content" :font="config.font" :z-index="config.zIndex"
                            :rotate="config.rotate" :gap="config.gap" :offset="config.offset">
                            <el-avatar :src="previewimageUrl2 || currentData.idCardBackImageUrl" fit="cover"
                                class="avatar" />
                        </el-watermark>
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
            <!-- 按鈕區 -->
            <el-col :span="24">
                <div style="text-align: center;margin: 20px 0;">
                    <el-button type="primary" @click="validateForm(ruleFormRef)" >保存</el-button>
                    <el-button type="primary" @click="resetValidateForm" v-if="false">重置驗證</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="false">保存</el-button>
                    <el-button type="primary" @click="cancel" v-if="false">返回</el-button>
                    <el-button type="primary" @click="updateData" v-if="false">updateData</el-button>
                    <el-button type="primary" @click="submitForm1(ruleFormRef)" v-if="false">submitForm1</el-button>
                </div>
            </el-col>
        </el-row>
    </el-form>
    <div style="position: fixed;right: 20px; bottom: 20px;">
        <el-tooltip content="匯出PDF" placement="left-start" effect="dark">
            <el-button :icon="Upload" type="primary" plain round>匯出</el-button>
        </el-tooltip>

    </div>

</template>

<script setup>
import { useEmployeeStore } from '../stores/employee';
import { useRouter } from 'vue-router';
import { db, storage } from '../api/firebaseConfig';
import { getDatabase, ref as dbRef, push, onValue, remove, set } from 'firebase/database';
import { ElMessage } from 'element-plus';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ref, reactive, onMounted, watch, computed, inject } from 'vue';
import { Upload } from '@element-plus/icons-vue'
import { getOptions,saveProfile} from '../api/api';

//引用dayjs
const dayjs = inject('dayjs')
// 創建一個響應式引用來存儲表單元素
const ruleFormRef = ref(null);
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const validatePhoneOrMobile = (rule, value, callback) => {
     // 取得聯絡人 index
     const index = rule.field.split('.')[1]; // 提取 index，例如 "0"

// 取得當前聯絡人的 phone 和 mobile 值
const phone = currentData.value.emergencyContacts[index].phone;
const mobile = currentData.value.emergencyContacts[index].mobile;

// 驗證：若兩者皆未填寫，則回傳錯誤
if (!phone && !mobile) {
    callback(new Error('請至少填寫聯絡電話或行動電話'));
} else {
    callback(); // 驗證通過
}
}
// 驗證大頭照
const validateProfileImage = (rule, value, callback) => {
    if (value === '' && previewimageUrl.value === null) {
        return callback(new Error('請上傳照片'))

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
    employeeId: [
        { required: false, message: '請輸入人員編號', trigger: 'blur' }
    ],
    department: [
        { required: true, message: '請選擇部門', trigger: 'change' }
    ],
    arrivalDate: [
        { type: 'date', required: true, message: '請選擇到職日', trigger: 'change' }
    ],
    userName: [
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
    residencePostalCode: [
        { required: true, message: '戶籍地址郵遞區號', trigger: 'blur' }
    ],
    residenceAddress: [
        { required: true, message: '請輸入戶籍地址', trigger: 'blur' }
    ],
    mailingPostalCode: [
        { required: true, message: '通訊地址郵遞區號', trigger: 'blur' }
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
    bankAccount: [
        {
            required: false,
            message: '請輸入銀行帳號',
            trigger: 'blur'
        },
        // { validator: (rule, value, callback) => {
        //     if (value && !/^[0-9]{12}$/.test(value)) {
        //         callback(new Error('請輸入正確的帳號格式'));
        //     } else {
        //         callback();
        //     }
        // }, trigger: 'blur' }
    ],
    bankName: [
        {
            required: false,
            message: '請輸入分行名稱',
            trigger: 'blur'
        },
    ],
    profileImageUrl: [
        { required: false, message: '請上傳大頭貼', trigger: 'change', validator: validateProfileImage }
    ],
    idCardFrontImageUrl: [
        { required: false, message: '請上傳身分證正面照', trigger: 'change', validator: validateIdCardFrontImage }
    ],
    idCardBackImageUrl: [
        { required: false, message: '請上傳身分證反面照', trigger: 'change', validator: validateIdCardBackImage }
    ],
    specialStatus: [
        {
            required: false,
            message: '請至少選擇一個特殊身分',
            trigger: 'change',
        }
    ],
    drvingLicense: [
        {
            required: false,
            message: '請至少選擇一個駕照種類',
            trigger: 'change',
        }
    ],
})

//取得下拉選單
async function fetchOptions(){
  try {
    const result = await getOptions()
    // console.log("@@opts:",result.data.departmentList)
    options.value= result.data

  } catch (error) {
    console.log(error)
  }
}
// 下拉清單
const options=ref({   
    "departmentList": [
        { "text": "研究一所", "value": "研究一所" }
    ],    
    "sexList":[
        { "text": "男", "value": "男" }
    ],
    "positionTitleList": [
        { "text": "開發人員", "value": "開發人員" }
    ],
    "specialStatuList": [
        { "text": "原住民", "value": "原住民" }
    ],
    "drvingLicenseList":[
        { "text": "無", "value": "無" }
    ],
    "maritalStatusList":[
        { "text": "未婚", "value": "未婚" }
    ],
    "academicDegreeList":[
        { "text": "博士", "value": "博士" }
    ],
    "graduateStatusList":[
        { "text": "畢業", "value": "畢業" }
    ],
    "languageList": [
        { "text": "國語", "value": "國語" }
    ],
    "expertiseList": [
        { "text": "Word", "value": "Word" }
    ],
    "professionalLicenseList": [
        { "text": "系統分析師 (CSM)", "value": "系統分析師 (CSM)" }
    ],
    "paperTypeList":[
        { "text": "博士論文", "value": "博士論文" }
    ]
})

const employeeStore = useEmployeeStore();

//控制浮水印
const config = reactive(
    {
        content: '僅限台農院人事建檔',
        font: {
            fontSize: 24,
            color: 'rgba(255, 0, 0, 0.78)',
            fontWeight: 'bold',
            textBaseline: 'top',
        },
        zIndex: 30,
        rotate: -22,
        gap: [100, 100],
    })
//路由
const router = useRouter();
//目前顯示的資料
const currentData = ref(employeeStore.tmpBasicInformation);


// 處理駕照選擇變化
const handleLicenseChange = (value) => {
    if (value.includes('無')) {
        currentData.value.drvingLicense = []
    } else {
        currentData.value.drvingLicense = value
    }
}
// 處理特殊身分選擇變化
const handleSpecialStatusChange = (value) => {
    if (value.includes('無')) {
        currentData.value.specialStatus = []
    } else {
        currentData.value.specialStatus = value
    }
}
// 確認使用者身份
const checkUser = computed(() => {
    // return currentData.value.name === employeeStore.getUserInfo.userName || employeeStore.getUserInfo.role == '3'
    return employeeStore.getUserInfo.role == '3'
})
//同戶籍地址資料
const copyResidence = () => {
    currentData.value.mailingPostalCode = deepCopy(currentData.value.residencePostalCode)
    currentData.value.mailingAddress = deepCopy(currentData.value.residenceAddress)
}
//新增學歷
const addSchool = () => {
    let arrLength = currentData.value.educationExperiences.length
    if (arrLength == 5) {
        alert("最多五筆")
    } else {
        currentData.value.educationExperiences.push({
            key: Date.now(),
            name: null,
            academicDegree: null,
            department: null,
            degreeStatus: null,
            period: [null, null],
        });
    }
}
//移除學歷
const removeSchool = (index) => {
    let arrLength = currentData.value.educationExperiences.length
    if (arrLength == 1) {
        alert("最少一筆")
    } else {
        currentData.value.educationExperiences.splice(index, 1);
    }
}
//新增工作經歷
const addWorkExperience = () => {
    let arrLength = currentData.value.workExperiences.length
    if (arrLength == 3) {
        alert("最多三筆")
    } else {
        currentData.value.workExperiences.push({
            key: Date.now(),
            company: null,//公司名稱
            position: null,//職務名稱
            salary: null,//薪資
            leavingReason: null,//離職原因
            period: [null, null]//服務起訖年月
        });
    }
}
//移除工作經歷
const removeWorkExperience = (index) => {
    let arrLength = currentData.value.workExperiences.length
    if (arrLength == 1) {
        alert("最少一筆")
    } else {
        currentData.value.workExperiences.splice(index, 1);
    }
}
//新增工作經歷
const addeMergencyContacts = () => {
    let arrLength = currentData.value.emergencyContacts.length
    if (arrLength == 3) {
        alert("最多三筆")
    } else {
        currentData.value.emergencyContacts.push({
            mobile: null,//緊急聯絡人手機
            name: null,//緊急聯絡人名稱
            phone: null,//緊急聯絡人電話
            relationship: null,//緊急聯絡人關係
        });
    }
}
//移除工作經歷
const removeeMergencyContacts = (index) => {
    let arrLength = currentData.value.emergencyContacts.length
    if (arrLength == 1) {
        alert("最少一筆")
    } else {
        currentData.value.emergencyContacts.splice(index, 1);
    }
}


//新增人員
const addItem = () => {
    let obj = {}
    const itemsRef = dbRef(db, 'users');
    obj = employeeStore.tmpUserInfo
    console.log('obj:', obj)
    push(itemsRef, obj);
}
// 更新資料
const updateData = () => {
    let firebaseKey = employeeStore.tmpUserInfo.firebaseKey
    console.log('firebaseKey:', firebaseKey)
    let isSelf = (employeeStore.tmpUserInfo.userName == employeeStore.getUserInfo.userName)
    //如果修改對象是本人，則更新store中的資料
    console.log('isSelf:', isSelf)
    if (isSelf) {
        employeeStore.getUserInfo = deepCopy(employeeStore.tmpUserInfo)
        console.log('本人更新成功:', employeeStore.tmpUserInfo);
    } else {
        console.log('非本人更新成功:', employeeStore.tmpUserInfo);
    }
    set(dbRef(db, `users/${firebaseKey}`), employeeStore.tmpUserInfo);
}

// 提交表單的函數
const submitForm = async () => {
    console.log('submitForm')
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid) => {
        console.log('Validation started')
        console.log("valid:", valid)
        if (!valid) {//驗證失敗
            console.log('Validation failed')
            ElMessage.error('驗證失敗，請檢查輸入')
        } else {//驗證成功 開始上傳圖片跟存取資料
            console.log('Validation succeeded')
            
            ElMessage.success('驗證成功，可以提交表單')

            try {
                console.log('Starting upload process')
                await upload('1'); // 等待上傳完成
                await upload('2'); // 等待上傳完成
                await upload('3'); // 等待上傳完成
                console.log('Upload process completed')

                if (employeeStore.tmpUserInfo.firebaseKey !== '') {
                    console.log('有key 更新資料')
                    //有key 更新資料
                    updateData();
                    ElMessage({
                        message: '已修改資料',
                        type: 'success',
                    });
                } else {
                    // 沒key 新增人員
                    console.log('沒key 新增人員')
                    addItem();
                    ElMessage({
                        message: '已新增資料',
                        type: 'success',
                    });
                }
                // cancel();
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
//測試驗證功能
const submitForm1 = async (formEl = ruleFormRef) => {
    console.log('submitForm1')
    console.log("ruleFormRef:", ruleFormRef.value)
    console.log("formEl:", formEl)
    if (!formEl) return;
    formEl.validate((valid) => {
        console.log('Validation result:', valid);
        if (valid) {
            console.log('驗證成功!');
        } else {
            console.log('驗證失敗!');
        }
    });
}
//深拷貝
const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
// 驗證
const validateForm = (elForm = ruleFormRef.value) => {
    console.log("驗證", ruleFormRef.value)
    ruleFormRef.value.validate(async (valid, fields) => {
        if (!valid) {
            // 使用 Object.keys 列出所有未通過的欄位名稱
            const errorFields = Object.keys(fields);
            
            // 顯示具體的錯誤訊息
            console.log("未通過驗證的欄位：", errorFields);
            console.log("詳細錯誤信息：", fields); // 會顯示欄位及對應的錯誤訊息
            
            ElMessage.error('驗證失敗，請檢查輸入');
            
            // 若要進一步顯示每個欄位的錯誤訊息
            errorFields.forEach(field => {
                console.log(`欄位 ${field} 錯誤：`, fields[field][0].message);
            });
        } else {
            ElMessage.success('驗證成功，可以提交表單');
            let apiData = deepCopy(currentData.value)//深拷貝不影響原來數據
            apiData= dataFormatHandle(apiData)
            console.log("要更新的資料表處理前:",currentData.value)
            console.log("要更新的資料表處理後:",apiData)
            try {
                const respone=await saveProfile(apiData)
                console.log("更新成功，返回的數據:", respone.data);
            } catch (error) {
                console.log(error)
            }
        }
    });
};

//重製驗證
const resetValidateForm = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.resetFields()
}
//清空資料 回到首頁
const cancel = () => {
    employeeStore.resetTmpUserInfo()
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

onMounted(()=>{
    fetchOptions()
})

//把資料轉換成api要用的結構
function dataFormatHandle(data){
        //到職日格式化
        // data.arrivalDate=dayjs(data.arrivalDate).format('YYYY-MM-DD')
        //到職日格式化
        // data.birthday=dayjs(data.birthday).format('YYYY-MM-DD')
        //緊急聯絡人格式化
        // if(data.emergencyContacts.length==0){
        //     data.emergencyContacts.push({
        //         mobile: null,//緊急聯絡人手機
        //         name: null,//緊急聯絡人名稱
        //         phone: null,//緊急聯絡人電話
        //         relationship: null,//緊急聯絡人關係
        //     })
            
        // }
        // 工作經歷格式化
        data.workExperiences.forEach((item) =>{
            item.startFrom=item.period[0]+"-01"
            item.endAt=item.period[1]+"-01"
        })
        //教育經歷格式化
        data.educationExperiences.forEach((item) =>{
            item.startFrom=item.period[0]+"-01"
            item.endAt=item.period[1]+"-01"
        })
        //駕照格式化
        if(data.drvingLicense.length>0){
            let arry=[]
            data.drvingLicense.forEach((item) =>{
                const findObj=options.value.drvingLicenseList.find((x) => x.text==item)
                if(findObj){
                    let obj={codeNo:findObj.value}
                    arry.push(obj)
                }else{
                    let obj={newText:item}
                    arry.push(obj)
                }
            })
            data.drvingLicense = arry;
        }
        //專長格式化
        if(data.computerExpertise.length>0){
            let arry=[]
            data.computerExpertise.forEach((item) =>{
                const findObj=options.value.expertiseList.find((x) => x.text==item)
                if(findObj){
                    let obj={codeNo:findObj.value}
                    arry.push(obj)
                }else{
                    let obj={newText:item}
                    arry.push(obj)
                }
            })
            data.computerExpertise = arry;
        }
        //語言格式化
        if(data.languages.length>0){
            let arry=[]
            data.languages.forEach((item) =>{
                const findObj=options.value.languageList.find((x) => x.text==item)
                if(findObj){
                    let obj={codeNo:findObj.value}
                    arry.push(obj)
                }else{
                    let obj={newText:item}
                    arry.push(obj)
                }
            })
            data.languages = arry;
        }
        //證照格式化
        if(data.professionalLicense.length>0){
            let arry=[]
            data.professionalLicense.forEach((item) =>{
                const findObj=options.value.professionalLicenseList.find((x) => x.text==item)
                if(findObj){
                    let obj={codeNo:findObj.value}
                    arry.push(obj)
                }else{
                    let obj={newText:item}
                    arry.push(obj)
                }
            })
            data.professionalLicense = arry;
        }
        //特殊身分格式化
        if(data.specialStatus.length>0){
            let arry=[]
            data.specialStatus.forEach((item) =>{
                const findObj=options.value.specialStatuList.find((x) => x.text==item)
                if(findObj){
                    let obj={codeNo:findObj.value}
                    arry.push(obj)
                }else{
                    let obj={newText:item}
                    arry.push(obj)
                }
            })
            data.specialStatus = arry;
        }
        //特殊身分格式化
        // if(data.specialStatus.length>0){
        //     const arr = data.specialStatus.map(item => item.text);
        //     console.log("整理後e資料表身分:", arr);
        //     data.specialStatus = arr;
        // }
        // //語言格式化
        // if(data.languages.length>0){
        //     const arr = data.languages.map(item => item.text);
        //     console.log("整理後e資料表語言:", arr);
        //     data.languages = arr;
        // }
        // //特殊專長格式化
        // if(data.computerExpertise.length>0){
        //     const arr = data.computerExpertise.map(item => item.text);
        //     console.log("整理後e資料表專長:", arr);
        //     data.languages = arr;
        // }
        // //專業證照格式化
        // if(data.professionalLicense.length>0){
        //     const arr = data.professionalLicense.map(item => item.text);
        //     console.log("整理後e資料表證照:", arr);
        //     data.professionalLicense = arr;
        // }
        return data
}
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
    min-height: 100px;
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
    // width: 178px;
    // height: 178px;
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

.watermark {
    display: flex;
    flex: auto;
}
</style>