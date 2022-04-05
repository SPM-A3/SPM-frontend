<template>
  <div>
    <!-- 图书详情：{{ $route.params.id }}
    使用$route.params.id可以获取图书id，使用这个id调用图书api -->
    <a-card>
      <a-col :span="16">
        <a-row>
          <a-col :span="8">
            <a-card
              :title="bookInfo.book_name"
              style="width: 500px; height: 250px"
              :bordered="true"
            >
              <p>ISBN：{{ bookInfo.ISBN }}</p>
              <p>作者：{{ bookInfo.author }}</p>
              <p>类别：{{ bookInfo.category }}</p>
              <p>出版社：{{ bookInfo.publisher }}</p>
              <p>出版时间：{{ bookInfo.published_time }}</p>
            </a-card>
          </a-col>
          <a-col :offset="16">
            <a-card
              style="height: 200px; width: 200px"
              :bordered="true"
              size="small"
            >
              <br /><br />
              <p>余量：</p>
              <a-button type="primary">预约</a-button>
              <br /><br />
              <a-button type="primary">借阅</a-button>
            </a-card>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-card style="width: 750px; height: 200px" :bordered="true">
              <p>摘要：{{ bookInfo.introduction }}</p>
            </a-card>
          </a-col>
        </a-row>
      </a-col>

      <a-col :span="8">
        <img
          src="https://img4.doubanio.com/view/subject/s/public/s34080469.jpg"
          alt="img"
          height="400"
        />
      </a-col>
    </a-card>

    <a-card>
      <a-table :columns="columns" :data-source="locationData">
        <template slot="status" slot-scope="status">
          <a-tag v-if="status == 1" color="green">可借阅</a-tag>
          <a-tag v-else-if="status == 0" color="red">不可借阅</a-tag>
        </template>

        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="Sure to Borrow?"
            @confirm="() => onBorrow(record.key)"
          >
            <a href="javascript:;">Borrow</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
const columns = [
  {
    title: "房间号",
    dataIndex: "room_number",
    key: "room_number",
  },
  {
    title: "bookshelf书架",
    dataIndex: "book_shelf",
    key: "book_shelf",
  },
  {
    title: "side边",
    dataIndex: "side",
    key: "side",
  },
  {
    title: "layer层",
    dataIndex: "layer",
    key: "layer",
  },
  {
    title: "status状态",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "操作",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];


export default {
  name: "Detail",
  data() {
    return {
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
    getBookISBN() {
      return this.$route.params.id;
    },

    onBorrow(key) {},

    getBookInfo() {
      let base_url =
        "https://www.fastmock.site/mock/891abb0e6bd9ffe5f4e30bde7ed7516e/spm";
      this.loading = true;
      let myHeaders = new Headers();
      let requestoptions = {
        method: "POST",
        headers: myHeaders,
        body: this.getBookISBN(),
      };

      let that = this;
      fetch(`${base_url}/api/book/detail`, requestoptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.error_code == 0) {
            this.bookInfo.ISBN = result.book_info.ISBN;
            this.bookInfo.cover = result.book_info.cover;
            this.bookInfo.book_name = result.book_info.book_name;
            this.bookInfo.introduction = result.book_info.introduction;
            this.bookInfo.publisher = result.book_info.publisher;
            this.bookInfo.published_time = result.book_info.published_time;
            this.bookInfo.author = result.book_info.author;
            this.bookInfo.category = result.book_info.category;
          }
        })
        .catch((error) => console.log("error", error));
    },

    getBookLocations() {
      let base_url =
        "https://www.fastmock.site/mock/891abb0e6bd9ffe5f4e30bde7ed7516e/spm";
      this.loading = true;
      let myHeaders = new Headers();
      let requestoptions = {
        method: "POST",
        headers: myHeaders,
        body: this.getBookISBN(),
      };

      let that = this;
      fetch(`${base_url}/api/book/locations`, requestoptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.error_code == 0) {
            setTimeout(() => {
              var key = 0;
              for (let i of result.locations) {
                that.locationData.push({
                  key : key,
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
    console.log(this.bookInfo.cover);
  },
};
</script>

<style>
p {
  word-wrap: break-word;
}
</style>