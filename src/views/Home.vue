<template>
  <el-container>
    <el-header height="100%">
      <el-menu :default-active="activeIndex" router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/dag">DAG的应用</el-menu-item>
        <el-menu-item index="/relationship">人际关系图</el-menu-item>
      </el-menu>
    </el-header>
    <el-main height="100%">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <img alt="Vue logo" src="../assets/logo.png">
      <h1>数据结构课程设计</h1>
      <h3>1953793 周雨杨</h3>
    </el-main>
  </el-container>

</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '/',
        activeIndex2: '/dag',
        activeIndex3: '/Relationship'
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
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

