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
          <a-button type="primary"><router-link to="/register" >编辑</router-link></a-button>
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
    }
  },
  methods:{
    changeContent(number){
      this.contentNumber = number;
    }
  }
}
</script>

<style>
</style>