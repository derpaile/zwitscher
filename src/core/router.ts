export type Route =
  | { name:'home' }
  | { name:'course'; id:string }
  | { name:'lesson'; courseId:string; phase:string }
  | { name:'species'; id:string }
  | { name:'book' }
  | { name:'compare'; first?:string; second?:string }
  | { name:'stats' }
  | { name:'settings' }
  | { name:'placement' }
  | { name:'mode'; id?:string };

export function parseRoute(hash = location.hash): Route {
  const [first = '',second = '',third = ''] = hash.replace(/^#\/?/,'').split('/');
  if (first === 'course' && second && third) return { name:'lesson',courseId:second,phase:third };
  if (first === 'course' && second) return { name:'course',id:second };
  if (first === 'species' && second) return { name:'species',id:second };
  if (first === 'compare') return { name:'compare',first:second || undefined,second:third || undefined };
  if (['book','stats','settings','placement'].includes(first)) return { name:first as 'book'|'stats'|'settings'|'placement' };
  if (first === 'mode') return { name:'mode',id:second || undefined };
  return { name:'home' };
}

export function navigate(path: string): void {
  const hash = `#/${path.replace(/^\//,'')}`;
  if (location.hash === hash) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else location.hash = hash;
}
