<template>
  <div>
    <!-- 图书详情：{{ $route.params.id }}
    使用$route.params.id可以获取图书id，使用这个id调用图书api -->
    <a-card :bordered="false">
      <a-col :span="16">
        <a-row>
          <a-col :span="8">
            <a-card
              :title="bookInfo.book_name"
              style="width: 500px; height: 250px"
              :bordered="false"
            >
              <p>ISBN: {{ bookInfo.ISBN }}</p>
              <p>Author: {{ bookInfo.author }}</p>
              <p>Category: {{ bookInfo.category }}</p>
              <p>Publisher: {{ bookInfo.publisher }}</p>
              <p>Published Time: {{ bookInfo.published_time }}</p>
            </a-card>
          </a-col>
          <a-col :offset="16">
            <a-card
              style="height: 300px; width: 300px"
              :bordered="false"
              size="small"
            >
              <!-- &nbsp;&nbsp;&nbsp; -->
              <!-- <a-button size="large" type="primary" @click="reserveBook">RESERVE</a-button> -->
              <a-popover :visible="visible" title="Sure to reserve?" trigger="click" @click="clickpop">
                <template #content>
                  <p>
                    <a-button type="primary" @click="reserveBook">YES</a-button
                    >&nbsp;&nbsp;&nbsp;
                    <a-button @click="cancleBtn">CANCLE</a-button>
                  </p>
                </template>
                <a-button type="primary" size="large">RESERVE</a-button>
              </a-popover>

              <br /><br />
              <p>
                <b>Available Number: {{ avail_book_number }}</b
                >&nbsp;
                <a-tag
                  v-if="avail_book_number / book_number >= 0.5"
                  color="green"
                  >Adequate</a-tag
                >
                <a-tag v-if="avail_book_number / book_number < 0.5" color="red"
                  >Nervous</a-tag
                >
              </p>

              <a-progress
                type="circle"
                :width="150"
                :percent="parseInt((avail_book_number / book_number) * 100)"
                size="small"
                status="active"
                style="color: green"
              />

              <!-- <a-button type="primary">借阅</a-button> -->
            </a-card>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-card style="width: 750px; height: 200px" :bordered="false">
              <p>Introduction: {{ bookInfo.introduction }}</p>
            </a-card>
          </a-col>
        </a-row>
      </a-col>

      <a-col :span="8">
        <img :src="bookInfo.cover" alt="img" height="400" />
      </a-col>
    </a-card>

    <a-card>
      <a-table :columns="columns" :data-source="locationData">
        <template slot="status" slot-scope="status">
          <a-tag v-if="status == 0" color="green">Available</a-tag>
          <a-tag v-else-if="status == 1" color="red">Lent</a-tag>
        </template>

        <!-- <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="Sure to Reserve?"
            @confirm="() => onBorrow(record.key)"
          >
            <a href="javascript:;">RESERVE</a>
          </a-popconfirm>
        </template> -->
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getAccessToken } from "@/services/user";
import BASE_URL from "@/services/api";

const columns = [
  {
    title: "Room Number",
    dataIndex: "room_number",
    key: "room_number",
  },
  {
    title: "Bookshelf",
    dataIndex: "book_shelf",
    key: "book_shelf",
  },
  {
    title: "Side",
    dataIndex: "side",
    key: "side",
  },
  {
    title: "Layer",
    dataIndex: "layer",
    key: "layer",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
  },
  // {
  //   title: "Operation",
  //   key: "operation",
  //   scopedSlots: { customRender: "operation" },
  // },
];

export default {
  name: "Detail",
  data() {
    return {
      visible: false,
      book_number: "",
      avail_book_number: "",

      locationData: [],
      columns,

      bookInfo: {
        ISBN: "",
        cover: "",
        book_name: "",
        introduction: "",
        publisher: "",
        published_time: "",
        author: "",
        category: "",
      },
    };
  },
  methods: {
    clickpop(){
      this.visible = true;
    },
    cancleBtn(){
      this.visible = false;
    },

    changeContent() {
      this.$router.push("/book/search").catch((err) => {
        console.log("输出报错", err);
      });
    },

    getBookISBN() {
      return this.$route.params.id;
    },

    //预约接口
    reserveBook() {
      let JSONISBN = {
        ISBN: this.getBookISBN()
      }
      let BASE_URL = "http://175.24.201.104:8085";

      let myHeaders = new Headers({'Content-Type': 'application/json'});
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(JSONISBN),
      };
      
      let that = this;
      fetch(`${BASE_URL}/api/user/reservation/add`, requestoptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
      
      this.$message.info("Book Reservation Success!");
      this.visible = false;

        
    },

    getBookInfo() {
      let BASE_URL = "http://175.24.201.104:8085";
      this.loading = true;
      let myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "GET",
        headers: myHeaders,
        // body: this.getBookISBN(),
      };

      let that = this;
      fetch(
        `${BASE_URL}/api/book/detail?ISBN=${this.getBookISBN()}`,
        requestoptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.code == 0) {
            this.bookInfo.ISBN = result.data.ISBN;
            this.bookInfo.cover = result.data.cover;
            this.bookInfo.book_name = result.data.book_name;
            this.bookInfo.introduction = result.data.introduction;
            this.bookInfo.publisher = result.data.publisher;
            this.bookInfo.published_time = result.data.published_time;
            this.bookInfo.author = result.data.author;
            this.bookInfo.category = result.data.category;
          }
        })
        .catch((error) => console.log("error", error));
    },

    getBookLocations() {
      let BASE_URL = "http://175.24.201.104:8085";
      this.loading = true;
      let myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "GET",
        headers: myHeaders,
        // body: this.getBookISBN(),
      };

      let that = this;
      fetch(
        `${BASE_URL}/api/book/locations?ISBN=${this.getBookISBN()}`,
        requestoptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.code == 0) {
            this.book_number = result.data.length;
            let num = 0;
            for (let i of result.data) {
              if (i.status == 0) num++;
            }
            this.avail_book_number = num;
            setTimeout(() => {
              var key = 0;
              for (let i of result.data) {
                that.locationData.push({
                  key: key,
                  status: i.status,
                  room_number: i.room_number,
                  book_shelf: i.book_shelf,
                  side: i.side,
                  layer: i.layer,
                });
                key++;
              }
              that.loading = false;
            }, 200);
          }
        })
        .catch((error) => console.log("error", error));
    },
  },
  created() {
    this.id = this.getBookISBN();
    // console.log(this.id);

    this.getBookInfo();
    this.getBookLocations();
  },
};
</script>

<style>
p {
  word-wrap: break-word;
}
</style>