<template>
  <div>
    <template>
      <a-table
        :dataSource="reservationList"
        :rowKey="(record) => record.reservation_id"
        :loading="loading"
      >
        <a-table-column title="book name" data-index="book_name" />
        <a-table-column title="ISBN" data-index="ISBN" />
        <a-table-column
          title="reservation time"
          data-index="reservation_time"
        />
        <a-table-column title="status" data-index="status">
          <template slot-scope="text, record">
            <a-tag v-if="record.status == 0" color="green">ON GOING</a-tag>
            <a-tag v-else-if="record.status == 1" color="red">CANCELLED</a-tag>
          </template>
        </a-table-column>
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
              >reservation detail</a-button>
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
      user_id: this.$route.params.id,
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
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", getAccessToken());

      var myInit = { method: "GET", headers: myHeaders };
      console.log(this.user_id);
      var myRequest = new Request(
        this.$global.BASE_URL + "/api/admin/user/reservation?user_id=" + this.user_id,
        myInit
      );

      let tmpReservation;

      await fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log("reservation",data)
          tmpReservation = data.data;
        })
        .catch((err) => console.log("Request Failed", err));

      // 获得每本书的详细信息，并赋值给book_name

      for (let i = 0; i < tmpReservation.length; i++) {
        // // 将status转换为文字
        // if (tmpReservation[i].status===1){
        //   tmpReservation[i].status="Cancelled"
        // }else if(tmpReservation[i].status===0){
        //   tmpReservation[i].status="In progress"
        // }else{
        //   tmpReservation[i].status="Finished"
        // }

        // 转换时间格式
        tmpReservation[i].reservation_time = tmpReservation[i].reservation_time.substring(0,10);

        // 获得图书详情
        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        myHeaders2.append("token", getAccessToken());

        var myInit2 = { method: "GET" , headers: myHeaders2};
        var myUrl2 =
          this.$global.BASE_URL+"/api/admin/book/detail?ISBN=" +
          tmpReservation[i].ISBN;
        var myRequest2 = new Request(myUrl2, myInit2);

        await fetch(myRequest2)
          .then((response) => response.json())
          .then(function (data) {
            tmpReservation[i].book_name = data.data[0].bookName;
          });
      }

      that.reservationList = tmpReservation;
      console.log("reservationList",this.reservationList)
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
