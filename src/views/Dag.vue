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
      <el-container>
        <el-aside width="90%">
          <el-card shadow="always">
          </el-card>
          <el-row>
            <el-col :span="7"></el-col>
            <el-col :span="15">
              <el-radio-group v-model="direction">
                <el-radio label="ltr">从左往右开</el-radio>
                <el-radio label="rtl">从右往左开</el-radio>
                <el-radio label="ttb">从上往下开</el-radio>
                <el-radio label="btt">从下往上开</el-radio>
                </el-radio-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-button round type="primary">开始拓扑排序</el-button>
            </el-col>
            <el-col :span="15">
              <el-button round @click="drawer = true" type="primary" style="margin-left: 16px;">
                  显示邻接表
              </el-button>
            </el-col>
          </el-row>

          

          <el-drawer
          title="邻接链表"
          v-model="drawer"
          :direction="direction"
          :before-close="handleClose" destroy-on-close>
              <span>我来啦!</span>
          </el-drawer> 
        </el-aside>
        <el-main>
        <el-row>
          <el-button type="success" icon="el-icon-check" circle aria-setsize="10px"></el-button>
        </el-row>
        <el-row>
          <el-button type="danger" icon="el-icon-delete" circle aria-setsize="10px"></el-button>
        </el-row>
        </el-main>
      </el-container>
      
    </el-main>
  </el-container>

</template>


<script>
// import {dag, showLinkTable, showTopoStack} from "@/components/Dag.vue"
import store from "@/store"
export default {
    name:"Dag",
    store,
    // components: {
    //     dag,
    //     showLinkTable,
    //     showTopoStack
    // },
    data() {
      return {
        activeIndex: '/',
        activeIndex2: '/dag',
        activeIndex3: '/Relationship',
        drawer: false,
        direction: 'ttb',
      };
    },
 
    
    
}
</script>


<style>
.el-card{
    height:600px; 
}
.el-row{
  margin-top:15px;
}
.box{
    height:100%;
    overflow:auto;
}
.el-drawer{
  overflow:auto;
}
</style>
