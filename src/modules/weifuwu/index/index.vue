<template>
  <div class="weifuwu">
    <Left class="left"></Left>
    <Right class="right"></Right>
  </div>
</template>

<script>
import Left from './Left'
import Right from './Right'

export default {
  name: 'weifuwu',
  components: { Left, Right },
  data () {
    return {

    }
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  },
}
</script>

<style lang="scss">
.weifuwu{
  flex: 1;
  display: flex;
  &>.left{
    width: 300px;
    height: 100%;
  }
  &>.right{
    flex: 1;
    background: #eee;
  }
}
</style>
