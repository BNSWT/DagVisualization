
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
               <el-switch v-model="friend" active-text="替换一个图" @change="eventOcur"></el-switch>
               <el-switch v-model="primarySchool" active-text="更新一个样式" @change="changeText"></el-switch>
               <el-switch v-model="middleSchool" active-text="中学网络"></el-switch>
               <el-switch v-model="work" active-text="单位网络"></el-switch>
               <el-switch v-model="hobby" active-text="兴趣网络"></el-switch>
          </el-aside>
          <el-main>
              <DagOfRelationship @updateDAG="updateDAG" ref="relation-dag"></DagOfRelationship>
          </el-main>
      </el-container>
    </el-main>
  </el-container>

</template>

<script>
import DagOfRelationship from '@/components/DagOfRelationship.vue'
  export default {
    components:{
        DagOfRelationship
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
        initData: { // 用来展示的节点与连线
          nodes: [{
            "id": 1,                             // 节点id
            "in_ports": [ 0 ],                   // 入口下标
            "name": "父节点",               // 节点名称
            "out_ports": [ 0, 1 ],               // 出口下标
            "pos_x": 157,                        // 节点坐标 距离左侧
            "pos_y": 120,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "气泡内容",           /* 非必要 气泡内容 */               
          },
          {
            "id": 2,                             // 节点id
            "in_ports": [ 0 ],                   // 入口下标
            "name": "子节点",               // 节点名称
            "out_ports": [ 0, 1 ],               // 出口下标
            "pos_x": 257,                        // 节点坐标 距离左侧
            "pos_y": 220,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "气泡内容",           /* 非必要 气泡内容 */               
          }],
          edges: []
        },
        curData: null
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      // 强行重写dag-board组件的json数据
      eventOcur() {
        this.$refs['relation-dag'].setDagJSON(this.initData) // 直接改造dag的数据
      },
      // 读取dag组件的最新数据同步到这个组件的curData位置
      updateDAG(data) {
        console.log("=============数据变化========")
        console.log(data)
        this.curData = data
      },
      // 改个样式
      changeColor() {
        if (this.curData) {
          this.curData.nodes.forEach(node => node.nodeStyle = {
            "border": "2px solid red"
          })  
        }
      },
      changeText() {
        if (this.curData) {
          this.curData.nodes.forEach(node => {
            if (node.id=='1')
              node.name="hello"
          })
        }
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
