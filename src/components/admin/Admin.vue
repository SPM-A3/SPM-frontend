<template>
  <a-layout style="background: #fff; height:100%">
    <a-layout-sider width="200" style="background: #fff" 
      breakpoint="lg"
      collapsed-width="0"
      theme="light"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint">
      <a-menu
        mode="inline"
        style="height: 100%"
        :default-selected-keys="defaultSelectedKeys"
      >
        <a-menu-item key="1" @click="changeContent(1)">Book management</a-menu-item>
        <a-menu-item key="2" @click="changeContent(2)">User management</a-menu-item>
        <a-menu-item key="3" @click="changeContent(3)">Borrow management</a-menu-item>
        <a-menu-item key="4" @click="changeContent(4)">Reservation management</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '50vh' }">
      <div v-if="contentNumber==1">
        <book-manage/>
      </div>
      <div v-else-if="contentNumber==2">
        <user-manage/>
      </div>
      <div v-else-if="contentNumber==3">
        <borrow-manage/>
      </div>
      <div v-else-if="contentNumber==4">
        <reservation-manage/>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import BookManage from './BookManage.vue'
import UserManage from './UserManage.vue'
import BorrowManage from './BorrowManage.vue'
import ReservationManage from './ReservationManage.vue'
export default {
    name: 'Admin',
    data() {
        return {
            contentNumber: 1,
            defaultSelectedKeys: ['1']
        }
    },
    components: {BookManage, UserManage, BorrowManage, ReservationManage},
    methods: {
        changeContent(i){
            this.contentNumber = i;
        },
        onCollapse(collapsed, type) {
            console.log(collapsed, type);
        },
        onBreakpoint(broken) {
            console.log(broken);
        }
    },
    created(){
      const tab = this.$route.query.tab;
      if(tab == 'user'){
        this.defaultSelectedKeys = ['2'];
        this.contentNumber = 2;
      }
    }
}
</script>

<style>

</style>