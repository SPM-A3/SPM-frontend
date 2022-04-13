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
      <a-descriptions title="Reservation Info" size="default" bordered>
        <a-descriptions-item label="book name">{{
          this.bookInfo.bookName
        }}</a-descriptions-item>
        <a-descriptions-item label="reservation id">{{
          reservationDetail.reservation_id
        }}</a-descriptions-item>

        <a-descriptions-item label="ISBN">{{
          reservationDetail.ISBN
        }}</a-descriptions-item>

        <a-descriptions-item label="reservation time">{{
          reservationDetail.reservation_time
        }}</a-descriptions-item>

        <a-descriptions-item label="status">{{
          reservationDetail.status
        }}</a-descriptions-item>
      </a-descriptions>
    </template>
    <a-tooltip
      class="item"
      effect="dark"
      size="small"
      content="详情"
      placement="top"
      v-if="reservationDetail.status === 1"
    >
      <a-popconfirm
        title="Title"
        @confirm="cancelReservation()"
        @cancel="cancel"
      >
        <a-button
          type="primary"
          :style="{ top: '8px', marginLeft: '8px' }"
          icon="el-icon-edit"
        >
          cancel
        </a-button>
      </a-popconfirm>
      <a-popconfirm title="Title" @confirm="reReservation()" @cancel="cancel">
        <a-button
          type="primary"
          :style="{ top: '8px', marginLeft: '8px' }"
          icon="el-icon-edit"
        >
          reserve
        </a-button>
      </a-popconfirm>
    </a-tooltip>
  </div>
</template>

<script>
import { getAccessToken } from "../../services/user";
export default {
  data() {
    return {
      reservationDetail: [],
      book_name: "null",
      book_cover: "",
      bookInfo: [],
      isRouterAlive: true,
    };
  },
  created() {
    this.getReservationDetail(this.$route.params.id);
  },
  methods: {
    async getReservationDetail(reservation_id) {
      // 获得预约详情
      console.log(reservation_id);
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json");

      var myInit = { method: "GET", headers: myHeaders };

      var myUrl =
        this.$global.BASE_URL +
        "/api/reservation/detail?reservation_id=" +
        reservation_id;

      var myRequest = new Request(myUrl, myInit);

      await fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          that.reservationDetail = data.data;
        })
        .catch((err) => console.log("Request Failed", err));

      // 获得图书详情
      var myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/json");
      myHeaders2.append("token", getAccessToken());

      var myInit2 = { method: "GET", headers: myHeaders2 };
      var myUrl2 =
        this.$global.BASE_URL +
        "/api/admin/book/detail?ISBN=" +
        this.reservationDetail.ISBN;
      var myRequest2 = new Request(myUrl2, myInit2);

      await fetch(myRequest2)
        .then((response) => response.json())
        .then(function (data) {
          console.log("book_detail", data);
          that.book_name = data.data[0].bookName;
          that.book_cover = data.data[0].cover;
          that.bookInfo = data.data[0];
        });
    },
    // 取消预约
    cancelReservation() {
      let that = this;
      let reservation_id = this.reservationDetail.reservation_id;
      console.log(reservation_id);

      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json");

      var myInit = {
        method: "POST",
        body: JSON.stringify({ reservation_id }),
        headers: myHeaders,
      };

      var myRequest = new Request(
        `${this.$global.BASE_URL}/api/user/reservation/cancel`,
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log("cancel", data);
          if (data.code === 0) {
            that.$message.success("cancel successfully!");
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch((err) => console.log("Request Failed", err));
    },
    cancel() {
      this.$message.error("Click on No");
    },
    // 重新预约
    reReservation() {
      let that = this;
      let ISBN = this.reservationDetail.ISBN;
      console.log(ISBN);

      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json");

      var myInit = {
        method: "POST",
        body: JSON.stringify({ ISBN }),
        headers: myHeaders,
      };

      var myRequest = new Request(
        this.$global.BASE_URL + "/api/user/reservation/add",
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          if (data.code === 0) {
            that.$message.success("reserve successfully!");
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch((err) => console.log("Request Failed", err));
    },
    // 刷新数据
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style></style>
