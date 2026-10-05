import flower1 from '../../assets/cards/flower_1.jpg';
import flower2 from '../../assets/cards/flower_2.jpg';
import flower3 from '../../assets/cards/flower_3.jpg';
import flower4 from '../../assets/cards/flower_4.jpg';
import flower5 from '../../assets/cards/flower_5.jpg';
import flower6 from '../../assets/cards/flower_6.jpg';
import flower7 from '../../assets/cards/flower_7.jpg';
import flower8 from '../../assets/cards/flower_8.jpg';

export interface TypeCard {
  type: string;
  url: string;
}

export const cards: Card[] = [
  { type: 'cosmos_pink', url: flower1 },
  { type: 'dandelion', url: flower2 },
  { type: 'mimosa', url: flower3 },
  { type: 'cosmos_red', url: flower4 },
  { type: 'tulip', url: flower5 },
  { type: 'daffodil', url: flower6 },
  { type: 'muscari', url: flower7 },
  { type: 'hellebore', url: flower8 },
];
