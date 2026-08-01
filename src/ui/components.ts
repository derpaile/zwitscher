import type { MasteryLabel, Species } from '../types';

export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>'"]/g,(char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]!));
}

export function birdIllustration(bird: Species, className = ''): string {
  const [body,wing,accent,chest]=bird.illustration.palette;
  const crest=bird.illustration.mark==='crest'?`<path d="m125 33 14-28 8 27 15-24 2 34Z" fill="${accent}"/>`:'';
  const tail=bird.illustration.mark==='long-tail'?`<path d="M80 158 18 207l75-27Z" fill="${wing}"/>`:`<path d="M61 170 34 193l48-10 23-22Z" fill="${wing}"/>`;
  const chestPatch=bird.illustration.mark==='red-chest'?`<path d="M120 76c18-20 51-17 65 5-8 25-26 36-49 31-2-14-7-26-16-36Z" fill="${accent}"/>`:'';
  const beak=bird.illustration.mark==='long-beak'?'<path d="m188 67 51 9-53 10Z" fill="'+accent+'"/>':'<path d="m188 67 38 9-40 10Z" fill="'+accent+'"/>';
  return `<svg class="bird-art ${className}" viewBox="0 0 240 210" role="img" aria-label="Illustration: ${escapeHtml(bird.name)}"><g transform="translate(3 2)">${tail}<path d="M81 170 69 204l34-27Z" fill="${body}"/><ellipse cx="121" cy="122" rx="69" ry="61" fill="${body}" transform="rotate(-10 121 122)"/><ellipse cx="137" cy="138" rx="44" ry="43" fill="${chest}" transform="rotate(-17 137 138)"/><ellipse cx="91" cy="129" rx="37" ry="47" fill="${wing}" transform="rotate(24 91 129)"/><path d="M65 119c21 4 34 17 44 38-24-5-37-15-44-38Z" fill="${accent}" opacity=".34"/><circle cx="150" cy="66" r="43" fill="${body}"/>${crest}${chestPatch}<circle cx="166" cy="57" r="5" fill="#152e29"/><circle cx="168" cy="55" r="1.4" fill="white"/>${beak}<path d="M112 177v18m24-17 4 17m-37 0h18m9 0h19" fill="none" stroke="#684c35" stroke-width="4" stroke-linecap="round"/></g></svg>`;
}

export function masteryBadge(label: MasteryLabel, level: number): string {
  return `<span class="mastery-badge level-${level}"><i></i>${label}</span>`;
}

export function formatBytes(bytes: number): string {
  return bytes >= 1024*1024 ? `${(bytes/1024/1024).toFixed(1)} MB` : `${Math.ceil(bytes/1024)} KB`;
}

export function todayKey(date = new Date()): string {
  return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(date);
}

export function seededRandom(seedText: string): () => number {
  let seed=[...seedText].reduce((value,char)=>((value<<5)-value+char.charCodeAt(0))|0,2166136261);
  return () => { seed|=0; seed=seed+0x6D2B79F5|0; let value=Math.imul(seed^seed>>>15,1|seed); value=value+Math.imul(value^value>>>7,61|value)^value; return ((value^value>>>14)>>>0)/4294967296; };
}

export function shuffle<T>(items: T[], random = Math.random): T[] {
  const copy=[...items];
  for(let index=copy.length-1;index>0;index-=1){const next=Math.floor(random()*(index+1));[copy[index],copy[next]]=[copy[next]!,copy[index]!];}
  return copy;
}

