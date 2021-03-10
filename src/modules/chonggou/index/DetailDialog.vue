<template>
  <!-- <el-dialog class="chonggou-index-detail" visible.sync="visible"> -->
  <div>
    <el-dialog class="chonggou-index-detail" :visible="false">
      <template class="detail-header" slot="title">
        <div class="detail-header-left">{{info ? info.title : ''}}</div>
        <div class="detail-header-right" v-if="info">
          <span @click="handleStop">结束需求</span>
          <span @click="handleStar"><i class="el-icon-s-flag" :class="{'is-star': info.star}"></i></span>
        </div>
      </template>
      <div class="detail-left" v-loading="leftLoading">
        <div class="info-title">基本信息</div>
        <div class="info" v-if="info">
          <div class="line">
            <div class="label">当前状态</div>
            <div class="value">
              <el-tag type="success" effect="plain">{{info.status}}</el-tag>
            </div>
          </div>
          <div class="line">
            <div class="label">需求编号</div>
            <div class="value color-primary">{{info.number}}</div>
          </div>
          <div class="line">
            <div class="label">主导域</div>
            <div class="value">{{info.yu}}</div>
          </div>
          <div class="line">
            <div class="label">SE预估工作量</div>
            <div class="value">
              <div class="value-a">{{info.se.tian}}</div>
              <div class="value-b">人天</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{info.se.yue}}</div>
              <div class="value-b">人月</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{info.se.line}}</div>
              <div class="value-b">千行</div>
            </div>
          </div>
          <div class="line">
            <div class="label">市场预估工作量</div>
            <div class="value">
              <div class="value-a">{{info.shichang.tian}}</div>
              <div class="value-b">人天</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{info.shichang.yue}}</div>
              <div class="value-b">人月</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <span class="value-a">{{info.shichang.line}}</span>
              <span>千行</span>
            </div>
          </div>
          <div class="line">
            <div class="label">主导负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="info.zhudao.avatar"></el-avatar>
              <span class="value-a">{{info.zhudao.name}}</span>
              <span>{{info.zhudao.id}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">测试负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="info.ceshi.avatar"></el-avatar>
              <span class="value-a">{{info.ceshi.name}}</span>
              <span>{{info.ceshi.id}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">验证负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="info.yanzheng.avatar"></el-avatar>
              <span class="value-a">{{info.yanzheng.name}}</span>
              <span>{{info.yanzheng.id}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">参与者</div>
            <div class="value">
              <el-tooltip placement="top" v-for="(item, index) in info.members" :key="index">
                <div slot="content">{{item.name}}</div>
                <el-avatar class="avatar" size="small" :src="item.avatar"></el-avatar>
              </el-tooltip>
            </div>
          </div>
          <div class="line">
            <div class="label">目标达成时间</div>
            <div class="value">
              {{info.startTime}} - {{info.endTime}}
            </div>
          </div>
          <div class="line">
            <div class="label">持续时间</div>
            <div class="value">{{info.keepTime}}</div>
          </div>
          <div class="line">
            <div class="label">预估工作量</div>
            <div class="value">{{info.yugu}}k</div>
          </div>
          <div class="line">
            <div class="label">消减代码量</div>
            <div class="value">{{info.xiaojian}}k</div>
          </div>
        </div>
        <div class="info-title">关联微服务</div>
        <div class="info" v-if="info">
          <el-tag class="tag" v-for="(tag, index) in info.services" :key="index" size="medium">{{tag}}</el-tag>
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
  </div>
</template>

<script>
import defaultAvatar from '@/assets/avatar.png'
import './DetailDialog.scss'

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

      leftLoading: false,
      rightLoading: false,

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
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.info = {
        id: 1,
        title: '我是标题',
        star: false,
        status: 'Open',
        number: 1234332,
        yu: 'Access',
        se: {
          tian: 10,
          yue: 0.545,
          line: 0.6,
        },
        shichang: {
          tian: 10,
          yue: 0.545,
          line: 0.6,
        },
        zhudao: {
          avatar: defaultAvatar,
          name: '罗伊斯',
          id: '0034323',
        },
        ceshi: {
          avatar: defaultAvatar,
          name: '罗伊斯',
          id: '0034323',
        },
        yanzheng: {
          avatar: defaultAvatar,
          name: '罗伊斯',
          id: '0034323',
        },
        members: [
          { name: 'a', avatar: defaultAvatar },
          { name: 'b', avatar: defaultAvatar },
          { name: 'c', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
          { name: 'd', avatar: defaultAvatar },
        ],
        startTime: '2021-01-03',
        endTime: '2021-02-03',
        keepTime: '-',
        yugu: 3,
        xiaojian: 2,
        services: ['关联微服务1', '关联微服务2', '关联微服务3', '关联微服务3', '关联微服务3', '关联微服务3'],
      }
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

    handleStop () {

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
  },
}
</script>

<style lang="scss">
</style>
