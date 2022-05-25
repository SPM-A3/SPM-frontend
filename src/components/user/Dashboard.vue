<template>
  <div>
    <a-row>
      <a-card :bordered="false">
        <a-space>
          <a-avatar  :src="userInfo.avatar" :size="64" />
          <a-space direction="vertical">
            <div style="font-size: 20px; color: black; ">Hello, {{userInfo.name}}. Today is {{getDateString()}}.</div>
            <div>ID: <router-link to="/user">{{userInfo.id}}</router-link></div>
          </a-space>
        </a-space>
      </a-card>
    </a-row>
    <a-row style="height: 120px;" :gutter="[48,16]">
      <a-col :span="8" >
        <!-- <a-card :title="borrowingTitle" :loading="loading" :bordered="false" bodyStyle="font-size: 15px">
          <router-link slot="extra" to="/user/borrowing">MORE INFO<a-icon type="right" /></router-link>
          You have <router-link to="/user/borrowing">{{borrowing}}</router-link> books borrowing at the moment
        </a-card> -->
        <a-card :title="borrowingTitle" :loading="loading" :bordered="false">
          <router-link slot="extra" to="/user/borrowing">MORE INFO<a-icon type="right" /></router-link>
          <a-statistic
            :value="borrowing"
            suffix="books"
            class="demo-class"
            :value-style="{ color: '#348619' }"
          >
            <template #prefix>
              <a-icon type="book" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :title="lastReturnedBookTitle" :loading="loading" :bordered="false" bodyStyle="font-size: 15px">
          <router-link slot="extra" to="/user/borrowing/history">MORE INFO<a-icon type="right" /></router-link>
          You recently returned <router-link :to="`/book/${lastReturnedBook}`" style="font-style:italic">{{lastReturnedBookName}}</router-link>.
        </a-card>
      </a-col>
      <a-col :span="8"> 
        <a-card :title="fineAmountTotalTitle" :loading="loading" :bordered="false" bodyStyle="font-size: 15px">
          <router-link slot="extra" to="/user/fine/history">MORE INFO<a-icon type="right" /></router-link>
          <a-statistic
          :value="fineAmount"
          suffix="$"
          class="demo-class"
          :value-style="{ color: '#cf1322' }"
        >
          <template #prefix>
            <a-icon type="money-collect" />
          </template>
        </a-statistic>
        </a-card>
      </a-col>
    </a-row>  
    <a-row>
      <a-card :title="reserveStatusTitle" :loading="loading" :bordered="false" bodyStyle="font-size: 15px">
        <router-link slot="extra" to="/user/borrowing">MORE INFO<a-icon type="right" /></router-link>
        <reservation :size="5"></reservation>
      </a-card>
    </a-row>
    <a-row>
      <a-card :title="borrowingsTitle" :loading="loading" :bordered="false" bodyStyle="font-size: 15px">
        <router-link slot="extra" to="/user/borrowing">MORE INFO<a-icon type="right" /></router-link>
        <borrowing :size="5"></borrowing>
      </a-card>
    </a-row>  
  </div>
</template>

<script>
import Reservation from './Reservation.vue';
import Borrowing from './Borrowing.vue'
import {getUserInfo, isAdmin, getAccessToken} from '@/services/user'
export default {
  components: {Reservation, Borrowing},
  data(){
    return {
      loading: true,
      borrowingTitle: "CURRENTLY BORROWING",
      borrowingsTitle: "CURRENTLY BORROWING",
      lastReturnedBookTitle: "LAST RETURNED BOOK",
      fineAmountTotalTitle: "TOTAL FINE",
      reserveStatusTitle: "YOUR RESERVATIONS",
      borrowing: 2,
      lastReturnedBook: "9787111461340",
      lastReturnedBookName: "云计算",
      fineAmount: 100,
      userInfo: {},
      isAdmin: "",
    }
  },
  methods: {
    getDateString(){
      const d = new Date();
      return d.toDateString()
    }
  },
  created(){
    this.isAdmin = isAdmin()
    this.userInfo = getUserInfo();
    let myHeaders = new Headers({"Content-Type": "application/json"});
    myHeaders.append("token", getAccessToken());
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    }
    const that = this;
    fetch(`${this.$global.BASE_URL}/api/dashboard`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const {code, data, msg} = result;
        that.loading = false
        if(code == 0){
          that.borrowing = data.borrowing == null ? 0 : data.borrowing;
          that.fineAmount = data.fine_amount == null ? 0 : data.fine_amount;
          that.lastReturnedBook = data.last_returned_book == null ? "" : data.last_returned_book;
          that.lastReturnedBookName = data.last_returned_book_name == null ? "" : data.last_returned_book_name;
        }else{
          that.$message.error(msg);
        }
      })
      .catch((error) => {
        that.$message.error("API call failed");
      })
  }
}
</script>

<style lang="less" scoped>
  
</style>