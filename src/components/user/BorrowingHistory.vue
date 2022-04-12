<template>
  <div>
    <template>
      <a-table
        :data-source="historyList"
        :rowKey="(record) => record.borrowing_id"
        :loading ="loading"
      >
        <a-table-column title="book_name" data-index="book_name" />
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
      loading: true,
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    async getHistory() {
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "GET", headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/user/borrowing/history",
        myInit
      );

      let tmpHistory;

      await fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          tmpHistory = data.borrowing_history;
        })
        .catch((err) => console.log("Request Failed", err));

      // 获得每本书的详细信息，并赋值给book_name

      for (let i = 0; i < tmpHistory.length; i++) {
        // 获得图书详情
        var myInit2 = { method: "GET" };
        var myUrl2 =
          "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/book/detail?ISBN=" +
          tmpHistory.ISBN;
        var myRequest2 = new Request(myUrl2, myInit2);

        await fetch(myRequest2)
          .then((response) => response.json())
          .then(function (data) {
            tmpHistory[i].book_name = data.book_info.book_name;
          });
      }

      this.historyList = tmpHistory;
      this.loading=false;


    },
    routeToDetail(borrowing_id) {
      this.$router.push({
        path: "/user/borrowing/" + borrowing_id + "/detail",
        params: { id: borrowing_id },
      });
    },
  },
};
</script>

<style></style>
