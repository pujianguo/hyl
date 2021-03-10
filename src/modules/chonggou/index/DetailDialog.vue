<template>
  <div>
    <el-dialog class="chonggou-index-detail" :visible.sync="visible" @close="handleCloseDialog">
      <template class="detail-header" slot="title">
        <div class="detail-header-left">{{info ? info.name : ''}}</div>
        <div class="detail-header-right" v-if="info">
          <el-button @click="handleStop" v-if="info.implementStatus !== 'Closed'" :loading="finishBtnLoading">结束需求</el-button>
          <span @click="handleStar"><i class="el-icon-s-flag" :class="{'is-star': info.mark}"></i></span>
        </div>
      </template>
      <div class="detail-left" v-loading="leftLoading">
        <div class="info-title">基本信息</div>
        <div class="info" v-if="info">
          <div class="line">
            <div class="label">当前状态</div>
            <div class="value">
              <el-tag type="success" effect="plain">{{info.implementStatus}}</el-tag>
            </div>
          </div>
          <div class="line">
            <div class="label">需求编号</div>
            <div class="value color-primary">{{info.coreAlmNo}}</div>
          </div>
          <div class="line">
            <div class="label">主导域</div>
            <div class="value">{{info.group}}</div>
          </div>
          <div class="line">
            <div class="label">SE预估工作量</div>
            <div class="value">
              <div class="value-a">{{info.seWorkload.day}}</div>
              <div class="value-b">人天</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{info.seWorkload.month}}</div>
              <div class="value-b">人月</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{info.seWorkload.line}}</div>
              <div class="value-b">千行</div>
            </div>
          </div>
          <div class="line">
            <div class="label">市场预估工作量</div>
            <div class="value">
              <div class="value-a">{{info.marketWorkload.day}}</div>
              <div class="value-b">人天</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{info.marketWorkload.month}}</div>
              <div class="value-b">人月</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <span class="value-a">{{info.marketWorkload.line}}</span>
              <span>千行</span>
            </div>
          </div>
          <div class="line">
            <div class="label">主导负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="info.leadOwner.avatar"></el-avatar>
              <span class="value-a">{{info.leadOwner.nameZn}}</span>
              <span>{{info.leadOwner.id}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">测试负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="info.testOwner.avatar"></el-avatar>
              <span class="value-a">{{info.testOwner.nameZn}}</span>
              <span>{{info.testOwner.id}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">验证负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="info.verifyOwner.avatar"></el-avatar>
              <span class="value-a">{{info.verifyOwner.nameZn}}</span>
              <span>{{info.verifyOwner.id}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">责任人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="info.avatar"></el-avatar>
              <span class="value-a">{{info.ownerZn}}</span>
              <span>{{info.owner}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">参与者</div>
            <div class="value">
              <el-tooltip placement="top" v-for="(item, index) in info.partyList" :key="index">
                <div slot="content">{{item.nameZn}}</div>
                <el-avatar class="avatar" size="small" :src="item.avatar"></el-avatar>
              </el-tooltip>
            </div>
          </div>
          <div class="line">
            <div class="label">目标达成时间</div>
            <div class="value">
              {{info.estStartTime}} - {{info.estEndTime}}
            </div>
          </div>
          <div class="line">
            <div class="label">预估工作量</div>
            <div class="value">{{info.storyCode}}k</div>
          </div>
          <div class="line">
            <div class="label">消减代码量</div>
            <div class="value">{{info.reduceCode}}k</div>
          </div>
        </div>
        <div class="info-title">关联微服务</div>
        <div class="info" v-if="info">
          <el-tag class="tag" v-for="(tag, index) in info.microserviceInfo.split(',')" :key="index" size="medium">{{tag}}</el-tag>
        </div>
      </div>
      <div class="detail-right" v-loading="rightLoading">
        <el-select class="log-select" v-model="logType" @change="changeLogType">
          <el-option label="所有动态" value="all"></el-option>
          <el-option label="仅文字" value="text"></el-option>
          <el-option label="仅链接" value="link"></el-option>
        </el-select>
        <div class="log-box" ref="bsWrapper">
          <div>
            <div class="item" :class="{'item_only-one': storyProgress.list.length === 1}" v-for="item in storyProgress.list" :key="item.id">
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
          <div class="loadmore-wrapper padding" v-if="storyProgress.list.length && storyProgress.hasMore">
            <el-button size="mini" :loading="storyProgress.loading" @click="getStoryProgress">加载更多</el-button>
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
  </div>
</template>

<script>
import defaultAvatar from '@/assets/avatar.png'
import './DetailDialog.scss'
import {getStoreDomain,finishStory,updateStoryMark, getStoryProgress, addStoryProgress} from 'api/chonggou'

export default {
  name: 'chonggou-index-detail',
  components: {},
  props: {
    value: Boolean,
    detailId: Number,
  },
  data () {
    return {
      visible: false,

      info: null,

      finishBtnLoading: false,

      leftLoading: false,
      rightLoading: false,

      logType: 'all',
      logFormVisible: false,
      submitLogFormBtnLoading: false,
      logForm: {
        link: '',
        inputLink: '',
        content: '',
      },
      storyProgress: {
        list: [],
        pageNum: 0,
        pageSize: 10,
        loading: false,
        hasMore: true,
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
          this.getStoryProgress()
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
  },
  methods: {
    getDetailDate () {
      getStoreDomain(this.detailId).then(res => {
        this.info = res
      }).catch(err => {
        console.log('err', err)
      })
    },

    // 右侧进度
    changeLogType (val) {
      if (this.logType !== val) {
        this.logType = val
        this.refreshStoryProgress()
      }
    },
    refreshStoryProgress () {
      this.storyProgress.pageNum = 0
      this.storyProgress.list = []
      this.getStoryProgress()
    },
    getStoryProgress () {
      let id = this.detailId
      this.storyProgress.pageNum++
      let params = {
        pageSize: this.storyProgress.pageSize,
        pageNum: this.storyProgress.pageNum,
        type: this.logType
      }
      this.storyProgress.loading = true
      getStoryProgress(id, params).then(res => {
        this.storyProgress.list = [...this.storyProgress.list, ...res.rows]
        if (res.page === this.storyProgress.pageNum) {
          this.storyProgress.hasMore = false
        }
      }).finally(() => {
        this.storyProgress.loading = false
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
      addStoryProgress(data).then(res => {
        this.submitLogFormBtnLoading = false
        this.$message.success('发布成功')
        this.logForm = {
          inputLink: '',
          link: '',
          content: '',
        }
        this.refreshStoryProgress()
      }).catch(err => {
        this.submitLogFormBtnLoading = false
        console.log('err', err)
      })
    },

    handleStop () {
      this.finishBtnLoading = true
      finishStory(this.detailId).then(res => {
        this.finishBtnLoading = false
        this.info.implementStatus = 'Closed'
      }).catch(err => {
        this.finishBtnLoading = false
        console.log('err', err)
      })
    },

    // 标记
    handleStar () {
      this.info.mark = !this.info.mark
      let data = {
        id: this.detailId,
        mark: this.info.mark
      }
      updateStoryMark(data).then(res => {
      }).catch(err => {
        this.info.mark = !this.info.mark
        cosole.log('err', err)
      })
    },

    handleCloseDialog () {
      this.$parent.getData()
    }
  },
}
</script>

<style lang="scss">
</style>
