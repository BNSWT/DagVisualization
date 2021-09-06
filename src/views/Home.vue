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
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item>
          <div class="carousel">
            <img
            src='@/assets/carousel/1.png'/>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img
          src='@/assets/carousel/5.png'/>
        </el-carousel-item>
        <el-carousel-item>
          <img
          src='@/assets/carousel/1.png'/>
        </el-carousel-item>
        <el-carousel-item>
          <img
          src='@/assets/carousel/5.png'/>
        </el-carousel-item>
        <el-carousel-item>
          <img
          src='@/assets/carousel/1.png'/>
        </el-carousel-item>
        <el-carousel-item>
          <img
          src='@/assets/carousel/5.png'/>
        </el-carousel-item>
      </el-carousel>
      <img alt="Vue logo" src="../assets/logo.png" class="image">
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
.img{
  max-width: 100%;
  max-height: 100%;
}
.el-carousel__item h3 {
    color: green;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: green
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: green;
  }
</style>

