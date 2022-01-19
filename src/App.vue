<template>
  <div id="app">
    
    <img width="100%" src="cardio/images/banner_prime.png">

    <h1>{{ msg }}</h1>
    <input-lvl v-if="flagStart === 0 && count === 0"
    v-bind:hiitSel="hiit"
    v-on:changeTime="handleChangeTime"
    v-on:changeRest="handleChangeRest"
    v-on:changeRound="handleChangeRound"
    v-on:start="activeStart"
    />

  </div>
</template>

<script>
import inputLvl from './components/inputLvl.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Cardio with Njk',
      //warm up
      warmUp: [30,30,2],
      //HIIT
      hiit: {
        time: 0,
        rest: 0,
        round: 2
      },

      flagStart: 0,
      count: 0
    }
  },

  methods: {
    handleChangeTime(number) {
      if ((this.hiit.time+number) >= 0){
        this.hiit.time += number;
        // console.log(this.hiit.time);
      }
      else{
        this.hiit.time = 0;
      }
    },
    handleChangeRest(number) {
      if ((this.hiit.rest+number) >= 0){
        this.hiit.rest += number;
      }
      else {
        this.hiit.rest = 0;
      }
    },
    handleChangeRound(number) {
      if ((this.hiit.round+number) >= 0){
        this.hiit.round += number;
      }
      else {
        this.hiit.round = 0;
      }
    },
    activeStart(){
      this.flagStart = 1;
    }
  },

  components: { 
    inputLvl
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
