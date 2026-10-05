export const STORAGE_KEY = {
  KEY_LEADERBOARD: 'leaderboard',
} as const;

export type key = (typeof STORAGE_KEY)[keyof typeof STORAGE_KEY];

export function getData<T>(key: key, defaultData: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return defaultData;
    return JSON.parse(data) as T;
  } catch (err) {
    console.warn(
      `Ошибка чтения ${key} из localStorage, применены дефолтные настройки:`,
      err
    );
    return defaultData;
  }
}

export function setData<T>(key: key, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Ошибка записи ${key} в localStorage:`, err);
  }
}
