import{c as h}from"./index-54b8bdf2.js";import{u as v}from"./vue-router-46b85125.js";import{f as k,j as w,_ as p,o as i,c as m,U as o,M as t,F as x,a3 as B,a as C,L,S as s,T as _}from"./@vue-6d96ee7e.js";import"./axios-f45f83e3.js";import"./vuex-6acfb48c.js";import"./js-base64-8ead6284.js";import"./@element-plus-b7b60d74.js";import"./element-plus-acf07be3.js";import"./lodash-es-b6050654.js";import"./@vueuse-09fe686d.js";import"./@ctrl-eb0b847c.js";import"./dayjs-61d83afd.js";import"./@babel-12f0454d.js";import"./async-validator-1193b133.js";import"./memoize-one-99e54574.js";import"./escape-html-4bbaf1e1.js";import"./normalize-wheel-es-eea50788.js";import"./@floating-ui-a9dc73ab.js";import"./vuex-persistedstate-1d34ce44.js";import"./screenfull-c3c7916b.js";import"./nprogress-68ff125e.js";import"./mockjs-f3aada47.js";import"./@kangc-fa0960ac.js";import"./vue-15f590c1.js";const g=C("h3",null,"\u672C\u5730\u5217\u8868",-1),y=s(" \u540D\u5B57 "),F=s(" \u5927\u5C0F "),Z={setup(N){const u=v(),l=k([]);w(()=>{h().then(e=>{console.log(e.data),l.value=e.data})});const d=async(e,n)=>{u.push({name:"video-preview",params:{href:"/video/"+n,title:n}})};return(e,n)=>{const a=p("el-col"),c=p("el-row"),f=p("el-link");return i(),m("div",null,[g,o(c,{span:24},{default:t(()=>[o(a,{span:18},{default:t(()=>[y]),_:1}),o(a,{span:3},{default:t(()=>[F]),_:1})]),_:1}),(i(!0),m(x,null,B(l.value,r=>(i(),L(c,{span:24},{default:t(()=>[o(a,{span:18},{default:t(()=>[o(f,{type:"success",onClick:V=>d(r.path,r.name)},{default:t(()=>[s(_(r.name),1)]),_:2},1032,["onClick"])]),_:2},1024),o(a,{span:3},{default:t(()=>[s(_(r.size),1)]),_:2},1024)]),_:2},1024))),256))])}}};export{Z as default};