import { TypeCard, cards } from '../data/cards';
import { createCard } from './card';
import { shuffle } from '../utils/shuffle';

export function createGameBoard(): HTMLElement {
  const gameBoard = document.createElement('main');
  gameBoard.classList.add('game-board');
  gameBoard.id = 'game-board';

  const allCards = [...cards, ...cards];
  const shuffleCards = shuffle<TypeCard>(allCards);

  for (const cardData of shuffleCards) {
    const card = createCard(cardData.type, cardData.url);
    gameBoard.append(card);
  }

  return gameBoard;
}
