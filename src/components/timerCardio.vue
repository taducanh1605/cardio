<template>
    <div>
      <p>Clock: {{clock}}</p>
      <p>warmup: {{orderWarmup}}/2</p>
      <p>cardio: {{orderCardio}}/{{hiit.round}}</p>

      <div>
        <button v-on:click="handleBackward()"> << </button>
        <a>Round: {{order}}/{{sumRound}}</a>
        <button v-on:click="handleForward()"> >> </button>
      </div>

      <p v-if="flagCardio > 0">Cardio Time: {{timer}}</p>
      <p v-else-if="flagRest > 0">Break Time: {{timer}}</p>
      <p v-else>Ready?: {{timer}}</p>

      <button v-if="flagStart === 1" v-on:click="handleStartButton()">Pause</button>
      <button v-if="flagStart === 2" v-on:click="handleStartButton()">Continue</button>
      <button v-if="flagStart === 3">Finish</button>
    
    </div>
</template>

<script>
function padding_zero(number) {
  if(number < 10){
    return ("0"+number);
  }
  else {
    return (""+number);
  }
}

export default {
  name: 'timer-cardio',
  props: {
    warmupFlag: {
      type: Boolean,
      default: true
    },

    hiit: {
      type: Object,
      time: {
          type: Number,
          default: null
      },
      rest: {
          type: Number,
          default: null
      },
      round: {
          type: Number,
          default: null
      }
    },

    flagStartProp: {
      type: Number,
      default: 0
    }

  },

  data () {
    return {
      warmup: {
        time: 30,
        rest: 30,
        round: 2
      },

      time: 0,
      order: 1,
      timer: 0,

      flagStart: 0,
      flagCardio: 0,
      flagRest: 0,
      flagPause: 1

    }
  },

  computed: {

    doneWarmup: function() {
      if (this.warmupFlag == true){
        if (this.order > 2) {
          return 1;
        }
        else {
          return 0;
        }
      }
      else {
        return 1;
      }
    },

    orderWarmup: function() {
      if ((this.warmupFlag == true) && (this.order <= 2)){
        return this.order;
      }
      else {
        return 2;
      }
    },

    orderCardio: function() {
      if (this.warmupFlag == true) {
        if (this.order - 2 > 0){
          return this.order - 2;
        }
        else {
          return 0
        }
      }
      else {
        return this.order;
      }
    },

    sumRound: function() {
      if (this.warmupFlag == true){
        return this.warmup.round + this.hiit.round;
      }
      else {
        return this.hiit.round;
      }
    },

    clock: function() {
      return "" + padding_zero((this.time - this.time%60 - ((this.time - this.time%3600)))/60) + ":" + padding_zero(this.time%60);
    },

  },

  watch: {
    time: function() {
      // console.log("time changed");

      //update order
      if ((this.flagStart == 1) && (this.timer == 0) && (this.flagCardio > 0)) {
        (this.order >= this.sumRound) ? this.flagStart = 3 : this.order++;
      }

      if (this.flagStart == 1) {
        if (this.timer > 0){
          this.timer--;
        }
        else {
          if (this.flagPause > 0) {
            this.timer = 3;
            this.flagPause = 0; 
          }
          else if (this.flagCardio > 0) {

            //update flag
            this.flagCardio = 0;
            this.flagRest = 1;

            //get timer rest
            if (this.doneWarmup > 0){
              this.timer = this.hiit.rest;
            }
            else {
              this.timer = this.warmup.rest;
            }
          }
          else {
            //update flag
            this.flagCardio = 1;
            this.flagRest = 0;

            //get timer cardio
            if (this.doneWarmup > 0){
              this.timer = this.hiit.time;
            }
            else {
              this.timer = this.warmup.time;
            }
          }
        }
      }
    }

  },

  mounted: function(){
    setInterval(this.updateTime, 1000);
    this.updateTime();
    if (this.flagStart == 0){
      this.flagStart = this.flagStartProp;
    }
  },

  methods: {
    updateTime: function() {
      if (this.flagStart == 1){
        this.time++;
      }
    },

    handleStartButton: function() {
      if (this.flagStart === 1) {
        this.flagStart = 2;
        this.flagPause = 1;
        this.flagCardio = 0;
        this.flagRest = 0;
        this.timer = 0;
      }
      else if (this.flagStart === 2){
        this.flagStart = 1;
      }
    },

    handleBackward: function() {
      if (this.order > 1) {
        this.flagStart = 2;
        this.flagPause = 1;
        this.order--;
        this.flagCardio = 0;
        this.flagRest = 0;
        this.timer = 0;
      }
    },

    handleForward: function() {
      if (this.order < this.sumRound) {
        this.flagStart = 2;
        this.flagPause = 1;
        this.order++;
        this.flagCardio = 0;
        this.flagRest = 0;
        this.timer = 0;
      }
    }
  }
}

</script>

<style>

</style>
