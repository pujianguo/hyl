<template>
  <div class="chonggou-index-right">
    <div class="header">
      <el-input class="input" v-model="search.input" placeholder="搜索">
        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
      </el-input>
      <el-select class="select" v-model="search.year" placeholder="全部年份" @change="getData">
        <el-option label="2018" value="2018"></el-option>
        <el-option label="2019" value="2019"></el-option>
        <el-option label="2020" value="2020"></el-option>
        <el-option label="2021" value="2021"></el-option>
      </el-select>
      <el-select class="select" v-model="search.sort" placeholder="排序" @change="getData">
        <el-option label="sort1" value="sort1"></el-option>
        <el-option label="sort2" value="sort2"></el-option>
        <el-option label="sort3" value="sort3"></el-option>
        <el-option label="sort4" value="sort4"></el-option>
      </el-select>
      <el-select class="select" v-model="search.shaixuan" placeholder="筛选" @change="getData">
        <el-option label="shaixuan1" value="shaixuan1"></el-option>
        <el-option label="shaixuan2" value="shaixuan2"></el-option>
        <el-option label="shaixuan3" value="shaixuan3"></el-option>
        <el-option label="shaixuan4" value="shaixuan4"></el-option>
      </el-select>
    </div>

    <div class="content">
      <div class="content-item">
        <div class="title">
          <span>需求池</span>
          <span>{{xuqiuListSize}}</span>
          <el-button class="add-btn" type="primary" @click="openAddXuqiuDialog">新建需求池</el-button>
        </div>
        <div class="list">
          <div class="list-item" v-for="item in xuqiuList" :key="item.id" @click="openDetailDialog(item.id)">
            <div class="part1">
              <div class="title">
                <el-tag class="tag" type="success" v-if="item.grade" effect="dark" size="mini">重点</el-tag>
                {{item.name}}
              </div>
              <div class="flag" v-if="item.mark"><i class="el-icon-s-flag"></i></div>
            </div>
            <div class="part2">
              <el-avatar size="small" :src="item.avatar || defaultAvatar"></el-avatar>
              <span class="username">{{item.ownerZN}}</span>
              <el-tag class="tag" type="primary" size="mini">{{item.storyCode}}k</el-tag>
              <el-tag class="tag" type="primary" size="mini">{{item.startOrDeliveryTime}}</el-tag>
            </div>
            <div class="part3">
              <el-tag class="tag" v-for="(tag, index) in item.microserviceInfo.split(',')" :key="index" effect="dark" size="mini">{{tag}}</el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="title">
          <span>NFVO</span>
          <span>{{nfvoListSize}}</span>
        </div>
        <div class="list">
          <div class="list-item" v-for="item in nfvoList" :key="item.id" @click="openDetailDialog(item.id)">
            <div class="part1">
              <div class="title">
                <el-tag class="tag" type="success" v-if="item.grade" effect="dark" size="mini">重点</el-tag>
                {{item.name}}
              </div>
              <div class="flag" v-if="item.mark"><i class="el-icon-s-flag"></i></div>
            </div>
            <div class="part2">
              <el-avatar size="small" :src="item.avatar || defaultAvatar"></el-avatar>
              <span class="username">{{item.ownerZN}}</span>
              <el-tag class="tag" :type="item.implementStatus === 'Open' ? 'success' : 'warning'" size="mini">{{item.implementStatus}}</el-tag>
              <el-tag class="tag" type="primary" size="mini">{{item.storyCode}}k</el-tag>
              <el-tag class="tag" type="primary" size="mini">{{item.startOrDeliveryTime}}</el-tag>
            </div>
            <div class="part3">
              <el-tag class="tag" v-for="(tag, index) in item.microserviceInfo.split(',')" :key="index" effect="dark" size="mini">{{tag}}</el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="title">
          <span>Access</span>
          <span>{{accessListSize}}</span>
        </div>
        <div class="list">
          <div class="list-item" v-for="item in accessList" :key="item.id" @click="openDetailDialog(item.id)">
            <div class="part1">
              <div class="title">
                <el-tag class="tag" type="success" v-if="item.grade" effect="dark" size="mini">重点</el-tag>
                {{item.name}}
              </div>
              <div class="flag" v-if="item.mark"><i class="el-icon-s-flag"></i></div>
            </div>
            <div class="part2">
              <el-avatar size="small" :src="item.avatar || defaultAvatar"></el-avatar>
              <span class="username">{{item.ownerZN}}</span>
              <el-tag class="tag" :type="item.implementStatus === 'Open' ? 'success' : 'warning'" size="mini">{{item.implementStatus}}</el-tag>
              <el-tag class="tag" type="primary" size="mini">{{item.storyCode}}k</el-tag>
              <el-tag class="tag" type="primary" size="mini">{{item.startOrDeliveryTime}}</el-tag>
            </div>
            <div class="part3">
              <el-tag class="tag" v-for="(tag, index) in item.microserviceInfo.split(',')" :key="index" effect="dark" size="mini">{{tag}}</el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="title">
          <span>LCM</span>
          <span>{{lcmListSize}}</span>
        </div>
        <div class="list">
          <div class="list-item" v-for="item in lcmList" :key="item.id" @click="openDetailDialog(item.id)">
            <div class="part1">
              <div class="title">
                <el-tag class="tag" type="success" v-if="item.grade" effect="dark" size="mini">重点</el-tag>
                {{item.name}}
              </div>
              <div class="flag" v-if="item.mark"><i class="el-icon-s-flag"></i></div>
            </div>
            <div class="part2">
              <el-avatar size="small" :src="item.avatar || defaultAvatar"></el-avatar>
              <span class="username">{{item.ownerZN}}</span>
              <el-tag class="tag" :type="item.implementStatus === 'Open' ? 'success' : 'warning'" size="mini">{{item.implementStatus}}</el-tag>
              <el-tag class="tag" type="primary" size="mini">{{item.storyCode}}k</el-tag>
              <el-tag class="tag" type="primary" size="mini">{{item.startOrDeliveryTime}}</el-tag>
            </div>
            <div class="part3">
              <el-tag class="tag" v-for="(tag, index) in item.microserviceInfo.split(',')" :key="index" effect="dark" size="mini">{{tag}}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <detail-dialog v-model="detailDialogVisible" :detailId="detailId"></detail-dialog>
    <add-dialog v-model="addDialogVisible"></add-dialog>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/avatar.png'
import DetailDialog from './DetailDialog'
import AddDialog from './AddDialog'
import {getStoryData} from 'api/chonggou'

export default {
  components: { DetailDialog, AddDialog },
  data () {
    return {
      defaultAvatar: defaultAvatar,
      search: {
        input: '',
        year: '',
        sort: '',
        shaixuan: '',
      },
      xuqiuList: [],
      xuqiuListSize: 0,
      nfvoList: [],
      nfvoListSize: 0,
      accessList: [],
      accessListSize: 0,
      lcmList: [],
      lcmListSize: 0,

      detailDialogVisible: false,
      detailId: 0,

      addDialogVisible: false,
    }
  },
  computed: {
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
      getStoryData().then(res => {
        this.xuqiuList = res['story-pool'].list
        this.xuqiuListSize = res['story-pool'].size
        this.nfvoList = res['nfvo'].list
        this.nfvoListSize = res['nfvo'].size
        this.accessList = res['access'].list
        this.accessListSize = res['access'].size
        this.lcmList = res['vnf-lcm'].list
        this.lcmListSize = res['vnf-lcm'].size
        console.log("res",res)
      }).catch(err => {
        console.log('err', err)
      })
    },

    openDetailDialog (id) {
      this.detailId = id
      this.detailDialogVisible = true
    },

    openAddXuqiuDialog () {
      this.addDialogVisible = true
    },
  },
}
</script>

<style lang="scss">
.chonggou-index-right{
  padding: 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .header{
    margin-bottom: 20px;
    .input{
      width: 200px;
      margin-right: 10px;
    }
    .select{
      margin-right: 10px;
    }
  }
  .content{
    flex: 1;
    display: flex;
    overflow: hidden;
    .content-item{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-right: 20px;
      &:last-child{
        margin-right: 0;
      }
      &>.title{
        height: 35px;
        line-height: 35px;
        span:nth-child(1) {
          margin-right: 10px;
        }
        span:nth-child(2){
          color: #777;
        }
        .add-btn{
          margin-bottom: 5px;
          display: flex;
          float: right;
        }
      }
      .list{
        flex: 1;
        overflow-y: auto;
        .list-item{
          background: #fff;
          margin-bottom: 8px;
          border-radius: 5px;
          padding: 10px 15px;
          .part1{
            width: 100%;
            display: flex;
            align-items: flex-start;
            .title{
              width: 0;
              flex: 1;
              line-height: 1.4em;
            }
            .flag{
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              margin-left: 10px;
              color: red;
            }
          }
          .part2{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-top: 6px;
            .username{
              margin-left: 10px;
              margin-right: 10px;
            }
            .tag{
              margin: 3px;
            }
          }
          .part3{
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 6px;
            .tag{
              margin: 3px;
            }
          }
          .part4{
            margin-top: 6px;
          }
        }
      }
    }
  }
}
</style>
