import{r,s as d,j as e,L as t}from"./index-CE5yhJHE.js";async function h(){var n;return await fetch("https://economia.awesomeapi.com.br/last/ETH-USD").then(i=>i.json()).then(i=>n=i.ETHUSD.bid).finally(()=>n).catch(i=>console.error(i))}var x=h();function m({id:n,pathStart:i=""}){const[o,l]=r.useState(0);async function c(){l(await x)}r.useEffect(()=>{c()},[]);const a=()=>{window.scrollTo({top:0,behavior:"smooth"})},s=d(n);return e.jsx(t,{to:`/Cyber-NFT/ArtPreview/${s==null?void 0:s.id}`,style:{textDecoration:"none"},onClick:()=>a(),children:e.jsxs("div",{className:"Card",children:[e.jsx("div",{className:"imgContainer",children:e.jsx("img",{src:`${i}${s==null?void 0:s.path}`,alt:""})}),e.jsxs("div",{className:"cardInfos",children:[e.jsxs("div",{className:"cardTopTexts",children:[e.jsx("h3",{className:"CardTitle",children:s==null?void 0:s.ArtName}),e.jsx("p",{children:s==null?void 0:s.collectionName})]}),e.jsxs("section",{children:[e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512",children:e.jsx("path",{d:"M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"})})}),e.jsxs("li",{children:[e.jsx("span",{children:s==null?void 0:s.EHT_price}),e.jsx("span",{children:"eht"})]})]}),e.jsxs("div",{children:[e.jsxs("span",{children:["$",(s==null?void 0:s.EHT_price)&&(s.EHT_price*o).toFixed(2)]}),e.jsx("span",{children:"USD"})]})]})]})]})})}export{m as default};
