!function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.CanvasLog=o():t.CanvasLog=o()}(self,(function(){return(()=>{"use strict";var t={d:(o,e)=>{for(var r in e)t.o(e,r)&&!t.o(o,r)&&Object.defineProperty(o,r,{enumerable:!0,get:e[r]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};t.r(o),t.d(o,{default:()=>c});const e=function(){function t(t,o){this.method=t,this.args=o,this.invokeAt=Date.now()}return t.prototype.toString=function(){var t=(this.args||[]).map((function(t){return Array.isArray(t)?"[".concat(t.toString(),"]"):"string"==typeof t?"'".concat(t,"'"):t})).join(", ");return"".concat(this.method,"(").concat(t,")")},t}();var r=function(t,o,e){if(e||2===arguments.length)for(var r,n=0,i=o.length;n<i;n++)!r&&n in o||(r||(r=Array.prototype.slice.call(o,0,n)),r[n]=o[n]);return t.concat(r||Array.prototype.slice.call(o))},n={withParams:!0},i=function(){function t(t,o){void 0===o&&(o=n),this.records=[];var i=Object.getPrototypeOf(t),c=this.records;Object.keys(i).filter((function(o){return"function"==typeof t[o]})).forEach((function(n){var i=t[n];t[n]=function(){for(var l,u,a,f,s,d,p,y,v=[],h=0;h<arguments.length;h++)v[h]=arguments[h];c.push(new e(n,o.withParams?v:void 0)),null===(u=null===(l=o.hooks)||void 0===l?void 0:l.all)||void 0===u||u.before(n,v),null===(f=null===(a=o.hooks)||void 0===a?void 0:a[n])||void 0===f||f.before(n,v);var g=i.call.apply(i,r([t],v,!1));return null===(d=null===(s=o.hooks)||void 0===s?void 0:s[n])||void 0===d||d.after(n,v),null===(y=null===(p=o.hooks)||void 0===p?void 0:p.all)||void 0===y||y.after(n,v),g}}))}return t.prototype.getAllRecords=function(){return this.records},t.prototype.getAllLogs=function(t){return this.records.map((function(o){return"function"==typeof t?t(o):o.toString()}))},t.prototype.filterRecords=function(t){return this.records.filter(t)},t}();const c=i;return o})()}));