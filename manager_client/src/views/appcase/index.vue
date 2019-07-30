<template>
  <div>
    <el-button type="primary" @click="newly">新增案例</el-button>
    <avue-crud
      :table-loading="tableLoading"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page="pagination"
      :data="mainTableData"
      :option="mainTableOption"
    >
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <gov-button type="text" @click="handleUpdate(scope.row)" text="修改"></gov-button>
          <gov-button type="text" @click="handleDelete(scope.row)" text="删除"></gov-button>
        </div>
      </template>
    </avue-crud>
    
  </div>
</template>

<script>
import mixins from '../../mixins/index.js'
import { mainTableOption } from './const/index'

export default {
  name: 'appCase',
  mixins: [mixins],
  data () {
    return {
      mainTableData: [],
      pagination: {
        total: 0,
      }
    }
  },
  computed: {
    mainTableOption () {
      return mainTableOption
    },
  },
  methods: {
    getList () {
      this.tableLoading = true

    },

    sizeChange()
    {

    },

    currentChange()
    {

    }
  },
  created () {
    this.getList()
  },
}
</script>
