import axios from "axios";
import { SATOR_SQUARE, DIRECTIONS, MEANINGS } from "../utils/constants";
const api = axios.create({ baseURL: "/api", timeout: 5000 });
function shuffle(a) { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b; }
export async function fetchSquareData() { try{const{data}=await api.get("/square");return data;}catch{return{...DIRECTIONS,meanings:MEANINGS};} }
export async function fetchPool() { try{const{data}=await api.get("/puzzle/pool");return data.pool;}catch{return shuffle(SATOR_SQUARE.flat());} }
export async function validateGrid(grid) {
  try{const{data}=await api.post("/puzzle/validate",{grid});return data;}catch{
    const errors=[];for(let r=0;r<5;r++)for(let c=0;c<5;c++)if(grid[r][c]!==SATOR_SQUARE[r][c])errors.push({row:r,col:c,expected:SATOR_SQUARE[r][c]});
    return{is_valid:!errors.length,errors,message:errors.length?errors.length+" incorrect.":"Perfect!"};
  }
}
export async function saveCompletion(t,h) { try{const{data}=await api.post("/puzzle/complete",{time_seconds:t,hints_used:h});return data;}catch{return{id:Date.now()};} }
export async function fetchStats() { try{const{data}=await api.get("/stats");return data;}catch{return[];} }
export async function fetchSites() { try{const{data}=await api.get("/sites");return data;}catch{return[
  {id:1,name:"Pompeii",location:"Italy",description:"Oldest known Sator Square, buried by Vesuvius in 79 AD."},
  {id:2,name:"Dura-Europos",location:"Syria",description:"Found in a Roman garrison, 3rd century AD."},
  {id:3,name:"Cirencester",location:"England",description:"Found in the Romano-British town of Corinium."},
  {id:4,name:"Cihampelas",location:"West Java, Indonesia",description:"A unique local version carved into stone."},
  {id:5,name:"Austria",location:"Austria",description:"Several medieval examples found in churches."},
];}}
