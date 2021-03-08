<template>
  <div class="chonggou-index-left" :class="{'hide-menu': !showMenu}">
    <div class="menu">
      <div class="title">统计</div>

      <div class="card">
        <div class="card-body">
          <div class="shuliang">
            <div class="shuliang-item">
              <div class="item-count">{{amount.total}}</div>
              <div class="item-label">
                <div class="icon icon-a"></div>
                <div class="text">总数</div>
              </div>
            </div>
            <div class="shuliang-item">
              <div class="item-count">{{amount.month}}</div>
              <div class="item-label">
                <div class="icon icon-b"></div>
                <div class="text">本月新增</div>
              </div>
            </div>
            <div class="shuliang-item">
              <div class="item-count">{{amount.week}}</div>
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
          <div class="progress">
            <div class="progress-title">LCM</div>
            <div class="progress-item">
              <div class="progress-bar">
                <div class="bar bar-a" :style="{width: getProgressPercentage(progress['vnf-lcm'].total)}"></div>
                <div class="text">{{progress['vnf-lcm'].total}}</div>
              </div>
              <div class="progress-bar">
                <div class="bar bar-b" :style="{width: getProgressPercentage(progress['vnf-lcm'].month)}"></div>
                <div class="text">{{progress['vnf-lcm'].month}}</div>
              </div>
              <div class="progress-bar">
                <div class="bar bar-c" :style="{width: getProgressPercentage(progress['vnf-lcm'].week)}"></div>
                <div class="text">{{progress['vnf-lcm'].week}}</div>
              </div>
            </div>
            <div class="progress-title">NFVO</div>
            <div class="progress-item">
              <div class="progress-bar">
                <div class="bar bar-a" :style="{width: getProgressPercentage(progress['nfvo'].total)}"></div>
                <div class="text">{{progress['nfvo'].total}}</div>
              </div>
              <div class="progress-bar">
                <div class="bar bar-b" :style="{width: getProgressPercentage(progress['nfvo'].month)}"></div>
                <div class="text">{{progress['nfvo'].month}}</div>
              </div>
              <div class="progress-bar">
                <div class="bar bar-c" :style="{width: getProgressPercentage(progress['nfvo'].week)}"></div>
                <div class="text">{{progress['nfvo'].week}}</div>
              </div>
            </div>
            <div class="progress-title">Access</div>
            <div class="progress-item">
              <div class="progress-bar">
                <div class="bar bar-a" :style="{width: getProgressPercentage(progress['access'].total)}"></div>
                <div class="text">{{progress['access'].total}}</div>
              </div>
              <div class="progress-bar">
                <div class="bar bar-b" :style="{width: getProgressPercentage(progress['access'].month)}"></div>
                <div class="text">{{progress['access'].month}}</div>
              </div>
              <div class="progress-bar">
                <div class="bar bar-c" :style="{width: getProgressPercentage(progress['access'].week)}"></div>
                <div class="text">{{progress['access'].week}}</div>
              </div>
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
            <div class="wode-item">
              <span>我负责的规则</span>
              <span>{{myPlan.charge}}</span>
            </div>
            <div class="wode-item">
              <span>我参与的规则</span>
              <span>{{myPlan.involve}}</span>
            </div>
            <div class="wode-item">
              <span>红旗规则</span>
              <span>{{myPlan.mark}}</span>
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
import { getStoryMenu } from 'api/chonggou'
export default {
  components: {},
  data () {
    return {
      showMenu: true,
      amount: {
        total: 0,
        month: 0,
        week: 0
      },
      progress: {
        "vnf-lcm": {
          total: 0,
          week: 0,
          month: 0
        },
        nfvo: {
          total: 0,
          week: 0,
          month: 0
        },
        access: {
          total: 0,
          week: 0,
          month: 0
        }
      },
      myPlan: {
        charge: 0,
        involve: 0,
        mark: 0
      },
      wode: [
        { label: '我负责的规则', value: 0 },
        { label: '我参与的规则', value: 0 },
        { label: '', value: 0 },
      ],
    }
  },
  computed: {
    progressMax () {
      let max = 0
      for (let x in this.progress) {
        let item = this.progress[x]
        if (item.total + item.month + item.week > max) {
          max = item.total + item.month + item.week
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
    getData(){
      getStoryMenu().then(res => {
        this.amount = res.amount
        this.progress = res.progress
        this.myPlan = res.myPlan
      }).catch(err => {
        console.log('err', err)
      })
    },

    // 获取数量百分比
    getProgressPercentage (num) {
      return parseInt(num / this.progressMax * 100) + '%'
    },
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
    .progress{
      .progress-title{
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 5px;
      }
      .progress-bar{
        display: flex;
        align-items: center;
        .bar{
          height: 6px;
        }
        .bar-a{
          background: green;
        }
        .bar-b{
          background: blueviolet;
        }
        .bar-c{
          background: red;
        }
        .text{
          margin-left: 10px;
          width: 20px;
          height: 15px;
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
