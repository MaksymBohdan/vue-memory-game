<template>
  <div class="modal-layout">
    <div class="modal-container">
      <h2>Congratulations</h2>
      <p>You won!</p>
      <p>You made {{ moves }} moves</p>
      <p>in {{ gameTime.minutes }} min {{ gameTime.seconds }} sec</p>
      <p>
        Rating:
        <span class="start" v-for="level in gameLevel" :key="level"
          >&#11088;</span
        >
      </p>
      <button class="play-btn" @click="restart">Play againg</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapMutations, mapGetters } from 'vuex';

const Header = defineComponent({
  computed: {
    ...mapState(['gameTime', 'moves']),
    ...mapGetters(['gameLevel']),
  },
  methods: {
    ...mapMutations(['restart']),
  },
});

export default Header;
</script>

<style scoped>
.modal-layout {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 70%;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.play-btn {
  background-color: #141214;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  display: block;
  margin: 0 auto;
  width: 50%;
  font-family: 'Gloria Hallelujah', cursive;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
