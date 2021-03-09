<template>
  <!-- <el-dialog class="chonggou-index-detail" visible.sync="visible"> -->
  <div>
    <el-dialog class="chonggou-index-add" title="新建需求" :visible="true">
      <div class="detail-left" v-loading="leftLoading">
        <el-form class="add-rate-content" :model="editForm" :rules="editFormRules" ref="editForm" label-width="120px">
          <el-form-item label="重构事务" prop="name">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="选择域" prop="group">
            <el-radio-group v-model="editForm.group" @change="handlerGroupChange">
              <el-radio-button label="NFVO"></el-radio-button>
              <el-radio-button label="VNF-LCM"></el-radio-button>
              <el-radio-button label="Access"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="关联微服务" prop="microserviceInfo">
            <el-select class="select" v-model="editForm.microserviceInfo" multiple placeholder="关联微服务" style="width: 100%;">
              <el-option v-for="(item, index) in msList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="责任人" prop="owner">
            <template v-if="editForm.owner.id">
              <el-avatar size="small" :src="editForm.owner.avatar || defaultAvatar"></el-avatar>
              <el-button type="primary" icon="el-icon-edit" circle @click="openSelectDialog('owner')"></el-button>
            </template>
            <template v-else>
              <el-button type="primary" icon="el-icon-plus" circle @click="openSelectDialog('owner')"></el-button>
            </template>

          </el-form-item>
          <el-form-item label="参与者">
            <el-button type="primary" icon="el-icon-plus" circle></el-button>
          </el-form-item>
          <el-form-item label="预计起止时间" prop="time">
            <el-date-picker v-model="editForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              value-format="yyyy-MM-dd"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预估工作量" prop="storyCode">
            <el-input-number v-model="editForm.storyCode" :precision="1" :min="1" :max="10000"></el-input-number> <span>k</span>
          </el-form-item>
          <el-form-item label="消减代码量" prop="reduceCode">
            <el-input-number v-model="editForm.reduceCode" :precision="1" :min="1" :max="10000"></el-input-number> <span>k</span>
          </el-form-item>
          <el-form-item label="说明" prop="storyDesp">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="editForm.storyDesp"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="detail-right" v-loading="rightLoading">
        <div class="detail-right-title">
          <span>{{!xuqiuInfo ? 'CoreALM需求编号' : 'CoreALM信息'}}</span>
          <span v-if="xuqiuInfo" class="desc-text margin-left cursor-pointer" @click="handleResetXuqiu">重填</span>
        </div>
        <div class="search-box" v-if="!xuqiuInfo">
          <div class="form">
            <el-input :rows="5" placeholder="请输入内容" v-model="searchValue"></el-input>
            <el-button class="margin-left" @click="handleSearch">确定</el-button>
          </div>
          <p class="desc-text">移入正式需求时，与CoreALM关联。</p>
        </div>
        <div class="info" v-else>
          <div class="line">
            <div class="label">需求编号</div>
            <div class="value color-primary">{{xuqiuInfo.number}}</div>
          </div>
          <div class="line">
            <div class="label">主导域</div>
            <div class="value">{{xuqiuInfo.yu}}</div>
          </div>
          <div class="line">
            <div class="label">SE预估工作量</div>
            <div class="value">
              <div class="value-a">{{xuqiuInfo.se.tian}}</div>
              <div class="value-b">人天</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{xuqiuInfo.se.yue}}</div>
              <div class="value-b">人月</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{xuqiuInfo.se.line}}</div>
              <div class="value-b">千行</div>
            </div>
          </div>
          <div class="line">
            <div class="label">市场预估工作量</div>
            <div class="value">
              <div class="value-a">{{xuqiuInfo.shichang.tian}}</div>
              <div class="value-b">人天</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <div class="value-a">{{xuqiuInfo.shichang.yue}}</div>
              <div class="value-b">人月</div>
            </div>
          </div>
          <div class="line">
            <div class="label"></div>
            <div class="value">
              <span class="value-a">{{xuqiuInfo.shichang.line}}</span>
              <span>千行</span>
            </div>
          </div>
          <div class="line">
            <div class="label">主导负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="xuqiuInfo.zhudao.avatar"></el-avatar>
              <span class="value-a">{{xuqiuInfo.zhudao.name}}</span>
              <span>{{xuqiuInfo.zhudao.id}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">测试负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="xuqiuInfo.ceshi.avatar"></el-avatar>
              <span class="value-a">{{xuqiuInfo.ceshi.name}}</span>
              <span>{{xuqiuInfo.ceshi.id}}</span>
            </div>
          </div>
          <div class="line">
            <div class="label">验证负责人</div>
            <div class="value">
              <el-avatar size="small" class="margin-right" :src="xuqiuInfo.yanzheng.avatar"></el-avatar>
              <span class="value-a">{{xuqiuInfo.yanzheng.name}}</span>
              <span>{{xuqiuInfo.yanzheng.id}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="" slot="footer">
        <el-button type="primary" size="medium" @click="handleStart">立即开始</el-button>
        <el-button type="primary" size="medium" @click="submitEditForm">存入需求池</el-button>
      </div>
    </el-dialog>

    <!-- 选择用户弹框 -->
    <el-dialog class="search-user-dialog" :title="selectUserType === 'owner' ? '选择负责人' : '选择参与者'" :visible="selectUserDialogVisible" width="500px">
      <div class="search-user">
        <el-input class="input" v-model="selectUserForm.name" placeholder="搜索">
          <el-button slot="append" icon="el-icon-search" @click="selectUserHandler"></el-button>
        </el-input>
      </div>
      <div class="search-list">
        <div class="item" v-for="item in selectUserList" :key="item.id" @click="handleSelectUser(item)">
          <el-avatar size="small" :src="item.avatar || defaultAvatar"></el-avatar>
          <span class="zn">{{item.nameZn}}</span>
          <span class="en">({{item.nameEn}})</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/avatar.png'
import './AddDialog.scss'
// import { addStar, addRate } from 'api/chonggou'
import {getMsListByGroupId, getUserList} from 'api/chonggou'

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

      leftLoading: false,
      rightLoading: false,
      defaultAvatar: defaultAvatar,

      editForm: {
        name: '',
        group: '',
        microserviceInfo: [],
        storyCode: 1,
        time: null,
        owner: {},
        party: [],
        storyDesp: '',
        reduceCode: '',
        coreAlmNo: '',
      },
      editFormRules: {
        name: [
          { required: true, message: '请填写事务名称', trigger: 'blur' },
        ],
        group: [
          { required: true, message: '请选择域', trigger: 'change' },
        ],
        owner: [
          { required: true, message: '请选择责任人', trigger: 'change' },
        ],
        microserviceInfo: [
          { required: true, message: '请选择关联微服务', trigger: 'change' },
        ],
        storyCode: [
          { required: true, message: '请填写工作量', trigger: 'blur' },
        ],
        reduceCode: [
          { required: false, message: '请填写消减代码量', trigger: 'blur' },
        ],
        storyDesp: [
          { required: true, message: '请填写说明', trigger: 'blur' },
        ],
        time: [
          { required: true, message: '请选择起止时间', trigger: 'blur' },
        ]
      },

      msList: [],

      searchValue: '',
      xuqiuInfo: null,

      selectUserDialogVisible: false,
      selectUserType: 'owner',
      selectUserForm: {
        name: '',
      },
      selectUserList: [],

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
  },
  methods: {
    getDetailDate () {

    },

    handleStart () {

    },
    submitEditForm () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const data = {
            name: this.editForm.name,
            group: this.editForm.group,
            microserviceInfo: this.editForm.microserviceInfo.join(','),
            storyCode: this.editForm.storyCode,
            storyDesp: this.editForm.storyDesp,
            reduceCode: this.editForm.reduceCode,
            estStartTime: this.editForm.time[0],
            estEndTime: this.editForm.time[1],
            owner: {},
            party: [],
            coreAlmNo: this.searchValue,
          }
          console.log('data', data)
          // addRate(this.editForm).then(res => {
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

    // 查询需求
    handleSearch () {
      if (this.searchValue === '') {
        this.$message.warning('请填写需求编号')
        return
      }
      this.rightLoading = true
      setTimeout(() => {
        this.rightLoading = false
      }, 1000)
      this.xuqiuInfo = {
        id: 1,
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
      }
    },
    handleResetXuqiu () {
      this.xuqiuInfo = null
    },

    handlerGroupChange () {
      this.editForm.microserviceInfo = []
      getMsListByGroupId(this.editForm.group).then(res => {
        this.msList = res
      }).catch(err => {
        this.msList = []
        console.log('err', err)
      })
    },

    // 选择用户相关
    // 搜索用户
    openSelectDialog (type) {
      this.selectUserType = type
      this.selectUserDialogVisible = true
    },
    selectUserHandler () {
      if (this.selectUserForm.name === '') {
        this.$message.warning('请输入搜索的用户')
        return
      }
      getUserList(this.selectUserForm.name).then(res => {
        this.selectUserList = res
      }).catch(err => {
        this.selectUserList = []
        console.log('err', err)
      })
    },
    // 点击用户执行选择
    handleSelectUser(item) {
      if (this.selectUserType === 'owner') {
        this.editForm.owner = {
          id: item.id,
          name: item.nameZn,
          avatar: item.avatar
        }
      } else {
        if (!this.editForm.party.find(x => x.id === item.id)) {
          this.editForm.party.push({
            id: item.id,
            name: item.nameZn,
            avatar: item.avatar
          })
        }
      }
      this.selectUserDialogVisible = false
    }
  },
}
</script>

<style lang="scss">
</style>
