"use strict";(self["webpackChunkvue_shop"]=self["webpackChunkvue_shop"]||[]).push([[628],{3628:function(t,e,r){r.r(e),r.d(e,{default:function(){return U}});var a=function(){var t=this,e=t._self._c;return e("div",[e("AdsFrom",{attrs:{isEdit:!0}})],1)},n=[],i=function(){var t=this,e=t._self._c;return e("div",[e("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ad,rules:t.rules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:"所属分类"}},[e("el-select",{attrs:{placeholder:"活动区域"},model:{value:t.ad.categoryId,callback:function(e){t.$set(t.ad,"categoryId",e)},expression:"ad.categoryId"}},t._l(t.categories,(function(t){return e("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),e("el-form-item",{attrs:{label:"广告标题",prop:"title"}},[e("el-input",{attrs:{id:"ads-title"},model:{value:t.ad.title,callback:function(e){t.$set(t.ad,"title",e)},expression:"ad.title"}})],1),e("el-form-item",{attrs:{label:"排序",prop:"sort"}},[e("el-input",{model:{value:t.ad.sort,callback:function(e){t.$set(t.ad,"sort",e)},expression:"ad.sort"}})],1),e("el-form-item",{attrs:{label:"图片",prop:"image"}},[e("el-upload",{staticClass:"image-uploader",attrs:{action:"http://up-z2.qiniup.com/","show-file-list":!1,"on-success":t.handleImageSuccess,"before-upload":t.beforeImageUpload,data:t.uploadData,name:"file"}},[t.imageUrl?e("img",{staticClass:"image",attrs:{src:t.imageUrl}}):e("i",{staticClass:"el-icon-plus image-uploader-icon"})])],1),e("el-form-item",{attrs:{label:"链接地址",prop:"url"}},[e("el-input",{model:{value:t.ad.url,callback:function(e){t.$set(t.ad,"url",e)},expression:"ad.url"}})],1),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v(t._s(t.isEdit?"更新":"新增"))]),e("el-button",{on:{click:function(e){return t.resetForm("ruleForm")}}},[t._v("重置")])],1)],1)],1)},o=[],s=r(3147),u=r(9343),l=r(3029);const d={data(){return{uploadData:{token:"",key:""},imageUrl:""}},methods:{async beforeImageUpload(t){const e="image/jpeg"===t.type,r="image/png"===t.type,a="image/gif"===t.type,n=t.size/1024/1024<2;if(!e&&!r&&!a)return this.$message.error("上传头像图片只能是 JPG,PNG,GIF 格式!"),!1;if(!n)return this.$message.error("上传头像图片大小不能超过 2MB!"),!1;const i=await(0,u.E)();this.uploadData.token=i.data.uploadToken;const o=t.type.split("/")[1];this.uploadData.key=`${(0,l.Z)()}.${o}`}}};var c=d,m={mixins:[c],props:{isEdit:{type:Boolean,default:!1}},data(){return{ad:{title:"",sort:"",url:"",image:"",categoryId:""},categories:[],rules:{title:[{required:!0,message:"请输入广告标题",trigger:"blur"},{min:2,max:15,message:"长度在 3 到 15 个字符",trigger:"blur"}],sort:[{required:!0,message:"请输入广告排序",trigger:"blur"}]}}},created(){this.init()},methods:{async init(){if(this.isEdit){const t=await(0,s.Tt)(this.$route.params.id);this.ad=t.data.ad,this.imageUrl=t.data.ad.image}const t=await(0,s.$)();this.categories=t.data.categories},submitForm(t){this.$refs[t].validate((async t=>{if(t){let t;if(t=this.isEdit?await(0,s.ag)(this.$route.params.id,this.ad):await(0,s.Ul)(this.ad),2e4!==t.code)return void this.$message.error(t.message);this.$message.success(t.message),this.$router.push({name:"ads"})}}))},resetForm(t){this.$refs[t].resetFields()},handleImageSuccess(t,e){this.imageUrl=URL.createObjectURL(e.raw),this.ad.image=`http://ria894its.hn-bkt.clouddn.com/${t.key}`}}},p=m,f=r(1001),g=(0,f.Z)(p,i,o,!1,null,null,null),h=g.exports,y={components:{AdsFrom:h}},b=y,v=(0,f.Z)(b,a,n,!1,null,null,null),U=v.exports},3029:function(t,e,r){r.d(e,{Z:function(){return c}});const a="undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var n={randomUUID:a};r(8675),r(7380),r(1118),r(1703);let i;const o=new Uint8Array(16);function s(){if(!i&&(i="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!i))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return i(o)}const u=[];for(let m=0;m<256;++m)u.push((m+256).toString(16).slice(1));function l(t,e=0){return(u[t[e+0]]+u[t[e+1]]+u[t[e+2]]+u[t[e+3]]+"-"+u[t[e+4]]+u[t[e+5]]+"-"+u[t[e+6]]+u[t[e+7]]+"-"+u[t[e+8]]+u[t[e+9]]+"-"+u[t[e+10]]+u[t[e+11]]+u[t[e+12]]+u[t[e+13]]+u[t[e+14]]+u[t[e+15]]).toLowerCase()}function d(t,e,r){if(n.randomUUID&&!e&&!t)return n.randomUUID();t=t||{};const a=t.random||(t.rng||s)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,e){r=r||0;for(let t=0;t<16;++t)e[r+t]=a[t];return e}return l(a)}var c=d},3147:function(t,e,r){r.d(e,{$:function(){return d},ED:function(){return l},Er:function(){return u},Tt:function(){return i},Ul:function(){return o},XZ:function(){return n},ag:function(){return s}});var a=r(4471);function n(t){return(0,a.Z)({url:"/admin/ads",method:"get",params:t})}function i(t){return(0,a.Z)({url:`/admin/ads/${t}`,method:"get"})}function o(t){return(0,a.Z)({url:"/admin/ads",method:"post",data:t})}function s(t,e){return(0,a.Z)({url:`/admin/ads/${t}`,method:"put",data:e})}function u(t){return(0,a.Z)({url:`/admin/ads/${t}`,method:"delete"})}function l(t,e){return(0,a.Z)({url:`/admin/ads/${t}/change_sort`,method:"patch",data:e})}function d(t){return(0,a.Z)({url:"/admin/ad_categories",method:"get",params:t})}},9343:function(t,e,r){r.d(e,{E:function(){return n}});var a=r(4471);function n(){return(0,a.Z)({url:"/admin/uploads",method:"get"})}}}]);
//# sourceMappingURL=628.83070682.js.map