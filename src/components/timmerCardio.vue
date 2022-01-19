<template>
    <div>
      
    
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
  name: 'timmer-cardio',
  props: {
    warmupTimming: {
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

    cardioTimming: {
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

    flagStart: {
        type: Number,
        default: 0
    }
  },

  data () {
    return {
      count: 0,
      orderWarmup: 0,
      orderCardio: 0

    }
  },

  computed: {
  },
  watch: {

  },

  methods: {

  }
}
</script>

<style>

</style>
