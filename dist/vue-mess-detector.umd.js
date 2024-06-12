(function(L,D){typeof exports=="object"&&typeof module<"u"?D(require("yargs"),require("util"),require("path"),require("fs"),require("assert"),require("url"),require("@vue/compiler-sfc")):typeof define=="function"&&define.amd?define(["yargs","util","path","fs","assert","url","@vue/compiler-sfc"],D):(L=typeof globalThis<"u"?globalThis:L||self,D(L.yargs,L.util,L.path,L.fs,L.assert,L.url,L.compilerSfc))})(this,function(L,D,x,B,Ie,ct,lt){"use strict";var ze=typeof document<"u"?document.currentScript:null;class J extends Error{constructor(t){super(t||"yargs error"),this.name="YError",Error.captureStackTrace&&Error.captureStackTrace(this,J)}}function qe(){return at()?0:1}function at(){return ut()&&!process.defaultApp}function ut(){return!!process.versions.electron}function ft(e){return e.slice(qe()+1)}function ht(){return process.argv[qe()]}/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */function k(e){if(e!==e.toLowerCase()&&e!==e.toUpperCase()||(e=e.toLowerCase()),e.indexOf("-")===-1&&e.indexOf("_")===-1)return e;{let n="",i=!1;const c=e.match(/^-+/);for(let u=c?c[0].length:0;u<e.length;u++){let d=e.charAt(u);i&&(i=!1,d=d.toUpperCase()),u!==0&&(d==="-"||d==="_")?i=!0:d!=="-"&&d!=="_"&&(n+=d)}return n}}function Me(e,t){const n=e.toLowerCase();t=t||"-";let i="";for(let c=0;c<e.length;c++){const u=n.charAt(c),d=e.charAt(c);u!==d&&c>0?i+=`${t}${n.charAt(c)}`:i+=d}return i}function Ue(e){return e==null?!1:typeof e=="number"||/^0x[0-9a-f]+$/i.test(e)?!0:/^0[^.]/.test(e)?!1:/^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e)}/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */function dt(e){if(Array.isArray(e))return e.map(d=>typeof d!="string"?d+"":d);e=e.trim();let t=0,n=null,i=null,c=null;const u=[];for(let d=0;d<e.length;d++){if(n=i,i=e.charAt(d),i===" "&&!c){n!==" "&&t++;continue}i===c?c=null:(i==="'"||i==='"')&&!c&&(c=i),u[t]||(u[t]=""),u[t]+=i}return u}/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */var W;(function(e){e.BOOLEAN="boolean",e.STRING="string",e.NUMBER="number",e.ARRAY="array"})(W||(W={}));/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */let z;class pt{constructor(t){z=t}parse(t,n){const i=Object.assign({alias:void 0,array:void 0,boolean:void 0,config:void 0,configObjects:void 0,configuration:void 0,coerce:void 0,count:void 0,default:void 0,envPrefix:void 0,narg:void 0,normalize:void 0,string:void 0,number:void 0,__:void 0,key:void 0},n),c=dt(t),u=typeof t=="string",d=gt(Object.assign(Object.create(null),i.alias)),g=Object.assign({"boolean-negation":!0,"camel-case-expansion":!0,"combine-arrays":!1,"dot-notation":!0,"duplicate-arguments-array":!0,"flatten-duplicate-arrays":!0,"greedy-arrays":!0,"halt-at-non-option":!1,"nargs-eats-options":!1,"negation-prefix":"no-","parse-numbers":!0,"parse-positional-numbers":!0,"populate--":!1,"set-placeholder-key":!1,"short-option-groups":!0,"strip-aliased":!1,"strip-dashed":!1,"unknown-options-as-args":!1},i.configuration),_=Object.assign(Object.create(null),i.default),R=i.configObjects||[],w=i.envPrefix,M=g["populate--"],Z=M?"--":"_",Ee=Object.create(null),tt=Object.create(null),Y=i.__||z.format,a={aliases:Object.create(null),arrays:Object.create(null),bools:Object.create(null),strings:Object.create(null),numbers:Object.create(null),counts:Object.create(null),normalize:Object.create(null),configs:Object.create(null),nargs:Object.create(null),coercions:Object.create(null),keys:[]},I=/^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/,We=new RegExp("^--"+g["negation-prefix"]+"(.+)");[].concat(i.array||[]).filter(Boolean).forEach(function(s){const r=typeof s=="object"?s.key:s,f=Object.keys(s).map(function(l){return{boolean:"bools",string:"strings",number:"numbers"}[l]}).filter(Boolean).pop();f&&(a[f][r]=!0),a.arrays[r]=!0,a.keys.push(r)}),[].concat(i.boolean||[]).filter(Boolean).forEach(function(s){a.bools[s]=!0,a.keys.push(s)}),[].concat(i.string||[]).filter(Boolean).forEach(function(s){a.strings[s]=!0,a.keys.push(s)}),[].concat(i.number||[]).filter(Boolean).forEach(function(s){a.numbers[s]=!0,a.keys.push(s)}),[].concat(i.count||[]).filter(Boolean).forEach(function(s){a.counts[s]=!0,a.keys.push(s)}),[].concat(i.normalize||[]).filter(Boolean).forEach(function(s){a.normalize[s]=!0,a.keys.push(s)}),typeof i.narg=="object"&&Object.entries(i.narg).forEach(([s,r])=>{typeof r=="number"&&(a.nargs[s]=r,a.keys.push(s))}),typeof i.coerce=="object"&&Object.entries(i.coerce).forEach(([s,r])=>{typeof r=="function"&&(a.coercions[s]=r,a.keys.push(s))}),typeof i.config<"u"&&(Array.isArray(i.config)||typeof i.config=="string"?[].concat(i.config).filter(Boolean).forEach(function(s){a.configs[s]=!0}):typeof i.config=="object"&&Object.entries(i.config).forEach(([s,r])=>{(typeof r=="boolean"||typeof r=="function")&&(a.configs[s]=r)})),vn(i.key,d,i.default,a.arrays),Object.keys(_).forEach(function(s){(a.aliases[s]||[]).forEach(function(r){_[r]=_[s]})});let T=null;Pn();let Ae=[];const C=Object.assign(Object.create(null),{_:[]}),nt={};for(let s=0;s<c.length;s++){const r=c[s],f=r.replace(/^-{3,}/,"---");let l,o,p,h,m,O;if(r!=="--"&&/^-/.test(r)&&Oe(r))Pe(r);else if(f.match(/^---+(=|$)/)){Pe(r);continue}else if(r.match(/^--.+=/)||!g["short-option-groups"]&&r.match(/^-.+=/))h=r.match(/^--?([^=]+)=([\s\S]*)$/),h!==null&&Array.isArray(h)&&h.length>=3&&(y(h[1],a.arrays)?s=we(s,h[1],c,h[2]):y(h[1],a.nargs)!==!1?s=_e(s,h[1],c,h[2]):E(h[1],h[2],!0));else if(r.match(We)&&g["boolean-negation"])h=r.match(We),h!==null&&Array.isArray(h)&&h.length>=2&&(o=h[1],E(o,y(o,a.arrays)?[!1]:!1));else if(r.match(/^--.+/)||!g["short-option-groups"]&&r.match(/^-[^-]+/))h=r.match(/^--?(.+)/),h!==null&&Array.isArray(h)&&h.length>=2&&(o=h[1],y(o,a.arrays)?s=we(s,o,c):y(o,a.nargs)!==!1?s=_e(s,o,c):(m=c[s+1],m!==void 0&&(!m.match(/^-/)||m.match(I))&&!y(o,a.bools)&&!y(o,a.counts)||/^(true|false)$/.test(m)?(E(o,m),s++):E(o,X(o))));else if(r.match(/^-.\..+=/))h=r.match(/^-([^=]+)=([\s\S]*)$/),h!==null&&Array.isArray(h)&&h.length>=3&&E(h[1],h[2]);else if(r.match(/^-.\..+/)&&!r.match(I))m=c[s+1],h=r.match(/^-(.\..+)/),h!==null&&Array.isArray(h)&&h.length>=2&&(o=h[1],m!==void 0&&!m.match(/^-/)&&!y(o,a.bools)&&!y(o,a.counts)?(E(o,m),s++):E(o,X(o)));else if(r.match(/^-[^-]+/)&&!r.match(I)){p=r.slice(1,-1).split(""),l=!1;for(let j=0;j<p.length;j++){if(m=r.slice(j+2),p[j+1]&&p[j+1]==="="){O=r.slice(j+3),o=p[j],y(o,a.arrays)?s=we(s,o,c,O):y(o,a.nargs)!==!1?s=_e(s,o,c,O):E(o,O),l=!0;break}if(m==="-"){E(p[j],m);continue}if(/[A-Za-z]/.test(p[j])&&/^-?\d+(\.\d*)?(e-?\d+)?$/.test(m)&&y(m,a.bools)===!1){E(p[j],m),l=!0;break}if(p[j+1]&&p[j+1].match(/\W/)){E(p[j],m),l=!0;break}else E(p[j],X(p[j]))}o=r.slice(-1)[0],!l&&o!=="-"&&(y(o,a.arrays)?s=we(s,o,c):y(o,a.nargs)!==!1?s=_e(s,o,c):(m=c[s+1],m!==void 0&&(!/^(-|--)[^-]/.test(m)||m.match(I))&&!y(o,a.bools)&&!y(o,a.counts)||/^(true|false)$/.test(m)?(E(o,m),s++):E(o,X(o))))}else if(r.match(/^-[0-9]$/)&&r.match(I)&&y(r.slice(1),a.bools))o=r.slice(1),E(o,X(o));else if(r==="--"){Ae=c.slice(s+1);break}else if(g["halt-at-non-option"]){Ae=c.slice(s);break}else Pe(r)}ot(C,!0),ot(C,!1),On(C),xn(),rt(C,a.aliases,_,!0),jn(C),g["set-placeholder-key"]&&Sn(C),Object.keys(a.counts).forEach(function(s){ge(C,s.split("."))||E(s,0)}),M&&Ae.length&&(C[Z]=[]),Ae.forEach(function(s){C[Z].push(s)}),g["camel-case-expansion"]&&g["strip-dashed"]&&Object.keys(C).filter(s=>s!=="--"&&s.includes("-")).forEach(s=>{delete C[s]}),g["strip-aliased"]&&[].concat(...Object.keys(d).map(s=>d[s])).forEach(s=>{g["camel-case-expansion"]&&s.includes("-")&&delete C[s.split(".").map(r=>k(r)).join(".")],delete C[s]});function Pe(s){const r=Ce("_",s);(typeof r=="string"||typeof r=="number")&&C._.push(r)}function _e(s,r,f,l){let o,p=y(r,a.nargs);if(p=typeof p!="number"||isNaN(p)?1:p,p===0)return U(l)||(T=Error(Y("Argument unexpected for: %s",r))),E(r,X(r)),s;let h=U(l)?0:1;if(g["nargs-eats-options"])f.length-(s+1)+h<p&&(T=Error(Y("Not enough arguments following: %s",r))),h=p;else{for(o=s+1;o<f.length&&(!f[o].match(/^-[^0-9]/)||f[o].match(I)||Oe(f[o]));o++)h++;h<p&&(T=Error(Y("Not enough arguments following: %s",r)))}let m=Math.min(h,p);for(!U(l)&&m>0&&(E(r,l),m--),o=s+1;o<m+s+1;o++)E(r,f[o]);return s+m}function we(s,r,f,l){let o=[],p=l||f[s+1];const h=y(r,a.nargs);if(y(r,a.bools)&&!/^(true|false)$/.test(p))o.push(!0);else if(U(p)||U(l)&&/^-/.test(p)&&!I.test(p)&&!Oe(p)){if(_[r]!==void 0){const m=_[r];o=Array.isArray(m)?m:[m]}}else{U(l)||o.push(Te(r,l,!0));for(let m=s+1;m<f.length&&!(!g["greedy-arrays"]&&o.length>0||h&&typeof h=="number"&&o.length>=h||(p=f[m],/^-/.test(p)&&!I.test(p)&&!Oe(p)));m++)s=m,o.push(Te(r,p,u))}return typeof h=="number"&&(h&&o.length<h||isNaN(h)&&o.length===0)&&(T=Error(Y("Not enough arguments following: %s",r))),E(r,o),s}function E(s,r,f=u){if(/-/.test(s)&&g["camel-case-expansion"]){const p=s.split(".").map(function(h){return k(h)}).join(".");st(s,p)}const l=Te(s,r,f),o=s.split(".");me(C,o,l),a.aliases[s]&&a.aliases[s].forEach(function(p){const h=p.split(".");me(C,h,l)}),o.length>1&&g["dot-notation"]&&(a.aliases[o[0]]||[]).forEach(function(p){let h=p.split(".");const m=[].concat(o);m.shift(),h=h.concat(m),(a.aliases[s]||[]).includes(h.join("."))||me(C,h,l)}),y(s,a.normalize)&&!y(s,a.arrays)&&[s].concat(a.aliases[s]||[]).forEach(function(h){Object.defineProperty(nt,h,{enumerable:!0,get(){return r},set(m){r=typeof m=="string"?z.normalize(m):m}})})}function st(s,r){a.aliases[s]&&a.aliases[s].length||(a.aliases[s]=[r],Ee[r]=!0),a.aliases[r]&&a.aliases[r].length||st(r,s)}function Te(s,r,f){f&&(r=mt(r)),(y(s,a.bools)||y(s,a.counts))&&typeof r=="string"&&(r=r==="true");let l=Array.isArray(r)?r.map(function(o){return Ce(s,o)}):Ce(s,r);return y(s,a.counts)&&(U(l)||typeof l=="boolean")&&(l=xe()),y(s,a.normalize)&&y(s,a.arrays)&&(Array.isArray(r)?l=r.map(o=>z.normalize(o)):l=z.normalize(r)),l}function Ce(s,r){return!g["parse-positional-numbers"]&&s==="_"||!y(s,a.strings)&&!y(s,a.bools)&&!Array.isArray(r)&&(Ue(r)&&g["parse-numbers"]&&Number.isSafeInteger(Math.floor(parseFloat(`${r}`)))||!U(r)&&y(s,a.numbers))&&(r=Number(r)),r}function On(s){const r=Object.create(null);rt(r,a.aliases,_),Object.keys(a.configs).forEach(function(f){const l=s[f]||r[f];if(l)try{let o=null;const p=z.resolve(z.cwd(),l),h=a.configs[f];if(typeof h=="function"){try{o=h(p)}catch(m){o=m}if(o instanceof Error){T=o;return}}else o=z.require(p);Be(o)}catch(o){o.name==="PermissionDenied"?T=o:s[f]&&(T=Error(Y("Invalid JSON config file: %s",l)))}})}function Be(s,r){Object.keys(s).forEach(function(f){const l=s[f],o=r?r+"."+f:f;typeof l=="object"&&l!==null&&!Array.isArray(l)&&g["dot-notation"]?Be(l,o):(!ge(C,o.split("."))||y(o,a.arrays)&&g["combine-arrays"])&&E(o,l)})}function xn(){typeof R<"u"&&R.forEach(function(s){Be(s)})}function ot(s,r){if(typeof w>"u")return;const f=typeof w=="string"?w:"",l=z.env();Object.keys(l).forEach(function(o){if(f===""||o.lastIndexOf(f,0)===0){const p=o.split("__").map(function(h,m){return m===0&&(h=h.substring(f.length)),k(h)});(r&&a.configs[p.join(".")]||!r)&&!ge(s,p)&&E(p.join("."),l[o])}})}function jn(s){let r;const f=new Set;Object.keys(s).forEach(function(l){if(!f.has(l)&&(r=y(l,a.coercions),typeof r=="function"))try{const o=Ce(l,r(s[l]));[].concat(a.aliases[l]||[],l).forEach(p=>{f.add(p),s[p]=o})}catch(o){T=o}})}function Sn(s){return a.keys.forEach(r=>{~r.indexOf(".")||typeof s[r]>"u"&&(s[r]=void 0)}),s}function rt(s,r,f,l=!1){Object.keys(f).forEach(function(o){ge(s,o.split("."))||(me(s,o.split("."),f[o]),l&&(tt[o]=!0),(r[o]||[]).forEach(function(p){ge(s,p.split("."))||me(s,p.split("."),f[o])}))})}function ge(s,r){let f=s;g["dot-notation"]||(r=[r.join(".")]),r.slice(0,-1).forEach(function(o){f=f[o]||{}});const l=r[r.length-1];return typeof f!="object"?!1:l in f}function me(s,r,f){let l=s;g["dot-notation"]||(r=[r.join(".")]),r.slice(0,-1).forEach(function(O){O=Ve(O),typeof l=="object"&&l[O]===void 0&&(l[O]={}),typeof l[O]!="object"||Array.isArray(l[O])?(Array.isArray(l[O])?l[O].push({}):l[O]=[l[O],{}],l=l[O][l[O].length-1]):l=l[O]});const o=Ve(r[r.length-1]),p=y(r.join("."),a.arrays),h=Array.isArray(f);let m=g["duplicate-arguments-array"];!m&&y(o,a.nargs)&&(m=!0,(!U(l[o])&&a.nargs[o]===1||Array.isArray(l[o])&&l[o].length===a.nargs[o])&&(l[o]=void 0)),f===xe()?l[o]=xe(l[o]):Array.isArray(l[o])?m&&p&&h?l[o]=g["flatten-duplicate-arrays"]?l[o].concat(f):(Array.isArray(l[o][0])?l[o]:[l[o]]).concat([f]):!m&&!!p==!!h?l[o]=f:l[o]=l[o].concat([f]):l[o]===void 0&&p?l[o]=h?f:[f]:m&&!(l[o]===void 0||y(o,a.counts)||y(o,a.bools))?l[o]=[l[o],f]:l[o]=f}function vn(...s){s.forEach(function(r){Object.keys(r||{}).forEach(function(f){a.aliases[f]||(a.aliases[f]=[].concat(d[f]||[]),a.aliases[f].concat(f).forEach(function(l){if(/-/.test(l)&&g["camel-case-expansion"]){const o=k(l);o!==f&&a.aliases[f].indexOf(o)===-1&&(a.aliases[f].push(o),Ee[o]=!0)}}),a.aliases[f].concat(f).forEach(function(l){if(l.length>1&&/[A-Z]/.test(l)&&g["camel-case-expansion"]){const o=Me(l,"-");o!==f&&a.aliases[f].indexOf(o)===-1&&(a.aliases[f].push(o),Ee[o]=!0)}}),a.aliases[f].forEach(function(l){a.aliases[l]=[f].concat(a.aliases[f].filter(function(o){return l!==o}))}))})})}function y(s,r){const f=[].concat(a.aliases[s]||[],s),l=Object.keys(r),o=f.find(p=>l.includes(p));return o?r[o]:!1}function it(s){const r=Object.keys(a);return[].concat(r.map(l=>a[l])).some(function(l){return Array.isArray(l)?l.includes(s):l[s]})}function Nn(s,...r){return[].concat(...r).some(function(l){const o=s.match(l);return o&&it(o[1])})}function Fn(s){if(s.match(I)||!s.match(/^-[^-]+/))return!1;let r=!0,f;const l=s.slice(1).split("");for(let o=0;o<l.length;o++){if(f=s.slice(o+2),!it(l[o])){r=!1;break}if(l[o+1]&&l[o+1]==="="||f==="-"||/[A-Za-z]/.test(l[o])&&/^-?\d+(\.\d*)?(e-?\d+)?$/.test(f)||l[o+1]&&l[o+1].match(/\W/))break}return r}function Oe(s){return g["unknown-options-as-args"]&&Rn(s)}function Rn(s){return s=s.replace(/^-{3,}/,"--"),s.match(I)||Fn(s)?!1:!Nn(s,/^-+([^=]+?)=[\s\S]*$/,We,/^-+([^=]+?)$/,/^-+([^=]+?)-$/,/^-+([^=]+?\d+)$/,/^-+([^=]+?)\W+.*$/)}function X(s){return!y(s,a.bools)&&!y(s,a.counts)&&`${s}`in _?_[s]:Ln(Wn(s))}function Ln(s){return{[W.BOOLEAN]:!0,[W.STRING]:"",[W.NUMBER]:void 0,[W.ARRAY]:[]}[s]}function Wn(s){let r=W.BOOLEAN;return y(s,a.strings)?r=W.STRING:y(s,a.numbers)?r=W.NUMBER:y(s,a.bools)?r=W.BOOLEAN:y(s,a.arrays)&&(r=W.ARRAY),r}function U(s){return s===void 0}function Pn(){Object.keys(a.counts).find(s=>y(s,a.arrays)?(T=Error(Y("Invalid configuration: %s, opts.count excludes opts.array.",s)),!0):y(s,a.nargs)?(T=Error(Y("Invalid configuration: %s, opts.count excludes opts.narg.",s)),!0):!1)}return{aliases:Object.assign({},a.aliases),argv:Object.assign(nt,C),configuration:g,defaulted:Object.assign({},tt),error:T,newAliases:Object.assign({},Ee)}}}function gt(e){const t=[],n=Object.create(null);let i=!0;for(Object.keys(e).forEach(function(c){t.push([].concat(e[c],c))});i;){i=!1;for(let c=0;c<t.length;c++)for(let u=c+1;u<t.length;u++)if(t[c].filter(function(g){return t[u].indexOf(g)!==-1}).length){t[c]=t[c].concat(t[u]),t.splice(u,1),i=!0;break}}return t.forEach(function(c){c=c.filter(function(d,g,_){return _.indexOf(d)===g});const u=c.pop();u!==void 0&&typeof u=="string"&&(n[u]=c)}),n}function xe(e){return e!==void 0?e+1:1}function Ve(e){return e==="__proto__"?"___proto___":e}function mt(e){return typeof e=="string"&&(e[0]==="'"||e[0]==='"')&&e[e.length-1]===e[0]?e.substring(1,e.length-1):e}/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */var je,Se,ve;const Ge=process&&process.env&&process.env.YARGS_MIN_NODE_VERSION?Number(process.env.YARGS_MIN_NODE_VERSION):12,De=(Se=(je=process==null?void 0:process.versions)===null||je===void 0?void 0:je.node)!==null&&Se!==void 0?Se:(ve=process==null?void 0:process.version)===null||ve===void 0?void 0:ve.slice(1);if(De&&Number(De.match(/^([^.]+)/)[1])<Ge)throw Error(`yargs parser supports a minimum Node.js version of ${Ge}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);const $t=process?process.env:{},Qe=new pt({cwd:process.cwd,env:()=>$t,format:D.format,normalize:x.normalize,resolve:x.resolve,require:e=>{if(typeof require<"u")return require(e);if(e.match(/\.json$/))return JSON.parse(B.readFileSync(e,"utf8"));throw Error("only .json config files are supported in ESM")}}),ee=function(t,n){return Qe.parse(t.slice(),n).argv};ee.detailed=function(e,t){return Qe.parse(e.slice(),t)},ee.camelCase=k,ee.decamelize=Me,ee.looksLikeNumber=Ue;const yt={right:Ct,center:Ot},bt=0,$e=1,Et=2,ye=3;class At{constructor(t){var n;this.width=t.width,this.wrap=(n=t.wrap)!==null&&n!==void 0?n:!0,this.rows=[]}span(...t){const n=this.div(...t);n.span=!0}resetOutput(){this.rows=[]}div(...t){if(t.length===0&&this.div(""),this.wrap&&this.shouldApplyLayoutDSL(...t)&&typeof t[0]=="string")return this.applyLayoutDSL(t[0]);const n=t.map(i=>typeof i=="string"?this.colFromString(i):i);return this.rows.push(n),n}shouldApplyLayoutDSL(...t){return t.length===1&&typeof t[0]=="string"&&/[\t\n]/.test(t[0])}applyLayoutDSL(t){const n=t.split(`
`).map(c=>c.split("	"));let i=0;return n.forEach(c=>{c.length>1&&F.stringWidth(c[0])>i&&(i=Math.min(Math.floor(this.width*.5),F.stringWidth(c[0])))}),n.forEach(c=>{this.div(...c.map((u,d)=>({text:u.trim(),padding:this.measurePadding(u),width:d===0&&c.length>1?i:void 0})))}),this.rows[this.rows.length-1]}colFromString(t){return{text:t,padding:this.measurePadding(t)}}measurePadding(t){const n=F.stripAnsi(t);return[0,n.match(/\s*$/)[0].length,0,n.match(/^\s*/)[0].length]}toString(){const t=[];return this.rows.forEach(n=>{this.rowToString(n,t)}),t.filter(n=>!n.hidden).map(n=>n.text).join(`
`)}rowToString(t,n){return this.rasterize(t).forEach((i,c)=>{let u="";i.forEach((d,g)=>{const{width:_}=t[g],R=this.negatePadding(t[g]);let w=d;if(R>F.stringWidth(d)&&(w+=" ".repeat(R-F.stringWidth(d))),t[g].align&&t[g].align!=="left"&&this.wrap){const Z=yt[t[g].align];w=Z(w,R),F.stringWidth(w)<R&&(w+=" ".repeat((_||0)-F.stringWidth(w)-1))}const M=t[g].padding||[0,0,0,0];M[ye]&&(u+=" ".repeat(M[ye])),u+=Ke(t[g],w,"| "),u+=w,u+=Ke(t[g],w," |"),M[$e]&&(u+=" ".repeat(M[$e])),c===0&&n.length>0&&(u=this.renderInline(u,n[n.length-1]))}),n.push({text:u.replace(/ +$/,""),span:t.span})}),n}renderInline(t,n){const i=t.match(/^ */),c=i?i[0].length:0,u=n.text,d=F.stringWidth(u.trimRight());return n.span?this.wrap?c<d?t:(n.hidden=!0,u.trimRight()+" ".repeat(c-d)+t.trimLeft()):(n.hidden=!0,u+t):t}rasterize(t){const n=[],i=this.columnWidths(t);let c;return t.forEach((u,d)=>{u.width=i[d],this.wrap?c=F.wrap(u.text,this.negatePadding(u),{hard:!0}).split(`
`):c=u.text.split(`
`),u.border&&(c.unshift("."+"-".repeat(this.negatePadding(u)+2)+"."),c.push("'"+"-".repeat(this.negatePadding(u)+2)+"'")),u.padding&&(c.unshift(...new Array(u.padding[bt]||0).fill("")),c.push(...new Array(u.padding[Et]||0).fill(""))),c.forEach((g,_)=>{n[_]||n.push([]);const R=n[_];for(let w=0;w<d;w++)R[w]===void 0&&R.push("");R.push(g)})}),n}negatePadding(t){let n=t.width||0;return t.padding&&(n-=(t.padding[ye]||0)+(t.padding[$e]||0)),t.border&&(n-=4),n}columnWidths(t){if(!this.wrap)return t.map(d=>d.width||F.stringWidth(d.text));let n=t.length,i=this.width;const c=t.map(d=>{if(d.width)return n--,i-=d.width,d.width}),u=n?Math.floor(i/n):0;return c.map((d,g)=>d===void 0?Math.max(u,_t(t[g])):d)}}function Ke(e,t,n){return e.border?/[.']-+[.']/.test(t)?"":t.trim().length!==0?n:"  ":""}function _t(e){const t=e.padding||[],n=1+(t[ye]||0)+(t[$e]||0);return e.border?n+4:n}function wt(){return typeof process=="object"&&process.stdout&&process.stdout.columns?process.stdout.columns:80}function Ct(e,t){e=e.trim();const n=F.stringWidth(e);return n<t?" ".repeat(t-n)+e:e}function Ot(e,t){e=e.trim();const n=F.stringWidth(e);return n>=t?e:" ".repeat(t-n>>1)+e}let F;function xt(e,t){return F=t,new At({width:e?.width||wt(),wrap:e?.wrap})}const Ze=new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)","g");function Ye(e){return e.replace(Ze,"")}function jt(e,t){const[n,i]=e.match(Ze)||["",""];e=Ye(e);let c="";for(let u=0;u<e.length;u++)u!==0&&u%t===0&&(c+=`
`),c+=e.charAt(u);return n&&i&&(c=`${n}${c}${i}`),c}function St(e){return xt(e,{stringWidth:t=>[...t].length,stripAnsi:Ye,wrap:jt})}function vt(e,t){let n=x.resolve(".",e),i;for(B.statSync(n).isDirectory()||(n=x.dirname(n));;){if(i=t(n,B.readdirSync(n)),i)return x.resolve(n,i);if(n=x.dirname(i=n),i===n)break}}const Nt={fs:{readFileSync:B.readFileSync,writeFile:B.writeFile},format:D.format,resolve:x.resolve,exists:e=>{try{return B.statSync(e).isFile()}catch{return!1}}};let P;class Ft{constructor(t){t=t||{},this.directory=t.directory||"./locales",this.updateFiles=typeof t.updateFiles=="boolean"?t.updateFiles:!0,this.locale=t.locale||"en",this.fallbackToLanguage=typeof t.fallbackToLanguage=="boolean"?t.fallbackToLanguage:!0,this.cache=Object.create(null),this.writeQueue=[]}__(...t){if(typeof arguments[0]!="string")return this._taggedLiteral(arguments[0],...arguments);const n=t.shift();let i=function(){};return typeof t[t.length-1]=="function"&&(i=t.pop()),i=i||function(){},this.cache[this.locale]||this._readLocaleFile(),!this.cache[this.locale][n]&&this.updateFiles?(this.cache[this.locale][n]=n,this._enqueueWrite({directory:this.directory,locale:this.locale,cb:i})):i(),P.format.apply(P.format,[this.cache[this.locale][n]||n].concat(t))}__n(){const t=Array.prototype.slice.call(arguments),n=t.shift(),i=t.shift(),c=t.shift();let u=function(){};typeof t[t.length-1]=="function"&&(u=t.pop()),this.cache[this.locale]||this._readLocaleFile();let d=c===1?n:i;this.cache[this.locale][n]&&(d=this.cache[this.locale][n][c===1?"one":"other"]),!this.cache[this.locale][n]&&this.updateFiles?(this.cache[this.locale][n]={one:n,other:i},this._enqueueWrite({directory:this.directory,locale:this.locale,cb:u})):u();const g=[d];return~d.indexOf("%d")&&g.push(c),P.format.apply(P.format,g.concat(t))}setLocale(t){this.locale=t}getLocale(){return this.locale}updateLocale(t){this.cache[this.locale]||this._readLocaleFile();for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(this.cache[this.locale][n]=t[n])}_taggedLiteral(t,...n){let i="";return t.forEach(function(c,u){const d=n[u+1];i+=c,typeof d<"u"&&(i+="%s")}),this.__.apply(this,[i].concat([].slice.call(n,1)))}_enqueueWrite(t){this.writeQueue.push(t),this.writeQueue.length===1&&this._processWriteQueue()}_processWriteQueue(){const t=this,n=this.writeQueue[0],i=n.directory,c=n.locale,u=n.cb,d=this._resolveLocaleFile(i,c),g=JSON.stringify(this.cache[c],null,2);P.fs.writeFile(d,g,"utf-8",function(_){t.writeQueue.shift(),t.writeQueue.length>0&&t._processWriteQueue(),u(_)})}_readLocaleFile(){let t={};const n=this._resolveLocaleFile(this.directory,this.locale);try{P.fs.readFileSync&&(t=JSON.parse(P.fs.readFileSync(n,"utf-8")))}catch(i){if(i instanceof SyntaxError&&(i.message="syntax error in "+n),i.code==="ENOENT")t={};else throw i}this.cache[this.locale]=t}_resolveLocaleFile(t,n){let i=P.resolve(t,"./",n+".json");if(this.fallbackToLanguage&&!this._fileExistsSync(i)&&~n.lastIndexOf("_")){const c=P.resolve(t,"./",n.split("_")[0]+".json");this._fileExistsSync(c)&&(i=c)}return i}_fileExistsSync(t){return P.exists(t)}}function Rt(e,t){P=t;const n=new Ft(e);return{__:n.__.bind(n),__n:n.__n.bind(n),setLocale:n.setLocale.bind(n),getLocale:n.getLocale.bind(n),updateLocale:n.updateLocale.bind(n),locale:n.locale}}const Lt=e=>Rt(e,Nt),Wt="require is not supported by ESM",He="loading a directory of commands is not supported yet for ESM";let te;try{te=ct.fileURLToPath(typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:ze&&ze.src||new URL("vue-mess-detector.umd.js",document.baseURI).href)}catch{te=process.cwd()}const Pt=te.substring(0,te.lastIndexOf("node_modules"));Ie.notStrictEqual,Ie.strictEqual,D.inspect,Pt||process.cwd(),x.basename,x.dirname,x.extname,x.relative,x.resolve,process.cwd,process.exit,process.nextTick,typeof process.stdout.columns<"u"&&process.stdout.columns,B.readFileSync,Lt({directory:x.resolve(te,"../../../locales"),updateFiles:!1});const Ne="\x1B[44m",Q="\x1B[43m",S="\x1B[41m",Tt="\x1B[42m",A="\x1B[0m",v="\x1B[33m",N="\x1B[36m",b="\x1B[0m",Fe=50,ne=[],Bt=(e,t)=>{const n=e.content.split(`
`);n.length>Fe&&ne.push({fileName:t,scriptLength:n.length})},It=()=>(ne.length>0&&(console.log(`
${N}rrd${b} ${S}Long <script> blocks${A} in ${ne.length} files.`),console.log(`👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Fe} lines.${b}`),ne.forEach(e=>{console.log(`- ${e.fileName} ${e.scriptLength>Fe*2?S:Q}(${e.scriptLength} lines)${A}`)})),ne.length),se=[],zt=e=>{se.push(e)},qt=()=>(se.length>0&&(console.log(`
${N}rrd${b} ${Q}Plain <script> blocks${A} in ${se.length} files.`),console.log(`👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${b}`),se.forEach(e=>{console.log(`- ${e}`)})),se.length),oe=[],Mt=(e,t)=>{const n=/\belse\b/gi,i=e.content.match(n);i?.length&&oe.push({fileName:t,elseCount:i.length})},Ut=()=>(oe.length>0&&(console.log(`
${N}rrd${b} ${Q}else conditions${A} are used in ${oe.length} files.`),console.log(`👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${b}`),oe.forEach(e=>{console.log(`- ${e.fileName} ${Q}(${e.elseCount})${A}`)})),oe.length),Vt=5,Gt=10,re=[],Dt=(e,t)=>{const n=/\bif\b/gi,i=/\belse\b/gi,c=/\bfor\b/gi,u=/\bwhile\b/gi,d=/\bcase\b/gi,g=e.content.match(n),_=e.content.match(i),R=e.content.match(c),w=e.content.match(u),M=e.content.match(d),Z=(g?.length||0)+(_?.length||0)+(R?.length||0)+(w?.length||0)+(M?.length||0);Z>Vt&&re.push({fileName:t,cyclomaticComplexity:Z})},Qt=()=>(re.length>0&&(console.log(`
${N}rrd${b} ${Ne}cyclomaticComplexity${A} is above moderate in ${re.length} files.`),console.log(`👉 ${v}Try to reduce complexity.${b}`),re.forEach(e=>{console.log(`- ${e.fileName} ${e.cyclomaticComplexity>Gt?S:Q}(${e.cyclomaticComplexity})${A}`)})),re.length),ie=[],Kt=e=>{if(e.includes("pages"))return;const t=x.basename(e);if(t==="App.vue")return;const n=/[A-Z]/;t.slice(1).match(n)?.length||ie.push({filePath:e})},Zt=()=>(ie.length>0&&(console.log(`
${N}vue-essential${b} ${S}single name component${A} is used in ${ie.length} files.`),console.log(`👉 ${v}Rename the component to use multi-word name.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`),ie.forEach(e=>{console.log(`- ${e.filePath} 🚨`)})),ie.length),ce=[],Yt=(e,t)=>{e.scoped||ce.push({filePath:t})},Ht=()=>(ce.length>0&&(console.log(`
${N}vue-essential${b} ${S}Global style ${A} is used in ${ce.length} files.`),console.log(`👉 ${v}Use <style scoped>.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`),ce.forEach(e=>{console.log(`- ${e.filePath} 🚨`)})),ce.length),le=[],Xt=(e,t)=>{const n=/defineProps\(\[/gi;e.content.match(n)?.length&&le.push({filePath:t})},Jt=()=>(le.length>0&&(console.log(`
${N}vue-essential${b} ${S}simple prop${A} is used in ${le.length} files.`),console.log(`👉 ${v}Add at least type definition.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`),le.forEach(e=>{console.log(`- ${e.filePath} 🚨`)})),le.length),ae=[],kt=(e,t)=>{const n=/<[^>]+ v-if[^>]+ v-for[^>]+>/gi,i=/<[^>]+ v-for[^>]+ v-if[^>]+>/gi,c=e.content.match(n),u=e.content.match(i);(c?.length||u?.length)&&ae.push({filePath:t})},en=()=>(ae.length>0&&(console.log(`
${N}vue-essential${b} ${S}v-if used with v-for${A} in ${ae.length} files.`),console.log(`👉 ${v}Move out the v-if to a computed property.${b} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`),ae.forEach(e=>{console.log(`- ${e.filePath} 🚨`)})),ae.length),ue=[],tn=(e,t)=>{const n=/<[^>]+ v-for[^>]+>/gi,i=e.content.match(n);i?.length&&(i.some(u=>u.includes(":key"))||ue.push({filePath:t}))},nn=()=>(ue.length>0&&(console.log(`
${N}vue-essential${b} ${S}v-for has no key${A} in ${ue.length} files.`),console.log(`👉 ${v}Add a \`:key\` property to all v-for.${b} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`),ue.forEach(e=>{console.log(`- ${e.filePath} 🚨`)})),ue.length),fe=[],sn=e=>{if(e.includes("pages/")||e.includes("layouts/"))return;const t=x.basename(e),n=/^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/,i=t.match(n),c=/^([a-z0-9]+-)+[a-z0-9]+\.vue$/,u=t.match(c);!i?.length&&!u?.length&&fe.push({fileName:e})},on=()=>(fe.length>0&&(console.log(`
${N}vue-strong${b} ${S}component name is not PascalCase and not kebab-abse${A} in ${fe.length} files.`),console.log(`👉 ${v}Rename the component to use PascalCase or kebab-case file name.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`),fe.forEach(e=>{console.log(`- ${S}${e.fileName}${A}`)})),fe.length),he=[],rn=/^[a-z]+([A-Z][a-z]*)+$/,cn=(e,t)=>{const n=/defineProps\({([^}]+)/g;let i;for(;(i=n.exec(e.content))!==null;)i[1].replace(/\s+/g,"").replace(/["']/g,"").split(",").map(u=>u.split(":")[0]).filter(u=>u.length).filter(u=>!rn.test(u)).length&&he.push({filePath:t})},ln=()=>(he.length>0&&(console.log(`
${N}vue-strong${b} ${S}prop names are not camelCased${A} in ${he.length} files.`),console.log(`👉 ${v}Rename the props to camelCase.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`),he.forEach(e=>{console.log(`- ${e.filePath} 🚨`)})),he.length),H=[],an=40,un=(e,t)=>{const n=/{{\s*([\s\S]*?)\s*}}/g;[...e.content.matchAll(n)].map(c=>c[1].trim()).forEach(c=>{c.length>an&&(H.some(u=>u.filePath===t)||H.push({filePath:t}))})},fn=()=>(H.length>0&&(console.log(`
${N}vue-strong${b} ${S}Lengthy template expression${A} found in ${H.length} files.`),console.log(`👉 ${v}Refactor the expression into a computed property.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`),H.forEach(e=>{console.log(`- ${e.filePath} 🚨`)})),H.length),hn=/^(\(.*\)|\\?.)$/;function V(e){const t=e.toString();return hn.test(t)?t:`(?:${t})`}const dn=/^(?:\(\?:(.+)\)|(\(?.+\)?))$/,pn=/^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;function $(e){const t=n=>$(`(?<${n}>${`${e}`.replace(dn,"$1$2")})`);return{toString:()=>e.toString(),and:Object.assign((...n)=>$(`${e}${q(...n)}`),{referenceTo:n=>$(`${e}\\k<${n}>`)}),or:(...n)=>$(`(?:${e}|${q(...n)})`),after:(...n)=>$(`(?<=${q(...n)})${e}`),before:(...n)=>$(`${e}(?=${q(...n)})`),notAfter:(...n)=>$(`(?<!${q(...n)})${e}`),notBefore:(...n)=>$(`${e}(?!${q(...n)})`),times:Object.assign(n=>$(`${V(e)}{${n}}`),{any:()=>$(`${V(e)}*`),atLeast:n=>$(`${V(e)}{${n},}`),atMost:n=>$(`${V(e)}{0,${n}}`),between:(n,i)=>$(`${V(e)}{${n},${i}}`)}),optionally:()=>$(`${V(e)}?`),as:t,groupedAs:t,grouped:()=>$(`${e}`.replace(pn,"($1$3)$2")),at:{lineStart:()=>$(`^${e}`),lineEnd:()=>$(`${e}$`)}}}const gn=/[.*+?^${}()|[\]\\/]/g;function Xe(e){return $(`[${e.replace(/[-\\^\]]/g,"\\$&")}]`)}function Re(e){return $(`[^${e.replace(/[-\\^\]]/g,"\\$&")}]`)}$("."),$("\\b\\w+\\b");const be=$("\\w");$("\\b"),$("\\d"),$("\\s");const mn=Object.assign($("[a-zA-Z]"),{lowercase:$("[a-z]"),uppercase:$("[A-Z]")}),$n=$("\\t"),yn=$("\\n");$("\\r"),$("\\W+"),$("\\W"),$("\\B"),$("\\D"),$("\\S"),Object.assign($("[^a-zA-Z]"),{lowercase:$("[^a-z]"),uppercase:$("[^A-Z]")}),$("[^\\t]"),$("[^\\n]"),$("[^\\r]");function K(...e){return $(`${V(q(...e))}?`)}function q(...e){return $(e.map(t=>typeof t=="string"?t.replace(gn,"\\$&"):t).join(""))}function G(...e){return $(`${V(q(...e))}+`)}const Le=(...e)=>{const t=e.length>1&&(Array.isArray(e[e.length-1])||e[e.length-1]instanceof Set)?e.pop():void 0;return new RegExp(q(...e).toString(),[...t||""].join(""))},Je=(e,t)=>{if(!t.includes(`
`))return e.split(`
`).findIndex(d=>d.includes(t))+1;const n=e.indexOf(t),i=e.slice(0,n).split(`
`).length,c=t.split(`
`).length;return i+c-1},de=[],bn=(e,t)=>{const n=e.template,i=Le("<",G(be),K(G(Xe(` 	
\r`))),G(Re("/>")),K(G(Xe(` 	
\r`))),K("/"),">",["g"]),c=n.content.match(i);if(c===null)return;const u=Le(":",G(be),K(" "),"=",K(" "),Re(`'"`),["g"]);c.forEach(d=>{if(!d.includes(":"))return;const g=d.match(u);if(g?.length){const _=Je(e.source,d);de.push({message:`${t}#${_} ${Q}${g}${A}`})}})},En=()=>(de.length>0&&(console.log(`
${N}vue-strong${b} ${S}Attribute value is not quoted${A} in ${de.length} files.`),console.log(`👉 ${v}Use quotes for attribute values.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`),de.forEach(e=>{console.log(`- ${e.message} 🚨`)})),de.length),pe=[],An=(e,t)=>{const n=e.template,i=Le("<",G(mn.uppercase,be),K(yn,$n),K(G(Re(">"))),"></",G(be),">",["g"]),c=n.content.match(i);c!==null&&c.forEach(u=>{const d=Je(e.source,u),g=u.split(`
`).at(-1)?.trim()||"";pe.push({message:`${t}#${d} ${Q}${g}${A}`})})},_n=()=>(pe.length>0&&(console.log(`
${N}vue-strong${b} - ${S}Component is not self closing${A} in ${pe.length} files.`),console.log(`👉 ${v}Components with no content should be self-closing.${b} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`),pe.forEach(e=>{console.log(`- ${e.message} 🚨`)})),pe.length);let ke=0;const wn=["src","components","pages","layouts","server","composables","store","utils","plugins","middleware"],et=(e,t)=>{const n=B.readdirSync(e);ke+=n.length;for(const i of n){const c=x.join(e,i);B.statSync(c).isDirectory()?wn.some(u=>c.includes(u))&&et(c,t):i.endsWith(".vue")&&t(c)}},Cn=e=>{console.log(`

${Ne}Analyzing Vue files in ${e}${A}`);let t=0;et(e,n=>{if(n.includes("App.vue")||n.includes("app.vue"))return;const i=B.readFileSync(n,"utf-8"),{descriptor:c}=lt.parse(i);Kt(n),sn(n),c.script&&zt(n);const u=c.scriptSetup||c.script;u&&(Xt(u,n),cn(u,n),Bt(u,n),Dt(u,n),Mt(u,n)),c.styles.forEach(d=>{Yt(d,n)}),c.template&&(tn(c.template,n),kt(c.template,n),An(c,n),un(c.template,n),bn(c,n))}),console.log(`Found ${Ne}${ke}${A} Vue files`),t+=Zt(),t+=Jt(),t+=nn(),t+=en(),t+=Ht(),t+=on(),t+=_n(),t+=ln(),t+=fn(),t+=En(),t+=It(),t+=qt(),t+=Qt(),t+=Ut(),t||console.log(`${Tt}No code smells detected!${A}`)};L(ft(process.argv)).command("analyze [path]","Analyze Vue files for code smells",e=>e.positional("path",{describe:"path to the Vue files",type:"string",default:"./"}),e=>{Cn(e.path)}).help().argv});
