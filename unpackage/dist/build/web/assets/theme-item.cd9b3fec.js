import{q as s,b as e,g as a,o as t,c as l,w as o,a as c,u,r as i,d as n,i as r,j as m,h as d,p,t as f,v as _,l as h}from"./index-efdce372.js";import{_ as y}from"./uni-icons.630f56e1.js";import{_ as g,r as v}from"./apis.df0f859b.js";const x=g({__name:"common-nav",setup(p){const f=s(),_=e(f.statusBarHeight),{height:h,top:g}=uni.getMenuButtonBoundingClientRect(),x=e(h+2*(g-_.value));return(s,e)=>{const p=r,f=v(a("uni-icons"),y),h=m,g=d;return t(),l(p,{class:"layout"},{default:o((()=>[c(p,{class:"commonNav"},{default:o((()=>[c(p,{class:"navStatus",style:u({height:_.value+"px"})},null,8,["style"]),c(p,{class:"navContent",style:u({height:x.value+"px"})},{default:o((()=>[c(p,{class:"title"},{default:o((()=>[i(s.$slots,"default",{},void 0,!0)])),_:3}),c(g,{class:"search",url:"/pages/search/search"},{default:o((()=>[c(f,{type:"search",size:"20",color:"#666"}),c(h,{class:"text"},{default:o((()=>[n("搜索")])),_:1})])),_:1})])),_:3},8,["style"])])),_:3}),c(p,{class:"fill",style:u({height:_.value+x.value+"px"})},null,8,["style"]),c(p,{class:"fill_h5"})])),_:3})}}},[["__scopeId","data-v-0b33d83d"]]);function b(s){const e=(new Date).getTime()-s,a=Math.floor(e/6e4),t=Math.floor(e/36e5),l=Math.floor(e/864e5),o=Math.floor(e/2592e6);return e<6e4?"1分钟":e<36e5?`${a}分钟`:e<864e5?`${t}小时`:e<2592e6?`${l}天`:e<31536e6?`${o}月`:null}const M=g({__name:"theme-item",props:{isMore:{type:Boolean,default:!1},item:{type:Object,default:()=>({name:"null",picurl:"null",updateTime:Date.now()-18e6,_id:"null"})}},setup(s){const e=s;return p((()=>{console.log(e.isMore)})),(e,u)=>{const i=h,p=r,g=d,x=m,M=v(a("uni-icons"),y);return t(),l(p,{class:"theme_item"},{default:o((()=>[s.isMore?(t(),l(g,{key:1,url:"../../pages/classify/classify","open-type":"reLaunch",class:"box more"},{default:o((()=>[c(i,{src:"/yuhuwall/assets/more-14a1a72b.jpg",mode:"aspectFill",class:"pic"}),c(p,{class:"mask"},{default:o((()=>[c(x,null,{default:o((()=>[n("更多")])),_:1}),c(M,{type:"more-filled",size:"30",class:"text",color:"#fff"})])),_:1})])),_:1})):(t(),l(g,{key:0,url:`../../pages/classList/classList?classid=${s.item._id}&name=${s.item.name}`,class:"box"},{default:o((()=>[c(i,{src:s.item.picurl,mode:"aspectFill",class:"pic"},null,8,["src"]),c(p,{class:"mask"},{default:o((()=>[n(f(s.item.name),1)])),_:1}),c(p,{class:"tab"},{default:o((()=>[n(f(_(b)(s.item.updateTime))+"前更新 ",1)])),_:1})])),_:1},8,["url"]))])),_:1})}}},[["__scopeId","data-v-83015c6e"]]);export{x as _,M as a};
