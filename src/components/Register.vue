<template>
  <a-form :form="form" @submit="handleSubmit" v-if="!$global.IS_LOGIN">
    <a-form-item v-bind="formItemLayout" label="ID">
      <a-input
        v-decorator="[
          'id',
          {
            rules: [
              {
                required: true,
                message: 'Please input your ID!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="E-mail">
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Confirm Password" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        Name
      </span>
      <a-input
        v-decorator="[
          'name',
          {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="gender">
      <a-select  v-decorator="[
          'gender',
          {
            rules: [{ required: true, message: 'Please select your gender!', whitespace: true, type: 'number' }],
          },
        ]">
        <a-select-option :value="0">
          Male
        </a-select-option>
        <a-select-option :value="1">
          Female
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Position">
      <a-select v-decorator="[
          'position',
          {
            rules: [{ required: true, message: 'Please select your position!', whitespace: true, type: 'number' }],
          },
        ]">
        <a-select-option :value="0">
          Student
        </a-select-option>
        <a-select-option :value="1">
          Teacher
        </a-select-option>
        <a-select-option :value="2">
          Staff
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Phone Number">
      <a-input
        v-decorator="[
          'phone_number',
          {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          },
        ]"
        style="width: 100%"
      >
      </a-input>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button :loading="loading" type="primary" html-type="submit">
        Register
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {tokenLogin, setUserInfo, setAccessToken} from '../services/user'

export default {
  data() {
    return {
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
      loading: false,
    };
  },
  beforeCreate() {
    let that = this;
    tokenLogin()
      .then(res => res.json())
      .then(res => {
        const {data, code, msg} = res;
        if(code == 0 || code == '0'){
          setUserInfo(data);
          that.$message.error('You have already logged in.', 1)
          that.$router.push('/');
        }else{
          that.$global.IS_LOGIN = false;
        }
      })
      .catch(err => that.$global.IS_LOGIN = false)
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      let that = this;
      this.loading = true
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          console.log(values)
          var requestOptions = {
            method: 'POST',
            body: JSON.stringify(values),
          };

          fetch(`${that.$global.BASE_URL}/api/user/register`, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result);
              if(result.code == 0 || result.code == '0'){
                that.loading = false;
                that.$message.success("success", "Register successfully");
                setAccessToken(result.data);
                that.$router.push('/');
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
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
  created(){
  }
};
</script>