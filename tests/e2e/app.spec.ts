import { expect, test } from '@playwright/test';

test('zeigt den Lernpfad und alle 60 Arten', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading',{name:'Höre, was draußen lebt.'})).toBeVisible();
  await expect(page.locator('.course-card')).toHaveCount(8);
  await page.getByRole('button',{name:'Vogelbuch'}).click();
  await expect(page.locator('.bird-card')).toHaveCount(60);
});

test('startet eine geführte Kennenlernphase', async ({ page }) => {
  await page.goto('/#/course/garten');
  await page.getByRole('button',{name:/Kennenlernen/}).click();
  await expect(page.getByText('Kennenlernen',{exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'Stimme hören'})).toBeVisible();
});

test('bleibt auf einem schmalen Mobilbildschirm ohne horizontalen Überlauf', async ({ page }) => {
  await page.setViewportSize({width:390,height:844}); await page.goto('/');
  const sizes=await page.evaluate(()=>({width:window.innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.width);
});

test('löscht einen erkannten Version-3-Stand erst nach Bestätigung', async ({ page }) => {
  await page.addInitScript(()=>localStorage.setItem('zwitscher-progress',JSON.stringify({version:3})));
  await page.goto('/');
  await expect(page.getByRole('heading',{name:'Ein neuer Lernweg beginnt.'})).toBeVisible();
  await page.getByRole('button',{name:'Version 2 neu starten'}).click();
  await expect(page.getByRole('heading',{name:'Höre, was draußen lebt.'})).toBeVisible();
  expect(await page.evaluate(()=>({legacy:localStorage.getItem('zwitscher-progress'),reset:localStorage.getItem('zwitscher-v2-reset-complete')}))).toEqual({legacy:null,reset:'1'});
});

test('installiert Medien und läuft anschließend offline', async ({ page, context }) => {
  test.slow(); await page.goto('/');
  const install=page.getByRole('button',{name:/Alles installieren|Fortsetzen/});
  if(await install.isVisible()){await install.click();await expect(page.getByText('Vollständig offline')).toBeVisible({timeout:120_000});}
  await page.reload();
  await expect.poll(()=>page.evaluate(()=>Boolean(navigator.serviceWorker?.controller)),{timeout:30_000}).toBe(true);
  await context.setOffline(true); await page.reload();
  await expect(page.getByRole('heading',{name:'Höre, was draußen lebt.'})).toBeVisible();
  await context.setOffline(false);
});
