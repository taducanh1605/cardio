<template>
    <div>
      <!-- <p>Set cardio-time and break-time and how many round you want to do.</p> -->
      

      <div class="row select-line">
        <div class="col-sm-6">
          <select-lvl v-on:selectHandle="handleSelectLvl"/>
        </div>
        <div class="col-sm-6">
          <input type="checkbox" v-model.number="warmup" checked>
          <label for="checkbox">Start with Warm Up</label>
        </div>
      </div>

      <!-- <br/> -->
      <p>Total time for cardio: {{dureeStr}}</p>
      
      <!-- <br/> -->

      <div class="row inputRow">
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

      <div class="row inputRow">
        <div class="buttonSup button">
          <!-- <button v-on:click="hiit.rest -= 5">-</button> -->
          <a href="#" v-on:click="hiit.rest -= 5">-</a>
        </div>

        <div class="cardioContent">
          <p>Break-Time (Seconds)</p>
          <input type="number" v-model.number="hiit.rest">
        </div>

        <div class="buttonPlus button">
          <!-- <button v-on:click="hiit.rest += 5">+</button> -->
          <a href="#" v-on:click="hiit.rest += 5">+</a>
        </div>
      </div>

      <!-- <br/> -->
      <hr class="lineHR" />

      <div class="row inputRow">
        <div class="buttonSup button">
          <!-- <button v-on:click="hiit.round -= 2">-</button> -->
          <a href="#" v-on:click="hiit.round -= 2">-</a>
        </div>

        <div class="cardioContent">
          <p>Round(s):</p>
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

export default {
  name: 'input-lvl',
  props: {
  },

  components: { 
    selectLvl
  },

  data () {
    return {
      // duree: 90,
      // dureeStr: "01:30",
      warmup: true,
      hiit: {
        time: 30,
        rest: 60,
        round: 8
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
  width: 60%;
  border-color: #303030;
  margin: 5px auto;
}

.select-line {
  width: 40%;
  margin: 20px auto;
}

.inputRow {
  width:98%;
	text-align:center;
   
   
  display: -webkit-flex;    
  display: -ms-flexbox;
  display: flex;
    
  -webkit-align-items: center;    
  -ms-flex-align: center;
  align-items: center;   
}
.buttonSup {
  width:37%;
	float:left;
  text-align: right;
	/* border:1px solid #ff0000; */
	display:inline-block;
}
.cardioContent {
  width:37%;
	float:left;	
	/* border:1px solid #ff0000; */
	display:inline-block;
}
.cardioContent input{
  width: 100%;
  background: transparent;
  border:none;
  text-align: center;
  font-size: calc(40px + (60 - 40) * ((100vw - 300px) / (1200 - 300)));
}
.cardioContent input:focus{
  outline:none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.buttonPlus {
  width:32%;
	float:right;
  text-align: left;
	/* border:1px solid #ff0000; */
	display:inline-block;	
}

#frame_button{
    width: 98%;
    height: calc(60px + (100 - 60) * ((100vw - 300px) / (1200 - 300)));
    margin: 0px auto;
    vertical-align: middle;
    
    display: -webkit-flex;    
    display: -ms-flexbox;
    display: flex;
        
    -webkit-align-items: center;    
    -ms-flex-align: center;
    align-items: center;  
}
#button-start{
    margin: auto;
}
#button-start img {
    height: auto;
    width: calc(164px + (260 - 164) * ((100vw - 300px) / (1200 - 300)));
}
.button-img{
    cursor: pointer;
    margin: 0 auto;
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
    font-size: calc(70px + (100 - 70) * ((100vw - 300px) / (1200 - 300)));
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
</style>
