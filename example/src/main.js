import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import _ from 'lodash';
import App from './App.vue';

Vue.use(ElementUI);

// 异步导入模块
import ('./second-chunk').then((data)=>{
    console.log('==async=',data);
});

const chunkList = _.chunk(['a', 'b', 'c', 'd'], 2);
console.log('index page 1',chunkList);

new Vue({
    el: '#root',
    render: h => h(App)
});
