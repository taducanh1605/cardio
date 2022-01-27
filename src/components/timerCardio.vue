<template>
    <div>

      <p class="row1">{{row_clock}}</p>

      <div id="frame_row2" class="row">
        <div id="button-back" class="button" v-on:click="handleBackward">
          <a href="#"><<<<</a>
        </div>

        <div id="row2">
          <p class="row2">{{row_round}}</p>
        </div>

        <div id="button-next" class="button" v-on:click="handleForward">
          <a href="#">>>>></a>
        </div>
      </div>

      <p class="row3" v-bind:class="row3_switch" >{{row_content}}</p>

      <p class="row4" v-bind:class="row4_switch" v-if="flagStart < 3">{{row_timer}}</p>

      <!-- <button v-if="flagStart === 1" v-on:click="handleStartButton()">Pause</button>
      <button v-if="flagStart === 2" v-on:click="handleStartButton()">Continue</button>
      <button v-if="flagStart === 3">Finish</button> -->
      <div id="frame_button">
        <div id="button-start" v-on:click="handleStartButton" v-on:space="handleStartButton">
          <img v-if="flagStart === 1" src="cardio/pause.png" class="img-responsive button-img">
          <img v-if="flagStart === 2" src="cardio/done.png" class="img-responsive button-img">
          <img v-if="flagStart === 3" src="cardio/finish.png" class="img-responsive button-img">
        </div>
      </div>
    
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

function ring(nameRing){
    var myRing = new Audio('cardio/'+nameRing+'.wav');
    myRing.play();
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
      flagPause: 1,

      row3_switch: "row3_ready",
      row4_switch: "row4_ready"
      
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

    row_clock: function() {
      return ("Total Cardio time: " + this.clock);
    },

    row_round: function() {
      if (this.flagStart == 3) {
        return "CONGRATULATION";
      }
      else if (this.doneWarmup >0) {
        return ("ROUND: " + this.orderCardio + "/" + this.hiit.round);
      }
      else {
        return ("WARM-UP ROUND: " + this.order + "/2");
      }
    },
    
    row_content: function() {
      if (this.flagPause > 0){
        this.row3_switch = "row3_ready";
        this.row4_switch = "row4_ready";
        return "ARE YOU READY?";
      }
      else if (this.flagCardio > 0){
        this.row4_switch = "row4_doit";
        if (this.doneWarmup > 0){
          this.row3_switch = "row3_cardio";
          if (this.flagStart < 3){
            return "Let's Cardio";
          }
          else {
            return "You done great job!"
          }
        }
        else {
          this.row3_switch = "row3_warmup";
          return "Warm Up";
        }
      }
      else {
        this.row3_switch = "row3_break";
        this.row4_switch = "row4_break";
        return "Break Time";
      }
    },

    row_timer: function() {
      if (this.flagPause > 0){
        return "Let's continue...";
      }
      else {
        return "" + this.timer + " sec(s)"
      }
    }

  },

  watch: {
    time: function() {
      // console.log("time changed");

      //update order
      if ((this.flagStart == 1) && (this.timer == 0) && (this.flagCardio > 0)) {
        if (this.order >= this.sumRound) {
          ring('finish');
          this.flagStart = 3;
        }
        else {
          this.order++;
        }
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
            ring('breaktime');

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
            ring('ringGo');

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
        ring('start');
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
/* 
-----------------------------------Row 1 
*/
.row1 {
    font-family: "Armalite Rifle";
    letter-spacing: 0.05em;
    font-size: calc(20px + (28 - 20) * ((100vw - 300px) / (1200 - 300)));
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
    margin: 15px auto;
}

/* 
-----------------------------------Row 2 
*/
#frame_row2 {
  width: 100%;
	text-align:center;
  align-items: center;
  vertical-align: middle;
    
  display: -webkit-flex;    
  display: -ms-flexbox;
  display: flex;
        
  -webkit-align-items: center;    
  -ms-flex-align: center;
  align-items: center; 
}
#row2 {
  width:60%;
	float:left;
}
#button-back{
  padding: 5px 0;
  width: 24%;
  text-align: right;
  float: left;
}
#button-next{
  padding: 5px 0;
  width: 20%;
  text-align: left;
  float: right;
}
.row2 {
    margin: 2rem auto;
    font-family: "Destroy";
    font-size: calc(20px + (28 - 20) * ((100vw - 300px) / (1200 - 300)));
    padding: 12px 0 0 0;
    color: #c9c9c9;
    text-shadow: 0 0 20px rgb(141, 141, 141),  0 0 20px rgba(230, 10, 10, 0);
}

.button {
	background-color: transparent;
	cursor: pointer;
	text-align: center;
	text-transform: uppercase;
}

.button a {
	color: #d6da0c;
	font-family: "sportrop regular";
    letter-spacing: 0.05em;
    font-size: calc(25px + (40 - 25) * ((100vw - 300px) / (1200 - 300)));
	text-decoration: none;
	white-space: nowrap;
    text-shadow: 0 0 20px rgb(230, 226, 10),  0 0 20px rgba(226, 230, 10, 0);
}

.button:hover a {
	color: rgb(255, 251, 0);
}

.button:active a {
	color: #fff;
}

/* 
-----------------------------------Row 3 
*/
.row3 {
    margin: 0.5rem auto;
    font-family: "Sportrop Regular";
    letter-spacing: 0.05em;
    /*font-size: 3.5rem;*/
    font-size: calc(24px + (34 - 24) * ((100vw - 300px) / (1200 - 300)));
    padding: 10px 0;
}
.row3_ready {
  color: #e7ff10;
  text-shadow: 0 0 20px rgb(215, 230, 10),  0 0 20px rgba(10, 230, 201, 0);
}
.row3_cardio {
  color: #10ff38;
  text-shadow: 0 0 20px rgb(10, 230, 21),  0 0 20px rgba(10, 230, 201, 0);
}
.row3_warmup {
  color: #10ff9b;
  text-shadow: 0 0 20px rgb(10, 230, 164),  0 0 20px rgba(10, 230, 201, 0);
}
.row3_break {
  color: #ff1010;
  text-shadow: 0 0 20px rgb(230, 10, 47),  0 0 20px rgba(10, 230, 201, 0);
}

/* 
-----------------------------------Row 4 
*/
.row4 {
  margin: 2rem auto;
    font-family: "Sportrop Regular";
    letter-spacing: 0.05em;
    font-size: calc(22px + (32 - 22) * ((100vw - 300px) / (1200 - 300)));
    padding: 5px 0;
}

.row4_ready {
  color: #18ff10;
  text-shadow: 0 0 20px rgb(10, 230, 58),  0 0 20px rgba(10, 230, 201, 0);
}
.row4_doit {
  color: #ff1810;
  text-shadow: 0 0 20px rgb(230, 61, 10),  0 0 20px rgba(10, 230, 201, 0);
}
.row4_break {
  color: #109fff;
  text-shadow: 0 0 20px rgb(10, 223, 230),  0 0 20px rgba(10, 230, 201, 0);
}

</style>
