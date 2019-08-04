export default {
  data () {
    return {
      // 分页
      pagination: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 显示多少条
        total: 0, // 总条数
        pageSizes: [10, 20, 30, 40, 50],
      },
      tableLoading: false,
    }
  },
  methods: {
    // 列表
    getList () {},
    // 分页显示个数
    sizeChange (val) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = val
      setTimeout(() => {
        this.getList(1)
      }, 10)
    },
    // 分页当前页
    currentChange (val) {
      this.pagination.currentPage = val
      setTimeout(() => {
        this.getList(this.pagination.currentPage)
      }, 10)
    }
  },
}
