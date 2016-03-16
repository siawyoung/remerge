var merge=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(1),c=r(o);t.exports=c["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},c=n(2),i=r(c),u=n(3),l=r(u),a=n(6),f=/^\$(.+)/,s=/^__(.+)__$/,p=function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],n=function(t){var e=f.exec(t);return e?e[1]:null},r=function(t){var e=s.exec(t);return e?e[1]:null},c=function d(t){var e={};for(var o in t)"_"!==o&&(e.$?(0,a.consoleWarning)("More than one collection accessor "+e.$.accessorKeyName):e[o.replace(n(o),"")]={isLeaf:(0,i["default"])(t[o]),accessorKeyName:n(o),legacyKeyName:r(o),child:(0,i["default"])(t[o])?t[o]:d(t[o])});return e},u=function v(t){if(t&&!(0,i["default"])(t)){var e=t._||{},o=void 0!==t._;for(var c in t)if("_"!==c&&(r(c)&&(e[r(c)]=t[c](void 0,{}),o=!0),!n(c))){var u=v(t[c]);void 0!==u&&(e[c]=u,o=!0)}return o?e:null}},p=function h(t,n,r){var c=r.type.split(".",1)[0],i=(0,l["default"])(n),u=!1,f=!0,s=!1,p=void 0;try{for(var y,g=Object.keys(t)[Symbol.iterator]();!(f=(y=g.next()).done);f=!0){var d=y.value,v=t[d],b=(v.accessorKeyName,v.isLeaf),m=v.child,j=v.legacyKeyName;if(j){u=!0,(0,a.consoleSuccess)("Executing legacy reducer "+j,e);var w=(0,a.getCollectionElement)(i,j);(0,a.setCollectionElement)(i,j,m(w,r))}else if(d===c){if(u=!0,b)return(0,a.consoleSuccess)("Executing action at leaf node: "+c,e),m(i,r);var _=m.$&&m.$.accessorKeyName,O=r&&r[_];if(_&&void 0!==O){(0,a.consoleSuccess)("Navigating collection node: "+c,e);var x=(0,l["default"])((0,a.getCollectionElement)(i,d)),E=m.$.child,w=(0,a.getCollectionElement)(x,O),S=o({},r,{type:r.type.split(".").splice(1).join(".")}),A=h(E,w,S);(0,a.setCollectionElement)(x,O,A),(0,a.setCollectionElement)(i,d,x)}else{(0,a.consoleSuccess)("Navigating element node: "+c,e);var E=m,w=(0,a.getCollectionElement)(i,d),S=o({},r,{type:r.type.split(".").splice(1).join(".")}),A=h(E,w,S);(0,a.setCollectionElement)(i,d,A)}}}}catch(C){s=!0,p=C}finally{try{!f&&g["return"]&&g["return"]()}finally{if(s)throw p}}return u||(0,a.consoleError)("Could not find path: "+c,e),i},y=u(t),g=c(t);return function(t,n){if(void 0===n?(0,a.consoleMessage)("Setting up initial state tree",e):n.type||(0,a.consoleError)("Action is missing type",e),void 0===t)return y;(0,a.consoleGrouped)("Received action with type: "+n.type,e);var r=p(g,t,n);return(0,a.consoleEndGrouped)(null,e),r}};e["default"]=p},function(t,e){function n(t){var e=r(t)?u.call(t):"";return e==o||e==c}function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var o="[object Function]",c="[object GeneratorFunction]",i=Object.prototype,u=i.toString;t.exports=n},function(t,e,n){function r(t){return o(t,!1,!0)}var o=n(4);t.exports=r},function(t,e,n){(function(t,n){function r(t,e){return t.set(e[0],e[1]),t}function o(t,e){return t.add(e),t}function c(t,e){for(var n=-1,r=t.length;++n<r&&e(t[n],n,t)!==!1;);return t}function i(t,e,n,r){var o=-1,c=t.length;for(r&&c&&(n=t[++o]);++o<c;)n=e(n,t[o],o,t);return n}function u(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}function l(t){return t&&t.Object===Object?t:null}function a(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(n){}return e}function f(t,e){return t="number"==typeof t||Xt.test(t)?+t:-1,e=null==e?Ot:e,t>-1&&t%1==0&&e>t}function s(t){var e=-1,n=Array(t.size);return t.forEach(function(t,r){n[++e]=[r,t]}),n}function p(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}function y(){}function g(t,e){return v(t,e)&&delete t[e]}function d(t,e){if(Ae){var n=t[e];return n===_t?void 0:n}return pe.call(t,e)?t[e]:void 0}function v(t,e){return Ae?void 0!==t[e]:pe.call(t,e)}function h(t,e,n){t[e]=Ae&&void 0===n?_t:n}function b(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function m(){this.__data__={hash:new y,map:xe?new xe:[],string:new y}}function j(t){var e=this.__data__;return ut(t)?g("string"==typeof t?e.string:e.hash,t):xe?e.map["delete"](t):M(e.map,t)}function w(t){var e=this.__data__;return ut(t)?d("string"==typeof t?e.string:e.hash,t):xe?e.map.get(t):N(e.map,t)}function _(t){var e=this.__data__;return ut(t)?v("string"==typeof t?e.string:e.hash,t):xe?e.map.has(t):$(e.map,t)}function O(t,e){var n=this.__data__;return ut(t)?h("string"==typeof t?n.string:n.hash,t,e):xe?n.map.set(t,e):F(n.map,t,e),this}function x(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function E(){this.__data__={array:[],map:null}}function S(t){var e=this.__data__,n=e.array;return n?M(n,t):e.map["delete"](t)}function A(t){var e=this.__data__,n=e.array;return n?N(n,t):e.map.get(t)}function C(t){var e=this.__data__,n=e.array;return n?$(n,t):e.map.has(t)}function z(t,e){var n=this.__data__,r=n.array;r&&(r.length<wt-1?F(r,t,e):(n.array=null,n.map=new b(r)));var o=n.map;return o&&o.set(t,e),this}function M(t,e){var n=k(t,e);if(0>n)return!1;var r=t.length-1;return n==r?t.pop():_e.call(t,n,1),!0}function N(t,e){var n=k(t,e);return 0>n?void 0:t[n][1]}function $(t,e){return k(t,e)>-1}function k(t,e){for(var n=t.length;n--;)if(at(t[n][0],e))return n;return-1}function F(t,e,n){var r=k(t,e);0>r?t.push([e,n]):t[r][1]=n}function D(t,e,n){var r=t[e];pe.call(t,e)&&at(r,n)&&(void 0!==n||e in t)||(t[e]=n)}function P(t,e){return t&&V(e,mt(e),t)}function B(t,e,n,r,o,i,u){var l;if(r&&(l=i?r(t,o,i,u):r(t)),void 0!==l)return l;if(!dt(t))return t;var f=Pe(t);if(f){if(l=rt(t),!e)return Q(t,l)}else{var s=nt(t),p=s==zt||s==Mt;if(Be(t))return J(t,e);if(s==kt||s==xt||p&&!i){if(a(t))return i?t:{};if(l=ot(p?{}:t),!e)return l=P(l,t),n?Y(t,l):l}else{if(!Yt[s])return i?t:{};l=ct(t,s,e)}}u||(u=new x);var y=u.get(t);return y?y:(u.set(t,l),(f?c:I)(t,function(o,c){D(l,c,B(o,e,n,r,c,t,u))}),n&&!f?Y(t,l):l)}function U(t){return dt(t)?je(t):{}}function I(t,e){return t&&ke(t,e,mt)}function R(t,e){return pe.call(t,e)||"object"==typeof t&&e in t&&null===be(t)}function G(t){return Oe(Object(t))}function T(t){return function(e){return null==e?void 0:e[t]}}function J(t,e){if(e)return t.slice();var n=new t.constructor(t.length);return t.copy(n),n}function K(t){var e=new t.constructor(t.byteLength);return new he(e).set(new he(t)),e}function L(t){return i(s(t),r,new t.constructor)}function H(t){var e=new t.constructor(t.source,Qt.exec(t));return e.lastIndex=t.lastIndex,e}function W(t){return i(p(t),o,new t.constructor)}function Z(t){return $e?Object($e.call(t)):{}}function q(t,e){var n=e?K(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}function Q(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}function V(t,e,n){return X(t,e,n)}function X(t,e,n,r){n||(n={});for(var o=-1,c=e.length;++o<c;){var i=e[o],u=r?r(n[i],t[i],i,n,t):t[i];D(n,i,u)}return n}function Y(t,e){return V(t,De(t),e)}function tt(t){return function(e,n,r){for(var o=-1,c=Object(e),i=r(e),u=i.length;u--;){var l=i[t?u:++o];if(n(c[l],l,c)===!1)break}return e}}function et(t,e){var n=t[e];return ht(n)?n:void 0}function nt(t){return ye.call(t)}function rt(t){var e=t.length,n=t.constructor(e);return e&&"string"==typeof t[0]&&pe.call(t,"index")&&(n.index=t.index,n.input=t.input),n}function ot(t){return"function"!=typeof t.constructor||lt(t)?{}:U(be(t))}function ct(t,e,n){var r=t.constructor;switch(e){case It:return K(t);case St:case At:return new r(+t);case Rt:case Gt:case Tt:case Jt:case Kt:case Lt:case Ht:case Wt:case Zt:return q(t,n);case Nt:return L(t);case $t:case Pt:return new r(t);case Ft:return H(t);case Dt:return W(t);case Bt:return Z(t)}}function it(t){var e=t?t.length:void 0;return gt(e)&&(Pe(t)||bt(t)||ft(t))?u(e,String):null}function ut(t){var e=typeof t;return"number"==e||"boolean"==e||"string"==e&&"__proto__"!=t||null==t}function lt(t){var e=t&&t.constructor,n="function"==typeof e&&e.prototype||fe;return t===n}function at(t,e){return t===e||t!==t&&e!==e}function ft(t){return pt(t)&&pe.call(t,"callee")&&(!we.call(t,"callee")||ye.call(t)==xt)}function st(t){return null!=t&&gt(Fe(t))&&!yt(t)}function pt(t){return vt(t)&&st(t)}function yt(t){var e=dt(t)?ye.call(t):"";return e==zt||e==Mt}function gt(t){return"number"==typeof t&&t>-1&&t%1==0&&Ot>=t}function dt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function vt(t){return!!t&&"object"==typeof t}function ht(t){return null==t?!1:yt(t)?ge.test(se.call(t)):vt(t)&&(a(t)?ge:Vt).test(t)}function bt(t){return"string"==typeof t||!Pe(t)&&vt(t)&&ye.call(t)==Pt}function mt(t){var e=lt(t);if(!e&&!st(t))return G(t);var n=it(t),r=!!n,o=n||[],c=o.length;for(var i in t)!R(t,i)||r&&("length"==i||f(i,c))||e&&"constructor"==i||o.push(i);return o}function jt(t){return function(){return t}}var wt=200,_t="__lodash_hash_undefined__",Ot=9007199254740991,xt="[object Arguments]",Et="[object Array]",St="[object Boolean]",At="[object Date]",Ct="[object Error]",zt="[object Function]",Mt="[object GeneratorFunction]",Nt="[object Map]",$t="[object Number]",kt="[object Object]",Ft="[object RegExp]",Dt="[object Set]",Pt="[object String]",Bt="[object Symbol]",Ut="[object WeakMap]",It="[object ArrayBuffer]",Rt="[object Float32Array]",Gt="[object Float64Array]",Tt="[object Int8Array]",Jt="[object Int16Array]",Kt="[object Int32Array]",Lt="[object Uint8Array]",Ht="[object Uint8ClampedArray]",Wt="[object Uint16Array]",Zt="[object Uint32Array]",qt=/[\\^$.*+?()[\]{}|]/g,Qt=/\w*$/,Vt=/^\[object .+?Constructor\]$/,Xt=/^(?:0|[1-9]\d*)$/,Yt={};Yt[xt]=Yt[Et]=Yt[It]=Yt[St]=Yt[At]=Yt[Rt]=Yt[Gt]=Yt[Tt]=Yt[Jt]=Yt[Kt]=Yt[Nt]=Yt[$t]=Yt[kt]=Yt[Ft]=Yt[Dt]=Yt[Pt]=Yt[Bt]=Yt[Lt]=Yt[Ht]=Yt[Wt]=Yt[Zt]=!0,Yt[Ct]=Yt[zt]=Yt[Ut]=!1;var te={"function":!0,object:!0},ee=te[typeof e]&&e&&!e.nodeType?e:void 0,ne=te[typeof t]&&t&&!t.nodeType?t:void 0,re=ne&&ne.exports===ee?ee:void 0,oe=l(ee&&ne&&"object"==typeof n&&n),ce=l(te[typeof self]&&self),ie=l(te[typeof window]&&window),ue=l(te[typeof this]&&this),le=oe||ie!==(ue&&ue.window)&&ie||ce||ue||Function("return this")(),ae=Array.prototype,fe=Object.prototype,se=Function.prototype.toString,pe=fe.hasOwnProperty,ye=fe.toString,ge=RegExp("^"+se.call(pe).replace(qt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),de=re?le.Buffer:void 0,ve=le.Symbol,he=le.Uint8Array,be=Object.getPrototypeOf,me=Object.getOwnPropertySymbols,je=Object.create,we=fe.propertyIsEnumerable,_e=ae.splice,Oe=Object.keys,xe=et(le,"Map"),Ee=et(le,"Set"),Se=et(le,"WeakMap"),Ae=et(Object,"create"),Ce=xe?se.call(xe):"",ze=Ee?se.call(Ee):"",Me=Se?se.call(Se):"",Ne=ve?ve.prototype:void 0,$e=Ne?Ne.valueOf:void 0,ke=tt(),Fe=T("length"),De=me||function(){return[]};(xe&&nt(new xe)!=Nt||Ee&&nt(new Ee)!=Dt||Se&&nt(new Se)!=Ut)&&(nt=function(t){var e=ye.call(t),n=e==kt?t.constructor:null,r="function"==typeof n?se.call(n):"";if(r)switch(r){case Ce:return Nt;case ze:return Dt;case Me:return Ut}return e});var Pe=Array.isArray,Be=de?function(t){return t instanceof de}:jt(!1);y.prototype=Ae?Ae(null):fe,b.prototype.clear=m,b.prototype["delete"]=j,b.prototype.get=w,b.prototype.has=_,b.prototype.set=O,x.prototype.clear=E,x.prototype["delete"]=S,x.prototype.get=A,x.prototype.has=C,x.prototype.set=z,t.exports=B}).call(e,n(5)(t),function(){return this}())},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){return Object.getPrototypeOf(t)===Map.prototype||"Map"===t.constructor.name}function c(t,e,n){console.log("----------------------"),console.log("Running process"),console.log("current map"),console.log(t),console.log("current state"),console.log(e),console.log("current action"),console.log(n),console.log("----------------------")}function i(t){console.log(v["default"].inspect(t,!1,null))}function u(t,e){return o(t)?t.get(e):t[e]}function l(t,e,n){o(t)?t.set(e,n):t[e]=n}function a(t,e){e&&console.log("%c[remerge]%c "+t,h.black,"")}function f(t,e){e&&console.log("%c[remerge]%c "+t,h.yellow,"")}function s(t,e){e&&console.log("%c[remerge]%c "+t,h.green,"")}function p(t,e){e&&console.error("%c[remerge]%c "+t,h.red,"")}function y(t,e){e&&console.groupCollapsed?console.groupCollapsed("%c[remerge]%c "+t,h.black,""):e&&console.log("%c[remerge]%c "+t,h.black,"")}function g(t,e){e&&console.groupEnd&&console.groupEnd()}Object.defineProperty(e,"__esModule",{value:!0}),e.isMap=o,e.debug=c,e.printTree=i,e.getCollectionElement=u,e.setCollectionElement=l,e.consoleMessage=a,e.consoleWarning=f,e.consoleSuccess=s,e.consoleError=p,e.consoleGrouped=y,e.consoleEndGrouped=g;var d=n(7),v=r(d),h={black:"font-weight : bold; color : #000000;",gray:"font-weight : bold; color : #1B2B34;",red:"font-weight : bold; color : #EC5f67;",orange:"font-weight : bold; color : #F99157;",yellow:"font-weight : bold; color : #FAC863;",green:"font-weight : bold; color : #99C794;",teal:"font-weight : bold; color : #5FB3B3;",blue:"font-weight : bold; color : #6699CC;",purple:"font-weight : bold; color : #C594C5;",brown:"font-weight : bold; color : #AB7967;"}},function(t,e,n){(function(t,r){function o(t,n){var r={seen:[],stylize:i};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),d(n)?r.showHidden=n:n&&e._extend(r,n),w(r.showHidden)&&(r.showHidden=!1),w(r.depth)&&(r.depth=2),w(r.colors)&&(r.colors=!1),w(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=c),l(r,t,r.depth)}function c(t,e){var n=o.styles[e];return n?"["+o.colors[n][0]+"m"+t+"["+o.colors[n][1]+"m":t}function i(t,e){return t}function u(t){var e={};return t.forEach(function(t,n){e[t]=!0}),e}function l(t,n,r){if(t.customInspect&&n&&S(n.inspect)&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var o=n.inspect(r,t);return m(o)||(o=l(t,o,r)),o}var c=a(t,n);if(c)return c;var i=Object.keys(n),d=u(i);if(t.showHidden&&(i=Object.getOwnPropertyNames(n)),E(n)&&(i.indexOf("message")>=0||i.indexOf("description")>=0))return f(n);if(0===i.length){if(S(n)){var v=n.name?": "+n.name:"";return t.stylize("[Function"+v+"]","special")}if(_(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(x(n))return t.stylize(Date.prototype.toString.call(n),"date");if(E(n))return f(n)}var h="",b=!1,j=["{","}"];if(g(n)&&(b=!0,j=["[","]"]),S(n)){var w=n.name?": "+n.name:"";h=" [Function"+w+"]"}if(_(n)&&(h=" "+RegExp.prototype.toString.call(n)),x(n)&&(h=" "+Date.prototype.toUTCString.call(n)),E(n)&&(h=" "+f(n)),0===i.length&&(!b||0==n.length))return j[0]+h+j[1];if(0>r)return _(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special");t.seen.push(n);var O;return O=b?s(t,n,r,d,i):i.map(function(e){return p(t,n,r,d,e,b)}),t.seen.pop(),y(O,h,j)}function a(t,e){if(w(e))return t.stylize("undefined","undefined");if(m(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}return b(e)?t.stylize(""+e,"number"):d(e)?t.stylize(""+e,"boolean"):v(e)?t.stylize("null","null"):void 0}function f(t){return"["+Error.prototype.toString.call(t)+"]"}function s(t,e,n,r,o){for(var c=[],i=0,u=e.length;u>i;++i)N(e,String(i))?c.push(p(t,e,n,r,String(i),!0)):c.push("");return o.forEach(function(o){o.match(/^\d+$/)||c.push(p(t,e,n,r,o,!0))}),c}function p(t,e,n,r,o,c){var i,u,a;if(a=Object.getOwnPropertyDescriptor(e,o)||{value:e[o]},a.get?u=a.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):a.set&&(u=t.stylize("[Setter]","special")),N(r,o)||(i="["+o+"]"),u||(t.seen.indexOf(a.value)<0?(u=v(n)?l(t,a.value,null):l(t,a.value,n-1),u.indexOf("\n")>-1&&(u=c?u.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+u.split("\n").map(function(t){return"   "+t}).join("\n"))):u=t.stylize("[Circular]","special")),w(i)){if(c&&o.match(/^\d+$/))return u;i=JSON.stringify(""+o),i.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(i=i.substr(1,i.length-2),i=t.stylize(i,"name")):(i=i.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),i=t.stylize(i,"string"))}return i+": "+u}function y(t,e,n){var r=0,o=t.reduce(function(t,e){return r++,e.indexOf("\n")>=0&&r++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);return o>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function g(t){return Array.isArray(t)}function d(t){return"boolean"==typeof t}function v(t){return null===t}function h(t){return null==t}function b(t){return"number"==typeof t}function m(t){return"string"==typeof t}function j(t){return"symbol"==typeof t}function w(t){return void 0===t}function _(t){return O(t)&&"[object RegExp]"===C(t)}function O(t){return"object"==typeof t&&null!==t}function x(t){return O(t)&&"[object Date]"===C(t)}function E(t){return O(t)&&("[object Error]"===C(t)||t instanceof Error)}function S(t){return"function"==typeof t}function A(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||"undefined"==typeof t}function C(t){return Object.prototype.toString.call(t)}function z(t){return 10>t?"0"+t.toString(10):t.toString(10)}function M(){var t=new Date,e=[z(t.getHours()),z(t.getMinutes()),z(t.getSeconds())].join(":");return[t.getDate(),D[t.getMonth()],e].join(" ")}function N(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var $=/%[sdj%]/g;e.format=function(t){if(!m(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(o(arguments[n]));return e.join(" ")}for(var n=1,r=arguments,c=r.length,i=String(t).replace($,function(t){if("%%"===t)return"%";if(n>=c)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return t}}),u=r[n];c>n;u=r[++n])i+=v(u)||!O(u)?" "+u:" "+o(u);return i},e.deprecate=function(n,o){function c(){if(!i){if(r.throwDeprecation)throw new Error(o);r.traceDeprecation?console.trace(o):console.error(o),i=!0}return n.apply(this,arguments)}if(w(t.process))return function(){return e.deprecate(n,o).apply(this,arguments)};if(r.noDeprecation===!0)return n;var i=!1;return c};var k,F={};e.debuglog=function(t){if(w(k)&&(k=r.env.NODE_DEBUG||""),t=t.toUpperCase(),!F[t])if(new RegExp("\\b"+t+"\\b","i").test(k)){var n=r.pid;F[t]=function(){var r=e.format.apply(e,arguments);console.error("%s %d: %s",t,n,r)}}else F[t]=function(){};return F[t]},e.inspect=o,o.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},o.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=g,e.isBoolean=d,e.isNull=v,e.isNullOrUndefined=h,e.isNumber=b,e.isString=m,e.isSymbol=j,e.isUndefined=w,e.isRegExp=_,e.isObject=O,e.isDate=x,e.isError=E,e.isFunction=S,e.isPrimitive=A,e.isBuffer=n(9);var D=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];e.log=function(){console.log("%s - %s",M(),e.format.apply(e,arguments))},e.inherits=n(10),e._extend=function(t,e){if(!e||!O(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t}}).call(e,function(){return this}(),n(8))},function(t,e){function n(){a=!1,i.length?l=i.concat(l):f=-1,l.length&&r()}function r(){if(!a){var t=setTimeout(n);a=!0;for(var e=l.length;e;){for(i=l,l=[];++f<e;)i&&i[f].run();f=-1,e=l.length}i=null,a=!1,clearTimeout(t)}}function o(t,e){this.fun=t,this.array=e}function c(){}var i,u=t.exports={},l=[],a=!1,f=-1;u.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];l.push(new o(t,e)),1!==l.length||a||setTimeout(r,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=c,u.addListener=c,u.once=c,u.off=c,u.removeListener=c,u.removeAllListeners=c,u.emit=c,u.binding=function(t){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(t){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},function(t,e){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}}]);