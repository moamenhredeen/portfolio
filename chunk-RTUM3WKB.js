import{a as X,b as Ee,c as we,e as Fe,h as Ie,i as Oe,k as xe}from"./chunk-33ZSEJ3O.js";import{$a as a,A as ce,Ga as ge,Ja as l,Ka as o,M as de,Ma as K,Oa as T,P as z,Pa as E,Q as Z,R as b,T as m,Ta as me,V as he,Va as w,Wa as ve,Xa as ye,Y as N,Ya as _e,Z as M,Za as Ce,_ as v,_a as c,a as u,ab as j,b as f,cb as Y,db as Ve,ea as fe,hb as d,i as P,ib as p,ja as pe,jb as De,kb as J,l as ae,lb as R,mb as be,na as k,nb as Me,pb as Ae,q as le,qa as A,w as ue,yb as G,zb as y}from"./chunk-JILIO3XY.js";var Re=(()=>{let e=class e{constructor(n,r){this._renderer=n,this._elementRef=r,this.onChange=s=>{},this.onTouched=()=>{}}setProperty(n,r){this._renderer.setProperty(this._elementRef.nativeElement,n,r)}registerOnTouched(n){this.onTouched=n}registerOnChange(n){this.onChange=n}setDisabledState(n){this.setProperty("disabled",n)}};e.\u0275fac=function(r){return new(r||e)(o(K),o(A))},e.\u0275dir=v({type:e});let t=e;return t})(),st=(()=>{let e=class e extends Re{};e.\u0275fac=(()=>{let n;return function(s){return(n||(n=pe(e)))(s||e)}})(),e.\u0275dir=v({type:e,features:[E]});let t=e;return t})(),Ge=new m("");var ot={provide:Ge,useExisting:z(()=>$),multi:!0};function at(){let t=X()?X().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var lt=new m(""),$=(()=>{let e=class e extends Re{constructor(n,r,s){super(n,r),this._compositionMode=s,this._composing=!1,this._compositionMode==null&&(this._compositionMode=!at())}writeValue(n){let r=n??"";this.setProperty("value",r)}_handleInput(n){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(n)}_compositionStart(){this._composing=!0}_compositionEnd(n){this._composing=!1,this._compositionMode&&this.onChange(n)}};e.\u0275fac=function(r){return new(r||e)(o(K),o(A),o(lt,8))},e.\u0275dir=v({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(r,s){r&1&&Y("input",function(g){return s._handleInput(g.target.value)})("blur",function(){return s.onTouched()})("compositionstart",function(){return s._compositionStart()})("compositionend",function(g){return s._compositionEnd(g.target.value)})},features:[J([ot]),E]});let t=e;return t})();var ut=new m(""),ct=new m("");function Be(t){return t!=null}function Ue(t){return Ae(t)?ae(t):t}function He(t){let e={};return t.forEach(i=>{e=i!=null?u(u({},e),i):e}),Object.keys(e).length===0?null:e}function Le(t,e){return e.map(i=>i(t))}function dt(t){return!t.validate}function $e(t){return t.map(e=>dt(e)?e:i=>e.validate(i))}function ht(t){if(!t)return null;let e=t.filter(Be);return e.length==0?null:function(i){return He(Le(i,e))}}function We(t){return t!=null?ht($e(t)):null}function ft(t){if(!t)return null;let e=t.filter(Be);return e.length==0?null:function(i){let n=Le(i,e).map(Ue);return ue(n).pipe(le(He))}}function qe(t){return t!=null?ft($e(t)):null}function Se(t,e){return t===null?[e]:Array.isArray(t)?[...t,e]:[t,e]}function ze(t){return t._rawValidators}function Ze(t){return t._rawAsyncValidators}function Q(t){return t?Array.isArray(t)?t:[t]:[]}function U(t,e){return Array.isArray(t)?t.includes(e):t===e}function Pe(t,e){let i=Q(e);return Q(t).forEach(r=>{U(i,r)||i.push(r)}),i}function Ne(t,e){return Q(e).filter(i=>!U(t,i))}var ee=class{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=We(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=qe(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,i){return this.control?this.control.hasError(e,i):!1}getError(e,i){return this.control?this.control.getError(e,i):null}};var S=class extends ee{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}},te=class{constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}},pt={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},si=f(u({},pt),{"[class.ng-submitted]":"isSubmitted"}),Ke=(()=>{let e=class e extends te{constructor(n){super(n)}};e.\u0275fac=function(r){return new(r||e)(o(S,2))},e.\u0275dir=v({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(r,s){r&2&&ve("ng-untouched",s.isUntouched)("ng-touched",s.isTouched)("ng-pristine",s.isPristine)("ng-dirty",s.isDirty)("ng-valid",s.isValid)("ng-invalid",s.isInvalid)("ng-pending",s.isPending)},features:[E]});let t=e;return t})();var F="VALID",B="INVALID",_="PENDING",I="DISABLED",V=class{},H=class extends V{constructor(e,i){super(),this.value=e,this.source=i}},O=class extends V{constructor(e,i){super(),this.pristine=e,this.source=i}},x=class extends V{constructor(e,i){super(),this.touched=e,this.source=i}},C=class extends V{constructor(e,i){super(),this.status=e,this.source=i}};function gt(t){return(W(t)?t.validators:t)||null}function mt(t){return Array.isArray(t)?We(t):t||null}function vt(t,e){return(W(e)?e.asyncValidators:t)||null}function yt(t){return Array.isArray(t)?qe(t):t||null}function W(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}var ie=class{constructor(e,i){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=null,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this._status=G(()=>this.statusReactive()),this.statusReactive=T(void 0),this._pristine=G(()=>this.pristineReactive()),this.pristineReactive=T(!0),this._touched=G(()=>this.touchedReactive()),this.touchedReactive=T(!1),this._events=new P,this.events=this._events.asObservable(),this._onDisabledChange=[],this._assignValidators(e),this._assignAsyncValidators(i)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return y(this.statusReactive)}set status(e){y(()=>this.statusReactive.set(e))}get valid(){return this.status===F}get invalid(){return this.status===B}get pending(){return this.status==_}get disabled(){return this.status===I}get enabled(){return this.status!==I}get pristine(){return y(this.pristineReactive)}set pristine(e){y(()=>this.pristineReactive.set(e))}get dirty(){return!this.pristine}get touched(){return y(this.touchedReactive)}set touched(e){y(()=>this.touchedReactive.set(e))}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(Pe(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(Pe(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(Ne(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(Ne(e,this._rawAsyncValidators))}hasValidator(e){return U(this._rawValidators,e)}hasAsyncValidator(e){return U(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let i=this.touched===!1;this.touched=!0;let n=e.sourceControl??this;this._parent&&!e.onlySelf&&this._parent.markAsTouched(f(u({},e),{sourceControl:n})),i&&e.emitEvent!==!1&&this._events.next(new x(!0,n))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(i=>i.markAllAsTouched(e))}markAsUntouched(e={}){let i=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=e.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:n})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e,n),i&&e.emitEvent!==!1&&this._events.next(new x(!1,n))}markAsDirty(e={}){let i=this.pristine===!0;this.pristine=!1;let n=e.sourceControl??this;this._parent&&!e.onlySelf&&this._parent.markAsDirty(f(u({},e),{sourceControl:n})),i&&e.emitEvent!==!1&&this._events.next(new O(!1,n))}markAsPristine(e={}){let i=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=e.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e,n),i&&e.emitEvent!==!1&&this._events.next(new O(!0,n))}markAsPending(e={}){this.status=_;let i=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new C(this.status,i)),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.markAsPending(f(u({},e),{sourceControl:i}))}disable(e={}){let i=this._parentMarkedDirty(e.onlySelf);this.status=I,this.errors=null,this._forEachChild(r=>{r.disable(f(u({},e),{onlySelf:!0}))}),this._updateValue();let n=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new H(this.value,n)),this._events.next(new C(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(f(u({},e),{skipPristineCheck:i}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(e={}){let i=this._parentMarkedDirty(e.onlySelf);this.status=F,this._forEachChild(n=>{n.enable(f(u({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(f(u({},e),{skipPristineCheck:i}),this),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(e,i){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine({},i),this._parent._updateTouched({},i))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===F||this.status===_)&&this._runAsyncValidator(n,e.emitEvent)}let i=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new H(this.value,i)),this._events.next(new C(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(f(u({},e),{sourceControl:i}))}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(i=>i._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?I:F}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,i){if(this.asyncValidator){this.status=_,this._hasOwnPendingAsyncValidator={emitEvent:i!==!1};let n=Ue(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:i,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=this._hasOwnPendingAsyncValidator?.emitEvent??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,i={}){this.errors=e,this._updateControlsErrors(i.emitEvent!==!1,this,i.shouldHaveEmitted)}get(e){let i=e;return i==null||(Array.isArray(i)||(i=i.split(".")),i.length===0)?null:i.reduce((n,r)=>n&&n._find(r),this)}getError(e,i){let n=i?this.get(i):this;return n&&n.errors?n.errors[e]:null}hasError(e,i){return!!this.getError(e,i)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,i,n){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||n)&&this._events.next(new C(this.status,i)),this._parent&&this._parent._updateControlsErrors(e,i,n)}_initObservables(){this.valueChanges=new k,this.statusChanges=new k}_calculateStatus(){return this._allControlsDisabled()?I:this.errors?B:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(_)?_:this._anyControlsHaveStatus(B)?B:F}_anyControlsHaveStatus(e){return this._anyControls(i=>i.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,i){let n=!this._anyControlsDirty(),r=this.pristine!==n;this.pristine=n,this._parent&&!e.onlySelf&&this._parent._updatePristine(e,i),r&&this._events.next(new O(this.pristine,i))}_updateTouched(e={},i){this.touched=this._anyControlsTouched(),this._events.next(new x(this.touched,i)),this._parent&&!e.onlySelf&&this._parent._updateTouched(e,i)}_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){W(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){let i=this._parent&&this._parent.dirty;return!e&&!!i&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=mt(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=yt(this._rawAsyncValidators)}};var re=new m("CallSetDisabledState",{providedIn:"root",factory:()=>q}),q="always";function _t(t,e,i=q){Vt(t,e),e.valueAccessor.writeValue(t.value),(t.disabled||i==="always")&&e.valueAccessor.setDisabledState?.(t.disabled),bt(t,e),At(t,e),Mt(t,e),Ct(t,e)}function ke(t,e,i=!0){let n=()=>{};e.valueAccessor&&(e.valueAccessor.registerOnChange(n),e.valueAccessor.registerOnTouched(n)),Dt(t,e),t&&(e._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function L(t,e){t.forEach(i=>{i.registerOnValidatorChange&&i.registerOnValidatorChange(e)})}function Ct(t,e){if(e.valueAccessor.setDisabledState){let i=n=>{e.valueAccessor.setDisabledState(n)};t.registerOnDisabledChange(i),e._registerOnDestroy(()=>{t._unregisterOnDisabledChange(i)})}}function Vt(t,e){let i=ze(t);e.validator!==null?t.setValidators(Se(i,e.validator)):typeof i=="function"&&t.setValidators([i]);let n=Ze(t);e.asyncValidator!==null?t.setAsyncValidators(Se(n,e.asyncValidator)):typeof n=="function"&&t.setAsyncValidators([n]);let r=()=>t.updateValueAndValidity();L(e._rawValidators,r),L(e._rawAsyncValidators,r)}function Dt(t,e){let i=!1;if(t!==null){if(e.validator!==null){let r=ze(t);if(Array.isArray(r)&&r.length>0){let s=r.filter(h=>h!==e.validator);s.length!==r.length&&(i=!0,t.setValidators(s))}}if(e.asyncValidator!==null){let r=Ze(t);if(Array.isArray(r)&&r.length>0){let s=r.filter(h=>h!==e.asyncValidator);s.length!==r.length&&(i=!0,t.setAsyncValidators(s))}}}let n=()=>{};return L(e._rawValidators,n),L(e._rawAsyncValidators,n),i}function bt(t,e){e.valueAccessor.registerOnChange(i=>{t._pendingValue=i,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&Ye(t,e)})}function Mt(t,e){e.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&Ye(t,e),t.updateOn!=="submit"&&t.markAsTouched()})}function Ye(t,e){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function At(t,e){let i=(n,r)=>{e.valueAccessor.writeValue(n),r&&e.viewToModelUpdate(n)};t.registerOnChange(i),e._registerOnDestroy(()=>{t._unregisterOnChange(i)})}function Et(t,e){if(!t.hasOwnProperty("model"))return!1;let i=t.model;return i.isFirstChange()?!0:!Object.is(e,i.currentValue)}function wt(t){return Object.getPrototypeOf(t.constructor)===st}function Ft(t,e){if(!e)return null;Array.isArray(e);let i,n,r;return e.forEach(s=>{s.constructor===$?i=s:wt(s)?n=s:r=s}),r||n||i||null}function Te(t,e){let i=t.indexOf(e);i>-1&&t.splice(i,1)}function je(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var Je=class extends ie{constructor(e=null,i,n){super(gt(i),vt(n,i)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(e),this._setUpdateStrategy(i),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),W(i)&&(i.nonNullable||i.initialValueIsDefault)&&(je(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,i={}){this.value=this._pendingValue=e,this._onChange.length&&i.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,i.emitViewToModelChange!==!1)),this.updateValueAndValidity(i)}patchValue(e,i={}){this.setValue(e,i)}reset(e=this.defaultValue,i={}){this._applyFormState(e),this.markAsPristine(i),this.markAsUntouched(i),this.setValue(this.value,i),this._pendingChange=!1}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){Te(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){Te(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){je(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var Xe=new m(""),It={provide:S,useExisting:z(()=>se)},se=(()=>{let e=class e extends S{set isDisabled(n){}constructor(n,r,s,h,g){super(),this._ngModelWarningConfig=h,this.callSetDisabledState=g,this.update=new k,this._ngModelWarningSent=!1,this._setValidators(n),this._setAsyncValidators(r),this.valueAccessor=Ft(this,s)}ngOnChanges(n){if(this._isControlChanged(n)){let r=n.form.previousValue;r&&ke(r,this,!1),_t(this.form,this,this.callSetDisabledState),this.form.updateValueAndValidity({emitEvent:!1})}Et(n,this.viewModel)&&(this.form.setValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.form&&ke(this.form,this,!1)}get path(){return[]}get control(){return this.form}viewToModelUpdate(n){this.viewModel=n,this.update.emit(n)}_isControlChanged(n){return n.hasOwnProperty("form")}};e._ngModelWarningSentOnce=!1,e.\u0275fac=function(r){return new(r||e)(o(ut,10),o(ct,10),o(Ge,10),o(Xe,8),o(re,8))},e.\u0275dir=v({type:e,selectors:[["","formControl",""]],inputs:{form:[0,"formControl","form"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},exportAs:["ngForm"],features:[J([It]),E,fe]});let t=e;return t})();var Qe=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=M({type:e}),e.\u0275inj=b({});let t=e;return t})();var et=(()=>{let e=class e{static withConfig(n){return{ngModule:e,providers:[{provide:re,useValue:n.callSetDisabledState??q}]}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=M({type:e}),e.\u0275inj=b({imports:[Qe]});let t=e;return t})(),tt=(()=>{let e=class e{static withConfig(n){return{ngModule:e,providers:[{provide:Xe,useValue:n.warnOnNgModelWithFormControl??"always"},{provide:re,useValue:n.callSetDisabledState??q}]}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=M({type:e}),e.\u0275inj=b({imports:[Qe]});let t=e;return t})();var D=[{id:"angular-change-detection",title:"Angular Change Detection",description:"brief introduction to angular change detection and zone.js",date:"20 12 2024",status:"in progress",url:"angular-change-detection.html",author:"moamen hredeen"},{id:"angular-signals",title:"Angular Signals",description:"what are they what advantages do they offer more than current change detection mechanism",date:"20 12 2024",status:"in progress",url:"angular-signals.html",author:"moamen hredeen"},{id:"hello-world",title:"hello world",description:"who i'm i and what do i do",date:"20 12 2024",status:"in progress",url:"intro.html",author:"moamen hredeen"},{id:"java-performance",title:"Java Performance",description:"Jvm jit is fascinating piece of software. in this post we are going to take a look at the jvm internals and the jit",date:"20 12 2024",status:"in progress",url:"java-performance.html",author:"moamen hredeen"}];var St=(t,e)=>e.id;function Pt(t,e){if(t&1&&(c(0,"li",3)(1,"div")(2,"small"),d(3),a(),c(4,"p"),d(5),be(6,"uppercase"),a()(),c(7,"h2"),d(8),a(),c(9,"p"),d(10),a()()),t&2){let i=e.$implicit;w("routerLink",i.id),l(3),p(i.date),l(2),p(Me(6,5,i.status)),l(3),p(i.title),l(2),p(i.description)}}function Nt(t,e){if(t&1&&(c(0,"ul"),_e(1,Pt,11,7,"li",3,St),a()),t&2){let i=Ve();l(),Ce(i.filteredPosts)}}function kt(t,e){t&1&&(c(0,"div",2)(1,"h1"),d(2,"no posts were found"),a()())}var it=(()=>{let e=class e{constructor(){this.searchKeyword=new Je(""),this.filteredPosts=[...D],this.destroy$=new P}ngOnInit(){this.searchKeyword.valueChanges.pipe(ce(100),de(this.destroy$)).subscribe({next:n=>{console.log(n),(n===void 0||n==="")&&(this.filteredPosts=[...D]),this.filteredPosts=D.filter(r=>r.title.toLowerCase().includes(n.toLowerCase()))}})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=N({type:e,selectors:[["ng-component"]],standalone:!0,features:[R],decls:4,vars:2,consts:[[1,"blog","page-container"],["type","text","placeholder","Search for blog post",3,"formControl"],[1,"empty"],[3,"routerLink"]],template:function(r,s){r&1&&(c(0,"div",0),j(1,"input",1),me(2,Nt,3,0,"ul")(3,kt,3,0,"div",2),a()),r&2&&(l(),w("formControl",s.searchKeyword),l(),ye(s.filteredPosts.length>0?2:3))},dependencies:[xe,et,$,Ke,tt,se,we],styles:[".blog[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;outline:none;background:var(--surface-container);padding:1.2rem;width:100%;font-size:1rem;border-radius:.2rem;margin:2rem 0}.blog[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none}.blog[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:2rem;border-bottom:1px solid var(--on-surface);cursor:pointer}.blog[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.blog[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--on-surface-variant)}.blog[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background:var(--surface-container-low)}.blog[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;color:var(--on-surface-variant)}.blog[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:4rem 0;font-weight:400}@media screen and (max-width: 1000px){.blog[_ngcontent-%COMP%]{width:75%}}@media screen and (max-width: 800px){.blog[_ngcontent-%COMP%]{width:90%}}"]});let t=e;return t})();var oe=class{constructor(e,i){this._document=i;let n=this._textarea=this._document.createElement("textarea"),r=n.style;r.position="fixed",r.top=r.opacity="0",r.left="-999em",n.setAttribute("aria-hidden","true"),n.value=e,n.readOnly=!0,(this._document.fullscreenElement||this._document.body).appendChild(n)}copy(){let e=this._textarea,i=!1;try{if(e){let n=this._document.activeElement;e.select(),e.setSelectionRange(0,e.value.length),i=this._document.execCommand("copy"),n&&n.focus()}}catch{}return i}destroy(){let e=this._textarea;e&&(e.remove(),this._textarea=void 0)}},nt=(()=>{let e=class e{constructor(n){this._document=n}copy(n){let r=this.beginCopy(n),s=r.copy();return r.destroy(),s}beginCopy(n){return new oe(n,this._document)}};e.\u0275fac=function(r){return new(r||e)(he(Ee))},e.\u0275prov=Z({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var rt=(()=>{let e=class e{constructor(n,r,s,h,g){this.activeRoute=n,this.http=r,this.sanitizer=s,this.elementRef=h,this.clipboard=g,this.content="loading..."}ngOnInit(){let n=this.activeRoute.snapshot.params.id;this.post=D.find(r=>r.id===n),this.post&&this.http.get(`posts/generated/${this.post.url}`,{responseType:"text"}).subscribe(r=>{let s=this.sanitizer.bypassSecurityTrustHtml(r);this.content=s})}ngAfterViewInit(){setTimeout(()=>{this.elementRef.nativeElement.querySelectorAll(".copy-code-snippet").forEach(n=>{console.log(n),n.addEventListener("click",r=>{let s=r.target.parentElement.querySelector("code")?.innerText;this.clipboard.copy(s||""),n.innerHTML="copied",n.style.background="var(--success)",setTimeout(()=>{n.innerHTML="copy",n.style.background="var(--warning)"},2e3)})})},100)}};e.\u0275fac=function(r){return new(r||e)(o(Oe),o(Fe),o(Ie),o(A),o(nt))},e.\u0275cmp=N({type:e,selectors:[["app-post"]],standalone:!0,features:[R],decls:14,vars:4,consts:[[1,"blog-post","page-container"],[1,"content"],[1,"blog-post-content",3,"innerHTML"]],template:function(r,s){r&1&&(c(0,"div",0)(1,"div",1)(2,"header")(3,"h1"),d(4),a(),c(5,"p")(6,"span"),d(7,"Publish Date: "),a(),d(8),a(),c(9,"p")(10,"span"),d(11,"Status:"),a(),d(12),a()(),j(13,"section",2),a()()),r&2&&(l(4),p(s.post==null?null:s.post.title),l(4),p(s.post==null?null:s.post.date),l(4),De(" ",s.post==null?null:s.post.status,""),l(),w("innerHTML",s.content,ge))},styles:[".blog-post[_ngcontent-%COMP%]{display:flex}header[_ngcontent-%COMP%]{padding-bottom:1rem;border-bottom:1px solid var(--on-surface)}header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:700}"]});let t=e;return t})();var Mi=[{path:"",component:it},{path:":id",component:rt}];export{Mi as routes};