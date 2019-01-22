import Vue from "vue@2.9.6";
import Vuex from ""

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    LoginUser :sessionStorage.getItem('LoginUser')? JSON.parse(sessionStorage.getItem('LoginUser')):null
  },
  mutations:{
    initUser(state,payload){
      if (state!=null) {
        state.LoginUser = payload;
      }
    }
  },
  action:{}
});
