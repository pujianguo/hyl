<template>
  <div>
    <el-dialog class="weifuwu-index-detail" :visible.sync="visible">
      <template class="detail-header" slot="title">
        <div class="detail-header-left">{{leftInfo.name}}</div>
        <div class="detail-header-right">
          <span @click="openAddRateDialog">评分</span>
          <span @click="handleStar"><i class="el-icon-s-flag" :class="{'is-star': leftInfo.mark}"></i></span>
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
            <div class="value">{{leftInfo.group}}</div>
          </div>
          <div class="line">
            <span class="label">负责人</span>
            <div class="value">
              <el-avatar class="avatar" size="small" :src="leftInfo.avatar"></el-avatar>
              <span>{{leftInfo.ownerZn}}</span>
            </div>
          </div>
          <div class="line">
            <span class="label">参与者</span>
            <div class="value">
              <el-tooltip placement="top" v-for="(item, index) in leftInfo.partyList" :key="index">
                <div slot="content">{{item.nameZn}}</div>
                <el-avatar class="avatar" size="small" :src="item.avatar"></el-avatar>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="rule">
          <div class="rule-title">关联规则</div>
          <div class="rule-item" v-for="item in  msStory.list" :key="item.id">
            <div class="rule-item-title">{{item.name}}</div>
            <el-avatar class="rule-item-avatar" size="small" :src="item.avatar"></el-avatar>
          </div>
          <div class="loadmore-wrapper" v-if="msStory.hasMore">
            <el-button size="mini" @click="getMsStoryList" :loading="msStory.loading">加载更多</el-button>
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
            <div class="text">{{card.level}}</div>
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
              <template v-for="item in card.list">
                <div class="tr"  :class="{'tr-rate': item.drop}" @click="openRate(item)" :key="'a'+item.id">
                  <div class="td-icon">
                    <template v-if="item.drop">
                      <i :class="item.showRate ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
                    </template>
                  </div>
                  <div class="td">{{item.project}}</div>
                  <div class="td">
                    <template v-if="item.drop">
                      <el-rate v-model="item.score" disabled show-score text-color="#ff9900" > </el-rate>
                    </template>
                    <template v-else>
                      <template v-if="item.score === 100">
                        <i class="el-icon-success color-green"></i>
                        <span class="margin-left color-green">完成</span>
                      </template>
                      <template v-else-if="item.score === null">
                        <span class="desc-text">无数据</span>
                      </template>
                      <template v-else>
                        <el-progress :percentage="item.score" color="rgb(103 194 58)"></el-progress>
                      </template>
                    </template>
                  </div>
                  <div class="td">{{item.lastUpdateTime || '-'}}</div>
                </div>
                <div v-if="item.drop" :class="['rate-content', {'rate-content-hide': !item.showRate}]" :key="'b'+item.id">
                  <div v-loading="item.rateLoading">
                    <div class="rate-content-item" v-for="rate in item.dropList" :key="rate.id">
                      <div class="left">
                        <el-avatar class="avatar" size="small" :src="rate.avatar"></el-avatar>
                        <span>{{rate.user}}</span>
                      </div>
                      <div class="right">
                        <div class="right-header">
                          <el-rate v-model="rate.score" disabled show-score text-color="#ff9900" > </el-rate>
                          <span class="desc-text">{{rate.dateTime}}</span>
                        </div>
                        <div class="title">{{rate.content}}</div>
                      </div>
                    </div>
                    <div class="empty" v-if="!item.dropList.length">
                      暂无数据
                    </div>
                    <div class="loadmore-wrapper" v-if="item.dropList.length && !item.hideMoreBtn">
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
            <div class="item" :class="{'item_only-one': msProgress.list.length === 1}" v-for="item in msProgress.list" :key="item.id">
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
              <a class="item-link" v-if="item.link" :href="item.link" target="_blank">
                <i class="icon el-icon-link"></i>
                <span>{{item.link}}</span>
              </a>
            </div>
          </div>
          <div class="loadmore-wrapper padding" v-if="msProgress.list.length && msProgress.hasMore">
            <el-button size="mini" :loading="msProgress.loading" @click="loadmoreRate">加载更多</el-button>
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
          <el-form-item label="选择项目" prop="project">
            <el-select v-model="addRateForm.level" placeholder="请选择" class="margin-right" @change="changeLevel">
              <el-option :label="item" :value="item" v-for="(item, index) in levelList" :key="index"></el-option>
            </el-select>
            <el-select v-model="addRateForm.project" placeholder="请选择">
              <el-option :label="item" :value="item" v-for="(item, index) in projectList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评分" prop="score">
            <div class="form-score">
              <el-rate class="margin-right" v-model="addRateForm.score" disabled show-score text-color="#ff9900"></el-rate>
              <el-input-number class="margin-right" v-model="addRateForm.score" :precision="1" :step="0.1" :min="0" :max="5"></el-input-number>
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
// import BScroll from 'better-scroll'
import './detail.scss'
// import { addStar, addRate } from 'api/weifuwu'
import {getMsLevelProject,getMsDetail,getMsStoryList,getMsLevel,getMsReview,getMsProgress,addMsReview,addMsProgress,updateMsBase} from 'api/weifuwu'

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

      leftLoading: false,
      middleLoading: false,
      rightLoading: false,

      leftInfo: {
        name: '',
        mark: false,
        score: 0,
        level: '',
        group: '',
        ownerZn: '',
        avatar: defaultAvatar,
        partyList: [],
      },
      msStory: {
        list: [],
        pageNum: 0,
        pageSize: 10,
        loading: false,
        hasMore: true,
      },

      middleInfo: [],


      logType: 'all',
      logList: [],
      logFormVisible: false,
      submitLogFormBtnLoading: false,
      logForm: {
        link: '',
        inputLink: '',
        content: '',
      },
      msProgress: {
        list: [],
        pageNum: 0,
        pageSize: 10,
        loading: false,
        hasMore: true,
      },

      // add rate
      addRateVisible: false,
      addRateForm: {
        level: '',
        project: '',
        score: 5,
        content: '',
      },
      addRateRules: {
        level: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        project: [
          { required: true, message: '请选择项目', trigger: 'change' },
        ],
        score: [
          { required: true, message: '请填写评分', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请填写评语', trigger: 'blur' },
        ],
      },
      levelList: [],
      projectList: [],
      levelObj: [],
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
          this.getMsStoryList()
          this.getMsLevel()
          this.getMsProgress()
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
    // 获取下拉列表
    this.getMsLevelProject()
  },
  methods: {
    getMsLevelProject () {
      getMsLevelProject().then(res => {
        this.levelObj = res
        let level = []
        for (let k in res) {
          level.push(k)
        }
        this.levelList = level
      })
    },
    changeLevel () {
      this.addRateForm.project = ''
      if (this.addRateForm.level) {
        this.projectList = this.levelObj[this.addRateForm.level] || []
      } else {
        this.projectList = []
      }
    },

    // 获取微服务详情
    getDetailDate () {
      let id = this.detailId
      getMsDetail(id).then(res => {
        this.leftInfo = res
      })
    },
    // 获取关联需求
    getMsStoryList () {
      let id = this.detailId
      this.msStory.pageNum++
      let params = {
        pageSize: this.msStory.pageSize,
        pageNum: this.msStory.pageNum
      }
      this.msStory.loading = true
      getMsStoryList(id, params).then(res => {
        this.msStory.list = [...this.msStory.list, ...res.rows]
        if (res.page === this.msStory.pageNum) {
          this.msStory.hasMore = false
        }
      }).finally(() => {
        this.msStory.loading = false
      })
    },
    getMsLevel(){
      let id = this.detailId
      getMsLevel(id).then(res => {
        this.middleInfo = res
      })
    },

    openRate (item) {
      // 没有数据时才去获取
      if (!item.dropList.length) {
        this.loadmoreRate(item)
      }
      item.showRate = this.$set(item, 'showRate', !item.showRate)
    },
    loadmoreRate (item) {
      if (item.pageNum === undefined) {
        item.pageNum = 0
      }
      item.pageNum++
      let params = {
        pageNum: item.pageNum,
        pageSize: 3
      }
      this.$set(item, 'rateLoading', true)
      getMsReview(item.id, params).then(res => {
        item.dropList.push(...item.dropList, ...res.rows)
        if (res.page === item.pageNum) {
          this.$set(item, 'hideMoreBtn', true)
        }
      }).finally(_ => {
        this.$set(item, 'rateLoading', false)
      })
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
          let data = {
            serviceId: this.detailId,
            level: this.addRateForm.level,
            project: this.addRateForm.project,
            score: this.addRateForm.score,
            content: this.addRateForm.content,
          }
          addMsReview(data).then(res => {
            this.$message.success('添加成功')
            this.closeAddRateDialog()
            this.refreshReviewList(data.level, data.project)
          }).catch(e => {
            console.log('err', e)
          })
        } else {
          this.$message.warning('表单校验失败！')
          return false
        }
      })
    },
    // 更新评论列表数据
    refreshReviewList(level, project){
      let levelObj = this.middleInfo.find(x => x.level === level)
      if (!levelObj) {
        return
      }
      let projectObj = levelObj.list.find(x => x.project === project && x.drop)
      if (!projectObj){
        return
      }
      projectObj.dropList = []
      projectObj.pageNum = 0
      this.loadmoreRate(projectObj)
    },


    // 标记
    handleStar () {
      this.leftInfo.mark = !this.leftInfo.mark
      let data = {
        id: this.detailId,
        mark: this.leftInfo.mark
      }
      updateMsBase(data).then(res => {
      }).catch(err => {
        this.leftInfo.mark = !this.leftInfo.mark
        cosole.log('err', err)
      })
    },

    // 右侧进度
    changeLogType (val) {
      if (this.logType !== val) {
        this.logType = val
        this.refreshMsProgress()
      }
    },
    refreshMsProgress () {
      this.msProgress.pageNum = 0
      this.msProgress.list = []
      this.getMsProgress()
    },
    getMsProgress () {
      let id = this.detailId
      this.msProgress.pageNum++
      let params = {
        pageSize: this.msProgress.pageSize,
        pageNum: this.msProgress.pageNum,
        type: this.logType
      }
      this.msProgress.loading = true
      getMsProgress(id, params).then(res => {
        this.msProgress.list = [...this.msProgress.list, ...res.rows]
        if (res.page === this.msProgress.pageNum) {
          this.msProgress.hasMore = false
        }
      }).finally(() => {
        this.msProgress.loading = false
      })
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
      let data = {
        serviceId: this.detailId,
        link: this.logForm.link,
        content: this.logForm.content,
      }
      this.submitLogFormBtnLoading = true
      addMsProgress(data).then(res => {
        this.submitLogFormBtnLoading = false
        this.$message.success('发布成功')
        this.logForm = {
          inputLink: '',
          link: '',
          content: '',
        }
        this.refreshMsProgress()
      }).catch(err => {
        this.submitLogFormBtnLoading = false
        console.log('err', err)
      })
    },
  },
}
</script>

<style lang="scss">
</style>
