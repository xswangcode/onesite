import{f as z,$ as I,j as K,_ as i,a7 as Q,o as f,c as b,a as c,U as e,M as t,O as $,u as s,b6 as X,b5 as Y,F as L,a3 as T,T as d,L as Z,P as ee,S as u}from"./@vue-6d96ee7e.js";import{_ as te,s as ae,d as le,b as oe}from"./index-737c8748.js";import{u as ne}from"./vue-router-46b85125.js";import{E as U}from"./element-plus-acf07be3.js";import"./axios-f45f83e3.js";import"./vuex-6acfb48c.js";import"./js-base64-8ead6284.js";import"./@element-plus-b7b60d74.js";import"./vuex-persistedstate-1d34ce44.js";import"./screenfull-c3c7916b.js";import"./nprogress-68ff125e.js";import"./@babel-12f0454d.js";import"./mockjs-f3aada47.js";import"./@kangc-fa0960ac.js";import"./vue-15f590c1.js";import"./lodash-es-b6050654.js";import"./@vueuse-09fe686d.js";import"./@ctrl-eb0b847c.js";import"./dayjs-61d83afd.js";import"./async-validator-1193b133.js";import"./memoize-one-99e54574.js";import"./escape-html-4bbaf1e1.js";import"./normalize-wheel-es-eea50788.js";import"./@floating-ui-a9dc73ab.js";const se=y=>(X("data-v-1a61eeb3"),y=y(),Y(),y),ie=se(()=>c("h2",null,"\u8868\u683C\u5E03\u5C40",-1)),re=u(" \u4E0A\u4E00\u9875"),ce={class:"font-color"},ue=u(" \u4E0B\u4E00\u9875"),pe={class:"grid-content"},de={style:{display:"none"}},_e=["onClick"],ge={class:"multi-line2"},ve=u("\u70B9\u8D5E"),me=u("\u6536\u85CF"),fe=u("\u4E0B\u8F7D"),ye={style:{"margin-left":"10px"}},be={setup(y){const j=ne(),V=z(null),_=I({isloading:!0,data:[]}),B=[{value:"category=ori&viewtype=basic",label:"91\u539F\u521B"},{label:"\u5F53\u524D\u6700\u70ED",value:"category=hot&viewtype=basic"},{label:"\u672C\u6708\u6700\u70ED",value:"category=top&viewtype=basic"},{label:"\u975E\u4ED8\u8D39",value:"category=nonpaid&viewtype=basic"},{label:"10\u5206\u949F\u4EE5\u4E0A",value:"category=long&viewtype=basic"},{label:"20\u5206\u949F\u4EE5\u4E0A",value:"category=longer&viewtype=basic"},{label:"\u672C\u6708\u6536\u85CF",value:"category=tf&viewtype=basic"},{label:"\u672C\u6708\u52A0\u7CBE",value:"category=rf&viewtype=basic"},{label:"\u9AD8\u6E05",value:"category=hd&viewtype=basic"},{label:"\u6BCF\u6708\u6700\u70ED",value:"category=top&m=-1&viewtype=basic"},{label:"\u672C\u6708\u6536\u85CF",value:"category=tf&viewtype=basic"},{label:"\u672C\u6708\u8BA8\u8BBA",value:"category=md&viewtype=basic"},{label:"\u6536\u85CF\u6700\u591A",value:"category=mf&viewtype=basic"}],h=z("category=hot&viewtype=basic"),w=z(),D=o=>{alert("\u70B9\u8D5E\u4E86"+o)},N=o=>{alert("\u6536\u85CF\u4E86"+o)},E=async(o,n)=>{await le(o,n).then(p=>{U.success(n+"\u4E0B\u8F7D\u5B8C\u6210\uFF01\u6587\u4EF6\u8DEF\u5F84\uFF1A"+JSON.stringify(p))}).catch(p=>{U.error(p)})},l=I({currentPage:1,pageSize:24,small:!0,background:!1,total:1e3,pagerCount:5,layout:"prev, pager, next, jumper"}),M=o=>{l.pageSize=o},x=o=>{o<=0&&(o=1),o>=l.pagerCount&&(o=l.pagerCount),l.currentPage=o,_.isloading=!0,C(),V.value.setScrollTop(0)},P=()=>{window.innerWidth<768?(l.small=!0,l.pagerCount=5,l.background=!1,l.layout="prev, pager, next, jumper"):(l.small=!1,l.pagerCount=10,l.background=!0,l.layout="prev, pager, next, jumper")},C=async()=>{let o=await ae(l.currentPage,h.value);_.data=o.data.data,l.total=1e3,_.isloading=!1};(()=>{P(),C()})(),K(()=>{window.onresize=()=>P()});const R=async(o,n,p)=>{let k=await oe(o);j.push({name:"video-preview",params:{href:k.data,img:n,title:p}})};return(o,n)=>{const p=i("el-option"),k=i("el-select"),F=i("el-switch"),g=i("el-link"),r=i("el-col"),v=i("el-row"),O=i("el-image"),W=i("CollectionTag"),m=i("el-icon"),A=i("Star"),J=i("ChatLineRound"),q=i("el-scrollbar"),G=i("el-pagination"),H=Q("loading");return f(),b("div",null,[ie,c("div",null,[e(k,{modelValue:h.value,"onUpdate:modelValue":n[0]||(n[0]=a=>h.value=a),onChange:C},{default:t(()=>[(f(),b(L,null,T(B,a=>e(p,{key:a.value,label:a.label,value:a.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"]),e(F,{modelValue:w.value,"onUpdate:modelValue":n[1]||(n[1]=a=>w.value=a)},null,8,["modelValue"])]),$((f(),b("div",null,[e(v,null,{default:t(()=>[e(r,{span:7},{default:t(()=>[e(g,{onClick:n[2]||(n[2]=a=>x(s(l).currentPage-1)),style:{"padding-left":"10px"}},{default:t(()=>[re]),_:1})]),_:1}),e(r,{span:10,class:"page-size-content"},{default:t(()=>[c("h3",ce,"\u7B2C"+d(s(l).currentPage)+"\u9875",1)]),_:1}),e(r,{span:7,style:{"text-align":"right"}},{default:t(()=>[e(g,{onClick:n[3]||(n[3]=a=>x(s(l).currentPage+1))},{default:t(()=>[ue]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(q,{height:"70vh",ref_key:"congtentScrollbar",ref:V},{default:t(()=>[(f(!0),b(L,null,T(s(_).data,(a,we)=>(f(),Z(r,{xs:24,sm:12,md:12,lg:8,xl:6,class:"content-item"},{default:t(()=>[c("div",pe,[c("div",de,d(a.id),1),c("div",{style:{width:"400px",height:"255px","text-align":"center"},onClick:S=>R(a.href,a.imgurl,a.title)},[$(e(O,{style:{"max-width":"100%","max-height":"100%"},src:a.imgurl},null,8,["src"]),[[ee,w.value]])],8,_e),c("div",ge,d(a.title),1),c("div",null,[e(v,{style:{padding:"8px 0 8px 0"}},{default:t(()=>[e(r,{span:12,class:"single-line-truncate"},{default:t(()=>[u(" \u4F5C\u8005: "+d(a.otherInfo.\u4F5C\u8005),1)]),_:2},1024),e(r,{span:4},{default:t(()=>[e(g,{type:"success",onClick:S=>D(a)},{default:t(()=>[ve]),_:2},1032,["onClick"])]),_:2},1024),e(r,{span:4},{default:t(()=>[e(g,{type:"danger",onClick:S=>N(a)},{default:t(()=>[me]),_:2},1032,["onClick"])]),_:2},1024),e(r,{span:4},{default:t(()=>[e(g,{type:"warning",onClick:S=>E(a.href,a.title)},{default:t(()=>[fe]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024),e(v,null,{default:t(()=>[e(r,{span:8,class:"info",style:{"vertical-align":"text-top",display:"inline"}},{default:t(()=>[c("div",null,[e(m,{style:{top:"2px"}},{default:t(()=>[e(m,null,{default:t(()=>[e(W)]),_:1})]),_:1}),u(" \u70ED\u5EA6 "+d(a.otherInfo.\u70ED\u5EA6),1)])]),_:2},1024),e(r,{span:8,class:"info"},{default:t(()=>[c("div",null,[e(m,{style:{top:"2px"}},{default:t(()=>[e(A)]),_:1}),u(" \u6536\u85CF "+d(a.otherInfo.\u6536\u85CF),1)])]),_:2},1024),e(r,{span:8,class:"info"},{default:t(()=>[c("div",null,[e(m,{style:{top:"2px"}},{default:t(()=>[e(m,null,{default:t(()=>[e(J)]),_:1})]),_:1}),u(" \u7559\u8A00 "+d(a.otherInfo.\u7559\u8A00),1)])]),_:2},1024)]),_:2},1024)])])]),_:2},1024))),256))]),_:1},512)]),_:1}),e(v,{style:{"margin-top":"15px"}},{default:t(()=>[e(r,null,{default:t(()=>[c("div",ye,[e(G,{"current-page":s(l).currentPage,"onUpdate:current-page":n[4]||(n[4]=a=>s(l).currentPage=a),"page-size":s(l).pageSize,"onUpdate:page-size":n[5]||(n[5]=a=>s(l).pageSize=a),small:s(l).small,"pager-count":s(l).pagerCount,background:s(l).background,layout:s(l).layout,total:s(l).total,onSizeChange:M,onCurrentChange:x},null,8,["current-page","page-size","small","pager-count","background","layout","total"])])]),_:1})]),_:1})])),[[H,s(_).isloading]])])}}};var qe=te(be,[["__scopeId","data-v-1a61eeb3"]]);export{qe as default};
