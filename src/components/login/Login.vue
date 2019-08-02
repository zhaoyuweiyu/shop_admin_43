<template>
  <el-row
    type='flex'
    justify='center'
    align='middle'
  >
    <el-col :span=8>
      <el-form
        :model="LoginForm"
        :rules="rules"
        ref="LoginForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="LoginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="LoginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            @click='startLogin'
          >登录</el-button>
          <el-button @click='resetForm'>重置</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>

<script>

// import axios from 'axios'
export default {
  data () {
    return {
      LoginForm: {
        username: 'admin',
        password: '123456',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin () {
      this.$refs.LoginForm.validate(async (valid) => {
        if (!valid) {
          return false
        }

        let res = await this.$axios.post('http://localhost:8888/api/private/v1/login', this.LoginForm)

        if (res.data.meta.status === 200) {
          // console.log('登陆成功')
          // 保存token
          localStorage.setItem('token', res.data.data.token)

          this.$message({
            message: '恭喜你,登陆成功',
            type: 'success',
            duration: 800
          })
          this.$router.push('/home')
        } else {
          // console.log('登陆失败')
          this.$message({
            message: '登陆失败',
            type: 'error',
            duration: 800
          })
        }
        // console.log('开始登录了')
        // this.$axios.post('http://localhost:8888/api/private/v1/login', this.LoginForm).then(res => {
        //   console.log(res)
        //   if (res.data.meta.status === 200) {
        //     // console.log('登陆成功')
        //     // 保存token
        //     localStorage.setItem('token', res.data.data.token)

        //     this.$message({
        //       message: '恭喜你,登陆成功',
        //       type: 'success',
        //       duration: 800
        //     })
        //     this.$router.push('/home')
        //   } else {
        //     // console.log('登陆失败')
        //     this.$message({
        //       message: '登陆失败',
        //       type: 'error',
        //       duration: 800
        //     })
        //   }
        // })
      })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    resetForm () {
      this.$refs.LoginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434a;
}

.el-form {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 20px;
}
</style>
