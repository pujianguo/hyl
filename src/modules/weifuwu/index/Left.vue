<template>
  <div class="weifuwu-index-left" :class="{'hide-menu': !showMenu}">
    <div class="menu">
      <div class="title">统计</div>

      <div class="card">
        <div class="card-title">
          <span>数量</span>
          <div class="category">
            <span class="icon icon-a"></span>
            <span class="text">总数</span>
            <span class="icon icon-b"></span>
            <span class="text">数b</span>
          </div>
        </div>
        <div class="card-body">
          <div class="shuliang">
            <div class="shuliang-title">LCM</div>
            <div class="shuliang-item">
              <div class="progress">
                <div class="bar bar-a" :style="{width: getShuliangPercentage(shuliang.lcm.numA)}"></div>
                <div class="text">{{shuliang.lcm.numA}}</div>
              </div>
              <div class="progress">
                <div class="bar bar-b" :style="{width: getShuliangPercentage(shuliang.lcm.numB)}"></div>
                <div class="text">{{shuliang.lcm.numB}}</div>
              </div>
            </div>
            <div class="shuliang-title">NFVO</div>
            <div class="shuliang-item">
              <div class="progress">
                <div class="bar bar-a" :style="{width: getShuliangPercentage(shuliang.nfvo.numA)}"></div>
                <div class="text">{{shuliang.nfvo.numA}}</div>
              </div>
              <div class="progress">
                <div class="bar bar-b" :style="{width: getShuliangPercentage(shuliang.nfvo.numB)}"></div>
                <div class="text">{{shuliang.nfvo.numB}}</div>
              </div>
            </div>
            <div class="shuliang-title">Access</div>
            <div class="shuliang-item">
              <div class="progress">
                <div class="bar bar-a" :style="{width: getShuliangPercentage(shuliang.access.numA)}"></div>
                <div class="text">{{shuliang.access.numA}}</div>
              </div>
              <div class="progress">
                <div class="bar bar-b" :style="{width: getShuliangPercentage(shuliang.access.numB)}"></div>
                <div class="text">{{shuliang.access.numB}}</div>
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
          <span>我的微服务</span>
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
import {getMsMenu} from 'api/weifuwu'

export default {
  components: {},
  data () {
    return {
      showMenu: true,
      shuliang: {
        lcm: { numA: 11, numB: 5 },
        nfvo: { numA: 3, numB: 5 },
        access: { numA: 15, numB: 0},
      },
      jindu: {
        lcm: [
          { label: 'L1', value: 100 },
          { label: 'L2', value: 90 },
          { label: 'L3', value: 0 },
          { label: 'L4', value: 0 },
        ],
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
        { label: '我负责的微服务', value: 0 },
        { label: '我参与的微服务', value: 0 },
        { label: '红旗微服务', value: 0 },
      ],
    }
  },
  computed: {
    shuliangMax () {
      let max = 0
      for (let x in this.shuliang) {
        let item = this.shuliang[x]
        if (item.numA + item.numB > max) {
          max = item.numA + item.numB
        }
      }
      return max
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getMsMenu().then(res => {
        // TODO:
        console.log('sss',res)
        // this.shuliang = res.amount
        // this.jindu = res.progress
        // this.wode = res.myMs
      }).catch(err => {
        console.log('err', err)
      })
    },


    // 获取数量百分比
    getShuliangPercentage (num) {
      return parseInt(num / this.shuliangMax * 100) + '%'
    },
  },
}
</script>

<style lang="scss">
.weifuwu-index-left{
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
      .category{
        .icon{
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-right: 5px;
        }
        .icon-a{
          background: yellow;
        }
        .icon-b{
          background: yellowgreen;
          margin-left: 20px;

        }
        .text{
          font-size: 14px;
        }
      }
    }
    .shuliang{
      .shuliang-title{
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 5px;
      }
      .progress{
        display: flex;
        align-items: center;
        .bar{
          height: 6px;
        }
        .bar-a{
          background: yellow;
        }
        .bar-b{
          background: yellowgreen;
        }
        .text{
          margin-left: 10px;
          width: 20px;
          height: 15px;
        }
      }
      .el-progress-bar__innerText{
        position: absolute;
        right: -40px;
        top: -3px;
        color: rgb(96 98 102);
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
