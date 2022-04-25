<template>
  <div>
    <template>
      <a-table
        :data-source="fineList"
        :rowKey="(record) => record.fine_id"
        :loading="loading"
      >
        <a-table-column title="book name" data-index="book_name" />
        <a-table-column title="ISBN" data-index="ISBN" />
        <a-table-column title="status" data-index="status" />
        <a-table-column title="amount" data-index="amount">
        </a-table-column>
        <a-table-column title="payment time" data-index="payment_time"> </a-table-column>
      </a-table>
    </template>
  </div>
</template>

<script>
import { getAccessToken, getUserInfo } from "../../services/user";
export default {
  data() {
    return {
      access_token: "",
      fineList: [],
      loading: true,
      getOrderUrl: "https://1893791694056142.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/web-framework/express-app/getorder"
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    getHistory() {
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json");
      var myInit = { method: "GET", headers: myHeaders };
      var myRequest = new Request(
        `${this.getOrderUrl}?user_id=${getUserInfo().user_id}`,
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          const orders = data;
          console.log(data)
          const fineList = JSON.parse(data.list);
          that.fineList = fineList;
          that.loading = false;
        })
        .catch((err) => {console.log("Request Failed", err);that.loading=false;});
      
      
    },
  },
};
</script>

<style></style>
