<template>
  <a-layout style="background: #fff; height:100%">
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        mode="inline"
        style="height: 100%"
        :default-selected-keys="['1']"
      >
        <a-menu-item key="1" @click="changeContent(1)">UserInfo</a-menu-item>
        <a-menu-item key="2" @click="changeContent(2)">Notifications</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '50vh' }">
      <div v-if="contentNumber==1">
        <template>
          <div style="margin: 0 auto; text-align: center">
            <a-avatar :size="100" :src="userInfo.avatar" />
          </div>
          <br />
          <a-descriptions title="User Info" bordered style="margin-right:150px; margin-left:150px;">
            <a-descriptions-item label="Barcode" :span="3">
              <vue-qr :text="userInfo.user_id" qid="testid" style="width: 100px;height:100px"></vue-qr>
            </a-descriptions-item>
            <a-descriptions-item label="ID" :span="3">{{userInfo.id}}</a-descriptions-item>
            <a-descriptions-item label="Nickname" :span="3">{{userInfo.name}}</a-descriptions-item>
            <a-descriptions-item label="Gender" :span="3">
              <div v-if="userInfo.gender==0">
                Male
              </div>
              <div v-else>
                Female
              </div>
              </a-descriptions-item>
            <a-descriptions-item label="Position" :span="3">
              <div v-if="userInfo.position==0">
                Student
              </div>
              <div v-else-if="userInfo.position==1">
                Teacher
              </div>
              <div v-else>
                Staff
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="Phone Number" :span="3">{{userInfo.phone_number}}</a-descriptions-item>
            <a-descriptions-item label="E-mail" :span="3">{{userInfo.email}}</a-descriptions-item>
            <a-descriptions-item label="Borrowing" :span="3">{{userInfo.borrowing}}</a-descriptions-item>
            <a-descriptions-item label="Borrowing limit" :span="3">{{userInfo.maxBorrowing}}</a-descriptions-item>
          </a-descriptions>
          <br />
          <div style="margin: 0 auto; text-align: center">
            <a-space>
               <a-button type="primary" @click="changeContent(3)">Edit</a-button>
              <a-button type="dashed" @click="handleLogout">Logout</a-button>
            </a-space>
          </div>
        </template>
      </div>
      <div v-else-if="contentNumber==2">
        <template>
          <a-list item-layout="horizontal" :data-source="notifications">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                :description="item.content+ '  ' +item.time"
              >
                <a slot="title" :href="'/#'+item.url">{{item.title}}</a>
              </a-list-item-meta>
              <a-button type="primary" @click="goto(item.url)">Detail</a-button>
            </a-list-item>
          </a-list>
        </template>
      </div>
      <div v-else-if="contentNumber==3">
        <EditProfile :userId="this.userInfo.user_id"/>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {getAccessToken, logout, getUserInfo} from '../../services/user'
import EditProfile from './EditProfile.vue'
import VueQr from 'vue-qr'
import moment from 'moment'
export default {
  name: "UserCenter",
  components: {EditProfile, VueQr},
  data() {
    return {
      contentNumber: 1,
      notifications: [],
      userInfo: {
        user_id: "",
        id: "",
        name: "",
        gender: "",
        position: "",
        phone_number: "",
        email: "",
        avatar: "",
      },
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 27 },
          sm: { span: 9 },
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 8 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 27,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 9,
          },
        },
      },
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: '编辑' });
  },
  created() {
    this.getUserInfo();
    this.getNotifications();
  },
  methods:{
    handleSubmit(e) {
      let that = this;
      this.loading = true
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        var new_userInfo = {
          user_id: this.userInfo.user_id,
          id: this.userInfo.id,
          name: values.nickname,
          gender: values.gender,
          position: values.position,
          phone_number: values.phone,
          email: values.email,
          avatar: this.userInfo.avatar,
        }
        console.log(new_userInfo);
        if (!err) {
          // console.log('Received values of form: ', values);
          let myHeaders = new Headers({"Content-Type" : "application/json"});
          myHeaders.append("token", getAccessToken());
          var requestOptions = {
            headers: myHeaders,
            method: 'POST',
            body: JSON.stringify(new_userInfo),
          };

          fetch(`${that.$global.BASE_URL}/api/user/profile/edit`, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result);
              if(result.code == 0 || result.code == '0'){
                that.loading = false;
                that.$message.success("success", "Edit successfully");
                this.contentNumber = 1;
              }else{
                that.loading = false;
                that.$message.error(result.msg);
              }
            })
            .catch(error => {
              console.log('error', error);
              that.loading = false;
              that.$messge.error("API call error.");
            });
        }else{
          this.loading = false;
        }
      });
    },
    changeContent(number){
      this.contentNumber = number;
    },
    handleLogout(){
      logout();
      this.$global.IS_LOGIN = false;
      this.userInfo = {};
      this.$router.to('/login');
    },
    getUserInfo(){
      this.loading = true;
      this.userInfo.avatar = getUserInfo().avatar;
      let myHeaders = new Headers({"Content-Type" : "application/json"});
      myHeaders.append("token", getAccessToken());
      console.log;
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      let that = this;
      // fetch(`${this.$global.BASE_URL}/api/user/profile/detail`, requestOptions)
      fetch(`http://101.43.38.236:8085/api/user/profile/detail`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          that.userInfo.id = result.data.id;
          that.userInfo.name = result.data.name;
          that.userInfo.gender = result.data.gender;
          that.userInfo.position = result.data.position;
          that.userInfo.phone_number = result.data.phone_number;
          that.userInfo.email = result.data.email;
          that.userInfo.user_id = result.data.user_id;
          that.userInfo.borrowing = result.data.borrowings;
          that.userInfo.maxBorrowing = result.data.max_borrowing
        })
        .catch((error) => console.log("error", error));
    },
    type2url(type, id){
      if(type === 1 || type === 3 || type === 5) return `/user/borrowing/${id}/detail`
    },
    goto(url){
      this.$router.push(url);
    },
    getNotifications(){
      this.loading = true;
      let myHeaders = new Headers({"Content-Type" : "application/json"});
      myHeaders.append("token", getAccessToken());
      console.log;
      let requestOptions = {
        method: "GET",
      };

      let that = this;
      fetch(`${this.$global.EXTRA_FUNCTION}/getnotifications?user_id=${getUserInfo().user_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.code == 200 ) {
            setTimeout(() => {
              for(let i of result.list){
                const {type, id} = i;
                const url = that.type2url(type, id);
                that.notifications.push({
                  title: i.title,
                  content: i.content,
                  url,
                  time: moment(i.time).fromNow()
                })
              }
              that.loading = false;
            }, 200);
          }
        })
        .catch((error) => console.log("error", error));
    }
  }
}
</script>

<style>
</style>