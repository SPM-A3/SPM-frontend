(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f8c598fa"],{1276:function(e,a,t){"use strict";var l=t("2ba4"),o=t("c65b"),n=t("e330"),r=t("d784"),i=t("44e7"),u=t("825a"),c=t("1d80"),s=t("4840"),b=t("8aa5"),f=t("50c4"),d=t("577e"),p=t("dc4a"),v=t("4dae"),h=t("14c3"),m=t("9263"),g=t("9f7f"),I=t("d039"),k=g.UNSUPPORTED_Y,y=4294967295,x=Math.min,w=[].push,S=n(/./.exec),C=n(w),R=n("".slice),N=!I((function(){var e=/(?:)/,a=e.exec;e.exec=function(){return a.apply(this,arguments)};var t="ab".split(e);return 2!==t.length||"a"!==t[0]||"b"!==t[1]}));r("split",(function(e,a,t){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,t){var n=d(c(this)),r=void 0===t?y:t>>>0;if(0===r)return[];if(void 0===e)return[n];if(!i(e))return o(a,n,e,r);var u,s,b,f=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,g=new RegExp(e.source,p+"g");while(u=o(m,g,n)){if(s=g.lastIndex,s>h&&(C(f,R(n,h,u.index)),u.length>1&&u.index<n.length&&l(w,f,v(u,1)),b=u[0].length,h=s,f.length>=r))break;g.lastIndex===u.index&&g.lastIndex++}return h===n.length?!b&&S(g,"")||C(f,""):C(f,R(n,h)),f.length>r?v(f,0,r):f}:"0".split(void 0,0).length?function(e,t){return void 0===e&&0===t?[]:o(a,this,e,t)}:a,[function(a,t){var l=c(this),r=void 0==a?void 0:p(a,e);return r?o(r,a,l,t):o(n,d(l),a,t)},function(e,l){var o=u(this),r=d(e),i=t(n,o,r,l,n!==a);if(i.done)return i.value;var c=s(o,RegExp),p=o.unicode,v=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.unicode?"u":"")+(k?"g":"y"),m=new c(k?"^(?:"+o.source+")":o,v),g=void 0===l?y:l>>>0;if(0===g)return[];if(0===r.length)return null===h(m,r)?[r]:[];var I=0,w=0,S=[];while(w<r.length){m.lastIndex=k?0:w;var N,O=h(m,k?R(r,w):r);if(null===O||(N=x(f(m.lastIndex+(k?w:0)),r.length))===I)w=b(r,w,p);else{if(C(S,R(r,I,w)),S.length===g)return S;for(var P=1;P<=O.length-1;P++)if(C(S,O[P]),S.length===g)return S;w=I=N}}return C(S,R(r,I)),S}]}),!N,k)},"14c3":function(e,a,t){var l=t("da84"),o=t("c65b"),n=t("825a"),r=t("1626"),i=t("c6b6"),u=t("9263"),c=l.TypeError;e.exports=function(e,a){var t=e.exec;if(r(t)){var l=o(t,e,a);return null!==l&&n(l),l}if("RegExp"===i(e))return o(u,e,a);throw c("RegExp#exec called on incompatible receiver")}},"25f0":function(e,a,t){"use strict";var l=t("e330"),o=t("5e77").PROPER,n=t("6eeb"),r=t("825a"),i=t("3a9b"),u=t("577e"),c=t("d039"),s=t("ad6d"),b="toString",f=RegExp.prototype,d=f[b],p=l(s),v=c((function(){return"/a/b"!=d.call({source:"a",flags:"b"})})),h=o&&d.name!=b;(v||h)&&n(RegExp.prototype,b,(function(){var e=r(this),a=u(e.source),t=e.flags,l=u(void 0===t&&i(f,e)&&!("flags"in f)?p(e):t);return"/"+a+"/"+l}),{unsafe:!0})},"3d65":function(e,a,t){},"44e7":function(e,a,t){var l=t("861d"),o=t("c6b6"),n=t("b622"),r=n("match");e.exports=function(e){var a;return l(e)&&(void 0!==(a=e[r])?!!a:"RegExp"==o(e))}},"89f1":function(e,a,t){"use strict";t("3d65")},"8aa5":function(e,a,t){"use strict";var l=t("6547").charAt;e.exports=function(e,a,t){return a+(t?l(e,a).length:1)}},"99af":function(e,a,t){"use strict";var l=t("23e7"),o=t("da84"),n=t("d039"),r=t("e8b5"),i=t("861d"),u=t("7b0b"),c=t("07fa"),s=t("8418"),b=t("65f0"),f=t("1dde"),d=t("b622"),p=t("2d00"),v=d("isConcatSpreadable"),h=9007199254740991,m="Maximum allowed index exceeded",g=o.TypeError,I=p>=51||!n((function(){var e=[];return e[v]=!1,e.concat()[0]!==e})),k=f("concat"),y=function(e){if(!i(e))return!1;var a=e[v];return void 0!==a?!!a:r(e)},x=!I||!k;l({target:"Array",proto:!0,forced:x},{concat:function(e){var a,t,l,o,n,r=u(this),i=b(r,0),f=0;for(a=-1,l=arguments.length;a<l;a++)if(n=-1===a?r:arguments[a],y(n)){if(o=c(n),f+o>h)throw g(m);for(t=0;t<o;t++,f++)t in n&&s(i,f,n[t])}else{if(f>=h)throw g(m);s(i,f++,n)}return i.length=f,i}})},baba:function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("a-card",{attrs:{"body-style":{padding:"24px 32px"},bordered:!1,title:"Edit book"}},[t("a-form",[t("a-form-item",{attrs:{label:"cover",labelCol:{span:7},wrapperCol:{span:10}}},[t("a-upload",{staticClass:"avatar-uploader",attrs:{name:"avatar","list-type":"picture-card","show-upload-list":!1,customRequest:e.upload}},[e.bookInfo.cover?t("img",{attrs:{src:e.bookInfo.cover,alt:"avatar"}}):t("div",[t("a-icon",{attrs:{type:e.loading?"loading":"plus"}}),t("div",{staticClass:"ant-upload-text"},[e._v(" UPLOAD COVER ")])],1)])],1),t("a-form-item",{attrs:{label:e.bookName,labelCol:{span:7},wrapperCol:{span:10}}},[t("a-input",{attrs:{placeholder:e.bookNameInput},model:{value:e.bookInfo.book_name,callback:function(a){e.$set(e.bookInfo,"book_name",a)},expression:"bookInfo.book_name"}})],1),t("a-form-item",{attrs:{label:e.author,labelCol:{span:7},wrapperCol:{span:10}}},[t("a-input",{attrs:{placeholder:e.authorInput},model:{value:e.bookInfo.author,callback:function(a){e.$set(e.bookInfo,"author",a)},expression:"bookInfo.author"}})],1),t("a-form-item",{attrs:{label:e.publisher,labelCol:{span:7},wrapperCol:{span:10}}},[t("a-input",{attrs:{placeholder:e.publisherInput},model:{value:e.bookInfo.publisher,callback:function(a){e.$set(e.bookInfo,"publisher",a)},expression:"bookInfo.publisher"}})],1),t("a-form-item",{attrs:{label:e.ISBN,labelCol:{span:7},wrapperCol:{span:10}}},[t("a-input",{attrs:{placeholder:e.ISBNInput,disabled:""},model:{value:e.bookInfo.ISBN,callback:function(a){e.$set(e.bookInfo,"ISBN",a)},expression:"bookInfo.ISBN"}})],1),t("a-form-item",{attrs:{label:e.publishedTime,labelCol:{span:7},wrapperCol:{span:10}}},[t("a-month-picker",{staticStyle:{width:"100%"},attrs:{placeholder:e.publishedTimeInput},model:{value:e.bookInfo.published_time,callback:function(a){e.$set(e.bookInfo,"published_time",a)},expression:"bookInfo.published_time"}})],1),t("a-form-item",{attrs:{label:e.category,labelCol:{span:7},wrapperCol:{span:10}}},[t("a-cascader",{attrs:{options:e.options,placeholder:e.categoryInput,"show-search":{filter:e.filter}},model:{value:e.bookInfo.category,callback:function(a){e.$set(e.bookInfo,"category",a)},expression:"bookInfo.category"}})],1),t("a-form-item",{attrs:{label:e.briefIntroduction,labelCol:{span:7},wrapperCol:{span:10}}},[t("a-textarea",{attrs:{rows:"4",placeholder:e.briefIntroductionInput},model:{value:e.bookInfo.brief_introduction,callback:function(a){e.$set(e.bookInfo,"brief_introduction",a)},expression:"bookInfo.brief_introduction"}})],1),t("a-form-item",{staticStyle:{"margin-top":"24px"},attrs:{wrapperCol:{span:10,offset:7}}},[t("a-space",[t("a-button",{attrs:{type:"primary",disabled:!e.canSubmit},on:{click:e.submit}},[e._v("UPDATE")]),t("a-button",{on:{click:function(a){return e.$router.push("/admin")}}},[e._v("CANCEL")])],1)],1)],1)],1)},o=[],n=t("1da1"),r=(t("96cf"),t("d3b7"),t("99af"),t("ac1f"),t("1276"),t("25f0"),t("e9c4"),t("93d6")),i=t("e81a"),u=t("c1df"),c=t.n(u);function s(e,a){var t=new FileReader;t.addEventListener("load",(function(){return a(t.result)})),t.readAsDataURL(e)}var b={name:"BookAdd",data:function(){return{baseUrl:"https://www.fastmock.site/mock/0aee7559464fadc986c2e38e63492a86/spm",loading:!1,canSubmit:!1,bookName:"Book name",bookNameInput:"Please input book name",author:"Author",authorInput:"Please input author",publisher:"Publisher",publisherInput:"Please input publisher",ISBN:"ISBN",ISBNInput:"Please input ISBN",category:"Category",categoryInput:"Please enter or select category",publishedTime:"Publish date",publishedTimeInput:"Please select publish date",briefIntroduction:"Introduction",briefIntroductionInput:"Please input introduction",searchValue:"",bookInfo:{book_name:void 0,author:void 0,publisher:void 0,ISBN:void 0,category:void 0,published_time:void 0,cover:void 0,brief_introduction:void 0},options:[]}},created:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var t,l,o,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,i["a"].getOptions();case 2:e.options=a.sent,t=e.$route.params.id,e.bookInfo.ISBN=t,l=new Headers,l.append("token",Object(r["c"])()),o={method:"GET",headers:l},n=e,fetch("".concat(e.$global.BASE_URL,"/api/admin/book/detail?ISBN=").concat(t),o).then((function(e){return e.json()})).then((function(e){var a=e.data,t=e.code;e.msg;0==t||"0"==t?(n.bookInfo.book_name=a[0].bookName,n.bookInfo.author=a[0].author,n.bookInfo.publisher=a[0].publisher,n.bookInfo.category=n.format(a[0].category),n.bookInfo.published_time=c()(a[0].publishedTime),n.bookInfo.cover=a[0].cover,n.bookInfo.brief_introduction=a[0].briefIntroduction,n.canSubmit=!0):(n.canSubmit=!1,n.$message.error("Book not found"))})).catch((function(e){n.canSubmit=!1}));case 10:case"end":return a.stop()}}),a)})))()},methods:{handleUpdate:function(e){var a=this;"uploading"!==e.file.status?"done"===e.file.status&&s(e.file.originFileObj,(function(e){a.bookInfo.cover=e,a.loading=!1})):this.loading=!0},upload:function(e){var a=this;this.loading=!0;var t=new FileReader;t.readAsDataURL(e.file),t.onloadend=function(e){var t=this,l=e.target.result.toString().split(",")[1];if(e&&e.target&&e.target.result){var o=l,n={method:"POST",body:o};fetch("https://service-rb270dgm-1301774019.gz.apigw.tencentcs.com/release/SPM_uploadimage",n).then((function(e){return e.text()})).then((function(e){t.loading=!1,a.bookInfo.cover=e,console.log(e)})).catch((function(e){console.log("error",e),a.loading=!1}))}}},submit:function(){var e={};e.category=this.bookInfo.category[1],e={isbn:this.bookInfo.ISBN,bookName:this.bookInfo.book_name,publisher:this.bookInfo.publisher,publishedTime:this.bookInfo.published_time.format("YYYY-MM")+"-01",author:this.bookInfo.author,cover:this.bookInfo.cover,category:this.bookInfo.category[1],briefIntroduction:this.bookInfo.brief_introduction},console.log(e);var a=new Headers;a.append("token",Object(r["c"])()),a.append("Content-Type","application/json");var t=e,l={method:"PUT",headers:a,body:JSON.stringify(t)},o=this;fetch("".concat(this.$global.BASE_URL,"/api/admin/book/update"),l).then((function(e){return e.json()})).then((function(e){0===e.code||"0"===e.code?(o.$message.success("Edit book successfully"),setTimeout((function(){o.$router.push("/admin")}),200)):o.$message.error("API call failed, "+e.error_msg)})).catch((function(e){o.$message.error("API call failed.")}))},format:function(e){return 1==e.length?[e,e]:[e[0],e]},filter:function(e,a){return a.some((function(a){return a.label.toLowerCase().indexOf(e.toLowerCase())>-1}))}}},f=b,d=(t("89f1"),t("2877")),p=Object(d["a"])(f,l,o,!1,null,null,null);a["default"]=p.exports},d784:function(e,a,t){"use strict";t("ac1f");var l=t("e330"),o=t("6eeb"),n=t("9263"),r=t("d039"),i=t("b622"),u=t("9112"),c=i("species"),s=RegExp.prototype;e.exports=function(e,a,t,b){var f=i(e),d=!r((function(){var a={};return a[f]=function(){return 7},7!=""[e](a)})),p=d&&!r((function(){var a=!1,t=/a/;return"split"===e&&(t={},t.constructor={},t.constructor[c]=function(){return t},t.flags="",t[f]=/./[f]),t.exec=function(){return a=!0,null},t[f](""),!a}));if(!d||!p||t){var v=l(/./[f]),h=a(f,""[e],(function(e,a,t,o,r){var i=l(e),u=a.exec;return u===n||u===s.exec?d&&!r?{done:!0,value:v(a,t,o)}:{done:!0,value:i(t,a,o)}:{done:!1}}));o(String.prototype,e,h[0]),o(s,f,h[1])}b&&u(s[f],"sham",!0)}},e81a:function(e,a,t){"use strict";t("a4d3"),t("e01a"),t("d3b7"),t("d28b"),t("3ca3"),t("ddb0");function l(e){return l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}var o=t("1da1"),n=(t("96cf"),t("e9c4"),[{value:"A",label:"A马克思主义、列宁主义、毛泽东思想、邓小平理论",children:[{value:"A",label:"全部"},{value:"A1",label:"A1马克思、恩格斯著作"},{value:"A2",label:"A2毛泽东著作"},{value:"A3",label:"A3马克思主义、列宁主义、毛泽东思想、邓小平理论的学习和研究"}]},{value:"B",label:"B哲学、宗教",children:[{value:"B",label:"全部"},{value:"B0",label:"B0哲学理论"},{value:"B81",label:"B81逻辑学"},{value:"B84",label:"B84心理学"}]},{value:"C",label:"C社会科学总论",children:[{value:"C",label:"全部"},{value:"C0",label:"C0社会科学理论与方法论"},{value:"C91",label:"C91社会学"},{value:"C8",label:"C8统计学"},{value:"C93",label:"C93管理学"}]},{value:"D",label:"D政治、法律",children:[{value:"D",label:"全部"},{value:"D2",label:"D2中国共产党"},{value:"D8",label:"D8外交、国际关系"},{value:"D9",label:"D9法律"}]},{value:"E",label:"E军事",children:[{value:"E",label:"全部"},{value:"E0",label:"E0军事理论"},{value:"E2",label:"E2中国军事"}]},{value:"F",label:"F经济",children:[{value:"F",label:"全部"},{value:"F0",label:"F0经济学"},{value:"F8",label:"F8财政、金融"}]},{value:"G",label:"G文化、科学、教育、体育",children:[{value:"G",label:"全部"},{value:"G4",label:"G4教育"},{value:"",label:"G8体育"}]},{value:"H",label:"H语言、文字",children:[{value:"H",label:"全部"},{value:"H0",label:"H0语言学"},{value:"H1",label:"H1汉语"},{value:"H3",label:"H3常用外国语"}]},{value:"I",label:"I文学",children:[{value:"I",label:"全部"},{value:"I1",label:"I1世界文学"},{value:"I2",label:"I2中国文学"}]},{value:"J",label:"J艺术",children:[{value:"J",label:"全部"},{value:"J2",label:"J2绘画"},{value:"J9",label:"J9电影、电视艺术"}]},{value:"K",label:"K历史、地理",children:[{value:"K",label:"全部"},{value:"K1",label:"K1世界史"},{value:"K2",label:"K2中国史"},{value:"K9",label:"K9地理"}]},{value:"N",label:"N自然科学总论",children:[{value:"N",label:"全部"},{value:"N0",label:"N0自然科学理论与方法论"}]},{value:"O",label:"O数理科学和化学",children:[{value:"O",label:"全部"},{value:"O1",label:"O1数学"},{value:"O4",label:"O4物理学"},{value:"O6",label:"O6化学"}]},{value:"P",label:"P天文学、地球科学",children:[{value:"P",label:"全部"},{value:"P1",label:"P1天文学"},{value:"P9",label:"P9自然地理学"}]},{value:"Q",label:"Q生物科学",children:[{value:"Q",label:"全部"},{value:"Q2",label:"Q2细胞生物学"},{value:"Q4",label:"Q4遗传学"},{value:"Q94",label:"Q94植物学"}]},{value:"R",label:"R医药、卫生",children:[{value:"R",label:"全部"},{value:"R3",label:"R3基础医学"},{value:"R4",label:"R4临床医学"},{value:"R9",label:"R9药学"}]},{value:"S",label:"S农业科学",children:[{value:"S",label:"全部"},{value:"S1",label:"S1农业基础科学"},{value:"S6",label:"S6园艺"}]},{value:"T",label:"T工业技术",children:[{value:"T",label:"全部"},{value:"TB",label:"TB一般工业技术"},{value:"TN",label:"TN无线电电子学、电信技术"},{value:"TP",label:"TP自动化技术、计算机技术"}]},{value:"U",label:"U交通运输",children:[{value:"U",label:"全部"},{value:"U2",label:"U2铁路运输"},{value:"U4",label:"U4公路运输"},{value:"U6",label:"U6水路运输"}]},{value:"V",label:"V航空、航天",children:[{value:"V",label:"全部"},{value:"V2",label:"V2航空"},{value:"V4",label:"V4航天"}]},{value:"X",label:"X环境科学、安全科学",children:[{value:"X",label:"全部"},{value:"X1",label:"X1环境科学基础理论"},{value:"X3",label:"X3环境保护管理"}]},{value:"Z",label:"Z综合类图书",children:[{value:"Z",label:"全部"}]}]),r=function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var a,t,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=new Headers,a.append("Content-Type","application/json"),t=JSON.stringify({category:JSON.stringify(n)}),l={method:"POST",headers:a,body:t,redirect:"follow"},fetch("https://testip-cloud-homework-lralemfqco.cn-hangzhou.fcapp.run/editgory",l).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.log("error",e)}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),i=function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("getOptions"),e.next=3,fetch("https://testip-cloud-homework-lralemfqco.cn-hangzhou.fcapp.run/category").then((function(e){return e.json()})).then((function(e){return JSON.parse(e.categoryString)}));case 3:return a=e.sent,console.log(l(a)),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();a["a"]={getOptions:i,resetOptions:r}}}]);
//# sourceMappingURL=chunk-f8c598fa.9ad430c9.js.map