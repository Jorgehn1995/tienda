(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{1322:function(t,i,e){"use strict";e.r(i);var a=e(98),o=e(318),r=e(1),c=e(154),s=e(1343),n=e(1341),l=e(157),p=e(111),h=e(112),v=e(0),d=e(1342),u=e(1340),g=e(68),f=e(128),m=e(52),x={components:{TListar:e(31).a,VOptions:m.a,ProductosMostrarPrecio:f.a,BusquedaTextField:g.a},mounted:function(){},data:function(){return{isLoading:!1,seleccion:[],ajustes:{id:"idproducto",ruta:"/productos",buscar:""}}},methods:{},computed:{extraQuery:function(){return""}}},b=(e(478),e(4)),_=Object(b.a)(x,(function(){var t=this,i=t._self._c;return i("div",[i(o.a,{attrs:{tile:""}},[i(r.c,[i("busqueda-text-field",{staticClass:"mt-2",attrs:{elevation:0,prefix:"productos_search"}},[i(a.a,{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","l"],expression:"['ctrl', 'l']"}],attrs:{dark:"",block:"",large:"",color:"primary",to:"/tienda/productos/editar",loading:t.isLoading}},[t._v("\n                    Agregar [CTRL+A]\n                    "),i(p.a,{attrs:{right:""}},[t._v("mdi-plus")])],1)],1)],1)],1),t._v(" "),i(n.a,[i("div",{staticClass:"d-flex flex-grow-1 flex-column"},[i(d.a,{staticClass:"flex-grow-0",attrs:{dense:""}},[i(s.a,{attrs:{cols:"12"}},[i("t-listar",{ref:"tabla",attrs:{tableID:"actividades.profesores",prefix:"productos_","show-select":"","show-expand":"","toggle-columns":"",extraQuery:t.extraQuery,apiURL:t.ajustes.ruta,itemID:t.ajustes.id,buscar:t.ajustes.buscar,truncate:!0,show_menu:!0,pagination:50,toolbar:!1},on:{"update:search":function(i){t.ajustes.buscar=i},"click:row":function(i){return t.ver(i)},"update:seleccion":function(i){t.seleccion=i}},scopedSlots:t._u([{key:"toolbar.name",fn:function(e){e.reload,e.isReloading;return[i("div",{staticClass:"d-flex d-flex-column align-center"},[i("div",{staticClass:"mr-1"},[t._v("Productos")]),t._v(" "),i(a.a,{staticClass:"ml-2",attrs:{color:"primary",to:"/tienda/productos/editar"}},[i(p.a,{attrs:{left:""}},[t._v("mdi-plus")]),t._v("\n                                    Crear\n                                ")],1)],1)]}},{key:"item",fn:function(e){e.isSelected,e.toggle;var o=e.item;e.index;return[i(r.d,[i("a",{staticClass:"undertext black--text font-weight-bold text-decoration-none",attrs:{href:"/tienda/productos/"+o.idproducto}},[t._v("\n                                    "+t._s(o.nombre)+" "+t._s(o.dimension)+"\n                                ")])]),t._v(" "),i(r.b,[i("strong",[t._v("\n                                    "+t._s(o.marca)+"\n                                ")])]),t._v(" "),i(r.c,{staticClass:"px-2"},[i(d.a,{staticStyle:{height:"100%"},attrs:{dense:""}},[i(s.a,{attrs:{cols:"4",md:"4"}},[i("a",{staticClass:"text-left undertext green--text font-weight-bold text-decoration-none",staticStyle:{width:"100%"},attrs:{href:"/tienda/productos/"+o.idproducto}},[i(p.a,[t._v("mdi-barcode")]),t._v(" "),i("span",[t._v(t._s(o.codigo))])],1)]),t._v(" "),i(s.a,{attrs:{cols:"4",md:"4"}},[o.existencia>0?i(c.a,{staticClass:"v-chip--active",attrs:{color:"green--text",dark:"",small:""}},[t._v("\n                                            "+t._s(o.existencia)+"\n                                            "+t._s(o.unidades)+"\n                                        ")]):i(c.a,{attrs:{small:""}},[t._v("\n                                            "+t._s(o.existencia)+"\n                                            "+t._s(o.unidades)+"\n                                        ")])],1),t._v(" "),i(s.a,{attrs:{cols:"4",md:"4"}})],1)],1),t._v(" "),i(r.a,[i(u.a),t._v(" "),i(a.a,{attrs:{outlined:"",color:"green",to:"/tienda/productos/existencias?productos_search=id:"+o.idproducto}},[i(p.a,{attrs:{left:""}},[t._v("mdi-package-variant-closed-plus")])],1),t._v(" "),i(a.a,{attrs:{outlined:"",to:"/tienda/productos/editar?id="+o.idproducto}},[i(p.a,{attrs:{left:""}},[t._v("mdi-pencil-outline")])],1),t._v(" "),i("v-options",{attrs:{title:o.nombre,icon:"mdi-dots-horizontal"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.open;return[i(a.a,{attrs:{outlined:""},on:{click:o}},[i(p.a,{attrs:{left:""}},[t._v("\n                                                mdi-dots-horizontal\n                                            ")])],1)]}},{key:"options",fn:function(){return[i(h.a,[i(v.d,[t._v("\n                                                Ver Producto\n                                            ")])],1),t._v(" "),i(h.a,[i(v.d,[t._v("\n                                                Imprimir\n                                            ")])],1),t._v(" "),i(h.a,{attrs:{to:"/tienda/productos/existencias?productos_search=idproducto:"+o.idproducto}},[i(v.d,[t._v("\n                                                Agregar Existencias\n                                            ")])],1),t._v(" "),i(h.a,[i(v.d,[t._v("\n                                                Revisar Vencimientos\n                                            ")])],1),t._v(" "),i(h.a,{attrs:{to:"/tienda/productos/editar?id="+o.idproducto}},[i(v.d,[t._v("\n                                                Editar\n                                            ")])],1),t._v(" "),i(l.a),t._v(" "),i(h.a,{attrs:{to:"/tienda/productos/eliminar?id="+o.idusuario}},[i(v.d,{staticClass:"red--text"},[t._v("\n                                                Eliminar\n                                            ")])],1)]},proxy:!0}],null,!0)})],1)]}}])})],1)],1)],1)])],1)}),[],!1,null,null,null);i.default=_.exports},154:function(t,i,e){"use strict";e(432);var a=e(7),o=e(35),r=e(11),c=e(15),s=e(44),n=e(13),l=e(20),p=e(29),h=e(82),v=e(12);i.a=Object(a.a)(c.a,h.a,p.a,n.a,Object(s.a)("chipGroup"),Object(l.b)("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:()=>({proxyClass:"v-chip--active"}),computed:{classes(){return{"v-chip":!0,...p.a.options.computed.classes.call(this),"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose,...this.themeClasses,...this.sizeableClasses,...this.groupClasses}},hasClose(){return Boolean(this.close)},isClickable(){return Boolean(p.a.options.computed.isClickable.call(this)||this.chipGroup)}},created(){[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]].forEach(([t,i])=>{this.$attrs.hasOwnProperty(t)&&Object(v.a)(t,i,this)})},methods:{click(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter(){const t=[];return this.isActive&&t.push(this.$createElement(r.a,{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(o.b,t)},genClose(){return this.$createElement(r.a,{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:t=>{t.stopPropagation(),t.preventDefault(),this.$emit("click:close"),this.$emit("update:active",!1)}}},this.closeIcon)},genContent(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render(t){const i=[this.genContent()];let{tag:e,data:a}=this.generateRouteLink();a.attrs={...a.attrs,draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:a.attrs.tabindex},a.directives.push({name:"show",value:this.active}),a=this.setBackgroundColor(this.color,a);const o=this.textColor||this.outlined&&this.color;return t(e,this.setTextColor(o,a),i)}})},335:function(t,i,e){var a=e(479);"string"==typeof a&&(a=[[t.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(10)(a,o);a.locals&&(t.exports=a.locals)},432:function(t,i,e){var a=e(433);"string"==typeof a&&(a=[[t.i,a,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(10)(a,o);a.locals&&(t.exports=a.locals)},433:function(t,i,e){(i=e(9)(!1)).push([t.i,'.v-chip:not(.v-chip--outlined).accent,.v-chip:not(.v-chip--outlined).error,.v-chip:not(.v-chip--outlined).info,.v-chip:not(.v-chip--outlined).primary,.v-chip:not(.v-chip--outlined).secondary,.v-chip:not(.v-chip--outlined).success,.v-chip:not(.v-chip--outlined).warning{color:#edf0f2}.theme--light.v-chip{border-color:rgba(0,0,0,.05);color:rgba(0,0,0,.87)}.theme--light.v-chip:not(.v-chip--active){background:#e0e0e0}.theme--light.v-chip:hover:before{opacity:.04}.theme--light.v-chip--active:before,.theme--light.v-chip--active:hover:before,.theme--light.v-chip:focus:before{opacity:.12}.theme--light.v-chip--active:focus:before{opacity:.16}.theme--dark.v-chip{border-color:hsla(0,0%,100%,.12);color:#edf0f2}.theme--dark.v-chip:not(.v-chip--active){background:#555}.theme--dark.v-chip:hover:before{opacity:.08}.theme--dark.v-chip--active:before,.theme--dark.v-chip--active:hover:before,.theme--dark.v-chip:focus:before{opacity:.24}.theme--dark.v-chip--active:focus:before{opacity:.32}.v-chip{align-items:center;cursor:default;display:inline-flex;line-height:20px;max-width:100%;outline:none;overflow:hidden;padding:0 12px;position:relative;text-decoration:none;transition-duration:.28s;transition-property:box-shadow,opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);vertical-align:middle;white-space:nowrap}.v-chip:before{background-color:currentColor;bottom:0;border-radius:inherit;content:"";left:0;opacity:0;position:absolute;pointer-events:none;right:0;top:0}.v-chip .v-avatar{height:24px!important;min-width:24px!important;width:24px!important}.v-chip .v-icon{font-size:24px}.v-application--is-ltr .v-chip .v-avatar--left,.v-application--is-ltr .v-chip .v-icon--left{margin-left:-6px;margin-right:6px}.v-application--is-ltr .v-chip .v-avatar--right,.v-application--is-ltr .v-chip .v-icon--right,.v-application--is-rtl .v-chip .v-avatar--left,.v-application--is-rtl .v-chip .v-icon--left{margin-left:6px;margin-right:-6px}.v-application--is-rtl .v-chip .v-avatar--right,.v-application--is-rtl .v-chip .v-icon--right{margin-left:-6px;margin-right:6px}.v-chip:not(.v-chip--no-color) .v-icon{color:inherit}.v-chip .v-chip__close.v-icon{font-size:18px;max-height:18px;max-width:18px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.v-application--is-ltr .v-chip .v-chip__close.v-icon.v-icon--right{margin-right:-4px}.v-application--is-rtl .v-chip .v-chip__close.v-icon.v-icon--right{margin-left:-4px}.v-chip .v-chip__close.v-icon:active,.v-chip .v-chip__close.v-icon:focus,.v-chip .v-chip__close.v-icon:hover{opacity:.72}.v-chip .v-chip__content{align-items:center;display:inline-flex;height:100%;max-width:100%}.v-chip--active .v-icon{color:inherit}.v-chip--link:before{transition:opacity .3s cubic-bezier(.25,.8,.5,1)}.v-chip--link:focus:before{opacity:.32}.v-chip--clickable{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.v-chip--clickable:active{box-shadow:0 3px 10px -2px rgba(85,85,85,.08),0 2px 20px 0 rgba(85,85,85,.06),0 1px 30px 0 rgba(85,85,85,.03)}.v-chip--disabled{opacity:.4;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.v-chip__filter{max-width:24px}.v-chip__filter.v-icon{color:inherit}.v-chip__filter.expand-x-transition-enter,.v-chip__filter.expand-x-transition-leave-active{margin:0}.v-chip--pill .v-chip__filter{margin-right:0 16px 0 0}.v-chip--pill .v-avatar{height:32px!important;width:32px!important}.v-application--is-ltr .v-chip--pill .v-avatar--left{margin-left:-12px}.v-application--is-ltr .v-chip--pill .v-avatar--right,.v-application--is-rtl .v-chip--pill .v-avatar--left{margin-right:-12px}.v-application--is-rtl .v-chip--pill .v-avatar--right{margin-left:-12px}.v-chip--label{border-radius:6px!important}.v-chip.v-chip--outlined{border-width:thin;border-style:solid}.v-chip.v-chip--outlined.v-chip--active:before{opacity:.08}.v-chip.v-chip--outlined .v-icon{color:inherit}.v-chip.v-chip--outlined.v-chip.v-chip{background-color:transparent!important}.v-chip.v-chip--selected{background:transparent}.v-chip.v-chip--selected:after{opacity:.28}.v-chip.v-size--x-small{border-radius:8px;font-size:10px;height:16px}.v-chip.v-size--small{border-radius:12px;font-size:12px;height:24px}.v-chip.v-size--default{border-radius:16px;font-size:14px;height:32px}.v-chip.v-size--large{border-radius:27px;font-size:16px;height:54px}.v-chip.v-size--x-large{border-radius:33px;font-size:18px;height:66px}',""]),t.exports=i},478:function(t,i,e){"use strict";e(335)},479:function(t,i,e){(i=e(9)(!1)).push([t.i,".undertext{cursor:pointer;display:inline-block;border-bottom:1px dashed transparent}.undertext:hover{border-bottom:1px dashed}",""]),t.exports=i}}]);