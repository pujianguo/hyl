<template>
  <div class="layout">
    <div class="layout-header">
      <div class="logo"></div>
      <div class="menu">
        <div v-for="(item, index) in menuList" class="menu-item" :key="index" @click="changeMenu(item, index)"
          :class="{active: item.pageName === activePage}">{{item.title}}</div>
      </div>
      <div class="btns"></div>
    </div>
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
      menuList: [
        { title: '首页', pageName: 'Home' },
        { title: '首页2', pageName: 'Weifuwu' },
        { title: '首页3', pageName: 'Home3' },
        { title: '首页4', pageName: 'Home4' },
      ],
    }
  },
  computed: {
    activePage () {
      const pageName = this.$route.name
      return pageName.split('_').shift()
    },
  },
  watch: {
  },
  created () {
    console.log('this.$route.name', this.$route)
  },
  mounted () {
  },
  methods: {
    changeMenu (item, index) {
      if (item.name !== this.activePage) {
        window.location.href = `/${item.pageName.toLowerCase()}.html`
      }
    },
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
    display: flex;
    align-items: center;
    .logo{
      width: 200px;
    }
    .menu{
      width: 0;
      height: 100%;
      flex: 1;
      .menu-item{
        display: inline-block;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        &.active{
          color: #eee
        }
      }
    }
    .btns{
      text-align: right;
      width: 300px;
    }
  }
  &-content{
    flex: 1;
    display: flex;
  }
}
</style>
