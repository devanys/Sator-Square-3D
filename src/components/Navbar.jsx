import { useState, useEffect } from "react";
const ITEMS=[{id:"hero",label:"Home"},{id:"viewer",label:"3D Viewer"},{id:"explore",label:"Explore"},{id:"puzzle",label:"Puzzle"},{id:"history",label:"History"}];
export default function Navbar(){
  const[scrolled,setScrolled]=useState(false);
  const[active,setActive]=useState("hero");
  useEffect(()=>{const f=()=>{setScrolled(scrollY>60);for(const i of[...ITEMS].reverse()){const e=document.getElementById(i.id);if(e&&e.getBoundingClientRect().top<=200){setActive(i.id);break;}}};window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f);},[]);
  return(<nav className={"fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 flex justify-between items-center transition-all duration-400 "+(scrolled?"bg-abyss/90 backdrop-blur-xl shadow-[0_1px_0_var(--color-border)]":"")}><a href="#hero" className="font-cinzel font-black text-lg tracking-[0.2em] text-ember no-underline">SATOR</a><ul className="hidden md:flex gap-8 list-none">{ITEMS.map(i=><li key={i.id}><a href={"#"+i.id} className={"font-cinzel text-xs tracking-[0.15em] uppercase no-underline transition-colors relative "+(active===i.id?"text-ember":"text-dust")} style={{textDecoration:"none"}}>{i.label}</a></li>)}</ul></nav>);
}
