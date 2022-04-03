<template>
  <a-layout style="background: #fff; height:100%">
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        mode="inline"
        style="height: 100%"
        :default-selected-keys="['1']"
      >
        <a-menu-item key="1" @click="changeContent(1)">图书管理</a-menu-item>
        <a-menu-item key="2" @click="changeContent(2)">用户管理</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '50vh' }">
      <div v-if="contentNumber==1">
        <book-manage/>
      </div>
      <div v-else>
        <user-manage/>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import BookManage from './BookManage.vue'
import UserManage from './UserManage.vue'
export default {
    name: 'Admin',
    data() {
        return {
            contentNumber: 1
        }
    },
    components: {BookManage, UserManage},
    methods: {
        changeContent(i){
            this.contentNumber = i;
        }
    }
}
</script>

<style>

</style>