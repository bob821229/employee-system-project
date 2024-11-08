import{_ as qe,r as _,n as Z,u as De,q as Fe,c as Be,a as c,b as m,d as U,e,w as l,m as q,F as Y,f,g as S,h as y,i as F,t as Pe,E as b,v as Me,x as Le,y as Ee,z as Ne,A as ze,p as Re,l as $e,j as ee,k as le,B as Ge,s as Te}from"./index-BStde46P.js";const B=P=>(Re("data-v-70cb3d6b"),P=P(),$e(),P),je=B(()=>q("h1",{style:{"text-align":"center","margin-top":"20px"}},"人員資料表",-1)),Je={key:1},Ae=B(()=>q("div",{class:"el-upload__text"},[f(" 將檔案拖曳至此處或"),q("em",null,"點擊上傳")],-1)),Ke=B(()=>q("div",{class:"el-upload__tip"}," 請上傳 jpg/png 格式的檔案，且檔案大小小於 500KB ",-1)),We={key:1},Oe=B(()=>q("div",{class:"el-upload__text"},[f(" 將檔案拖曳至此處或"),q("em",null,"點擊上傳")],-1)),He=B(()=>q("div",{class:"el-upload__tip"}," 請上傳 jpg/png 格式的檔案，且檔案大小小於 500KB ",-1)),Qe={style:{"text-align":"center",margin:"20px 0"}},Xe={style:{position:"fixed",right:"20px",bottom:"20px"}},Ze={__name:"FormView",setup(P){const I=_(null),K=(u,t,p)=>{!t&&!r.value.emergencyContact.phone&&!r.value.emergencyContact.mobile?p(new Error("聯絡方式至少填一個")):p()},ae=Z({employeeId:[{required:!1,message:"請輸入人員編號",trigger:"blur"}],department:[{required:!0,message:"請選擇部門",trigger:"change"}],arrivalDate:[{type:"date",required:!0,message:"請選擇到職日",trigger:"change"}],name:[{required:!0,message:"請輸入姓名",trigger:"blur"},{whitespace:!0,message:"用户名不能包含空格"}],idNumber:[{required:!0,message:"請輸入身分證號",trigger:"blur"}],sex:[{required:!0,message:"請選擇性別",trigger:"change"}],birthday:[{type:"date",required:!0,message:"請選擇生日",trigger:"change"}],homePhone:[{required:!0,message:"請輸入連絡電話",trigger:"blur"},{pattern:/^0\d{1,3}-\d{6,8}$/,message:"請輸入正確的格式(ex:03-3216549)",trigger:"blur"}],phone:[{required:!0,message:"請輸入行動電話",trigger:"blur"},{pattern:/^09[0-9]{8}$/,message:"請輸入正確的手機格式",trigger:"blur"}],"residence.postalCode":[{required:!0,message:"戶籍地址郵遞區號",trigger:"blur"}],"residence.address":[{required:!0,message:"請輸入戶籍地址",trigger:"blur"}],"mailing.postalCode":[{required:!0,message:"通訊地址郵遞區號",trigger:"blur"}],"mailing.address":[{required:!0,message:"請輸入通訊地址",trigger:"blur"}],email:[{required:!0,type:"email",message:"請輸入正確的信箱",trigger:"blur"}],maritalStatus:[{required:!0,message:"請選擇婚姻狀況",trigger:"change"}],"emergencyContact.name":[{required:!0,message:"請輸入緊急聯絡人姓名",trigger:"blur"}],"emergencyContact.relationship":[{required:!0,message:"請輸入關係",trigger:"blur"}],"emergencyContact.phone":[{required:!0,trigger:"blur",validator:K},{pattern:/^0\d{1,3}-\d{6,8}$/,message:"請輸入正確的格式(ex:03-3216549)",trigger:"blur"}],"emergencyContact.mobile":[{required:!0,trigger:"blur",validator:K},{pattern:/^09[0-9]{8}$/,message:"請輸入正確的手機格式",trigger:"blur"}],"bank.account":[{required:!0,message:"請輸入銀行帳號",trigger:"blur"},{pattern:/^[0-9]{12}$/,message:"請輸入正確的帳號格式",trigger:"blur"}],"bank.branchName":[{required:!0,message:"請輸入分行名稱",trigger:"blur"}],profileImageUrl:[{required:!0,message:"請上傳大頭貼",trigger:"change",validator:(u,t,p)=>{if(t===""&&M.value===null)return p(new Error("請上傳照片"));p()}}],idCardFrontImageUrl:[{required:!0,message:"請上傳身分證正面照",trigger:"change",validator:(u,t,p)=>{t===""&&L.value===null?p(new Error("請上傳身分證正面照")):p()}}],idCardBackImageUrl:[{required:!0,message:"請上傳身分證反面照",trigger:"change",validator:(u,t,p)=>{t===""&&E.value===null?p(new Error("請上傳身分證反面照")):p()}}],specialStatus:[{required:!0,message:"請至少選擇一個特殊身分",trigger:"change"}],drvingLicense:[{required:!0,message:"請至少選擇一個駕照種類",trigger:"change"}]}),te=_(["國語","台語","客語","英語","日語"]),re=_(["Word","Excel","PowerPoint","GIS","Visio","JavaScript"]),oe=_(["開發人員","研究員","顧問","助理研究員","行政人員"]),ue=_(["系統分析師 (CSM)","資料庫管理師 (Oracle Certified Professional)","雲端架構師 (AWS Certified Solutions Architect)","資訊安全管理師 (CISSP)","GIS工程師"]),ne=_(["原住民","身心障礙","無"]),se=_(["機車","汽車","無"]),de=_(["博士","碩士","學士","專科/高中"]),ie=_([{id:1,name:"研究一所"},{id:2,name:"研究二所"},{id:3,name:"研究三所"},{id:4,name:"研究四所"},{id:5,name:"教育推廣處"},{id:6,name:"國際合作處"},{id:7,name:"數位發展處"},{id:8,name:"林業研究發展中心"},{id:9,name:"院長室"},{id:10,name:"行政管理處"}]),w=De(),C=Z({content:"僅限台農院人事建檔",font:{fontSize:24,color:"rgba(255, 0, 0, 0.78)",fontWeight:"bold",textBaseline:"top"},zIndex:30,rotate:-22,gap:[100,100]}),me=Fe(),r=_(w.tmpUserInfo.basicInformation),pe=u=>{u.includes("無")?r.value.drvingLicense=["無"]:r.value.drvingLicense=u},ge=u=>{u.includes("無")?r.value.specialStatus=["無"]:r.value.specialStatus=u},W=Be(()=>w.getUserInfo.role=="3"),ce=()=>{r.value.mailing=O(r.value.residence)},fe=()=>{r.value.schools.length==5?alert("最多五筆"):r.value.schools.push({key:Date.now(),name:"",academicDegree:"",department:"",degreeStatus:"",period:[null,null]})},ve=u=>{r.value.schools.length==1?alert("最少一筆"):r.value.schools.splice(u,1)},_e=()=>{r.value.workExperience.length==3?alert("最多三筆"):r.value.workExperience.push({key:Date.now(),company:"",position:"",salary:null,leavingReason:"",period:[null,null]})},be=u=>{r.value.workExperience.length==1?alert("最少一筆"):r.value.workExperience.splice(u,1)},ye=()=>{let u={};const t=ee(le,"users");u=w.tmpUserInfo,console.log("obj:",u),Ge(t,u)},Ve=()=>{let u=w.tmpUserInfo.firebaseKey;console.log("firebaseKey:",u);let t=w.tmpUserInfo.userName==w.getUserInfo.userName;console.log("isSelf:",t),t?(w.getUserInfo=O(w.tmpUserInfo),console.log("本人更新成功:",w.tmpUserInfo)):console.log("非本人更新成功:",w.tmpUserInfo),Te(ee(le,`users/${u}`),w.tmpUserInfo)},he=async()=>{console.log("submitForm"),I.value&&await I.value.validate(async u=>{if(console.log("Validation started"),console.log("valid:",u),!u)console.log("Validation failed"),b.error("驗證失敗，請檢查輸入");else{console.log("Validation succeeded"),b.success("驗證成功，可以提交表單");try{console.log("Starting upload process"),await G("1"),await G("2"),await G("3"),console.log("Upload process completed"),w.tmpUserInfo.firebaseKey!==""?(console.log("有key 更新資料"),Ve(),b({message:"已修改資料",type:"success"})):(console.log("沒key 新增人員"),ye(),b({message:"已新增資料",type:"success"}))}catch(t){console.error("上傳或保存資料失敗:",t),b({message:"上傳或保存資料失敗",type:"error"})}}})},tl=async(u=I)=>{console.log("submitForm1"),console.log("ruleFormRef:",I.value),console.log("formEl:",u),u&&u.validate(t=>{console.log("Validation result:",t),console.log(t?"驗證成功!":"驗證失敗!")})},O=u=>JSON.parse(JSON.stringify(u)),N=(u=I.value)=>{console.log("驗證",I.value),I.value.validate(async(t,p)=>{t?b.success("驗證成功，可以提交表單"):b.error("驗證失敗，請檢查輸入")})},rl=()=>{I.value&&I.value.resetFields()},ol=()=>{w.resetTmpUserInfo(),me.back()},we=_(0),M=_(null),z=_(null),L=_(null),R=_(null),E=_(null),$=_(null),ke=async u=>{const t=u.raw.type==="image/jpeg",p=u.raw.type==="image/png",h=u.size/1024/1024<2;if(!t&&!p){b.error("上傳的大頭照只能是 JPG 或 PNG 格式!");return}if(!h){b.error("上傳的大頭照大小不能超過 2MB!");return}z.value=u;const o=u.raw;if(o)try{const s=await new Promise((n,d)=>{const g=new FileReader;g.onload=function(v){n(v.target.result)},g.onerror=function(v){d(v)},g.readAsDataURL(o)});M.value=s}catch(s){b.error("讀取文件時發生錯誤"),console.error(s)}finally{N()}},Ue=async u=>{const t=u.raw.type==="image/jpeg",p=u.raw.type==="image/png",h=u.size/1024/1024<2;if(!t&&!p){b.error("只能是 JPG 或 PNG 格式!");return}if(!h){b.error("上傳大頭照大小不能超過 2MB!");return}R.value=u;const o=u.raw;if(console.log(o),o)try{const s=await new Promise((n,d)=>{const g=new FileReader;g.onload=function(v){n(v.target.result)},g.onerror=function(v){d(v)},g.readAsDataURL(o)});L.value=s}catch(s){b.error("讀取文件時發生錯誤"),console.error(s)}finally{N()}},Ce=async u=>{const t=u.raw.type==="image/jpeg",p=u.raw.type==="image/png",h=u.size/1024/1024<2;if(!t&&!p){b.error("只能是 JPG 或 PNG 格式!");return}if(!h){b.error("上傳大頭照大小不能超過 2MB!");return}$.value=u;const o=u.raw;if(console.log(o),o)try{const s=await new Promise((n,d)=>{const g=new FileReader;g.onload=function(v){n(v.target.result)},g.onerror=function(v){d(v)},g.readAsDataURL(o)});E.value=s}catch(s){b.error("讀取文件時發生錯誤"),console.error(s)}finally{N()}},G=async u=>{let t=null;if(u=="1"?t=z.value:u=="2"?t=R.value:t=$.value,t){console.log("filefile:",t);const p=Me(Le,`images/${t.raw.name}`),h={contentType:t.raw.type},o=Ee(p,t.raw,h);return new Promise((s,n)=>{o.on("state_changed",d=>{const g=d.bytesTransferred/d.totalBytes*100;switch(we.value=g,console.log(`Upload is ${g}% done`),d.state){case"paused":console.log("Upload is paused");break;case"running":console.log("Upload is running");break}},d=>{n(d)},async()=>{const d=await Ne(o.snapshot.ref);u==1?(t=z.value,r.value.profileImageUrl=d):u==2?(t=R.value,r.value.idCardFrontImageUrl=d):(t=$.value,r.value.idCardBackImageUrl=d),console.log("File available at",d),b({message:"上傳成功",type:"success"}),s()})})}};return(u,t)=>{const p=c("el-text"),h=c("el-divider"),o=c("el-col"),s=c("el-input"),n=c("el-form-item"),d=c("el-option"),g=c("el-select"),v=c("el-date-picker"),H=c("el-radio"),Ie=c("el-radio-group"),T=c("el-avatar"),xe=c("Plus"),j=c("el-icon"),J=c("el-upload"),D=c("el-button"),A=c("el-row"),Q=c("el-watermark"),X=c("upload-filled"),Ye=c("el-form"),Se=c("el-tooltip");return m(),U(Y,null,[e(Ye,{ref_key:"ruleFormRef",ref:I,model:r.value,"label-position":"top",size:"large",rules:ae},{default:l(()=>[je,e(A,{gutter:10},{default:l(()=>[e(o,{span:24},{default:l(()=>[e(h,null,{default:l(()=>[e(p,{size:"large",tag:"b"},{default:l(()=>[f("基本資料")]),_:1})]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"人員編號",prop:"employeeId"},{default:l(()=>[e(s,{modelValue:r.value.employeeId,"onUpdate:modelValue":t[0]||(t[0]=a=>r.value.employeeId=a),placeholder:"請輸入編號"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"部門",prop:"department"},{default:l(()=>[e(g,{modelValue:r.value.department,"onUpdate:modelValue":t[1]||(t[1]=a=>r.value.department=a),placeholder:"請選擇部門"},{default:l(()=>[(m(!0),U(Y,null,S(ie.value,a=>(m(),y(d,{key:a.id,label:a.name,value:a.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"到職日",prop:"arrivalDate"},{default:l(()=>[e(v,{modelValue:r.value.arrivalDate,"onUpdate:modelValue":t[2]||(t[2]=a=>r.value.arrivalDate=a),type:"date",style:{width:"100%"},placeholder:"請選擇到職日",format:"YYYY/MM/DD","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"信箱",prop:"email"},{default:l(()=>[e(s,{modelValue:r.value.email,"onUpdate:modelValue":t[3]||(t[3]=a=>r.value.email=a),placeholder:"請輸入信箱"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"姓名",prop:"name"},{default:l(()=>[e(s,{modelValue:r.value.name,"onUpdate:modelValue":t[4]||(t[4]=a=>r.value.name=a),placeholder:"請輸入姓名"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"身分證號",prop:"idNumber"},{default:l(()=>[e(s,{modelValue:r.value.idNumber,"onUpdate:modelValue":t[5]||(t[5]=a=>r.value.idNumber=a),maxlength:"10","show-word-limit":"",placeholder:"請輸入身分證號"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"生日",prop:"birthday"},{default:l(()=>[e(v,{modelValue:r.value.birthday,"onUpdate:modelValue":t[6]||(t[6]=a=>r.value.birthday=a),type:"date",style:{width:"100%"},placeholder:"請選擇生日",format:"YYYY/MM/DD","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:6,lg:3},{default:l(()=>[e(n,{label:"性別",prop:"sex"},{default:l(()=>[e(Ie,{modelValue:r.value.sex,"onUpdate:modelValue":t[7]||(t[7]=a=>r.value.sex=a)},{default:l(()=>[e(H,{value:"男",size:"large"},{default:l(()=>[f("男")]),_:1}),e(H,{value:"女",size:"large"},{default:l(()=>[f("女")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:6,lg:3},{default:l(()=>[e(n,{label:"照片",prop:"profileImageUrl"},{default:l(()=>[e(J,{class:"avatar-uploader","show-file-list":!1,"auto-upload":!1,"on-change":ke},{default:l(()=>[M.value||r.value.profileImageUrl?(m(),y(T,{key:0,src:M.value||r.value.profileImageUrl,fit:"cover",class:"avatar"},null,8,["src"])):(m(),y(j,{key:1,class:"avatar-uploader-icon"},{default:l(()=>[e(xe)]),_:1}))]),_:1})]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:12},{default:l(()=>[e(n,{label:"連絡電話",prop:"homePhone"},{default:l(()=>[e(s,{modelValue:r.value.homePhone,"onUpdate:modelValue":t[8]||(t[8]=a=>r.value.homePhone=a),placeholder:"請輸入連絡電話"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:12},{default:l(()=>[e(n,{label:"行動電話",prop:"phone"},{default:l(()=>[e(s,{modelValue:r.value.phone,"onUpdate:modelValue":t[9]||(t[9]=a=>r.value.phone=a),maxlength:"10","show-word-limit":"",placeholder:"請輸入行動電話"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:24,lg:4},{default:l(()=>[e(n,{label:"戶籍地址郵遞區號",prop:"residence.postalCode"},{default:l(()=>[e(s,{modelValue:r.value.residence.postalCode,"onUpdate:modelValue":t[10]||(t[10]=a=>r.value.residence.postalCode=a),placeholder:"請輸入戶籍地址"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:24,lg:20},{default:l(()=>[e(n,{label:"戶籍地址",prop:"residence.address"},{default:l(()=>[e(s,{modelValue:r.value.residence.address,"onUpdate:modelValue":t[11]||(t[11]=a=>r.value.residence.address=a),placeholder:"請輸入戶籍地址"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:24,lg:4},{default:l(()=>[e(n,{label:"通訊地址郵遞區號",prop:"mailing.postalCode"},{default:l(()=>[e(s,{modelValue:r.value.mailing.postalCode,"onUpdate:modelValue":t[12]||(t[12]=a=>r.value.mailing.postalCode=a),placeholder:"請輸入通訊地址"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:24,lg:20},{default:l(()=>[e(n,{label:"通訊地址",prop:"mailing.address"},{default:l(()=>[e(s,{modelValue:r.value.mailing.address,"onUpdate:modelValue":t[13]||(t[13]=a=>r.value.mailing.address=a),placeholder:"請輸入通訊地址"},{append:l(()=>[e(D,{onClick:ce},{default:l(()=>[f("同戶籍地址")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),W.value?(m(),y(o,{key:0,sm:24,md:24,lg:6},{default:l(()=>[e(n,{label:"職稱",prop:"positionTitle"},{default:l(()=>[e(g,{modelValue:r.value.positionTitle,"onUpdate:modelValue":t[14]||(t[14]=a=>r.value.positionTitle=a),placeholder:"選擇職稱",filterable:"","allow-create":"","default-first-option":"","reserve-keyword":!1},{default:l(()=>[(m(!0),U(Y,null,S(oe.value,a=>(m(),y(d,{key:a,label:a,value:a},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})):F("",!0),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"特殊身分",prop:"specialStatus"},{default:l(()=>[e(g,{modelValue:r.value.specialStatus,"onUpdate:modelValue":t[15]||(t[15]=a=>r.value.specialStatus=a),multiple:"",placeholder:"請選擇特殊身分",onChange:ge},{default:l(()=>[(m(!0),U(Y,null,S(ne.value,a=>(m(),y(d,{key:a,label:a,value:a},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"駕照",prop:"drvingLicense"},{default:l(()=>[e(g,{modelValue:r.value.drvingLicense,"onUpdate:modelValue":t[16]||(t[16]=a=>r.value.drvingLicense=a),multiple:"",placeholder:"請選擇駕照",onChange:pe},{default:l(()=>[(m(!0),U(Y,null,S(se.value,a=>(m(),y(d,{key:a,label:a,value:a},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:12,lg:6},{default:l(()=>[e(n,{label:"婚姻狀況",prop:"maritalStatus"},{default:l(()=>[e(g,{modelValue:r.value.maritalStatus,"onUpdate:modelValue":t[17]||(t[17]=a=>r.value.maritalStatus=a),placeholder:"請選擇婚姻狀況"},{default:l(()=>[e(d,{label:"已婚",value:"已婚"}),e(d,{label:"未婚",value:"未婚"}),e(d,{label:"其他",value:"其他"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),W.value?(m(),y(o,{key:1,span:24},{default:l(()=>[e(n,{label:"離職日期",prop:" resignationDate"},{default:l(()=>[e(v,{modelValue:r.value.resignationDate,"onUpdate:modelValue":t[18]||(t[18]=a=>r.value.resignationDate=a),type:"date",style:{width:"100%"},placeholder:"請選擇離職日期",format:"YYYY/MM/DD","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1})]),_:1})):F("",!0),e(o,{span:24},{default:l(()=>[e(h,null,{default:l(()=>[e(p,{size:"large",tag:"b"},{default:l(()=>[f("教育程度")]),_:1})]),_:1})]),_:1}),e(o,{span:24},{default:l(()=>[(m(!0),U(Y,null,S(r.value.schools,(a,V)=>(m(),y(A,{style:{width:"100%","align-items":"end"},gutter:10,key:V,class:"work-experience-item"},{default:l(()=>[e(o,{span:2},{default:l(()=>[e(n,{label:"學位",prop:"schools."+V+".academicDegree",rules:{required:!0,message:"請輸入學位",trigger:"change",validator:(i,k,x)=>{k==""?x(new Error("請選擇學位")):x()}}},{default:l(()=>[e(g,{modelValue:a.academicDegree,"onUpdate:modelValue":i=>a.academicDegree=i,placeholder:"請選擇學位"},{default:l(()=>[e(d,{disabled:"",label:"請選擇",value:""}),(m(!0),U(Y,null,S(de.value,i=>(m(),y(d,{key:i,label:i,value:i},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop","rules"])]),_:2},1024),e(o,{span:4},{default:l(()=>[e(n,{label:"學校名稱",prop:"schools."+V+".name",rules:{required:!0,message:"請輸入學校名稱",trigger:"blur"}},{default:l(()=>[e(s,{modelValue:a.name,"onUpdate:modelValue":i=>a.name=i,placeholder:"請輸入學校名稱"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop"])]),_:2},1024),e(o,{span:4},{default:l(()=>[e(n,{label:"科系",prop:"schools."+V+".department",rules:{required:!0,message:"請輸入科系",trigger:"blur"}},{default:l(()=>[e(s,{modelValue:a.department,"onUpdate:modelValue":i=>a.department=i,placeholder:"請輸入科系"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop"])]),_:2},1024),e(o,{span:2},{default:l(()=>[e(n,{label:"畢業/肄業",prop:"schools."+V+".degreeStatus",rules:{required:!0,trigger:"change",validator:(i,k,x)=>{k==""?x(new Error("請選擇畢業/肄業!")):x()}}},{default:l(()=>[e(g,{modelValue:a.degreeStatus,"onUpdate:modelValue":i=>a.degreeStatus=i,placeholder:"請選擇畢業/肄業"},{default:l(()=>[e(d,{disabled:"",label:"請選擇",value:""}),e(d,{label:"畢業",value:"畢業"}),e(d,{label:"肄業",value:"肄業"})]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop","rules"])]),_:2},1024),e(o,{span:9},{default:l(()=>[e(n,{label:"修業起訖年月",prop:"schools."+V+".period",rules:{type:"array",required:!0,trigger:"change",validator:(i,k,x)=>{k&&k.length===2&&k[0]!==null&&k[1]!==null?x():x(new Error("請選擇有效的修業起訖年月"))}}},{default:l(()=>[e(v,{modelValue:a.period,"onUpdate:modelValue":i=>a.period=i,type:"monthrange","range-separator":"至","start-placeholder":"開始年月","end-placeholder":"結束年月",format:"YYYY-MM","value-format":"YYYY-MM"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop","rules"])]),_:2},1024),e(o,{span:3},{default:l(()=>[e(n,{style:{display:"flex","align-items":"flex-end","justify-content":"center",width:"100%",height:"100%"}},{default:l(()=>[e(D,{type:"success",onClick:t[19]||(t[19]=i=>fe())},{default:l(()=>[f("新增")]),_:1}),e(D,{type:"danger",onClick:i=>ve(V)},{default:l(()=>[f("刪除")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1}),e(o,{span:24},{default:l(()=>[e(h,null,{default:l(()=>[e(p,{size:"large",tag:"b"},{default:l(()=>[f("職務經歷")]),_:1})]),_:1})]),_:1}),e(o,{span:24},{default:l(()=>[(m(!0),U(Y,null,S(r.value.workExperience,(a,V)=>(m(),y(A,{style:{width:"100%","align-items":"end"},gutter:10,key:V,class:"work-experience-item"},{default:l(()=>[e(o,{span:4},{default:l(()=>[e(n,{label:"公司名稱",prop:"workExperience."+V+".company",rules:{required:!0,message:"請輸入公司名稱",trigger:"blur"}},{default:l(()=>[e(s,{modelValue:a.company,"onUpdate:modelValue":i=>a.company=i,placeholder:"請輸入公司名稱"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop"])]),_:2},1024),e(o,{span:4},{default:l(()=>[e(n,{label:"職務名稱",prop:"workExperience."+V+".position",rules:{required:!0,message:"請輸入職務名稱",trigger:"blur"}},{default:l(()=>[e(s,{modelValue:a.position,"onUpdate:modelValue":i=>a.position=i,placeholder:"請輸入職務名稱"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop"])]),_:2},1024),e(o,{span:4},{default:l(()=>[e(n,{label:"薪資",prop:"workExperience."+V+".salary",rules:[{required:!0,message:"請輸入薪資",trigger:"blur"},{type:"number",message:"內容必須為數字"}]},{default:l(()=>[e(s,{modelValue:a.salary,"onUpdate:modelValue":i=>a.salary=i,modelModifiers:{number:!0},placeholder:"請輸入薪資"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop"])]),_:2},1024),e(o,{span:5},{default:l(()=>[e(n,{label:"離職原因",prop:"workExperience."+V+".leavingReason",rules:{required:!0,message:"請輸入離職原因",trigger:"blur"}},{default:l(()=>[e(s,{modelValue:a.leavingReason,"onUpdate:modelValue":i=>a.leavingReason=i,placeholder:"請輸入離職原因"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop"])]),_:2},1024),e(o,{span:4},{default:l(()=>[e(n,{label:"服務起訖年月",prop:"workExperience."+V+".period",rules:{type:"array",required:!0,trigger:"change",validator:(i,k,x)=>{k&&k.length===2&&k[0]!==null&&k[1]!==null?x():x(new Error("請選擇有效的服務起訖年月"))}}},{default:l(()=>[e(v,{modelValue:a.period,"onUpdate:modelValue":i=>a.period=i,type:"monthrange","range-separator":"至","start-placeholder":"開始年月","end-placeholder":"結束年月",format:"YYYY-MM","value-format":"YYYY-MM"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["prop","rules"])]),_:2},1024),e(o,{span:3},{default:l(()=>[e(n,{style:{display:"flex","align-items":"flex-end","justify-content":"center",width:"100%",height:"100%"}},{default:l(()=>[e(D,{type:"success",onClick:t[20]||(t[20]=i=>_e())},{default:l(()=>[f("新增")]),_:1}),e(D,{type:"danger",onClick:i=>be(V)},{default:l(()=>[f("刪除")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1}),e(o,{span:24},{default:l(()=>[e(h,null,{default:l(()=>[e(p,{size:"large",tag:"b"},{default:l(()=>[f("職能及證照")]),_:1})]),_:1})]),_:1}),e(o,{sm:24,md:8,lg:8},{default:l(()=>[e(n,{label:"語言能力"},{default:l(()=>[e(g,{modelValue:r.value.languages,"onUpdate:modelValue":t[21]||(t[21]=a=>r.value.languages=a),placeholder:"選擇語言能力",multiple:"",filterable:"","allow-create":"","default-first-option":"","reserve-keyword":!1},{default:l(()=>[(m(!0),U(Y,null,S(te.value,a=>(m(),y(d,{key:a,label:a,value:a},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:8,lg:8},{default:l(()=>[e(n,{label:"特殊專長"},{default:l(()=>[e(g,{modelValue:r.value.computerExpertise,"onUpdate:modelValue":t[22]||(t[22]=a=>r.value.computerExpertise=a),placeholder:"選擇特殊專長",multiple:"",filterable:"","allow-create":"","default-first-option":"","reserve-keyword":!1},{default:l(()=>[(m(!0),U(Y,null,S(re.value,a=>(m(),y(d,{key:a,label:a,value:a},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:24,md:8,lg:8},{default:l(()=>[e(n,{label:"專業證照"},{default:l(()=>[e(g,{modelValue:r.value.professionalLicense,"onUpdate:modelValue":t[23]||(t[23]=a=>r.value.professionalLicense=a),placeholder:"請輸入專業證照",multiple:"",filterable:"","allow-create":"","default-first-option":"","reserve-keyword":!1},{default:l(()=>[(m(!0),U(Y,null,S(ue.value,a=>(m(),y(d,{key:a,label:a,value:a},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(o,{span:24},{default:l(()=>[e(h,null,{default:l(()=>[e(p,{size:"large",tag:"b"},{default:l(()=>[f("緊急聯絡人")]),_:1})]),_:1})]),_:1}),e(o,{sm:12,md:6,lg:6},{default:l(()=>[e(n,{label:"姓名",prop:"emergencyContact.name"},{default:l(()=>[e(s,{modelValue:r.value.emergencyContact.name,"onUpdate:modelValue":t[24]||(t[24]=a=>r.value.emergencyContact.name=a),placeholder:"請輸入姓名"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:12,md:6,lg:6},{default:l(()=>[e(n,{label:"關係",prop:"emergencyContact.relationship"},{default:l(()=>[e(s,{modelValue:r.value.emergencyContact.relationship,"onUpdate:modelValue":t[25]||(t[25]=a=>r.value.emergencyContact.relationship=a),placeholder:"請輸入關係"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:12,md:6,lg:6},{default:l(()=>[e(n,{label:"連絡電話",prop:"emergencyContact.phone"},{default:l(()=>[e(s,{modelValue:r.value.emergencyContact.phone,"onUpdate:modelValue":t[26]||(t[26]=a=>r.value.emergencyContact.phone=a),placeholder:"請輸入電話"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:12,md:6,lg:6},{default:l(()=>[e(n,{label:"行動電話",prop:"emergencyContact.mobile"},{default:l(()=>[e(s,{modelValue:r.value.emergencyContact.mobile,"onUpdate:modelValue":t[27]||(t[27]=a=>r.value.emergencyContact.mobile=a),maxlength:"10","show-word-limit":"",placeholder:"請輸入行動電話"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{span:24},{default:l(()=>[e(h,null,{default:l(()=>[e(p,{size:"large",tag:"b"},{default:l(()=>[f("薪資撥入帳號")]),_:1}),e(p,{size:"large",type:"danger",tag:"b"},{default:l(()=>[f("(請詳細填寫正確)")]),_:1})]),_:1})]),_:1}),e(o,{sm:12,md:12,lg:12},{default:l(()=>[e(n,{label:"國泰世華銀行帳號",prop:"bank.account"},{default:l(()=>[e(s,{modelValue:r.value.bank.account,"onUpdate:modelValue":t[28]||(t[28]=a=>r.value.bank.account=a),maxlength:"12","show-word-limit":"",placeholder:"請輸入銀行帳號"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:12,md:12,lg:12},{default:l(()=>[e(n,{label:"國泰世華銀行分行名稱",prop:"bank.branchName"},{default:l(()=>[e(s,{modelValue:r.value.bank.branchName,"onUpdate:modelValue":t[29]||(t[29]=a=>r.value.bank.branchName=a),placeholder:"請輸入銀行分行名稱"},null,8,["modelValue"])]),_:1})]),_:1}),e(o,{sm:12,md:12,lg:12},{default:l(()=>[e(n,{label:"身分證正面",prop:"idCardFrontImageUrl"},{default:l(()=>[e(J,{"show-file-list":!1,"auto-upload":!1,"on-change":Ue,drag:"",style:{width:"100%"}},{tip:l(()=>[Ke]),default:l(()=>[L.value||r.value.idCardFrontImageUrl?(m(),y(Q,{key:0,class:"watermark",content:C.content,font:C.font,"z-index":C.zIndex,rotate:C.rotate,gap:C.gap,offset:C.offset},{default:l(()=>[e(T,{src:L.value||r.value.idCardFrontImageUrl,fit:"cover",class:"avatar"},null,8,["src"])]),_:1},8,["content","font","z-index","rotate","gap","offset"])):(m(),U("div",Je,[e(j,{class:"el-icon--upload"},{default:l(()=>[e(X)]),_:1}),Ae]))]),_:1})]),_:1})]),_:1}),e(o,{sm:12,md:12,lg:12},{default:l(()=>[e(n,{label:"身分證反面",prop:"idCardBackImageUrl"},{default:l(()=>[e(J,{"show-file-list":!1,"auto-upload":!1,"on-change":Ce,drag:"",style:{width:"100%"}},{tip:l(()=>[He]),default:l(()=>[E.value||r.value.idCardBackImageUrl?(m(),y(Q,{key:0,class:"watermark",content:C.content,font:C.font,"z-index":C.zIndex,rotate:C.rotate,gap:C.gap,offset:C.offset},{default:l(()=>[e(T,{src:E.value||r.value.idCardBackImageUrl,fit:"cover",class:"avatar"},null,8,["src"])]),_:1},8,["content","font","z-index","rotate","gap","offset"])):(m(),U("div",We,[e(j,{class:"el-icon--upload"},{default:l(()=>[e(X)]),_:1}),Oe]))]),_:1})]),_:1})]),_:1}),e(o,{span:24},{default:l(()=>[q("div",Qe,[F("",!0),F("",!0),e(D,{type:"primary",onClick:t[31]||(t[31]=a=>he(I.value))},{default:l(()=>[f("保存")]),_:1}),F("",!0),F("",!0),F("",!0)])]),_:1})]),_:1})]),_:1},8,["model","rules"]),q("div",Xe,[e(Se,{content:"匯出PDF",placement:"left-start",effect:"dark"},{default:l(()=>[e(D,{icon:Pe(ze),type:"primary",plain:"",round:""},{default:l(()=>[f("匯出")]),_:1},8,["icon"])]),_:1})])],64)}}},nl=qe(Ze,[["__scopeId","data-v-70cb3d6b"]]);export{nl as default};
