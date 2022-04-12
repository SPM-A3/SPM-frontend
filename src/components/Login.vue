<template>
  <div>
    <div class = "top">
      <div class="desc">SPM A3 Library Management System</div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="Please input your id"
                v-decorator="['account', {rules: [{ required: true, message: 'Please input your id', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="Please input your password"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', {rules: [{ required: true, message: 'Please input your password', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
        <!-- <div>
          <a-checkbox :checked="true" >自动登录</a-checkbox>
        </div> -->
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">login</a-button>
        </a-form-item>
        <div>
          <router-link style="float: right" to="/register" >register</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>

import {login, setAccessToken, getAccessToken, setUserInfo, tokenLogin} from '../services/user'

export default {
  name: 'Login',
  data () {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this),
    }
  },
  computed: {
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const account = this.form.getFieldValue('account')
          const password = this.form.getFieldValue('password')
          login(account, password)
            .then(res => res.json())
            .then(this.afterLogin)
            .catch(err => {
              console.log(err);
            })
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res
      const {data, code, msg} = loginRes;
      if (code == 0) {
        setAccessToken(data);
        this.$message.success("Login successfully, redirecting...", 1);
        console.log("token", getAccessToken());
        this.$global.IS_LOGIN = true;
        setTimeout(() => {
          this.$router.go('/')
        }, 500)
        // let that = this;
        // tokenLogin()
        //   .then(res => res.json())
        //   .then(res => {
        //     const {data, code, msg} = res;
        //     if(code == 0 || code == '0'){
        //       setUserInfo(data);
        //       that.$router.push('/');
        //     }
        //   })
      } else {
        this.error = msg;
      }
    },
  },
  created(){
    let that = this;
    tokenLogin()
      .then(res => res.json())
      .then(res => {
        const {data, code, msg} = res;
        if(code == 0 || code == '0'){
          setUserInfo(data);
          that.$router.push('/');
        }
      })
  }
}
</script>

<style>
  .top {
    text-align: center;
    height: 20vh;
  }
  .desc {
    font-size: 40px;
    color: black;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .header {
    height: 44px;
    line-height: 44px;
  }
  .header a {
    text-decoration: none;
  }
  .logo {
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
  }
  .title {
    font-size: 33px;
    color: red;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }
  .login{
    width: 368px;
    margin: 0 auto;
    height: 50vh;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button{
        font-size: 14px;
      }
    }
  }
  .icon {
    font-size: 24px;
    color: gray;
    margin-left: 16px;
    vertical-align: middle;
    cursor: pointer;
    transition: color 0.3s;
  }
</style>
