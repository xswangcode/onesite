import{f as h,$ as P,j as Z,_ as i,a7 as ee,o as f,c as b,O as $,u as r,U as e,M as t,a as c,F as I,a3 as L,T as _,L as te,P as le,S as u}from"./@vue-6d96ee7e.js";import{_ as ae,d as oe,s as ne,b as se}from"./index-48156133.js";import{u as ie}from"./vue-router-46b85125.js";import{K as re}from"./@element-plus-122ed453.js";import{E as T}from"./element-plus-3e2e5634.js";import"./axios-f45f83e3.js";import"./vuex-6acfb48c.js";import"./js-base64-8ead6284.js";import"./vuex-persistedstate-1d34ce44.js";import"./screenfull-c3c7916b.js";import"./nprogress-68ff125e.js";import"./@babel-12f0454d.js";import"./mockjs-f3aada47.js";import"./@kangc-fa0960ac.js";import"./vue-15f590c1.js";import"./lodash-es-b6050654.js";import"./@vueuse-09fe686d.js";import"./@ctrl-eb0b847c.js";import"./dayjs-61d83afd.js";import"./async-validator-1193b133.js";import"./memoize-one-99e54574.js";import"./escape-html-4bbaf1e1.js";import"./normalize-wheel-es-eea50788.js";import"./@floating-ui-a9dc73ab.js";const ce={style:{width:"100vw"}},ue=u("\u8868\u683C\u5E03\u5C40"),pe=u(" \u4E0A\u4E00\u9875"),de={class:"font-color"},_e=u(" \u4E0B\u4E00\u9875"),ge={class:"grid-content"},me={style:{display:"none"}},ve=["onClick"],fe={class:"multi-line2"},ye=u("\u70B9\u8D5E"),he=u("\u6536\u85CF"),be=u("\u4E0B\u8F7D"),we={style:{"margin-left":"10px"}},xe={setup(Ce){const U=ie(),V=h(null),y=h(""),g=P({isloading:!0,data:[]}),j=[{value:"category=ori&viewtype=basic",label:"91\u539F\u521B"},{label:"\u5F53\u524D\u6700\u70ED",value:"category=hot&viewtype=basic"},{label:"\u672C\u6708\u6700\u70ED",value:"category=top&viewtype=basic"},{label:"\u975E\u4ED8\u8D39",value:"category=nonpaid&viewtype=basic"},{label:"10\u5206\u949F\u4EE5\u4E0A",value:"category=long&viewtype=basic"},{label:"20\u5206\u949F\u4EE5\u4E0A",value:"category=longer&viewtype=basic"},{label:"\u672C\u6708\u6536\u85CF",value:"category=tf&viewtype=basic"},{label:"\u672C\u6708\u52A0\u7CBE",value:"category=rf&viewtype=basic"},{label:"\u9AD8\u6E05",value:"category=hd&viewtype=basic"},{label:"\u6BCF\u6708\u6700\u70ED",value:"category=top&m=-1&viewtype=basic"},{label:"\u672C\u6708\u6536\u85CF",value:"category=tf&viewtype=basic"},{label:"\u672C\u6708\u8BA8\u8BBA",value:"category=md&viewtype=basic"},{label:"\u6536\u85CF\u6700\u591A",value:"category=mf&viewtype=basic"}],w=h("category=hot&viewtype=basic"),x=h(),B=o=>{alert("\u70B9\u8D5E\u4E86"+o)},D=o=>{alert("\u6536\u85CF\u4E86"+o)},E=async(o,n)=>{await oe(o,n).then(p=>{T.success("["+n+"]"+p)}).catch(p=>{T.error(p)})},a=P({currentPage:1,pageSize:24,small:!0,background:!1,total:0,pagerCount:5,layout:"prev, pager, next, jumper"}),M=o=>{a.pageSize=o},C=o=>{o<=0&&(o=1),o>=a.pagerCount&&(o=a.pagerCount),a.currentPage=o,k()},N=()=>{y.value?alert(y.value):k()},z=()=>{window.innerWidth<768?(a.small=!0,a.pagerCount=5,a.background=!1,a.layout="prev, pager, next, jumper"):(a.small=!1,a.pagerCount=21,a.background=!0,a.layout="prev, pager, next, jumper")},k=async()=>{g.isloading=!0;let o=await ne(a.currentPage,w.value);g.data=o.data.data,a.total=o.data.totalPage*a.pageSize,g.isloading=!1,V.value.setScrollTop(0)},R=()=>{z(),k()};Z(()=>{R(),window.onresize=()=>z()});const F=async(o,n,p)=>{let s=await se(o);U.push({name:"video-preview",params:{href:s.data,img:n,title:p}})};return(o,n)=>{const p=i("el-switch"),s=i("el-col"),d=i("el-row"),W=i("el-option"),A=i("el-select"),K=i("el-button"),O=i("el-input"),m=i("el-link"),q=i("el-image"),G=i("CollectionTag"),v=i("el-icon"),H=i("Star"),J=i("ChatLineRound"),Q=i("el-scrollbar"),X=i("el-pagination"),Y=ee("loading");return f(),b("div",null,[$((f(),b("div",null,[e(d,{span:24},{default:t(()=>[e(s,{span:24},{default:t(()=>[c("div",ce,[c("h2",null,[ue,e(p,{modelValue:x.value,"onUpdate:modelValue":n[0]||(n[0]=l=>x.value=l)},null,8,["modelValue"])])])]),_:1})]),_:1}),e(d,{span:24},{default:t(()=>[e(s,{class:"content-item"},{default:t(()=>[e(O,{modelValue:y.value,"onUpdate:modelValue":n[2]||(n[2]=l=>y.value=l),style:{"max-width":"93vw"},placeholder:"\u5173\u952E\u8BCD",class:"input-with-select"},{prepend:t(()=>[e(A,{modelValue:w.value,"onUpdate:modelValue":n[1]||(n[1]=l=>w.value=l),placeholder:"\u7C7B\u522B",style:{width:"115px"}},{default:t(()=>[(f(),b(I,null,L(j,l=>e(W,{key:l.value,label:l.label,value:l.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),append:t(()=>[e(K,{style:{width:"50px"},icon:r(re),onClick:N},null,8,["icon"])]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(d,{xs:22,sm:22,md:22,lg:22,xl:22},{default:t(()=>[e(s,{xs:6,sm:8,md:8,lg:8,xl:8},{default:t(()=>[e(m,{onClick:n[3]||(n[3]=l=>C(r(a).currentPage-1)),style:{"padding-left":"10px"}},{default:t(()=>[pe]),_:1})]),_:1}),e(s,{xs:13,sm:8,md:8,lg:8,xl:8,class:"page-size-content"},{default:t(()=>[c("h3",de,"\u7B2C"+_(r(a).currentPage)+"\u9875",1)]),_:1}),e(s,{xs:4,sm:6,md:6,lg:6,xl:6,style:{"text-align":"right"}},{default:t(()=>[e(m,{onClick:n[4]||(n[4]=l=>C(r(a).currentPage+1))},{default:t(()=>[_e]),_:1})]),_:1})]),_:1}),e(d,null,{default:t(()=>[e(Q,{height:"60vh",ref_key:"congtentScrollbar",ref:V},{default:t(()=>[(f(!0),b(I,null,L(r(g).data,(l,ke)=>(f(),te(s,{xs:24,sm:12,md:12,lg:8,xl:6,class:"content-item"},{default:t(()=>[c("div",ge,[c("div",me,_(l.id),1),c("div",{style:{width:"350px",height:"255px","text-align":"center"},onClick:S=>F(l.href,l.imgurl,l.title)},[$(e(q,{style:{"max-width":"100%","max-height":"100%"},src:l.imgurl},null,8,["src"]),[[le,x.value]])],8,ve),c("div",fe,_(l.title),1),c("div",null,[e(d,{style:{padding:"8px 0 8px 0"}},{default:t(()=>[e(s,{span:12,class:"single-line-truncate"},{default:t(()=>[u(" \u4F5C\u8005: "+_(l.otherInfo.\u4F5C\u8005),1)]),_:2},1024),e(s,{span:4},{default:t(()=>[e(m,{type:"success",onClick:S=>B(l)},{default:t(()=>[ye]),_:2},1032,["onClick"])]),_:2},1024),e(s,{span:4},{default:t(()=>[e(m,{type:"danger",onClick:S=>D(l)},{default:t(()=>[he]),_:2},1032,["onClick"])]),_:2},1024),e(s,{span:4},{default:t(()=>[e(m,{type:"warning",onClick:S=>E(l.href,l.title)},{default:t(()=>[be]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024),e(d,null,{default:t(()=>[e(s,{span:8,class:"info",style:{"vertical-align":"text-top",display:"inline"}},{default:t(()=>[c("div",null,[e(v,{style:{top:"2px"}},{default:t(()=>[e(v,null,{default:t(()=>[e(G)]),_:1})]),_:1}),u(" \u70ED\u5EA6 "+_(l.otherInfo.\u70ED\u5EA6),1)])]),_:2},1024),e(s,{span:8,class:"info"},{default:t(()=>[c("div",null,[e(v,{style:{top:"2px"}},{default:t(()=>[e(H)]),_:1}),u(" \u6536\u85CF "+_(l.otherInfo.\u6536\u85CF),1)])]),_:2},1024),e(s,{span:8,class:"info"},{default:t(()=>[c("div",null,[e(v,{style:{top:"2px"}},{default:t(()=>[e(v,null,{default:t(()=>[e(J)]),_:1})]),_:1}),u(" \u7559\u8A00 "+_(l.otherInfo.\u7559\u8A00),1)])]),_:2},1024)]),_:2},1024)])])]),_:2},1024))),256))]),_:1},512)]),_:1}),e(d,{style:{"margin-top":"15px"}},{default:t(()=>[e(s,null,{default:t(()=>[c("div",we,[e(X,{"current-page":r(a).currentPage,"onUpdate:current-page":n[5]||(n[5]=l=>r(a).currentPage=l),"page-size":r(a).pageSize,"onUpdate:page-size":n[6]||(n[6]=l=>r(a).pageSize=l),small:r(a).small,"pager-count":r(a).pagerCount,background:r(a).background,layout:r(a).layout,total:r(a).total,onSizeChange:M,onCurrentChange:C},null,8,["current-page","page-size","small","pager-count","background","layout","total"])])]),_:1})]),_:1})])),[[Y,r(g).isloading]])])}}};var Je=ae(xe,[["__scopeId","data-v-5276ee24"]]);export{Je as default};
