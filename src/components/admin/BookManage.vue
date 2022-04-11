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
                <a-input placeholder="Please input book name" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Author"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15, offset: 1 }"
              >
                <a-input placeholder="Please input author" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Publisher"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15 , offset: 1 }"
              >
                <a-input style="width: 100%" placeholder="Please input publisher" />
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
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Book category"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15, offset: 1 }"
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
        <a-button @click="addNewBook" type="primary">new</a-button>
        <a-dropdown>
          <a-menu @click="handleMenuClick" slot="overlay">
            <a-menu-item key="delete">delete</a-menu-item>
            <a-menu-item key="audit"></a-menu-item>
          </a-menu>
          <a-button> actions <a-icon type="down" /> </a-button>
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
        <div slot="description" slot-scope="{ text }" style="width: 100px; font-size: 50%">
          {{ text.slice(0, 50) }}...
        </div>
        <div slot="action" slot-scope="{ record }" style="width: 60px">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              actions <a-icon type="down" />
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
    title: "cover",
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
    title: "title",
    dataIndex: "book_name",
  },
  {
    title: "introduction",
    dataIndex: "brief_introduction",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "publisher",
    dataIndex: "publisher",
  },
  {
    title: "publish date",
    sorter: true,
    dataIndex: "published_time",
  },
  {
    title: "author",
    dataIndex: "author",
  },
  {
    title: "category",
    dataIndex: "category",
  },
  {
    title: "actions",
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
import { getAccessToken } from '@/services/user'
import options from './category'
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
      options: options.options
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
    this.loading = true;
    let myHeaders = new Headers();
    myHeaders.append("token", getAccessToken());

    let requestoptions = {
      method: "GET",
      headers: myHeaders,
    };
    let that = this;
    fetch(`${this.$global.BASE_URL}/api/admin/book/getAll?page_size=10&current_page=1`, requestoptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 0 || result.code == "0") {
          setTimeout(() => {
            for(let i of result.data.slice(1)){
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
        }else{
          that.loading = false;
          
        }
      })
      .catch((error) => {
        console.log("error", error); 
        that.loading = false;
        that.$message.error("API call failed.")
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
