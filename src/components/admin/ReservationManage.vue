<template>
  <a-card :bordered="false">
    <!-- 搜索选项框-->
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null : 'fold'">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Book name"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15, offset: 1 }"
              >
                <a-input
                  placeholder="Please input book name"
                  v-model="searchQuery.book_name"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Author"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15, offset: 1 }"
              >
                <a-input
                  placeholder="Please input author"
                  v-model="searchQuery.author"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Publisher"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15, offset: 1 }"
              >
                <a-input
                  style="width: 100%"
                  placeholder="Please input publisher"
                  v-model="searchQuery.publisher"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Publish date"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15, offset: 1 }"
              >
                <a-month-picker
                  placeholder="Please select publish date"
                  style="width: 100%"
                  @change="onChange"
                  v-model="searchQuery.date"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Book category"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15, offset: 1 }"
              >
                <a-cascader
                  :options="options"
                  placeholder="Please search for or select a book category"
                  :show-search="{ filter }"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="ISBN"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15, offset: 1 }"
              >
                <a-input placeholder="Please input ISBN" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px">
          <a-button type="primary" @click="search">Search</a-button>
          <a-button style="margin-left: 8px" @click="resetQuery"
            >Reset</a-button
          >
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{ advanced ? "fold" : "unfold" }}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
      </a-form>
    </div>
    <div>
      <!-- 图书列表 -->
      <standard-table
        :loading="loading"
        :columns="columns"
        :rowKey="(record,index)=>{return index}"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="barcode" slot-scope="{ record }" style="width: 250px">
          <vue-barcode :value="record.ISBN" style="width: 100%"></vue-barcode>
        </div>
        <div
          slot="description"
          slot-scope="{ text }"
          style="width: 100px; font-size: 50%"
        >
          {{ text.slice(0, 50) }}...
        </div>
        <div slot="book_name" slot-scope="{ record }" style="width: 100px">
          《{{record.book_name}}》
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
        <div slot="reser_IDs" slot-scope="{ record }" style="width: 100px">
            <p v-for="(item,index) in record.reser_IDs" :key="index">
              <a-tag color="grey">{{item}}</a-tag>
            </p>
        </div>
        <div slot="reser_status" slot-scope="{ record }" style="width: 100px">
            <p v-if="record.reser_status == 1">
              <a-tag color="pink">reserved</a-tag>
            </p>
            <p v-else>
              <a-tag color="green">not reserved</a-tag>
            </p>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
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
    title: "book name",
    dataIndex: "book_name",
    scopedSlots: {customRender: "book_name"}
  },
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
  {
    title: "reser status",
    dataIndex: "reser_status",
    scopedSlots: {customRender: "reser_status"}
  },
  {
    title: "reser number",
    dataIndex: "reser_number",
  },
  {
    title: "reser IDs",
    dataIndex: "reser_IDs",
    scopedSlots: { customRender: "reser_IDs" },
  },
  {
    title: "ISBN",
    dataIndex: "ISBN",
    sorter: true,
    scopedSlots: { customRender: "barcode" },
  },

  //   {
  //     title: "actions",
  //     scopedSlots: { customRender: "action" },
  //   },
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
import { getAccessToken } from "@/services/user";
import options from "./category";
import VueBarcode from "@chenfengyuan/vue-barcode";

export default {
  name: "ReservationkManage",
  components: { StandardTable, VueBarcode },
  data() {
    return {
      loading2: false,
      advanced: true,
      columns: columns,
      dataSource: [],
      reservationList: [], // 获得所有预约条目
      reservationConclusion: [], // 获得总结性预约信息
      selectedRows: [],
      loading: true,
      options: options.options,
      searchQuery: {
        book_name: "",
        author: "",
        publisher: "",
        ISBN: "",
        category: undefined,
        date: "",
      },
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
    remove() {
      if (this.selectedRows.length == 0) {
        this.$message.error("No selected books.");
        return;
      }
      this.loading = true;
      let ISBNs = [];
      for (let i of this.selectedRows) {
        ISBNs.push(i.key);
      }

      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(ISBNs);

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
      };
      let that = this;
      fetch(`${this.$global.BASE_URL}/api/admin/book/delete`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const { code, msg, data } = result;
          if (code === "0" || code === 0) {
            that.$message.success("Delete books successfully.");
            that.dataSource = that.dataSource.filter(
              (item) =>
                that.selectedRows.findIndex((row) => row.key === item.key) ===
                -1
            );
          } else if (result.status == 500) {
            that.$message.error(
              "Fail to delete books. Please contact the manager."
            );
          }
          that.selectedRows = [];
          that.loading = false;
        })
        .catch((error) => {
          that.selectedRows = [];
          that.$message.error("API call failed");
          that.loading = false;
        });
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
    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
    onChangeGategory(value, selectedOptions) {
      console.log(value, selectedOptions);
    },
    getFormatCatgory() {
      if (
        this.searchQuery.category === undefined ||
        this.searchQuery.category === []
      ) {
        return "";
      } else {
        return this.searchQuery.category[0];
      }
    },
    search() {
      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      this.loading = true;
      let that = this;
      fetch(
        `${this.$global.BASE_URL}/api/book/search?book_name=${
          this.searchQuery.book_name
        }&author=${this.searchQuery.author}&publisher=${
          this.searchQuery.publisher
        }&ISBN=${
          this.searchQuery.ISBN
        }&category=${this.getFormatCatgory()}&pub_year=${
          this.searchQuery.date ? this.searchQuery.date.year() : ""
        }&pub_month=${
          this.searchQuery.date ? this.searchQuery.date.month() : ""
        }`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.code == 0 || result.code == "0") {
            setTimeout(() => {
              that.dataSource = [];
              for (let i of result.data) {

                that.dataSource.push({
                  key: i.ISBN,
                  cover: i.cover,
                  book_name: i.book_name,
                  brief_introduction: i.brief_introduction + "",
                  publisher: i.publisher,
                  published_time: i.published_time,
                  author: i.author,
                  category: i.status,
                });
              }
              that.loading = false;
            }, 200);
          } else {
            that.$messgae.error(result.msg);
            that.loading = false;
          }
        })
        .catch((error) => {
          that.$messgae.error("API call failed.");
          that.loading = false;
        });
    },
    resetQuery() {
      this.searchQuery = {
        book_name: "",
        author: "",
        publisher: "",
        ISBN: "",
        category: undefined,
        date: "",
      };
    },
  },
  created() {
    this.loading = true;

    // 获得reservation全部信息
    let myHeaders = new Headers();
    myHeaders.append("token", getAccessToken());

    let requestoptions = {
      method: "GET",
      headers: myHeaders,
    };
    let that = this;
    fetch(
      `${this.$global.BASE_URL}/api/admin/reservations/detail`,
      requestoptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("res:", result);
        if (result.code == 0 || result.code == "0") {
          setTimeout(() => {
            for (let i = 0; i < result.data.length; i++) {

              // console.log("i", i);
              let book_info = result.data[i].book_info;
              // console.log("book_info:", book_info);
              that.dataSource.push({
                ISBN: book_info.iSBN,
                cover: book_info.cover,
                book_name: book_info.bookName,
                brief_introduction: book_info.brief_introduction + "",
                publisher: book_info.publisher,
                published_time: book_info.published_time,
                author: book_info.author,
                category: book_info.category,
                reser_IDs: result.data[i].reser_IDs.slice(0,5) ,
                reser_status: result.data[i].reser_status,
                reser_number: result.data[i].reser_number,
              });
            }
            that.loading = false;
          }, 200);
        } else {
          that.loading = false;
        }
      })
      .catch((error) => {
        console.log("error", error);
        that.loading = false;
        that.$message.error("API call failed.");
      });

    // // 获得每本书信息
    // let myHeaders = new Headers();
    // myHeaders.append("token", getAccessToken());

    // let requestoptions = {
    //   method: "GET",
    //   headers: myHeaders,
    // };
    // let that = this;
    // await fetch(`${this.$global.BASE_URL}/api/admin/book/getAll?page_size=100&current_page=1`, requestoptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("result:",result)
    //     if (result.code == 0 || result.code == "0") {
    //       setTimeout(() => {
    //         for(let i=1; i<result.data.length; i++){
    //           console.log("i",i)
    //           that.dataSource.push({
    //             key: result.data[i].ISBN,
    //             cover: result.data[i].cover,
    //             book_name: result.data[i].book_name,
    //             brief_introduction: result.data[i].brief_introduction+"",
    //             publisher: result.data[i].publisher,
    //             published_time: result.data[i].published_time,
    //             author: result.data[i].author,
    //             category: result.data[i].status
    //           })
    //         }
    //         that.loading = false;
    //       }, 200);
    //     }else{
    //       that.loading = false;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //     that.loading = false;
    //     that.$message.error("API call failed.")
    //   });
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
