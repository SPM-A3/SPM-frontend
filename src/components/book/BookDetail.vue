<template>
  <div>
    <!-- 图书详情：{{ $route.params.id }}
    使用$route.params.id可以获取图书id，使用这个id调用图书api -->
    <a-card>
      <a-col :span="16">
        <a-row>
          <a-col :offset="2" :span="8">
            <a-card
              title="book_name"
              style="width: 500px; height: 210px"
              :bordered="true"
            >
              <p>ISBN：</p>
              <p>作者：</p>
              <p>类别：</p>
              <p>出版社：</p>
              <p>出版时间：</p>
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
          <a-col :offset="2" :span="8">
            <a-card style="width: 750px; height: 200px" :bordered="true">
              <p>
                摘要：https://img4.doubanio.com/view/subject/s/public/s34080469.jpghttps://img4.doubanio.com/view/subject/s/public/s34080469.jpghttps://img4.doubanio.com/view/subject/s/public/s34080469.jpghttps://img4.doubanio.com/view/subject/s/public/s34080469.jpghttps://img4.doubanio.com/view/subject/s/public/s34080469.jpg
              </p>
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
      <a-table :columns="columns" :data-source="data">
        
        <template slot="status" slot-scope="status">
          <a-tag v-if="status == 1" color="green">可借阅</a-tag>
          <a-tag v-else-if="status == 0" color="red">不可借阅</a-tag>
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
    dataIndex: "bookshelf",
    key: "bookshelf",
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

const data = [
  {
    key: "1",
    room_number: 'room_number1',
    bookshelf: 'book_shelf1',
    side: "side1",
    layer: "layer1",
    status: "1",
  },
  {
    key: "2",
    room_number: 'room_number2',
    bookshelf: 'book_shelf2',
    side: "side2",
    layer: "layer2",
    status: "1",
  },
  {
    key: "3",
    room_number: 'room_number3',
    bookshelf: 'book_shelf3',
    side: "side3",
    layer: "layer3",
    status: "0",
  },
];

export default {
  name: "Detail",
  data() {
    return {
      data,
      columns,
      id: "",
      bookInfo: {},
    };
  },
  methods: {
    getBookId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.id = this.getBookId();
    console.log(this.id);
  },
};
</script>

<style>
p {
  word-wrap: break-word;
}
</style>