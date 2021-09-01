<template>
   <el-container>
    <el-header height="100%">
      <el-menu :default-active="activeIndex" router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <router-view class="el-menu-item" to="/"/>
        <el-menu-item index="/Dag">DAG的应用</el-menu-item>
        <el-menu-item index="/about">人际关系图</el-menu-item>
      </el-menu>
    </el-header>
    <el-main height="100%">
      <p>Dag here</p>
    </el-main>
  </el-container>
</template>


