(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{131:function(t,e,i){"use strict";var n={props:{nombre:{type:[Number,String],default:"Precio Unitario"},precio:{type:[Number,String],default:0},cantidad:{type:[Number,String],default:0},ocultar_cantidad:{type:Boolean,default:!1}},methods:{numero:function(t){return(t+"").split(".")[0]},decimales:function(t){return(t+"").split(".")[1]}}},a=i(4),s=Object(a.a)(n,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"d-flex flex-column justify-center align-center"},[1!=t.cantidad||t.nombre?e("span",{staticClass:"subtitle-1"},[e("strong",[t._v(t._s(t.nombre||"N/E"))])]):e("span",{staticClass:"subtitle-1"},[e("strong",[t._v("Precio Unitario")])]),t._v(" "),e("div",{staticClass:"d-flex d-flex-row justify-start",staticStyle:{"font-family":"'Roboto' !important"},attrs:{style:"font-family: 'Roboto' !important"}},[e("div",{staticClass:"text-h4"},[e("small",[t._v("Q")]),t._v(" "+t._s(t.numero(t.precio)))]),t._v(" "),e("span",{staticClass:"text-h5"},[t._v("."+t._s(t.decimales(t.precio)))])]),t._v(" "),t.ocultar_cantidad?t._e():e("span",{staticClass:"subtitle-1"},[1==t.cantidad?e("strong",[t._v(t._s(t.cantidad)+" Unidad")]):e("strong",[t._v(t._s(t.cantidad)+" Unidades")])])])])}),[],!1,null,null,null);e.a=s.exports},155:function(t,e,i){"use strict";i(434);var n=i(1303),a=i(77),s=i(66),o=i(117),r=i(100),l=i(119),c=i(118),d=i(20),u=i(54),h=i(7),f=i(13),v=i(2);const p=Object(h.a)(a.a,s.a,o.a,r.a,l.a,c.a,d.a);e.a=p.extend({name:"v-dialog",directives:{ClickOutside:u.b},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes(){return{[("v-dialog "+this.contentClass).trim()]:!0,"v-dialog--active":this.isActive,"v-dialog--persistent":this.persistent,"v-dialog--fullscreen":this.fullscreen,"v-dialog--scrollable":this.scrollable,"v-dialog--animated":this.animate}},contentClasses(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(e=this.previousActiveElement)||e.focus())},fullscreen(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created(){this.$attrs.hasOwnProperty("full-width")&&Object(f.e)("full-width",this)},beforeMount(){this.$nextTick(()=>{this.isBooted=this.isActive,this.isActive&&this.show()})},beforeDestroy(){"undefined"!=typeof window&&this.unbind()},methods:{animateClick(){this.animate=!1,this.$nextTick(()=>{this.animate=!0,window.clearTimeout(this.animateTimeout),this.animateTimeout=window.setTimeout(()=>this.animate=!1,150)})},closeConditional(t){const e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):r.a.options.methods.hideScroll.call(this)},show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick(()=>{this.$nextTick(()=>{this.previousActiveElement=document.activeElement,this.$refs.content.focus(),this.bind()})})},bind(){window.addEventListener("focusin",this.onFocusin)},unbind(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown(t){if(t.keyCode===v.s.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;const t=this.getActivator();this.$nextTick(()=>t&&t.focus())}this.$emit("keydown",t)},onFocusin(t){if(!t||!this.retainFocus)return;const e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some(t=>t.contains(e))){const t=[...this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].find(t=>!t.hasAttribute("disabled"));t&&t.focus()}},genContent(){return this.showLazyContent(()=>[this.$createElement(n.a,{props:{root:!0,light:this.light,dark:this.dark}},[this.$createElement("div",{class:this.contentClasses,attrs:{role:"document",tabindex:this.isActive?0:void 0,...this.getScopeIdAttrs()},on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.genTransition()])])])},genTransition(){const t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent(){const t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style={...t.style,maxWidth:"none"===this.maxWidth?void 0:Object(v.f)(this.maxWidth),width:"auto"===this.width?void 0:Object(v.f)(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},434:function(t,e,i){var n=i(435);"string"==typeof n&&(n=[[t.i,n,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};i(10)(n,a);n.locals&&(t.exports=n.locals)},435:function(t,e,i){(e=i(9)(!1)).push([t.i,".v-dialog{border-radius:6px;margin:24px;overflow-y:auto;pointer-events:auto;transition:.3s cubic-bezier(.25,.8,.25,1);width:100%;z-index:inherit;box-shadow:0 11px 30px -7px rgba(85,85,85,.08),0 24px 30px 3px rgba(85,85,85,.06),0 9px 40px 8px rgba(85,85,85,.03)}.v-dialog:not(.v-dialog--fullscreen){max-height:90%}.v-dialog>*{width:100%}.v-dialog>.v-card>.v-card__title{font-size:1.16rem;font-weight:800;letter-spacing:.0125em;padding:16px 24px 10px}.v-dialog>.v-card>.v-card__subtitle,.v-dialog>.v-card>.v-card__text{padding:0 24px 20px}.v-dialog>.v-card>.v-card__actions{padding:8px 16px}.v-dialog__content{align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;width:100%;z-index:6;outline:none}.v-dialog__container{display:none}.v-dialog__container--attached{display:inline}.v-dialog--animated{-webkit-animation-duration:.15s;animation-duration:.15s;-webkit-animation-name:animate-dialog;animation-name:animate-dialog;-webkit-animation-timing-function:cubic-bezier(.25,.8,.25,1);animation-timing-function:cubic-bezier(.25,.8,.25,1)}.v-dialog--fullscreen{border-radius:0;margin:0;height:100%;position:fixed;overflow-y:auto;top:0;left:0}.v-dialog--fullscreen>.v-card{min-height:100%;min-width:100%;margin:0!important;padding:0!important}.v-dialog--scrollable,.v-dialog--scrollable>form{display:flex}.v-dialog--scrollable>.v-card,.v-dialog--scrollable>form>.v-card{display:flex;flex:1 1 100%;flex-direction:column;max-height:100%;max-width:100%}.v-dialog--scrollable>.v-card>.v-card__actions,.v-dialog--scrollable>.v-card>.v-card__title,.v-dialog--scrollable>form>.v-card>.v-card__actions,.v-dialog--scrollable>form>.v-card>.v-card__title{flex:0 0 auto}.v-dialog--scrollable>.v-card>.v-card__text,.v-dialog--scrollable>form>.v-card>.v-card__text{-webkit-backface-visibility:hidden;backface-visibility:hidden;flex:1 1 auto;overflow-y:auto}@-webkit-keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}@keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}",""]),t.exports=e},449:function(t,e,i){var n=i(450);"string"==typeof n&&(n=[[t.i,n,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};i(10)(n,a);n.locals&&(t.exports=n.locals)},450:function(t,e,i){(e=i(9)(!1)).push([t.i,".bottom-sheet-transition-enter,.bottom-sheet-transition-leave-to{transform:translateY(100%)}.v-bottom-sheet.v-dialog{align-self:flex-end;border-radius:0;flex:0 1 auto;margin:0;overflow:visible}.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:70%}@media only screen and (max-width:599px){.v-bottom-sheet.v-dialog.v-bottom-sheet--inset{max-width:none}}",""]),t.exports=e},55:function(t,e,i){"use strict";i(449);var n=i(155),a=n.a.extend({name:"v-bottom-sheet",props:{inset:Boolean,maxWidth:{type:[String,Number],default:"auto"},transition:{type:String,default:"bottom-sheet-transition"}},computed:{classes(){return{...n.a.options.computed.classes.call(this),"v-bottom-sheet":!0,"v-bottom-sheet--inset":this.inset}}}}),s=i(99),o=i(320),r=i(1),l=i(159),c=i(113),d=i(321),u=i(114),h=i(0),f=i(162),v=i(35),p=i(46),m={props:{title:{type:String,default:""},subtitle:{type:String,default:""},value:{type:Boolean,default:!1},icon:{type:String,default:"mdi-dots-vertical"},divider:{type:Boolean,default:!1},absolute:{type:Boolean,default:!0},offsetx:{type:Boolean,default:!0},offsety:{type:Boolean,default:!0},flex_center:{type:Boolean,default:!0}},data:function(){return{isLoading:!1,x:0,y:0,show:!1}},methods:{openMenu:function(t){var e=this;t.preventDefault(),this.show=!1,this.absolute?(this.x=t.clientX,this.y=t.clientY):setTimeout((function(){console.log(e.$refs.activator.getBoundingClientRect().right),e.x=e.offsetx?e.$refs.activator.getBoundingClientRect().right:e.$refs.activator.getBoundingClientRect().x,e.y=e.offsety?e.$refs.activator.getBoundingClientRect().bottom:e.$refs.activator.getBoundingClientRect().y}),20),setTimeout((function(){e.show=!0}),30)},quitar:function(){console.log("cerrado")},cerrar:function(){this.show=!1}}},g=i(4),b=Object(g.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"v-btn"},[e("div",{ref:"activator",class:t.flex_center?"d-flex justify-center align-center":"",staticStyle:{height:"100%"}},[t._t("activator",(function(){return[e(s.a,{attrs:{icon:""},on:{click:t.openMenu}},[e(c.a,[t._v(t._s(t.icon))])],1)]}),{open:t.openMenu,isOpen:t.show,close:t.cerrar})],2),t._v(" "),t.$vuetify.breakpoint.xsOnly?e("div",[e(a,{staticClass:"rounded-lg",attrs:{width:"100%","close-delay":2e3},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[e(v.a,{staticClass:"rounded-t-lg",on:{click:function(e){return t.cerrar()}}},[e(d.a,{staticClass:"rounded-t-lg",attrs:{dense:""}},[e("div",{directives:[{def:p.b,name:"touch",rawName:"v-touch",value:{down:function(){return t.cerrar()}},expression:"{\n              down: () => cerrar(),\n            }"}],on:{click:function(e){return t.cerrar()}}},[e(v.a,{staticClass:"d-flex justify-center py-1 align-center"},[e("div",{staticClass:"hide-on-touch grey lighten-2"})]),t._v(" "),e("div",[t._t("title",(function(){return[t.title||t.subtitle?e(u.a,[e(h.b,[e(h.d,[t._v(t._s(t.title))]),t._v(" "),e(h.c,[t._v(t._s(t.subtitle))])],1)],1):t._e()]}))],2)],1),t._v(" "),e(o.a,{staticClass:"mx-2 rounded-lg mb-1",attrs:{color:t.$vuetify.theme.isDark?"grey darken-4":"grey lighten-3",elevation:"0"}},[e(r.c,{staticClass:"px-1"},[e(d.a,{class:{"py-0":t.$vuetify.breakpoint.smAndDown},attrs:{dense:"",color:"transparent"},on:{click:function(e){return t.cerrar()}}},[t._t("options",null,{close:t.cerrar})],2)],1)],1)],1)],1)],1)],1):t._e(),t._v(" "),e(f.a,{staticClass:"rounded-lg",attrs:{"position-x":t.x,"position-y":t.y,absolute:t.absolute,"offset-y":t.offsety,"offset-x":t.offsetx,"max-width":"300"},on:{blur:t.quitar},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[e(d.a,{staticClass:"rounded-lg",attrs:{dense:""}},[t._t("title",(function(){return[t.title||t.subtitle?e(u.a,[e(h.b,[e(h.d,[t._v(t._s(t.title))]),t._v(" "),e(h.c,[t._v(t._s(t.subtitle))])],1)],1):t._e()]})),t._v(" "),t.title||t.subtitle||t.divider?e(l.a):t._e(),t._v(" "),e(d.a,{staticClass:"pt-0 rounded-lg",class:{"py-0":t.$vuetify.breakpoint.smAndDown},attrs:{dense:"",color:"transparent"}},[e(d.a,{attrs:{dense:""}},[t._t("options",null,{close:t.cerrar})],2)],1)],2)],1)],1)}),[],!1,null,null,null);e.a=b.exports},68:function(t,e,i){"use strict";var n=i(99),a=i(320),s=i(1),o=i(1360),r=i(113),l=i(1359),c=i(48);function d(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?d(Object(i),!0).forEach((function(e){h(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):d(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function h(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var f={props:{close:{type:Boolean,default:!1},icon:{type:String,default:"mdi-magnify"},placeholder:{type:String,default:"Buscar:"},prefix:{type:String,default:"q"},time:{type:Number,default:1e3},elevation:{type:Number,default:3},outlined:{type:Boolean,default:!0},actions:{type:Boolean,default:!0},autofocus:{type:Boolean,default:!0},type:{type:String,default:"text"},label:{type:String,default:"Código de Barras"}},mounted:function(){this.final&&(this.search=this.final),this.ready=!0,this.autofocus&&this.skBuscarCodigo()},data:function(){return{isLoading:!1,search:"",ready:!1,timer:null,updates:0}},methods:{realizarBusqueda:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.time;this.isLoading=!0,this.timer&&(clearTimeout(this.timer),this.timer=null),this.timer=setTimeout((function(){t.final=t.search,t.isLoading=!1}),e)},actualizarRuta:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=this.$route.query;i?delete n[t]:n[t]=e.toString(),this.$router.replace({query:u(u({},n),{},{t:this.updates++})}).catch((function(){}))},cerrar:function(){this.$emit("close",!1)},skBuscarCodigo:function(){this.$refs.buscarCodigo.$refs.input.select(),this.$refs.buscarCodigo.$refs.input.focus()},skLimpiar:function(){this.codigo="",this.isLoading=!1,this.isNew=!1,this.isFound=!1,this.$refs.buscarCodigo.$refs.input.focus()},skEnfocarTextField:function(t){this.$refs[t].$refs.input.select(),this.$refs[t].$refs.input.focus()}},computed:{final:{get:function(){return this.$route.query[this.prefix]||""},set:function(t){null==t?this.actualizarRuta(this.prefix,"",!0):this.actualizarRuta(this.prefix,t,""==t)}}},watch:{search:function(){this.ready?this.realizarBusqueda():this.ready=!0},final:function(){this.search=this.final}}},v=i(4),p=Object(v.a)(f,(function(){var t=this,e=t._self._c;return e("div",[e(a.a,{attrs:{outlined:!1,elevation:t.elevation,tile:""}},[e(s.c,{staticClass:"pa-0"},[e(l.a,{attrs:{dense:""}},[e(o.a,{staticClass:"py-0",attrs:{cols:"12",sm:"8"}},[e(c.a,{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","q"],expression:"['ctrl', 'q']"}],ref:"buscarCodigo",staticClass:"rounded-lg",staticStyle:{"font-size":"25px"},attrs:{type:t.type,outlined:"",height:"60",label:t.label+" [CTRL+Q]","prepend-icon":"mdi-barcode",placeholder:"Ingrese el Codigo","append-outer-icon":t.close?"mdi-chevron-right":""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.realizarBusqueda(0)},"click:append-outer":function(e){return t.cerrar()}},nativeOn:{shortkey:function(e){return t.skBuscarCodigo.apply(null,arguments)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),e(o.a,{attrs:{cols:t.actions?6:12,sm:t.actions?2:4}},[e("div",{staticClass:"d-flex justify-center align-center mb-2"},[e(n.a,{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","b"],expression:"['ctrl', 'b']"}],attrs:{outlined:"",block:"",large:"",color:"primary",loading:t.isLoading},on:{click:function(e){return t.realizarBusqueda(0)}},nativeOn:{shortkey:function(e){return t.realizarBusqueda(0)}}},[t._v("\n                            Buscar [CTRL+B]\n                            "),e(r.a,{attrs:{right:""}},[t._v("mdi-cloud-search-outline")])],1)],1)]),t._v(" "),t.actions?e(o.a,{attrs:{cols:"6",sm:"2"}},[e("div",{staticClass:"d-flex justify-center align-center mb-2"},[t._t("default")],2)]):t._e()],1)],1)],1)],1)}),[],!1,null,null,null);e.a=p.exports}}]);