import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
    userId: 4
}

const mutations={
    setUserId(state, userId){//aaNumber名称随意起
        state.userId = userId
    },
}
const getters={
    getUserId(state){
        return state.userId
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
