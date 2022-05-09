<template>
  <div id="book-search">
    <a-form class="search-form" :form="form" @submit="handleSearch">
      <a-row>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="Book Name"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-input
              v-decorator="[
                'book_name',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="Please Input"
            >
              <a-icon slot="suffix" type="book" />
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :md="8" :sm="24">
          <a-form-item
            label="Author"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-input
              v-decorator="[
                'author',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="Please Input"
            >
              <a-icon slot="suffix" type="user" />
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :md="8" :sm="24">
          <a-form-item
            label="ISBN"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-input
              v-decorator="[
                'ISBN',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="Please Input"
            >
              <a-icon slot="suffix" type="barcode" />
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="Publisher"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-input
              v-decorator="[
                'publisher',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="Please Input"
            >
              <a-icon slot="suffix" type="deployment-unit" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="Category"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-cascader
              v-model="cascaderData"
              ref="text"
              :options="options"
              placeholder="Please Input"
              :show-search="{ filter }"
            />
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="Date"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-month-picker
              v-model="DateValue"
              placeholder="Please Input"
              style="width: 100%"
              @change="onChange"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit"> SEARCH </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset"
            >RESET</a-button
          >
        </a-col>
      </a-row>
    </a-form>

    <a-card title="SEARCH RESULT" :bordered="false">
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="data"
      >
        <a-list-item slot="renderItem" key="item.ISBN" slot-scope="item">
          <a-list-item-meta>
            <router-link :to="'/book/' + item.ISBN" slot="title"
              ><h3>{{ item.book_name }}</h3>
            </router-link>
          </a-list-item-meta>

          <a-row>
            <a-col :span="6">
              <img height="220" alt="logo" :src="item.cover" />
            </a-col>
            <a-col :span="8" type="flex">
              <p><b>Author</b>: {{ item.author }}</p>
              <p><b>Publisher</b>: {{ item.publisher }}</p>
              <p><b>Published Time</b>: {{ item.published_time }}</p>
              <p><b>Category</b>: {{ item.category }}</p>
              <p><b>ISBN</b>: {{ item.ISBN }}</p>
              <p><b>Available</b>: <a-tag color="green"> YES </a-tag></p>
            </a-col>
            <a-col :span="8" :offset="2" type="flex">
              <a-popover title="Book Location" placement="bottomLeft">
                <template #content>
                  <a-table
                    :columns="location_columns"
                    :data-source="location_data"
                    rowKey="book_id"
                  >
                    <template slot="status" slot-scope="status">
                      <a-tag v-if="status == 0" color="green">Available</a-tag>
                      <a-tag v-else-if="status == 1" color="red">Lent</a-tag>
                    </template>
                  </a-table>
                </template>
                <a-button @mouseover="getLocationByISBN(item.ISBN)"
                  >Locations</a-button
                >
              </a-popover>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { getAccessToken } from "@/services/user";
import options from "../admin/category";

export default {
  name: "Search",

  data() {
    return {
      cascaderData: [],
      DateValue: "",

      data: [],

      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      },
      options: options.options,
      //查询表单
      form: this.$form.createForm(this, { name: "advanced_search" }),

      location_columns: [
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
      ],
      location_data: [],
    };
  },
  computed: {},

  methods: {
    //查询事件的处理函数
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        // console.log("error", error);
        console.log("Received values of form: ", values);

        if (!values.book_name) values.book_name = "";
        if (!values.author) values.author = "";
        if (!values.ISBN) values.ISBN = "";
        if (!values.publisher) values.publisher = "";

        if (this.cascaderData[this.cascaderData.length - 1])
          values.category = this.cascaderData[this.cascaderData.length - 1];
        else values.category = "";

        if (this.DateValue) values.pub_year = this.DateValue.year();
        else values.pub_year = "";

        if (this.DateValue) values.pub_month = this.DateValue.month() + 1;
        else values.pub_month = "";

        this.loading = true;
        let myHeaders = new Headers();
        myHeaders.append("token", getAccessToken());
        console.log;
        let requestoptions = {
          method: "GET",
          headers: myHeaders,
          // body: JSON.stringify(values),
        };

        let that = this;
        fetch(
          `${this.$global.BASE_URL}/api/book/search?book_name=${values.book_name}&author=${values.author}&publisher=${values.publisher}&ISBN=${values.ISBN}&category=${values.category}&pub_year=${values.pub_year}&pub_month=${values.pub_month}`,
          requestoptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.code == 0) {
              this.data.splice(0, this.data.length);
              setTimeout(() => {
                for (let i of result.data) {
                  that.data.push({
                    ISBN: i.ISBN,
                    cover: i.cover,
                    book_name: i.book_name,
                    introduction: i.introduction,
                    publisher: i.publisher,
                    published_time: i.published_time,
                    author: i.author,
                    category: i.category,
                  });
                }
                that.loading = false;
              }, 200);
            }
          })
          .catch((error) => console.log("error", error));
      });
      this.$message.success("Searching Successfully!");
    },

    handleReset() {
      console.log("重置属性");
      this.form.resetFields();
      this.$refs.text.sValue = [];
    },

    getLocationByISBN(ISBN) {
      this.location_data = [];
      let myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      let requestoptions = {
        method: "GET",
        headers: myHeaders,
      };

      let that = this;
      fetch(
        `${this.$global.BASE_URL}/api/book/locations?ISBN=${ISBN}`,
        requestoptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.code == 0) {
            for (let i of result.data) {
              that.location_data.push({
                book_id: i.book_id,
                status: i.status,
                room_number: i.room_number,
                book_shelf: i.book_shelf,
                side: i.side,
                layer: i.layer,
              });
            }
          }
        })
        .catch((error) => console.log("error", error));
    },

    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },

    onChange() {
      this.$message.info("表格状态改变了");
    },
  },

  created() {
    console.log("创建bookSearch组件");
  },
};
</script>

<style lang="less" scoped>
.search-form {
  padding: 24px;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 6px;
}

.search-form .ant-form-item {
  display: flex;
}

.search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#book-search {
  max-width: none;
  padding: 10px 100px 15px 100px;
}
#book-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #563b3b;
  border-radius: 6px;
  background-color: #ffffff;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
#intro {
  word-wrap: break-word;
}
</style>
