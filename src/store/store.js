import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
    role: ""
}

const mutations={
    setRole(state, role){//aaNumber名称随意起
        console.log("setRole",role);
        state.role = role
    },
}
const getters={
    getRole: (state) => {
        return state.role
    }
}
const store=new Vuex.Store({
    state,
    getters,
    mutations
})
export default new Vuex.Store({
    state,
    mutations
  })
