<template>
  <a-card :bordered="false">
    <!-- 搜索选项框-->
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null : 'fold'">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="书名"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18, offset: 1 }"
              >
                <a-input placeholder="请输入书名" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="作者"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18, offset: 1 }"
              >
                <a-input placeholder="请输入作者名" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="出版社"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18, offset: 1 }"
              >
                <a-input style="width: 100%" placeholder="请输入出版社" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
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
            <a-col :md="8" :sm="24">
              <a-form-item
                label="图书分类"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18, offset: 1 }"
              >
                <!-- <a-select placeholder="请选择图书分类">
									<a-select-option value="01">马克思主义、列宁主义、毛泽东思想、邓小平理论</a-select-option>
									<a-select-option value="02">哲学、宗教</a-select-option>
									<a-select-option value="03">社会科学总论</a-select-option>
									<a-select-option value="04">政治、法律</a-select-option>
									<a-select-option value="05">军事</a-select-option>
									<a-select-option value="06">经济</a-select-option>
									<a-select-option value="07">文化、科学、教育、体育</a-select-option>
									<a-select-option value="08">语言、文字</a-select-option>
									<a-select-option value="09">文学</a-select-option>
									<a-select-option value="10">艺术</a-select-option>
									<a-select-option value="11">历史、地理</a-select-option>
									<a-select-option value="12">自然科学总论</a-select-option>
									<a-select-option value="13">数理科学和化学</a-select-option>
									<a-select-option value="14">天文学、地球科学</a-select-option>
									<a-select-option value="15">生物科学</a-select-option>
									<a-select-option value="16">医药、卫生</a-select-option>
									<a-select-option value="17">农业科学</a-select-option>
									<a-select-option value="18">工业技术</a-select-option>
									<a-select-option value="19">交通运输</a-select-option>
									<a-select-option value="20">航空、航天</a-select-option>
									<a-select-option value="21">环境科学、安全科学</a-select-option>
									<a-select-option value="22">综合性图书</a-select-option>
                </a-select> -->
                <a-cascader
                  :options="options"
                  placeholder="请输入或选择分类"
                  :show-search="{ filter }"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="描述"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18, offset: 1 }"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{ advanced ? "收起" : "展开" }}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
      </a-form>
    </div>
    <div>
      <!-- 新建和删除按钮 -->
      <a-space class="operator">
        <a-button @click="addNewBook" type="primary">新建</a-button>
        <a-dropdown>
          <a-menu @click="handleMenuClick" slot="overlay">
            <a-menu-item key="delete">删除</a-menu-item>
            <a-menu-item key="audit">审批</a-menu-item>
          </a-menu>
          <a-button> 更多操作 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </a-space>
      <!-- 图书列表 -->
      <standard-table
        :loading="loading"
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="description" slot-scope="{ text }">
          {{ text.slice(0, 100) }}...
        </div>
        <div slot="action" slot-scope="{ record }" style="width: 50px">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              操作 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <router-link :to="`/admin/book/${record.key}/edit`">
                  <a-space>
                    <a-icon type="edit" />
                    <span>编辑信息</span>
                  </a-space>
                </router-link>
              </a-menu-item>
              <a-menu-item key="1">
                <router-link :to="`/book/${record.ISBN}`">
                  <a-space>
                    <a-icon type="file-text" />
                    <span>图书详情</span>
                  </a-space>
                </router-link>
              </a-menu-item>
              <a-menu-item key="2">
                <router-link :to="`/book/${record.key}`">
                  <a-space>
                    <a-icon type="plus" />
                    <span>增加库存</span>
                  </a-space>
                </router-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-space direction="vertical"> </a-space>
        </div>
        <div slot="cover" slot-scope="{ record }">
          <img slot="avatar" size="large" shape="square" :src="record.cover" />
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
    title: "封面",
    dataIndex: "cover",
    needTotal: true,
    scopedSlots: { customRender: "cover" },
  },
  {
    title: "ISBN",
    dataIndex: "key",
    sorter: true,
  },
  {
    title: "书名",
    dataIndex: "book_name",
  },
  {
    title: "描述",
    dataIndex: "brief_introduction",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "出版社",
    dataIndex: "publisher",
  },
  {
    title: "出版时间",
    sorter: true,
    dataIndex: "published_time",
  },
  {
    title: "作者",
    dataIndex: "author",
  },
  {
    title: "分类",
    dataIndex: "category",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
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
  name: "BookManage",
  components: { StandardTable },
  data() {
    return {
      advanced: true,
      columns: columns,
      dataSource: [],
      selectedRows: [],
      loading: true,
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
      this.dataSource = this.dataSource.filter(
        (item) =>
          this.selectedRows.findIndex((row) => row.key === item.key) === -1
      );
      this.selectedRows = [];
    },
    onClear() {
      this.$message.info("您清空了勾选的所有行");
    },
    onStatusTitleClick() {
      this.$message.info("你点击了状态栏表头");
    },
    onChange() {
      this.$message.info("表格状态改变了");
    },
    onSelectChange() {
      this.$message.info("选中行改变了");
    },
    addNewBook() {
      this.$router.push("/admin/book/add").catch((err) => {
        console.log("输出报错", err);
      });
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
  },
  created() {
    let base_url =
      "https://www.fastmock.site/mock/0aee7559464fadc986c2e38e63492a86/spm";
    this.loading = true;
    let myHeaders = new Headers();
    myHeaders.append("access_token", "test");

    let requestoptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let that = this;
    fetch(`${base_url}/api/admin/book/getall`, requestoptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error_code == 0 || result.error_code == "0") {
          setTimeout(() => {
            for(let i of result.book_list){
              that.dataSource.push({
                key: i.ISBN,
                cover: i.cover,
                book_name: i.book_name,
                brief_introduction: i.brief_introduction,
                publisher: i.publisher,
                published_time: i.published_time,
                author: i.author,
                category: i.category
              })
            }
            that.loading = false;
          }, 200);
        }
      })
      .catch((error) => console.log("error", error));
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
