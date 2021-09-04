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
        <el-main>
          
             <el-steps :active="active" finish-status="success"  align-center>
              <el-step title="画图完成"></el-step>
              <el-step title="拓扑排序"></el-step>
              <el-step title="关键路径"></el-step>
             </el-steps>

             <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
          <el-row>
          <el-card shadow="always">
              <dag-basic></dag-basic>
          </el-card>
          </el-row>
          <el-row>
              <el-col :span="10">
                <el-radio-group v-model="direction">
                  <el-radio label="ltr">从左往右开</el-radio>
                  <el-radio label="rtl">从右往左开</el-radio>
                  <el-radio label="ttb">从上往下开</el-radio>
                  <el-radio label="btt">从下往上开</el-radio>
                  </el-radio-group>
              </el-col>
              <el-col :span="12" align="right">
                <el-button type="success" icon="el-icon-check" circle aria-setsize="10px"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle aria-setsize="10px"></el-button>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
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
        </el-main>
      </el-container>
      
    </el-main>
  </el-container>

</template>


<script>
// import {dag, showLinkTable, showTopoStack} from "@/components/dag.vue"
import DagBasic from '@/components/DagBasic.vue'
export default {
  name:"Dag",
  components:{
    DagBasic,
  },
  data() {
    return {
        active:0,
        activeIndex: '/',
        activeIndex2: '/dag',
        activeIndex3: '/Relationship',
        drawer: false,
        direction: 'ttb',
    }
  },
  methods: {
    next() {
        if (this.active++ > 2) this.active = 0;
      }
  }
  
}
</script>


<style>
.el-card{
    height:500px; 
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
