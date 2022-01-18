<template>
    <p>{{text}}</p>
</template>

<script>
export default {
  name: 'input-lvl',
  props: {
    //warm up
    warmUpTimeSel: {
      type: Number,
      default: 0
    },
    warmUpRestSel: {
      type: Number,
      default: 0
    },
    warmUpRoundSel: {
      type: Number,
      default: 0
    },
    //HIIT
    hiitTimeSel: {
      type: Number,
      default: 0
    },
    hiitRestSel: {
      type: Number,
      default: 0
    },
    hiitRoundSel: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      text: 'input level',
    }
  }
}
</script>

<style>

</style>
