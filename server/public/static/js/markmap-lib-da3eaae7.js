import{d as h}from"./@babel-dfdb6114.js";import{R as P}from"./remarkable-40c43540.js";import{b,U as X,H as v,w as _,p as M,a as C,c as x,n as $}from"./markmap-common-cbf3a342.js";import{r as O}from"./remarkable-katex-7afcf914.js";import{j as U}from"./js-yaml-cbc5ac57.js";import{H as F}from"./highlight.js-9e97e1d7.js";/*! markmap-lib v0.15.2 | MIT License */const A=`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Markmap</title>
<style>
* {
  margin: 0;
  padding: 0;
}
#mindmap {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
<!--CSS-->
</head>
<body>
<svg id="mindmap"></svg>
<!--JS-->
</body>
</html>
`,E=["d3@7.8.5/dist/d3.min.js","markmap-view@0.15.0/dist/browser/index.js"],w="katex",z=["katex@0.16.8/dist/katex.min.js"].map(t=>b(t)),T=b("webfontloader@1.6.28/webfontloader.js");T.data.defer=!0;const B=["katex@0.16.8/dist/katex.min.css"].map(t=>x(t)),I={versions:{katex:"0.16.8",webfontloader:"1.6.28"},preloadScripts:z,scripts:[{type:"iife",data:{fn:t=>{window.WebFontConfig={custom:{families:["KaTeX_AMS","KaTeX_Caligraphic:n4,n7","KaTeX_Fraktur:n4,n7","KaTeX_Main:n4,n7,i4,i7","KaTeX_Math:i4,i7","KaTeX_Script","KaTeX_SansSerif:n4,n7,i4","KaTeX_Size1","KaTeX_Size2","KaTeX_Size3","KaTeX_Size4","KaTeX_Typewriter"]},active:()=>{t().refreshHook.call()}}},getParams({getMarkmap:t}){return[t]}}},T],styles:B};function L(t){return{transformer:t,parser:new v,beforeParse:new v,afterParse:new v,htmltag:new v,retransform:new v}}const k={name:w,config:I,transform(t){var e,a;let n=$;return t.parser.tap(r=>{r.use(O),r.renderer.rules.katex=_(r.renderer.rules.katex,(s,...i)=>(n(),s(...i)))}),t.beforeParse.tap((r,s)=>{n=()=>{s.features[w]=!0}}),{styles:(e=k.config)==null?void 0:e.styles,scripts:(a=k.config)==null?void 0:a.scripts}}},N="frontmatter";var W={name:N,transform(t){return t.beforeParse.tap((e,a)=>{const{content:n}=a;if(!n.startsWith(`---
`))return;const r=n.indexOf(`
---
`);if(r<0)return;const s=n.slice(4,r);let i;try{var c;i=U.load(s),(c=i)!=null&&c.markmap&&(i.markmap=H(i.markmap))}catch{return}a.frontmatter=i,a.content=n.slice(r+5),a.contentLineOffset=n.slice(0,r).split(`
`).length+1}),{}}};function H(t){if(!!t)return["color","extraJs","extraCss"].forEach(e=>{t[e]!=null&&(t[e]=D(t[e]))}),["duration","maxWidth","initialExpandLevel"].forEach(e=>{t[e]!=null&&(t[e]=R(t[e]))}),t}function D(t){var e;let a;return typeof t=="string"?a=[t]:Array.isArray(t)&&(a=t.filter(n=>n&&typeof n=="string")),(e=a)!=null&&e.length?a:void 0}function R(t){if(!isNaN(+t))return+t}const Y="npmUrl";var q={name:Y,transform(t){return t.afterParse.tap((e,a)=>{const{frontmatter:n}=a,r=n==null?void 0:n.markmap;r&&["extraJs","extraCss"].forEach(s=>{const i=r[s];i&&(r[s]=i.map(c=>c.startsWith("npm:")?t.transformer.urlBuilder.getFullUrl(c.slice(4)):c))})}),{}}};const S="hljs",G=["@highlightjs/cdn-assets@11.8.0/highlight.min.js"].map(t=>b(t)),Q=["@highlightjs/cdn-assets@11.8.0/styles/default.min.css"].map(t=>x(t)),V={versions:{hljs:"11.8.0"},preloadScripts:G,styles:Q},j={name:S,config:V,transform(t){var e;let a=$;return t.parser.tap(n=>{n.set({highlight:(r,s)=>(a(),F.highlightAuto(r,s?[s]:void 0).value)})}),t.beforeParse.tap((n,r)=>{a=()=>{r.features[S]=!0}}),{styles:(e=j.config)==null?void 0:e.styles}}},Z=[W,k,j,q];function tt(t,e){return e.type==="script"&&e.data.src?h({},e,{data:h({},e.data,{src:t.urlBuilder.getFullUrl(e.data.src)})}):e}function et(t,e){return e.type==="stylesheet"&&e.data.href?h({},e,{data:h({},e.data,{href:t.urlBuilder.getFullUrl(e.data.href)})}):e}function J(t){if(t.type==="heading")t.children=t.children.filter(r=>r.type!=="paragraph");else if(t.type==="list_item"){var e;t.children=t.children.filter(r=>["paragraph","fence"].includes(r.type)?(t.content||(t.content=r.content,t.payload=h({},t.payload,r.payload)),!1):!0),((e=t.payload)==null?void 0:e.index)!=null&&(t.content=`${t.payload.index}. ${t.content}`)}else if(t.type==="ordered_list"){var a,n;let r=(a=(n=t.payload)==null?void 0:n.startIndex)!=null?a:1;t.children.forEach(s=>{s.type==="list_item"&&(s.payload=h({},s.payload,{index:r}),r+=1)})}t.children.length>0&&(t.children.forEach(r=>J(r)),t.children.length===1&&!t.children[0].content&&(t.children=t.children[0].children))}function K(t,e=0){t.depth=e,t.children.forEach(a=>{K(a,e+1)})}class ot{constructor(e=Z){this.assetsMap={},this.urlBuilder=new X,this.hooks=L(this),this.plugins=e.map(r=>typeof r=="function"?r():r);const a={};for(const{name:r,transform:s}of this.plugins)a[r]=s(this.hooks);this.assetsMap=a;const n=new P("full",{html:!0,breaks:!0,maxNesting:1/0});n.renderer.rules.htmltag=_(n.renderer.rules.htmltag,(r,...s)=>{const i=r(...s);return this.hooks.htmltag.call({args:s,result:i}),i}),this.md=n,this.hooks.parser.call(n)}buildTree(e){const{md:a}=this,n={type:"root",depth:0,content:"",children:[],payload:{}},r=[n];let s=0;for(const l of e){const u={};l.lines&&(u.lines=l.lines);let o=r[r.length-1];if(l.type.endsWith("_open")){const f=l.type.slice(0,-5);if(f==="heading")for(s=l.hLevel;((i=o)==null?void 0:i.depth)>=s;){var i;r.pop(),o=r[r.length-1]}else{var c;s=Math.max(s,((c=o)==null?void 0:c.depth)||0)+1,f==="ordered_list"&&(u.startIndex=l.order)}const p={type:f,depth:s,payload:u,content:"",children:[]};o.children.push(p),r.push(p)}else if(o){if(l.type===`${o.type}_close`)o.type==="heading"?s=o.depth:(r.pop(),s=0);else if(l.type==="inline"){const f=this.hooks.htmltag.tap(d=>{var m;const g=(m=d.result)==null?void 0:m.match(/^<!--([\s\S]*?)-->$/),y=g==null?void 0:g[1].trim().split(" ");(y==null?void 0:y[0])==="fold"&&(o.payload=h({},o.payload,{fold:["all","recursively"].includes(y[1])?2:1}),d.result="")}),p=a.renderer.render([l],a.options,{});f(),o.content=`${o.content||""}${p}`}else if(l.type==="fence"){const f=a.renderer.render([l],a.options,{});o.children.push({type:l.type,depth:s+1,content:f,children:[],payload:u})}}else continue}return n}transform(e){var a;const n={content:e,features:{},contentLineOffset:0};this.hooks.beforeParse.call(this.md,n);const r=this.md.parse(n.content,{});this.hooks.afterParse.call(this.md,n);let s=this.buildTree(r);return J(s),((a=s.children)==null?void 0:a.length)===1&&(s=s.children[0]),K(s),h({},n,{root:s})}getAssets(e){var a;const n=[],r=[];(a=e)!=null||(e=this.plugins.map(s=>s.name));for(const s of e.map(i=>this.assetsMap[i]))s&&(s.styles&&n.push(...s.styles),s.scripts&&r.push(...s.scripts));return{styles:n.map(s=>et(this,s)),scripts:r.map(s=>tt(this,s))}}getUsedAssets(e){const a=this.plugins.map(n=>n.name).filter(n=>e[n]);return this.getAssets(a)}fillTemplate(e,a,n){var r,s;n=h({},n),(s=(r=n).baseJs)!=null||(r.baseJs=E.map(p=>this.urlBuilder.getFullUrl(p)).map(p=>b(p)));const{scripts:i,styles:c}=a,l=[...c?M(c):[]],u={getMarkmap:()=>window.markmap,getOptions:n.getOptions,jsonOptions:n.jsonOptions,root:e},o=[...C([...n.baseJs,...i||[],{type:"iife",data:{fn:(p,d,m,g)=>{const y=p();window.mm=y.Markmap.create("svg#mindmap",(d||y.deriveOptions)(g),m)},getParams:({getMarkmap:p,getOptions:d,root:m,jsonOptions:g})=>[p,d,m,g]}}],u)];return A.replace("<!--CSS-->",()=>l.join("")).replace("<!--JS-->",()=>o.join(""))}}export{ot as T};