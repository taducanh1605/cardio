<template>
    <div>
      <!-- <p>Set cardio-time and break-time and how many round you want to do.</p> -->


      <div class="select-line">
        <div class="select-column">
          <select-lvl v-on:selectHandle="handleSelectLvl"/>
        </div>
        <div class="select-column checkbox-col">
          <input type="checkbox" v-model.number="warmup" checked>
          <label for="checkbox">Start with Warm Up</label>
        </div>
      </div>

      <!-- <br/> -->
      <p class="totalTime" >Estimated time for Cardio: {{dureeStr}}</p>

      <!-- <br/> -->

      <div class="inputRow">
        <div class="buttonSup button">
          <!-- <button v-on:click="hiit.time -= 5">-</button> -->
          <a href="#" v-on:click="hiit.time -= 5">-</a>
        </div>

        <div class="cardioContent">
          <p>Cardio Time (Seconds) </p>
          <input type="number" v-model.number="hiit.time">
        </div>

        <div class="buttonPlus button">
          <!-- <button v-on:click="hiit.time += 5">+</button> -->
          <a href="#" v-on:click="hiit.time += 5">+</a>
        </div>
      </div>

      <!-- <br/> -->
      <hr class="lineHR" />

      <div class="inputRow">
        <div class="buttonSup button">
          <!-- <button v-on:click="hiit.rest -= 5">-</button> -->
          <a href="#" v-on:click="hiit.rest -= 5">-</a>
        </div>

        <div class="cardioContent">
          <p>Break Time (Seconds)</p>
          <input type="number" v-model.number="hiit.rest">
        </div>

        <div class="buttonPlus button">
          <!-- <button v-on:click="hiit.rest += 5">+</button> -->
          <a href="#" v-on:click="hiit.rest += 5">+</a>
        </div>
      </div>

      <!-- <br/> -->
      <hr class="lineHR" />

      <div class="inputRow">
        <div class="buttonSup button">
          <!-- <button v-on:click="hiit.round -= 2">-</button> -->
          <a href="#" v-on:click="hiit.round -= 2">-</a>
        </div>

        <div class="cardioContent">
          <p>Cardio Rounds:</p>
          <input type="number" v-model.number="hiit.round">
        </div>

        <div class="buttonPlus button">
          <!-- <button v-on:click="hiit.round += 2">+</button> -->
          <a href="#" v-on:click="hiit.round += 2">+</a>
        </div>
      </div>

      <!-- <br/> -->

      <div id="frame_button">
        <div id="button-start" v-on:click="start" v-on:space="start">
          <img src="cardio/start.png" class="img-responsive button-img">
        </div>
      </div>

    </div>
</template>

<script>
import selectLvl from './selectLvl.vue';

function padding_zero(number) {
  if(number < 10){
    return ("0"+number);
  }
  else {
    return (""+number);
  }
}

function toPositiveInt(value, fallback) {
  var parsed = parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
}

export default {
  name: 'input-lvl',
  props: {
    initialWarmup: {
      type: Boolean,
      default: true
    },
    initialHiit: {
      type: Object,
      default: function () {
        return {
          time: 30,
          rest: 60,
          round: 8
        };
      }
    }
  },

  components: {
    selectLvl
  },

  data () {
    var safeHiit = {
      time: toPositiveInt(this.initialHiit && this.initialHiit.time, 30),
      rest: toPositiveInt(this.initialHiit && this.initialHiit.rest, 60),
      round: toPositiveInt(this.initialHiit && this.initialHiit.round, 8)
    };

    return {
      warmup: this.initialWarmup,
      hiit: {
        time: safeHiit.time,
        rest: safeHiit.rest,
        round: safeHiit.round
      }
    }
  },

  computed: {
    "hiit.time": function() {
      if (this.hiit.time < 0) {
        return 0;
      }
    },
    "hiit.rest": function() {
      if (this.hiit.rest < 0) {
        return 0;
      }
    },
    "hiit.round": function() {
      if (this.hiit.round < 0) {
        return 0;
      }
    },

    duree: function() {
      if (this.warmup > 0) {
        return 90 + (this.hiit.time + this.hiit.rest)*this.hiit.round;
      }
      else {
        return (this.hiit.time + this.hiit.rest)*this.hiit.round;
      }
    },

    dureeStr: function() {
      if (this.duree > 3600){
        return "" + padding_zero((this.duree - this.duree%3600)/3600) + ":" + padding_zero((this.duree - this.duree%60 - ((this.duree - this.duree%3600)))/60) + ":" + padding_zero(this.duree%60);
      }
      else {
        return "" + padding_zero((this.duree - this.duree%60 - ((this.duree - this.duree%3600)))/60) + ":" + padding_zero(this.duree%60);
      }
    }

  },
  watch: {
    initialWarmup: function(newValue) {
      this.warmup = newValue;
    },

    initialHiit: {
      handler: function(newValue) {
        this.hiit.time = toPositiveInt(newValue && newValue.time, 30);
        this.hiit.rest = toPositiveInt(newValue && newValue.rest, 60);
        this.hiit.round = toPositiveInt(newValue && newValue.round, 8);
      },
      deep: true
    },

    hiit: {
      handler: function(newValue){
        if (newValue.time < 0) {
          this.hiit.time = 0;
        }
        if (newValue.rest < 0) {
          this.hiit.rest = 0;
        }
        if (newValue.round < 0) {
          this.hiit.round = 0;
        }
      },
      deep: true
    },
  },

  methods: {
    start(e){
      var data = {
        warmup: this.warmup,
        hiit: this.hiit,
        flag: 1
      }
      // console.log(data);
      this.$emit('start', data);
    },

    handleSelectLvl(data) {
      // console.log(data);
      this.hiit.time = data.time;
      this.hiit.rest = data.rest;
      this.hiit.round = data.round;
    }
  }
}
</script>

<style>
.lineHR {
  width: min(420px, 86%);
  border-color: #303030;
  margin: 2px auto;
}

.select-line {
  width: min(640px, 96%);
  margin: 0 auto 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.select-column {
  flex: 1 1 280px;
}

.checkbox-col {
  text-align: left;
  padding-left: 6px;
}

.select-line div {
  margin: 2px auto;
}

.totalTime {
  width: min(420px, 96%);
  color: #fff;
  border-radius: 18px;
  border: 1px solid;
  border-color: #585757;
  margin: 4px auto;
  font-size: calc(13px + (17 - 13) * ((100vw - 300px) / (1200 - 300)));
  padding-block: 3px;
}

.inputRow {
  width: min(760px, 98%);
	text-align:center;
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.buttonSup {
  width:33%;
  text-align: right;
}
.cardioContent {
  width:34%;
}
.cardioContent input{
  width: min(160px, 90%);
  background: transparent;
  border:none;
  color: #ffffff;
  text-align: center;
  font-size: calc(30px + (46 - 30) * ((100vw - 300px) / (1200 - 300)));
  font-family: "sportrop regular";
}
.cardioContent input:focus{
  outline:none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.buttonPlus {
  width:33%;
  text-align: left;
}

#frame_button{
    width: min(760px, 98%);
  height: calc(42px + (70 - 42) * ((100vw - 300px) / (1200 - 300)));
    margin: 0px auto;
    vertical-align: middle;
    display: flex;
    align-items: center;
}
#button-start{
    margin: auto;
}
#button-start img {
    height: auto;
  width: calc(150px + (220 - 150) * ((100vw - 300px) / (1200 - 300)));
}
.button-img{
    cursor: pointer;
  margin: 6px auto;
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
}
.button-img:hover {
    -webkit-transform: scale(1.1) rotate(0.01deg);
    transform: scale(1.1) rotate(0.01deg);
}
.button {
	background-color: transparent;
	cursor: pointer;
	/* text-align: center; */
	text-transform: uppercase;
}


.button a {
	/* color: #d6da0c; */
	font-family: "sportrop regular";
    letter-spacing: 0.05em;
  font-size: calc(38px + (60 - 38) * ((100vw - 300px) / (1200 - 300)));
	text-decoration: none;
	white-space: nowrap;
    text-shadow: 0 0 20px rgb(230, 226, 10),  0 0 20px rgba(226, 230, 10, 0);
}

/* .button:hover a {
	color: rgb(255, 251, 0);
} */

.buttonSup a {
  color: rgb(216, 41, 41);
  text-shadow: 0 0 20px rgb(255, 123, 71),  0 0 20px rgba(230, 91, 10, 0);
}
.buttonSup:hover a {
  color: rgb(236, 83, 37);
}

.buttonPlus a {
  color: rgb(31, 218, 56);
  text-shadow: 0 0 20px rgb(14, 233, 25),  0 0 20px rgba(47, 230, 10, 0);
}
.buttonPlus:hover a {
  color: rgba(25, 250, 55, 0.952);
}

.button:active a {
	color: #fff;
}

@media only screen and (max-width: 700px) {
  .select-column,
  .checkbox-col {
    text-align: center;
    padding-left: 0;
  }

  .inputRow {
    gap: 4px;
  }

  .cardioContent p {
    font-size: 13px;
  }

  .cardioContent input {
    font-size: clamp(28px, 9vw, 42px);
  }

  .button a {
    font-size: clamp(32px, 11vw, 48px);
  }
}

@media only screen and (min-width: 1200px) and (min-height: 760px) {
  .select-line {
    margin-bottom: 8px;
  }

  .totalTime {
    font-size: 18px;
    padding-block: 5px;
  }

  .cardioContent p {
    font-size: 18px;
  }

  .cardioContent input {
    font-size: 50px;
  }

  .button a {
    font-size: 64px;
  }

  #button-start img {
    width: 230px;
  }
}
</style>
