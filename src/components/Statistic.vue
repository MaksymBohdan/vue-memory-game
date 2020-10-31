<template>
  <div class="statistic-container">
    <div class="statistic-item">hard level</div>
    <div class="statistic-item">clicks</div>
    <div class="statistic-item">time</div>
    <div class="statistic-item">restart</div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Header extends Vue {}
</script>

<style scoped>
.statistic-container {
  width: 600px;
  margin: auto;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.statistic-item {
  text-align: center;
}
</style>
