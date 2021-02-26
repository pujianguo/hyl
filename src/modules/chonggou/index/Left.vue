<template>
  <div class="chonggou-index-left" :class="{'hide-menu': !showMenu}">
    <div class="menu">
      <div class="title">统计</div>

      <div class="card">
        <div class="card-body">
          <div class="shuliang">
            <div class="shuliang-item">
              <div class="item-count">{{shuliang.all}}</div>
              <div class="item-label">
                <div class="icon icon-a"></div>
                <div class="text">总数</div>
              </div>
            </div>
            <div class="shuliang-item">
              <div class="item-count">{{shuliang.yue}}</div>
              <div class="item-label">
                <div class="icon icon-b"></div>
                <div class="text">本月新增</div>
              </div>
            </div>
            <div class="shuliang-item">
              <div class="item-count">{{shuliang.zhou}}</div>
              <div class="item-label">
                <div class="icon icon-c"></div>
                <div class="text">本周截止</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span>进度</span>
        </div>
        <div class="card-body">
          <div class="jindu">
            <div class="jindu-title">LCM</div>
            <div class="jindu-item" v-for="(item, index) in jindu.lcm" :key="'lcm'+index">
              <div class="jindu-item-label">{{item.label}}</div>
              <el-progress class="jindu-item-progress" :percentage="item.value"></el-progress>
            </div>
            <div class="jindu-title">NFVO</div>
            <div class="jindu-item" v-for="(item, index) in jindu.nfvo" :key="'nfvo'+index">
              <div class="jindu-item-label">{{item.label}}</div>
              <el-progress class="jindu-item-progress" :percentage="item.value"></el-progress>
            </div>
            <div class="jindu-title">Access</div>
            <div class="jindu-item" v-for="(item, index) in jindu.access" :key="'access'+index">
              <div class="jindu-item-label">{{item.label}}</div>
              <el-progress class="jindu-item-progress" :percentage="item.value"></el-progress>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span>我的规则</span>
        </div>
        <div class="card-body">
          <div class="wode">
            <div class="wode-item" v-for="(item, index) in wode" :key="index">
              <span>{{item.label}}</span>
              <span>{{item.value}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="close-btn" @click="showMenu = !showMenu">
      <i :class="showMenu ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      showMenu: false,
      shuliang: {
        all: 12,
        yue: 3,
        zhou: 2,
      },
      jindu: {
        lcm: {
          all: 12,
        },
        nfvo: [
          { label: 'L1', value: 100 },
          { label: 'L2', value: 90 },
          { label: 'L3', value: 0 },
          { label: 'L4', value: 0 },
        ],
        access: [
          { label: 'L1', value: 100 },
          { label: 'L2', value: 90 },
          { label: 'L3', value: 0 },
          { label: 'L4', value: 0 },
        ],
      },
      wode: [
        { label: '我负责的规则', value: 0 },
        { label: '我参与的规则', value: 0 },
        { label: '红旗规则', value: 0 },
      ],
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
.chonggou-index-left{
  position: relative;
  &.hide-menu{
    width: 0 !important;
    transition: width .3s;
    .menu{
      padding: 0 !important;
    }
  }
  .menu{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    padding: 20px 15px;
    box-sizing: border-box;
  }
  .title{
    font-size: 18px;
  }
  .card{
    .card-title{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      &>span{
        font-size: 16px;
        font-weight: bold;
      }
    }
    .shuliang{
      display: flex;
      padding: 10px 10px;
      .shuliang-item{
        flex: 1;
        font-size: 16px;
        margin-bottom: 10px;
        .item-count{
          font-size: 30px;
          text-align: center;
          margin-bottom: 5px;
        }
        .item-label{
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          .icon{
            width: 10px;
            height: 10px;
            margin-right: 5px;
          }
          .icon-a{
            background: green;
          }
          .icon-b{
            background: blueviolet;
          }
          .icon-c{
            background: red;
          }
        }
      }
    }
    .jindu{
      .jindu-title{
        font-size: 16px;
        margin-bottom: 10px;
      }
      .jindu-item{
        width: 100%;
        height: 30px;
        display: flex;
        &-label{
          width: 25px;
        }
        &-progress{
          flex: 1;
        }
      }
    }
    .wode{
      .wode-item{
        height: 100%;
        height: 35px;
        margin-bottom: 5px;
        background: #eee;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .close-btn{
    width: 20px;
    height: 35px;
    position: absolute;
    top: 50%;
    right: -20px;
    background: #fff;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    i{
      font-size: 20px;
    }
  }
}
</style>
