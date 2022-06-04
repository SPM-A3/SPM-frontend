<template>
  <a-card :bordered="false">
    <!-- 搜索选项框-->
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced">
          <a-form-item
            label="book barcode"
            :labelCol="{ span: 7 }"
            :wrapperCol="{ span: 10 }"
          >
            <a-input
              placeholder="Please scan book's barcode"
              :disabled="loading2"
              v-model="barcode"
              @keyup.enter="addBorrowing"
            />
            <!-- <a-button type="primary" :loading="loading2" @click="returnBook"
              >return</a-button> -->
          </a-form-item>
        </div>
      </a-form>
    </div>
    <a-space class="operator">
      <a-popconfirm
        title="Are you sure return the selected books?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="returnBooks"
        :disabled="!dataSource.length"
      >
        <a-button type="danger" :disabled="!dataSource.length">
          RETURN BOOKS
        </a-button>
      </a-popconfirm>
      <a-button type="primary" @click="showAll">
        SHOW ALL
      </a-button>
    </a-space>
    <standard-table
      :loading="loadingTable"
      :columns="columns"
      :dataSource="dataSource"
      :selectedRows.sync="selectedRows"
      :getCheckboxProps="getCheckboxProps"
      @clear="onClear"
      @change="onChange"
      @selectedRowChange="onSelectChange"
    >
      <div slot="barcode" slot-scope="{ record }" style="width: 250px">
        <vue-barcode :value="record.ISBN+'/'+record.book_id" style="width: 100%"></vue-barcode>
      </div>
      <div slot="cover" slot-scope="{ record }">
        <img
          slot="avatar"
          size="large"
          shape="square"
          style="width: 150px"
          :src="record.cover"
        />
      </div>
      <div slot="fine" slot-scope="{ record }">
        <a-tag v-if="record.fine == 0" color="green">{{record.fine}}$</a-tag>
        <a-tooltip v-else-if="record.fine > 0" title="Must first return." :color="'red'">
          <a-tag  color="red">{{record.fine}}$</a-tag>
        </a-tooltip>
      </div>
    </standard-table>
  </a-card>
</template>

<script>
import StandardTable from "@/components/table/StandardTable";
const columns = [
  {
    title: "cover",
    dataIndex: "cover",
    needTotal: true,
    scopedSlots: { customRender: "cover" },
  },
  {
    title: "Title",
    dataIndex: "book_name",
  },
  {
    title: "User id",
    dataIndex: "user_id",
  },
  {
    title: "Borrowing id",
    dataIndex: "borrowing_number"
  },
  {
    title: "Start time",
    dataIndex: "borrow_start_time"
  },
  {
    title: "Due time",
    dataIndex: "due_time"
  },{
    title: "Left fine",
    dataIndex: 'fine',
    scopedSlots: {customRender: "fine"}
  },
  {
    title: "Barcode",
    scopedSlots: {customRender: "barcode"}
  }
];

/**
{
    "ISBN": 9787111461340,
    "book_name": "云计算",
    "borrowing_number": 830127168,
    "book_id": 1,
    "borrow_start_time": "2022-04-26T16:00:00.000Z",
    "due_time": "2022-05-06T16:00:00.000Z",
    "status": 0,
    "user_id": 4
}
*/
import { getAccessToken } from "@/services/user";
import category from "./category";
import VueBarcode from "@chenfengyuan/vue-barcode";

export default {
  name: "BookManage",
  components: { StandardTable, VueBarcode },
  data() {
    return {
      loading2: false,
      advanced: true,
      columns: columns,
      currentIndex: 0,
      dataSource: [],
      selectedRows: [],
      loadingTable: false,
      options: [],
      barcode: undefined,
      searchQuery: {},
    };
  },
  authorize: {
    deleteRecord: "delete",
  },
  methods: {
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter((item) => item.key !== key);
      this.selectedRows = this.selectedRows.filter((item) => item.key !== key);
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    onClear() {
      // this.$message.info("您清空了勾选的所有行");
    },
    onStatusTitleClick() {
      // this.$message.info("你点击了状态栏表头");
    },
    onChange() {
      // this.$message.info("表格状态改变了");
    },
    onSelectChange() {
      // this.$message.info("选中行改变了");
    },
    handleMenuClick(e) {
      if (e.key === "delete") {
        this.remove();
      }
    },
    addBorrowing() {
      this.loadingTable = true;
      let that = this;
      const barcode = this.barcode;

      const existItem = this.dataSource.filter((item) => {
        const itemBarcode = `${item.ISBN}/${item.book_id}`;
        return (itemBarcode === barcode);
      });
      if(existItem.length > 0) {
        this.loadingTable = false;
        this.barcode = undefined;
        this.$message.error("This barcode has been added.");
        return;
      }

      // const baseUrl = "https://1893791694056142.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/web-framework/extra-function"
      // const baseUrl = "http://localhost:3000"
      fetch(`${this.$global.EXTRA_FUNCTION}/borrowing?barcode=${barcode}`)
        .then(res => res.json())
        .then(result => {
          that.loadingTable = false;
          console.log(111)
          const {code, msg, record} = result;
          console.log(record)
          if(code < 0){
            that.$message.error("Barcode not found or this book is not borrowed.");
          }else{
            record.key = record.ISBN;
            that.dataSource.push(record);
          }
          that.barcode = undefined;
        })
        .catch(res => {
          that.loadingTable = false;
          that.$message.error("API call failed.");
          that.barcode = undefined;
        })
    },
    returnBooks() {
      this.loading2 = true;
      if(this.selectedRows.length == 0){
        this.$message.error("No selected books.");
        return;
      }
      let barcodes = [];
      for(let i of this.selectedRows){
        barcodes.push(`${i.ISBN}/${i.book_id}`);
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        barcodes
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
      let that = this;
      fetch(
        `${this.$global.EXTRA_FUNCTION}/return`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          that.loading2 = false;
          if (result === "success") {
            that.$message.success("Successfully return.");
            that.barcode = undefined;
            that.dataSource = that.dataSource.filter(
              (item) =>
                that.selectedRows.findIndex((row) => row.key === item.key) === -1
            );
            that.selectedRows = []
          } else {
            that.$message.error("Failed to return.");
          }
        })
        .catch((error) => console.log("error", error));
    },
    getCheckboxProps: record => ({
      props: {
        disabled: record.fine > 0, // Column configuration not to be checked
        // name: record.fine,
      },
    }),
    showAll() {
      this.loadingTable = true;
      this.dataSource = []
      let that = this;
      // const baseUrl = "https://1893791694056142.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/web-framework/extra-function"
      // const baseUrl = "http://localhost:3000"
      fetch(`${this.$global.EXTRA_FUNCTION}/getallborrowings`)
        .then(res => res.json())
        .then(result => {
          that.loadingTable = false;
          const {code, msg, data} = result;
          if(code < 0){
            that.$message.error("No borrowed books!");
          }else{
            if(data.length == 0){
              that.$message.error("No borrowed books!")

            }else{
              for(let i of data){
                i.key = i.ISBN;
                that.dataSource.push(i)
              }
            }

          }
          that.barcode = undefined;
        })
        .catch(res => {
          that.loadingTable = false;
          that.$message.error("API call failed.");
          that.barcode = undefined;
        })
    }
  },
  async created() {
    this.options = await category.getOptions();
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
