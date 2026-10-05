import { getState, incrementMoves, incrementPairs, reset } from './store';
import { TOTAL_PAIRS } from '../data/cards';
import { saveRecord } from '../storage/leaderboard';
import { updateCounters } from '../ui/header';

const CLOSE_DELAY_MS = 1000;
const PAIR_SIZE = 2;

let lockBoard = false;
let currentCards: HTMLElement[] = [];
let closeTimerId: number | null = null;

interface GameHooks {
  onWin: (moves: number) => void;
}

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
    lockBoard = false;
    currentCards = [];
    closeTimerId = null;
  }, CLOSE_DELAY_MS);
  return timerId;
}

export function gameLoop(e: MouseEvent): void {
  if (lockBoard) return;

  const card = (e.target as HTMLElement).closest<HTMLElement>('.card');
  if (!card) return;
  if (card.classList.contains('is-open')) return;

  openCard(card);
  currentCards.push(card);
  if (currentCards.length < PAIR_SIZE) return;

  incrementMoves();

  if (isPair(currentCards)) {
    incrementPairs();
    matchedCards(currentCards);
    currentCards = [];

    const state = getState();
    updateCounters(state.countMoves, state.countPairs);

    if (state.countPairs === TOTAL_PAIRS) {
      saveRecord(state.countMoves);
      hooks?.onWin(state.countMoves);
    }
  } else {
    lockBoard = true;
    closeTimerId = timerClose(currentCards);
    updateCounters(getState().countMoves);
  }
}

export function startNewGame(): void {
  if (closeTimerId !== null) {
    clearTimeout(closeTimerId);
    closeTimerId = null;
  }

  lockBoard = false;
  currentCards = [];

  reset();
  updateCounters(0, 0);
}
