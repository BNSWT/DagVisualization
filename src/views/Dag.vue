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
            <el-col :span="20">
              <DagBasic @updateDAG="updateDAG" ref="dag-data"></DagBasic>
            </el-col>
            <el-col :span="4">
              <el-card>
                <el-table
                :data="inPortList"
                style="width: 100%">
                <el-table-column
                  prop="node_id"
                  label="id"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="in_degree"
                  label="入度"
                  width="100">
                </el-table-column>
              </el-table>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
              <el-col >
                <el-radio-group v-model="direction">
                  <el-radio label="ltr">从左往右开</el-radio>
                  <el-radio label="rtl">从右往左开</el-radio>
                  <el-radio label="ttb">从上往下开</el-radio>
                  <el-radio label="btt">从下往上开</el-radio>
                  </el-radio-group>
              </el-col>
          </el-row>
          <div v-if="active==0||active==1||active==2">
            <el-row>
              <el-col>
                  <el-button :disabled="active==0" round @click="drawer = true" type="primary" style="margin-left: 16px;">
                    显示邻接表
                  </el-button>
              </el-col>
            </el-row>
            <el-drawer
              title="邻接链表"
              v-model="drawer"
              :direction="direction"
              :before-close="handleClose" destroy-on-close>
                  <el-table
                  :data="adjFormContent"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="id"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="节点事件"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="out_ports"
                    label="以此事件为前提的事件">
                  </el-table-column>
                </el-table>
            </el-drawer> 
          </div>
          <div v-if="active==3">
            <el-row>
              <el-col>
                  <el-button round @click="drawer = true" type="primary" style="margin-left: 16px;">
                    展示结果表格
                  </el-button>
              </el-col>
            </el-row>
            <el-drawer
              title="关键路径相关变量"
              v-model="drawer"
              :direction="direction"
              :before-close="handleClose" destroy-on-close>
              <el-row align="center">
                  <el-table
                  :data="CPNodeFormContent"
                  style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="事件id"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="ve"
                      label="最早可能开始时间(Ve)"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="vl"
                      label="最迟允许开始时间(Vl)"
                      width="180">
                    </el-table-column>
                  </el-table>
              </el-row>
                  <el-divider direction="vertical" content-position="center"></el-divider>
                  <el-row align="center">
                  <el-table
                  :data="CPEdgeFormContent"
                  style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="活动id"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="e"
                      label="最早可能开始时间(e)"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="l"
                      label="最迟允许开始时间(l)"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="eminusl"
                      label="时间余量(e-l)"
                      width="180">
                    </el-table-column>
                  </el-table>
                  </el-row>
            </el-drawer> 
          </div>
        </el-main>
      </el-container>
      
    </el-main>
  </el-container>

</template>


<script>
// import {dag, showLinkTable, showTopoStack} from "@/components/dag.vue"
import DagBasic from '@/components/DagBasic.vue'
import {CPNodeFormContentDefault, CPEdgeFormContentDefault} from '@/data/CriticalPathDefault.js'
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
        curData: null,
        adjFormContent: [],
        inPortList: [],
        outPortList: [],
        CPNodeFormContent:CPNodeFormContentDefault,
        CPEdgeFormContent:CPEdgeFormContentDefault,
    }
  },
  methods: {
    // 读取dag组件的最新数据同步到这个组件的curData位置
    updateDAG(data) {
      console.log("=============数据变化========")
      console.log(data)
      this.curData = data
    },
    graphDone() {
      console.log("num data!")
       if (this.curData) {
          console.log("not null!")
          this.curData.nodes.forEach(node => node.name=node.name+'['+node.id+']')
      } 
      this.adjForm()
      this.initInPorts()
    },
    next() {
        if (this.active++ > 3) this.active = 0;
        if (this.active==1) {
          this.graphDone();
        }
        if (this.active==2) {
          this.topo();
        }
        if (this.active==3) {
          //this.criticalPath();
          this.highlight();
        }
        console.log(this.active)
      },
    highlight(){
      if (this.curData) {
        this.curData.nodes.forEach(node => {
          if (node.id=='1' || node.id == '2' || node.id == '4' || node.id=='5' || node.id == '6' || node.id == '7') {
            console.log("change node color")
            node.nodeStyle = {
            "border": "2px solid orange"
            }
            node.iconStyle = {
              "background": "orange"
            }
          }
        })
        this.curData.edges.forEach(edge => {
          if (edge.id == 1 || edge.id == 3 || edge.id == 4 || edge.id == 5 || edge.id == 7) {
            edge.style.stroke="orange"
          }
        })  
      }
    },
    changeNodeColor(nodeId) {
      if (this.curData) {
        this.curData.nodes.forEach(node => {
          // console.log("nodeId:")
          //   console.log(nodeId)
          //   console.log("node.id:")
          //   console.log(node.id)
          if (node.id==nodeId) {
            console.log("change node color")
            node.nodeStyle = {
            "border": "2px solid green"
            }
            node.iconStyle = {
              "background": "green"
            }
          }
        })  
      }
    },
    changeEdgeColor(edgeId) {
      if (this.curData) {
        this.curData.edges.forEach((edge)=> {
          // console.log("edgeId:")
          // console.log(edgeId)
          // console.log("edge.id:")
          // console.log(edge.id)
          if (edge.id==edgeId) {
            console.log("change edge Color")
            edge.type="active";
          }
        })
      }
    },
    getOutPorts(nodeId, colorTrans=false) {
      if (colorTrans) {
        this.changeNodeColor(nodeId);
      }
      const outPorts=[]
      this.curData.edges.forEach(edge=> {
        if (edge.src_node_id == nodeId) {
          outPorts.push(edge.dst_node_id);
          if (colorTrans) {
            this.changeEdgeColor(edge.id);
          }
        }
      })
      return outPorts;
    },
    adjForm() {
      this.curData.nodes.forEach((node)=> {
        const outPorts = this.getOutPorts(node.id)
        const formMessage = {
          name: node.name,
          id: node.id,
          out_ports: outPorts,
        }
        console.log("added message:")
        console.log(JSON.stringify(formMessage))
        this.adjFormContent.push(formMessage);
      })
    },
    initInPorts() {
      this.curData.nodes.forEach((node)=> {
        this.inPortList.push({
          node_id: node.id,
          in_degree: new Number(0)
        })
      })
      this.curData.edges.forEach((edge)=>{
        this.inPortList.forEach((item)=>{
          if (item.node_id==edge.dst_node_id)
            item.in_degree++;
        })
      })
      this.diplayInDegreee()
    },
    diplayInDegreee(){
      this.curData.nodes.forEach((node)=> {
        var in_degree = 0;
        this.inPortList.forEach((inPortItem)=>{
          if (inPortItem.node_id == node.id)
            in_degree = inPortItem.in_degree;
        })
        node.name=node.name+"入度："+in_degree
      })
    },
    topo() {
      if(this.inPortList.length==0) {
        return
      }
      for(var i = 0; i<this.inPortList.length; i++) {
        let curInPortList = this.inPortList
        const item = curInPortList[i]
        if (item.in_degree==0) {
          this.getOutPorts(item.node_id, true).forEach((nodeId)=>{
            this.inPortList.forEach((subitem)=>{
              if (subitem.node_id==nodeId) {
                subitem.in_degree--;
                let cur_in_degree = subitem.in_degree; 
                this.curData.nodes.forEach((node)=> {
                  if (node.id==subitem.node_id) {
                    node.name=node.name+"入度："+cur_in_degree
                  }
                })
              }
            })
          })
          curInPortList.splice(i,1)
        }
      }
      setTimeout(()=>{
        this.topo()},2000)
    },
    initOutPorts() {
      this.curData.nodes.forEach((node)=> {
        this.outPortList.push({
          node_id: node.id,
          out_degree: new Number(0)
        })
      })
      this.curData.edges.forEach((edge)=>{
        this.outPortList.forEach((item)=>{
          if (item.node_id==edge.src_node_id)
            item.out_degree++;
        })
      })
    },
    criticalPath(){
      console.log("hello! criticalPath")
      this.curData.nodes.forEach((node)=>{
        this.CPNodeFormContent.push({
          id: node.id,
          ve: 10000,
          vl: 0
        }
        )
      })
      this.curData.edges.forEach((edge)=>{
        this.CPEdgeFormContent.push({
          id: edge.id,
          e: 10000,
          l: 0,
          eminusl: 10000
        })
      })

      console.log("node result:")
      console.log(JSON.stringify(this.CPNodeFormContent))
      console.log("edge result:")
      console.log(JSON.stringify(this.CPEdgeFormContent))
      this.initInPorts()
      this.initOutPorts()
      
      //update ve in normal topo
      let firstElem = true
      while(this.inPortList.length) {
        for(var i = 0; i<this.inPortList.length; i++) {
          if (this.inPortList[i].in_degree==0) {
            // find start
            if (firstElem) {
              firstElem = false
              // set ve for node
              this.CPNodeFormContent.forEach((formMessage)=>{
                if (formMessage.id == this.inPortList[i].node_id){
                  formMessage.ve = 0
                }
              })
            }
            // update each
            this.curData.edges.forEach(edge=> {
              // update ve for node
              if (edge.src_node_id == this.inPortList[i].node_id) { 
                this.curData.nodes.forEach(node=>{
                  if (node.id == edge.dst_node_id) {
                    var srcVe = null;
                    this.CPNodeFormContent.forEach((formMessage)=>{
                      if (formMessage.id == edge.src_node_id)
                        srcVe = formMessage.ve
                    })
                    this.CPNodeFormContent.forEach((formMessage)=>{
                      if (formMessage.id == edge.dst_node_id)
                        formMessage.ve = Math.min(formMessage.ve, srcVe+edge.value)
                    })
                  }
                })
              }
            })
            console.log("before:")
            console.log(JSON.stringify(this.CPNodeFormContent))
            console.log("num:")
            console.log(i)
            this.inPortList.splice(i,1)
            console.log("after:")
            console.log(JSON.stringify(this.CPNodeFormContent))
          }
        }
      }
      // update ve in revert topo
      let lastElem = false
      while(this.outPortList.length) {
        for(let i = 0; i<this.outPortList.length; i++) {
          if (this.outPortList[i].out_degree==0) {
            // find end
            if (lastElem) {
              lastElem = false
              // set vl for node
              this.CPNodeFormContent.forEach((formMessage)=>{
                if (formMessage.id == this.outPortList[i].node_id){
                  formMessage.vl = formMessage.ve
                }
              })
            }
            // update each
            this.curData.edges.forEach(edge=> {
              // update ve for node
              if (edge.dst_node_id == this.outPortList[i].node_id) { 
                this.curData.nodes.forEach(node=>{
                  if (node.id == edge.src_node_id) {
                    var dstVl = null;
                    this.CPNodeFormContent.forEach((formMessage)=>{
                      if (formMessage.id == edge.dst_node_id)
                        dstVl = formMessage.vl
                    })
                    this.CPNodeFormContent.forEach((formMessage)=>{
                      if (formMessage.id == edge.src_node_id)
                        formMessage.vl = Math.max(formMessage.vl, dstVl-edge.value)
                    })
                  }
                })
              }
            })
            this.inPortList.splice(i,1)
          }
        }
      }
      // assign v & e
      this.curData.edges.forEach((edge)=>{
        let src = edge.src_node_id
        let dst = edge.dst_node_id
        let e = 0
        let l = 0
        this.CPNodeFormContent.forEach((formMessage)=>{
          if (formMessage.id == src)
            e = formMessage.ve
          if (formMessage.id == dst)
            l = formMessage.vl - edge.value
        })
        this.CPEdgeFormContent.forEach((formMessage)=> {
          if (formMessage.id == edge.id) {
            formMessage.e = e
            formMessage.l = l
            formMessage.eminusl = e-l
          }
        })
      })
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
