import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/iconfont.css'
import './assets/static/font/iconfont.css'
import './components/three'
import './assets/css/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Cell, CellGroup, Image, Lazyload, Field, NavBar, 
  Toast, Button, Row, Col, DatetimePicker,Picker ,Popup, Switch,
  RadioGroup, Radio, Grid, GridItem, Panel, List, Icon, Divider,TreeSelect,Collapse, 
  CollapseItem ,Tab, Tabs,Rate, Tabbar, TabbarItem } from 'vant';

Vue.use(Cell).use(CellGroup).use(Image).use(Lazyload).use(Field).use(NavBar)
.use(Toast).use(Button).use(Row).use(Col).use(DatetimePicker).use(Popup)
.use(Switch).use(RadioGroup).use(Radio).use(Grid).use(GridItem).use(Panel)
.use(List).use(Icon).use(Divider).use(TreeSelect).use(Collapse).use(CollapseItem)
.use(Picker).use(Tab).use(Tabs).use(Rate).use(Tabbar).use(TabbarItem).use(MintUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
