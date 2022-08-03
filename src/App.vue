<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <img width="99%" src="cardio/banner_prime.png" class="img-responsive" style="margin: 0 auto;">
      </div>
      <div class="col-sm-3"></div>
    </div>
    <!-- <h1>{{ msg }}</h1> -->

    <div class="row">
      <div class="col-sm-12">

        <input-lvl v-if="flagStart === 0" v-on:start="activeStart"/>

        <timer-cardio
        v-if="flagStart === 1"
        v-bind:warmupFlag="warmup"
        v-bind:hiit="hiit"
        v-bind:flagStartProp="flagStart"/>

      </div>
    </div>

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
    max-width: 96%;
    margin: auto;
    max-height: 98%;
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
