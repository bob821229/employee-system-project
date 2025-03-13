// 控制匯出按鈕顯示
const CONFIG = {
    //人員資料表
    profile: {
        isShowExportBtn: true,//是否顯示匯出按鈕
        //動態項目設定
        dataConstraints: {
            //教育程度
            educationExperiences: {
                hasMinLimit: true,
                hasMaxLimit: true,
                min: 1,
                max: 5,
            },
            //職務經歷
            workExperiences: {
                hasMinLimit: false,
                hasMaxLimit: false,
                min: 0,
                max: 3,
            },
            //緊急聯絡人
            emergencyContacts: {
                hasMinLimit: true,
                hasMaxLimit: true,
                min: 1,
                max: 3,
            },
        },
    },
    //個人簡歷
    resume: {
        isShowExportBtn: true,//是否顯示匯出按鈕
        //動態項目設定
        dataConstraints: {
            //工作經歷
            workExperiences: {
                hasMinLimit: false,
                hasMaxLimit: false,
                min: 2,
                max: 4,
            },
            //歷年著作
            annualPublications: {
                hasMinLimit: false,
                hasMaxLimit: false,
                min: 1,
                max: 4,
            },
            //歷年參與之專案計畫
            annualProjects: {
                hasMinLimit: false,
                hasMaxLimit: false,
                min: 1,
                max: 3,
            },
        },
    },
    //人員資料表清單
    employeeList: {
        isShowExportBtn: true,//是否顯示匯出按鈕
    },
    //已離職人員清單
    resignedEmployeeList: {
        isShowExportBtn: true,//是否顯示匯出按鈕
    },
    //資料異動紀錄
    dataUpdateLogList: {
        isShowExportBtn: false,//是否顯示匯出按鈕
    },
};
//   export default CONFIG;


