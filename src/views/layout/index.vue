<template>
  <div class="layout">
    <div class="layout-header">
      <div class="logo">
        <img class="logo-img" src="https://himg.bdimg.com/sys/portrait/item/pp.1.933d4bef.jFJ1aiJYtjFTu0mglKZIEw.jpg?tt=1615118344789"/>
        <span>重构工具链</span>
      </div>
      <div class="menu">
        <div v-for="(item, index) in menuList" class="menu-item" :key="index" @click="changeMenu(item, index)"
          :class="{active: item.pageName === activePage}">{{item.title}}</div>
      </div>
      <div class="btns">
        <a class="btn" href="http://baidu.com">配置</a>
        <img class="avatar" :src="user.avatar" alt="">
        <span>{{user.name}}</span>
      </div>
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
        { title: '首页', pageName: 'home' },
        { title: '微服务', pageName: 'Weifuwu' },
        { title: '重构需求', pageName: 'Chonggou' },
        { title: '氛围建设', pageName: 'fengwei' },
      ],
      user: {
        name: '姓名',
        avatar: 'https://himg.bdimg.com/sys/portrait/item/pp.1.933d4bef.jFJ1aiJYtjFTu0mglKZIEw.jpg?tt=1615118344789'
      }
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
    background: #252b39;
    display: flex;
    align-items: center;
    .logo{
      width: 200px;
      display: flex;
      align-items: center;
      &-img{
        width: 36px;
        height: 36px;
        margin-left: 8px;
        margin-right: 8px;
      }
      span{
        color: #fff;
      }
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
        font-size: 14px;
        color: #fff;
        &.active{
          color: #5b78d6;
        }
      }
    }
    .btns{
      text-align: right;
      width: 300px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn{
        padding: 10px;
        color: #fff;
        margin-right: 10px;
      }
      .avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
      }
      span{
        color: #fff;
      }
    }
  }
  &-content{
    flex: 1;
    display: flex;
    overflow: hidden;
  }
}
</style>
