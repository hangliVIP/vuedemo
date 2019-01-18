import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import VeeValidate from 'vee-validate';
import Home from "../components/Home";

Vue.use(VeeValidate);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }

  ]
})
