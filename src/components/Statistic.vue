<template>
  <div class="statistic-container">
    <div class="statistic-item">
      <span class="start">&#128170; </span>

      <span class="start" v-for="level in gameLevel" :key="level"
        >&#11088;</span
      >
    </div>
    <div class="statistic-item">&#128200; ({{ moves }})</div>
    <div class="statistic-item">
      <span class="start">&#8987; </span>

      <span v-if="gameTime">
        {{ `${gameTime.minutes}m:${gameTime.seconds}s` }}</span
      >
      <span v-else> {{ `0m:0s` }}</span>
    </div>
    <div class="statistic-item restart" @click="restart">&#x1F501;</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

const Header = defineComponent({
  computed: {
    ...mapGetters(['moves', 'gameTime']),
    gameLevel() {
      let startAmount;
      if (this.moves <= 7) {
        startAmount = 3;
      } else if (this.moves > 7 && this.moves <= 10) {
        startAmount = 2;
      } else if (this.moves > 10) {
        startAmount = 1;
      }

      return startAmount;
    },
  },
  methods: {
    ...mapMutations(['restart']),
  },
});

export default Header;
</script>

<style scoped>
.statistic-container {
  width: 600px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 15px;
}

.statistic-item {
  text-align: center;
}

.start {
  font-size: 14px;
}

.restart {
  cursor: pointer;
}
</style>
