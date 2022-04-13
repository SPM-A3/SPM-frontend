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
    <div>
      <!-- 新建和删除按钮 -->
      <a-space class="operator">
        <a-button @click="addNewUser" type="primary">new</a-button>
        <a-dropdown>
          <a-menu @click="handleMenuClick" slot="overlay">
            <a-menu-item key="delete">delete</a-menu-item>
            <a-menu-item key="audit">disable</a-menu-item>
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
        <div slot="description" slot-scope="{ text }">
          {{ text.slice(0, 100) }}...
        </div>
        <div slot="avatar" slot-scope="{ record }" style="width: 50px">
          <a-avatar :src="record.avatar"  style="width: 50px;height:50px"/>
        </div>
        <div slot="qrcode" slot-scope="{ record }" style="width: 100px">
          <vue-qr :text="record.id" qid="testid" style="width: 100px;height:100px"></vue-qr>
        </div>
        <div slot="action" slot-scope="{ record }" style="width: 60px">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              actions <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <router-link :to="`/admin/user/${record.key}/edit`">
                  <a-space>
                    <a-icon type="edit" />
                    <span>Edit</span>
                  </a-space>
                </router-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-space direction="vertical"> </a-space>
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
import VueQr from 'vue-qr'
import { getAccessToken } from '../../services/user';
const columns = [
  {
    title: "user_id",
    dataIndex: "key",
    needTotal: true,
  },
  {
    title: "avatar",
    dataIndex: "avatar",
    scopedSlots: {customRender: 'avatar'}
  },
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "name",
    dataIndex: "name",
  },{
    title: "gender",
    dataIndex: "gender",
  },{
    title: "position",
    dataIndex: "position",
  },{
    title: "email",
    dataIndex: "email",
  },{
    title: "phone",
    dataIndex: "phone_number",
  },{
    title: "borrow limit",
    dataIndex: "max_borrowing",
  },
  {
    title: "QRcode",
    scopedSlots: {customRender: 'qrcode'}
  },
  {
    title: "actions",
    scopedSlots: { customRender: "action" },
  },
];
const GENDERS = ["MALE", "FEMALE"];
const POSITIONS = ["Student", "Teacher", "Staff"]
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
  components: { StandardTable,VueQr },
  data() {
    return {
      advanced: true,
      columns: columns,
      dataSource: [],
      selectedRows: [],
      loading: true,
      id: ""
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
      this.loading = true;
      let ids = []
      for(let i of this.selectedRows){
        ids.push(i.key);
      }
      
      var myHeaders = new Headers();
      myHeaders.append("token", getAccessToken());
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(ids);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
      };
      let that = this;
      fetch(`${this.$global.BASE_URL}/api/admin/user/delete`, requestOptions)
        .then(response => response.json())
        .then(result => {
          const {code, msg, data} = result;
          if(code ==='0' || code === 0){
            that.$message.success("Delete user successfully.");
            that.dataSource = that.dataSource.filter(
              (item) =>
                that.selectedRows.findIndex((row) => row.key === item.key) === -1
            );
          }else if(result.status == 500){
            that.$message.error("Fail to delete users. Please contact the manager.");
          }
          that.selectedRows = []
          that.loading = false;
        })
        .catch(error => {
          that.selectedRows = [];
          that.$message.error("API call failed");
          that.loading = false
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
    addNewUser() {
      this.$router.push("/admin/user/add").catch((err) => {
        console.log("跳转useradd报错", err);
      });
    },
    handleMenuClick(e) {
      if (e.key === "delete") {
        this.remove();
      }
    },
    searchById(){
      const id = this.id.toString();
      console.log(id)
      this.dataSource = this.dataSource.filter(
        (item) => item.id === id
      );
    }
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
    fetch(`${this.$global.BASE_URL}/api/admin/user/getAll?page_size=100&current_page=1`, requestoptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.code == 0 || result.code == "0") {
          for(let i of result.data.slice(1)){
            that.dataSource.push({
              key: i.userId,
              avatar: i.avatar,
              id: i.id,
              name: i.name,
              gender: GENDERS[i.gender],
              position: POSITIONS[i.position],
              email: i.email,
              phone_number: i.phoneNumber,
              max_borrowing: 20
            })
          }
          that.loading = false;
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
