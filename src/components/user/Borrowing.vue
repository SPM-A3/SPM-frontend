<template>
  <div>
    <a-table
      :data-source="borrowingList"
      :rowKey="(record) => record.borrowing_id"
      :loading="loading"
    >
      <a-table-column title="book_name" data-index="book_name" />
      <a-table-column title="ISBN" data-index="ISBN" />
      <a-table-column title="borrow_date" data-index="borrow_date" />
      <a-table-column title="due_date" data-index="due_date"> </a-table-column>
      <a-table-column title="Action">
        <template slot-scope="text, record">
          <a-tooltip
            class="item"
            effect="dark"
            size="small"
            content="详情"
            placement="top"
          >
            <a-button
              type="primary"
              icon="el-icon-edit"
              @click="routeToDetail(record.borrowing_id)"
            >
              详情
            </a-button>
          </a-tooltip>
          <!-- 归还按钮 -->
          <a-tooltip
            class="item"
            effect="dark"
            size="small"
            content="归还"
            placement="top"
          >
            <a-button
              type="primary"
              icon="el-icon-edit"
              @click="returnBook(record.borrowing_id)"
            >
              归还
            </a-button>
          </a-tooltip>
          <a-tooltip
            class="item"
            effect="dark"
            size="small"
            content="续借"
            placement="top"
          >
            <a-button
              type="primary"
              icon="el-icon-edit"
              @click="renewBook(record.borrowing_id)"
              >续借</a-button
            >
          </a-tooltip>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      access_token: "",
      borrowingList: [],
      loading: true,
    };
  },
  created() {
    this.getBorrowing();
  },
  methods: {
    async getBorrowing() {
      var that = this;

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "GET", headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/usr/borrowing",
        myInit
      );

      let tmpBorrowing;

      await fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          tmpBorrowing = data.borrowings;
        })
        .catch((err) => console.log("Request Failed", err));

      for (let i = 0; i < tmpBorrowing.length; i++) {
        // 获得图书详情
        var myInit2 = { method: "GET" };
        var myUrl2 =
          "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/book/detail?ISBN=" +
          tmpBorrowing[i].ISBN;
        var myRequest2 = new Request(myUrl2, myInit2);

        await fetch(myRequest2)
          .then((response) => response.json())
          .then(function (data) {
            tmpBorrowing[i].book_name = data.book_info.book_name;
          });
      }

      this.borrowingList = tmpBorrowing;
      this.loading = false;
    },
    routeToDetail(borrowing_id) {
      this.$router.push({
        path: "/user/borrowing/" + borrowing_id + "/detail",
        params: { id: borrowing_id },
      });
    },
    // 归还图书
    returnBook(borrowing_id) {
      console.log(borrowing_id);

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "POST", body: borrowing_id, headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/borrowing/return",
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          if (data.error_code == 0) {
            <a-alert message="Success Text" type="success" />;
          }
        })
        .catch((err) => console.log("Request Failed", err));
    },
    // 续借图书
    renewBook(borrowing_id) {
      console.log(borrowing_id);

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "POST", body: borrowing_id, headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/borrowing/renew",
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
        })
        .catch((err) => console.log("Request Failed", err));
    },
  },
};
</script>
