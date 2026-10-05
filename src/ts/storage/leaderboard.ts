import { getData, setData, STORAGE_KEY } from './storage';

interface StoredResult {
  moves: number;
  dateIso: string;
}

export interface LeaderboardResult {
  moves: number;
  dateDisplay: string;
}

const key = STORAGE_KEY.KEY_LEADERBOARD;

function toLocalISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function toDisplayDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

function formRecord(moves: number): StoredResult {
  const now = new Date();
  const dateIso = toLocalISODate(now);
  return { moves, dateIso };
}

export function saveRecord(moves: number): void {
  const record = formRecord(moves);

  const leaders = getData<StoredResult[]>(key, []);
  const newLeaders = [...leaders, record]
    .sort((r1, r2) => r1.moves - r2.moves || (r1.dateIso > r2.dateIso ? 1 : -1))
    .slice(0, 10);
  setData<StoredResult[]>(key, newLeaders);
}

export function getTopResults(): LeaderboardResult[] {
  const leaders = getData<StoredResult[]>(key, []);
  return leaders.map((r) => ({
    moves: r.moves,
    dateDisplay: toDisplayDate(r.dateIso),
  }));
}
