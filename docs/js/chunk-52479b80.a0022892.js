(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52479b80"],{"00b4":function(t,e,o){"use strict";o("ac1f");var n=o("23e7"),r=o("da84"),a=o("c65b"),i=o("e330"),s=o("1626"),c=o("861d"),u=function(){var t=!1,e=/[ac]/;return e.exec=function(){return t=!0,/./.exec.apply(this,arguments)},!0===e.test("abc")&&t}(),d=r.Error,l=i(/./.test);n({target:"RegExp",proto:!0,forced:!u},{test:function(t){var e=this.exec;if(!s(e))return l(this,t);var o=a(e,this,t);if(null!==o&&!c(o))throw new d("RegExp exec method returned something other than an Object or null");return!!o}})},"47fd":function(t,e,o){},"4df4":function(t,e,o){"use strict";var n=o("da84"),r=o("0366"),a=o("c65b"),i=o("7b0b"),s=o("9bdd"),c=o("e95a"),u=o("68ee"),d=o("07fa"),l=o("8418"),f=o("9a1f"),b=o("35a1"),h=n.Array;t.exports=function(t){var e=i(t),o=u(this),n=arguments.length,v=n>1?arguments[1]:void 0,p=void 0!==v;p&&(v=r(v,n>2?arguments[2]:void 0));var k,_,g,m,y,I,S=b(e),B=0;if(!S||this==h&&c(S))for(k=d(e),_=o?new this(k):h(k);k>B;B++)I=p?v(e[B],B):e[B],l(_,B,I);else for(m=f(e,S),y=m.next,_=o?new this:[];!(g=a(y,m)).done;B++)I=p?s(m,v,[g.value,B],!0):g.value,l(_,B,I);return _.length=B,_}},"5fb1":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("a-card",{attrs:{bordered:!1}},[o("a-col",{attrs:{span:16}},[o("a-row",[o("a-col",{attrs:{span:8}},[o("a-card",{staticStyle:{width:"500px",height:"250px"},attrs:{title:t.bookInfo.book_name,bordered:!1}},[o("p",[t._v("ISBN: "+t._s(t.bookInfo.ISBN))]),o("p",[t._v("Author: "+t._s(t.bookInfo.author))]),o("p",[t._v("Category: "+t._s(t.bookInfo.category))]),o("p",[t._v("Publisher: "+t._s(t.bookInfo.publisher))]),o("p",[t._v("Published Time: "+t._s(t.bookInfo.published_time))])])],1),o("a-col",{attrs:{offset:16}},[o("a-card",{staticStyle:{height:"300px",width:"300px"},attrs:{bordered:!1,size:"small"}},[o("a-radio-group",{attrs:{value:t.isReserved,"button-style":"solid"}},[o("a-radio-button",{attrs:{value:"a"},on:{click:function(e){return t.reserveBook()}}},[t._v("Reserved")]),o("a-radio-button",{attrs:{value:"b"},on:{click:function(e){return t.cancelReserveBook()}}},[t._v("Not Reserved")])],1),o("br"),o("br"),o("p",[o("b",[t._v("Available Number: "+t._s(t.avail_book_number))]),t._v("  "),t.avail_book_number/t.book_number>=.5?o("a-tag",{attrs:{color:"green"}},[t._v("Adequate")]):t._e(),t.avail_book_number/t.book_number<.5?o("a-tag",{attrs:{color:"red"}},[t._v("Nervous")]):t._e()],1),o("a-progress",{staticStyle:{color:"green"},attrs:{type:"circle",width:150,percent:parseInt(t.avail_book_number/t.book_number*100),size:"small",status:"active"}})],1)],1)],1),o("a-row",[o("a-col",{attrs:{span:8}},[o("a-card",{staticStyle:{width:"750px",height:"200px"},attrs:{bordered:!1}},[o("p",[t._v("Introduction: "+t._s(t.bookInfo.introduction))])])],1)],1)],1),o("a-col",{attrs:{span:8}},[o("img",{attrs:{src:t.bookInfo.cover,alt:"img",height:"400"}})])],1),o("a-card",[o("a-table",{attrs:{columns:t.columns,"data-source":t.locationData,rowKey:"book_id"},scopedSlots:t._u([{key:"status",fn:function(e){return[0==e?o("a-tag",{attrs:{color:"green"}},[t._v("Available")]):1==e?o("a-tag",{attrs:{color:"red"}},[t._v("Lent")]):t._e()]}},{key:"operation",fn:function(e,n){return[o("a-popconfirm",{attrs:{title:"Sure to Borrow?"},on:{confirm:function(){return t.borrowBook(n.book_id)}}},[0==n.status?o("a",{attrs:{href:"javascript:;"}},[t._v("BORROW")]):1==n.status?o("a",{attrs:{href:"javascript:;",disabled:"true"}},[t._v("BORROW")]):t._e()])]}}])})],1)],1)},r=[],a=o("b85c"),i=(o("e9c4"),o("d3b7"),o("93d6")),s=(o("7424"),[{title:"Book ID",dataIndex:"book_id",key:"book_id"},{title:"Room Number",dataIndex:"room_number",key:"room_number"},{title:"Bookshelf",dataIndex:"book_shelf",key:"book_shelf"},{title:"Side",dataIndex:"side",key:"side"},{title:"Layer",dataIndex:"layer",key:"layer"},{title:"Status",dataIndex:"status",key:"status",scopedSlots:{customRender:"status"}},{title:"Operation",key:"operation",scopedSlots:{customRender:"operation"}}]),c={name:"Detail",data:function(){return{isReserved:"b",reservation_id:"",book_number:"",avail_book_number:"",locationData:[],columns:s,bookInfo:{ISBN:"",cover:"",book_name:"",introduction:"",publisher:"",published_time:"",author:"",category:""}}},methods:{clickpop:function(){this.visible=!0},cancleBtn:function(){this.visible=!1},changeContent:function(){this.$router.push("/book/search").catch((function(t){console.log("输出报错",t)}))},getBookISBN:function(){return this.$route.params.id},reserveBook:function(){this.isReserved="a";var t={ISBN:this.getBookISBN()},e="http://175.24.201.104:8085",o=new Headers({"Content-Type":"application/json"});o.append("token",Object(i["b"])());var n={method:"POST",headers:o,body:JSON.stringify(t)};fetch("".concat(e,"/api/user/reservation/add"),n).then((function(t){return t.json()})).then((function(t){console.log(t)})),this.$message.success("Book Reserve Successfully!"),this.visible=!1},cancelReserveBook:function(){this.isReserved="b";var t="http://175.24.201.104:8085",e=new Headers({"Content-Type":"application/json"});e.append("token",Object(i["b"])());var o={method:"POST",headers:e,body:JSON.stringify({reservation_id:this.reservation_id})};fetch("".concat(t,"/api/user/reservation/cancel"),o).then((function(t){return t.json()})).then((function(t){console.log(t)})),this.$message.warning("Cancel Reservation Successfully!")},borrowBook:function(t){var e="http://175.24.201.104:8085",o=new Headers({"Content-Type":"application/json"});o.append("token",Object(i["b"])());var n={method:"POST",headers:o,body:JSON.stringify({ISBN:this.getBookISBN(),book_id:t})};fetch("".concat(e,"/api/user/borrow"),n).then((function(t){return t.json()})).then((function(t){console.log(t)}));var r,s=Object(a["a"])(this.locationData);try{for(s.s();!(r=s.n()).done;){var c=r.value;c.book_id==t&&(c.status=1)}}catch(u){s.e(u)}finally{s.f()}this.$message.success("Book Borrow Successfully!"),this.visible=!1},getBookInfo:function(){var t=this,e="http://175.24.201.104:8085";this.loading=!0;var o=new Headers;o.append("token",Object(i["b"])());var n={method:"GET",headers:o};fetch("".concat(e,"/api/book/detail?ISBN=").concat(this.getBookISBN()),n).then((function(t){return t.json()})).then((function(e){console.log(e),0==e.code&&(t.bookInfo.ISBN=e.data.ISBN,t.bookInfo.cover=e.data.cover,t.bookInfo.book_name=e.data.book_name,t.bookInfo.introduction=e.data.introduction,t.bookInfo.publisher=e.data.publisher,t.bookInfo.published_time=e.data.published_time,t.bookInfo.author=e.data.author,t.bookInfo.category=e.data.category)})).catch((function(t){return console.log("error",t)}))},getBookLocations:function(){var t=this,e="http://175.24.201.104:8085";this.loading=!0;var o=new Headers;o.append("token",Object(i["b"])());var n={method:"GET",headers:o},r=this;fetch("".concat(e,"/api/book/locations?ISBN=").concat(this.getBookISBN()),n).then((function(t){return t.json()})).then((function(e){if(console.log(e),0==e.code){t.book_number=e.data.length;var o,n=0,i=Object(a["a"])(e.data);try{for(i.s();!(o=i.n()).done;){var s=o.value;0==s.status&&n++}}catch(c){i.e(c)}finally{i.f()}t.avail_book_number=n,setTimeout((function(){var t,o=Object(a["a"])(e.data);try{for(o.s();!(t=o.n()).done;){var n=t.value;r.locationData.push({book_id:n.book_id,status:n.status,room_number:n.room_number,book_shelf:n.book_shelf,side:n.side,layer:n.layer})}}catch(c){o.e(c)}finally{o.f()}r.loading=!1}),200)}})).catch((function(t){return console.log("error",t)}))},getReservation:function(){var t=this,e="http://175.24.201.104:8085",o=new Headers({"Content-Type":"application/json"});o.append("token",Object(i["b"])());var n={method:"GET",headers:o};fetch("".concat(e,"/api/reservation/"),n).then((function(t){return t.json()})).then((function(e){console.log(e);var o,n=Object(a["a"])(e.data);try{for(n.s();!(o=n.n()).done;){var r=o.value;r.ISBN==t.getBookISBN()&&(0==r.status?(t.isReserved="a",t.reservation_id=r.reservation_id):(t.isReserved="b",t.reservation_id=r.reservation_id))}}catch(i){n.e(i)}finally{n.f()}}))}},created:function(){this.id=this.getBookISBN(),this.getBookInfo(),this.getBookLocations(),this.getReservation()}},u=c,d=(o("8ee4"),o("2877")),l=Object(d["a"])(u,n,r,!1,null,null,null);e["default"]=l.exports},"8ee4":function(t,e,o){"use strict";o("47fd")},"9bdd":function(t,e,o){var n=o("825a"),r=o("2a62");t.exports=function(t,e,o,a){try{return a?e(n(o)[0],o[1]):e(o)}catch(i){r(t,"throw",i)}}},a630:function(t,e,o){var n=o("23e7"),r=o("4df4"),a=o("1c7e"),i=!a((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:i},{from:r})},b0c0:function(t,e,o){var n=o("83ab"),r=o("5e77").EXISTS,a=o("e330"),i=o("9bf2").f,s=Function.prototype,c=a(s.toString),u=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,d=a(u.exec),l="name";n&&!r&&i(s,l,{configurable:!0,get:function(){try{return d(u,c(this))[1]}catch(t){return""}}})},b85c:function(t,e,o){"use strict";o.d(e,"a",(function(){return a}));o("a4d3"),o("e01a"),o("d3b7"),o("d28b"),o("3ca3"),o("ddb0"),o("fb6a"),o("b0c0"),o("a630"),o("ac1f"),o("00b4");function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,n=new Array(e);o<e;o++)n[o]=t[o];return n}function r(t,e){if(t){if("string"===typeof t)return n(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?n(t,e):void 0}}function a(t,e){var o="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=r(t))||e&&t&&"number"===typeof t.length){o&&(t=o);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,c=!1;return{s:function(){o=o.call(t)},n:function(){var t=o.next();return s=t.done,t},e:function(t){c=!0,i=t},f:function(){try{s||null==o["return"]||o["return"]()}finally{if(c)throw i}}}}},fb6a:function(t,e,o){"use strict";var n=o("23e7"),r=o("da84"),a=o("e8b5"),i=o("68ee"),s=o("861d"),c=o("23cb"),u=o("07fa"),d=o("fc6a"),l=o("8418"),f=o("b622"),b=o("1dde"),h=o("f36a"),v=b("slice"),p=f("species"),k=r.Array,_=Math.max;n({target:"Array",proto:!0,forced:!v},{slice:function(t,e){var o,n,r,f=d(this),b=u(f),v=c(t,b),g=c(void 0===e?b:e,b);if(a(f)&&(o=f.constructor,i(o)&&(o===k||a(o.prototype))?o=void 0:s(o)&&(o=o[p],null===o&&(o=void 0)),o===k||void 0===o))return h(f,v,g);for(n=new(void 0===o?k:o)(_(g-v,0)),r=0;v<g;v++,r++)v in f&&l(n,r,f[v]);return n.length=r,n}})}}]);
//# sourceMappingURL=chunk-52479b80.a0022892.js.map