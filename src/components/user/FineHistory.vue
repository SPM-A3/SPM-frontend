<template>
  <div>
    <template>
      <standard-table
        :data-source="fineList"
        :columns="columns"
        :rowKey="(record) => record.fine_id"
        :loading="loading"
      >
        <div slot-scope="{record}" slot="status">
          <a-tag v-if="record.status == 1" color="green">Finished</a-tag>
          <a-tag v-else-if="record.status == 0" color="red">Please pay and return</a-tag>
        </div>
        <div slot="total_amount" slot-scope="{record}">
          {{record.total_amount}}$
        </div>
        <div slot="left" slot-scope="{record}">
          {{record.amount}}$
        </div>
        <div slot="actions" slot-scope="{record}">
          <a-button type="primary" @click="$router.push(`/user/borrowing/${record.borrowing_number}/detail`)">
            Detail
          </a-button>
        </div>
        <!-- <a-table-column title="payment time" data-index="payment_time"> </a-table-column> -->
      </standard-table>
    </template>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'book_name',
    key: 'book name',
    title: "Book name"
  },
  {
    dataIndex: 'ISBN',
    key: 'isbn',
    title: 'ISBN'
  },{
    dataIndex: 'start_time',
    title: 'Borrow time'
  },
  {
    title: "Status",
    scopedSlots: {customRender: 'status'}    
  },{
    title: "Total amount",
    dataIndex: "total_amount",
    scopedSlots: {customRender: 'total_amount'}
  },{
    title: "Left amount",
    scopedSlots: {customRender: 'left'}
  },{
    title: "Actions",
    scopedSlots: {customRender: 'actions'}
  }
]
import StandardTable from "@/components/table/StandardTable";
import { getAccessToken, getUserInfo } from "../../services/user";
import moment from 'moment'
export default {
  components: {StandardTable},
  data() {
    return {
      access_token: "",
      fineList: [],
      loading: true,
      columns,
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
          for(let i of fineList){
            const tmpi = {...i}
            tmpi.key = i.fine_id
            tmpi.start_time = moment(i.borrow_start_time).format("dddd, MMMM Do YYYY")
            that.fineList.push(tmpi)
          }
          that.loading = false;
        })
        .catch((err) => {console.log("Request Failed", err);that.loading=false;});
      
      
    },
  },
};
</script>

<style></style>
