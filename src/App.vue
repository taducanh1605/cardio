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

/*----------------------------------------------------------------------
Prevent Reload page when workout
----------------------------------------------------------------------*/
window.onbeforeunload = function() {
  if (vm.time > 0){
      return "Do you want to reload page?";
  };
};

/*----------------------------------------------------------------------
Prevent Lock Screen on mobile
- first event: click
- second event: hide tab
----------------------------------------------------------------------*/
var checkScreen = 0;
document.addEventListener('click', async () => {
  if (('wakeLock' in navigator) && (checkScreen == 0)) {
      checkScreen = 1;
      let screenLock = await navigator.wakeLock.request('screen');
  };
});

document.addEventListener('visibilitychange', async () => {
  if ('wakeLock' in navigator) {
      let screenLock = await navigator.wakeLock.request('screen');
  };
});
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
    font-family: 'sportrop regular';
    font-style:normal;
    font-weight:400;
    src:local('Sportrop Regular'),local('Sportrop-Regular'),
    url("./fonts/sportrop.regular.ttf") format("woff"),
    url("./fonts/sportrop.regular.ttf") format("opentype"),
    url("./fonts/sportrop.regular.ttf") format("truetype");
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
