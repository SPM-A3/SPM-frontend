<template>
  <div>
    <template>
      <a-table
        :dataSource="reservationList"
        :rowKey="(record) => record.reservation_id"
        :loading="loading"
      >
        <a-table-column title="book_name" data-index="book_name" />
        <a-table-column title="reservation_id" data-index="reservation_id" />
        <a-table-column title="ISBN" data-index="ISBN" />
        <a-table-column
          title="reservation_time"
          data-index="reservation_time"
        />
        <a-table-column title="status" data-index="status" />
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
                @click="routeToDetail(record.reservation_id)"
              >
                详情
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
      reservationList: [],
      loading: true,
    };
  },
  created() {
    this.getReservation();
  },
  methods: {
    async getReservation() {
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "GET", headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/reservation",
        myInit
      );

      let tmpReservation;

      await fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          tmpReservation = data.reservation;
        })
        .catch((err) => console.log("Request Failed", err));

      // 获得每本书的详细信息，并赋值给book_name

      for (let i = 0; i < tmpReservation.length; i++) {
        // 获得图书详情
        var myInit2 = { method: "GET" };
        var myUrl2 =
          "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/book/detail?ISBN=" +
          tmpReservation[i].ISBN;
        var myRequest2 = new Request(myUrl2, myInit2);

        await fetch(myRequest2)
          .then((response) => response.json())
          .then(function (data) {
            tmpReservation[i].book_name = data.book_info.book_name;
          });
      }

      that.reservationList = tmpReservation;
      this.loading = false;
    },
    routeToDetail(reservation_id) {
      this.$router.push({
        path: "/user/reservation/" + reservation_id,
        params: { id: reservation_id },
      });
    },
  },
};
</script>

<style></style>
