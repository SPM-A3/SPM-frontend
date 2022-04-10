<template>
  <div>
    <template>
      <a-table
        :data-source="historyList"
        :rowKey="(record) => record.borrowing_id"
        :loading ="loading"
      >
        <a-table-column title="book name" data-index="book_name" />
        <a-table-column title="borrowing id" data-index="borrowing_id" />
        <a-table-column title="ISBN" data-index="ISBN" />
        <a-table-column title="borrow time" data-index="borrow_time" />
        <a-table-column title="due time" data-index="due_time">
        </a-table-column>
        
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
              >borrowing detail</a-button>
            </a-tooltip>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </div>
</template>

<script>
import { getAccessToken } from "../../services/user";
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
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json")

      var myInit = { method: "GET", headers: myHeaders };

      var myRequest = new Request(
        this.$global.BASE_URL+"/api/user/borrowing/history",
        myInit
      );

      let tmpHistory;

      await fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log("history",data)
          tmpHistory = data.data;
        })
        .catch((err) => console.log("Request Failed", err));

      // 获得每本书的详细信息，并赋值给book_name

      for (let i = 0; i < tmpHistory.length; i++) {
        // 获得图书详情
        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        myHeaders2.append("token", getAccessToken());

        let requestOptions2 = {
          method: "GET",
          headers: myHeaders2,
        };

        var myUrl2 =
          this.$global.BASE_URL+"/api/admin/book/detail?ISBN=" +
          tmpHistory[i].ISBN;


        await fetch(myUrl2, requestOptions2)
          .then((response) => response.json())
          .then(function (data) {
            console.log("book_detail",data)
            tmpHistory[i].book_name = data.data[0].bookName;
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
