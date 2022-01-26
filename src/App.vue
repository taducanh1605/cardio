<template>
  <div id="app">
    
    <img width="60%" src="cardio/banner_prime.png" class="img-responsive">

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

  methods: {
    activeStart(data){
      this.flagStart = data.flag;
      this.warmup = data.warmup;
      this.hiit = data.hiit;
    }
  },

  components: { 
    inputLvl,
    timerCardio
  }
  
}
</script>

<style>
@font-face {
    font-family: 'Destroy';
    font-style: normal;
    font-weight: 400;
    src: local('Destroy'), 
        url('https://fonts.cdnfonts.com/s/111/DESTROY_.woff') format('woff');
}

@font-face {
    font-family: 'Old Stamper';
    font-style: normal;
    font-weight: 400;
    src: local('Old Stamper'), 
        url('https://fonts.cdnfonts.com/s/331/old_stamper.woff') format('woff');
}

@font-face{
    font-family:sportrop regular;
    font-style:normal;
    font-weight:400;
    src:local('Sportrop Regular'),local('Sportrop-Regular'),
        url(https://www.allfont.es/cache/fonts/sportrop_f0ad1188ea12551e526340362302355b.woff) format('woff'),
        url(https://www.allfont.es/cache/fonts/sportrop_f0ad1188ea12551e526340362302355b.ttf) format('truetype');
}

@font-face{
    font-family:capture it;
    font-style:normal;
    font-weight:400;
    src:local('Capture it'),local('Captureit-Regular'),
        url(https://allfont.ru/cache/fonts/capture-it_36d8e4bafcd0d3bd809b9d12e819982e.woff) format('woff'),
        url(https://allfont.ru/cache/fonts/capture-it_36d8e4bafcd0d3bd809b9d12e819982e.ttf) format('truetype');
}

@font-face {
    font-family: 'Armalite Rifle';
    font-style: normal;
    font-weight: 400;
    src: local('Armalite Rifle'), local('ArmaliteRifle-Regular'),
        url(https://allfont.ru/cache/fonts/armalite-rifle_8b8d0c2e30a8ddf3d87d1cff3852f649.woff) format('woff'),
        url(https://allfont.ru/cache/fonts/armalite-rifle_8b8d0c2e30a8ddf3d87d1cff3852f649.ttf) format('truetype');
}

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
