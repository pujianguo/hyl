<template>
  <div class="weifuwu">
    <div class="left">
      <div class="title">统计</div>
      <div class="sub-title">
        <span>数量</span>
        <div class="category">
          <span class="icon icon-a"></span>
          <span class="text">总数</span>
          <span class="icon icon-b"></span>
          <span class="text">数b</span>
        </div>
      </div>

    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>
export default {
  name: 'weifuwu',
  components: {},
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
    width: 200px;
    background: #fff;
  }
  &>.right{
    flex: 1;
    background: #eee;
  }
}
</style>
