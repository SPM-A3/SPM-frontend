(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e626944a"],{"0b42":function(t,e,n){var r=n("da84"),a=n("e8b5"),o=n("68ee"),i=n("861d"),c=n("b622"),u=c("species"),s=r.Array;t.exports=function(t){var e;return a(t)&&(e=t.constructor,o(e)&&(e===s||a(e.prototype))?e=void 0:i(e)&&(e=e[u],null===e&&(e=void 0))),void 0===e?s:e}},"1dde":function(t,e,n){var r=n("d039"),a=n("b622"),o=n("2d00"),i=a("species");t.exports=function(t){return o>=51||!r((function(){var e=[],n=e.constructor={};return n[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"65f0":function(t,e,n){var r=n("0b42");t.exports=function(t,e){return new(r(t))(0===e?0:e)}},8418:function(t,e,n){"use strict";var r=n("a04b"),a=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var i=r(e);i in t?a.f(t,i,o(0,n)):t[i]=n}},"99af":function(t,e,n){"use strict";var r=n("23e7"),a=n("da84"),o=n("d039"),i=n("e8b5"),c=n("861d"),u=n("7b0b"),s=n("07fa"),d=n("8418"),f=n("65f0"),l=n("1dde"),p=n("b622"),b=n("2d00"),v=p("isConcatSpreadable"),h=9007199254740991,m="Maximum allowed index exceeded",g=a.TypeError,x=b>=51||!o((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),w=l("concat"),y=function(t){if(!c(t))return!1;var e=t[v];return void 0!==e?!!e:i(t)},k=!x||!w;r({target:"Array",proto:!0,forced:k},{concat:function(t){var e,n,r,a,o,i=u(this),c=f(i,0),l=0;for(e=-1,r=arguments.length;e<r;e++)if(o=-1===e?i:arguments[e],y(o)){if(a=s(o),l+a>h)throw g(m);for(n=0;n<a;n++,l++)n in o&&d(c,l,o[n])}else{if(l>=h)throw g(m);d(c,l++,o)}return c.length=l,c}})},a683:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[[n("a-table",{attrs:{"data-source":t.fineList,rowKey:function(t){return t.fine_id},loading:t.loading}},[n("a-table-column",{attrs:{title:"book name","data-index":"book_name"}}),n("a-table-column",{attrs:{title:"ISBN","data-index":"ISBN"}}),n("a-table-column",{attrs:{title:"status","data-index":"status"}}),n("a-table-column",{attrs:{title:"amount","data-index":"amount"}}),n("a-table-column",{attrs:{title:"payment time","data-index":"payment_time"}})],1)]],2)},a=[],o=(n("99af"),n("d3b7"),n("93d6")),i={data:function(){return{access_token:"",fineList:[],loading:!0,getOrderUrl:"https://1893791694056142.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/web-framework/express-app/getorder"}},created:function(){this.getHistory()},methods:{getHistory:function(){var t=this,e=new Headers;e.append("token",Object(o["c"])()),e.append("Content-Type","application/json");var n={method:"GET",headers:e},r=new Request("".concat(this.getOrderUrl,"?user_id=").concat(Object(o["d"])().user_id),n);fetch(r).then((function(t){return t.json()})).then((function(e){console.log(e);var n=JSON.parse(e.list);t.fineList=n,t.loading=!1})).catch((function(e){console.log("Request Failed",e),t.loading=!1}))}}},c=i,u=n("2877"),s=Object(u["a"])(c,r,a,!1,null,null,null);e["default"]=s.exports},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}}}]);
//# sourceMappingURL=chunk-e626944a.11402391.js.map