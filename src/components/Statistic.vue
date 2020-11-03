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
import { mapGetters, mapMutations, mapState } from 'vuex';

const Header = defineComponent({
  computed: {
    ...mapGetters(['gameLevel']),
    ...mapState(['moves', 'gameTime']),
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
