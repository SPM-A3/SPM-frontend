<template>
  <div id="book-search">
    <a-layout style="background: #fff; height: 100%">
      <a-layout-sider width="250" style="background: #fff">
        <a-menu
          mode="inline"
          style="height: 100%"
          :default-selected-keys="['1']"
        >
          <a-menu-item key="1">图书查询</a-menu-item>
          <a-menu-item key="2" disabled>图书详情</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '50vh' }">
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
                label="图书分类"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18, offset: 1 }"
              >
                <a-cascader
                  v-model="cascaderData"
                  ref="text"
                  :options="options"
                  placeholder="请输入或选择分类"
                  :show-search="{ filter }"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="出版日期"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18, offset: 1 }"
              >
                <a-month-picker
                  placeholder="请输入出版日期"
                  style="width: 100%"
                  @change="onChange"
                />
              </a-form-item>
            </a-col>

            <a-col :span="16" :style="{ textAlign: 'right' }">
              <a-button type="primary" html-type="submit"> 查询 </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset"
                >重置</a-button
              >
            </a-col>
          </a-row>
        </a-form>

        

        <a-card title="查询结果" :bordered="false">
          <a-list
            item-layout="vertical"
            size="large"
            :pagination="pagination"
            :data-source="data"
            
          >
            <a-list-item slot="renderItem" key="item.ISBN" slot-scope="item">
              <a-list-item-meta>
                <router-link :to="item.ISBN" slot="title"><h3>{{ item.book_name }}</h3> </router-link>
              </a-list-item-meta>

              <a-row>
                <a-col :span="4">
                  <img height="220" alt="logo" :src="item.cover | imgChange" />
                </a-col>
                <a-col :span="8" type="flex">
                  <p>作者：{{ item.author }}</p>
                  <p>出版社：{{ item.publisher }}</p>
                  <p>出版社：{{ item.published_time }}</p>
                  <p>类别：{{ item.category }}</p>
                  <p>ISBN：{{ item.ISBN }}</p>
                  <p>是否馆藏：<a-tag color="green"> YES </a-tag></p>
                </a-col>
                <a-col :span="10" type="flex">
                  <p id="intro">简介：{{ item.introduction }}</p>
                </a-col>
              </a-row>
            </a-list-item>
          </a-list>
        </a-card>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {
      cascaderData: [],

      data: [],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      },
      options: [
        {
          value: "A",
          label: "A马克思主义、列宁主义、毛泽东思想、邓小平理论",
          children: [
            {
              value: "A",
              label: "全部",
            },
            {
              value: "A1",
              label: "A1马克思、恩格斯著作",
            },
            {
              value: "A2",
              label: "A2毛泽东著作",
            },
            {
              value: "A3",
              label:
                "A3马克思主义、列宁主义、毛泽东思想、邓小平理论的学习和研究",
            },
          ],
        },
        {
          value: "B",
          label: "B哲学、宗教",
          children: [
            {
              value: "B",
              label: "全部",
            },
            {
              value: "B0",
              label: "B0哲学理论",
            },
            {
              value: "B81",
              label: "B81逻辑学",
            },
            {
              value: "B84",
              label: "B84心理学",
            },
          ],
        },
        {
          value: "C",
          label: "C社会科学总论",
          children: [
            {
              value: "C",
              label: "全部",
            },
            {
              value: "C0",
              label: "C0社会科学理论与方法论",
            },
            {
              value: "C91",
              label: "C91社会学",
            },
            {
              value: "C8",
              label: "C8统计学",
            },
            {
              value: "C93",
              label: "C93管理学",
            },
          ],
        },
        {
          value: "D",
          label: "D政治、法律",
          children: [
            {
              value: "D",
              label: "全部",
            },
            {
              value: "D2",
              label: "D2中国共产党",
            },
            {
              value: "D8",
              label: "D8外交、国际关系",
            },
            {
              value: "D9",
              label: "D9法律",
            },
          ],
        },
        {
          value: "E",
          label: "E军事",
          children: [
            {
              value: "E",
              label: "全部",
            },
            {
              value: "E0",
              label: "E0军事理论",
            },
            {
              value: "E2",
              label: "E2中国军事",
            },
          ],
        },
        {
          value: "F",
          label: "F经济",
          children: [
            {
              value: "F",
              label: "全部",
            },
            {
              value: "F0",
              label: "F0经济学",
            },
            {
              value: "F8",
              label: "F8财政、金融",
            },
          ],
        },
        {
          value: "G",
          label: "G文化、科学、教育、体育",
          children: [
            {
              value: "G",
              label: "全部",
            },
            {
              value: "G4",
              label: "G4教育",
            },
            {
              value: "",
              label: "G8体育",
            },
          ],
        },
        {
          value: "H",
          label: "H语言、文字",
          children: [
            {
              value: "H",
              label: "全部",
            },
            {
              value: "H0",
              label: "H0语言学",
            },
            {
              value: "H1",
              label: "H1汉语",
            },
            {
              value: "H3",
              label: "H3常用外国语",
            },
          ],
        },
        {
          value: "I",
          label: "I文学",
          children: [
            {
              value: "I",
              label: "全部",
            },
            {
              value: "I1",
              label: "I1世界文学",
            },
            {
              value: "I2",
              label: "I2中国文学",
            },
          ],
        },
        {
          value: "J",
          label: "J艺术",
          children: [
            {
              value: "J",
              label: "全部",
            },
            {
              value: "J2",
              label: "J2绘画",
            },
            {
              value: "J9",
              label: "J9电影、电视艺术",
            },
          ],
        },
        {
          value: "K",
          label: "K历史、地理",
          children: [
            {
              value: "K",
              label: "全部",
            },
            {
              value: "K1",
              label: "K1世界史",
            },
            {
              value: "K2",
              label: "K2中国史",
            },
            {
              value: "K9",
              label: "K9地理",
            },
          ],
        },
        {
          value: "N",
          label: "N自然科学总论",
          children: [
            {
              value: "N",
              label: "全部",
            },
            {
              value: "N0",
              label: "N0自然科学理论与方法论",
            },
          ],
        },
        {
          value: "O",
          label: "O数理科学和化学",
          children: [
            {
              value: "O",
              label: "全部",
            },
            {
              value: "O1",
              label: "O1数学",
            },
            {
              value: "O4",
              label: "O4物理学",
            },
            {
              value: "O6",
              label: "O6化学",
            },
          ],
        },
        {
          value: "P",
          label: "P天文学、地球科学",
          children: [
            {
              value: "P",
              label: "全部",
            },
            {
              value: "P1",
              label: "P1天文学",
            },
            {
              value: "P9",
              label: "P9自然地理学",
            },
          ],
        },
        {
          value: "Q",
          label: "Q生物科学",
          children: [
            {
              value: "Q",
              label: "全部",
            },
            {
              value: "Q2",
              label: "Q2细胞生物学",
            },
            {
              value: "Q4",
              label: "Q4遗传学",
            },
            {
              value: "Q94",
              label: "Q94植物学",
            },
          ],
        },
        {
          value: "R",
          label: "R医药、卫生",
          children: [
            {
              value: "R",
              label: "全部",
            },
            {
              value: "R3",
              label: "R3基础医学",
            },
            {
              value: "R4",
              label: "R4临床医学",
            },
            {
              value: "R9",
              label: "R9药学",
            },
          ],
        },
        {
          value: "S",
          label: "S农业科学",
          children: [
            {
              value: "S",
              label: "全部",
            },
            {
              value: "S1",
              label: "S1农业基础科学",
            },
            {
              value: "S6",
              label: "S6园艺",
            },
          ],
        },
        {
          value: "T",
          label: "T工业技术",
          children: [
            {
              value: "T",
              label: "全部",
            },
            {
              value: "TB",
              label: "TB一般工业技术",
            },
            {
              value: "TN",
              label: "TN无线电电子学、电信技术",
            },
            {
              value: "TP",
              label: "TP自动化技术、计算机技术",
            },
          ],
        },
        {
          value: "U",
          label: "U交通运输",
          children: [
            {
              value: "U",
              label: "全部",
            },
            {
              value: "U2",
              label: "U2铁路运输",
            },
            {
              value: "U4",
              label: "U4公路运输",
            },
            {
              value: "U6",
              label: "U6水路运输",
            },
          ],
        },
        {
          value: "V",
          label: "V航空、航天",
          children: [
            {
              value: "V",
              label: "全部",
            },
            {
              value: "V2",
              label: "V2航空",
            },
            {
              value: "V4",
              label: "V4航天",
            },
          ],
        },
        {
          value: "X",
          label: "X环境科学、安全科学",
          children: [
            {
              value: "X",
              label: "全部",
            },
            {
              value: "X1",
              label: "X1环境科学基础理论",
            },
            {
              value: "X3",
              label: "X3环境保护管理",
            },
          ],
        },
        {
          value: "Z",
          label: "Z综合类图书",
          children: [
            {
              value: "Z",
              label: "全部",
            },
          ],
        },
      ],
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
        // console.log("error", error);
        console.log("Received values of form: ", values);

        values.category = this.cascaderData;

        let base_url =
          "https://www.fastmock.site/mock/891abb0e6bd9ffe5f4e30bde7ed7516e/spm";
        this.loading = true;
        let myHeaders = new Headers();
        let requestoptions = {
          method: "POST",
          headers: myHeaders,
          body: values,
        };

        let that = this;
        fetch(`${base_url}/api/book/search`, requestoptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.error_code == 0 || result.error_code == "0") {
              this.data.splice(0, this.data.length);
              setTimeout(() => {
                for (let i of result.search_result) {
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
    },

    handleReset() {
      console.log("重置属性");
      this.form.resetFields();
      this.$refs.text.sValue = [];
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
