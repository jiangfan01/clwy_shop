"use strict";(self["webpackChunkvue_shop"]=self["webpackChunkvue_shop"]||[]).push([[383],{3383:function(e,r,t){t.r(r),t.d(r,{default:function(){return d}});var s=function(){var e=this,r=e._self._c;return r("div",[r("usersForm",{attrs:{isEdit:!0}})],1)},a=[],o=t(2722),n={components:{usersForm:o.Z}},i=n,u=t(1001),l=(0,u.Z)(i,s,a,!1,null,null,null),d=l.exports},2722:function(e,r,t){t.d(r,{Z:function(){return m}});var s=function(){var e=this,r=e._self._c;return r("div",[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.user,"status-icon":"",rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{attrs:{disabled:e.isEdit},model:{value:e.user.username,callback:function(r){e.$set(e.user,"username",r)},expression:"user.username"}})],1),e.isEdit?r("el-form-item",{attrs:{label:"原始密码",prop:"oldPassword"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.user.oldPassword,callback:function(r){e.$set(e.user,"oldPassword",r)},expression:"user.oldPassword"}})],1):e._e(),r("el-form-item",{attrs:{label:e.isEdit?"新密码":"密码",prop:"password"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.user.password,callback:function(r){e.$set(e.user,"password",r)},expression:"user.password"}})],1),r("el-form-item",{attrs:{label:"重复密码",prop:"passwordConfirm"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.user.passwordConfirm,callback:function(r){e.$set(e.user,"passwordConfirm",r)},expression:"user.passwordConfirm"}})],1),r("el-form-item",{attrs:{label:"头像",prop:"image"}},[r("el-upload",{staticClass:"image-uploader",attrs:{action:"http://up-z2.qiniup.com/","show-file-list":!1,"on-success":e.handleImageSuccess,"before-upload":e.beforeImageUpload,data:e.uploadData,name:"file"}},[e.imageUrl?r("img",{staticClass:"image",attrs:{src:e.imageUrl}}):r("i",{staticClass:"el-icon-plus image-uploader-icon"})])],1),r("el-form-item",{attrs:{label:"管理员"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":""},model:{value:e.user.admin,callback:function(r){e.$set(e.user,"admin",r)},expression:"user.admin"}})],1),r("el-form-item",{attrs:{label:"性别"}},[r("el-radio-group",{model:{value:e.user.sex,callback:function(r){e.$set(e.user,"sex",r)},expression:"user.sex"}},[r("el-radio",{attrs:{label:1}},[e._v("男")]),r("el-radio",{attrs:{label:0}},[e._v("女")])],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v(e._s(e.isEdit?"立即修改":"立即创建")+" ")]),r("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)},a=[],o=(t(1703),t(2900)),n=t(3029),i=t(9343),u={props:{isEdit:{type:Boolean}},data(){const e=(e,r,t)=>{""===r?t(new Error("请输入密码")):(""!==this.user.passwordConfirm&&this.$refs.ruleForm.validateField("passwordConfirm"),t())},r=(e,r,t)=>{""===r?t(new Error("请再次输入密码")):r!==this.user.password?t(new Error("两次输入密码不一致!")):t()};return{uploadData:{key:"",token:""},imageUrl:"",user:{username:"",password:"",oldPassword:"",passwordConfirm:"",admin:!1,sex:1,avatar:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,validator:e,trigger:"blur"}],passwordConfirm:[{validator:r,trigger:"blur"}]}}},created(){this.isEdit&&this.fetchData()},methods:{async fetchData(){const e=await(0,o.BT)(this.$route.params.id);this.imageUrl=e.data.user.avatar;const r={...e.data.user,password:""};this.user=r},submitForm(e){this.$refs[e].validate((async e=>{if(e){let e;if(e=this.isEdit?await(0,o.Nq)(this.$route.params.id,this.user):await(0,o.r4)(this.user),2e4!==e.code)return void this.$message.error(e.message);this.$message.success(e.message),this.$router.push({name:"usersList"})}}))},resetForm(e){this.$refs[e].resetFields()},handleImageSuccess(e,r){this.imageUrl=URL.createObjectURL(r.raw),this.user.avatar=`http://ria894its.hn-bkt.clouddn.com/${e.key}`},async beforeImageUpload(e){const r="image/jpeg"===e.type,t="image/png"===e.type,s="image/gif"===e.type,a=e.size/1024/1024<2;if(!r&&!t&&!s)return this.$message.error("上传头像图片只能是 jpg,png,gif 格式!"),!1;if(!a)return this.$message.error("上传头像图片大小不能超过 2MB!"),!1;const o=await(0,i.E)();this.uploadData.token=o.data.uploadToken;const u=e.type.split("/")[1];this.uploadData.key=`${(0,n.Z)()}.${u}`,console.log(this.uploadData.key)}}},l=u,d=t(1001),c=(0,d.Z)(l,s,a,!1,null,null,null),m=c.exports},3029:function(e,r,t){t.d(r,{Z:function(){return c}});const s="undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var a={randomUUID:s};t(8675),t(7380),t(1118),t(1703);let o;const n=new Uint8Array(16);function i(){if(!o&&(o="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!o))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return o(n)}const u=[];for(let m=0;m<256;++m)u.push((m+256).toString(16).slice(1));function l(e,r=0){return(u[e[r+0]]+u[e[r+1]]+u[e[r+2]]+u[e[r+3]]+"-"+u[e[r+4]]+u[e[r+5]]+"-"+u[e[r+6]]+u[e[r+7]]+"-"+u[e[r+8]]+u[e[r+9]]+"-"+u[e[r+10]]+u[e[r+11]]+u[e[r+12]]+u[e[r+13]]+u[e[r+14]]+u[e[r+15]]).toLowerCase()}function d(e,r,t){if(a.randomUUID&&!r&&!e)return a.randomUUID();e=e||{};const s=e.random||(e.rng||i)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,r){t=t||0;for(let e=0;e<16;++e)r[t+e]=s[e];return r}return l(s)}var c=d},9343:function(e,r,t){t.d(r,{E:function(){return a}});var s=t(4471);function a(){return(0,s.Z)({url:"/admin/uploads",method:"get"})}},2900:function(e,r,t){t.d(r,{BT:function(){return o},Nq:function(){return i},h8:function(){return u},iI:function(){return a},lC:function(){return l},r4:function(){return n}});var s=t(4471);function a(e){return(0,s.Z)({url:"/admin/users",method:"get",params:e})}function o(e){return(0,s.Z)({url:`/admin/users/${e}`,method:"get"})}function n(e){return(0,s.Z)({url:"/admin/users",method:"post",data:e})}function i(e,r){return(0,s.Z)({url:`/admin/users/${e}`,method:"put",data:r})}function u(e){return(0,s.Z)({url:`/admin/users/${e}`,method:"delete"})}function l(e,r){return(0,s.Z)({url:`http://localhost:3000/admin/users/${e}/toggle_admin`,method:"patch",data:r})}}}]);
//# sourceMappingURL=383.34278dd7.js.map