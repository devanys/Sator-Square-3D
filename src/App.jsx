import { useState, useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Sator3DViewer from "./components/Sator3DViewer";
import ExploreSection from "./components/ExploreSection";
import PuzzleSection from "./components/PuzzleSection";
import HistorySection from "./components/HistorySection";
import { useSatorData } from "./hooks/useSatorData";
import { formatTime } from "./utils/constants";
function Toast({message,type,onDone}){const c={success:"border-l-success",error:"border-l-danger",info:"border-l-ember"};useState(()=>{const t=setTimeout(onDone,3500);return()=>clearTimeout(t);});return(<div className={"fixed bottom-6 right-6 z-[200] px-5 py-3.5 rounded bg-stone border border-border shadow-[0_8px_24px_rgba(0,0,0,0.4)] text-parchment text-sm border-l-[3px] "+(c[type]||c.info)} style={{animation:"fadeUp 0.3s ease forwards"}}>{message}</div>);}
export default function App(){
  const{squareData,stats,sites,refreshStats}=useSatorData();
  const[toast,setToast]=useState(null);
  const pRef=useRef(null);
  const handlePlay=()=>{pRef.current?.scrollIntoView({behavior:"smooth"});};
  const handleSolved=useCallback(async time=>{setToast({message:"Solved in "+formatTime(time)+"!",type:"success"});await refreshStats();},[refreshStats]);
  return(<><Navbar/><main><HeroSection onPlay={handlePlay}/><Sator3DViewer/><ExploreSection data={squareData}/><div ref={pRef}><PuzzleSection stats={stats} onSolved={handleSolved}/></div><HistorySection sites={sites}/></main><footer className="relative z-2 border-t border-border py-10 px-8 text-center bg-abyss"><div className="font-cinzel font-black text-base tracking-[0.2em] text-ember mb-2">SATOR SQUARE</div><p className="text-muted text-sm">A digital tribute to a two-thousand-year mystery</p></footer>{toast&&<Toast{...toast}onDone={()=>setToast(null)}/>}</>);
}
