/*! For license information please see 0.998b37.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(t,e,r){"use strict";var n=r(98),i=r(318),o=r(1),a=r(1343),s=r(1305),c=r(111),u=r(1304),l=r(26),f=r(319),h=r(112),d=r(0),p=r(97),v=r(160),y=r(1306),m=r(1342),g=r(1303),b=r(35),x=r(317),w=r(47),_={props:{name:{type:String,default:"search_field"},value:{type:String,default:""},placeholder:{type:String,default:"Buscar..."},mini_disabled:{type:Boolean,default:!1}},created:function(){this.mini_disabled?this.mini=!1:this.mini=this.$vuetify.breakpoint.xsOnly},mounted:function(){this.final&&(this.search=this.final)},data:function(){return{isLoading:!1,mini:!1,search:"",timer:null,ready:!1}},methods:{realizarBusqueda:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;this.isLoading=!0,this.timer&&(clearTimeout(this.timer),this.timer=null),this.timer=setTimeout((function(){t.final=t.search,t.isLoading=!1}),e)},abrir:function(){this.mini_disabled?this.mini=!1:this.mini=!this.mini}},computed:{final:{get:function(){return this.value},set:function(t){null==t?this.$emit("input",""):this.$emit("input",t)}}},watch:{search:function(){this.ready?this.realizarBusqueda():this.ready=!0}}},L=(r(460),r(4)),O=Object(L.a)(_,(function(){var t=this,e=t._self._c;return e("div",[e(b.d,{attrs:{"leave-absolute":""}},[t.mini?e(n.a,{staticClass:"ml-1 d-flex d-inline-flex",attrs:{icon:"",height:"40"},on:{click:t.abrir}},[e(c.a,[t._v("mdi-magnify")])],1):e(w.a,{staticClass:"pb-0 mb-0",attrs:{"prepend-inner-icon":"mdi-magnify",filled:"",rounded:"","hide-details":"",name:t.name,dense:"",clearable:"",placeholder:t.placeholder},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.realizarBusqueda(0)},"click:prepend-inner":t.abrir},scopedSlots:t._u([{key:"append",fn:function(){return[e(b.c,{attrs:{"hide-on-leave":""}},[t.isLoading?e(x.a,{attrs:{size:"19",width:"2",color:"info",indeterminate:""}}):t._e()],1)]},proxy:!0}]),model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)}),[],!1,null,"26940f4c",null).exports,S=r(16);function k(t){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(){j=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},i=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var i=e&&e.prototype instanceof f?e:f,o=Object.create(i.prototype),a=new L(n||[]);return o._invoke=function(t,e,r){var n="suspendedStart";return function(i,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===i)throw o;return S()}for(r.method=i,r.arg=o;;){var a=r.delegate;if(a){var s=x(a,r);if(s){if(s===l)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=u(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,a),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var l={};function f(){}function h(){}function d(){}var p={};s(p,i,(function(){return this}));var v=Object.getPrototypeOf,y=v&&v(v(O([])));y&&y!==e&&r.call(y,i)&&(p=y);var m=d.prototype=f.prototype=Object.create(p);function g(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){var n;this._invoke=function(i,o){function a(){return new e((function(n,a){!function n(i,o,a,s){var c=u(t[i],t,o);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==k(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,s)}),(function(t){n("throw",t,a,s)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,s)}))}s(c.arg)}(i,o,n,a)}))}return n=n?n.then(a,a):a()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var i=n.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function O(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return h.prototype=d,s(m,"constructor",d),s(d,"constructor",h),h.displayName=s(d,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,s(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(b.prototype),s(b.prototype,o,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var a=new b(c(e,r,n,i),o);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),s(m,a,"Generator"),s(m,i,(function(){return this})),s(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],a=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var s=r.call(o,"catchLoc"),c=r.call(o,"finallyLoc");if(s&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;_(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function E(t,e,r,n,i,o,a){try{var s=t[o](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,i)}function D(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function I(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?D(Object(r),!0).forEach((function(e){B(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function B(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var P={components:{VSearchField:O},props:{tableID:{type:String,default:"lerniz"},itemID:{type:String,required:!0},apiURL:{type:String,required:!0},extraQuery:{type:String,default:""},"show-select":{type:Boolean,default:!1},"show-expand":{type:Boolean,default:!1},"auto-select":{type:Boolean,default:!1},pagination:{type:[Number,String],default:10},top:{type:[Number,String],default:250},toolbar:{type:Boolean,default:!0},truncate:{type:Boolean,default:!1},"toggle-columns":{type:Boolean,default:!1},"show-menu":{type:Boolean,default:!1},prefix:{type:String,default:"t"},sm:{type:Number,default:6},md:{type:Number,default:6},lg:{type:Number,default:4}},mounted:function(){this.$emit("update:search",this.search),this.iniciar()},data:function(){return{isLoading:!1,isReloading:!1,seleccion:[],seccion:!1,menu:{origin:0,show:!1,x:0,y:0,item:{}},ajustes:{updates:0},shift:-1}},methods:I(I({},Object(S.b)({obtenerDatos:"listar/obtenerDatos"})),{},{iniciar:function(){var t,e=this;return(t=j().mark((function t(){return j().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.isLoading=!0,e.isReloading=!0,0!=e.data.length){t.next=8;break}return t.next=5,e.obtenerDatos({ruta:e.ruta,busqueda:e.search});case 5:e.isReloading=!1,t.next=9;break;case 8:e.obtenerDatos({ruta:e.ruta,busqueda:e.search}).then((function(t){e.isReloading=!1})).catch((function(t){console.log(t)}));case 9:e.isLoading=!1;case 10:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,i){var o=t.apply(e,r);function a(t){E(o,n,i,a,s,"next",t)}function s(t){E(o,n,i,a,s,"throw",t)}a(void 0)}))})()},actualizarRuta:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=this.$route.query;r?delete n[t]:n[t]=e.toString(),this.$router.replace({query:I(I({},n),{},{t:this.ajustes.updates++})}).catch((function(){}))},isSelected:function(t){return this.seleccion.findIndex((function(e){return e==t}))>=0},toggle:function(t,e,r){var n=this,i=r[this.itemID];if(t.shiftKey){if(this.shift>=0&&this.shift!=e){var o=this.shift,a=e;if(o>a){var s=o;o=a,a=s}for(var c=function(t){var e=n.seleccion.findIndex((function(e){return e==n.data[t][n.itemID]}));t>=o&&t<=a?e<0&&n.seleccion.push(n.data[t][n.itemID]):e>=0&&n.seleccion.splice(e,1)},u=0;u<this.data.length;u++)c(u);this.shift=-1}}else if(t.ctrlKey){for(var l=function(t){var e=n.seleccion.findIndex((function(e){return e==n.data[t][n.itemID]}));e>=0&&n.seleccion.splice(e,1)},f=0;f<this.data.length;f++)l(f);this.shift=-1}else{var h=this.seleccion.findIndex((function(t){return t==i}));h>=0?this.seleccion.splice(h,1):(this.seleccion.push(i),this.shift=e)}}}),computed:I(I({},Object(S.c)({listado:"listar/listar"})),{},{data:function(){return this.listado({ruta:this.ruta,tipo:"data"})||[]},paginas:function(){return this.listado({ruta:this.ruta,tipo:"paginas"})||0},ruta:function(){return this.apiURL+"?page="+this.page+"&sortBy="+(""==this.sortBy?"created_at":this.sortBy)+"&sortDesc="+(this.sortDesc?"desc":"asc")+"&limit="+this.limit+"&search="+this.search+this.extraQuery},page:{get:function(){return parseInt(this.$route.query[this.prefix+"p"])||1},set:function(t){this.shift=-1,this.actualizarRuta(this.prefix+"p",t,!1)}},sortBy:{get:function(){return this.$route.query[this.prefix+"sb"]||""},set:function(t){this.actualizarRuta(this.prefix+"sb",t,""==t||null==t)}},sortDesc:{get:function(){return"true"==this.$route.query[this.prefix+"sd"]},set:function(t){this.actualizarRuta(this.prefix+"sd",!!t)}},limit:{get:function(){return parseInt(this.$route.query[this.prefix+"l"])||this.pagination},set:function(t){this.actualizarRuta(this.prefix+"l",t,""==t)}},search:{get:function(){return this.$route.query[this.prefix+"search"]||""},set:function(t){this.page=1,this.actualizarRuta(this.prefix+"search",t,""==t)}}}),watch:{search:function(){this.iniciar()},page:function(){this.iniciar(),this.$vuetify.goTo(0)},limit:function(){this.iniciar(),this.$vuetify.goTo(0)},sortBy:function(){this.iniciar()},sortDesc:function(){this.iniciar()},seleccion:function(){this.$emit("update:seleccion",this.seleccion)},extraQuery:function(){this.page=1,this.iniciar()}}},$=(r(462),r(464),Object(L.a)(P,(function(){var t=this,e=t._self._c;return e("div",[t.toolbar?e("div",{staticClass:"mb-2"},[e("div",[e(m.a,{attrs:{dense:""}},[e(a.a,{staticClass:"pr-0",class:t.$vuetify.breakpoint.xsOnly?"d-flex justify-center":"d-flex justify-left align-center",attrs:{cols:"12",sm:"3",md:"3"}},[e("div",{staticClass:"title font-weight-bold superior--text"},[t._t("toolbar.name",(function(){return[t._v("\n                            Toolbar\n                        ")]}),{seleccion:t.seleccion,reload:t.iniciar,isReloading:t.isReloading})],2)]),t._v(" "),e(a.a,{staticClass:"px-0",attrs:{cols:"12",sm:"6",md:"6"}},[t._t("toolbar.center",null,{seleccion:t.seleccion})],2),t._v(" "),e(a.a,{staticClass:"px-0",attrs:{cols:"12",sm:"3",md:"3"}},[e("div",[e("v-search-field",{attrs:{name:t.tableID,mini_disabled:!0},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)])],1)],1)]):t._e(),t._v(" "),e("div",[t.isLoading?e(i.a,{staticClass:"rounded-lg",attrs:{elevation:"0"}},[e(g.a,{attrs:{type:"list-item-avatar-two-line"}})],1):this.data.length>0?e(l.b,{attrs:{multiple:""}},[e(m.a,{attrs:{dense:""}},t._l(t.data,(function(r,n){return e(a.a,{key:"dt"+n,attrs:{cols:"12",sm:t.sm,md:t.md,lg:t.lg}},[e(u.a,{attrs:{value:r[t.itemID]}},[e(s.a,{scopedSlots:t._u([{key:"default",fn:function(o){var a=o.hover;return[e(i.a,{staticClass:"rounded-lg pa-0",attrs:{outlined:"",elevation:t.isSelected(r[t.itemID])||a?3:0,height:"100%"}},[t._t("item",null,{item:r,isSelected:t.isSelected,toggle:t.toggle,index:n})],2)]}}],null,!0)})],1)],1)})),1)],1):e(i.a,{staticClass:"rounded-lg",attrs:{elevation:"0"}},[e(o.c,[e(f.a,[e(h.a,[e(p.a,[e(c.a,[t._v("mdi-archive-off-outline")])],1),t._v(" "),e(d.b,[e(d.d,[t._v("Sin datos")]),t._v(" "),e(d.c,[t._v("\n                                No se han encontrado registros\n                            ")])],1)],1)],1)],1)],1)],1),t._v(" "),t.isLoading?t._e():e(m.a,{attrs:{dense:""}},[e(a.a,{attrs:{cols:"12",sm:"6"}},[e(v.a,{attrs:{"offset-y":"","offset-x":""},scopedSlots:t._u([{key:"activator",fn:function(r){var i=r.on,o=r.attrs;return[e(n.a,t._g(t._b({staticClass:"ma-1",attrs:{elevation:"0"}},"v-btn",o,!1),i),[t._v("\n                        Mostrando: "+t._s(t.limit)+" registros\n                    ")])]}}],null,!1,4190919167)},[t._v(" "),e(f.a,t._l([60,80,100],(function(r,n){return e(h.a,{key:n,on:{click:function(e){t.limit=r}}},[e(d.d,[t._v(t._s(r))])],1)})),1)],1)],1),t._v(" "),e(a.a,{attrs:{cols:"12",sm:"6"}},[e(y.a,{attrs:{length:t.paginas,"prev-icon":"mdi-menu-left","next-icon":"mdi-menu-right"},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1)],1)}),[],!1,null,"1ed3ee1a",null));e.a=$.exports},331:function(t,e,r){var n=r(461);"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(10)(n,i);n.locals&&(t.exports=n.locals)},332:function(t,e,r){var n=r(463);"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(10)(n,i);n.locals&&(t.exports=n.locals)},333:function(t,e,r){var n=r(465);"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};r(10)(n,i);n.locals&&(t.exports=n.locals)},460:function(t,e,r){"use strict";r(331)},461:function(t,e,r){(e=r(9)(!1)).push([t.i,"v-input__slot[data-v-26940f4c]{padding-left:5px}",""]),t.exports=e},462:function(t,e,r){"use strict";r(332)},463:function(t,e,r){(e=r(9)(!1)).push([t.i,".row-pointer[data-v-1ed3ee1a] tbody tr :hover{cursor:pointer}",""]),t.exports=e},464:function(t,e,r){"use strict";r(333)},465:function(t,e,r){(e=r(9)(!1)).push([t.i,".v-data-table.row-height-50 td{height:40px!important}#servertable td{max-width:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sombra-bottom{box-shadow:inset -14px -34px 26px -24px rgba(0,0,0,.54)}",""]),t.exports=e}}]);