<template>
  <div style="margin: 40px; white-space:nowrap;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item label="Company Name (CN)" prop="companyNameCN">
        <el-col :span="8">
          <el-input v-model="ruleForm.companyNameCN" placeholder="Please enter the Chinese name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Company Name (EN)" prop="companyNameEN">
        <el-col :span="8">
          <el-input v-model="ruleForm.companyNameEN" placeholder="Please enter the English name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Brief Introduction" prop="intro" style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="ruleForm.intro" :height="400" />
      </el-form-item>

      <el-form-item label="GMC Report Type" prop="type">
        <el-col :span="8">
          <el-input v-model="ruleForm.type" placeholder="Please enter the type"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="GRC Report URL" prop="url">
        <el-col :span="8">
          <el-input v-model="ruleForm.url" placeholder="Please enter the URL"></el-input>
        </el-col>
      </el-form-item>

      <!-- 其他形式 -->
<!--      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
        <el-button type="info" @click="cancel('ruleForm')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  export default {
    components: { Tinymce },
    data() {
      return {
        ruleForm: {
          companyNameCN: '',
          companyNameEN: '',
          intro:'',
          type:'',
          url:'',
          // region: '',
          // date1: '',
          // date2: '',
          // delivery: false,
          // type: [],
          // resource: '',
          // desc: ''
        },
        rules: {
          companyNameCN: [{
            required: true,
            message: 'Please enter the Chinese name',
            trigger: 'blur'
          }],
          companyNameEN: [{
            required: true,
            message: 'Please enter the English name',
            trigger: 'blur'
          }],
          intro: [{
            required: true,
            message: 'Please enter the Introduction',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: 'Please enter the GMC Report Type',
            trigger: 'blur'
          }],
          url: [{
            required: true,
            message: 'Please enter the GMC Report URL',
            trigger: 'blur'
          }]
          // name: [{
          //     required: true,
          //     message: '请输入活动名称',
          //     trigger: 'blur'
          //   },
          //   {
          //     min: 3,
          //     max: 5,
          //     message: '长度在 3 到 5 个字符',
          //     trigger: 'blur'
          //   }
          // ],
          // region: [{
          //   required: true,
          //   message: '请选择活动区域',
          //   trigger: 'change'
          // }],
          // date1: [{
          //   type: 'date',
          //   required: true,
          //   message: '请选择日期',
          //   trigger: 'change'
          // }],
          // date2: [{
          //   type: 'date',
          //   required: true,
          //   message: '请选择时间',
          //   trigger: 'change'
          // }],
          // type: [{
          //   type: 'array',
          //   required: true,
          //   message: '请至少选择一个活动性质',
          //   trigger: 'change'
          // }],
          // resource: [{
          //   required: true,
          //   message: '请选择活动资源',
          //   trigger: 'change'
          // }],
          // desc: [{
          //   required: true,
          //   message: '请填写活动形式',
          //   trigger: 'blur'
          // }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancel(formName) {
        this.$router.push({
          path: '/mvo/myInfo'
        });
      }
    }
  }
</script>
