(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1835d6f5"],{"5d0e":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._m(0),r("div",{staticClass:"login"},[r("a-form",{attrs:{form:e.form},on:{submit:e.onSubmit}},[r("a-alert",{directives:[{name:"show",rawName:"v-show",value:e.error,expression:"error"}],staticStyle:{"margin-bottom":"24px"},attrs:{type:"error",closable:!0,message:e.error,showIcon:""}}),r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["account",{rules:[{required:!0,message:"Please input your id",whitespace:!0}]}],expression:"['account', {rules: [{ required: true, message: 'Please input your id', whitespace: true}]}]"}],attrs:{autocomplete:"autocomplete",size:"large",placeholder:"Please input your id"}},[r("a-icon",{attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"Please input your password",whitespace:!0}]}],expression:"['password', {rules: [{ required: true, message: 'Please input your password', whitespace: true}]}]"}],attrs:{size:"large",placeholder:"Please input your password",autocomplete:"autocomplete",type:"password"}},[r("a-icon",{attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1),r("a-form-item",[r("a-button",{staticStyle:{width:"100%","margin-top":"24px"},attrs:{loading:e.logging,size:"large",htmlType:"submit",type:"primary"}},[e._v("login")])],1)],1)],1)])},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"top"},[r("div",{staticClass:"desc"},[e._v("Admin Login")])])}],s=r("93d6"),i={name:"Login",data:function(){return{logging:!1,error:"",form:this.$form.createForm(this)}},computed:{},methods:{onSubmit:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e){if(!e){t.logging=!0;var r=t.form.getFieldValue("account"),o=t.form.getFieldValue("password");Object(s["a"])(r,o).then((function(e){return e.json()})).then(t.afterLogin).catch((function(e){console.log(e)}))}}))},afterLogin:function(e){var t=this;this.logging=!1;var r=e,o=r.data,a=r.code,i=r.msg;0==a?(Object(s["h"])(o),Object(s["i"])("admin"),this.$message.success("Login successfully, redirecting...",1),console.log("token",Object(s["c"])()),this.$global.IS_LOGIN=!0,setTimeout((function(){t.$router.go("/")}),500)):this.error=i}},created:function(){var e=this;Object(s["k"])().then((function(e){return e.json()})).then((function(t){var r=t.data,o=t.code;t.msg;0!=o&&"0"!=o||(Object(s["j"])(r,"admin"),e.$router.push("/"))}))}},n=i,c=(r("fc10"),r("2877")),u=Object(c["a"])(n,o,a,!1,null,null,null);t["default"]=u.exports},"786a":function(e,t,r){},fc10:function(e,t,r){"use strict";r("786a")}}]);
//# sourceMappingURL=chunk-1835d6f5.aca82020.js.map