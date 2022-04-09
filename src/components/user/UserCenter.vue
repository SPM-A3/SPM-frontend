<template>
  <a-layout style="background: #fff; height:100%">
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        mode="inline"
        style="height: 100%"
        :default-selected-keys="['1']"
      >
        <a-menu-item key="1" @click="changeContent(1)">个人信息</a-menu-item>
        <a-menu-item key="2" @click="changeContent(2)">通知</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '50vh' }">
      <div v-if="contentNumber==1">
        <template>
          <div>
            <a-avatar :size="64" icon="user" />
          </div>
          <br />
          <a-descriptions title="User Info" :column=3 layout="vertical">
            <a-descriptions-item label="ID">
              19030500001
            </a-descriptions-item>
            <a-descriptions-item label="Nickname">
              Black
            </a-descriptions-item>
            <a-descriptions-item label="Sex">
              Male
            </a-descriptions-item>
            <a-descriptions-item label="Vocation">
              Undergraduate
            </a-descriptions-item>
            <a-descriptions-item label="Phone Number">
              8315370661314
            </a-descriptions-item>
            <a-descriptions-item label="E-mail">
              1234@qq.com
            </a-descriptions-item>
          </a-descriptions>
        </template>
        <div>
          <a-button type="primary" @click="changeContent(3)">编辑</a-button>
          <a-button type="dashed"><router-link to="/login" >退出登录</router-link></a-button>
        </div>
      </div>
      <div v-else-if="contentNumber==2">
        <template>
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </template>
      </div>
      <div v-else-if="contentNumber==3">
        <template>
          <a-form :form="form" @submit="handleSubmit">
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
            <a-form-item v-bind="formItemLayout">
              <span slot="label">
                Nickname&nbsp;
                <a-tooltip title="What do you want others to call you?">
                  <a-icon type="question-circle-o" />
                </a-tooltip>
              </span>
              <a-input
                v-decorator="[
                  'nickname',
                  {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="Sex">
              <a-select default-value="1">
                <a-select-option value="1">
                  Male
                </a-select-option>
                <a-select-option value="2">
                  Female
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="Vocation">
              <a-select default-value="1">
                <a-select-option value="1">
                  Undergraduate
                </a-select-option>
                <a-select-option value="2">
                  Postgraduate
                </a-select-option>
                <a-select-option value="3">
                  Teacher
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="Phone Number">
              <a-input
                v-decorator="[
                  'phone',
                  {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  },
                ]"
                style="width: 100%"
              >
                <a-select
                  slot="addonBefore"
                  v-decorator="['prefix', { initialValue: '86' }]"
                  style="width: 70px"
                >
                  <a-select-option value="86">
                    +86
                  </a-select-option>
                  <a-select-option value="87">
                    +87
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
              <a-button type="primary" html-type="submit">
                编辑
              </a-button>
            </a-form-item>
          </a-form>
        </template>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
const data = [
  {
    title: '超时通知',
  },
  {
    title: '预约图书可借通知',
  },
  {
    title: '预约取消通知',
  },
];
export default {
  name: "UserCenter",
  data() {
    return {
      contentNumber: 1,
      data,
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
  methods:{
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.contentNumber = 1;
        }
      });
    },
    changeContent(number){
      this.contentNumber = number;
    }
  }
}
</script>

<style>
</style>