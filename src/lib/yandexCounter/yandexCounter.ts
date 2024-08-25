const NEXT_PUBLIC_YM_ID = process.env.NEXT_PUBLIC_YM_ID || '';
const yandexMetrikaId = Math.trunc(Number(NEXT_PUBLIC_YM_ID));

export const yandexCounter = {
  hit(url: string, params?: object): void {
    if (!window.ym) return;
    if (!url) return;

    window.ym(yandexMetrikaId, 'hit', url, params);
  },
  initReach(name: string, params?: object, callback?: () => void): void {
    if (!window.ym) return;
    if (!name) return;

    window.ym(yandexMetrikaId, 'reachGoal', name, params, callback);
  },
};
