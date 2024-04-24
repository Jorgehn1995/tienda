(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1304:function(t,e,i){"use strict";var o=i(7),n=i(44),r=i(67);e.a=Object(o.a)(n.a,Object(r.b)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",e=>{this.$set(this.errorBag,t._uid,e)},{immediate:!0}),i={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",o=>{o&&(this.errorBag.hasOwnProperty(t._uid)||(i.valid=e(t)))}):i.valid=e(t),i},validate(){return 0===this.inputs.filter(t=>!t.validate(!0)).length},reset(){this.inputs.forEach(t=>t.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(t=>t.resetValidation()),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find(e=>e._uid===t._uid);if(!e)return;const i=this.watchers.find(t=>t._uid===e._uid);i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter(t=>t._uid!==e._uid),this.inputs=this.inputs.filter(t=>t._uid!==e._uid),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},this.$slots.default)}})},1310:function(t,e,i){"use strict";i(455),i(457);var o=i(22),n=i(27),r=i(84),s=i(7);const a=Object(s.a)(r.a,n.a,o.a);e.a=a.extend({name:"v-radio-group",provide(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes(){return{...o.a.options.computed.classes.call(this),"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},methods:{genDefaultSlot(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},o.a.options.methods.genDefaultSlot.call(this))},genInputSlot(){const t=o.a.options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel(){const t=o.a.options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:n.a.options.methods.onClick}})},1311:function(t,e,i){"use strict";i(459);var o=i(93),n=i(11),r=i(22),s=i(44),a=i(14),l=i(45),u=i(34),d=i(5).a.extend({name:"rippleable",directives:{ripple:u.b},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple(t={}){return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}}),p=i(12),c=i(84),h=i(7);function v(t){t.preventDefault()}var g=Object(h.a)(r.a,d,c.a).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive(){const t=this.value,e=this.internalValue;return this.isMultiple?!!Array.isArray(e)&&e.some(e=>this.valueComparator(e,t)):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,e):Boolean(e):this.valueComparator(e,this.trueValue)},isDirty(){return this.isActive},rippleState(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel(){const t=r.a.options.methods.genLabel.call(this);return t?(t.data.on={click:v},t):t},genInput(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:v},ref:"input"})},onBlur(){this.isFocused=!1},onClick(t){this.onChange(),this.$emit("click",t)},onChange(){if(!this.isInteractive)return;const t=this.value;let e=this.internalValue;if(this.isMultiple){Array.isArray(e)||(e=[]);const i=e.length;e=e.filter(e=>!this.valueComparator(e,t)),e.length===i&&e.push(t)}else e=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(e,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(e,t)?null:t:!e;this.validate(!0,e),this.internalValue=e,this.hasColor=e},onFocus(){this.isFocused=!0},onKeydown(t){}}}),f=i(2),b=i(21);const m=Object(h.a)(s.a,a.a,d,Object(l.a)("radioGroup"),p.a);e.a=m.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:()=>({isFocused:!1}),computed:{classes(){return{"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused,...this.themeClasses,...this.groupClasses}},computedColor(){return g.options.computed.computedColor.call(this)},computedIcon(){return this.isActive?this.onIcon:this.offIcon},computedId(){return r.a.options.computed.computedId.call(this)},hasLabel:r.a.options.computed.hasLabel,hasState(){return(this.radioGroup||{}).hasState},isDisabled(){return this.disabled||!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly(){return this.readonly||!!this.radioGroup&&this.radioGroup.isReadonly},computedName(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-"+this.radioGroup._uid},rippleState(){return g.options.computed.rippleState.call(this)},validationState(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput(t){return g.options.methods.genInput.call(this,"radio",t)},genLabel(){return this.hasLabel?this.$createElement(o.a,{on:{click:v},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(f.o)(this,"label")||this.label):null},genRadio(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(n.a,this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput({name:this.computedName,value:this.value,...this.attrs$}),this.genRipple(this.setTextColor(this.rippleState))])},onFocus(t){this.isFocused=!0,this.$emit("focus",t)},onBlur(t){this.isFocused=!1,this.$emit("blur",t)},onChange(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:()=>{}},render(t){return t("div",{staticClass:"v-radio",class:this.classes,on:Object(b.b)({click:this.onChange},this.listeners$)},[this.genRadio(),this.genLabel()])}})},28:function(t,e,i){"use strict";var o=i(48),n={components:{FormStructField:i(82).a},props:{type:{type:String,default:"text"},mask:{type:String,default:""},label:{type:String,default:"Nombre"},rules:{type:Array,default:function(){return[]}},value:{type:[String,Number],default:""},placeholder:{type:String,default:""},column:{type:Boolean,default:!1},right:{type:Boolean,default:!1},hint:{type:String,default:""},persistentHint:{type:Boolean,default:!1},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},success:{type:Boolean,default:!1},error:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},btn:{type:Boolean,default:!1},prefix:{type:String,default:""},suffix:{type:String,default:""},autofocus:{type:Boolean,default:!1},upper:{type:Boolean,default:!1},dense:{type:Boolean,default:!1}},data:function(){return{isReady:!1}},methods:{uppercase:function(){this.upper&&(this.data=this.data.toUpperCase())}},computed:{data:{get:function(){return this.value},set:function(t){this.$emit("input",t)}},messageColor:function(){return this.error?"error-text":this.success?"success-text":""}}},r=(i(447),i(4)),s=Object(r.a)(n,(function(){var t=this,e=t._self._c;return e("div",[e("form-struct-field",{attrs:{column:t.column,right:t.right,required:t.required},scopedSlots:t._u([{key:"label",fn:function(){return[t._v("\n            "+t._s(t.label)+"\n        ")]},proxy:!0},{key:"field",fn:function(){return[t._t("default",(function(){return[e(o.a,{ref:"field",staticClass:"rounded-lg",class:{"error-text":t.error,"success-text":t.success},attrs:{autofocus:t.autofocus,prefix:t.prefix,suffix:t.suffix,success:t.success,error:t.error,loading:t.loading,disabled:t.disabled,type:t.type,outlined:"",placeholder:t.placeholder,hint:t.hint,"persistent-hint":t.persistentHint,rules:t.rules,readonly:t.readonly,dense:t.dense},on:{click:function(e){return t.$emit("click:field")},keyup:t.uppercase},scopedSlots:t._u([{key:"append",fn:function(){return[t._t("append")]},proxy:!0},{key:"append-outer",fn:function(){return[t._t("append-outer")]},proxy:!0},{key:"prepend",fn:function(){return[t._t("prepend")]},proxy:!0}],null,!0),model:{value:t.data,callback:function(e){t.data=e},expression:"data"}})]})),t._v(" "),t.btn?e("div",{staticClass:"field-overlay cursor-pointer",on:{click:function(e){return t.$emit("click:field")}}}):t._e()]},proxy:!0}],null,!0)})],1)}),[],!1,null,null,null);e.a=s.exports},31:function(t,e,i){"use strict";var o=i(325),n=i(99),r=i(320),s=i(1),a=i(1360),l=i(155),u=i(159),d=i(113),p=i(1359),c=i(1357),h={props:{value:{type:Boolean,default:!1},color:{type:String,default:"green"},icon:{type:String,default:"mdi-check"},btn_cancel:{type:Boolean,default:!1}},methods:{cancelar:function(){this.$emit("cancel")},go:function(){this.$emit("go")}},computed:{dialog:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},v=i(4),g=Object(v.a)(h,(function(){var t=this,e=t._self._c;return e("div",[e(l.a,{attrs:{"max-width":"400"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(r.a,{staticClass:"rounded-lg"},[e(s.d),t._v(" "),e(s.c,{staticClass:"py-0"},[e(p.a,{attrs:{dense:""}},[e(a.a,{staticClass:"pt-0",attrs:{cols:"4"}},[e(o.a,{staticStyle:{top:"-30px",left:"-55px"},attrs:{color:t.color+" lighten-5",size:"160"}},[e(d.a,{attrs:{size:"90",color:t.color}},[t._v("\n                "+t._s(t.icon)+"\n              ")])],1)],1),t._v(" "),e(a.a,{staticClass:"d-flex justify-center pt-0",attrs:{cols:"8"}},[e("div",{staticClass:"mt-2"},[e("span",{class:t.color+"--text title"},[t._t("titulo",(function(){return[t._v(" Guardar Registro ")]}))],2),t._v(" "),e("br"),t._v(" "),e("span",[t._t("descripcion",(function(){return[t._v("¿Estás seguro de guardar el registro?\n                ")]}))],2)])])],1)],1),t._v(" "),e(u.a),t._v(" "),e(s.a,[t.btn_cancel?e(n.a,{attrs:{depressed:""},on:{click:function(e){return t.cancelar()}}},[e(d.a,{attrs:{left:""}},[t._v("mdi-close")]),t._v("\n          Cancelar\n        ")],1):t._e(),t._v(" "),e(c.a),t._v(" "),e(n.a,{attrs:{color:t.color,dark:""},on:{click:function(e){return t.go()}}},[t._t("btn",(function(){return[e(d.a,{attrs:{left:""}},[t._v("mdi-content-save")]),t._v("\n            Sí, guardar\n          ")]}))],2)],1)],1)],1)],1)}),[],!1,null,null,null);e.a=g.exports},330:function(t,e,i){var o=i(448);"string"==typeof o&&(o=[[t.i,o,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(10)(o,n);o.locals&&(t.exports=o.locals)},447:function(t,e,i){"use strict";i(330)},448:function(t,e,i){(e=i(9)(!1)).push([t.i,".error-text .v-messages__message{color:var(--v-error-base)}.success-text .v-messages__message{color:var(--v-success-darken1)}.cont{position:relative}.field-overlay{position:absolute;bottom:0;background:transparent;color:#f1f1f1;width:100%;height:100%;transition:.5s ease;opacity:1;color:#fff;font-size:20px;padding:20px;text-align:center}.v-input__append-outer{margin:0!important;padding:0!important}",""]),t.exports=e},455:function(t,e,i){var o=i(456);"string"==typeof o&&(o=[[t.i,o,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(10)(o,n);o.locals&&(t.exports=o.locals)},456:function(t,e,i){(e=i(9)(!1)).push([t.i,'.theme--light.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon{color:rgba(0,0,0,.26)!important}.theme--dark.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon{color:hsla(0,0%,100%,.3)!important}.v-input--selection-controls{margin-top:16px;padding-top:4px}.v-input--selection-controls>.v-input__append-outer,.v-input--selection-controls>.v-input__prepend-outer{margin-top:0;margin-bottom:0}.v-input--selection-controls:not(.v-input--hide-details)>.v-input__slot{margin-bottom:12px}.v-input--selection-controls .v-input__slot,.v-input--selection-controls .v-radio{cursor:pointer}.v-input--selection-controls .v-input__slot>.v-label,.v-input--selection-controls .v-radio>.v-label{align-items:center;display:inline-flex;flex:1 1 auto;height:auto}.v-input--selection-controls__input{color:inherit;display:inline-flex;flex:0 0 auto;height:24px;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1);transition-property:transform;width:24px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.v-input--selection-controls__input .v-icon{width:100%}.v-application--is-ltr .v-input--selection-controls__input{margin-right:8px}.v-application--is-rtl .v-input--selection-controls__input{margin-left:8px}.v-input--selection-controls__input input[role=checkbox],.v-input--selection-controls__input input[role=radio],.v-input--selection-controls__input input[role=switch]{position:absolute;opacity:0;width:100%;height:100%;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.v-input--selection-controls__input+.v-label{cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.v-input--selection-controls__ripple{border-radius:50%;cursor:pointer;height:34px;position:absolute;transition:inherit;width:34px;left:-12px;top:calc(50% - 24px);margin:7px}.v-input--selection-controls__ripple:before{border-radius:inherit;bottom:0;content:"";position:absolute;opacity:.2;left:0;right:0;top:0;transform-origin:center center;transform:scale(.2);transition:inherit}.v-input--selection-controls__ripple>.v-ripple__container{transform:scale(1.2)}.v-input--selection-controls.v-input--dense .v-input--selection-controls__ripple{width:28px;height:28px;left:-9px}.v-input--selection-controls.v-input--dense:not(.v-input--switch) .v-input--selection-controls__ripple{top:calc(50% - 21px)}.v-input--selection-controls.v-input{flex:0 1 auto}.v-input--selection-controls.v-input--is-focused .v-input--selection-controls__ripple:before,.v-input--selection-controls .v-radio--is-focused .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(1.2)}.v-input--selection-controls .v-input--selection-controls__input:hover .v-input--selection-controls__ripple:before{background:currentColor;transform:scale(1.2);transition:none}',""]),t.exports=e},457:function(t,e,i){var o=i(458);"string"==typeof o&&(o=[[t.i,o,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(10)(o,n);o.locals&&(t.exports=o.locals)},458:function(t,e,i){(e=i(9)(!1)).push([t.i,".v-input--radio-group legend.v-label{cursor:text;font-size:14px;height:auto}.v-input--radio-group__input{border:none;cursor:default;display:flex;width:100%}.v-input--radio-group--column .v-input--radio-group__input>.v-label{padding-bottom:8px}.v-input--radio-group--row .v-input--radio-group__input>.v-label{padding-right:8px}.v-input--radio-group--row legend{align-self:center;display:inline-block}.v-input--radio-group--row .v-input--radio-group__input{flex-direction:row;flex-wrap:wrap}.v-input--radio-group--column legend{padding-bottom:8px}.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child){margin-bottom:8px}.v-input--radio-group--column .v-input--radio-group__input{flex-direction:column}",""]),t.exports=e},459:function(t,e,i){var o=i(460);"string"==typeof o&&(o=[[t.i,o,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(10)(o,n);o.locals&&(t.exports=o.locals)},460:function(t,e,i){(e=i(9)(!1)).push([t.i,".theme--light.v-radio--is-disabled label{color:rgba(0,0,0,.38)}.theme--light.v-radio--is-disabled .v-icon{color:rgba(0,0,0,.26)!important}.theme--dark.v-radio--is-disabled label{color:hsla(0,0%,100%,.5)}.theme--dark.v-radio--is-disabled .v-icon{color:hsla(0,0%,100%,.3)!important}.v-radio{align-items:center;display:flex;height:auto;outline:none}.v-radio--is-disabled{pointer-events:none;cursor:default}.v-input--radio-group.v-input--radio-group--row .v-radio{margin-right:16px}",""]),t.exports=e},476:function(t,e,i){var o=i(477);"string"==typeof o&&(o=[[t.i,o,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};i(10)(o,n);o.locals&&(t.exports=o.locals)},477:function(t,e,i){(e=i(9)(!1)).push([t.i,".theme--light.v-btn-toggle:not(.v-btn-toggle--group){background:#fff;color:rgba(0,0,0,.87)}.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn{border-color:rgba(0,0,0,.05)!important}.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn:focus:not(:active){border-color:rgba(0,0,0,.26)}.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn .v-icon{color:#000}.theme--dark.v-btn-toggle:not(.v-btn-toggle--group){background:#05090c;color:#edf0f2}.theme--dark.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn{border-color:hsla(0,0%,100%,.12)!important}.theme--dark.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn:focus:not(:active){border-color:hsla(0,0%,100%,.3)}.theme--dark.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn .v-icon{color:#fff}.v-btn-toggle{border-radius:6px;display:inline-flex;max-width:100%}.v-btn-toggle>.v-btn.v-btn{border-radius:0;border-style:solid;border-width:thin;box-shadow:none;opacity:.8;padding:0 12px}.v-application--is-ltr .v-btn-toggle>.v-btn.v-btn:first-child{border-top-left-radius:inherit;border-bottom-left-radius:inherit}.v-application--is-ltr .v-btn-toggle>.v-btn.v-btn:last-child,.v-application--is-rtl .v-btn-toggle>.v-btn.v-btn:first-child{border-top-right-radius:inherit;border-bottom-right-radius:inherit}.v-application--is-rtl .v-btn-toggle>.v-btn.v-btn:last-child{border-top-left-radius:inherit;border-bottom-left-radius:inherit}.v-btn-toggle>.v-btn.v-btn--active{color:inherit;opacity:1}.v-btn-toggle>.v-btn.v-btn:after{display:none}.v-application--is-ltr .v-btn-toggle>.v-btn.v-btn:not(:first-child),.v-application--is-rtl .v-btn-toggle>.v-btn.v-btn:not(:last-child){border-left-width:0}.v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default{height:48px;min-height:0;min-width:48px}.v-btn-toggle--borderless>.v-btn.v-btn{border-width:0}.v-btn-toggle--dense>.v-btn.v-btn{padding:0 8px}.v-btn-toggle--group{border-radius:0}.v-btn-toggle--group>.v-btn.v-btn{background-color:transparent!important;border-color:transparent;margin:4px;min-width:auto}.v-btn-toggle--rounded{border-radius:24px}.v-btn-toggle--shaped{border-radius:24px 6px}.v-btn-toggle--tile{border-radius:0}",""]),t.exports=e},82:function(t,e,i){"use strict";var o={props:{column:{type:Boolean,default:!1},right:{type:Boolean,default:!1},required:{type:Boolean,default:!1}}},n=i(4),r=Object(n.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"d-flex",class:{"flex-column":t.column||t.$vuetify.breakpoint.xsOnly,"flex-row":!t.column}},[e("div",{staticClass:"py-sm-0 pb-0 flex-shrink-0"},[e("div",{staticClass:"pa-1",style:t.column?"":"width: 110px !important"},[e("label",{staticClass:"v-label font-weight-medium",class:{"justify-end":t.right},staticStyle:{"white-space":"normal"}},[t._t("label"),t._v(" "),t.required?e("span",{staticClass:"error--text ml-1",class:{"mr-1":!t.column}},[t._v("*")]):t._e()],2)])]),t._v(" "),e("div",{staticClass:"cont rounded-lg flex-grow-1"},[t._t("field")],2)])}),[],!1,null,null,null);e.a=r.exports},86:function(t,e,i){"use strict";var o=i(99),n=(i(476),i(27)),r=n.a.extend({name:"button-group",provide(){return{btnToggle:this}},computed:{classes(){return n.a.options.computed.classes.call(this)}},methods:{genData:n.a.options.methods.genData}}),s=i(14),a=i(7),l=Object(a.a)(r,s.a).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes(){return{...r.options.computed.classes.call(this),"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile,...this.themeClasses}}},methods:{genData(){const t=this.setTextColor(this.color,{...r.options.methods.genData.call(this)});return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),u=i(1311),d=i(1310),p=i(1352),c={components:{FormStructField:i(82).a},props:{label:{type:String,default:"Nombre"},rules:{type:Array,default:function(){return[]}},value:{type:[String,Array,Number],default:function(){return[]}},placeholder:{type:String,default:""},hint:{type:String,default:""},persistentHint:{type:Boolean,default:!1},items:{type:Array,default:function(){return[]}},itemText:{type:String,default:"text"},itemValue:{type:String,default:"value"},required:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},btn:{type:Boolean,default:!1},radio:{type:Boolean,default:!1},row:{Boolean:Boolean,default:!1},column:{type:Boolean,default:!1},right:{type:Boolean,default:!1}},data:function(){return{isReady:!1}},computed:{data:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}}},h=i(4),v=Object(h.a)(c,(function(){var t=this,e=t._self._c;return e("div",[e("form-struct-field",{attrs:{column:t.column,right:t.right,required:t.required},scopedSlots:t._u([{key:"label",fn:function(){return[t._v("\n      "+t._s(t.label)+"\n    ")]},proxy:!0},{key:"field",fn:function(){return[t._t("default",(function(){return[t.btn?e("div",[e("div",{staticClass:"d-flex flex-column"},[e(l,{staticClass:"mb-1",attrs:{color:"primary"},model:{value:t.data,callback:function(e){t.data=e},expression:"data"}},t._l(t.items,(function(i){return e(o.a,{key:"btn"+(i[t.itemValue]||i),attrs:{value:i[t.itemValue]||i,disabled:t.disabled}},[t._v("\n                "+t._s(i[t.itemText]||i)+"\n              ")])})),1),t._v(" "),t.persistentHint?e("span",{staticClass:"caption px-1"},[t._v("\n              "+t._s(t.hint)+"\n            ")]):t._e()],1)]):t.radio?e("div",[e(d.a,{staticClass:"mt-0",attrs:{row:t.$vuetify.breakpoint.smAndUp||t.row,rules:t.rules},model:{value:t.data,callback:function(e){t.data=e},expression:"data"}},t._l(t.items,(function(i){return e(u.a,{key:"btn"+(i[t.itemValue]||i),attrs:{value:i[t.itemValue]||i,disabled:t.disabled,label:i[t.itemText]||i}})})),1),t._v(" "),t.persistentHint?e("span",{staticClass:"caption px-1"},[t._v("\n            "+t._s(t.hint)+"\n          ")]):t._e()],1):e("div",[e(p.a,{staticClass:"rounded-lg",attrs:{multiple:t.multiple,disabled:t.disabled,outlined:"",placeholder:t.placeholder,hint:t.hint,"persistent-hint":t.persistentHint,rules:t.rules,items:t.items,"item-text":t.itemText,"item-value":t.itemValue,"menu-props":{top:!1,offsetY:!0,closeOnClick:!0}},model:{value:t.data,callback:function(e){t.data=e},expression:"data"}})],1)]}))]},proxy:!0}],null,!0)})],1)}),[],!1,null,null,null);e.a=v.exports}}]);