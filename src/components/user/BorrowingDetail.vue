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
          bookInfo.book_name
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
      <a-button type="primary" icon="el-icon-edit" @click="returnBook()">
        归还
      </a-button>
      <a-button type="primary" icon="el-icon-edit" @click="renewBook()"
        >续借</a-button
      >
    </a-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowingDetail: [],
      bookInfo: [],
    };
  },
  created() {
    this.getBorrowingDetail(this.$route.params.id);
  },
  methods: {
    getBorrowingDetail(borrowing_id) {
      // 获得借书详情
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "GET", headers: myHeaders };

      var myUrl =
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/user/borrowing/detail?borrowing_id=" +
        borrowing_id;

      var myRequest = new Request(myUrl, myInit);

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          that.borrowingDetail = data;
        })
        .catch((err) => console.log("Request Failed", err));
      console.log(this.borrowingDetail);

      // 获得图书详情

      var myInit2 = { method: "GET" };
      var myUrl2 =
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/book/detail?ISBN=" +
        this.borrowingDetail.ISBN;
      var myRequest2 = new Request(myUrl2, myInit2);

      fetch(myRequest2)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          that.bookInfo = data.book_info;
        });
    },
    // 归还图书
    returnBook() {
      let borrowing_id = this.borrowingDetail.borrowing_id;
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
        })
        .catch((err) => console.log("Request Failed", err));
    },
    // 续借图书
    renewBook() {
      let borrowing_id = this.borrowingDetail.borrowing_id;
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

<style></style>
