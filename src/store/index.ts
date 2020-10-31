import { createStore } from 'vuex';
import { shuffleArray } from '@/utils';
import { Card } from '@/types';

type State = {
  cards: Card[];
};

export default createStore<State>({
  state: { cards: [] },
  mutations: {
    shuffleCards(state) {
      state.cards = shuffleArray([1, 3, 2, 4, 5, 6]);
    },

    handleMatchCard({ cards }, id) {
      const idx = cards.findIndex((c) => c.id === id);
      cards[idx] = { ...cards[idx], matched: true };
    },
  },
  actions: {},
  modules: {},
  getters: {
    shuffledCards: ({ cards }) => cards,
    getCardIdxById({ cards }, id) {
      return cards.findIndex((card) => card.id === id);
    },
  },
});
