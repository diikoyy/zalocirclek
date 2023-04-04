/*! For license information please see server_zalo.js.LICENSE.txt */
(()=>{var t={531:t=>{"use strict";t.exports=require("@google-cloud/local-auth")},455:t=>{"use strict";t.exports=require("compression")},860:t=>{"use strict";t.exports=require("express")},231:t=>{"use strict";t.exports=require("fs")},993:t=>{"use strict";t.exports=require("googleapis")},423:t=>{"use strict";t.exports=require("path")},369:t=>{"use strict";t.exports=require("process")}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";e=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},u=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),u=new j(n||[]);return a(i,"_invoke",{value:S(t,r,u)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=f;var p={};function d(){}function v(){}function y(){}var g={};l(g,u,(function(){return this}));var m=Object.getPrototypeOf,w=m&&m(m(k([])));w&&w!==n&&o.call(w,u)&&(g=w);var x=y.prototype=d.prototype=Object.create(g);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function L(e,r){function n(a,i,u,c){var s=h(e[a],e,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==t(f)&&o.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,u,c)}),(function(t){n("throw",t,u,c)})):r.resolve(f).then((function(t){l.value=t,u(l)}),(function(t){return n("throw",t,u,c)}))}c(s.arg)}var i;a(this,"_invoke",{value:function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return i=i?i.then(o,o):o()}})}function S(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return{value:void 0,done:!0}}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var u=E(i,r);if(u){if(u===p)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=h(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function E(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function k(t){if(t){var e=t[u];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:_}}function _(){return{value:void 0,done:!0}}return v.prototype=y,a(x,"constructor",{value:y,configurable:!0}),a(y,"constructor",{value:v,configurable:!0}),v.displayName=l(y,s,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},r.awrap=function(t){return{__await:t}},b(L.prototype),l(L.prototype,c,(function(){return this})),r.AsyncIterator=L,r.async=function(t,e,n,o,a){void 0===a&&(a=Promise);var i=new L(f(t,e,n,o),a);return r.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(x),l(x,s,"Generator"),l(x,u,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=k,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n],i=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},r}function n(t,e,r,n,o,a,i){try{var u=t[a](i),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,a){var i=t.apply(e,r);function u(t){n(i,o,a,u,c,"next",t)}function c(t){n(i,o,a,u,c,"throw",t)}u(void 0)}))}}var a=r(860),i=a(),u=r(231).promises,c=r(423),s=r(369),l=r(531).authenticate,f=r(993).google,h=r(455),p=["https://www.googleapis.com/auth/spreadsheets.readonly"],d=c.join(s.cwd(),"circlekToken.json"),v=c.join(s.cwd(),"circlekCredentials.json");function y(){return g.apply(this,arguments)}function g(){return(g=o(e().mark((function t(){var r,n;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.readFile(d);case 3:return r=t.sent,n=JSON.parse(r),t.abrupt("return",f.auth.fromJSON(n));case 8:return t.prev=8,t.t0=t.catch(0),t.abrupt("return",null);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))).apply(this,arguments)}function m(t){return w.apply(this,arguments)}function w(){return(w=o(e().mark((function t(r){var n,o,a,i;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.readFile(v);case 2:return n=t.sent,o=JSON.parse(n),a=o.installed,i=JSON.stringify({type:"authorized_user",client_id:a.client_id,client_secret:a.client_secret,refresh_token:r.credentials.refresh_token}),t.next=8,u.writeFile(d,i);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function x(){return b.apply(this,arguments)}function b(){return(b=o(e().mark((function t(){var r;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y();case 2:if(!(r=t.sent)){t.next=5;break}return t.abrupt("return",r);case 5:return t.next=7,l({scopes:p,keyfilePath:v});case 7:if(!(r=t.sent).credentials){t.next=11;break}return t.next=11,m(r);case 11:return t.abrupt("return",r);case 12:case"end":return t.stop()}}),t)})))).apply(this,arguments)}i.use(h()),i.use((function(t,e,r){e.setHeader("Cache-Control","no-store, must-revalidate"),e.setHeader("Access-Control-Allow-Origin","*"),e.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS"),e.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization"),e.setHeader("Accept-Encoding","gzip, deflate, br"),e.setHeader("Content-Type","application/json; charset=utf-8"),r()})),i.use(a.json()),i.get("/result-button",function(){var t=o(e().mark((function t(r,n){var o,a,i,u,c,s,l,h,p,d,v,y,g,m;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,o=r.query.phoneNumber,t.next=4,x();case 4:return a=t.sent,i=f.sheets({version:"v4",auth:a}),t.next=8,i.spreadsheets.values.get({spreadsheetId:"19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA",range:"Sheet1!A2:E"});case 8:if(u=t.sent,c=u.data.values,s=c.find((function(t){return t[1]===o})),l=s?"Ho ten: ".concat(s[0].normalize("NFD").replace(/[\u0300-\u036f]/g,"")," \n Ngay pv: ").concat(s[2]," \n Ket qua: ").concat(s[3].normalize("NFD").replace(/[\u0300-\u036f]/g,"")," \n ").concat(s[4]):"Thong tin cua ban chua chinh xac. Vui long lien he nguoi phong van!",h={version:"chatbot",content:{messages:[{type:"text",text:l,button:[]}]}},s){t.next=23;break}return p=JSON.stringify(h),d=Buffer.byteLength(p),n.setHeader("Content-Type","application/json; charset=utf-8"),n.setHeader("Content-Length",d.toString()),n.status(200).send(p),t.abrupt("return");case 23:return v=JSON.stringify(h),y=Buffer.byteLength(v,"utf-8"),n.header("Content-Length",y.toString()),n.status(200).send(v),t.abrupt("return");case 30:return t.prev=30,t.t0=t.catch(0),console.error(t.t0),g=JSON.stringify("Internal Server Error"),m=Buffer.byteLength(g),n.setHeader("Content-Type","application/json; charset=utf-8"),n.setHeader("Content-Length",m.toString()),n.status(200).send(g),t.abrupt("return");case 40:case"end":return t.stop()}}),t,null,[[0,30]])})));return function(e,r){return t.apply(this,arguments)}}()),i.get("/result",function(){var t=o(e().mark((function t(r,n){var o,a,i,u,c,s,l,h,p,d,v,y,g,m;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,o=r.query.phoneNumber,t.next=4,x();case 4:return a=t.sent,i=f.sheets({version:"v4",auth:a}),t.next=8,i.spreadsheets.values.get({spreadsheetId:"19bEaPjzdUm1PFZqGxYtVwWqSDnr3u7Mm6_kdcN2avVA",range:"Sheet1!A2:E"});case 8:if(u=t.sent,c=u.data.values,s=c.find((function(t){return t[1]===o})),l=s?"Ho ten: ".concat(s[0].normalize("NFD").replace(/[\u0300-\u036f]/g,"")," \n Ngay pv: ").concat(s[2]," \n Ket qua: ").concat(s[3].normalize("NFD").replace(/[\u0300-\u036f]/g,"")," \n ").concat(s[4]):"Thong tin cua ban chua chinh xac. Vui long lien he nguoi phong van!",h={version:"chatbot",content:{messages:[{type:"text",text:l}]}},s){t.next=23;break}return p=JSON.stringify(h),d=Buffer.byteLength(p),n.setHeader("Content-Type","application/json; charset=utf-8"),n.setHeader("Content-Length",d.toString()),n.status(200).send(p),t.abrupt("return");case 23:return v=JSON.stringify(h),y=Buffer.byteLength(v,"utf-8"),n.header("Content-Length",y.toString()),n.status(200).send(v),t.abrupt("return");case 30:return t.prev=30,t.t0=t.catch(0),console.error(t.t0),g=JSON.stringify("Internal Server Error"),m=Buffer.byteLength(g),n.setHeader("Content-Type","application/json; charset=utf-8"),n.setHeader("Content-Length",m.toString()),n.status(200).send(g),t.abrupt("return");case 40:case"end":return t.stop()}}),t,null,[[0,30]])})));return function(e,r){return t.apply(this,arguments)}}()),i.listen(3e3,(function(t){t&&console.log(t),console.log("Server listening at http://localhost:".concat(3e3))}))})()})();