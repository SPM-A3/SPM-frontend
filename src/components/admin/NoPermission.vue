<template>
  <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="goTo('/')">
        Back Home
      </a-button>
      <a-button type="primary" @click="goTo('/admin/login')">
        Admin Login
      </a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script>
export default {
  methods:{
    goTo(path){
      console.log(this.$root.$children[0].handleLogout())
      this.$router.push(path)
    }
  }
}
</script>

<style>

</style>