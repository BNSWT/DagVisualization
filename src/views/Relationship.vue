
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
            <el-row>
            <el-card>
               <el-switch @change="chooseNetwork" v-model="friend" active-text="朋友网络"></el-switch>
               <el-switch @change="chooseNetwork" v-model="primarySchool" active-text="小学网络" active-color="red"></el-switch>
               <el-switch @change="chooseNetwork" v-model="middleSchool" active-text="中学网络" active-color="pink"></el-switch>
               <el-switch @change="chooseNetwork" v-model="college" active-text="大学网络" active-color="purple"></el-switch>
               <el-switch @change="chooseNetwork" v-model="work" active-text="单位网络" active-color="orange"></el-switch>
               <el-switch @change="chooseNetwork" v-model="hobby" active-text="兴趣网络" active-color="green"></el-switch>
            </el-card>
            </el-row>
            <el-row>
            <el-card>
              <div v-if="searching==false">
                <el-form :inline="true">
                  <el-form-item lable="姓名">
                    <el-input v-model="personName" placeholder="姓名"></el-input>
                  </el-form-item>
                  <el-form-item>
                  <el-button @click="search" type="primary">查找可能认识的人</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="searching==true">
                <el-form :inline="true">
                  <el-row align="left">
                    <el-col :span="16">
                    <div>可能认识的人</div>
                    </el-col>
                    <el-col :span="2">
                    <el-button type="primary" round>排序</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                     <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="一致性 Consistency" name="1">
                        <div>
                          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                        </div>
                        <div>
                          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="反馈 Feedback" name="2">
                        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                      </el-collapse-item>
                      <el-collapse-item title="效率 Efficiency" name="3">
                        <div>简化流程：设计简洁直观的操作流程；</div>
                        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                        <div>
                          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="可控 Controllability" name="4">
                        <div>
                          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
                        </div>
                        <div>
                          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </el-row>
                </el-form>
              </div>
            </el-card>
            </el-row>
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
import {RelationshipDefault} from '@/components/RelationshipDefault'
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
        primarySchool: true,
        middleSchool: true,
        college: true,
        work: true,
        hobby: true,
        curData: null,
        defaultData: RelationshipDefault,
        personName: "",
        searching: false,
        recommandList:[],
      };
    },
    methods: {
      search(){
        this.searching=true
        
      },
      chooseNetwork() {
        console.log("chooseNetWork")
        if (this.curData) {
          this.curData = {
            nodes:[],
            edges:[]
          }
          this.defaultData.nodes.forEach((node)=>{
              console.log(node.category)
              if (node.category=="person") {
                this.curData.nodes.push(node)
              }
            }) 
          if (this.friend) {
            console.log("open friend network")
            this.defaultData.edges.forEach((edge)=>{
              if (edge.category=="friend") {
                this.curData.edges.push(edge)
              }
            })
          }
          if (this.primarySchool) {
            console.log("open primarySchool network")
            this.defaultData.nodes.forEach((node)=>{
              if (node.category=="primarySchool") {
                this.curData.nodes.push(node)
              }
            })
            this.defaultData.edges.forEach((edge)=>{
              if (edge.category=="primarySchool") {
                this.curData.edges.push(edge)
              }
            })
          }
          if (this.middleSchool) {
            console.log("open middleSchool network")
            this.defaultData.nodes.forEach((node)=>{
              if (node.category=="middleSchool") {
                this.curData.nodes.push(node)
              }
            })
            this.defaultData.edges.forEach((edge)=>{
              if (edge.category=="middleSchool") {
                this.curData.edges.push(edge)
              }
            })
          }
          if (this.college) {
            console.log("open college network")
            this.defaultData.nodes.forEach((node)=>{
              if (node.category=="college") {
                this.curData.nodes.push(node)
              }
            })
            this.defaultData.edges.forEach((edge)=>{
              if (edge.category=="college") {
                this.curData.edges.push(edge)
              }
            })
          }
          if (this.work) {
            console.log("open work network")
            this.defaultData.nodes.forEach((node)=>{
              if (node.category=="work") {
                this.curData.nodes.push(node)
              }
            })
            this.defaultData.edges.forEach((edge)=>{
              if (edge.category=="work") {
                this.curData.edges.push(edge)
              }
            })
          }
          if (this.hobby) {
            console.log("open hobby network")
            this.defaultData.nodes.forEach((node)=>{
              if (node.category=="hobby") {
                this.curData.nodes.push(node)
              }
            })
            this.defaultData.edges.forEach((edge)=>{
              if (edge.category=="hobby") {
                this.curData.edges.push(edge)
              }
            })
          }
          console.log(JSON.stringify(this.curData))
          this.$refs['relation-dag'].setDagJSON(this.curData)
        }

      },
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
.el-card{
  width: 100%;
}
.el-switch{
    margin-top: 15px;
    width: 100%;
    align-content: center;
}
</style>
