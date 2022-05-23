<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="2">
          <a-avatar :size="70" :src="userInfo.avatar" />
        </a-col>
        <a-col :offset="2">
          <p style="font-size: 15px">
            Hello, administrator <b>{{ userInfo.name }}</b> . Today is
            {{ time.weekday }} {{ time.month }} {{ time.day }} {{ time.year }}.
          </p>
          ID: {{ userInfo.id }}
        </a-col>
      </a-row>
    </a-card>
    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="8">
        <a-card id="reader_card">
          <a-row>
            <a-col :span="12">
              <h1>READERS</h1>
              <a-icon slot="suffix" type="book" />
              <h1 style="font-size: 40px">{{ total_readers }}</h1>
              <a @click="changeContent(2)">MORE INFO ></a>
            </a-col>
            <a-col :offset="15">
              <img src="../../assets/reader.png" width="100" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8">
        <a-card id="fine_card">
          <a-row>
            <a-col :span="12">
              <h1>FINE</h1>
              <h1 style="font-size: 40px">{{ total_fine }}</h1>
              <a @click="changeContent(4)">MORE INFO ></a>
            </a-col>
            <a-col :offset="15">
              <img src="../../assets/fine.png" width="100" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8">
        <a-card id="fine_collected_card">
          <a-row>
            <a-col :span="12">
              <h1>FINE COLLECTED</h1>
              <h1 style="font-size: 40px">{{ total_fine_collected }}</h1>
              <a @click="changeContent(4)">MORE INFO ></a>
            </a-col>
            <a-col :offset="15">
              <img src="../../assets/wallet.png" width="100" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="6">
        <a-card id="book_card">
          <a-row>
            <a-col :span="12">
              <h1>BOOKS</h1>
              <h1 style="font-size: 40px">{{ total_books }}</h1>
              <a @click="changeContent(1)">MORE INFO ></a>
            </a-col>
            <a-col :offset="15">
              <img src="../../assets/book.png" width="100" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card id="borrowing_card">
          <a-row>
            <a-col :span="12">
              <h1>BORROWING</h1>
              <h1 style="font-size: 40px">{{ total_borrowings }}</h1>
              <a @click="changeContent(3)">MORE INFO ></a>
            </a-col>
            <a-col :offset="15">
              <img src="../../assets/borrowing_book.png" width="100" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card id="damaged_card">
          <a-row>
            <a-col :span="12">
              <h1>DAMAGED</h1>
              <h1 style="font-size: 40px">{{ total_damaged_books }}</h1>
              <a @click="changeContent(1)">MORE INFO ></a>
            </a-col>
            <a-col :offset="15">
              <img src="../../assets/damaged_book.png" width="100" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card id="lost_book_card">
          <a-row>
            <a-col :span="12">
              <h1>LOST</h1>
              <h1 style="font-size: 40px">{{ total_lost_books }}</h1>
              <a @click="changeContent(1)">MORE INFO ></a>
            </a-col>
            <a-col :offset="13">
              <img src="../../assets/lost_book.png" width="150" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getAccessToken, getUserInfo } from "@/services/user";

export default {
  name: "dashboard",
  data() {
    return {
      total_readers: "",
      total_books: "",
      total_book_copys: "",
      total_borrowings: "",
      total_fine: "",
      total_lost_books: "",
      total_damaged_books: "",
      total_fine_collected: "",

      userInfo: {},

      time: {
        weekday: "",
        day: "",
        month: "",
        year: "",
      },
    };
  },
  methods: {
    changeContent(x) {
      this.$emit("changeContent", x);
    },
    getUserInfo() {
      this.loading = true;
      this.userInfo.avatar = getUserInfo().avatar;
      let myHeaders = new Headers({ "Content-Type": "application/json" });
      myHeaders.append("token", getAccessToken());
      console.log;
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      let that = this;
      fetch(`${this.$global.BASE_URL}/api/user/profile/detail`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          that.userInfo.id = result.data.id;
          that.userInfo.name = result.data.name;
          that.userInfo.gender = result.data.gender;
          that.userInfo.position = result.data.position;
          that.userInfo.phone_number = result.data.phone_number;
          that.userInfo.email = result.data.email;
          that.userInfo.user_id = result.data.user_id;
          that.userInfo.borrowing = result.data.borrowings;
          that.userInfo.maxBorrowing = result.data.max_borrowing;
        })
        .catch((error) => console.log("error", error));
    },
    getDashboardInfo() {
      let myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "GET",
        headers: myHeaders,
      };
      let that = this;
      fetch(`${this.$global.BASE_URL}/api/admin/dashboard`, requestoptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.code == 0) {
            this.total_readers = result.data.total_readers;
            this.total_books = result.data.total_books;
            this.total_book_copys = result.data.total_book_copys;
            this.total_borrowings = result.data.total_borrowings;
            this.total_fine = result.data.total_fine;
            this.total_lost_books = result.data.total_lost_books;
            this.total_damaged_books = result.data.total_damaged_books;
            this.total_fine_collected = result.data.total_fine_collected;
          }
        })
        .catch((error) => console.log("error", error));
    },
    getTime() {
      let now = new Date();
      let weekday = now.getDay();
      switch (weekday) {
        case 1:
          this.time.weekday = "Mon";
          break;
        case 2:
          this.time.weekday = "Tue";
          break;
        case 3:
          this.time.weekday = "Wes";
          break;
        case 4:
          this.time.weekday = "Thu";
          break;
        case 5:
          this.time.weekday = "Fri";
          break;
        case 6:
          this.time.weekday = "Sat";
          break;
        case 0:
          this.time.weekday = "Sun";
          break;
      }
      this.time.day = now.getDate();
      let month = now.getMonth();
      switch (month) {
        case 0:
          this.time.month = "Jan";
          break;
        case 1:
          this.time.month = "Feb";
          break;
        case 2:
          this.time.month = "Mar";
          break;
        case 3:
          this.time.month = "Apr";
          break;
        case 4:
          this.time.month = "May";
          break;
        case 5:
          this.time.month = "Jun";
          break;
        case 6:
          this.time.month = "Jul";
          break;
        case 7:
          this.time.month = "Aug";
          break;
        case 8:
          this.time.month = "Sept";
          break;
        case 9:
          this.time.month = "Oct";
          break;
        case 10:
          this.time.month = "Nov";
          break;
        case 11:
          this.time.month = "Dec";
          break;
      }

      this.time.year = now.getFullYear();

      console.log(this.time);
    },
  },
  created() {
    this.getDashboardInfo();
    this.getUserInfo();
    this.getTime();
  },
};
</script>

<style scoped lang="scss">
img {
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
  