(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ac592"],{"18c8":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[[n("a-table",{attrs:{dataSource:e.reservationList,rowKey:function(e){return e.reservation_id},loading:e.loading}},[n("a-table-column",{attrs:{title:"book_name","data-index":"book_name"}}),n("a-table-column",{attrs:{title:"reservation_id","data-index":"reservation_id"}}),n("a-table-column",{attrs:{title:"ISBN","data-index":"ISBN"}}),n("a-table-column",{attrs:{title:"reservation_time","data-index":"reservation_time"}}),n("a-table-column",{attrs:{title:"status","data-index":"status"}}),n("a-table-column",{attrs:{title:"Action"},scopedSlots:e._u([{key:"default",fn:function(t,a){return[n("a-tooltip",{staticClass:"item",attrs:{effect:"dark",size:"small",content:"详情",placement:"top"}},[n("a-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(t){return e.routeToDetail(a.reservation_id)}}},[e._v(" 详情 ")])],1)]}}])})],1)]],2)},r=[],o=n("1da1"),i=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),{data:function(){return{access_token:"",reservationList:[],loading:!0}},created:function(){this.getReservation()},methods:{getReservation:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,a,r,o,i,s,c,u,l,d;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e,a=new Headers,a.append("access_token",e.access_token),r={method:"GET",headers:a},o=new Request("https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/reservation",r),t.next=7,fetch(o).then((function(e){return e.json()})).then((function(e){i=e.reservation})).catch((function(e){return console.log("Request Failed",e)}));case 7:s=regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return u={method:"GET"},l="https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/book/detail?ISBN="+i[t].ISBN,d=new Request(l,u),e.next=5,fetch(d).then((function(e){return e.json()})).then((function(e){i[t].book_name=e.book_info.book_name}));case 5:case"end":return e.stop()}}),e)})),c=0;case 9:if(!(c<i.length)){t.next=14;break}return t.delegateYield(s(c),"t0",11);case 11:c++,t.next=9;break;case 14:n.reservationList=i,e.loading=!1;case 16:case"end":return t.stop()}}),t)})))()},routeToDetail:function(e){this.$router.push({path:"/user/reservation/"+e,params:{id:e}})}}}),s=i,c=n("2877"),u=Object(c["a"])(s,a,r,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0ac592.3069862d.js.map