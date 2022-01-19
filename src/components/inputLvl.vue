<template>
    <div>
      <p>Set cardio-time and break-time and how many round you want to do.</p>
      <p>{{dureeStr}}</p>

      <div>
        <button v-on:click="subtractTime">-</button>
        <a>Cardio-Time: </a>
        <input type="number" v-model.number="hiitSel.time">
        <a>Second(s)</a>
        <button v-on:click="addTime">+</button>
      </div>

      <div>
        <button v-on:click="subtractRest">-</button>
        <a>Break-Time: </a>
        <input type="number" v-model.number="hiitSel.rest">
        <a>Second(s)</a>
        <button v-on:click="addRest">+</button>
      </div>

      <div>
        <button v-on:click="subtractRound">-</button>
        <a>Round(s):</a>
        <input type="number" v-model.number="hiitSel.round">
        <button v-on:click="addRound">+</button>
      </div>

      <div>
        <button v-on:click="start">Start</button>
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
export default {
  name: 'input-lvl',
  props: {
    //HIIT
    hiitSel: {
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
    }
  },

  data () {
    return {
      duree: 90,
      dureeStr: "01:30",
    }
  },

  computed: {
  },
  watch: {

    hiitSel: {
      handler: function(newValue){
        // console.log("update");
        this.duree = 90 + (newValue.time + newValue.rest)*newValue.round;
      },
      deep: true
    },

    duree: function(){
      if (this.duree > 3600){
        this.dureeStr = "" + padding_zero((this.duree - this.duree%3600)/3600) + ":" + padding_zero((this.duree - this.duree%60 - ((this.duree - this.duree%3600)))/60) + ":" + padding_zero(this.duree%60);
      }
      else {
        this.dureeStr = "" + padding_zero((this.duree - this.duree%60 - ((this.duree - this.duree%3600)))/60) + ":" + padding_zero(this.duree%60);
      }
    }
  },

  methods: {
    addTime(e) {
      this.$emit('changeTime', 5);
      // console.log(this.hiitSel)
    },
    subtractTime(e) {
      this.$emit('changeTime', -5);
      // console.log(this.hiitSel)
    },
    addRest(e) {
      this.$emit('changeRest', 5);
      // console.log(this.hiitSel)
    },
    subtractRest(e) {
      this.$emit('changeRest', -5);
      // console.log(this.hiitSel)
    },
    addRound(e) {
      this.$emit('changeRound', 2);
      // console.log(this.hiitSel)
    },
    subtractRound(e) {
      this.$emit('changeRound', -2);
      // console.log(this.hiitSel)
    },
    start(e){
      this.$emit('start');
    }
  }
}
</script>

<style>

</style>
