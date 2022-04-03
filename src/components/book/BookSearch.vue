<template>
  <div id="book-search">
    <!-- from表单搜索部件 -->
    <a-form class="search-form" :form="form" @submit="handleSearch">
      <a-row>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="书名"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-input
              v-decorator="[
                'book_name',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="请输入"
            >
              <a-icon slot="suffix" type="book" />
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :md="8" :sm="24">
          <a-form-item
            label="作者"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-input
              v-decorator="[
                'author',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="请输入"
            >
              <a-icon slot="suffix" type="user" />
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :md="8" :sm="24">
          <a-form-item
            label="主题"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-input
              v-decorator="[
                'subject',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="请输入"
            >
              <a-icon slot="suffix" type="star" />
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="出版社"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-input
              v-decorator="[
                'publisher',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="请输入"
            >
              <a-icon slot="suffix" type="deployment-unit" />
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
              placeholder="请输入"
            >
              <a-icon slot="suffix" type="barcode" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="类别"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-select
              v-decorator="[
                'category',
                { rules: [{ required: false, message: '' }] },
              ]"
              placeholder="请选择"
            >
              <!-- 为每个种类设置检索 -->
              <a-select-option value="1">文学</a-select-option>
              <a-select-option value="2">科技</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit"> 查询 </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset"
            >重置</a-button
          >
        </a-col>
      </a-row>
    </a-form>

    <!-- 查询结果表单 -->
    <div class="search-result-list">
      <a-table
        :columns="columns"
         rowKey="id"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <!-- <template slot="name" slot-scope="name">
          {{ name.first }} {{ name.last }}
        </template> -->

        <template slot="book_number" slot-scope="book_number">
          <p v-if="book_number > 0">
            <a-tag color="green"> YES </a-tag>
          </p>
          <p v-if="book_number == 0">
            <a-tag color="red"> NO </a-tag>
          </p>
        </template>

      </a-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const queryData = async (params) => {
  axios.get("https://randomuser.me/api", { params: params }).then((res) => {
    console.log(res.data);
  });
  return axios.get("https://randomuser.me/api", { params: params });
};
//列元素
const columns = [
  {
    //是否支持省略
    ellipsis: true,
    //标题
    title: "书名",
    dataIndex: "book_name",
    key: "book_name",
    //是否排序
    sorter: true,
  },
  {
    title: "作者",
    dataIndex: "author",
    key: 'author',
  },
  {
    title: "ISBN",
    dataIndex: "ISBN",
    key: 'ISBN'
  },
  {
    title: "是否馆藏",
    dataIndex: "book_number",
    scopedSlots: { customRender: "book_number" },
    key: 'book_number',
  },
  {
    title: "出版社",
    dataIndex: "publisher",
    key: 'publisher',
  },
  {
    title: "类别",
    dataIndex: "category",
    key: 'category',
  },
];

export default {
  name: "Search",

  data() {
    return {
      data: [
        {
          id: 1,
          book_name: "book1",
          author: "author1",
          subject: "subject1",
          publisher: "publisher1",
          ISBN: "ISBN1",
          book_number: 12,
          category: "category1",
          pub_year: "pub_year1",
          pub_month: "pub_month1",
        },
        {
          id: 2,
          book_name: "book2",
          author: "author2",
          subject: "subject2",
          publisher: "publisher2",
          ISBN: "ISBN2",
          book_number: 1,
          category: "category2",
          pub_year: "pub_year2",
          pub_month: "pub_month2",
        },
        {
          id: 3,
          book_name: "book3",
          author: "author3",
          subject: "subject3",
          publisher: "publisher3",
          ISBN: "ISBN3",
          book_number: 0,
          category: "category3",
          pub_year: "pub_year3",
          pub_month: "pub_month3",
        },
        {
          id: 4,
          book_name: "book4",
          author: "author4",
          subject: "subject4",
          publisher: "publisher4",
          ISBN: "ISBN4",
          book_number: 0,
          category: "categor4",
          pub_year: "pub_year4",
          pub_month: "pub_month4",
        },
      ],
      pagination: {},
      loading: false,
      columns,

      //查询表单
      form: this.$form.createForm(this, { name: "advanced_search" }),
    };
  },
  computed: {},

  props: {
    msg: String,
  },
  methods: {
    //查询事件的处理函数
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("error", error);
        console.log("Received values of form: ", values);
      });
    },

    handleReset() {
      console.log("重置属性");
      this.form.resetFields();
    },

    //处理分页
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },

    fetch(params = {}) {
      this.loading = true;
      queryData({
        results: 10,
        ...params,
      }).then(({ data }) => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
      });
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
  border: 1px solid #a42929;
  border-radius: 6px;
}

.search-form .ant-form-item {
  display: flex;
}

.search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#book-search .ant-form {
  max-width: none;
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
</style>