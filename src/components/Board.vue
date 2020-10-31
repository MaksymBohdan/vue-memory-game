<template>
  <div class="board">
    <div
      v-for="{ id, value, matched } in shuffledCards"
      :key="id"
      @click="handleClick({ id, value, matched })"
      class="card"
      :class="{
        'card-open': openCardIds.includes(id),
        'card-match': matched,
        'card-unmatch': isPairOpen && openCardIds.includes(id) && !matched,
      }"
    >
      card {{ value }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data: () => ({
    open: [],
  }),
  methods: {
    ...mapMutations(['shuffleCards', 'handleMatchCard']),
    handleClick(card) {
      if (!this.isPairOpen) this.open.push(card);
    },

    onMatchCards() {
      this.open.forEach(({ id }) => this.handleMatchCard(id));
      this.open = [];
    },

    onUnmatch() {
      setTimeout(() => {
        this.open = [];
      }, 1000);
    },
  },
  beforeMount() {
    this.shuffleCards();
  },
  watch: {
    open: {
      deep: true,
      handler() {
        if (this.isPairOpen) {
          if (this.isCardsMatch) {
            this.onMatchCards();
          } else {
            this.onUnmatch();
          }
        }
      },
    },
  },
  computed: {
    ...mapGetters(['shuffledCards']),

    isPairOpen() {
      return this.open.length === 2;
    },

    openCardIds() {
      return this.open.map(({ id }) => id);
    },

    isCardsMatch() {
      return this.isPairOpen && this.open[0].value === this.open[1].value;
    },
  },
};
</script>

<style scoped>
.board {
  width: 600px;
  margin: auto;
  background-color: darkgray;
  padding: 15px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  user-select: none;
}

.card {
  height: 100px;
  background: #141214;
  color: #ffffff;
  font-size: 0;
  cursor: pointer;
}

.card-open {
  background: #02b3e4;
  cursor: default;
  pointer-events: none;
  font-size: 24px;
  animation-name: flip;
  animation-duration: 0.8s;
  pointer-events: none;
}

.card-match {
  background: #e5f720;
  cursor: default;
  font-size: 24px;
  animation-name: rubberBand;
  animation-duration: 0.8s;
  outline: 1px solid transparent;
  pointer-events: none;
}

.card-unmatch {
  background: #e2043b;
  animation-name: pulse;
  animation-duration: 0.8s;
  outline: 1px solid transparent;
  pointer-events: none;
}

/* The animation code */
@keyframes flip {
  from {
    transform: perspective(800px) rotate3d(0, 1, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(800px) rotate3d(0, 1, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(800px) rotate3d(0, 1, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(800px) rotate3d(0, 1, 0, -5deg);
  }

  to {
    transform: perspective(800px);
  }
}

@keyframes rubberBand {
  from {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.2, 1.2, 1.2);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>
