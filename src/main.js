import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import DAGBoard from 'dag-board'


const app = createApp(App)
installElementPlus(app)
app.use(router).use(DAGBoard).mount('#app')