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
      dialogAssignRightsVisible: false,
      // 树数据
      rightsData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      // 配置
      // children: 负责结构
      // label 负责标题
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 角色id
      roleId: 0
    }
  },
  created () {
    this.loadRolesData()
    this.loadRightsData()
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
    },
    // 加载所有的权限信息
    async loadRightsData () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res)
      this.rightsData = res.data.data
    },
    // 展示分配权限对话框
    showAssignRightsDialog (row) {
      // 从row拿角色id 保存到data
      this.roleId = row.id

      this.dialogAssignRightsVisible = true
      // console.log(row)

      // 根据传递过来的row获取第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })

      console.log(keys)
      // DOM更新完毕了自动走回调 有延时
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 分配权限
    async assignRights () {
      // 获取全选+半选的id
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()

      let keys = [...keys1, ...keys2]

      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.dialogAssignRightsVisible = false

        this.$message({
          message: '分配权限成功',
          type: 'success',
          duration: 800
        })

        this.loadRolesData()
      }
    }
  }
}
