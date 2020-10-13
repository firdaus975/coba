
import { BASE_API_URL } from '../../utils/constant-config'
import axios from 'axios'
axios.defaults.baseURL = BASE_API_URL

export default {
    namespaced: true,
    state: () => ({
        id: localStorage.getItem('user_id') || null,
        name: localStorage.getItem('user_name') || null,
    }),
    getters: {
        getUserId(state) {
            return state.id
        },
        getUserName(state) {
            return state.name
        },
        loggedIn(state) {
            return state.id != null
        }
    },
    mutations: {
        addUser(state, data) {
            state.id = data.id
            state.name = data.name
        },
        deleteUser(state) {
            state.id = null
            state.name = null
        }
    },
    actions: {
        login(context, username) {
            context.dispatch('progress/updateProgress', true, { root: true })
            return new Promise((resolve, reject) => {
                axios.post('/user/login', {
                    name: username
                }).then(response => {
                    const data = response.data
                    if (data.data && data.data != null) {
                        localStorage.setItem('user_id', data.data.id)
                        localStorage.setItem('user_name', data.data.name)
                        context.commit('addUser', data.data)
                        context.dispatch('progress/updateProgress', false, { root: true })
                        resolve('Login successfuly!')
                    }
                    context.dispatch('progress/updateProgress', false, { root: true })
                    reject(data.message)
                }).catch(error => {
                    context.dispatch('progress/updateProgress', false, { root: true })
                    reject(error)
                })
            })

        },
        register(context, username) {
            context.dispatch('progress/updateProgress', true, { root: true })
            return new Promise((resolve, reject) => {
                axios.post('/user/register', {
                    name: username
                }).then(response => {
                    if (response.data.data && response.data.data != null) {
                        context.dispatch('progress/updateProgress', false, { root: true })
                        resolve('Registration is successful, please log in here!')
                    }
                    context.dispatch('progress/updateProgress', false, { root: true })
                    reject(response.data.message)
                }).catch(error => {
                    context.dispatch('progress/updateProgress', false, { root: true })
                    reject(error)
                })
            })
        },
        logout(context) {
            localStorage.removeItem('user_id')
            localStorage.removeItem('user_name')
            context.commit('deleteUser')
        }
    }
}
