import { defineStore } from "pinia";
import { reactive, computed, inject, ref } from "vue";
import dayjs from 'dayjs'

export const useEmployeeStore = defineStore(
    "employeeStore",
    () => {
        const getUserInfo = ref({
            key: "", //帳號+密碼
            userName: "", //用戶名
            role: "0", //權限等級 1:員工 2:主管 3:人事 0:未登入
            firebaseKey: "",
            basicInformation: {}, //人員資料表
            curriculumVitae: {}, //個人簡歷
        });
        //登入時 取得用戶資料
        const setUserInfo = (data) => {
            getUserInfo.value = deepCopy(data);
            tmpUserInfo.value = deepCopy(data);
        };
        //暫存 用戶資料
        const tmpUserInfo = ref({
            key: "", //帳號+密碼
            userName: "", //用戶名
            role: "0", //權限等級 1:員工 2:主管 3:人事 0:未登入
            firebaseKey: "",
            basicInformation: {}, //人員資料表
            curriculumVitae: {}, //個人簡歷
        });
        //暫存人員資料表
        const tmpBasicInformation = ref({});
        //暫存個人簡歷
        const tmpCurriculumVitae = ref({});
        //清空 人員資料表
        const resetTmpBasicInformation = () => {
            tmpBasicInformation = {
                //人員資料表
                arrivalDate: null, //到職日
                bank: {
                    //銀行資訊
                    account: null, //銀行帳號
                    branchName: null, //分行名稱
                },
                birthday: null, //生日
                computerExpertise: [], //電腦專長
                department: null, //進用部門
                drvingLicense: [], //駕照
                email: null, //信箱
                emergencyContact: {
                    mobile: null, // 行動電話
                    name: null, // 緊急聯絡人姓名
                    phone: null, // 連絡電話
                    relationship: null, // 關係
                }, //緊急聯絡人資訊
                employeeId: null, //人員編號
                homePhone: null, //連絡電話
                idCardFrontImageUrl: null, // 身分證正面照片 URL
                idCardBackImageUrl: null, // 身分證反面照片 URL
                idNumber: null, //身分證號
                languages: [], //語言能力
                mailing: {
                    address: null, //通訊地址
                    postalCode: null, //郵遞區號
                }, //通訊地址
                maritalStatus: null, //婚姻狀況
                name: userName, //姓名
                phone: null, //行動電話
                positionTitle: null, //職稱
                professionalLicense: [], //專業證照
                profileImageUrl: null, // 大頭貼 URL
                residence: {
                    address: null, //通訊地址
                    postalCode: null, //郵遞區號
                }, //戶籍地址
                resignationDate: null, //離職日
                schools: [
                    {
                        academicDegree: null, //學位
                        degreeStatus: null, //畢業狀況
                        name: null, //學校名稱
                        department: null, //科系
                        period: [null, null], //修業起訖年月
                    },
                ], //學歷
                sex: null, //性別
                specialStatus: [], //特殊身分
                workExperience: [
                    {
                        company: null, //公司名稱
                        position: null, //職務名稱
                        salary: null, //薪資
                        leavingReason: null, //離職原因
                        period: [null, null], //服務起訖年月
                    },
                ], //職務經歷
            };
        };
        //清空 個人簡歷
        const resetTmpCurriculumVitae = () => {
            tmpCurriculumVitae = {
                //個人簡歷
                name: userName, //姓名
                educationalQualifications: null, //學歷
                expertise: null, //專長
                professionalLicense: [], //專業證照
                workExperience: [
                    {
                        company: null, //公司名稱
                        position: null, //職務名稱
                        period: [null, null], //服務起訖年月
                    },
                ], //職務經歷
                annualPublications: [
                    {
                        category: null, //類型
                        date: null, //時間
                        name: null, //名稱
                    },
                ], //歷年著作
                annualProjects: [
                    {
                        sponsorUnit: null, //委託單位
                        period: [null, null], //起訖時間
                        projectName: null, //計畫名稱
                    },
                ], //歷年計畫
            };
        };

        //更新暫存資料
        const setTmpUserInfo = (data) => {
          if(data==null){
            tmpUserInfo.value={}
            return;
          }
          tmpUserInfo.value = deepCopy(data);
        };
        //更新 人員資料表
        const setTmpBasicInformation = (data) => {
          if(data==null){
            
            tmpBasicInformation.value = {}
            return;
          }
            tmpBasicInformation.value = dataFormatHandle(data)
            // tmpBasicInformation.value = deepCopy(data);
        };
        //更新 個人簡歷
        const setTmpCurriculumVitae = (data) => {
          if(data==null){
            tmpCurriculumVitae.value={}
            return;
          }
            tmpCurriculumVitae.value = dataFormat(data);
            // tmpCurriculumVitae.value = deepCopy(data);
        };

        //清空 人員資料表
        const resetTmpUserInfo = (key = "", role = "0", userName = "") => {
            tmpUserInfo.value = {
                key: key, //帳號+密碼
                userName: userName, //用戶名
                role: role, //權限等級 1:員工 2:主管 3:人事 0:未登入
                firebaseKey: null, //firebaseKey
                ifEnable: true, //是否啟用
                basicInformation: {
                    //人員資料表
                    arrivalDate: null, //到職日
                    bank: {
                        //銀行資訊
                        account: null, //銀行帳號
                        branchName: null, //分行名稱
                    },
                    birthday: null, //生日
                    computerExpertise: [], //電腦專長
                    department: null, //進用部門
                    drvingLicense: [], //駕照
                    email: null, //信箱
                    emergencyContact: {
                        mobile: null, // 行動電話
                        name: null, // 緊急聯絡人姓名
                        phone: null, // 連絡電話
                        relationship: null, // 關係
                    }, //緊急聯絡人資訊
                    employeeId: null, //人員編號
                    homePhone: null, //連絡電話
                    idCardFrontImageUrl: null, // 身分證正面照片 URL
                    idCardBackImageUrl: null, // 身分證反面照片 URL
                    idNumber: null, //身分證號
                    languages: [], //語言能力
                    mailing: {
                        address: null, //通訊地址
                        postalCode: null, //郵遞區號
                    }, //通訊地址
                    maritalStatus: null, //婚姻狀況
                    name: userName, //姓名
                    phone: null, //行動電話
                    positionTitle: null, //職稱
                    professionalLicense: [], //專業證照
                    profileImageUrl: null, // 大頭貼 URL
                    residence: {
                        address: null, //通訊地址
                        postalCode: null, //郵遞區號
                    }, //戶籍地址
                    resignationDate: null, //離職日
                    schools: [
                        {
                            academicDegree: null, //學位
                            degreeStatus: null, //畢業狀況
                            name: null, //學校名稱
                            department: null, //科系
                            period: [null, null], //修業起訖年月
                        },
                    ], //學歷
                    sex: null, //性別
                    specialStatus: [], //特殊身分
                    workExperience: [
                        {
                            company: null, //公司名稱
                            position: null, //職務名稱
                            salary: null, //薪資
                            leavingReason: null, //離職原因
                            period: [null, null], //服務起訖年月
                        },
                    ], //職務經歷
                },
                curriculumVitae: {
                    //個人簡歷
                    name: userName, //姓名
                    educationalQualifications: null, //學歷
                    expertise: null, //專長
                    professionalLicense: [], //專業證照
                    workExperience: [
                        {
                            company: null, //公司名稱
                            position: null, //職務名稱
                            period: [null, null], //服務起訖年月
                        },
                    ], //職務經歷
                    annualPublications: [
                        {
                            category: null, //類型
                            date: null, //時間
                            name: null, //名稱
                        },
                    ], //歷年著作
                    annualProjects: [
                        {
                            sponsorUnit: null, //委託單位
                            period: [null, null], //起訖時間
                            projectName: null, //計畫名稱
                        },
                    ], //歷年計畫
                },
            };
        };

        //深拷貝
        const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

        //人員資料表 資料格式化
        function dataFormatHandle(data) {
            // 輔助函數：格式化日期
            const formatDate = (date) =>
                date ? dayjs(date).format("YYYY-MM-DD") : null;

            // 輔助函數：格式化陣列
            const formatArray = (arr) => arr?.map((item) => item.text) ?? [];

            // 處理部門
            const getDepartmentValue = (department, departmentFromADServer) => {
                if (department) {
                    return department;
                } else {
                    const departmentIndex =
                        options.value.departmentList.findIndex(
                            (d) => d.text === departmentFromADServer
                        );
                    return departmentIndex >= 0
                        ? options.value.departmentList[departmentIndex].value
                        : null;
                }
            };
            data.department = getDepartmentValue(
                data.department,
                data.departmentFromADServer
            );

            // 格式化日期字段
            data.arrivalDate = formatDate(data.arrivalDate);
            data.lastWorkingDate = formatDate(data.lastWorkingDate);
            data.birthday = formatDate(data.birthday);

            // 處理緊急聯絡人
            data.emergencyContacts =
                data.emergencyContacts?.length === 0
                    ? [
                          {
                              mobile: null,
                              name: null,
                              phone: null,
                              relationship: null,
                              rid: null,
                          },
                      ]
                    : data.emergencyContacts;

            // 處理工作經歷
            data.workExperiences =
                data.workExperiences?.map((item) => ({
                    ...item,
                    startFrom: dayjs(item.startFrom).format("YYYY-MM"),
                    endAt: dayjs(item.endAt).format("YYYY-MM"),
                })) ?? [];

            // 處理教育經歷
            data.educationExperiences =
                data.educationExperiences?.map((item) => ({
                    ...item,
                    period: [
                        dayjs(item.startFrom).format("YYYY-MM"),
                        dayjs(item.endAt).format("YYYY-MM"),
                    ],
                    startFrom: dayjs(item.startFrom).format("YYYY-MM"),
                    endAt: dayjs(item.endAt).format("YYYY-MM"),
                })) ?? [];
            if (data.educationExperiences?.length === 0) {
                data.educationExperiences.push({
                    rid: null,
                    name: null,
                    academicDegree: null,
                    department: null,
                    degreeStatus: null,
                    period: [null, null],
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
        //個人簡歷 資料格式化
        function dataFormat(data) {
            
            //經歷格式化
            if (data.workExperiences) {
                data.workExperiences =data.workExperiences?.map((item) => ({
                    ...item,
                    startFrom: dayjs(item.startFrom).format("YYYY-MM"),
                    endAt: dayjs(item.endAt).format("YYYY-MM"),
                })) ?? [];
            } else {
                data.workExperiences = [];
            }
            // if(data.workExperiences.length==0){
            //         data.workExperiences.push({
            //         company: null,
            //         position: null,
            //         period:[null,null]
            //     })
            // }
            // 歷年著作格式化
            if (data.annualPublications) {
                data.annualPublications.forEach((item) => {
                    item.issueDate = dayjs(item.issueDate).format("YYYY-MM");
                });
            } else {
                data.annualPublications = [];
            }

            //歷年參與之專案計畫格式化
            if (data.annualProjects) {
                data.annualProjects.forEach((item) => {
                    let startDate = dayjs(item.startFrom).format("YYYY-MM");
                    let endDate = dayjs(item.endAt).format("YYYY-MM");
                    item.period = [startDate, endDate];
                });
            } else {
                data.annualProjects = [];
            }
            // if(data.annualProjects.length==0){
            //     data.annualProjects.push({
            //     entrustUnit: null,
            //     projectName: null,
            //     period:[null,null]
            //     })
            // }
            //特殊專長格式化
            if (data.computerExpertise) {
                if (data.computerExpertise.length > 0) {
                    const arr = data.computerExpertise.map((item) => item.text);
                    // console.log("整理後e資料表專長:", arr);
                    data.computerExpertise = arr;
                }
            } else {
                data.computerExpertise = [];
            }
            //專業證照格式化
            if (data.professionalLicense) {
                if (data.professionalLicense.length > 0) {
                    const arr = data.professionalLicense.map(
                        (item) => item.text
                    );
                    // console.log("整理後e資料表證照:", arr);
                    data.professionalLicense = arr;
                }
            } else {
                data.professionalLicense = [];
            }
            return data;
        }
        return {
            getUserInfo,
            resetTmpUserInfo,
            setUserInfo,
            tmpUserInfo,
            setTmpUserInfo,
            tmpBasicInformation,
            tmpCurriculumVitae,
            setTmpBasicInformation,
            setTmpCurriculumVitae,
        };
    },
    {
        persist: {
            enabled: true,
        },
    }
);
