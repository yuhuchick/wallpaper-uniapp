import{a6 as a,a7 as t,a8 as e,a9 as s,aa as r,ab as o,ac as d,ad as l,ae as n,M as c,P as u}from"./index-efdce372.js";const i=(a,t)=>{const e=a.__vccOpts||a;for(const[s,r]of t)e[s]=r;return e};function h(a,t){return"string"==typeof a?t:a}const m=e=>(s,r=t())=>{!l&&a(e,s,r)},g=m(e),f=m(s),p=m(r),w=m(o),b=m(d);function y(a={}){let{url:t,method:e="GET",header:s={},data:r={}}=a;return t="https://tea.qingnian8.com/api/bizhi"+t,s["access-key"]="110269",new Promise(((a,o)=>{n({url:t,header:s,method:e,data:r,success:t=>{0===t.data.errCode?a(t.data):400===t.data.errCode?(c({title:"错误提示",content:t.data.errMsg,showCancel:!1}),o(t.data)):(u({title:"res.data.errMsg",icon:"none"}),o(t.data))},timeout:1e4})}))}const C=()=>y({url:"/homeBanner"}),L=a=>y({url:"/wallNewsList",data:a,method:"post"}),M=a=>y({url:"/wallNewsDetail",data:a,method:"get"}),W=a=>y({url:"/classify",data:a,method:"get"}),_=a=>y({url:"/randomWall",data:a,method:"get"}),j=a=>y({url:"/wallList",data:a,method:"get"}),k=a=>y({url:"/setupScore",data:a,method:"get"}),x=()=>y({url:"/userInfo",method:"get"}),N=a=>y({url:"/userWallList",data:a,method:"get"}),P=a=>y({url:"/searchWall",data:a,method:"get"});export{i as _,w as a,g as b,L as c,W as d,_ as e,x as f,C as g,p as h,f as i,N as j,j as k,M as l,P as m,b as o,h as r,k as s};