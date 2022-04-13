(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b72a8"],{"1feb":function(e,r,a){"use strict";a.r(r);var t=function(){var e=this,r=e.$createElement,a=e._self._c||r;return e.$global.IS_LOGIN?e._e():a("a-form",{attrs:{form:e.form},on:{submit:e.handleSubmit}},[a("a-form-item",e._b({attrs:{label:"ID"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["id",{rules:[{required:!0,message:"Please input your ID!"}]}],expression:"[\n        'id',\n        {\n          rules: [\n            {\n              required: true,\n              message: 'Please input your ID!',\n            },\n          ],\n        },\n      ]"}]})],1),a("a-form-item",e._b({attrs:{label:"E-mail"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}]}],expression:"[\n        'email',\n        {\n          rules: [\n            {\n              type: 'email',\n              message: 'The input is not valid E-mail!',\n            },\n            {\n              required: true,\n              message: 'Please input your E-mail!',\n            },\n          ],\n        },\n      ]"}]})],1),a("a-form-item",e._b({attrs:{label:"Password","has-feedback":""}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"Please input your password!"},{validator:e.validateToNextPassword}]}],expression:"[\n        'password',\n        {\n          rules: [\n            {\n              required: true,\n              message: 'Please input your password!',\n            },\n            {\n              validator: validateToNextPassword,\n            },\n          ],\n        },\n      ]"}],attrs:{type:"password"}})],1),a("a-form-item",e._b({attrs:{label:"Confirm Password","has-feedback":""}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["confirm",{rules:[{required:!0,message:"Please confirm your password!"},{validator:e.compareToFirstPassword}]}],expression:"[\n        'confirm',\n        {\n          rules: [\n            {\n              required: true,\n              message: 'Please confirm your password!',\n            },\n            {\n              validator: compareToFirstPassword,\n            },\n          ],\n        },\n      ]"}],attrs:{type:"password"},on:{blur:e.handleConfirmBlur}})],1),a("a-form-item",e._b({},"a-form-item",e.formItemLayout,!1),[a("span",{attrs:{slot:"label"},slot:"label"},[e._v(" Name ")]),a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"Please input your name!",whitespace:!0}]}],expression:"[\n        'name',\n        {\n          rules: [{ required: true, message: 'Please input your name!', whitespace: true }],\n        },\n      ]"}]})],1),a("a-form-item",e._b({attrs:{label:"gender"}},"a-form-item",e.formItemLayout,!1),[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["gender",{rules:[{required:!0,message:"Please select your gender!",whitespace:!0,type:"number"}]}],expression:"[\n        'gender',\n        {\n          rules: [{ required: true, message: 'Please select your gender!', whitespace: true, type: 'number' }],\n        },\n      ]"}]},[a("a-select-option",{attrs:{value:0}},[e._v(" Male ")]),a("a-select-option",{attrs:{value:1}},[e._v(" Female ")])],1)],1),a("a-form-item",e._b({attrs:{label:"Position"}},"a-form-item",e.formItemLayout,!1),[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["position",{rules:[{required:!0,message:"Please select your position!",whitespace:!0,type:"number"}]}],expression:"[\n        'position',\n        {\n          rules: [{ required: true, message: 'Please select your position!', whitespace: true, type: 'number' }],\n        },\n      ]"}]},[a("a-select-option",{attrs:{value:0}},[e._v(" Student ")]),a("a-select-option",{attrs:{value:1}},[e._v(" Teacher ")]),a("a-select-option",{attrs:{value:2}},[e._v(" Staff ")])],1)],1),a("a-form-item",e._b({attrs:{label:"Phone Number"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phone_number",{rules:[{required:!0,message:"Please input your phone number!"}]}],expression:"[\n        'phone_number',\n        {\n          rules: [{ required: true, message: 'Please input your phone number!' }],\n        },\n      ]"}],staticStyle:{width:"100%"}})],1),a("a-form-item",e._b({},"a-form-item",e.tailFormItemLayout,!1),[a("a-button",{attrs:{loading:e.loading,type:"primary","html-type":"submit"}},[e._v(" Register ")])],1)],1)},s=[],o=(a("e9c4"),a("d3b7"),a("93d6")),n={data:function(){return{confirmDirty:!1,autoCompleteResult:[],formItemLayout:{labelCol:{xs:{span:27},sm:{span:9}},wrapperCol:{xs:{span:12},sm:{span:8}}},tailFormItemLayout:{wrapperCol:{xs:{span:27,offset:0},sm:{span:16,offset:9}}},loading:!1}},beforeCreate:function(){var e=this;Object(o["g"])().then((function(e){return e.json()})).then((function(r){var a=r.data,t=r.code;r.msg;0==t||"0"==t?(Object(o["f"])(a),e.$message.error("You have already logged in.",1),e.$router.push("/")):e.$global.IS_LOGIN=!1})).catch((function(r){return e.$global.IS_LOGIN=!1})),this.form=this.$form.createForm(this,{name:"register"})},methods:{handleSubmit:function(e){var r=this,a=this;this.loading=!0,e.preventDefault(),this.form.validateFieldsAndScroll((function(e,t){if(e)r.loading=!1;else{console.log(t);var s={method:"POST",body:JSON.stringify(t)};fetch("".concat(a.$global.BASE_URL,"/api/user/register"),s).then((function(e){return e.json()})).then((function(e){console.log(e),0==e.code||"0"==e.code?(a.loading=!1,a.$message.success("success","Register successfully"),Object(o["e"])(e.data),a.$router.push("/")):(a.loading=!1,a.$message.error(e.msg))})).catch((function(e){console.log("error",e),a.loading=!1,a.$messge.error("API call error.")}))}}))},handleConfirmBlur:function(e){var r=e.target.value;this.confirmDirty=this.confirmDirty||!!r},compareToFirstPassword:function(e,r,a){var t=this.form;r&&r!==t.getFieldValue("password")?a("Two passwords that you enter is inconsistent!"):a()},validateToNextPassword:function(e,r,a){var t=this.form;r&&this.confirmDirty&&t.validateFields(["confirm"],{force:!0}),a()}},created:function(){}},i=n,u=a("2877"),l=Object(u["a"])(i,t,s,!1,null,null,null);r["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0b72a8.6ac834b7.js.map