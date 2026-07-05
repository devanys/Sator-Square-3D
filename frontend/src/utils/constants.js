export const SATOR_SQUARE = [["S","A","T","O","R"],["A","R","E","P","O"],["T","E","N","E","T"],["O","P","E","R","A"],["R","O","T","A","S"]];
export const MEANINGS = { SATOR: "The Sower - One who plants seeds", AREPO: "A mysterious word", TENET: "Holds - To master", OPERA: "Works - Creations", ROTAS: "Wheels - Turning of wheels" };
export const DIRECTIONS = { right: { label: "Right", words: ["SATOR","AREPO","TENET","OPERA","ROTAS"] }, left: { label: "Left", words: ["ROTAS","OPERA","TENET","AREPO","SATOR"] }, down: { label: "Down", words: ["SATOR","AREPO","TENET","OPERA","ROTAS"] }, up: { label: "Up", words: ["ROTAS","OPERA","TENET","AREPO","SATOR"] } };
export const TUTORIAL_STEPS = [
  { title: "Your Objective", text: "Rearrange the 25 shuffled letters back into the original Sator Square." },
  { title: "Select a Letter", text: "Click a letter in the pool below the grid. It will glow." },
  { title: "Place on Grid", text: "Click any empty cell to place the selected letter there." },
  { title: "Remove", text: "Click a filled cell to return its letter to the pool." },
  { title: "Check", text: "Fill all 25 cells, then click Check. Wrong letters flash red." },
  { title: "Hints", text: "Hint auto-places one correct letter but adds +15 seconds." },
];
export function formatTime(s) { return String(Math.floor(s/60)).padStart(2,"0") + ":" + String(s%60).padStart(2,"0"); }
export function getCellSequences(dir) {
  const seq = [];
  if (dir==="right") for(let r=0;r<5;r++) seq.push([0,1,2,3,4].map(c=>r*5+c));
  else if (dir==="left") for(let r=0;r<5;r++) seq.push([4,3,2,1,0].map(c=>r*5+c));
  else if (dir==="down") for(let c=0;c<5;c++) seq.push([0,1,2,3,4].map(r=>r*5+c));
  else if (dir==="up") for(let c=0;c<5;c++) seq.push([4,3,2,1,0].map(r=>r*5+c));
  return seq;
}
