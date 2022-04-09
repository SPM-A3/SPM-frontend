<template>
  <div>
    <div class = "top">
      <div class = "header">
        <span class="title">SPM图书管理系统</span>
      </div>
      <div class="desc">SPM Course Design</div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="请输入学号（工号）"
                v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="请输入密码"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox :checked="true" >自动登录</a-checkbox>
        </div>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
        </a-form-item>
        <div>
          <router-link style="float: right" to="/register" >注册账户</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
/*
import {login, getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {mapMutations} from 'vuex'
*/

export default {
  name: 'Login',
  /*
  data () {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const name = this.form.getFieldValue('name')
          const password = this.form.getFieldValue('password')
          login(name, password).then(this.afterLogin)
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const {user, permissions, roles} = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
        setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt)})
        this.$router.push('/Helloworld')
        this.$message.success(loginRes.message, 3)
      } else {
        this.error = loginRes.message
      }
    }
  }
  */
}
</script>

<style>
  .top {
    text-align: center;
  }
  .desc {
    font-size: 14px;
    color: black;
    margin-top: 12px;
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