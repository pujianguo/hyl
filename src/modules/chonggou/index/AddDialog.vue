<template>
  <!-- <el-dialog class="chonggou-index-detail" visible.sync="visible"> -->
  <div>
    <el-dialog class="chonggou-index-add" title="新建需求" :visible="false">
      <div class="detail-left" v-loading="leftLoading">
        <el-form class="add-rate-content" :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px">
          <el-form-item label="重构事务" prop="a">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="editForm.a"></el-input>
            <!-- <el-select v-model="editForm.a" placeholder="请选择a" class="margin-right">
              <el-option label="L1" value="l1"></el-option>
              <el-option label="L2" value="l2"></el-option>
            </el-select>
            <el-select v-model="editForm.b" placeholder="请选择b">
              <el-option label="简洁" value="l1"></el-option>
              <el-option label="简洁2" value="l2"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="选择域" prop="b">
            <el-radio-group v-model="editForm.b">
              <el-radio-button label="NFVO"></el-radio-button>
              <el-radio-button label="VNF-LCM"></el-radio-button>
              <el-radio-button label="Access"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="预计起止时间" prop="time">
            <el-date-picker v-model="editForm.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预估工作量" prop="line">
            <el-input-number v-model="editForm.line" :precision="1" :min="1" :max="10000"></el-input-number> <span>k</span>
          </el-form-item>
          <el-form-item label="说明" prop="shuoming">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="editForm.shuoming"></el-input>
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
  </div>
</template>

<script>
import defaultAvatar from '@/assets/avatar.png'
import './AddDialog.scss'
// import { addStar, addRate } from 'api/chonggou'

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

      editForm: {
        a: '',
        b: '',
        line: 1,
        time: null,
        shuoming: '',
      },
      editFormRules: {
        a: [
          { required: true, message: '请选择a', trigger: 'blur' },
        ],
        b: [
          { required: true, message: '请选择b', trigger: 'change' },
        ],
        line: [
          { required: true, message: '请填写工作量', trigger: 'blur' },
        ],
        shuoming: [
          { required: true, message: '请填写说明', trigger: 'blur' },
        ],
      },

      searchValue: '',
      xuqiuInfo: null,
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
    this.handleSearch()
  },
  methods: {
    handleStart () {

    },
    submitEditForm () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          console.log('data', this.editForm)
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
  },
}
</script>

<style lang="scss">
</style>
