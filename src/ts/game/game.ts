import { TOTAL_PAIRS } from '../data/cards';
import { saveRecord } from '../storage/leaderboard';
import { updateCounters } from '../ui/header';

const CLOSE_DELAY_MS = 1000;
const PAIR_SIZE = 2;

interface GameState {
  moves: number;
  pairsFound: number;
  lockBoard: boolean;
  currentCards: HTMLElement[];
  closeTimerId: number | null;
}

interface GameHooks {
  onWin: (moves: number) => void;
}

const state: GameState = {
  moves: 0,
  pairsFound: 0,
  lockBoard: false,
  currentCards: [],
  closeTimerId: null,
};

let hooks: GameHooks | null = null;
export function initGame(gameHooks: GameHooks): void {
  hooks = gameHooks;
}

function openCard(card: HTMLElement): void {
  card.classList.add('is-open');
}

function closeCard(card: HTMLElement): void {
  card.classList.remove('is-open');
}

function matchedCards(cards: HTMLElement[]): void {
  cards.forEach((card) => card.classList.add('is-matched'));
}

function isPair(cards: HTMLElement[]): boolean {
  return cards[0].dataset.value === cards[1].dataset.value;
}

function timerClose(cards: HTMLElement[]): number {
  const timerId = setTimeout(() => {
    cards.forEach((card) => closeCard(card));
    state.lockBoard = false;
    state.currentCards = [];
    state.closeTimerId = null;
  }, CLOSE_DELAY_MS);
  return timerId;
}

export function gameLoop(e: MouseEvent): void {
  if (state.lockBoard) return;

  const card = (e.target as HTMLElement).closest<HTMLElement>('.card');
  if (!card) return;
  if (card.classList.contains('is-open')) return;

  openCard(card);
  state.currentCards.push(card);
  if (state.currentCards.length < PAIR_SIZE) return;

  state.moves++;

  if (isPair(state.currentCards)) {
    state.pairsFound++;
    matchedCards(state.currentCards);
    state.currentCards = [];

    updateCounters(state.moves, state.pairsFound);

    if (state.pairsFound === TOTAL_PAIRS) {
      saveRecord(state.moves);
      hooks?.onWin(state.moves);
    }
  } else {
    state.lockBoard = true;
    state.closeTimerId = timerClose(state.currentCards);
    updateCounters(state.moves);
  }
}

export function startNewGame(): void {
  if (state.closeTimerId !== null) {
    clearTimeout(state.closeTimerId);
    state.closeTimerId = null;
  }

  state.lockBoard = false;
  state.currentCards = [];
  state.moves = 0;
  state.pairsFound = 0;

  updateCounters(0, 0);
}
