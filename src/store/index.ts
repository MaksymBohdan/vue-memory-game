import { createStore } from 'vuex';
import { mlsToMinutesAndSeconds, shuffleArray } from '@/utils';
import { Card, GameTime } from '@/types';
import * as C from '@/utils/constants';

type State = {
  cards: Card[];
  openCards: Card[];
  moves: number;
  gameTime: null | GameTime;
  timer: number | null;
  isModalActive: boolean;
};

export default createStore<State>({
  state: {
    cards: [],
    openCards: [],
    moves: 0,
    gameTime: null,
    timer: null,
    isModalActive: false,
  },
  mutations: {
    // CARDS
    shuffleCards(state) {
      state.cards = shuffleArray(C.INIT_CARDS);
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
      state.cards = shuffleArray(C.INIT_CARDS);
      state.isModalActive = false;
    },

    showModal(state) {
      clearInterval(state.timer as number);
      state.isModalActive = true;
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
            dispatch('onGameFinish');
          } else {
            dispatch('onUnmatch');
          }
        }
      }
    },

    onMatchCards({ commit, getters, state }) {
      state.openCards.forEach(({ id }: Card) => commit('handleMatchCard', id));
      commit('clearOpenCars');
    },

    onUnmatch({ commit }) {
      setTimeout(() => {
        commit('clearOpenCars');
      }, 1000);
    },

    onGameFinish({ commit, getters }) {
      if (getters.isGameFinished) {
        commit('showModal');
      }
    },
  },
  getters: {
    isPairOpen: ({ openCards }) => openCards.length === 2,
    openCardIds: ({ openCards }) => openCards.map(({ id }) => id),
    isCardsMatch: (state, getters) => {
      return (
        getters.isPairOpen &&
        state.openCards[0].value === state.openCards[1].value
      );
    },
    isGameFinished: (state) => {
      return (
        state.cards.length ===
        state.cards.filter(({ matched }) => matched).length
      );
    },
    gameLevel: ({ moves }) => {
      let startAmount;

      if (moves <= C.MIN_MEDIUM_LEVEL) {
        startAmount = C.PRO_STARS;
      } else if (moves > C.MIN_MEDIUM_LEVEL && moves <= C.MAX_MEDIUM_LEVEL) {
        startAmount = C.MID_STARS;
      } else if (moves > C.MAX_MEDIUM_LEVEL) {
        startAmount = C.BEGINNER_STARS;
      }

      return startAmount;
    },
  },
});
