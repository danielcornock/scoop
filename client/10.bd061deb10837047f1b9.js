(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{uGdE:function(t,a,n){"use strict";n.r(a),n.d(a,"SalaryModule",(function(){return tt}));var e=n("ofXK"),r=n("3Pt+"),o=n("tyNb"),i=n("zR64"),s=n("PCNd"),c=n("VPM5"),l=n("mrSG"),p=n("LvDl"),d=n("LRne"),m=n("JX91"),g=n("eIep"),u=n("URDK"),b=n("fXoL"),y=n("nhsl"),f=n("/JWr"),h=n("bP2Y"),x=n("oqkQ"),_=n("JqCM"),M=n("AicK"),C=n("uENB"),v=n("TT7+"),O=n("jht6");function P(t,a){if(1&t){const t=b.Rb();b.Ob(0),b.Mb(1,"app-form-errors",6),b.Qb(2,"button",7),b.Yb("click",(function(){return b.nc(t),b.ac(2).sendGrossSalary()})),b.yc(3," Get estimated deductions "),b.Pb(),b.Qb(4,"button",8),b.Yb("click",(function(){return b.nc(t),b.ac(2).logSameAsLastMonth()})),b.yc(5," Same as last time "),b.Pb(),b.Nb()}if(2&t){const t=b.ac(2);b.zb(1),b.ic("appFormErrors",t.errors)}}function w(t,a){1&t&&b.Mb(0,"ngx-form-input-number",3),2&t&&b.ic("formInputField",a.$implicit)}function S(t,a){if(1&t&&(b.Mb(0,"app-information",9),b.wc(1,w,1,1,"ngx-form-input-number",10),b.bc(2,"slice"),b.Mb(3,"app-form-errors",6),b.Qb(4,"div",11),b.Qb(5,"p",12),b.yc(6," Net Salary "),b.Pb(),b.Qb(7,"p",13),b.yc(8),b.bc(9,"currency"),b.bc(10,"async"),b.Pb(),b.Pb(),b.Mb(11,"app-form-submit",14)),2&t){const t=b.ac(2);b.zb(1),b.ic("ngForOf",b.dc(2,4,t.form.fields,2)),b.zb(2),b.ic("appFormErrors",t.errors),b.zb(5),b.Ac(" ",b.dc(9,7,b.cc(10,10,t.netSalary),"\xa3")," "),b.zb(3),b.ic("form",t.form.formGroup)}}function k(t,a){if(1&t){const t=b.Rb();b.Qb(0,"div",1),b.Qb(1,"form",2),b.Yb("ngSubmit",(function(){return b.nc(t),b.ac().submitForm()})),b.Mb(2,"ngx-form-input",3),b.Mb(3,"ngx-form-input-number",3),b.wc(4,P,6,1,"ng-container",4),b.wc(5,S,12,12,"ng-template",null,5,b.xc),b.Pb(),b.Pb()}if(2&t){const t=b.lc(6),a=b.ac();b.zb(1),b.ic("formGroup",a.form.formGroup),b.zb(1),b.ic("formInputField",a.form.fields[0]),b.zb(1),b.ic("formInputField",a.form.fields[1]),b.zb(1),b.ic("ngIf",!a.salaryDeductions)("ngIfElse",t)}}let F=(()=>{class t extends u.a{constructor(t,a,n,e,r,o,i,s){super(i,r,o,s,"salary"),this._formFactory=t,this._currentDateService=a,this._settingsService=n,this._httpService=e}ngOnInit(){const t=Object.create(null,{ngOnInit:{get:()=>super.ngOnInit}});return Object(l.a)(this,void 0,void 0,(function*(){const a=yield this._settingsService.getSettings();this._defaultSalary=a.data.salaryYearlySalary,t.ngOnInit.call(this)}))}submitForm(){const t=Object.create(null,{submitForm:{get:()=>super.submitForm}});return Object(l.a)(this,void 0,void 0,(function*(){this.salaryDeductions?t.submitForm.call(this):this.sendGrossSalary()}))}logSameAsLastMonth(){return Object(l.a)(this,void 0,void 0,(function*(){try{yield this._store.duplicate(this.form.value.date),this._router.navigateByUrl("salary")}catch({error:t}){this.errors=t}}))}sendGrossSalary(){return Object(l.a)(this,void 0,void 0,(function*(){if(this.form.getField("date").isInvalid||this.form.getField("grossSalary").isInvalid)this.form.formGroup.markAllAsTouched();else try{this._spinnerService.show();const{data:t}=yield this._httpService.post("salary/gross",{date:this.form.value.date,grossSalary:this.form.value.grossSalary});this.salaryDeductions=t,this._assignNewValuesToForm(),this._watchFormToCalculateNetSalary()}finally{this._spinnerService.hide()}}))}_createForm(){return this._formFactory.createForm([{name:"date",label:"Month",type:i.h.MONTH,defaultValue:this._currentDateService.getCurrentMonthAndYearForForm(),validators:{required:!0}},{name:"grossSalary",label:"Gross salary this month",type:i.h.NUMBER,defaultValue:this._getFormattedDefaultSalary(),tooltip:"Your gross salary is your salary before any deductions - this should also include your pension contributions if you are choosing to include them in the log.",validators:{required:!0}},{name:"incomeTax",label:"Income tax",type:i.h.NUMBER,validators:{required:!0}},{name:"nationalInsurance",label:"National insurance",type:i.h.NUMBER,validators:{required:!0}},{name:"studentFinance",label:"Student loans",type:i.h.NUMBER,validators:{required:!0}},{name:"pensionContributions",label:"Pension contribution",type:i.h.NUMBER,validators:{required:!0}},{name:"otherDeductions",label:"Other contributions",type:i.h.NUMBER,tooltip:"If you receive any tax-free reimbursements, these can be included here as a negative number.",validators:{required:!0}}])}_getFormattedDefaultSalary(){return this._defaultSalary&&Math.round(this._defaultSalary/12*100)/100}_assignNewValuesToForm(){const t=this.form.formGroup.controls;Object(p.forEach)(t,(t,a)=>{t.setValue(this.salaryDeductions[a]||t.value||0)})}_watchFormToCalculateNetSalary(){this.netSalary=this.form.formGroup.valueChanges.pipe(Object(m.a)(this.form.formGroup.value),Object(g.a)(t=>{const a=parseFloat(t.grossSalary)-parseFloat(t.incomeTax)-parseFloat(t.nationalInsurance)-parseFloat(t.studentFinance)-parseFloat(t.pensionContributions)-parseFloat(t.otherDeductions);return Object(d.a)(a)}))}}return t.\u0275fac=function(a){return new(a||t)(b.Lb(i.a),b.Lb(y.a),b.Lb(f.a),b.Lb(h.a),b.Lb(x.a),b.Lb(o.c),b.Lb(_.c),b.Lb(M.a))},t.\u0275cmp=b.Fb({type:t,selectors:[["app-salary-entry-form"]],features:[b.wb],decls:1,vars:1,consts:[["class","SalaryEntryForm-container animate-page-in",4,"ngIf"],[1,"SalaryEntryForm-container","animate-page-in"],[1,"SalaryEntryForm-form",3,"formGroup","ngSubmit"],[3,"formInputField"],[4,"ngIf","ngIfElse"],["fullForm",""],[3,"appFormErrors"],["type","button",1,"SalaryEntryForm-getDeductionsButton",3,"click"],["type","button",1,"SalaryEntryForm-sameAsLastMonthButton",3,"click"],["informationMessage","The following fields are an approximate estimation of your deductions. Feel free to customise each value to match your payslip."],[3,"formInputField",4,"ngFor","ngForOf"],[1,"SalaryEntryForm-remainingBalance"],[1,"SalaryEntryForm-label"],[1,"SalaryEntryForm-value"],["value","Save salary entry",1,"SalaryEntryForm-submit",3,"form"]],template:function(t,a){1&t&&b.wc(0,k,7,5,"div",0),2&t&&b.ic("ngIf",a.form)},directives:[e.m,r.t,r.k,r.e,i.i,i.e,C.a,v.a,e.l,O.a],pipes:[e.t,e.d,e.b],styles:['@keyframes zoom-in{0%{transform:scale(0)}to{transform:scale(1)}}.mat-menu-panel[_ngcontent-%COMP%]{min-height:0!important;border-radius:10px!important}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}  .mat-dialog-container{overflow:initial;border-radius:10px;padding:30px;position:relative}@media only screen and (max-width:540px){  .mat-dialog-container{padding:15px}}.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{overflow-y:auto!important}@media only screen and (max-width:540px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{padding:30px}}@media only screen and (max-width:450px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{padding:10px}}@media only screen and (max-width:540px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]   .cdk-overlay-pane[_ngcontent-%COMP%]{max-width:100%!important;width:100%}}input[_ngcontent-%COMP%]{-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:1}.toast-container[_ngcontent-%COMP%]{top:20px!important;right:20px!important}@media only screen and (max-width:540px){.toast-container[_ngcontent-%COMP%]{top:78px!important}}.ngx-toastr[_ngcontent-%COMP%]{width:400px!important;max-width:calc(100vw - 40px)!important;padding-left:80px!important;background-position:30px!important;border-radius:10px!important}@media only screen and (max-width:540px){.ngx-toastr[_ngcontent-%COMP%]{padding-left:50px!important;background-position:15px!important}}.toast-success[_ngcontent-%COMP%]{background-color:#48bb78!important}.toast-error[_ngcontent-%COMP%]{background-color:#fc8181!important}.toast-info[_ngcontent-%COMP%]{background-color:#6bace8!important}.animate-page-in[_ngcontent-%COMP%]{animation:enter-page .8s forwards}@media (prefers-reduced-motion){.animate-page-in[_ngcontent-%COMP%]{animation:initial}}.animate-page-in[_ngcontent-%COMP%]   .animate-list-item[_ngcontent-%COMP%]{animation:enter-list .5s forwards;transform-origin:middle}@media (prefers-reduced-motion){.animate-page-in[_ngcontent-%COMP%]   .animate-list-item[_ngcontent-%COMP%]{animation:initial}}@keyframes enter-list{0%{transform:scale(.9)}to{transform:scale(1)}}@keyframes enter-page{0%{opacity:0}to{opacity:1}}.is-negative[_ngcontent-%COMP%]{position:relative}.is-negative[_ngcontent-%COMP%]:after{content:"";position:absolute;height:8px;width:8px;border-radius:9999px;left:-15px;top:50%;transform:translateY(-50%);background-color:#fc8181}@media only screen and (max-width:1024px){.is-negative[_ngcontent-%COMP%]{color:#fc8181!important}.is-negative[_ngcontent-%COMP%]:after{content:normal}}.is-positive[_ngcontent-%COMP%]{position:relative}.is-positive[_ngcontent-%COMP%]:after{content:"";position:absolute;height:8px;width:8px;border-radius:9999px;left:-15px;top:50%;transform:translateY(-50%);background-color:#48bb78}@media only screen and (max-width:1024px){.is-positive[_ngcontent-%COMP%]{color:#48bb78!important}.is-positive[_ngcontent-%COMP%]:after{content:normal}}[_ngcontent-%COMP%]:root{--color-form-input-border:rgba(28,128,220,0.3);--color-form-input-border--focus:#6bace8}.SalaryEntryForm-container[_ngcontent-%COMP%]{padding:var(--spacing-page-top) var(--spacing-page-side);height:100%}@media only screen and (max-width:540px){.SalaryEntryForm-container[_ngcontent-%COMP%]{padding-top:calc(58px + var(--spacing-page-top))}}.SalaryEntryForm-form[_ngcontent-%COMP%]{max-width:400px}@media only screen and (max-width:540px){.SalaryEntryForm-form[_ngcontent-%COMP%]{max-width:100%}}.SalaryEntryForm-getDeductionsButton[_ngcontent-%COMP%]{padding:13px;text-align:center;font-weight:500;color:#fff;background-color:#3657dc;border:none;font-size:18px;border-radius:5px;cursor:pointer;transition:.1s;width:100%;text-decoration:none;margin-top:20px}.SalaryEntryForm-getDeductionsButton[_ngcontent-%COMP%]:hover{background-color:#2140be}.SalaryEntryForm-remainingBalance[_ngcontent-%COMP%]{background-color:rgba(54,87,220,.08);padding:30px;border-radius:10px;text-align:center;margin:20px 0}.SalaryEntryForm-label[_ngcontent-%COMP%]{font-size:16px;margin-bottom:10px;color:#2b6cb0}.SalaryEntryForm-value[_ngcontent-%COMP%]{font-size:24px;font-weight:500;color:#3657dc}.SalaryEntryForm-sameAsLastMonthButton[_ngcontent-%COMP%]{padding:13px;text-align:center;font-weight:500;color:#fff;background-color:#3657dc;font-size:18px;border-radius:5px;cursor:pointer;transition:.1s;width:100%;text-decoration:none;border:2px solid #3657dc;color:#3657dc;background-color:initial;margin-top:15px}.SalaryEntryForm-sameAsLastMonthButton[_ngcontent-%COMP%]:hover{background-color:#2140be;background-color:#fff}@media only screen and (max-width:540px){.SalaryEntryForm-submit[_ngcontent-%COMP%]{display:none}}']}),t})();var I=n("XNiG"),L=n("1G5W"),D=n("B6aI"),z=n("BAlU"),E=n("Fxv7"),A=n("dhrX"),j=n("L21D");let N=(()=>{class t{constructor(t){this._chartService=t}ngOnChanges(){const t=Object.keys(this.salaryDistributionChartData).map(p.startCase),a=Object.values(this.salaryDistributionChartData);this._chartService.createPieChart("salaryDeductionsChart",{labels:t,datasets:[{data:a,backgroundColor:[...E.b].reverse()}]},{legendPosition:"left"})}}return t.\u0275fac=function(a){return new(a||t)(b.Lb(A.a))},t.\u0275cmp=b.Fb({type:t,selectors:[["app-salary-distribution-chart"]],inputs:{salaryDistributionChartData:"salaryDistributionChartData"},features:[b.xb],decls:2,vars:0,consts:[["cardTitle","Deductions this month"],["id","salaryDeductionsChart"]],template:function(t,a){1&t&&(b.Qb(0,"app-card",0),b.Mb(1,"canvas",1),b.Pb())},directives:[j.a],styles:[""]}),t})(),T=(()=>{class t{constructor(t){this._chartService=t}ngOnChanges(){this._chartService.createLineChart("netSalaryChart",{labels:this._getArrayOfFields("date"),datasets:[{label:"Net Salary",data:this._getArrayOfFields("netSalary").map(Math.round),borderColor:"rgba(28,128,220, 1)",backgroundColor:"rgba(28,128,220, 0.08)",borderWidth:2},{label:"Gross Salary",data:this._getArrayOfFields("grossSalary").map(Math.round),borderColor:"rgba(28,128,220, 0.6)",backgroundColor:"rgba(28,128,220, 0.08)",borderWidth:2,borderDash:[5]}]})}_getArrayOfFields(t){return[...this.salaryLineChartData].reverse().map(a=>a[t])}}return t.\u0275fac=function(a){return new(a||t)(b.Lb(A.a))},t.\u0275cmp=b.Fb({type:t,selectors:[["app-salary-line-chart"]],inputs:{salaryLineChartData:"salaryLineChartData"},features:[b.xb],decls:2,vars:0,consts:[["cardTitle","Salary Over Time"],["id","netSalaryChart"]],template:function(t,a){1&t&&(b.Qb(0,"app-card",0),b.Mb(1,"canvas",1),b.Pb())},directives:[j.a],styles:[""]}),t})();var B=n("DFzi"),Q=n("U5Aj"),G=n("lTCs"),R=n("Xv+k"),Y=n("sJgw");let U=(()=>{class t{transform(t){return Object.values(t)}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275pipe=b.Kb({name:"values",type:t,pure:!0}),t})();var $=n("HZTh");function q(t,a){if(1&t&&(b.Qb(0,"td",4),b.yc(1),b.bc(2,"currency"),b.Pb()),2&t){const t=a.$implicit,n=b.ac().$implicit,e=b.ac();b.Db("is-negative","netSalary"===t&&n[t]<0)("is-positive","netSalary"===t&&n[t]>0),b.zb(1),b.Ac(" ",b.fc(2,5,n[t],e.preferredCurrency,"symbol","1.0-2")," ")}}function J(t,a){if(1&t){const t=b.Rb();b.Qb(0,"app-table-actions",7),b.Yb("tableActionsRemove",(function(){b.nc(t);const a=b.ac().$implicit;return b.ac().removeLog(a.date)})),b.Pb()}}function V(t,a){if(1&t){const t=b.Rb();b.Qb(0,"tr",3),b.Yb("click",(function(){b.nc(t);const n=a.$implicit;return b.ac().onLongPress(n.date)})),b.Qb(1,"td",4),b.yc(2),b.bc(3,"date"),b.Pb(),b.wc(4,q,3,10,"td",5),b.bc(5,"slice"),b.bc(6,"keys"),b.wc(7,J,1,0,"app-table-actions",6),b.Pb()}if(2&t){const t=a.$implicit,n=b.ac();b.zb(2),b.Ac(" ",b.dc(3,3,t.date,"MMMM y")," "),b.zb(2),b.ic("ngForOf",b.dc(5,6,b.cc(6,9,n.salaryLogMeta.fields),1)),b.zb(3),b.ic("ngIf",n.isEditing)}}let X=(()=>{class t extends B.a{constructor(t,a,n,e){super(e,n,"salary"),this._store=t,this._popupService=a}ngOnChanges(){this.preferredCurrency=this.salaryLogMeta.preferredCurrency}removeLog(t){return Object(l.a)(this,void 0,void 0,(function*(){try{yield this._store.delete(t)}catch({error:a}){this._popupService.showApiError(a)}}))}}return t.\u0275fac=function(a){return new(a||t)(b.Lb(x.a),b.Lb(Q.a),b.Lb(G.a),b.Lb(o.c))},t.\u0275cmp=b.Fb({type:t,selectors:[["app-salary-log"]],inputs:{salaryLogItems:"salaryLogItems",salaryLogMeta:"salaryLogMeta"},features:[b.wb,b.xb],decls:4,vars:5,consts:[["cardTitle","Monthly log",1,"SalaryLog-container",3,"cardActions"],[3,"tableColumns"],["class","SalaryLog-row",3,"click",4,"ngFor","ngForOf"],[1,"SalaryLog-row",3,"click"],[1,"SalaryLog-rowItem"],["class","SalaryLog-rowItem",3,"is-negative","is-positive",4,"ngFor","ngForOf"],["class","SalaryLog-rowItem",3,"tableActionsRemove",4,"ngIf"],[1,"SalaryLog-rowItem",3,"tableActionsRemove"]],template:function(t,a){1&t&&(b.Qb(0,"app-card",0),b.Qb(1,"app-table",1),b.bc(2,"values"),b.wc(3,V,8,11,"tr",2),b.Pb(),b.Pb()),2&t&&(b.ic("cardActions",a.cardActions),b.zb(1),b.ic("tableColumns",b.cc(2,3,a.salaryLogMeta.fields)),b.zb(2),b.ic("ngForOf",a.salaryLogItems))},directives:[j.a,R.a,e.l,e.m,Y.a],pipes:[U,e.f,e.t,$.a,e.d],styles:['@keyframes zoom-in{0%{transform:scale(0)}to{transform:scale(1)}}.mat-menu-panel[_ngcontent-%COMP%]{min-height:0!important;border-radius:10px!important}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}  .mat-dialog-container{overflow:initial;border-radius:10px;padding:30px;position:relative}@media only screen and (max-width:540px){  .mat-dialog-container{padding:15px}}.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{overflow-y:auto!important}@media only screen and (max-width:540px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{padding:30px}}@media only screen and (max-width:450px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{padding:10px}}@media only screen and (max-width:540px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]   .cdk-overlay-pane[_ngcontent-%COMP%]{max-width:100%!important;width:100%}}input[_ngcontent-%COMP%]{-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:1}.toast-container[_ngcontent-%COMP%]{top:20px!important;right:20px!important}@media only screen and (max-width:540px){.toast-container[_ngcontent-%COMP%]{top:78px!important}}.ngx-toastr[_ngcontent-%COMP%]{width:400px!important;max-width:calc(100vw - 40px)!important;padding-left:80px!important;background-position:30px!important;border-radius:10px!important}@media only screen and (max-width:540px){.ngx-toastr[_ngcontent-%COMP%]{padding-left:50px!important;background-position:15px!important}}.toast-success[_ngcontent-%COMP%]{background-color:#48bb78!important}.toast-error[_ngcontent-%COMP%]{background-color:#fc8181!important}.toast-info[_ngcontent-%COMP%]{background-color:#6bace8!important}.animate-page-in[_ngcontent-%COMP%]{animation:enter-page .8s forwards}@media (prefers-reduced-motion){.animate-page-in[_ngcontent-%COMP%]{animation:initial}}.animate-page-in[_ngcontent-%COMP%]   .animate-list-item[_ngcontent-%COMP%]{animation:enter-list .5s forwards;transform-origin:middle}@media (prefers-reduced-motion){.animate-page-in[_ngcontent-%COMP%]   .animate-list-item[_ngcontent-%COMP%]{animation:initial}}@keyframes enter-list{0%{transform:scale(.9)}to{transform:scale(1)}}@keyframes enter-page{0%{opacity:0}to{opacity:1}}.is-negative[_ngcontent-%COMP%]{position:relative}.is-negative[_ngcontent-%COMP%]:after{content:"";position:absolute;height:8px;width:8px;border-radius:9999px;left:-15px;top:50%;transform:translateY(-50%);background-color:#fc8181}@media only screen and (max-width:1024px){.is-negative[_ngcontent-%COMP%]{color:#fc8181!important}.is-negative[_ngcontent-%COMP%]:after{content:normal}}.is-positive[_ngcontent-%COMP%]{position:relative}.is-positive[_ngcontent-%COMP%]:after{content:"";position:absolute;height:8px;width:8px;border-radius:9999px;left:-15px;top:50%;transform:translateY(-50%);background-color:#48bb78}@media only screen and (max-width:1024px){.is-positive[_ngcontent-%COMP%]{color:#48bb78!important}.is-positive[_ngcontent-%COMP%]:after{content:normal}}[_ngcontent-%COMP%]:root{--color-form-input-border:rgba(28,128,220,0.3);--color-form-input-border--focus:#6bace8}.SalaryLog-row[_ngcontent-%COMP%]{padding:15px 0}.SalaryLog-row[_ngcontent-%COMP%]:hover{background-color:#eef2fd;cursor:pointer}.SalaryLog-rowItem[_ngcontent-%COMP%]{color:#5a5a5a;border-top:1px solid #e5e5e5;white-space:nowrap;padding:15px 15px 15px 0}']}),t})();function K(t,a){1&t&&(b.Ob(0),b.Mb(1,"app-information",5),b.Qb(2,"p",6),b.yc(3," To get started, create your first salary entry "),b.Qb(4,"a",7),b.yc(5,"here"),b.Pb(),b.yc(6,". "),b.Pb(),b.Qb(7,"p",6),b.yc(8," Please note that this feature is intended for UK tax residents only. To disable this feature, you can do so on the "),b.Qb(9,"a",8),b.yc(10,"user settings"),b.Pb(),b.yc(11," page. "),b.Pb(),b.Nb())}function W(t,a){if(1&t&&(b.Qb(0,"div",9),b.Mb(1,"app-dashboard-summary",10),b.Mb(2,"app-salary-distribution-chart",11),b.Mb(3,"app-salary-line-chart",12),b.Mb(4,"app-salary-log",13),b.Pb()),2&t){const t=b.ac(2);b.zb(1),b.ic("dashboardSummaryItems",t.summaryItems),b.zb(1),b.ic("salaryDistributionChartData",t.salaryMeta.latestDeductions),b.zb(1),b.ic("salaryLineChartData",t.salaryItems),b.zb(1),b.ic("salaryLogItems",t.salaryItems)("salaryLogMeta",t.salaryMeta)}}function H(t,a){if(1&t&&(b.Qb(0,"div",2),b.wc(1,K,12,0,"ng-container",3),b.wc(2,W,5,5,"ng-template",null,4,b.xc),b.Pb()),2&t){const t=b.lc(3),a=b.ac();b.zb(1),b.ic("ngIf",!a.salaryItems.length)("ngIfElse",t)}}const Z=[{path:"",component:(()=>{class t{constructor(t,a,n,e,r){this._store=t,this._spinnerService=a,this._currency=n,this._router=e,this._percent=r,this._destroy$=new I.a}ngOnInit(){return Object(l.a)(this,void 0,void 0,(function*(){this._store.getAll$().pipe(Object(L.a)(this._destroy$)).subscribe(this._processSalary.bind(this))}))}ngOnDestroy(){this._destroy$.next(),this._destroy$.complete()}createNew(){this._router.navigateByUrl("salary/create")}_processSalary({data:t,meta:a}){return Object(l.a)(this,void 0,void 0,(function*(){this.salaryItems=t,this.salaryMeta=a,this._processSummaryItems(a.summaryItems)}))}_processSummaryItems(t){const a=this.salaryMeta.summaryItems;a&&(this.summaryItems=[{label:"Annual Gross Salary",value:this._toCurrency(a.grossSalary),icon:"dollar-sign"},{label:"Annual Net Salary",value:this._toCurrency(a.netSalary),icon:"user-plus"},{label:"Annual Tax Paid",value:this._toCurrency(a.taxPaid),icon:"chevrons-down"},{label:"Projected Gross Salary",value:this._toCurrency(a.projectedGrossSalary),icon:"calendar"},{label:"Projected Net Salary",value:this._toCurrency(a.projectedNetSalary),icon:"trending-up"},{label:"Annual Take Home",value:this._toPercentage(a.netSalaryOverGrossSalary),icon:"home"},{label:"Annual Tax Percentage",value:this._toPercentage(a.taxPercentage),icon:"percent"},{label:"Projected Tax Return",value:this._toCurrency(a.projectedTaxReturn),icon:"corner-down-left"}])}_toCurrency(t){return this._currency.transform(t,this.salaryMeta.preferredCurrency,"symbol","1.0-0")}_toPercentage(t){return this._percent.transform(t,"1.0-2")}}return t.\u0275fac=function(a){return new(a||t)(b.Lb(x.a),b.Lb(_.c),b.Lb(e.d),b.Lb(o.c),b.Lb(e.r))},t.\u0275cmp=b.Fb({type:t,selectors:[["app-salary"]],decls:2,vars:1,consts:[["class","Salary-container animate-page-in",4,"ngIf"],["floatingActionButtonText","New log","floatingActionButtonIcon","plus",3,"floatingActionButtonClick"],[1,"Salary-container","animate-page-in"],[4,"ngIf","ngIfElse"],["content",""],["informationMessage","Please note, this section is still an experimental feature and therefore there may be some issues. If you find any, feel free to tweet us at @scoopfinanceuk.",1,"Salary-information"],[1,"Salary-noItems"],["routerLink","create"],["routerLink","../user-settings"],[1,"Salary-content"],[1,"Salary-item","Salary-summary",3,"dashboardSummaryItems"],[1,"Salary-item","Salary-distribution","animate-list-item",3,"salaryDistributionChartData"],[1,"Salary-item","Salary-line","animate-list-item",3,"salaryLineChartData"],[1,"Salary-item","Salary-log","animate-list-item",3,"salaryLogItems","salaryLogMeta"]],template:function(t,a){1&t&&(b.wc(0,H,4,2,"div",0),b.Qb(1,"app-floating-action-button",1),b.Yb("floatingActionButtonClick",(function(){return a.createNew()})),b.Pb()),2&t&&b.ic("ngIf",a.salaryItems)},directives:[e.m,D.a,v.a,o.e,z.a,N,T,X],styles:['@keyframes zoom-in{0%{transform:scale(0)}to{transform:scale(1)}}.mat-menu-panel[_ngcontent-%COMP%]{min-height:0!important;border-radius:10px!important}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}  .mat-dialog-container{overflow:initial;border-radius:10px;padding:30px;position:relative}@media only screen and (max-width:540px){  .mat-dialog-container{padding:15px}}.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{overflow-y:auto!important}@media only screen and (max-width:540px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{padding:30px}}@media only screen and (max-width:450px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{padding:10px}}@media only screen and (max-width:540px){.cdk-global-overlay-wrapper[_ngcontent-%COMP%]   .cdk-overlay-pane[_ngcontent-%COMP%]{max-width:100%!important;width:100%}}input[_ngcontent-%COMP%]{-webkit-appearance:none;-moz-appearance:none;appearance:none;opacity:1}.toast-container[_ngcontent-%COMP%]{top:20px!important;right:20px!important}@media only screen and (max-width:540px){.toast-container[_ngcontent-%COMP%]{top:78px!important}}.ngx-toastr[_ngcontent-%COMP%]{width:400px!important;max-width:calc(100vw - 40px)!important;padding-left:80px!important;background-position:30px!important;border-radius:10px!important}@media only screen and (max-width:540px){.ngx-toastr[_ngcontent-%COMP%]{padding-left:50px!important;background-position:15px!important}}.toast-success[_ngcontent-%COMP%]{background-color:#48bb78!important}.toast-error[_ngcontent-%COMP%]{background-color:#fc8181!important}.toast-info[_ngcontent-%COMP%]{background-color:#6bace8!important}.animate-page-in[_ngcontent-%COMP%]{animation:enter-page .8s forwards}@media (prefers-reduced-motion){.animate-page-in[_ngcontent-%COMP%]{animation:initial}}.animate-page-in[_ngcontent-%COMP%]   .animate-list-item[_ngcontent-%COMP%]{animation:enter-list .5s forwards;transform-origin:middle}@media (prefers-reduced-motion){.animate-page-in[_ngcontent-%COMP%]   .animate-list-item[_ngcontent-%COMP%]{animation:initial}}@keyframes enter-list{0%{transform:scale(.9)}to{transform:scale(1)}}@keyframes enter-page{0%{opacity:0}to{opacity:1}}.is-negative[_ngcontent-%COMP%]{position:relative}.is-negative[_ngcontent-%COMP%]:after{content:"";position:absolute;height:8px;width:8px;border-radius:9999px;left:-15px;top:50%;transform:translateY(-50%);background-color:#fc8181}@media only screen and (max-width:1024px){.is-negative[_ngcontent-%COMP%]{color:#fc8181!important}.is-negative[_ngcontent-%COMP%]:after{content:normal}}.is-positive[_ngcontent-%COMP%]{position:relative}.is-positive[_ngcontent-%COMP%]:after{content:"";position:absolute;height:8px;width:8px;border-radius:9999px;left:-15px;top:50%;transform:translateY(-50%);background-color:#48bb78}@media only screen and (max-width:1024px){.is-positive[_ngcontent-%COMP%]{color:#48bb78!important}.is-positive[_ngcontent-%COMP%]:after{content:normal}}[_ngcontent-%COMP%]:root{--color-form-input-border:rgba(28,128,220,0.3);--color-form-input-border--focus:#6bace8}@media only screen and (max-width:1450px){[_nghost-%COMP%]     .DashboardSummary-container{min-height:350px}}@media only screen and (max-width:540px){[_nghost-%COMP%]     .DashboardSummary-container{min-height:unset}}.Salary-container[_ngcontent-%COMP%]{padding:var(--spacing-page-top) var(--spacing-page-side);height:100%}@media only screen and (max-width:540px){.Salary-container[_ngcontent-%COMP%]{padding-top:calc(58px + var(--spacing-page-top))}}.Salary-noItems[_ngcontent-%COMP%]{color:#5a5a5a;margin-bottom:20px;max-width:700px;line-height:160%;font-size:18px}.Salary-noItems[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#3657dc;font-weight:500;text-decoration:none}.Salary-noItems[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.Salary-item[_ngcontent-%COMP%]{display:block;min-width:0}@media only screen and (max-width:1024px){.Salary-item[_ngcontent-%COMP%] + .Salary-item[_ngcontent-%COMP%]{margin-top:30px}}@media only screen and (max-width:540px){.Salary-item[_ngcontent-%COMP%] + .Salary-item[_ngcontent-%COMP%]{margin-top:20px}}.Salary-information[_ngcontent-%COMP%]{margin-top:0;max-width:700px}.Salary-content[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;grid-gap:30px 20px;grid-template-areas:"summary summary" "distribution line" "log log"}@media only screen and (max-width:1024px){.Salary-content[_ngcontent-%COMP%]{display:block}}.Salary-summary[_ngcontent-%COMP%]{grid-area:summary}.Salary-distribution[_ngcontent-%COMP%]{grid-area:distribution}.Salary-line[_ngcontent-%COMP%]{grid-area:line}.Salary-log[_ngcontent-%COMP%]{grid-area:log}']}),t})()},{path:"create",component:F,canDeactivate:[c.a]}];let tt=(()=>{class t{}return t.\u0275mod=b.Jb({type:t}),t.\u0275inj=b.Ib({factory:function(a){return new(a||t)},providers:[e.d,e.r],imports:[[e.c,s.a,i.j,r.f,r.p,o.f.forChild(Z)]]}),t})()}}]);