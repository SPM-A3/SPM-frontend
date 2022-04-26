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
              @keyup.enter="returnBook"
            />
            <a-button type="primary" :loading="loading2" @click="returnBook"
              >return</a-button>
          </a-form-item>
        </div>
        <span style="float: right; margin-top: 3px">
          <!-- <a-button type="primary" :loading="loading2" @click="returnBook"
            >return</a-button
          > -->
        </span>
      </a-form>
    </div>
  </a-card>
</template>

<script>
// import StandardTable from "@/components/table/StandardTable";
// const columns = [
//   {
//     title: "cover",
//     dataIndex: "cover",
//     needTotal: true,
//     scopedSlots: { customRender: "cover" },
//   },
//   {
//     title: "title",
//     dataIndex: "book_name",
//   },
//   {
//     title: "introduction",
//     dataIndex: "brief_introduction",
//     scopedSlots: { customRender: "description" },
//   },
//   {
//     title: "publisher",
//     dataIndex: "publisher",
//   },
//   {
//     title: "publish date",
//     sorter: true,
//     dataIndex: "published_time",
//   },
//   {
//     title: "author",
//     dataIndex: "author",
//   },
//   {
//     title: "category",
//     dataIndex: "category",
//   },
//   {
//     title: "ISBN",
//     dataIndex: "key",
//     sorter: true,
//     scopedSlots: { customRender: "barcode" },
//   },
//   {
//     title: "actions",
//     scopedSlots: { customRender: "action" },
//   },
// ];

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
import { getAccessToken } from "@/services/user";
import options from "./category";
// import VueBarcode from "@chenfengyuan/vue-barcode";

export default {
  name: "BookManage",
  // components: { StandardTable, VueBarcode },
  data() {
    return {
      loading2: false,
      advanced: true,
      // columns: columns,
      dataSource: [],
      selectedRows: [],
      loading: true,
      options: options.options,
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
    returnBook() {
      this.loading2 = true;
      const ISBN = this.barcode.split("/")[0];
      const book_id = this.barcode.split("/")[1];
      var myHeaders = new Headers();
      myHeaders.append("access_token", "test");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        ISBN,
        book_id,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      let that = this;
      fetch(
        "https://1893791694056142.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/web-framework/extra-function/return",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          that.loading2 = false;
          if (result === "success") {
            that.$message.success("Successfully return.");
            that.barcode = undefined
          } else {
            that.$message.error("Failed to return.");
          }
        })
        .catch((error) => console.log("error", error));
    },
  },
  created() {
    
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
