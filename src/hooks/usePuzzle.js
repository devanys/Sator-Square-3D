import { useState, useCallback, useRef, useEffect } from "react";
import { fetchPool, validateGrid, saveCompletion } from "../services/api";
import { SATOR_SQUARE, formatTime } from "../utils/constants";
export function usePuzzle(onSolved) {
  const [grid,setGrid]=useState(()=>Array.from({length:5},()=>Array(5).fill("")));
  const [pool,setPool]=useState([]);
  const [selectedIdx,setSelectedIdx]=useState(null);
  const [timer,setTimer]=useState(0);
  const [isRunning,setIsRunning]=useState(false);
  const [isSolved,setIsSolved]=useState(false);
  const [hintPenalty,setHintPenalty]=useState(0);
  const [message,setMessage]=useState("Select a letter from the pool, then click a cell.");
  const [errorCells,setErrorCells]=useState([]);
  const intervalRef=useRef(null);
  useEffect(()=>{if(isRunning&&!isSolved){intervalRef.current=setInterval(()=>setTimer(t=>t+1),1000);}return()=>clearInterval(intervalRef.current);},[isRunning,isSolved]);
  const reset=useCallback(async()=>{clearInterval(intervalRef.current);setGrid(Array.from({length:5},()=>Array(5).fill("")));setSelectedIdx(null);setTimer(0);setIsRunning(false);setIsSolved(false);setHintPenalty(0);setErrorCells([]);setMessage("Select a letter from the pool, then click a cell.");const letters=await fetchPool();setPool(letters.map(l=>({letter:l,used:false})));},[]);
  const selectLetter=useCallback(idx=>{if(isSolved||pool[idx]?.used)return;if(!isRunning)setIsRunning(true);setSelectedIdx(p=>p===idx?null:idx);},[isSolved,isRunning,pool]);
  const onCellClick=useCallback((row,col)=>{if(isSolved)return;setErrorCells([]);if(grid[row][col]!==""){const l=grid[row][col];setGrid(g=>g.map((r,ri)=>r.map((c,ci)=>ri===row&&ci===col?"":c)));setPool(p=>p.map(i=>i.used&&i.letter===l?{...i,used:false}:i));return;}if(selectedIdx===null)return;const l=pool[selectedIdx].letter;setGrid(g=>g.map((r,ri)=>r.map((c,ci)=>ri===row&&ci===col?l:c)));setPool(p=>p.map((i,ii)=>ii===selectedIdx?{...i,used:true}:i));setSelectedIdx(null);},[isSolved,grid,pool,selectedIdx]);
  const check=useCallback(async()=>{if(isSolved)return null;setErrorCells([]);if(!grid.every(r=>r.every(c=>c!==""))){setMessage("Not all cells are filled yet.");return"incomplete";}const result=await validateGrid(grid);if(result.is_valid){setIsSolved(true);setIsRunning(false);const total=timer+hintPenalty;await saveCompletion(total,hintPenalty);setMessage("Solved in "+formatTime(total)+"!");if(onSolved)onSolved(total);return"success";}setErrorCells(result.errors.map(e=>e.row*5+e.col));setMessage(result.errors.length+" letters are still incorrect.");return"errors";},[isSolved,grid,timer,hintPenalty,onSolved]);
  const hint=useCallback(()=>{if(isSolved)return null;if(!isRunning)setIsRunning(true);setErrorCells([]);for(let r=0;r<5;r++)for(let c=0;c<5;c++)if(grid[r][c]!==SATOR_SQUARE[r][c]){const correct=SATOR_SQUARE[r][c];setGrid(g=>{const ng=g.map(row=>[...row]);if(ng[r][c]!==""){const wrong=ng[r][c];ng[r][c]="";setPool(p=>p.map(i=>i.used&&i.letter===wrong?{...i,used:false}:i));}ng[r][c]=correct;return ng;});setPool(p=>p.map(i=>!i.used&&i.letter===correct?{...i,used:true}:i));setSelectedIdx(null);setHintPenalty(h=>h+15);setMessage("Hint: \""+correct+"\" at row "+(r+1)+", col "+(c+1)+". +15s");return{row:r,col:c,letter:correct};}return null;},[isSolved,isRunning,grid]);
  return{grid,pool,selectedIdx,timer,isSolved,hintPenalty,message,errorCells,reset,selectLetter,onCellClick,check,hint};
}
