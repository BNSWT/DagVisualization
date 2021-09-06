
<template>
<div >
  <el-card>
  <!-- DAG-Diagram主体 -->
  <DAGBoard
      ref="DAGBoard"
      :DataAll="yourJSONDataFillThere"
      @updateDAG="updateDAG"
      @editNodeDetails="editNodeDetails"
      @doSthPersonal="doSthPersonal"
  ></DAGBoard>

  <!-- 用来模拟拖拽添加的元素 -->
 <node-bus
      v-if="dragBus"
      :value="busValue.value"
      :pos_x="busValue.pos_x"
      :pos_y="busValue.pos_y"
  />
  </el-card>
  <el-row>
      <el-col :span="10">
      </el-col>
      <el-col :span="12" align="right">
        <el-button @mousedown="dragIt({
    name: '完成子工程',
    iconClassName: 'el-icon-collection-tag',
    form: { details: '普通节点的内容balabala', createTime: '' }
})" type="primary" icon="el-icon-plus" circle aria-setsize="10px"></el-button>
        </el-col>
  </el-row>
</div>
</template>

<script>
  export default {
    name:"dag",
    // components: {
    //     dag,
    //     showLinkTable,
    //     showTopoStack
    // },
    data() {
      return {
        defaultProps: {
        children: 'children',
        label: 'label'
        },
        initNodesBasic: nodesBasic,
        // 以下为svg必要内容
        dragBus: false, // 是否在拖拽,
        yourJSONDataFillThere: { // 用来展示的节点与连线
          nodes: [{
            "id": 1,                             // 节点id
            "in_ports": [ 0 ],                   // 入口下标
            "name": "得到需求文档",               // 节点名称
            "out_ports": [ 0, 1 ],               // 出口下标
            "pos_x": 157,                        // 节点坐标 距离左侧
            "pos_y": 40,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "项目的根基",           /* 非必要 气泡内容 */               
          },
          {
            "id": 2,                             // 节点id
            "in_ports": [ 0 ],                   // 入口下标
            "name": "完成设计文档",               // 节点名称
            "out_ports": [ 0, 1, 2],               // 出口下标
            "pos_x": 257,                        // 节点坐标 距离左侧
            "pos_y": 120,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "项目的设计至关重要",           /* 非必要 气泡内容 */               
          },
          {
            "id": 3,                             // 节点id
            "in_ports": [ 0 ],                   // 入口下标
            "name": "完成子工程",               // 节点名称
            "out_ports": [ 0],               // 出口下标
            "pos_x": 57,                        // 节点坐标 距离左侧
            "pos_y":180,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "工程的一个子项目",           /* 非必要 气泡内容 */   
          },
          {
            "id": 4,                             // 节点id
            "in_ports": [ 0 ],                   // 入口下标
            "name": "完成子工程",               // 节点名称
            "out_ports": [ 0],               // 出口下标
            "pos_x": 217,                        // 节点坐标 距离左侧
            "pos_y": 280,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "工程的一个子项目",           /* 非必要 气泡内容 */   
          },
          {
            "id": 5,                             // 节点id
            "in_ports": [ 0 ],                   // 入口下标
            "name": "完成子工程",               // 节点名称
            "out_ports": [ 0],               // 出口下标
            "pos_x": 500,                        // 节点坐标 距离左侧
            "pos_y": 190,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "工程的一个子项目",           /* 非必要 气泡内容 */   
          },
          {
            "id": 6,                             // 节点id
            "in_ports": [ 0 ],                   // 入口下标
            "name": "完成子工程",               // 节点名称
            "out_ports": [ 0],               // 出口下标
            "pos_x": 457,                        // 节点坐标 距离左侧
            "pos_y": 350,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "工程的一个子项目",           /* 非必要 气泡内容 */   
          },
          {
            "id": 7,                             // 节点id
            "in_ports": [ 0, 1 ],                   // 入口下标
            "name": "完成子工程",               // 节点名称
            "out_ports": [ 0],               // 出口下标
            "pos_x": 20,                        // 节点坐标 距离左侧
            "pos_y": 420,                        // 节点坐标 距离顶部
            "nodeStyle": {                       /* 非必要 节点样式 */ 
              
            },
            "iconStyle": {                       /* 非必要 节点icon样式 */
              
            },
            "iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
            "nameDescribe": "工程的一个子项目",           /* 非必要 气泡内容 */   
          },],
          edges: [{
            "dst_input_idx": 0,
            "dst_node_id": 2,
            "id":1,
            "src_node_id":1,
            "src_output_idx":0,
            "style":{},
            "value":10,
          },
          {
            "dst_input_idx": 0,
            "dst_node_id": 3,
            "id":2,
            "src_node_id":2,
            "src_output_idx":0,
            "style":{},
            "value":12,
          },
          {
            "dst_input_idx": 0,
            "dst_node_id": 4,
            "id":3,
            "src_node_id":2,
            "src_output_idx":1,
            "style":{},
            "value":8,
          },
          {
            "dst_input_idx": 0,
            "dst_node_id": 5,
            "id":4,
            "src_node_id":2,
            "src_output_idx":2,
            "style":{},
            "value":10,
          },
          {
            "dst_input_idx": 0,
            "dst_node_id": 6,
            "id":5,
            "src_node_id":5,
            "src_output_idx":0,
            "style":{},
            "value":10,
          },
           {
            "dst_input_idx": 0,
            "dst_node_id": 7,
            "id":6,
            "src_node_id":3,
            "src_output_idx":0,
            "style":{},
            "value":13,
          },
          {
            "dst_input_idx": 1,
            "dst_node_id": 7,
            "id":6,
            "src_node_id":4,
            "src_output_idx":0,
            "style":{},
            "value":4,
          },
          ]
        },
        // 以下为拖拽方式添加节点必须内容
        busValue: {
          value: "name",
          pos_x: 100,
          pos_y: 100
        },
        // 监听的事件
        onkeydown: null,
        // 复制的内容
        copyContent: [],
      };
    },
    created () {
      //this.loadJSON()
      this.onkeydown = document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 'c') {
          // 按下ctrl + c
          this.ctrlC()
        } else if (e.ctrlKey && e.key === 'v') {
          // 按下ctrl + v
          this.ctrlV()
        }
      })
    },
    mounted () {
    },
    beforeUnmount () {
      this.onkeydown = null // 销毁事件
    },
    methods: {
    generate () { // 生成随机图
      const nodesNumber = this.formDetail.form.nodes || 100; // 节点数量
      const sidesNumber = this.formDetail.form.sides || 100; // 边的数量
      const GRAPH_WIDTH = (nodesNumber > 100 ? nodesNumber : 100) * 10; // 图的宽度
      const GRAPH_HEIGHT = (nodesNumber > 100 ? nodesNumber : 100) * 10; // 图的高度
      const newGraphNodes = [];
      const newGraphSides = [];
      this.yourJSONDataFillThere = {
        nodes: [],
        edges: []
      }
      // step1 生成节点
      const generatePosition = () => { // 生成坐标
        const PosX = (Math.random() * GRAPH_WIDTH).toFixed();
        const PosY = (Math.random() * GRAPH_HEIGHT).toFixed();
        return {
          pos_x: Number(PosX),
          pos_y: Number(PosY)
        }
      }
      for (let nodeIndex = 0; nodeIndex < nodesNumber; nodeIndex++) {
        const eachGraphNode = {
          "id": nodeIndex + 1,
          "in_ports": [0],
          "name": `NODE_${nodeIndex}`,
          "out_ports": [0],
          "detail": [],
          ...generatePosition()
        }
        newGraphNodes.push(eachGraphNode);
      }
      this.yourJSONDataFillThere.nodes = newGraphNodes
      // step2 生成边 因为id是有序的,所以这里id范围根据节点生成
      const generateNodeEntry = (nodesMax) => { return (Math.random() * nodesMax).toFixed(); }
      for (let sideIndex = 0; sideIndex < sidesNumber; sideIndex++) {
        const eachSide = {
          "dst_input_idx": 0,
          "dst_node_id": Number(generateNodeEntry(nodesNumber)) || 1,
          "id": sideIndex + 1,
          "src_node_id": Number(generateNodeEntry(nodesNumber)) || 1,
          "src_output_idx": 0,
          "edgesText": ""
        }
        if (eachSide.dst_node_id !== eachSide.src_node_id) {
          newGraphSides.push(eachSide);
        }
      }
      this.yourJSONDataFillThere.edges = newGraphSides
      console.log(JSON.stringify(this.yourJSONDataFillThere, null, 4))
    },
    autoLayout () { // 自动布局
      const allSidesArr = this.yourJSONDataFillThere.edges.map(i => [i.src_node_id, i.dst_node_id]); // [[1,2], [2,3]]
      const connectTest = (a, b) => { // 测试关联 [1, 2], [2, 3]
        if (a[0] === b[1] || b[0] === a[1] || a[0] === b[0] || a[1] === b[1]) {
          return true
        } else {
          return false
        }
      }
      let arrSeparate = [[allSidesArr.shift()]];
      const testArr = (allSidesArr) => { // 递归检测连线的关系,把有关联的连线放在一起
        for (let i = 0; i < arrSeparate[arrSeparate.length - 1].length; i++) {
          for (let j = 0; j < allSidesArr.length; j++) {
            if (connectTest(arrSeparate[arrSeparate.length - 1][i], allSidesArr[j])) { // 建立关联,放入分组
              arrSeparate[arrSeparate.length - 1] = arrSeparate[arrSeparate.length - 1].concat(allSidesArr.splice(j, 1));
              testArr(allSidesArr) // 递归
              return false;
            }
          }
        }
        // 循环完毕仍然有数据的话, 放入第二个数组
        if (allSidesArr.length) {
          arrSeparate.push(allSidesArr.shift());
          testArr(allSidesArr);
        }
      }
      testArr(allSidesArr)
      console.log("整理好的数据", arrSeparate)
      // while (arrSeparate.length) { // 递归画所有的关系图
      //   this.drawSingleGraph(arrSeparate.shift());
      // }
      this.drawSingleGraph(arrSeparate.shift()); // 先画一个
    },
    unique (arr) { // 数组去重
      return Array.from(new Set(arr))
    },
    draw(nodesIdArr) {
      const CANVAS_WIDTH = 1440;
      const EACH_LEVEL_HIGH = 300;
      this.yourJSONDataFillThere.nodes.map(v => {
        v.pos_x = -1000;
        v.pox_y = 0;
      })
      nodesIdArr.forEach((row, rowIndex) => {
        row.map((curId, curIndex) => {
          const aim = this.yourJSONDataFillThere.nodes.find(v => v.id === curId);
          aim.pos_x = (CANVAS_WIDTH / row.length + 1) * (curIndex + 1);
          aim.pos_y = EACH_LEVEL_HIGH * (rowIndex + 1);
        })
      })
    },
    ctrlC () {
      let currentChoice = this.$refs.DAGBoard.choice
      if (currentChoice.index > -1) { // 有选中元素
        let activeNodes = this.yourJSONDataFillThere.nodes.filter(item => currentChoice.paneNode.indexOf(item.id) > -1)
        this.copyContent = JSON.parse(JSON.stringify(activeNodes))
        this.copyContent.forEach(item => {
          item.id = item.id + this.yourJSONDataFillThere.nodes.length + 100 // 自定义id规范 这里随便写个长度+100作为id
          item.pos_x += (100 / (sessionStorage['svgScale'] || 1))
          item.pos_y += (100 / (sessionStorage['svgScale'] || 1))
        })
      }
    },
    ctrlV () {
      if (!this.copyContent.length) return false
      this.yourJSONDataFillThere.nodes.push(...this.copyContent)
      this.$refs.DAGBoard.choice = {
        paneNode: [], // 选取的节点下标组
        index: -1,
        point: -1
      }// 复制完成 取消选中状态
      this.copyContent = []
    },
    updateDAG (data, action, id) {
      this.$emit("updateDAG", data)
      console.log(...arguments)
      console.log(JSON.stringify(arguments[0]))
      switch (action) {
        case 'selectNode':
          this.showNodeDetails(data.nodes.find(item => item.id === id))
          break;
        default: () => { }
      }
    },
    editNodeDetails () {
      console.log(...arguments)
    },
    doSthPersonal () {
      console.log(...arguments)
    },
    loadJSON () {
      // 这里可以跟服务端交互获取数据
      setTimeout(() => {
        this.yourJSONDataFillThere = JSONFromService
      }, 500);
    },
    /**
     * 通过拖拽方式加入新节点必须的函数
     */
    startNodesBus (e) {
      /**
       *  别的组件调用时, 先放入缓存
       * dragDes: {
       *    drag: true,
       *    name: 组件名称
       *    type: 组件类型
       *    model_id: 跟后台交互使用
       * }
       **/
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y,
          value: dragDes.name
        });
        this.dragBus = true;
      }
    },
    moveNodesBus (e) {
      // 移动模拟节点
      if (this.dragBus) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y
        });
      }
    },
    endNodesBus (e) {
      // 节点放入svg
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag) {
        const pos_x =
          (e.offsetX - 90 - (sessionStorage["svg_left"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const pos_y =
          (e.offsetY - 15 - (sessionStorage["svg_top"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        delete dragDes.drag
        const params = {
          model_id: sessionStorage["newGraph"],
          desp: {
            pos_x,
            pos_y,
            name: this.busValue.value,
            ...dragDes
          }
        };
        this.yourJSONDataFillThere.nodes.push({
          ...params.desp,
          id: this.yourJSONDataFillThere.nodes.length, // 这里注意, 新增的id一定不能重复, 建议id交由后端处理
          in_ports: [0],
          out_ports: [0]
        })
      }
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    },
    dragIt (val) {
      val.form.createTime = new Date().toDateString()
      sessionStorage["dragDes"] = JSON.stringify({
        drag: true,
        ...val
      });
    },
    /**
     * 右侧form展示逻辑
     */
    showNodeDetails (val) { // 展示选中的节点
      const { id, form } = val
      if (!form) return
      this.formDetail = {
        currentEditNodeId: id,
        form: Object.assign(this.formDetail.form, form, {})
      }
    },
    onSubmit () { // 更新所选节点的信息
      const { currentEditNodeId, form } = this.formDetail
      this.yourJSONDataFillThere.nodes.map(item => {
        if (item.id === currentEditNodeId) {
          item.form = form
        }
      })
      let _data = this.yourJSONDataFillThere.nodes.find(item => item.id === currentEditNodeId).form
      let str = JSON.stringify(_data, null, 4)
      alert('节点信息更新完成' + str)
    }
  }
}

export const JSONFromService = { "edges": [{ "src_node_id": 100, "src_output_idx": 0, "dst_node_id": 101, "dst_input_idx": 0, "id": 10 }], "nodes": [{ "pos_x": 323.50000000000034, "pos_y": 117.00000000000011, "name": "服务端拿取的数据", "iconClassName": "el-icon-collection-tag", "form": { "details": "普通节点的内容balabala", "createTime": "Wed Apr 29 2020" }, "id": 100, "in_ports": [0], "out_ports": [0] }, { "pos_x": 198.75000000000023, "pos_y": 271.0000000000002, "name": "普通节点", "iconClassName": "el-icon-collection-tag", "form": { "details": "普通节点的内容balabala", "createTime": "Wed Apr 29 2020" }, "id": 101, "in_ports": [0], "out_ports": [0] }] }
export const nodesBasic = [{
    name: '普通节点',
    iconClassName: 'el-icon-collection-tag',
    form: { details: '普通节点的内容balabala', createTime: '' }
}, {
    name: '动态节点',
    iconClassName: 'el-icon-loading',
    form: { details: '动态节点的内容balabala', createTime: '' }
}, {
    name: '自定义节点',
    form: { details: '自定义节点的内容balabala', createTime: '' },
    iconClassName: 'el-icon-magic-stick',
    nodeStyle: {
        "border": "2px solid orange",
        "border-radius": 0,
        "height": "40px"
    },
    iconStyle: {
        "background": "orange"
    }
}, {
    name: '拖入右侧',
    form: { details: '节点内容自由编辑', createTime: '' }
}]
</script>

<style>

</style>
