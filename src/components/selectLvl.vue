<template>
  <select v-model.number="select" v-on:change="selectHandle" class="selectLvl">
    <option value="-1" selected>Choose a level</option>
    <option v-for="lvl in 9" v-bind:value="lvl-1" :key="lvl-1"> Level. {{lvl-1}} </option>
  </select>
</template>

<script>

export default {
  name: 'select-lvl',

  data () {
    return {
        select: 0,

        cardio: [
            //lvl_0
            {time: 30, rest: 60, round: 8, key: 0},

            //lvl_1
            {time: 40, rest: 60, round: 8, key: 1},

            //lvl_2
            {time: 40, rest: 50, round: 8, key: 2},

            //lvl_3
            {time: 30, rest: 40, round: 8, key: 3},

            //lvl_4
            {time: 30, rest: 30, round: 8, key: 4},

            //lvl_5
            {time: 40, rest: 30, round: 8, key: 5},

            //lvl_6
            {time: 50, rest: 30, round: 8, key: 6},

            //lvl_7
            {time: 60, rest: 30, round: 8, key: 7},

            //lvl_8
            {time: 60, rest: 20, round: 8, key: 8}
        ]
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
      selectHandle() {
          if (this.select >= 0) {
            console.log(this.select);
            var data = this.cardio[this.select];
            this.$emit('selectHandle', data);
          }
      }
  }

}
</script>

<style>
.selectLvl {
    background: #454646;
    color: #fff;
    border-radius: 18px;
    padding: 0px 5px 0px 5px;
}

</style>