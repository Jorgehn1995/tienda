/*! For license information please see 26.c48b46.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{1311:function(t,e,r){"use strict";r.r(e);var n=r(97),a=r(318),o=r(1),s=r(154),i=r(1342),c=r(152),l=r(157),u=r(110),d=r(319),v=r(111),h=r(0),f=r(317),p=r(1341),m=r(1295),_=r(1339),y=r(124),g=r(125),b=r(126),x=r(52),w=r(27),C=r(3),k=r.n(C),O={props:{chartId:{type:String,defautl:"chart-1"},group:{type:String,defautl:"chart-group"},labels:{type:Array,default:function(){return[]}},series:{type:Array,default:function(){return[]}},legend:{type:Boolean,default:!0},names:{type:Boolean,default:!1},dark:{type:Boolean,default:!1},palette:{type:String,default:"palette4"}},computed:{options:function(){this.$vuetify.theme.isDark?this.$vuetify.theme.themes.dark.primary:this.$vuetify.theme.themes.light.primary;var t={chart:{background:"transparent",width:380,type:"pie",id:this.id,group:this.group},labels:this.labels,colors:[this.$vuetify.theme.currentTheme.primary,this.$vuetify.theme.currentTheme.secondary,this.$vuetify.theme.currentTheme.accent,this.$vuetify.theme.currentTheme.surface,this.$vuetify.theme.currentTheme.background],theme:{mode:this.dark?"dark":"light",palette:this.palette,monochrome:{enabled:!1,color:"#2f64f7",shadeTo:"light",shadeIntensity:.65}},dataLabels:{},legend:{show:this.legend,position:"bottom"},yaxis:{labels:{minWidth:40}},responsive:[{breakpoint:480,options:{chart:{width:300},legend:{position:"bottom"}}}]};return t}}},j=r(4),L=Object(j.a)(O,(function(){var t=this._self._c;return t("div",[t("apexchart",{attrs:{type:"pie",options:this.options,series:this.series}})],1)}),[],!1,null,null,null).exports;function T(t){return(T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function S(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function E(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?S(Object(r),!0).forEach((function(e){$(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function $(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function D(){D=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",s=n.toStringTag||"@@toStringTag";function i(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{i({},"")}catch(t){i=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var a=e&&e.prototype instanceof d?e:d,o=Object.create(a.prototype),s=new C(n||[]);return o._invoke=function(t,e,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return O()}for(r.method=a,r.arg=o;;){var s=r.delegate;if(s){var i=b(s,r);if(i){if(i===u)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=l(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===u)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,s),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var u={};function d(){}function v(){}function h(){}var f={};i(f,a,(function(){return this}));var p=Object.getPrototypeOf,m=p&&p(p(k([])));m&&m!==e&&r.call(m,a)&&(f=m);var _=h.prototype=d.prototype=Object.create(f);function y(t){["next","throw","return"].forEach((function(e){i(t,e,(function(t){return this._invoke(e,t)}))}))}function g(t,e){var n;this._invoke=function(a,o){function s(){return new e((function(n,s){!function n(a,o,s,i){var c=l(t[a],t,o);if("throw"!==c.type){var u=c.arg,d=u.value;return d&&"object"==T(d)&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,s,i)}),(function(t){n("throw",t,s,i)})):e.resolve(d).then((function(t){u.value=t,s(u)}),(function(t){return n("throw",t,s,i)}))}i(c.arg)}(a,o,n,s)}))}return n=n?n.then(s,s):s()}}function b(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return u;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var n=l(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,u;var a=n.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,u):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,u)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function w(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function k(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:O}}function O(){return{value:void 0,done:!0}}return v.prototype=h,i(_,"constructor",h),i(h,"constructor",v),v.displayName=i(h,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,i(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},y(g.prototype),i(g.prototype,o,(function(){return this})),t.AsyncIterator=g,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var s=new g(c(e,r,n,a),o);return t.isGeneratorFunction(r)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},y(_),i(_,s,"Generator"),i(_,a,(function(){return this})),i(_,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=k,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return s.type="throw",s.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var i=r.call(o,"catchLoc"),c=r.call(o,"finallyLoc");if(i&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=t,s.arg=e,o?(this.method="next",this.next=o.finallyLoc,u):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),u},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),w(r),u}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;w(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),u}},t}function P(t,e,r,n,a,o,s){try{var i=t[o](s),c=i.value}catch(t){return void r(t)}i.done?e(c):Promise.resolve(c).then(n,a)}function z(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var o=t.apply(e,r);function s(t){P(o,n,a,s,i,"next",t)}function i(t){P(o,n,a,s,i,"throw",t)}s(void 0)}))}}var F={components:{MostrarPrecio:r(29).a,GraficaPie:L,FormTextField:w.a,VOptions:x.a,VentaAnular:b.a,VentaRecibo:g.a,VentaDetalles:y.a},mounted:function(){this.init()},data:function(){return{isLoading:!1,isClosing:!1,isOpen:!1,isOpenTransaction:!1,turno:{monto:0},ventas:[],transaccion:{detalles:[]},totales:{articulos:0,subtotal:0,descuento:0,total:0},cierre:0,grafica:{labels:[],series:[]},moment:k.a}},methods:{open:function(){this.cierre=parseFloat(this.totales.total)+parseFloat(this.turno.monto),this.isOpen=!0},showTransaction:function(t){this.isOpenTransaction=!0,this.transaccion=t},init:function(){var t=this;return z(D().mark((function e(){return D().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isLoading=!0,e.next=3,t.$axios.get("/turnos/"+t.idturno).then((function(e){t.grafica.labels=e.data.grafica.etiquetas,t.grafica.series=e.data.grafica.serie,t.totales=e.data.totales,t.turno=e.data.turno,t.ventas=t.turno.ventas,delete t.turno.ventas})).catch((function(t){console.log(t)}));case 3:t.isLoading=!1;case 4:case"end":return e.stop()}}),e)})))()},cerrar:function(){var t=this;return z(D().mark((function e(){return D().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isClosing=!0,e.next=3,t.$axios.delete("/turnos/"+t.idturno,{data:{turno:E({},t.turno),totales:E({},t.totales)}}).then((function(e){t.turno=e.data,t.isOpen=!1})).catch((function(t){console.log(t)}));case 3:t.isClosing=!1;case 4:case"end":return e.stop()}}),e)})))()}},computed:{idturno:function(){return this.$route.params.idturno}}},B=(r(466),Object(j.a)(F,(function(){var t=this,e=t._self._c;return e("div",[e("div",[t.isLoading?e("div",{staticClass:"d-flex justify-center align-center",staticStyle:{height:"200px"}},[e(f.a,{attrs:{indeterminate:""}})],1):e("div",{staticClass:"pa-2"},[e(p.a,{attrs:{dense:""}},[e(i.a,{attrs:{cols:"12",sm:"12",md:"4"}},[e(a.a,{staticClass:"rounded-lg mb-2",attrs:{elevation:"0",color:"surface",dark:""}},[e(o.d,[t._v(" Productos Vendidos ")]),t._v(" "),e(o.b,[t._v("\n                            Cantidad de unidades vendidas por cada producto\n                        ")]),t._v(" "),e(o.c,[0==t.ventas.length?e("div",{staticClass:"d-flex justify-center align-center flex-column",staticStyle:{height:"250px"}},[e(u.a,{attrs:{size:"80"}},[t._v("mdi-chart-box-outline")]),t._v(" "),e("h6",[t._v("No hay productos para mostrar")])],1):e("grafica-pie",{attrs:{dark:!0,labels:t.grafica.labels,series:t.grafica.series}})],1)],1),t._v(" "),e(a.a,{staticClass:"rounded-lg",attrs:{elevation:"0"}},[e(o.d,[t._v(" Turno ")]),t._v(" "),e(o.b,[t._v("\n                            Detalles del Turno\n                        ")]),t._v(" "),e(o.c,{staticClass:"px-0"},[e(d.a,{attrs:{dense:"",color:"transparent"}},[e(v.a,[e(h.b,[e(h.c,[t._v("\n                                            Estado\n                                        ")])],1),t._v(" "),e(h.b,[e(h.d,{staticClass:"text-right"},[t.turno.cierre?e(s.a,{staticClass:"v-chip--active",attrs:{color:"green--text"}},[e(u.a,{attrs:{left:""}},[t._v("\n                                                    mdi-check\n                                                ")]),t._v("\n                                                Turno Cerrado\n                                            ")],1):e(s.a,{staticClass:"v-chip--active",attrs:{color:"info--text"}},[e(u.a,{attrs:{left:""}},[t._v("\n                                                    mdi-progress-clock\n                                                ")]),t._v("\n                                                Turno Abierto\n                                            ")],1)],1)],1)],1),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                            Caja\n                                        ")])],1),t._v(" "),e(h.b,[e(h.d,{staticClass:"text-right"},[t.turno.caja?e("span",[t._v("\n                                                "+t._s(t.turno.caja.nombre)+"\n                                            ")]):e("span",[t._v("\n                                                N/R\n                                            ")])])],1)],1),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                            Usuario que Inicio:\n                                        ")])],1),t._v(" "),e(h.b,[e(h.d,{staticClass:"text-right"},[t._v("\n                                            "+t._s(t.turno.nombre)+"\n                                        ")])],1)],1),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                            Fecha de Apertura\n                                        ")])],1),t._v(" "),e(h.b,[e(h.d,{staticClass:"text-right"},[t._v("\n                                            "+t._s(t.moment(t.turno.apertura).format("DD/MM/Y hh:mm a"))+"\n                                        ")])],1)],1),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                            Fecha de Cierre\n                                        ")])],1),t._v(" "),e(h.b,[e(h.d,{staticClass:"text-right"},[t.turno.cierre?e("span",[t._v("\n                                                "+t._s(t.moment(t.turno.cierre).format("DD/MM/Y hh:mm a"))+"\n                                            ")]):e("span",{staticClass:"accent--text"},[t._v("\n                                                No ha cerrado turno\n                                            ")])])],1)],1)],1),t._v(" "),e("div",{staticClass:"px-2"},[t.turno.cierre?t._e():e(n.a,{attrs:{color:"accent",block:""},on:{click:function(e){return t.open()}}},[e(u.a,{attrs:{left:""}},[t._v("mdi-cash-lock")]),t._v("\n                                    Cerrar Turno\n                                ")],1)],1)],1)],1)],1),t._v(" "),e(i.a,{attrs:{cols:"12",sm:"12",md:"8"}},[e(p.a,{attrs:{dense:""}},[e(i.a,{attrs:{cols:"12"}},[e(p.a,{attrs:{dense:""}},[e(i.a,{attrs:{cols:"12",sm:"4"}},[e(a.a,{staticClass:"rounded-lg",attrs:{elevation:"0",width:"100%",height:"100%"}},[e(o.b,[e("strong",[t._v("Apertura de Caja")])]),t._v(" "),e(o.c,{staticClass:"text-right"},[e("mostrar-precio",{attrs:{size:30,value:t.turno.monto}})],1),t._v(" "),e(o.c,{staticClass:"pt-0"},[t._v("\n                                            Monto de inicio de turno\n                                        ")])],1)],1),t._v(" "),e(i.a,{attrs:{cols:"12",sm:"4"}},[e(a.a,{staticClass:"rounded-lg",attrs:{elevation:"0",width:"100%",height:"100%"}},[e(o.b,[e("strong",[t._v("Subtotal")])]),t._v(" "),e(o.c,[e("mostrar-precio",{attrs:{size:30,value:t.totales.subtotal||0}})],1),t._v(" "),e(o.c,{staticClass:"pt-0"},[t._v("\n                                            Subtotal de ventas realizadas\n                                        ")])],1)],1),t._v(" "),e(i.a,{attrs:{cols:"12",sm:"4"}},[e(a.a,{staticClass:"rounded-lg",attrs:{elevation:"0",width:"100%",height:"100%"}},[e(o.b,[e("strong",[t._v("Descuentos")])]),t._v(" "),e(o.c,[e("mostrar-precio",{attrs:{size:30,value:t.totales.descuento||0}})],1),t._v(" "),e(o.c,{staticClass:"pt-0"},[t._v("\n                                            Suma de descuentos\n                                        ")])],1)],1),t._v(" "),e(i.a,{attrs:{cols:"12",sm:"6"}},[e(a.a,{staticClass:"rounded-lg",attrs:{elevation:"0",width:"100%",height:"100%",color:"secondary",dark:""}},[e(o.b,[e("strong",[t._v("\n                                                Total de Ventas\n                                            ")])]),t._v(" "),e(o.c,{staticClass:"text-right"},[e("mostrar-precio",{attrs:{size:30,value:t.totales.total}})],1),t._v(" "),e(o.c,{staticClass:"pt-0"},[t._v("\n                                            Ventas - Descuentos\n                                        ")])],1)],1),t._v(" "),e(i.a,{attrs:{cols:"12",sm:"6"}},[e(a.a,{staticClass:"rounded-lg",attrs:{elevation:"0",width:"100%",color:"primary",dark:"",height:"100%"}},[e(o.b,[e("strong",[t._v(" Total en Caja ")])]),t._v(" "),e(o.c,[e("mostrar-precio",{attrs:{size:30,value:parseFloat(t.totales.total)+parseFloat(t.turno.monto)||0}})],1),t._v(" "),e(o.c,{staticClass:"pt-0"},[t._v("\n                                            Total + Apertura de Caja\n                                        ")])],1)],1)],1)],1),t._v(" "),e(i.a,{attrs:{cols:"12"}},[e(a.a,{staticClass:"rounded-lg",attrs:{outlined:""}},[e(o.d,[t._v("\n                                    Transacciones del Turno\n                                ")]),t._v(" "),e(o.b,[t._v("\n                                    Ventas realizadas durante el turno\n                                ")]),t._v(" "),e(o.c,[e(m.a,{scopedSlots:t._u([{key:"default",fn:function(){return[e("thead",[e("tr",[e("th",{staticClass:"text-left"},[t._v("\n                                                        #\n                                                    ")]),t._v(" "),e("th",[t._v("Descripción")]),t._v(" "),e("th",{staticClass:"text-left"},[t._v("\n                                                        Fecha/\n                                                        "),e("br"),t._v("\n                                                        Hora\n                                                    ")]),t._v(" "),e("th",{staticClass:"text-right"},[t._v("\n                                                        Subtotal\n                                                    ")]),t._v(" "),e("th",{staticClass:"text-right"},[t._v("\n                                                        Descuento\n                                                    ")]),t._v(" "),e("th",{staticClass:"text-right"},[t._v("\n                                                        Total\n                                                    ")]),t._v(" "),e("th",[t._v("Ops.")])])]),t._v(" "),e("tbody",[0==t.ventas.length?e("tr",[e("td",{staticClass:"text-center",attrs:{colspan:"8"}},[t._v("\n                                                        No hay ventas para\n                                                        mostrar\n                                                    ")])]):t._e(),t._v(" "),t._l(t.ventas,(function(r,n){return e("tr",{staticClass:"cursor-pointer",on:{click:function(e){return t.showTransaction(r)}}},[e("td",[t._v("\n                                                        "+t._s(n+1)+"\n                                                    ")]),t._v(" "),e("td",[e(d.a,{attrs:{dense:""}},[e(v.a,{staticClass:"px-0"},[e(h.b,[e(h.c,[e("span",{staticClass:"text-uppercase"},[t._v("\n                                                                            "+t._s(r.tipo)+"\n                                                                            "+t._s(r.documento)+"\n                                                                        ")])]),t._v(" "),e(h.d,[t._v("\n                                                                        "+t._s(r.cliente_nombre||"C/F")+"\n                                                                        -\n                                                                        "+t._s(r.articulos)+"\n                                                                        articulos\n                                                                    ")]),t._v(" "),e(h.c,[t._v("\n                                                                        Atendió\n                                                                        "+t._s(r.cajero_nombre)+"\n                                                                    ")]),t._v(" "),e(h.c,[r.anulado?e(s.a,{staticClass:"v-chip--active",attrs:{color:"error--text",small:""}},[e(u.a,{attrs:{small:""}},[t._v("\n                                                                                mdi-cancel\n                                                                            ")]),t._v("\n                                                                            Anulado\n                                                                        ")],1):t._e()],1)],1)],1)],1)],1),t._v(" "),e("td",[t._v("\n                                                        "+t._s(t.moment(r.created_at).format("DD [de] MMMM"))+"\n                                                        "),e("br"),t._v("\n                                                        "+t._s(t.moment(r.created_at).format("hh:mm a"))+"\n                                                    ")]),t._v(" "),e("td",[e("mostrar-precio",{class:r.anulado?"error--text":"",attrs:{size:12},model:{value:r.subtotal,callback:function(e){t.$set(r,"subtotal",e)},expression:"\n                                                                venta.subtotal\n                                                            "}})],1),t._v(" "),e("td",[e("mostrar-precio",{class:r.anulado?"error--text":"",attrs:{size:12},model:{value:r.descuento,callback:function(e){t.$set(r,"descuento",e)},expression:"\n                                                                venta.descuento\n                                                            "}})],1),t._v(" "),e("td",[e("mostrar-precio",{class:r.anulado?"error--text":"",attrs:{size:12},model:{value:r.total,callback:function(e){t.$set(r,"total",e)},expression:"\n                                                                venta.total\n                                                            "}})],1),t._v(" "),e("td",[e("venta-detalles",{attrs:{turno:!t.turno.cierre},model:{value:t.ventas[n],callback:function(e){t.$set(t.ventas,n,e)},expression:"\n                                                                ventas[i]\n                                                            "}})],1)])}))],2)]},proxy:!0}])})],1)],1)],1)],1)],1)],1)],1)]),t._v(" "),e(c.a,{attrs:{"max-width":"350"},model:{value:t.isOpen,callback:function(e){t.isOpen=e},expression:"isOpen"}},[e(a.a,{staticClass:"rounded-lg",attrs:{outlined:"",elevation:"0"}},[e(o.d,{staticClass:"text-center d-flex justify-center"},[e("span",[t._v("Cerrar Turno")])]),t._v(" "),e(o.b,{staticClass:"pt-1 text-center"},[t._v("\n                ¿Quieres cerrar el turno con las siguientes cantidades?\n            ")]),t._v(" "),e(o.c,[e(d.a,{attrs:{dense:"",color:"transparent"}},[e(v.a,[e(h.b,[e(h.c,[t._v("\n                                Articulos Vendidos\n                            ")])],1),t._v(" "),e(h.b,{staticClass:"text-right"},[e(h.d,[t._v("\n                                "+t._s(t.totales.articulos)+"\n                            ")])],1)],1),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                Subtotal\n                            ")])],1),t._v(" "),e(h.b,[e(h.d,[e("mostrar-precio",{attrs:{size:12,value:t.totales.subtotal}})],1)],1)],1),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                Descuento\n                            ")])],1),t._v(" "),e(h.b,[e(h.d,[e("mostrar-precio",{attrs:{size:12,value:t.totales.descuento}})],1)],1)],1),t._v(" "),e(l.a),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                Total en Ventas\n                            ")])],1),t._v(" "),e(h.b,[e(h.d,[e("mostrar-precio",{staticClass:"secondary--text text--darken-2",attrs:{size:12,value:t.totales.total}})],1)],1)],1),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                Inicio de Turno\n                            ")])],1),t._v(" "),e(h.b,[e(h.d,[e("mostrar-precio",{attrs:{size:12,value:t.turno.monto}})],1)],1)],1),t._v(" "),e(l.a),t._v(" "),e(v.a,[e(h.b,[e(h.c,[t._v("\n                                Total en Caja\n                            ")])],1),t._v(" "),e(h.b,[e(h.d,[e("mostrar-precio",{staticClass:"primary--text",attrs:{size:12,value:parseFloat(t.turno.monto)+parseFloat(t.totales.total)}})],1)],1)],1)],1)],1),t._v(" "),e(o.a,[e(n.a,{on:{click:function(e){t.isOpen=!1}}},[e(u.a,{attrs:{left:""}},[t._v(" mdi-chevron-left ")]),t._v("\n                    Cancelar\n                ")],1),t._v(" "),e(_.a),t._v(" "),e(n.a,{attrs:{color:"primary",loading:t.isClosing},on:{click:t.cerrar}},[e(u.a,{attrs:{left:""}},[t._v(" mdi-cash-lock ")]),t._v("\n                    Cerrar Caja\n                ")],1)],1)],1)],1)],1)}),[],!1,null,null,null));e.default=B.exports},334:function(t,e,r){var n=r(467);"string"==typeof n&&(n=[[t.i,n,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r(10)(n,a);n.locals&&(t.exports=n.locals)},445:function(t,e,r){var n=r(446);"string"==typeof n&&(n=[[t.i,n,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r(10)(n,a);n.locals&&(t.exports=n.locals)},446:function(t,e,r){(e=r(9)(!1)).push([t.i,".bottom-sheet-transition-enter,.bottom-sheet-transition-leave-to{transform:translateY(100%)}.v-bottom-sheet.v-dialog{align-self:flex-end;border-radius:0;flex:0 1 auto;margin:0;overflow:visible}.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:70%}@media only screen and (max-width:599px){.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:none}}",""]),t.exports=e},466:function(t,e,r){"use strict";r(334)},467:function(t,e,r){(e=r(9)(!1)).push([t.i,".top-sticky{position:sticky!important;top:64px;z-index:1}",""]),t.exports=e},52:function(t,e,r){"use strict";r(445);var n=r(152),a=n.a.extend({name:"v-bottom-sheet",props:{inset:Boolean,maxWidth:{type:[String,Number],default:"auto"},transition:{type:String,default:"bottom-sheet-transition"}},computed:{classes(){return{...n.a.options.computed.classes.call(this),"v-bottom-sheet":!0,"v-bottom-sheet--inset":this.inset}}}}),o=r(97),s=r(318),i=r(1),c=r(157),l=r(110),u=r(319),d=r(111),v=r(0),h=r(160),f=r(33),p=r(53),m={props:{title:{type:String,default:""},subtitle:{type:String,default:""},value:{type:Boolean,default:!1},icon:{type:String,default:"mdi-dots-vertical"},divider:{type:Boolean,default:!1},absolute:{type:Boolean,default:!0},offsetx:{type:Boolean,default:!0},offsety:{type:Boolean,default:!0},flex_center:{type:Boolean,default:!0}},data:function(){return{isLoading:!1,x:0,y:0,show:!1}},methods:{openMenu:function(t){var e=this;t.preventDefault(),this.show=!1,this.absolute?(this.x=t.clientX,this.y=t.clientY):setTimeout((function(){console.log(e.$refs.activator.getBoundingClientRect().right),e.x=e.offsetx?e.$refs.activator.getBoundingClientRect().right:e.$refs.activator.getBoundingClientRect().x,e.y=e.offsety?e.$refs.activator.getBoundingClientRect().bottom:e.$refs.activator.getBoundingClientRect().y}),20),setTimeout((function(){e.show=!0}),30)},quitar:function(){console.log("cerrado")},cerrar:function(){this.show=!1}}},_=r(4),y=Object(_.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"v-btn"},[e("div",{ref:"activator",class:t.flex_center?"d-flex justify-center align-center":"",staticStyle:{height:"100%"}},[t._t("activator",(function(){return[e(o.a,{attrs:{icon:""},on:{click:t.openMenu}},[e(l.a,[t._v(t._s(t.icon))])],1)]}),{open:t.openMenu,isOpen:t.show,close:t.cerrar})],2),t._v(" "),t.$vuetify.breakpoint.xsOnly?e("div",[e(a,{staticClass:"rounded-lg",attrs:{width:"100%","close-delay":2e3},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[e(f.a,{staticClass:"rounded-t-lg",on:{click:function(e){return t.cerrar()}}},[e(u.a,{staticClass:"rounded-t-lg",attrs:{dense:""}},[e("div",{directives:[{def:p.b,name:"touch",rawName:"v-touch",value:{down:function(){return t.cerrar()}},expression:"{\n              down: () => cerrar(),\n            }"}],on:{click:function(e){return t.cerrar()}}},[e(f.a,{staticClass:"d-flex justify-center py-1 align-center"},[e("div",{staticClass:"hide-on-touch grey lighten-2"})]),t._v(" "),e("div",[t._t("title",(function(){return[t.title||t.subtitle?e(d.a,[e(v.b,[e(v.d,[t._v(t._s(t.title))]),t._v(" "),e(v.c,[t._v(t._s(t.subtitle))])],1)],1):t._e()]}))],2)],1),t._v(" "),e(s.a,{staticClass:"mx-2 rounded-lg mb-1",attrs:{color:t.$vuetify.theme.isDark?"grey darken-4":"grey lighten-3",elevation:"0"}},[e(i.c,{staticClass:"px-1"},[e(u.a,{class:{"py-0":t.$vuetify.breakpoint.smAndDown},attrs:{dense:"",color:"transparent"},on:{click:function(e){return t.cerrar()}}},[t._t("options",null,{close:t.cerrar})],2)],1)],1)],1)],1)],1)],1):t._e(),t._v(" "),e(h.a,{staticClass:"rounded-lg",attrs:{"position-x":t.x,"position-y":t.y,absolute:t.absolute,"offset-y":t.offsety,"offset-x":t.offsetx,"max-width":"300"},on:{blur:t.quitar},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[e(u.a,{staticClass:"rounded-lg",attrs:{dense:""}},[t._t("title",(function(){return[t.title||t.subtitle?e(d.a,[e(v.b,[e(v.d,[t._v(t._s(t.title))]),t._v(" "),e(v.c,[t._v(t._s(t.subtitle))])],1)],1):t._e()]})),t._v(" "),t.title||t.subtitle||t.divider?e(c.a):t._e(),t._v(" "),e(u.a,{staticClass:"pt-0 rounded-lg",class:{"py-0":t.$vuetify.breakpoint.smAndDown},attrs:{dense:"",color:"transparent"}},[e(u.a,{attrs:{dense:""}},[t._t("options",null,{close:t.cerrar})],2)],1)],2)],1)],1)}),[],!1,null,null,null);e.a=y.exports}}]);