<template>
  <a-config-provider :locale="locale">
    <div id="app" ref="root">
      <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', height: '6vh' }" class="header">
          <div class="logo" />
          <div class="header-left">
            <a-menu
                theme="dark"
                mode="horizontal"
                :style="{ lineHeight: '6vh' }"
              >
                <a-menu-item key="1" @click="changeMenu('/admin')" v-if="isAdmin"> ADMIN </a-menu-item>
                <a-menu-item key="2" @click="changeMenu('/book/search')"> SEARCH </a-menu-item>
                <a-menu-item key="3" @click="changeMenu('/user/borrowing')"> BORROWING </a-menu-item>
                <a-menu-item key="4" @click="changeMenu('/user/borrowing/history')"> HISTORY </a-menu-item>
                <a-menu-item key="5" @click="changeMenu('/user/fine/history')"> FINE HISTORY </a-menu-item>
                <a-menu-item key="6" @click="changeMenu('/user/reservation')"> RESERVATION </a-menu-item>
              </a-menu>
          </div>
        
          <div class="header-right">
            <span class="header-msg">
              <a-dropdown class="avatar" v-if="$global.IS_LOGIN || isLogin">
                <a-menu slot="overlay">
                  <a-menu-item @click="changeMenu('/user')"> user center </a-menu-item>
                  <a-menu-item @click="handleLogout" > logout </a-menu-item>
                </a-menu>
                  <a-space>
                    <a-avatar :src="userInfo.avatar" style="backgroundColor:#87d068" />
                    <span style="color: white">{{userInfo.id}}</span><a-icon type="down" />
                  </a-space>
              </a-dropdown>
              <a-button type="link" v-else block>
                <router-link to="/login">Login</router-link>
              </a-button>
            </span>
          </div>
        </a-layout-header>
        <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', minHeight: '89vh' }">
          <div :style="{ background: '#fff', padding: '20px', minHeight: '50vh',marginTop: '32px' }">
            <router-view/>
          </div>
        </a-layout-content>
          <a-layout-footer style="text-align: center">
            @SPM-A3
          </a-layout-footer>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script>
import enUS from 'ant-design-vue/lib/locale-provider/en_US';
import {tokenLogin, setUserInfo, isAdmin, logout, clearUserInfo} from './services/user'
export default {
  name: "app",
  data() {
    return {
      root: null,
      isLogin: false,
      isAdmin: false,
      collapsed: false,
      locale: enUS,
      userInfo: {}
    };
  },
  methods: {
    changeMenu(route) {
      if(!this.$global.IS_LOGIN){
        this.$router.push('/login');

      }
      //获取路由对象并切换
      this.$router.push(route).catch((err) => {
        console.log("输出报错", err);
      });
    },
    handleLogout(){
      logout();
      this.$global.IS_LOGIN = false;
      clearUserInfo();
      this.isAdmin = false;
      this.isLogin = false;
      this.userInfo = {};
      this.$router.push('/login');
    }
  },
  components: {
    
  },
  created(){
    if(isAdmin()){
      this.isAdmin = true;
    }

    this.$message.config({
      top: `10vh`,
      duration: 1,
      maxCount: 3,
    });
    let that = this;
    tokenLogin()
      .then(res => res.json())
      .then( res => {
        const {data, code, msg} = res;
        console.log(res)
        if(code == 0 || code == '0'){
          that.userInfo = data;
          that.$global.IS_LOGIN = true;
          that.isLogin = true;
          setUserInfo(data);
          console.log(data);
        }else{
          clearUserInfo()
          that.$router.push('/login');
        }
      })
      .catch( err => {
        console.log(err);
        that.$router.push('/login');
        // that.showAlert("error", err.msg)
      })
  }
};
</script>

<style>
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
