import { assetPath } from './paths';

export function registerSW(_options: { immediate?: boolean } = {}): void {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  window.addEventListener('load',() => { void navigator.serviceWorker.register(assetPath('sw.js')).catch(() => undefined); },{ once:true });
}
