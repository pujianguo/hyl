<template>
  <!-- <el-dialog class="weifuwu-index-detail" visible.sync="visible"> -->
  <div>
    <el-dialog class="weifuwu-index-detail" :visible="true">
      <template class="detail-header" slot="title">
        <div class="detail-header-left">{{info.title}}</div>
        <div class="detail-header-right">
          <span @click="openAddRateDialog">评分</span>
          <span @click="handleStar"><i class="el-icon-s-flag" :class="{'is-star': info.star}"></i></span>
        </div>
      </template>
      <div class="detail-left" v-loading="leftLoading">
        <div class="info">
          <div class="line">
            <span class="label">当前分数</span>
            <div class="value">{{leftInfo.score}}</div>
          </div>
          <div class="line">
            <span class="label">综合和评级</span>
            <div class="value">{{leftInfo.level}}</div>
          </div>
          <div class="line">
            <span class="label">所属域</span>
            <div class="value">{{leftInfo.yu}}</div>
          </div>
          <div class="line">
            <span class="label">负责人</span>
            <div class="value">
              <el-avatar class="avatar" size="small" :src="leftInfo.fuzerenAvatar"></el-avatar>
              <span>{{leftInfo.fuzeren}}</span>
            </div>
          </div>
          <div class="line">
            <span class="label">参与者</span>
            <div class="value">
              <el-tooltip placement="top" v-for="(item, index) in leftInfo.members" :key="index">
                <div slot="content">{{item.name}}</div>
                <el-avatar class="avatar" size="small" :src="item.avatar"></el-avatar>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="rule">
          <div class="rule-title">关联规则</div>
          <div class="rule-item" v-for="(item, index) in  leftRule" :key="index">
            <div class="rule-item-title">{{item.title}}</div>
            <el-avatar class="rule-item-avatar" size="small" :src="item.avatar"></el-avatar>
          </div>
        </div>
      </div>
      <div class="detail-middle" v-loading="middleLoading">
        <div class="header">
          <span class="text">进度及评分</span>
          <span class="score">{{leftInfo.score}}分</span>
        </div>

        <div class="card" v-for="card in middleInfo" :key="card.title">
          <div class="card-title" @click="card.show = !card.show">
            <i class="icon" :class="card.show ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            <div class="text">{{card.title}}</div>
            <div class="score">{{card.score}}分</div>
          </div>
          <div class="card-body" :class="{'card-body-hide': !card.show}">
            <div class="table">
              <div class="tr tr-header">
                <div class="td-icon"></div>
                <div class="td">项目</div>
                <div class="td">进度</div>
                <div class="td">时间</div>
              </div>
              <template v-for="(item, index) in card.list">
                <div class="tr"  :class="{'tr-rate': item.isRate}" @click="openRate(item)" :key="'tr'+index">
                  <div class="td-icon">
                    <template v-if="item.isRate">
                      <i :class="item.showRate ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
                    </template>
                  </div>
                  <div class="td">{{item.name}}</div>
                  <div class="td">
                    <template v-if="item.isRate">
                      <el-rate v-model="item.rate" disabled show-score text-color="#ff9900" > </el-rate>
                    </template>
                    <template v-else>
                      <template v-if="item.jindu === 100">
                        <i class="el-icon-success color-green"></i>
                        <span class="margin-left color-green">完成</span>
                      </template>
                      <template v-else-if="item.jindu === 0">
                        <span class="desc-text">无数据</span>
                      </template>
                      <template v-else>
                        <el-progress :percentage="item.jindu" color="rgb(103 194 58)"></el-progress>
                      </template>
                    </template>
                  </div>
                  <div class="td">{{item.time}}</div>
                </div>
                <div v-if="item.isRate" :class="['rate-content', {'rate-content-hide': !item.showRate}]" :key="'tr1'+index">
                  <div v-loading="item.rateLoading">
                    <div class="rate-content-item" v-for="rate in item.rateList" :key="rate.id">
                      <div class="left">
                        <el-avatar class="avatar" size="small" :src="rate.avatar"></el-avatar>
                        <span>{{rate.user}}</span>
                      </div>
                      <div class="right">
                        <div class="right-header">
                          <el-rate v-model="rate.rate" disabled show-score text-color="#ff9900" > </el-rate>
                          <span class="desc-text">{{rate.time}}</span>
                        </div>
                        <div class="title">{{rate.content}}</div>
                      </div>
                    </div>
                    <div class="empty" v-if="!item.rateList.length">
                      暂无数据
                    </div>
                    <div class="loadmore-wrapper">
                      <el-button size="mini" :loading="item.rateLoading" @click="loadmoreRate(item)">加载更多</el-button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

      </div>

      <div class="detail-right" v-loading="rightLoading">
        <el-select class="log-select" v-model="logType" @change="changeLogType">
          <el-option label="所有动态" value="all"></el-option>
        </el-select>
        <div class="log-box" ref="bsWrapper">
          <div>
            <div class="item" :class="{'item_only-one': logList.length === 1}" v-for="item in logList" :key="item.id">
              <div class="line-node"></div>
              <div class="line-tail"></div>
              <div class="item-header">
                <div class="item-header-left">
                  <template v-if="item.user === 'system'">
                    <span>系统</span>
                  </template>
                  <template v-else>
                    <el-avatar class="avatar" size="small" :src="item.avatar"></el-avatar>
                    <span>{{item.user}}</span>
                  </template>
                </div>
                <span class="item-header-right desc-text">{{item.time}}</span>
              </div>
              <div class="item-content">{{item.content}}</div>
              <div class="item-link" v-if="item.link">
                <i class="icon el-icon-link"></i>
                <span>{{item.link}}</span>
              </div>
            </div>
          </div>
          <div id="log-content-bottom"></div>
        </div>
        <div class="log-form">
          <div class="top">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="logForm.content"></el-input>
          </div>
          <div class="bottom">
            <el-popover
              placement="top-start"
              width="400"
              v-model="logFormVisible"
              trigger="click">
              <p class="margin-bottom font-bold">添加相关成果的W3等链接：</p>
              <div class="flex-x-center">
                <el-input placeholder="粘贴链接地址" v-model="logForm.inputLink"></el-input>
                <el-button class="margin-left" @click="addLink">添加</el-button>
              </div>
              <i slot="reference" class="icon el-icon-link"></i>
            </el-popover>
            <div class="text">{{logForm.link}}</div>
            <el-button class="btn" @click="submitLogForm" :loading="submitLogFormBtnLoading">发布</el-button>
          </div>
        </div>
      </div>

    </el-dialog>

    <!-- 评分表单 -->
    <el-dialog class="weifuwu-index-detail-add-rate" title="评分" :visible.sync="addRateVisible" >
      <el-form class="add-rate-content" :model="addRateForm" :rules="addRateRules" ref="addRateForm" label-position="top" label-width="100px">
          <el-form-item label="选择项目" prop="a">
            <el-select v-model="addRateForm.a" placeholder="请选择a" class="margin-right">
              <el-option label="L1" value="l1"></el-option>
              <el-option label="L2" value="l2"></el-option>
            </el-select>
            <el-select v-model="addRateForm.b" placeholder="请选择b">
              <el-option label="简洁" value="l1"></el-option>
              <el-option label="简洁2" value="l2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评分" prop="rate">
            <div class="form-rate">
              <el-rate class="margin-right" v-model="addRateForm.rate" disabled show-score text-color="#ff9900"></el-rate>
              <el-input-number class="margin-right" v-model="addRateForm.rate" :precision="1" :step="0.1" :min="0" :max="5"></el-input-number>
              <span>满分5分</span>
            </div>
          </el-form-item>
          <el-form-item label="评语" prop="content">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addRateForm.content"></el-input>
          </el-form-item>

      </el-form>
      <div class="footer">
        <el-button type="default" @click="closeAddRateDialog">取消</el-button>
        <el-button type="primary" @click="submitAddRateForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/avatar.png'
import BScroll from 'better-scroll'
import './detail.scss'
// import { addStar, addRate } from 'api/weifuwu'

export default {
  name: 'weifuwu-index-detail',
  components: {},
  props: {
    value: Boolean,
    detailId: Number,
  },
  data () {
    return {
      visible: false,

      info: {
        title: '我是标题',
        star: false,
      },

      leftLoading: false,
      middleLoading: false,
      rightLoading: false,

      leftInfo: {
        score: 100,
        level: 'L2',
        yu: 'Access',
        fuzeren: 'AAA',
        fuzerenAvatar: defaultAvatar,
        members: [
          { name: 'a', avatar: defaultAvatar },
          { name: 'b', avatar: defaultAvatar },
          { name: 'c', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
        ],
      },
      leftRule: [
        { title: '第一个规则', avatar: defaultAvatar },
        { title: '第二个规则', avatar: defaultAvatar },
        { title: '第三个规则第三个规则第三个规则第三个规则第三个规则', avatar: defaultAvatar },
      ],

      middleInfo: [],

      logType: 'all',
      logList: [
        { id: 1, type: 'text', user: 'system', avatar: '', time: '2021-02-01 6:00', content: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题' },
        { id: 3, type: 'text', user: 'user1', avatar: defaultAvatar, time: '2021-02-01 6:00', content: '我是标题' },
        { id: 4, type: 'link', user: 'user2', avatar: defaultAvatar, time: '2021-02-01 6:00', content: '', link: 'http://www.baidu.com' },
      ],
      logFormVisible: false,
      submitLogFormBtnLoading: false,
      logForm: {
        link: '',
        inputLink: '',
        content: '',
      },

      // add rate
      addRateVisible: false,
      addRateForm: {
        a: '',
        b: '',
        rate: 5,
        content: '',
      },
      addRateRules: {
        a: [
          { required: true, message: '请选择a', trigger: 'change' },
        ],
        b: [
          { required: true, message: '请选择b', trigger: 'change' },
        ],
        rate: [
          { required: true, message: '请填写评分', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请填写评语', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
  },
  watch: {
    value (val) {
      if (val && val !== this.visible) {
        this.visible = val
        if (this.visible) {
          this.getDetailDate()
        }
      }
    },
    visible (val) {
      this.$emit('input', val)
    },
  },
  created () {
  },
  mounted () {
    this.getMiddleInfo()
    this.bs = null
    this.$nextTick(() => {
      this.scrollInit()
    })
  },
  methods: {
    getMiddleInfo () {
      this.middleInfo = [
        {
          title: 'L1',
          show: false,
          score: 88,
          list: [
            { name: '编译告警清零', jindu: 100, time: '2021-02-01 6:00' },
            { name: '编译告警清零', jindu: 100, time: '2021-02-01 6:00' },
            { name: '编译告警清零', jindu: 90, time: '2021-02-01 6:00' },
            { name: '编译告警清零', jindu: 70, time: '2021-02-01 6:00' },
            { name: '编译告警清零', jindu: 0, time: '-' },
            { name: '编译告警清零', jindu: 0, time: '-' },
            { name: '编译告警清零', jindu: 0, time: '-' },
          ],
        },
        {
          title: 'L2',
          show: true,
          score: 66,
          list: [
            { name: '编译告警清零', jindu: 100, time: '2021-02-01 6:00' },
            { name: '编译告警清零', jindu: 100, time: '2021-02-01 6:00' },
            { name: '编译告警清零', jindu: 90, time: '2021-02-01 6:00' },
            { name: '编译告警清零', jindu: 70, time: '2021-02-01 6:00' },
            {
              id: 1,
              name: '简洁',
              jindu: 70,
              time: '2021-02-01 6:00',
              isRate: true,
              showRate: false,
              rate: 3.5,
              rateLoading: false,
              pageNum: 3,
              pageSize: 1,
              rateList: [],
            },
            {
              id: 2,
              name: '简洁2',
              jindu: 70,
              time: '2021-02-01 6:00',
              isRate: true,
              showRate: false,
              rate: 3.5,
              rateLoading: false,
              pageNum: 3,
              pageSize: 1,
              rateList: [],
            },
          ],
        },
      ]
    },

    // log
    scrollToBottom () {
      setTimeout(() => {
        this.bs.scrollToElement('#log-content-bottom', 200)
      }, 0)
    },
    scrollInit () {
      this.bs = new BScroll(this.$refs.bsWrapper, {
        mouseWheel: true, // 允许鼠标滚动
        preventDefault: false,
        scrollbar: { // 显示滚动条
          fade: false,
          interactive: false,
        },
      })
      // this.bs.on('scrollEnd', (pos) => {
      //   console.log('xiala')
      //   // 下拉动作
      //   if (pos.y > 50) {
      //     // this.loadData()
      //   }
      // })
    },
    changeLogType (val) {
      if (this.logType !== val) {
        this.logType = val
        this.getLogData()
      }
    },
    getLogData () {
      console.log('get log list')
    },

    getDetailDate () {
      // TODO: 获取数据
    },

    openRate (item) {
      // 没有数据时才去获取
      if (!item.rateList.length) {
        item.rateLoading = true
        setTimeout(() => {
          item.rateLoading = false
          item.rateList = [
            { id: 1, user: 'xxx', avatar: defaultAvatar, rate: 3.5, time: '2021-02-01 6:00', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
            { id: 2, user: 'xxx', avatar: defaultAvatar, rate: 3.5, time: '2021-02-01 6:00', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
            { id: 3, user: 'xxx', avatar: defaultAvatar, rate: 3.5, time: '2021-02-01 6:00', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
            { id: 4, user: 'xxx', avatar: defaultAvatar, rate: 3.5, time: '2021-02-01 6:00', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
          ]
        }, 1000)
        // listRate(item.id).then(res => {

        // }).catch(e => {
        //   console.log('err', e)
        // })
      }
      item.showRate = !item.showRate
    },
    loadmoreRate (item) {
      item.rateLoading = true
      item.pageNum++
      setTimeout(() => {
        item.rateLoading = false
        const list = [
          { id: 1, user: 'xxx', avatar: defaultAvatar, rate: 3.5, time: '2021-02-01 6:00', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
          { id: 2, user: 'xxx', avatar: defaultAvatar, rate: 3.5, time: '2021-02-01 6:00', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
          { id: 3, user: 'xxx', avatar: defaultAvatar, rate: 3.5, time: '2021-02-01 6:00', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
          { id: 4, user: 'xxx', avatar: defaultAvatar, rate: 3.5, time: '2021-02-01 6:00', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
        ]
        item.rateList.push(...list)
      }, 1000)
      // const data = {
      //   id: item.id,
      //   pageSize: item.pageSize,
      //   pageNum: item.pageNum,
      // }
      // listRate(data).then(res => {

      // }).catch(e => {
      //   console.log('err', e)
      // })
    },

    // add rate
    openAddRateDialog () {
      this.$refs.addRateForm && this.$refs.addRateForm.resetFields()
      this.addRateVisible = true
    },
    closeAddRateDialog () {
      this.addRateVisible = false
      this.$refs.addRateForm.resetFields()
    },
    submitAddRateForm () {
      this.$refs.addRateForm.validate((valid) => {
        if (valid) {
          console.log('data', this.addRateForm)
          // addRate(this.addRateForm).then(res => {
          //   this.$message.success('添加成功')
          //   this.closeAddRateDialog()
          // }).catch(e => {
          //   console.log('err', e)
          // })

          this.$message.success('添加成功')
          this.closeAddRateDialog()
        } else {
          console.log('error submit!!')
          this.$message.warning('表单校验失败！')
          return false
        }
      })
    },

    // 标记
    handleStar () {
      this.info.star = !this.info.star
      // addStar(this.info.star).then(res => {
      //   console.log('res')
      // }).catch(e => {
      //   console.log('e', e)
      // })
    },

    addLink () {
      if (this.logForm.inputLink === '') {
        this.$message.warning('请输入链接地址')
        return
      }
      const reg = /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
      if (!reg.test(this.logForm.inputLink)) {
        this.$message.warning('请输入正确的链接格式')
        return
      }
      this.logForm.link = this.logForm.inputLink
      this.logForm.inputLink = ''
      this.logFormVisible = false
    },
    submitLogForm () {
      if (this.logForm.content === '') {
        this.$message.warning('请输入内容')
        return
      }
      this.submitLogFormBtnLoading = true
      setTimeout(() => {
        this.submitLogFormBtnLoading = false
        this.$message.success('发布成功')
        this.logForm = {
          inputLink: '',
          link: '',
          content: '',
        }
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
</style>
