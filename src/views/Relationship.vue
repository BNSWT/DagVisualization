
<template>
  <el-container>
    <el-header height="100%">
      <el-menu :default-active="activeIndex3" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/dag">DAG的应用</el-menu-item>
        <el-menu-item index="/relationship">人际关系图</el-menu-item>
      </el-menu>
    </el-header>
    <el-main height="100%">
      <el-container>
          <el-aside>
               <el-switch v-model="friend" active-text="好友网络"></el-switch>
               <el-switch v-model="primarySchool" active-text="小学网络"></el-switch>
               <el-switch v-model="middleSchool" active-text="中学网络"></el-switch>
               <el-switch v-model="colleage" active-text="大学网络"></el-switch>
               <el-switch v-model="work" active-text="单位网络"></el-switch>
               <el-switch v-model="hobby" active-text="兴趣网络"></el-switch>
          </el-aside>
          <el-main>
              <dag-basic></dag-basic>
          </el-main>
      </el-container>
    </el-main>
  </el-container>

</template>

<script>
import DagBasic from '@/components/DagBasic.vue'
  export default {
    components:{
        DagBasic
    },
    data() {
      return {
        activeIndex: '/',
        activeIndex2: '/dag',
        activeIndex3: '/relationship',
        friend: true,
        primarySchool: false,
        middleSchool: false,
        college: false,
        work: false,
        hobby: false,
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
.el-switch{
    margin-top: 15px;
    width: 100%;
    align-content: center;
}
</style>
