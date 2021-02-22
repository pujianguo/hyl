<template>
  <div class="layout">
    <div class="layout-header"></div>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
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
.layout{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-header{
    height: 50px;
    widows: 100%;
    background: #777;
  }
  &-content{
    flex: 1;
  }
}
</style>
