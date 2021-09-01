
<template>
  <el-container>
    <el-header height="100%">
      <el-menu :default-active="activeIndex2" router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/dag">DAG的应用</el-menu-item>
        <el-menu-item index="/relationship">人际关系图</el-menu-item>
      </el-menu>
    </el-header>
    <el-main height="100%">
      dag here
    </el-main>
  </el-container>

</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '/',
        activeIndex2: '/dag',
        activeIndex3: '/relationship'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>

</style>
