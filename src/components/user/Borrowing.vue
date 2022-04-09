<template>
  <div>
    <a-table
      :data-source="borrowingList"
      :rowKey="(record) => record.borrowing_id"
    >
      <a-table-column title="ISBN" data-index="ISBN" />
      <a-table-column title="borrow_date" data-index="borrow_date" />
      <a-table-column title="due_date" data-index="due_date"> </a-table-column>
      <a-table-column title="Action">
        <template slot-scope="text, record">
          <a-tooltip
            class="item"
            effect="dark"
            size="small"
            content="详情"
            placement="top"
          >
            <a-button
              type="primary"
              icon="el-icon-edit"
              @click="routeToDetail(record.borrowing_id)"
            >
              详情
            </a-button>
          </a-tooltip>
          <!-- 归还按钮 -->
          <a-tooltip
            class="item"
            effect="dark"
            size="small"
            content="归还"
            placement="top"
          >
            <a-button
              type="primary"
              icon="el-icon-edit"
              @click="returnBook(record.borrowing_id)"
            >
              归还
            </a-button>
          </a-tooltip>
          <a-tooltip
            class="item"
            effect="dark"
            size="small"
            content="续借"
            placement="top"
          >
            <a-button
              type="primary"
              icon="el-icon-edit"
              @click="renewBook(record.borrowing_id)"
              >续借</a-button
            >
          </a-tooltip>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      access_token: "",
      borrowingList: [],
    };
  },
  created() {
    this.getBorrowing();
  },
  methods: {
    getBorrowing() {
      let that = this;

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "GET", headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/usr/borrowing",
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          that.borrowingList = data.borrowings;
          console.log(data);
        })
        .catch((err) => console.log("Request Failed", err));
    },
    routeToDetail(borrowing_id){
      this.$router.push({path: '/user/borrowing/'+borrowing_id+'/detail', params: {id: borrowing_id}})
    },
    // 归还图书
    returnBook(borrowing_id) {
      console.log(borrowing_id);

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "POST", body: borrowing_id, headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/borrowing/return",
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          if (data.error_code == 0){
            <a-alert message="Success Text" type="success" />
          }
        })
        .catch((err) => console.log("Request Failed", err));


        
    },
    // 续借图书
    renewBook(borrowing_id) {
      console.log(borrowing_id);

      var myHeaders = new Headers();
      myHeaders.append("access_token", this.access_token);

      var myInit = { method: "POST", body: borrowing_id, headers: myHeaders };

      var myRequest = new Request(
        "https://www.fastmock.site/mock/54449dce8948f02a106d0f454713f04b/spm/api/borrowing/renew",
        myInit
      );

      fetch(myRequest)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
        })
        .catch((err) => console.log("Request Failed", err));
    },
  },
};
</script>
