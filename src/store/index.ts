import { createStore } from 'vuex';
import { mlsToMinutesAndSeconds, shuffleArray } from '@/utils';
import { Card, GameTime } from '@/types';

const initCards = [
  '&#128023;',
  '&#128028;',
  '&#128031;',
  '&#128034;',
  '&#128039;',
  '&#128045;',
  '&#128047;',
  '&#128056;',
];

type State = {
  cards: Card[];
  openCards: Card[];
  moves: number;
  gameTime: null | GameTime;
  timer: number | null;
};

export default createStore<State>({
  state: {
    cards: [],
    openCards: [],
    moves: 0,
    gameTime: null,
    timer: null,
  },
  mutations: {
    // CARDS
    shuffleCards(state) {
      state.cards = shuffleArray(initCards);
    },

    handleMatchCard({ cards }, id) {
      const idx = cards.findIndex((c) => c.id === id);
      cards[idx] = { ...cards[idx], matched: true };
    },

    addCard(state, card) {
      state.openCards.push(card);
    },

    clearOpenCars(state) {
      state.openCards = [];
    },

    // STATISTIC
    incrementMove(state) {
      state.moves += 1;
    },

    startGame(state) {
      const startTime = Date.now();

      state.timer = setInterval(() => {
        state.gameTime = mlsToMinutesAndSeconds(Date.now() - startTime);
      }, 1000);
    },

    restart(state) {
      clearInterval(state.timer as number);

      state.timer = null;
      state.moves = 0;
      state.gameTime = null;
      state.openCards = [];
      state.cards = shuffleArray(initCards);
    },
  },
  actions: {
    handleClick({ commit, getters, state, dispatch }, card) {
      if (!state.timer) commit('startGame');

      if (!getters.isPairOpen) {
        commit('addCard', card);

        if (getters.isPairOpen) {
          commit('incrementMove');
          if (getters.isCardsMatch) {
            dispatch('onMatchCards');
          } else {
            dispatch('onUnmatch');
          }
        }
      }
    },

    onMatchCards({ commit, getters }) {
      getters.open.forEach(({ id }: Card) => commit('handleMatchCard', id));
      commit('clearOpenCars');
    },

    onUnmatch({ commit }) {
      setTimeout(() => {
        commit('clearOpenCars');
      }, 1000);
    },
  },
  modules: {},
  getters: {
    shuffledCards: ({ cards }) => cards,
    moves: ({ moves }) => moves,
    gameTime: ({ gameTime }) => gameTime,
    open: ({ openCards }) => openCards,
    isPairOpen: ({ openCards }) => openCards.length === 2,
    openCardIds: ({ openCards }) => openCards.map(({ id }) => id),
    isCardsMatch: (state, getters) => {
      return (
        getters.isPairOpen && getters.open[0].value === getters.open[1].value
      );
    },
  },
});
