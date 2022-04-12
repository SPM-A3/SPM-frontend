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
          bookInfo.book_name
        }}</a-descriptions-item>
        <a-descriptions-item label="reservation_id">{{
          reservationDetail.reservation_id
        }}</a-descriptions-item>

        <a-descriptions-item label="ISBN">{{
          reservationDetail.ISBN
        }}</a-descriptions-item>

        <a-descriptions-item label="reservation_time">{{
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
      content="取消预约"
      placement="top"
      v-if="reservationDetail.status === 1"
    >
      <a-button type="primary" icon="el-icon-edit" @click="cancelReservation()">
        取消预约
      </a-button>
    </a-tooltip>
    <a-tooltip
      class="item"
      effect="dark"
      size="small"
      content="重新预约"
      placement="top"
      v-if="reservationDetail.status === 0"
    >
      <a-button type="primary" icon="el-icon-edit" @click="reReservation()">
        重新预约
      </a-button>
    </a-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservationDetail: [],
      bookInfo: [],
      isRouterAlive: true,
    };
  },
  created() {
    this.getReservationDetail(this.$route.params.id);
  },
  methods: {
    getReservationDetail(reservation_id) {
      // 获得预约详情
      console.log(reservation_id);
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "GET", headers: myHeaders };

      var myUrl =
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/reservation/detail?reservation_id=" +
        reservation_id;

      var myRequest = new Request(myUrl, myInit);

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          that.reservationDetail = data;
        })
        .catch((err) => console.log("Request Failed", err));

      // 获得图书详情

      var myInit2 = { method: "GET" };
      var myUrl2 =
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/book/detail?ISBN=" +
        this.reservationDetail.ISBN;
      var myRequest2 = new Request(myUrl2, myInit2);

      fetch(myRequest2)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          that.bookInfo = data.book_info;
        });
    },
    // 取消预约
    cancelReservation() {
      let reservation_id = this.reservationDetail.reservation_id;
      console.log(reservation_id);

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "POST", body: reservation_id, headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/user/reservation/cancel",
        myInit
      );

      this.reload();

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
        })
        .catch((err) => console.log("Request Failed", err));
    },
    // 重新预约
    reReservation() {
      let ISBN = this.reservationDetail.ISBN;
      console.log(ISBN);

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "POST", body: ISBN, headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/user/reservation/add",
        myInit
      );

      this.reload();

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
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
