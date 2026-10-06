import { TypeCard, cards } from '../data/cards';
import { createCard } from './card';
import { shuffle } from '../utils/shuffle';
import { el } from './dom';

export function createGameBoard(): HTMLElement {
  const allCards = [...cards, ...cards];
  const shuffleCards = shuffle<TypeCard>(allCards);
  const cardsHTML = shuffleCards.map((card) => createCard(card.type, card.url));

  const gameBoard = el(
    'main',
    {
      id: 'game-board',
      class: 'game-board',
    },
    cardsHTML
  );

  return gameBoard;
}
