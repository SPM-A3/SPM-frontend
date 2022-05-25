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
              style="width: 500px;"
              :bordered="false"
            >
            <div>
              <a-card-grid style="width:50%;text-align:center;font-weight: bold">
                ISBN:
              </a-card-grid>
              <a-card-grid style="width:50%;text-align:center">
                {{ bookInfo.ISBN }}
              </a-card-grid>
            </div>
            <div>
              <a-card-grid style="width:50%;text-align:center;font-weight: bold">
                Author:
              </a-card-grid>
              <a-card-grid style="width: 50%;text-align:center">
                {{ bookInfo.author }}
              </a-card-grid>
            </div>
            <div>
              <a-card-grid style="width:50%;text-align:center;font-weight: bold">
                Category:
              </a-card-grid>
              <a-card-grid style="width: 50%;text-align:center">
                {{ bookInfo.category }}
              </a-card-grid>
            </div>
            <div>
              <a-card-grid style="width:50%;text-align:center;font-weight: bold">
                Publisher:
              </a-card-grid>
              <a-card-grid style="width: 50%;text-align:center">
                {{ bookInfo.publisher }}
              </a-card-grid>
            </div>
            <div>
              <a-card-grid style="width:50%;text-align:center;font-weight: bold">
                Published Time:
              </a-card-grid>
              <a-card-grid style="width: 50%;text-align:center">
                {{ bookInfo.published_time }}
              </a-card-grid>
            </div>
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
              <!-- <a-popover
                :visible="visible"
                title="Sure to reserve?"
                trigger="click"
                @click="clickpop"
              >
                <template #content>
                  <p>
                    <a-button type="primary" @click="reserveBook">YES</a-button
                    >&nbsp;&nbsp;&nbsp;
                    <a-button @click="cancleBtn">CANCLE</a-button>
                  </p>
                </template>
                <a-button type="primary" size="large">RESERVE</a-button>
              </a-popover> -->
              <a-radio-group :value="isReserved" button-style="solid">
                <a-radio-button value="a" @click="reserveBook()"
                  >Reserved</a-radio-button
                >
                <a-radio-button value="b" @click="cancelReserveBook()"
                  >Not Reserved</a-radio-button
                >
              </a-radio-group>
              <br>
              <!-- <a-switch  @click="reserveBook()" checked-children="Reserved" un-checked-children="Unreserved" /> -->

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
            <a-card style="width: 750px; height: 200px; font-size:20px" :bordered="false">
              {{ bookInfo.introduction }}
            </a-card>
          </a-col>
        </a-row>
      </a-col>

      <a-col :span="8">
        <img :src="bookInfo.cover" alt="img" height="400" />
      </a-col>
    </a-card>

    <a-card>
      <a-table :columns="columns" :data-source="locationData" rowKey="book_id">
        <template slot="status" slot-scope="status">
          <a-tag v-if="status == 0" color="green">AVAILABLE</a-tag>
          <a-tag v-else-if="status == 1" color="red">LENT</a-tag>
          <a-tag v-else-if="status == -1" color="red">LOST</a-tag>
          <a-tag v-else-if="status == -2" color="red">DAMAGED</a-tag>
          <a-tag v-else-if="status == -3" color="gray">UNAVAILABLE</a-tag>
        </template>

        <template slot="barcode" slot-scope="record" >
          <vue-barcode :value="bookInfo.ISBN+'/'+record.book_id"></vue-barcode>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="Sure to Borrow?"
            @confirm="() => borrowBook(record.book_id)"
          >
            <a v-if="record.status == 0" href="javascript:;">BORROW</a>
            <a
              v-else-if="record.status != 0"
              href="javascript:;"
              disabled="true"
              >BORROW</a
            >
          </a-popconfirm>
          
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getAccessToken } from "@/services/user";
import VueBarcode from '@chenfengyuan/vue-barcode';
import BASE_URL from "@/services/api";

const columns = [
  {
    title: "Book ID",
    dataIndex: "book_id",
    key: "book_id",
  },
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
  {
    title: "Barcode",
    key: "barcode",
    scopedSlots: { customRender: "barcode" },
  },
  {
    title: "Operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "Detail",
  components: {VueBarcode},
  data() {
    return {
      checked1: true,
      isReserved: "b",
      reservation_id: "",

      // visible: false,
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
    clickpop() {
      this.visible = true;
    },
    cancleBtn() {
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

    reserveBook() {
      this.isReserved = "a";
      let JSONISBN = {
        ISBN: this.getBookISBN(),
      };

      let myHeaders = new Headers({ "Content-Type": "application/json" });
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(JSONISBN),
      };

      let that = this;
      fetch(`${this.$global.BASE_URL}/api/user/reservation/add`, requestoptions)
        .then((response) => response.json())
        .then((result) => {
          
          console.log(result);
        });

      this.$message.success("Book Reserve Successfully!");
      this.visible = false;


      // this.getReservation();
    },

    cancelReserveBook() {
      this.isReserved = "b";

      let myHeaders = new Headers({ "Content-Type": "application/json" });
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          reservation_id: this.reservation_id
        }),
      };
      fetch(`${this.$global.BASE_URL}/api/user/reservation/cancel`, requestoptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });

      this.$message.warning("Cancel Reservation Successfully!");
    },

    borrowBook(book_id) {
      // for (let i of this.locationData) {
      //   if(i.book_id == book_id){

      //   }
      // }

      // let JSONISBN = {
      //   ISBN: this.getBookISBN()
      // }
      let that = this;

      let myHeaders = new Headers({ "Content-Type": "application/json" });
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          ISBN: this.getBookISBN(),
          book_id: book_id,
        }),
      };
      // let that = this;
      fetch(`${this.$global.BASE_URL}/api/user/borrow`, requestoptions)
        .then((response) => response.json())
        .then((result) => {
          const {data, code, msg} = result;
          if(code === 0){
            that.$message.success("Book Borrow Successfully!", 1);
            for (let i of this.locationData) {
              if (i.book_id == book_id) {
                i.status = 1;
              }
            }
            this.avail_book_number--;
            const borrowing_number = result.data;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: JSON.stringify({borrowing_number}),
            };
            fetch(
              `${this.$global.EXTRA_FUNCTION}/sendborrowingmsg`,
              requestOptions
            )
            .then((response) => response.text())
            .then((result) => {
              if(result === "success"){
                console.log("成功发送借书通知")
              }else{
                // that.$message.error("Failed to send notification. Please contact the admin.");
              }
            })
            .catch((error) => {
              that.$message.error("Failed to send notification. API call failed.");
              console.log(error);
            });
            console.log(result);
          }else{
            that.$message.error(msg);
          }
        });

      this.visible = false;
    },

    getBookInfo() {
      let BASE_URL = this.$global.BASE_URL;
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
        `${this.$global.BASE_URL}/api/admin/book/detail?ISBN=${this.getBookISBN()}`,
        requestoptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          const bookInfo = result.data[0];
          if (result.code == 0) {
            this.bookInfo.ISBN = bookInfo.iSBN;
            this.bookInfo.cover = bookInfo.cover;
            this.bookInfo.book_name = bookInfo.bookName;
            this.bookInfo.introduction = bookInfo.briefIntroduction;
            this.bookInfo.publisher = bookInfo.publisher;
            this.bookInfo.published_time = bookInfo.publishedTime.slice(0,7);
            this.bookInfo.author = bookInfo.author;
            this.bookInfo.category = bookInfo.category;
          }
        })
        .catch((error) => console.log("error", error));
    },

    getBookLocations() {
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
        `${this.$global.BASE_URL}/api/book/locations?ISBN=${this.getBookISBN()}`,
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
              for (let i of result.data) {
                that.locationData.push({
                  book_id: i.book_id,
                  status: i.status,
                  room_number: i.room_number,
                  book_shelf: i.book_shelf,
                  side: i.side,
                  layer: i.layer,
                });
              }
              that.loading = false;
            }, 200);
          }
        })
        .catch((error) => console.log("error", error));
    },

    getReservation() {

      let myHeaders = new Headers({ "Content-Type": "application/json" });
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "GET",
        headers: myHeaders,
      };
      fetch(`${this.$global.BASE_URL}/api/reservation/`, requestoptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          for (let i of result.data) {
            if (i.ISBN == this.getBookISBN()) {
              if(i.status == 0){
                this.isReserved = 'a';
                this.reservation_id = i.reservation_id;
              }
              else{
                this.isReserved = 'b';
                this.reservation_id = i.reservation_id;
              } 
            }
          }
        });
    },  
  },
  created() {
    this.id = this.getBookISBN();
    // console.log(this.id);

    this.getBookInfo();
    this.getBookLocations();

    this.getReservation();
  },
};
</script>

<style>
p {
  word-wrap: break-word;
}
</style>