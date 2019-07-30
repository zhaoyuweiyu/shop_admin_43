import axios from 'axios'
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
      input3: ''
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // 加载用户数据列表
    getUsersData (pagenum = 1, query = '') {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query,
            pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          // console.log(res)
          // 保存用户列表数据
          this.usersData = res.data.data.users
          // 保存总个数
          this.total = res.data.data.total
          // 保存当前页
          this.pagenum = res.data.data.pagenum
        })
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
    }
  }
}
