<template>
  <div>
    <a-table
      :data-source="borrowingList"
      :rowKey="(record) => record.borrowing_id"
      :loading="loading"
    >
      <a-table-column title="book name" data-index="book_name" />
      <a-table-column title="borrowing id" data-index="borrowing_id" />
      <a-table-column title="ISBN" data-index="ISBN" />
      <a-table-column title="borrow date" data-index="borrow_date" />
      <a-table-column title="due date" data-index="due_date"> </a-table-column>
      <a-table-column title="Action">
        <template slot-scope="text, record">
          <a-button
            type="primary"
            icon="el-icon-edit"
            @click="routeToDetail(record.borrowing_id)"
          >detail</a-button>

          <!-- 归还按钮 -->
          <a-popconfirm
            title="Title"
            @confirm="returnBook(record.borrowing_id)"
            @cancel="cancel"
          >
            <a-button type="primary" :style="{ marginLeft: '8px' }" icon="el-icon-edit">return</a-button>
          </a-popconfirm>

          <a-popconfirm
            title="Title"
            @confirm="renewBook(record.borrowing_id)"
            @cancel="cancel"
          >
            <a-button type="primary" :style="{ marginLeft: '8px' }" icon="el-icon-edit">renew</a-button>
          </a-popconfirm>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
import { getAccessToken } from "../../services/user";
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
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", getAccessToken());

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      let tmpBorrowing;

      await fetch(this.$global.BASE_URL + "/api/user/borrowing", requestOptions)
        .then((response) => response.json())
        .then(function (data) {
          console.log("token", getAccessToken());
          console.log("data", data.data);
          tmpBorrowing = data.data;
        })
        .catch((err) => console.log("Request Failed", err));

      for (let i = 0; i < tmpBorrowing.length; i++) {
        // 获得图书详情
        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        myHeaders2.append("token", getAccessToken());

        let requestOptions2 = {
          method: "GET",
          headers: myHeaders2,
        };

        var myUrl2 =
          this.$global.BASE_URL +
          "/api/admin/book/detail?ISBN=" +
          tmpBorrowing[i].ISBN;

        await fetch(myUrl2, requestOptions2)
          .then((response) => response.json())
          .then(function (data) {
            console.log("book detail", data);
            tmpBorrowing[i].book_name = data.data[0].bookName;
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
      let that = this;
      console.log(borrowing_id);

      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json");

      var myBody = {
        borrowing_id: borrowing_id,
      };

      var myInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(myBody),
      };

      var myUrl = this.$global.BASE_URL + "/api/borrowing/return";

      var myRequest = new Request(myUrl, myInit);

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log("return", data);
          if (data.code === 0) {
            that.$message.success("return successfully!");
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch((err) => console.log("Request Failed", err));
    },
    cancel() {
      this.$message.error("Click on No");
    },
    // 续借图书
    renewBook(borrowing_id) {
      let that=this
      console.log(borrowing_id);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", getAccessToken());

      var myBody = {
        borrowing_id: borrowing_id,
      };

      var myInit = {
        method: "POST",
        body: JSON.stringify(myBody),
        headers: myHeaders,
      };

      var myRequest = new Request(
        this.$global.BASE_URL + "/api/borrowing/renew",
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          if (data.code === 0) {
            that.$message.success("renew successfully!");
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch((err) => console.log("Request Failed", err));
    },
  },
};
</script>
