import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import code from './modules/code'
import progress from './modules/progress'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        code,
        progress
    }
})

