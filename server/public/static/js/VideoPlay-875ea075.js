import{v as a,a as n}from"./video.js-7a18786c.js";import{_ as d}from"./index-1da509b1.js";import{f as l,j as u,h as v,B as _,o as p,c as m,a as c,n as f}from"./@vue-6d96ee7e.js";const g={class:"videoPlay"},y=["src"],h={props:{videoSrc:String,previewImgSrc:String,autoPlay:Boolean},setup(s){const o=s,t=l();let e;const i=async()=>{a.addLanguage("zh-CN",n),await f();const r={muted:!0,controls:!0,autoplay:!0,loop:!0,language:"zh-CN",techOrder:["html5"],playbackRates:[.5,1,1.5,2,2.5,3,3.5,4,5],poster:o.previewImgSrc};e=a(t.value,r,()=>{a.log("\u64AD\u653E\u5668\u5DF2\u7ECF\u51C6\u5907\u597D\u4E86!"),o.autoPlay&&o.videoSrc&&e.play(),e.on("ended",()=>{a.log("\u64AD\u653E\u7ED3\u675F\u4E86!")}),e.on("error",()=>{a.log("\u64AD\u653E\u5668\u89E3\u6790\u51FA\u9519!")})})};return u(()=>{i()}),v(()=>o.videoSrc,()=>{e.pause(),e.src(o.videoSrc),e.load(),o.videoSrc&&e.play()}),_(()=>{e==null||e.dispose()}),(r,S)=>(p(),m("div",g,[c("video",{ref_key:"m3u8_video",ref:t,class:"video-js vjs-default-skin vjs-big-play-centered",controls:""},[c("source",{src:s.videoSrc},null,8,y)],512)]))}};var x=d(h,[["__scopeId","data-v-0dd63736"]]);export{x as V};
