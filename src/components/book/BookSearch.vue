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

    <hr />

    <a-card title="查询结果">
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="data"
      >
        <a-list-item slot="renderItem" key="item.ISBN" slot-scope="item">
          <a-list-item-meta>
            <a-icon type="book" />
            <a slot="title" :href="item.ISBN">{{ item.book_name }}</a>
          </a-list-item-meta>

          <a-row>
            <a-col :span="4">
              <img height="220" alt="logo" :src="item.cover | imgChange" />
            </a-col>
            <a-col :span="8" type="flex">
              <p>作者：{{ item.author }}</p>
              <p>出版社：{{ item.publisher }}</p>
              <p>类别：{{ item.category }}</p>
              <p>ISBN：{{ item.ISBN }}</p>
              <p>是否馆藏：<a-tag color="green"> YES </a-tag></p>
              评分：<a-rate :default-value="5" disabled />
            </a-col>
            <a-col :span="10" type="flex">
              <p id="intro">简介：{{ item.intorduction }}</p>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </a-card>
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

export default {
  name: "Search",

  data() {
    return {
      data: [
        {
          ISBN: "ISBN1",
          book_name: "book1",
          publisher: "publisher1",
          published_time: "published_time1",
          author: "author1",
          cover:
            "https://img1.doubanio.com/view/subject/s/public/s34080469.jpg",
          category: "category1",
          intorduction:
            "intorduction1https://img1.doubanio.com/view/subject/s/public/s34080469.jpghttps://img1.doubanio.com/view/subject/s/public/s34080469.jpghttps://img1.doubanio.com/view/subject/s/public/s34080469.jpg",
        },
        {
          ISBN: "ISBN2",
          book_name: "book2",
          publisher: "publisher2",
          published_time: "published_time2",
          author: "author2",
          cover:
            "https://img1.doubanio.com/view/subject/s/public/s34080469.jpg",
          category: "category2",
          intorduction: "intorduction2",
        },
        {
          ISBN: "ISBN1",
          book_name: "book3",
          publisher: "publisher3",
          published_time: "published_time3",
          author: "author3",
          cover:
            "https://img1.doubanio.com/view/subject/s/public/s34080469.jpg",
          category: "category3",
          intorduction: "intorduction3",
        },
        {
          ISBN: "ISBN4",
          book_name: "book4",
          publisher: "publisher4",
          published_time: "published_time4",
          author: "author4",
          cover:
            "https://img1.doubanio.com/view/subject/s/public/s34080469.jpg",
          category: "category4",
          intorduction: "intorduction4",
        },
      ],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      },

      //查询表单
      form: this.$form.createForm(this, { name: "advanced_search" }),
    };
  },
  computed: {},

  filters: {
    //解决豆瓣图书api图片无法显示的问题
    imgChange(str) {
      return str.replace(/img./, "img4");
    },
  },
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

        this.data.push({
          ISBN: "ISBN1",
          book_name: "book1",
          publisher: "publisher1",
          published_time: "published_time1",
          author: "author1",
          cover:
            "https://img1.doubanio.com/view/subject/s/public/s34080469.jpg",
          category: "category1",
          intorduction:
            "intorduction1https://img1.doubanio.com/view/subject/s/public/s34080469.jpghttps://img1.doubanio.com/view/subject/s/public/s34080469.jpghttps://img1.doubanio.com/view/subject/s/public/s34080469.jpg",
        });
      });
    },

    handleReset() {
      console.log("重置属性");
      this.form.resetFields();
    },

    // //处理分页
    // handleTableChange(pagination, filters, sorter) {
    //   console.log(pagination);
    //   const pager = { ...this.pagination };
    //   pager.current = pagination.current;
    //   this.pagination = pager;
    //   this.fetch({
    //     results: pagination.pageSize,
    //     page: pagination.current,
    //     sortField: sorter.field,
    //     sortOrder: sorter.order,
    //     ...filters,
    //   });
    // },

    // fetch(params = {}) {
    //   this.loading = true;
    //   queryData({
    //     results: 10,
    //     ...params,
    //   }).then(({ data }) => {
    //     const pagination = { ...this.pagination };
    //     // Read total count from server
    //     // pagination.total = data.totalCount;
    //     pagination.total = 200;
    //     this.loading = false;
    //     this.data = data.results;
    //     this.pagination = pagination;
    //   });
    // },
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
#intro {
  word-wrap: break-word;
}
</style>