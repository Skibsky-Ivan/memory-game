export interface StateGame {
  countMoves: number;
  countPairs: number;
}

let state: StateGame = {
  countMoves: 0,
  countPairs: 0,
};

export function getState(): Readonly<StateGame> {
  return state;
}

export function incrementMoves(): void {
  state.countMoves++;
}

export function incrementPairs(): void {
  state.countPairs++;
}

export function reset(): void {
  state.countMoves = 0;
  state.countPairs = 0;
}
