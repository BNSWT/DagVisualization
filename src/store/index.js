import { createStore } from 'vuex'

const dagModule = {
    state: {
        name: "name",
        id: 2,
        imgContent: "",
        pos_x: 300,
        pos_y: 400,
        type: 'constant',
        in_ports: [0, 1, 2, 3, 4],
        out_ports: [0, 1, 2, 3, 4]
    },
    mutations: {
        dragPre(e, i) {
            // 准备拖动节点
            this.setInitRect(); // 初始化画板坐标
            this.currentEvent = "dragPane"; // 修正行为
            this.choice.index = i;
            this.setDragFramePosition(e);
        },
        dragIng(e) {
            if (this.currentEvent === "dragPane") {
                this.setDragFramePosition(e);
                // 模拟框随动
            }
        },
        setDragFramePosition(e) {
            const x = e.x - this.initPos.left; // 修正拖动元素坐标
            const y = e.y - this.initPos.top;
            this.dragFrame = { posX: x - 90, posY: y - 15 };
        },
        dragEnd(e) {
            // 拖动结束
            if (this.currentEvent === "dragPane") {
                this.dragFrame = { dragFrame: false, posX: 0, posY: 0 };
                this.setPanePosition(e); // 设定拖动后的位置
            }
            if (this.currentEvent === "dragLink") {
                this.setDragLinkPostion(e);
            }
            this.currentEvent = null; // 清空事件行为
        },
        setPanePosition(e) {
            const x = e.x - this.initPos.left - 90;
            const y = e.y - this.initPos.top - 15;
            const i = this.choice.index;
            this.DataAll[i].translate = { left: x, top: y };
        },
        setInitRect() {
            let { left, top } = document
                .getElementById("svgContent")
                .getBoundingClientRect();
            this.initPos = { left, top }; // 修正坐标
        },
        linkPre(e, i) {
            this.setInitRect();
            this.currentEvent = "dragLink";
            this.choice.index = i;
            this.setDragLinkPostion(e, true);
            e.preventDefault();
            e.stopPropagation();
        },
        linkEnd(e, i) {
            if (this.currentEvent === "dragLink") {
                this.DataAll[this.choice.index].linkTo.push({ id: i });
                this.DataAll.find(item => item.id === i).parentNode = 1;
            }
            this.currentEvent = null;
        },
        setDragLinkPostion(e, init) {
            // 定位连线
            const x = e.x - this.initPos.left;
            const y = e.y - this.initPos.top;
            if (init) {
                this.dragLink = Object.assign({}, this.dragLink, {
                    fromX: x,
                    fromY: y
                });
            }
            this.dragLink = Object.assign({}, this.dragLink, { toX: x, toY: y });
        },
    }
}


export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: { dagModule }
})