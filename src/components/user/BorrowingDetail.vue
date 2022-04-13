<template>
  <div>
    <template>
      <a-card hoverable style="width: 240px">
        <template #cover>
          <img :src="bookInfo.cover" />
        </template>
      </a-card>
    </template>

    <template>
      <a-descriptions title="Borrowing Info" size="default" bordered>
        <a-descriptions-item label="book name ">{{
          this.bookInfo.bookName
        }}</a-descriptions-item>
        <a-descriptions-item label="borrowing id">{{
          borrowingDetail.borrowing_id
        }}</a-descriptions-item>

        <a-descriptions-item label="ISBN">{{
          borrowingDetail.ISBN
        }}</a-descriptions-item>

        <a-descriptions-item label="status">{{
          borrowingDetail.status
        }}</a-descriptions-item>

        <a-descriptions-item label="borrow time">{{
          borrowingDetail.borrow_time
        }}</a-descriptions-item>

        <a-descriptions-item label="due time">{{
          borrowingDetail.due_time
        }}</a-descriptions-item>
        <a-descriptions-item label="return time">{{
          borrowingDetail.return_time
        }}</a-descriptions-item>
        <a-descriptions-item label="fine">{{
          borrowingDetail.fine
        }}</a-descriptions-item>
      </a-descriptions>
    </template>

    <a-tooltip
      class="item"
      effect="dark"
      size="small"
      content="详情"
      placement="top"
      v-if="borrowingDetail.status === 0"
    >
      <a-popconfirm title="Title" @confirm="returnBook()" @cancel="cancel">
        <a-button type="primary" :style="{ top:'8px',marginLeft: '8px' }" icon="el-icon-edit">return</a-button>
      </a-popconfirm>
      <a-popconfirm title="Title" @confirm="renewBook()" @cancel="cancel">
        <a-button type="primary" :style="{ top:'8px',marginLeft: '8px' }" icon="el-icon-edit">renew</a-button>
      </a-popconfirm>
    </a-tooltip>
  </div>
</template>

<script>
import { getAccessToken } from "../../services/user";
import moment from 'moment'
export default {
  data() {
    return {
      borrowingDetail: [],
      book_cover: "null",
      book_name: "null",
      bookInfo: [],
    };
  },
  created() {
    this.getBorrowingDetail(this.$route.params.id);
  },
  methods: {
    async getBorrowingDetail(borrowing_id) {
      // 获得借书详情
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json");

      var myInit = { method: "GET", headers: myHeaders };

      var myUrl =
        this.$global.BASE_URL +
        "/api/user/borrowing/detail?borrowing_id=" +
        borrowing_id;

      var myRequest = new Request(myUrl, myInit);

      await fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log("borrowing_detail", data);
          that.borrowingDetail = data.data;
          that.borrowingDetail.borrow_time = moment(that.borrowingDetail.borrow_time).format("dddd, MMMM Do YYYY")
          that.borrowingDetail.due_time = moment(that.borrowingDetail.dues_time).format("dddd, MMMM Do YYYY")
        })
        .catch((err) => console.log("Request Failed", err));
      console.log(this.borrowingDetail);

      // 获得图书详情
      var myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/json");
      myHeaders2.append("token", getAccessToken());

      var myInit2 = { method: "GET", headers: myHeaders2 };
      var myUrl2 =
        this.$global.BASE_URL +
        "/api/admin/book/detail?ISBN=" +
        this.borrowingDetail.ISBN;
      var myRequest2 = new Request(myUrl2, myInit2);

      await fetch(myRequest2)
        .then((response) => response.json())
        .then(function (data) {
          console.log("book_detail", data);
          that.book_name = data.data[0].bookName;
          that.book_cover = data.data[0].cover;
          that.bookInfo = data.data[0];
          console.log(that.bookInfo);
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
        body: JSON.stringify({ borrowing_id }),
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
      let that = this;
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

<style></style>
