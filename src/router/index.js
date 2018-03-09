import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import test from '@/components/test'
import test2 from '@/components/test2'
import test_a from '@/components/test_a'
import test_b from '@/components/test_b'
import Socket from '@/components/Socket'

Vue.use(Router)

const routes = [{
    path: '/',
    component: Hello
}, {
    path: '/test',
    component: test,
    children: [{
        path: 'test_a',
        component: test_a
    }, {
        path: 'test_b',
        component: test_b,
    }]
}, {
    path: '/test2',
    component: test2,
}, {
    path: '/Socket',
    component: Socket,
}, ]



export default new Router({
    routes
})
