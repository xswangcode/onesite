import{i as o}from"./echarts-56678659.js";import{b as n,R as s,e as c,q as i,w as m,x as d}from"./@vue-a5898d8d.js";import{Y as l}from"./zrender-1e23699e.js";const f=d("div",{id:"radar",style:{width:"100%",height:"80vh"}},null,-1),g={setup(u){const r=()=>{document.getElementById("radar").setAttribute("_echarts_instance_","");var t=document.getElementById("radar"),a=o(t),e={color:["#33ccff ","#ff99cc"],radar:{indicator:[{name:"\u4F53\u91CD",max:6500},{name:"\u6253\u8D25",max:16e3},{name:"\u5B8C\u6210\u76EE\u6807",max:3e4},{name:"\u8EAB\u4F53\u5E74\u9F84",max:38e3},{name:"\u8FD0\u52A8\u91CF",max:52e3}]},series:[{name:"Budget vs spending",type:"radar",data:[{value:[4200,3e3,2e4,35e3,5e4,18e3],name:"Allocated Budget"},{value:[5e3,14e3,28e3,26e3,42e3,21e3],name:"Actual Spending",areaStyle:{color:new l(.1,.6,1,[{color:"rgba(255, 145, 124, 0.1)",offset:0},{color:"#ff99cc ",offset:1}])}}]}]};e&&a.setOption(e),window.onresize=()=>{a.resize()}};return n(()=>{setTimeout(()=>{r()},1e3)}),(t,a)=>{const e=s("el-card");return c(),i(e,{style:{height:"85vh"}},{default:m(()=>[f]),_:1})}}};export{g as default};