<template>
  <div id="app">

    <img width="70%" src="cardio/banner_prime.png" class="img-responsive" style="margin: 0 auto;">

    <!-- <h1>{{ msg }}</h1> -->

    <input-lvl
    v-if="flagStart === 0"
    v-on:start="activeStart"
    />

    <timer-cardio
    v-if="flagStart === 1"
    v-bind:warmupFlag="warmup"
    v-bind:hiit="hiit"
    v-bind:flagStartProp="flagStart"/>

  </div>
</template>

<script>
import inputLvl from './components/inputLvl.vue';
import timerCardio from './components/timerCardio.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Cardio with Njk',
      //HIIT
      hiit: {},
      warmup: true,

      //flag
      flagStart: 0
    }
  },

  components: {
    inputLvl,
    timerCardio
  },

  methods: {
    activeStart(data){
      startF = data.flag;
      this.flagStart = data.flag;
      this.warmup = data.warmup;
      this.hiit = data.hiit;
    }
  }

}
</script>

<style>
html,body {
    width: 97.9%;
    margin: auto;
    height: 100%;
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 0 20px rgb(217, 221, 223),  0 0 20px rgba(217, 221, 223, 0);
}
body {
    background: radial-gradient(ellipse at center,  #242424  0%, #0c0c0e 70%);
}
p {
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: inherit;
}

pre {
    background-color: transparent;
    border: None;
}
</style>
