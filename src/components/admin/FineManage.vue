<template>
  <a-card :bordered="false">
    <!-- 搜索选项框-->
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced">
          <a-form-item
            label="ID"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
          >
            <a-input placeholder="Please input id" v-model="id"  />
          </a-form-item>
        </div>
        <span style="float: right; margin-top: 3px">
          <a-button type="primary" @click="searchById">search</a-button>
        </span>
      </a-form>
    </div>
    <br />
    <div>
      <!-- 罚款列表 -->
      <standard-table
        :loading="loading"
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="barcode" slot-scope="{ record }" style="width: 250px">
          <vue-barcode :value="record.key+'/'+record.book_id" style="width: 100%"></vue-barcode>
        </div>
        <div slot="fine" slot-scope="{ record }">
            <a-tag  color="red">{{record.leftfine}}$</a-tag>
        </div>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from "@/components/table/StandardTable";
import { getAccessToken } from '../../services/user';
import category from "./category";
import VueBarcode from "@chenfengyuan/vue-barcode";
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "name",
    dataIndex: "name",
  },{
    title: "Borrowing id",
    dataIndex: "borrowing_number"
  },{
    title: "Title",
    dataIndex: "book_name",
  },{
    title: "Start time",
    dataIndex: "borrow_start_time"
  },{
    title: "Due time",
    dataIndex: "due_time"
  },{
    title: "Left fine",
    dataIndex: 'leftfine',
    scopedSlots: {customRender: "fine"}
  },{
    title: "Barcode",
    scopedSlots: {customRender: "barcode"}
  },
];
/**
{
    ISBN: "978-7-111-64577-1",
    book_name: "",
    bref_introduction: "",
    publisher: "",
    published_time: "",
    author: "",
    category: ""
}
*/

export default {
  name: "FineManage",
  components: { StandardTable,VueBarcode },
  data() {
    return {
      advanced: true,
      columns: columns,
      currentIndex: 0,
      dataSource: [],
      selectedRows: [],
      loading: false,
      options: [],
      barcode: undefined,
      searchQuery: {},
      id:""
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
    searchById(){
      const id = this.id.toString();
      console.log(id)
      this.dataSource = this.dataSource.filter(
        (item) => item.id === id
      );
    },
   /*returnBooks() {
      this.loading2 = true;
      if(this.selectedRows.length == 0){
        this.$message.error("No selected books.");
        return;
      }
      let barcodes = [];
      for(let i of this.selectedRows){
        barcodes.push(`${i.key}/${i.book_id}`);
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
    },*/
  },
  async created() {
    this.options = await category.getOptions();
    this.loading = true;
    let myHeaders = new Headers();
    myHeaders.append("token", getAccessToken());

    let requestoptions = {
      method: "GET",
      headers: myHeaders,
    };
    let that = this;
    fetch(`${this.$global.BASE_URL}/api/admin/fine/detail?page_size=100&current_page=1`, requestoptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.code == 0 || result.code == "0") {
          setTimeout(() => {
            for(let i of result.data){
              //if(i.fine_info.status==1){
                that.dataSource.push({
                  id: i.id,
                  name: i.name,
                  borrowing_number: i.borrow_info.borrowingNumber,
                  book_name: i.book_name,
                  borrow_start_time: i.borrow_info.borrowStartTime,
                  due_time: i.borrow_info.dueTime,
                  leftfine: i.fine_info.amount,
                  key: i.borrow_info.iSBN,
                  book_id: i.borrow_info.bookId
                })
              //}
            }
            that.loading = false;
          }, 200);
        }else{
          that.$message.error("API call failed.");
          that.loading = false;
        }
      })
      .catch((error) => {
        that.loading = false;
        that.$message.error("API call failed.");
      });
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
