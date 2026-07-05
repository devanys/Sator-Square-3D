import { useState, useEffect } from "react";
import { fetchSquareData, fetchStats, fetchSites } from "../services/api";
export function useSatorData() {
  const [squareData,setSquareData]=useState(null);
  const [stats,setStats]=useState([]);
  const [sites,setSites]=useState([]);
  const load=async()=>{const[sq,st,si]=await Promise.all([fetchSquareData(),fetchStats(),fetchSites()]);setSquareData(sq);setStats(st);setSites(si);};
  useEffect(()=>{load();},[]);
  const refreshStats=async()=>{setStats(await fetchStats());};
  return{squareData,stats,sites,refreshStats};
}
