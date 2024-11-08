import{u as S,q as V,r,c as D,o as P,a as p,b as R,d as B,m as h,e as t,w as s,F as $,j as x,C as T,D as q,G as H,H as j,f as u,k as _,s as z}from"./index-BStde46P.js";const U={style:{width:"100%","max-width":"1500px",margin:"auto"}},F={style:{display:"flex","justify-content":"space-between",padding:"10px 0"}},J=h("span",null,"您確定要啟用該筆資料?",-1),M={class:"dialog-footer"},W={__name:"ResignedEmployeeList",setup(G){const f=S(),w=V();r(f.getUserInfo.role);const c=r(!1),E=r([{text:"研究一所",value:"研究一所"},{text:"研究二所",value:"研究二所"},{text:"研究三所",value:"研究三所"},{text:"研究四所",value:"研究四所"},{text:"數位發展處",value:"數位發展處"},{text:"教育推廣處",value:"教育推廣處"},{text:"國際合作處",value:"國際合作處"}]);r({employeeId:"",department:"",arrivalDate:null,name:"",idNumber:"",sex:"",birthday:null,homePhone:"",phone:"",residenceAddress:"",mailingAddress:"",email:"",specialStatus:[],drvingLicense:[],maritalStatus:[],schools:[{name:"",department:"",period:null}],workExperience:[{company:"",position:"",salary:null,leavingReason:"",period:null}],languages:[],computerExpertise:[],professionalLicense:"",emergencyContact:{name:"",relationship:"",phone:"",mobile:""},bank:{account:"",branchName:""}}),r([{employeeId:"E001",department:"研究一所",arrivalDate:"2023-01-15",name:"張三",idNumber:"A123456789",sex:"男",birthday:"1985-03-22",homePhone:"02-12345678",phone:"0912345678",residenceAddress:"台北市中正區中山路1號",mailingAddress:"台北市中正區中山路1號",email:"zhangsan@example.com",specialStatus:["原住民"],drvingLicense:["機車"],maritalStatus:"已婚",schools:[{name:"台灣大學",department:"資訊工程系",period:["2007-01","2011-12"]},{name:"台灣大學",department:"資訊工程系",period:["2007-01","2011-12"]}],workExperience:[{company:"ABC科技公司",position:"軟體工程師",salary:6e4,leavingReason:"尋求更好發展",period:["2007-07","2012-12"]}],languages:["中文","英文"],computerExpertise:["JavaScript","Java","Python"],professionalLicense:"資訊安全管理師",emergencyContact:{name:"李四",relationship:"兄弟",phone:"02-87654321",mobile:"0987654321"},bank:{account:"123456789012",branchName:"台北市南門分行"}},{employeeId:"E002",department:"研究二所",arrivalDate:"2022-09-01",name:"李四",idNumber:"B987654321",sex:"女",birthday:"1990-06-15",homePhone:"03-12345678",phone:"0987654321",residenceAddress:"新竹市東區光復路100號",mailingAddress:"新竹市東區光復路100號",email:"lisi@example.com",specialStatus:["身心障礙"],drvingLicense:["機車"],maritalStatus:"未婚",schools:[{name:"交通大學",department:"電子工程系",period:["2007-07","2012-12"]}],workExperience:[{company:"XYZ科技公司",position:"硬體工程師",salary:55e3,leavingReason:"搬家",period:["2007-07","2012-12"]}],languages:["中文","日文"],computerExpertise:["C++","VHDL"],professionalLicense:"電子工程師證照",emergencyContact:{name:"王五",relationship:"朋友",phone:"03-87654321",mobile:"0912345678"},bank:{account:"987654321098",branchName:"新竹市民生分行"}},{employeeId:"E003",department:"研究三所",arrivalDate:"2021-03-20",name:"王五",idNumber:"C135792468",sex:"男",birthday:"1980-12-05",homePhone:"04-12345678",phone:"0978654321",residenceAddress:"台中市西區美村路200號",mailingAddress:"台中市西區美村路200號",email:"wangwu@example.com",specialStatus:["身心障礙","原住民"],drvingLicense:["機車","汽車"],maritalStatus:"未婚",schools:[{name:"中興大學",department:"會計學系",period:["2007-07","2012-12"]}],workExperience:[{company:"財務顧問公司",position:"財務分析師",salary:7e4,leavingReason:"家庭原因",period:["2007-07","2012-12"]}],languages:["中文","英文"],computerExpertise:["Excel","SAP"],professionalLicense:"會計師證照",emergencyContact:{name:"趙六",relationship:"姐姐",phone:"04-87654321",mobile:"0987654321"},bank:{account:"567890123456",branchName:"台中市大墩分行"}},{employeeId:"E004",department:"數位發展部",arrivalDate:"2020-11-11",name:"趙六",idNumber:"D246810121",sex:"女",birthday:"1995-08-25",homePhone:"05-12345678",phone:"0965123456",residenceAddress:"嘉義市西區林森路300號",mailingAddress:"嘉義市西區林森路300號",email:"zhaoliu@example.com",specialStatus:[],drvingLicense:[],maritalStatus:"未婚",schools:[{name:"嘉義大學",department:"行銷管理系",period:["2007-07","2012-12"]}],workExperience:[{company:"行銷顧問公司",position:"行銷專員",salary:45e3,leavingReason:"公司搬遷",period:["2007-07","2012-12"]}],languages:["中文","英語"],computerExpertise:["Photoshop","Illustrator"],professionalLicense:"行銷策劃師",emergencyContact:{name:"陳七",relationship:"母親",phone:"05-87654321",mobile:"0935123456"},bank:{account:"345678901234",branchName:"嘉義市民雄分行"}},{employeeId:"E005",department:"教育推廣部",arrivalDate:"2021-06-01",name:"陳七",idNumber:"E135791357",sex:"男",birthday:"1992-11-11",homePhone:"06-12345678",phone:"0956123456",residenceAddress:"台南市東區東門路400號",mailingAddress:"台南市東區東門路400號",email:"chenqi@example.com",specialStatus:[],drvingLicense:["機車"],maritalStatus:"未婚",schools:[{name:"成功大學",department:"國際企業學系",period:["2007-07","2012-12"]}],workExperience:[{company:"客服服務公司",position:"客服專員",salary:4e4,leavingReason:"職業轉換",period:["2007-07","2012-12"]}],languages:["中文","韓文"],computerExpertise:["Word","Excel"],professionalLicense:"客服服務證照",emergencyContact:{name:"楊八",relationship:"父親",phone:"06-87654321",mobile:"0912345678"},bank:{account:"789012345678",branchName:"台南市南區分行"}}]);const m=r([]),g=r(""),k=D(()=>{const e=g.value.trim().toLowerCase();return e?m.value.filter(a=>{let{employeeId:i,name:n,department:l,professionalLicense:b}=a.basicInformation;const y=b.some(o=>o.toLowerCase().includes(e));return i.toLowerCase().includes(e)||n.toLowerCase().includes(e)||l.toLowerCase().includes(e)||y}):m.value}),C=(e,a,i)=>(console.log("value:",e,"row:",a,"column:",i),a.basicInformation.department===e),v=()=>{m.value.length=0;let e=x(_,"/users");e=T(e,H("ifEnable"),q(!1)),j(e,a=>{a.forEach(i=>{const n=i.key,l=i.val();l.key=n,m.value.push(l)})}),console.log(`tabledata:${m.value}`)};r("");const d=r({}),L=e=>{console.log(e.curriculumVitae),f.setCurriculumVitae(e.curriculumVitae),w.push("/about")},I=e=>{d.value=e,c.value=!0},A=async()=>{try{d.value.ifEnable=!0,z(x(_,`users/${d.value.key}`),d.value),console.log("該資料已啟用")}catch(e){console.error("啟用失敗:",e)}finally{c.value=!1,d.value.length=0,v()}};return P(()=>{v()}),(e,a)=>{const i=p("el-input"),n=p("el-table-column"),l=p("el-button"),b=p("el-table"),y=p("el-dialog");return R(),B($,null,[h("div",U,[h("div",F,[t(i,{modelValue:g.value,"onUpdate:modelValue":a[0]||(a[0]=o=>g.value=o),style:{width:"240px"},placeholder:"搜尋"},null,8,["modelValue"])]),t(b,{data:k.value,style:{width:"100%"},size:"large","max-height":"700","scrollbar-always-on":"true",border:""},{default:s(()=>[t(n,{width:"120","header-align":"center",fixed:"",prop:"basicInformation.employeeId",label:"人員編號"}),t(n,{width:"150","header-align":"center",prop:"basicInformation.name",label:"姓名"}),t(n,{width:"250","header-align":"center",prop:"basicInformation.department",label:"部門",filters:E.value,"filter-method":C,"filter-multiple":""},null,8,["filters"]),t(n,{"header-align":"center",prop:"basicInformation.professionalLicense",label:"專業證照"}),t(n,{width:"200",align:"center","header-align":"center",fixed:"right",label:"編輯"},{default:s(o=>[t(l,{type:"success",plain:"",onClick:N=>I(o.row)},{default:s(()=>[u(" 啟用 ")]),_:2},1032,["onClick"])]),_:1}),t(n,{width:"100",align:"center","header-align":"center",fixed:"right",label:"個人簡歷"},{default:s(o=>[t(l,{type:"primary",plain:"",onClick:N=>L(o.row)},{default:s(()=>[u("查看")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),t(y,{modelValue:c.value,"onUpdate:modelValue":a[2]||(a[2]=o=>c.value=o),title:"警告",width:"500","align-center":""},{footer:s(()=>[h("div",M,[t(l,{onClick:a[1]||(a[1]=o=>c.value=!1)},{default:s(()=>[u("取消")]),_:1}),t(l,{type:"primary",onClick:A},{default:s(()=>[u(" 確定 ")]),_:1})])]),default:s(()=>[J]),_:1},8,["modelValue"])],64)}}};export{W as default};