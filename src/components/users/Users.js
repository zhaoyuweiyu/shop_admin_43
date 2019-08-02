// import axios from 'axios'
export default {
  data () {
    return {
      usersData: [
        {
          username: '乔妮马',
          email: 'qiaoni@.com',
          mobile: '1233211234567'
        }
      ],
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      // 输入框绑定的数据
      input3: '',
      // 是否显示添加用户对话框
      dialogAddUserVisible: false,
      // 添加用户表单对象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单校验规则
      rules: {
        // 用户名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度应该在3-6之间', trigger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度应该在5-10之间', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          {
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        // 手机
        mobile: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 开关状态
      value1: true,
      // 是否显示编辑用户的对话框
      dialogEditUserVisible: false,
      // 编辑用户表单对象
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      }
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // 加载用户数据列表
    async getUsersData (pagenum = 1, query = '') {
      let config = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      let res = await this.$axios.get('users', config)
      console.log(res)
      // 保存用户列表数据
      this.usersData = res.data.data.users
      // 保存总个数
      this.total = res.data.data.total
      // 保存当前页
      this.pagenum = res.data.data.pagenum

      // this.$axios
      //   .get('users', {
      //     params: {
      //       query,
      //       pagenum,
      //       pagesize: 2
      //     }
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     // console.log(res)
      //     // 保存用户列表数据
      //     this.usersData = res.data.data.users
      //     // 保存总个数
      //     this.total = res.data.data.total
      //     // 保存当前页
      //     this.pagenum = res.data.data.pagenum
      //   })
    },
    // 点击分页
    currentPageChange (curPage) {
      // console.log('点击了', curPage)
      // 不能只传页码 还要传input3里面的值
      this.getUsersData(curPage, this.input3)
    },
    // 搜索
    startSearch () {
      console.log(this.input3)
      // 请求数据
      this.getUsersData(1, this.input3)
    },
    // 显示对话框
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)
      if (res.data.meta.status === 201) {
        // 隐藏框
        this.dialogAddUserVisible = false
        // 提示
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 800
        })
        // 刷新一下
        this.getUsersData()
      }
      // this.$axios
      //   .post('users', this.addUserForm, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     console.log(res)
      //     if (res.data.meta.status === 201) {
      //       // 隐藏框
      //       this.dialogAddUserVisible = false
      //       // 提示
      //       this.$message({
      //         message: '添加成功',
      //         type: 'success',
      //         duration: 800
      //       })
      //       // 刷新一下
      //       this.getUsersData()
      //     }
      //   })
    },
    // 对话框关闭监听
    dialogClosed () {
      this.$refs.addUserRef.resetFields()
    },
    // 删除用户
    async delUser (id) {
      let res = await this.$axios.delete(`users/${id}`)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '删除用户成功',
          type: 'success',
          duration: 800
        })
        // 刷新一下
        this.getUsersData()
      }
      // this.$axios
      //   .delete(`users/${id}`, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     // console.log(res)
      //     if (res.data.meta.status === 200) {
      //       this.$message({
      //         message: '删除用户成功',
      //         type: 'success',
      //         duration: 800
      //       })
      //       // 刷新一下
      //       this.getUsersData()
      //     }
      //   })
    },
    // 状态改变
    async stateChange (row) {
      const { id, mg_state: mgState } = row
      let res = await this.$axios.put(`users/${id}/state/${mgState}`)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '状态修改成功',
          type: 'success',
          duration: 800
        })
      }
      // this.$axios
      //   .put(`users/${id}/state/${mgState}`, null, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     // console.log(res)
      //     if (res.data.meta.status === 200) {
      //       this.$message({
      //         message: '状态修改成功',
      //         type: 'success',
      //         duration: 800
      //       })
      //     }
      //   })
    },
    // 展示编辑用户对话框
    showEditUserDialog (row) {
      this.dialogEditUserVisible = true

      // console.log(row) 接受到了当前对象的row
      const { username, email, mobile, id } = row
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id
    },
    // 编辑用户
    editUser () {
      const { email, mobile, id } = this.editUserForm
      this.$axios
        .put(`users/${id}`, {
          email,
          mobile
        })
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.dialogEditUserVisible = false

            this.$message({
              message: '编辑成功',
              type: 'success',
              duration: 800
            })

            this.getUsersData(this.pagenum, this.input3)
          }
        })
    }
  }
}
