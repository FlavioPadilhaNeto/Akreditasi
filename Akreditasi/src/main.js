import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import Loading from "components/lib/loading";
import CenterContainer from "components/lib/center-container";
import './registerServiceWorker'
import AkreditasiDashboard from './plugins/akreditasi-dashboard'

Vue.config.productionTip = false

Vue.component("loading", Loading);
Vue.component("center-container", CenterContainer);

Vue.use(AkreditasiDashboard)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
