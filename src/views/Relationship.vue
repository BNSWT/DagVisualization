
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
                  <el-button @click="onSubmit" type="primary">查找可能认识的人</el-button>
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
                     <div 
                     v-for="(item,i) in recommandList"
                     :key="item.name">
                      <el-collapse-item :title="item.name" :name='i'>
                        <div
                        v-for="commonField in item.commonFields"
                        :key="commonField">
                          {{commonField}}
                        </div>
                      </el-collapse-item>
                    </div>
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
import {RelationshipDefault} from '@/data/RelationshipDefault'
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
        activeNames:[],
      };
    },
    methods: {
      isFriend(name1, name2){
        var ret = false
        console.log(name1, name2, "is friend？")
        this.curData.edges.forEach(edge=>{
          if (edge.category=="friend") {
            let src_id = edge.src_node_id
            let dst_id = edge.dst_node_id
            let src_name =""
            let dst_name =""
            this.curData.nodes.forEach((node)=>{
              if (node.id == src_id)
                src_name = node.name
              if (node.id == dst_id)
                dst_name = node.name
            })
            console.log(src_name == name2)
            console.log(dst_name == name1)
            if (src_name == name1 && dst_name == name2)
              ret = true
            else if (src_name == name2 && dst_name == name1) {
              console.log(name1, name2, "is friend")
              ret = true;
            }
            else {
              console.log("real friend:", src_name, dst_name)
              console.log("not friend:", name1, name2)
            }
          }
        })
        console.log(name1, name2, "is not friend")
        return ret
      },
      processNode(node){
        let ret = ''
        switch(node.category) {
          case "person":
            ret += "共同好友"
            break
          case "primarySchool":
            ret +="共同小学"
            break
          case "middleSchool":
            ret +="共同中学"
            break
          case "college":
            ret +="共同大学"
            break
          case "work":
            ret += "共同单位"
            break
          case "hobby":
            ret += "共同爱好"
            break
          default:
            break
        }
        ret += ": "
        ret +=node.name
        return ret
      },
      onSubmit(){
        this.searching=true
        this.curData.nodes.forEach((node)=>{
          if (node.category=="person") {
             this.recommandList.push({
              name: node.name,
              commonFields:[]
          })
          }
        })
        let perosonId = ""
        let recommandId = ""
        let recommandName = ""
        let middleNodeId = "" 
        let middleNode = null
        this.curData.nodes.forEach((node)=>{
          if (node.name==this.personName) {
            perosonId = node.id
          }
        })
        this.curData.edges.forEach((edge)=>{
          if (edge.src_node_id == perosonId) {
              this.curData.edges.forEach((anotherEdge)=>{
                if (anotherEdge.src_node_id == edge.dst_node_id){
                  // find category through middle node
                  middleNodeId = anotherEdge.src_node_id
                  this.curData.nodes.forEach(node=>{
                    if (node.id == middleNodeId) {
                      middleNode = node
                    }
                  })
                  // get the recommandNode and updata recommandList
                  recommandId = anotherEdge.dst_node_id
                  this.curData.nodes.forEach((node)=>{
                    if (node.id == recommandId){
                      recommandName = node.name
                      this.recommandList.forEach((recommandItem)=>{
                      if (recommandItem.name == recommandName) {
                          recommandItem.commonFields.push(this.processNode(middleNode))
                        }
                      })
                    }
                  })
                }
                else if (anotherEdge.dst_node_id == edge.dst_node_id){
                  // find category through middle node
                  middleNodeId = anotherEdge.dst_node_id
                  this.curData.nodes.forEach(node=>{
                    if (node.id == middleNodeId) {
                      middleNode = node
                    }
                  })
                  // get the recommandNode and updata recommandList
                  recommandId = anotherEdge.src_node_id
                  this.curData.nodes.forEach((node)=>{
                    if (node.id == recommandId){
                      recommandName = node.name
                      this.recommandList.forEach((recommandItem)=>{
                      if (recommandItem.name == recommandName) {
                          recommandItem.commonFields.push(this.processNode(middleNode))
                        }
                      })
                    }
                  })
                }
              })
          }
          if (edge.dst_node_id == perosonId) {
              this.curData.edges.forEach((anotherEdge)=>{
                if (anotherEdge.src_node_id == edge.src_node_id){
                  // find category through middle node
                  middleNodeId = anotherEdge.src_node_id
                  this.curData.nodes.forEach(node=>{
                    if (node.id == middleNodeId) {
                      middleNode = node
                    }
                  })
                  // get the recommandNode and updata recommandList
                  recommandId = anotherEdge.dst_node_id
                  this.curData.nodes.forEach((node)=>{
                    if (node.id == recommandId){
                      recommandName = node.name
                      this.recommandList.forEach((recommandItem)=>{
                      if (recommandItem.name == recommandName) {
                          recommandItem.commonFields.push(this.processNode(middleNode))
                        }
                      })
                    }
                  })
                }
                else if (anotherEdge.dst_node_id == edge.src_node_id){
                  // find category through middle node
                  middleNodeId = anotherEdge.dst_node_id
                  this.curData.nodes.forEach(node=>{
                    if (node.id == middleNodeId) {
                      middleNode = node
                    }
                  })
                  // get the recommandNode and updata recommandList
                  recommandId = anotherEdge.src_node_id
                  this.curData.nodes.forEach((node)=>{
                    if (node.id == recommandId){
                      recommandName = node.name
                      this.recommandList.forEach((recommandItem)=>{
                      if (recommandItem.name == recommandName) {
                          recommandItem.commonFields.push(this.processNode(middleNode))
                        }
                      })
                    }
                  })
                }
              })
          }
        })

        for(let i = 0; i < this.recommandList.length; i++) {
          if (this.recommandList[i].commonFields.length==0) {
            this.recommandList.splice(i, 1)
          }
          if (this.recommandList[i].name == this.personName) {
            this.recommandList.splice(i, 1)
          }
          if (this.isFriend(this.recommandList[i].name, this.personName)) {
            this.recommandList.splice(i, 1)
          }
        }

        this.recommandList.forEach((recommandItem)=>{
          recommandItem.name += "  关联度：1"
        })

        console.log(JSON.stringify(this.recommandList))
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
