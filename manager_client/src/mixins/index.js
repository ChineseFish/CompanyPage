export default {
  data() {
    return {
      // 分页
      pagination: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 显示多少条
        total: 0
      },
      tableLoading: false,
    }
  },
  watch: {
    'pagination.currentPage': function () {
      setTimeout(() => {
        this.getList(this.pagination.currentPage)
      }, 10)
    },
    'pagination.pageSize': function () {
      setTimeout(() => {
        this.getList(this.pagination.currentPage)
      }, 10)
    },
  },
  methods: {
    // 列表
    getList() { },
    // 分页显示个数
    sizeChange(val) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = val
    },
    // 分页当前页
    currentChange(val) {
      this.pagination.currentPage = val
    },

    nextPage() {
      this.pagination.currentPage += 1;
    },

    prePage() {
      this.pagination.currentPage -= 1;
    }
  },
}
