import{j as o,F as c,a}from"./index-42138200.js";import{r as n,Q as x,P as v}from"./vendor-93cb2f88.js";import{a3 as y,ab as m,a4 as p,a5 as u,a6 as w,s as k,K as f,ac as C,ad as I,M as g,T as D,N,a7 as T,a9 as d,a8 as W,aa as A}from"./generateCategoricalChart-4dc5e7f9.js";var b=y({chartName:"BarChart",GraphicalChild:m,defaultTooltipEventType:"axis",validateTooltipEventTypes:["axis","item"],axisComponents:[{axisType:"xAxis",AxisComp:p},{axisType:"yAxis",AxisComp:u}],formatAxisMap:w});const E=async(e,s)=>{const r=k(s).toISOString(),t=await I("waterIntake",r);await g("waterIntake",{...t,total:((t==null?void 0:t.total)||0)+e.value,logs:((t==null?void 0:t.logs)||[]).concat([e]),date:(t==null?void 0:t.date)||r})},B=(e,s)=>{const r=k(s);return f("waterIntake",e,s,C(e,r))},h=({onSavedFinished:e})=>{const[s,r]=n.useState(0);return o(c,{children:[a("div",{className:"mt-3",children:"飲水量"}),a("div",{children:a(D,{type:"number",inputMode:"decimal",value:s,onChange:i=>r(i.target.value),onFocus:i=>i.target.select()})}),a(N,{onClick:async()=>{await E({value:parseInt(s),type:"water"},new Date),e&&e(),x("儲存成功！")},children:"加水"})]})},M=({data:e})=>o(c,{children:[a("div",{className:"text-xl font-bold ml-8",children:"飲水量"}),a(T,{weight:"100%",height:400,children:o(b,{data:e,children:[a(p,{dataKey:"date",tickFormatter:d}),a(u,{}),a(W,{labelFormatter:d}),a(m,{dataKey:"total",fill:"#8884d8"})]})})]}),K=()=>{const[e]=n.useState(new Date),[s,r]=n.useState("30days"),t=B(s,e),[i,l]=n.useState({show:!1});return o(c,{children:[o("div",{className:"grid grid-cols-4 pt-2",children:[o("div",{className:"col-span-4 md:col-span-3 pr-8 md:pr-4",children:[a("div",{className:"sticky top-16 bg-white z-10 flex justify-end w-full",children:a("button",{className:"p-4 md:hidden",onClick:()=>l({show:!0}),children:a(v,{className:"h-6 w-6"})})}),a(M,{data:t})]}),a("div",{className:"px-2 hidden md:block",children:a("div",{className:"sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto",children:a(h,{})})})]}),a(A,{isOpen:i.show,onRequestClose:()=>l({show:!1}),children:a(h,{onSavedFinished:()=>l({show:!1})})})]})};export{K as default};
