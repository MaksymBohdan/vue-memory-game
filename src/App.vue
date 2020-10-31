<template>
  <Header />
  <Statistic />
  <Board />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from './components/Header.vue';
import Statistic from './components/Statistic.vue';
import Board from './components/Board.vue';

@Options({
  components: {
    Header,
    Statistic,
    Board,
  },
})
export default class App extends Vue {}
</script>

<style></style>
