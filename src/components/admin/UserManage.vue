<template>
  <a-card :bordered="false">
    <!-- 搜索选项框-->
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced">
          <a-form-item
            label="学号（工号）"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
            v-model="id"
          >
            <a-input placeholder="请输入学号（工号）" />
          </a-form-item>
        </div>
        <span style="float: right; margin-top: 3px">
          <a-button type="primary">查询</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <!-- 新建和删除按钮 -->
      <a-space class="operator">
        <a-button @click="addNewUser" type="primary">新建</a-button>
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
                <router-link :to="`/admin/user/${record.key}/edit`">
                  <a-space>
                    <a-icon type="edit" />
                    <span>编辑信息</span>
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
    title: "user_id",
    dataIndex: "key",
    needTotal: true,
  },
  {
    title: "学工号",
    dataIndex: "id",
  },
  {
    title: "姓名",
    dataIndex: "name",
  },{
    title: "性别",
    dataIndex: "gender",
  },{
    title: "职位",
    dataIndex: "position",
  },{
    title: "邮箱",
    dataIndex: "email",
  },{
    title: "手机号",
    dataIndex: "phone_number",
  },{
    title: "借书数量",
    dataIndex: "borrowings",
  },{
    title: "最大借书量",
    dataIndex: "max_borrowing",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
const GENDERS = ["男", "女"];
const POSITIONS = ["学生", "教师", "职工"]
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
  name: "UserManage",
  components: { StandardTable },
  data() {
    return {
      advanced: true,
      columns: columns,
      dataSource: [],
      selectedRows: [],
      loading: true,
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
      this.$router.push("/admin/user/add").catch((err) => {
        console.log("跳转useradd报错", err);
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
    };
    let that = this;
    fetch(`${base_url}/api/admin/user/getall`, requestoptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error_code == 0 || result.error_code == "0") {
          setTimeout(() => {
            for(let i of result.user_list){
              that.dataSource.push({
                key: i.user_id,
                id: i.id,
                name: i.name,
                gender: GENDERS[i.gender],
                position: POSITIONS[i.position],
                email: i.email,
                phone_number: i.phone_number,
                borrowings: i.borrowings,
                max_borrowing: i.max_borrowing
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
