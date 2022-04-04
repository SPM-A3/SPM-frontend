<template>
  <div>
    <template>
      <a-table
        :data-source="historyList"
        :rowKey="(record) => record.borrowing_id"
      >
        <a-table-column title="borrowing_id" data-index="borrowing_id" />
        <a-table-column title="ISBN" data-index="ISBN" />
        <a-table-column title="borrow_time" data-index="borrow_time" />
        <a-table-column title="due_time" data-index="due_time">
        </a-table-column>
        <a-table-column title="return_time" data-index="return_time">
        </a-table-column>
        <a-table-column title="fine" data-index="fine"> </a-table-column>
        <a-table-column title="Action">
          <template slot-scope="text, record">
            <!-- 详情按钮 -->
            <a-tooltip
              class="item"
              effect="dark"
              size="small"
              content="借阅详情"
              placement="top"
            >
              <a-button
                type="primary"
                icon="el-icon-edit"
                @click="routeToDetail(record.borrowing_id)"
              >
                借阅详情
              </a-button>
            </a-tooltip>
          </template>
        </a-table-column>
      </a-table>
    </template>

  </div>
</template>

<script>
export default {
  data() {
    return {
      access_token: "",
      historyList: [],
      borrowingDetail: [],
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    getHistory() {
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "GET", headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/user/borrowing/history",
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          that.historyList = data.borrowing_history;
          console.log(data);
        })
        .catch((err) => console.log("Request Failed", err));
    },
    routeToDetail(borrowing_id){
      this.$router.push({path: '/user/borrowing/'+borrowing_id+'/detail', params: {id: borrowing_id}})
    },
  },
};
</script>

<style></style>
