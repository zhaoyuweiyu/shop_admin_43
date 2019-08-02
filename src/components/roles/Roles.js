export default {
  data () {
    return {
      rolesData: [
        {
          roleName: '王小虎',
          roleDesc: '上海市'
        }
      ],
      // 是否分配权限对话框
      dialogAssignRightsVisible: true
    }
  },
  created () {
    this.loadRolesData()
  },
  methods: {
    // 加载数据
    async loadRolesData () {
      let res = await this.$axios.get('roles')
      // console.log(res)
      this.rolesData = res.data.data
    },
    indexMethod (index) {
      return index
    }
  }
}
