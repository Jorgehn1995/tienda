/*! For license information please see 38.c28c12.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{1335:function(t,e,r){"use strict";r.r(e);var n=r(99),o=r(320),i=r(1),a=r(1359),u=r(1357),c=r(1304),s=r(113),l=r(1358),f=r(1356),d=r(86),h=r(28);function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(){v=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new E(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return S()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=_(a,r);if(u){if(u===l)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=s(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var l={};function f(){}function d(){}function h(){}var m={};u(m,o,(function(){return this}));var y=Object.getPrototypeOf,g=y&&y(y(O([])));g&&g!==e&&r.call(g,o)&&(m=g);var w=h.prototype=f.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){var n;this._invoke=function(o,i){function a(){return new e((function(n,a){!function n(o,i,a,u){var c=s(t[o],t,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==p(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,u)}))}u(c.arg)}(o,i,n,a)}))}return n=n?n.then(a,a):a()}}function _(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function O(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:S}}function S(){return{value:void 0,done:!0}}return d.prototype=h,u(w,"constructor",h),u(h,"constructor",d),d.displayName=u(h,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,u(t,a,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(b.prototype),u(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(c(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),u(w,a,"Generator"),u(w,o,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function m(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}var y={components:{VNiceModal:r(31).a,FormTextField:h.a,FormTextSelect:d.a},mounted:function(){},data:function(){return{isLoading:!1,saved:!1,data:{idcliente:0,usuario:"",nombre:"",telefono:"",direccion:"",password:"",tipo:2},error:{status:!1,msg:""},rules:{requerido:function(t){return!!t||"Campo Requerido"},min40:function(t){return t&&t.length<=40||"La información no deben superar los 40 caracteres"},min200:function(t){return t&&t.length<=200||"La información no deben superar los 200 caracteres"}}}},methods:{confirmar:function(){this.$refs.form.validate()&&this.guardar()},guardar:function(){var t,e=this;return(t=v().mark((function t(){return v().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.next=3,e.$axios.post("/usuarios",e.data).then((function(t){console.log(t.data),e.saved=!0})).catch((function(t){var r=t.response.data.errors;for(var n in r)for(var o in r[n])e.error.msg="• "+r[n][o]+"<br>";e.error.status=!0}));case 3:e.isLoading=!1;case 4:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){m(i,n,o,a,u,"next",t)}function u(t){m(i,n,o,a,u,"throw",t)}a(void 0)}))})()},confirmado:function(){this.$router.go(-1)}}},g=r(4),w=Object(g.a)(y,(function(){var t=this,e=t._self._c;return e(u.a,[e("div",[e(l.a,[e(a.a,{attrs:{cols:"12",sm:"8",md:"6","offset-sm":"2","offset-md":"3"}},[e(c.a,{ref:"form"},[e(o.a,{staticClass:"rounded-lg",attrs:{outlined:"",elevation:"0"}},[e(i.d,[t._v(" Agregar Usuario ")]),t._v(" "),e(i.b,[t._v("\n                            Agrega un usuario a tu sistema de venta\n                        ")]),t._v(" "),e(i.c,{staticClass:"py-2"},[e("form-text-field",{attrs:{label:"Nombre",rules:[t.rules.requerido,t.rules.min200],outlined:"","prepend-icon":"mdi-account-circle-outline",placeholder:"Nombre"},model:{value:t.data.nombre,callback:function(e){t.$set(t.data,"nombre",e)},expression:"data.nombre"}}),t._v(" "),e("form-text-field",{attrs:{label:"Telefono",outlined:"","prepend-icon":"mdi-phone-outline",placeholder:"Telefono"},model:{value:t.data.telefono,callback:function(e){t.$set(t.data,"telefono",e)},expression:"data.telefono"}}),t._v(" "),e("form-text-select",{attrs:{label:"Tipo *",items:[{value:1,text:"Administrador"},{value:2,text:"Vendedor"}],"item-text":"text","item-value":"value",rules:[t.rules.requerido],outlined:"","prepend-icon":"mdi-store",placeholder:"Usuario"},model:{value:t.data.tipo,callback:function(e){t.$set(t.data,"tipo",e)},expression:"data.tipo"}}),t._v(" "),e("form-text-field",{attrs:{label:"Usuario",rules:[t.rules.requerido,t.rules.min40],outlined:"","prepend-icon":"mdi-account-circle-outline",placeholder:"Usuario"},model:{value:t.data.usuario,callback:function(e){t.$set(t.data,"usuario",e)},expression:"data.usuario"}}),t._v(" "),e("form-text-field",{attrs:{label:"Contraseña *",rules:[t.rules.requerido,t.rules.min40],outlined:"","prepend-icon":"mdi-key",placeholder:"Contraseña"},model:{value:t.data.password,callback:function(e){t.$set(t.data,"password",e)},expression:"data.password"}})],1),t._v(" "),e(i.a,[e(n.a,{on:{click:function(e){return t.$router.go(-1)}}},[e(s.a,{attrs:{left:""}},[t._v("mdi-chevron-left")]),t._v("\n                                Regresar\n                            ")],1),t._v(" "),e(f.a),t._v(" "),e(n.a,{staticClass:"px-2",attrs:{color:"primary",loading:t.isLoading},on:{click:function(e){return t.confirmar()}}},[e(s.a,{attrs:{left:""}},[t._v("mdi-content-save-outline")]),t._v("\n                                Guardar\n                            ")],1)],1)],1)],1)],1)],1),t._v(" "),e("v-nice-modal",{on:{go:function(e){return t.confirmado()}},scopedSlots:t._u([{key:"titulo",fn:function(){return[t._v(" Registro Guardado ")]},proxy:!0},{key:"descripcion",fn:function(){return[t._v("\n                El registro ha sido guardado\n            ")]},proxy:!0},{key:"btn",fn:function(){return[e(s.a,{attrs:{left:""}},[t._v("mdi-check")]),t._v("\n                Ok, entendido\n            ")]},proxy:!0}]),model:{value:t.saved,callback:function(e){t.saved=e},expression:"saved"}}),t._v(" "),e("v-nice-modal",{attrs:{color:"error",icon:"mdi-alert-outline"},on:{go:function(e){t.error.status=!1}},scopedSlots:t._u([{key:"titulo",fn:function(){return[t._v(" Error ")]},proxy:!0},{key:"descripcion",fn:function(){return[e("div",{domProps:{innerHTML:t._s(t.error.msg)}})]},proxy:!0},{key:"btn",fn:function(){return[t._v(" Ok, entendido ")]},proxy:!0}]),model:{value:t.error.status,callback:function(e){t.$set(t.error,"status",e)},expression:"error.status"}})],1)])}),[],!1,null,null,null);e.default=w.exports}}]);