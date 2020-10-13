
import { BASE_API_URL } from '../../utils/constant-config'
import axios from 'axios'
import clean from 'lodash-clean'

axios.defaults.baseURL = BASE_API_URL

export default {
    namespaced: true,
    state: () => ({
        languages: [],
        twoslashes: [],
        codes: [],
        loading: false
    }),
    getters: {
        getLanguages(state) {
            return state.languages
        },
        getTwoslashes(state) {
            return state.twoslashes
        }
    },
    mutations: {
        addLanguages(state, data) {
            state.languages = data
        },
        addTwoslashes(state, data) {
            state.twoslashes = data
        },
        addCodes(state, codes) {
            state.codes = codes
        }
    },
    actions: {
        retrieveOptions(context) {
            context.dispatch('progress/updateProgress', true, { root: true })
            axios.get('/options')
                .then(response => {
                    if (response.data.data != null) {
                        context.commit('addLanguages', response.data.data.languages)
                        context.commit('addTwoslashes', response.data.data.twoslashes)
                        context.dispatch('progress/updateProgress', false, { root: true })
                    }
                    context.dispatch('progress/updateProgress', false, { root: true })
                })
                .catch(error => {
                    context.dispatch('progress/updateProgress', false, { root: true })
                    console.log(error)
                })
        },
        storeCode(context, data) {
            const content = clean({
                code: data.code,
                lang: data.lang,
                highlight: data.highlight,
                fileName: data.fileName,
                twoslash: data.twoslash
            })
            const formData = {
                user: context.rootGetters['user/getUserId'],
                content: content
            }
            return new Promise((resolve, reject) => {
                axios.post('/code/store', formData)
                    .then(response => {
                        if (response.data) {
                            resolve(response.data.data)
                        }
                        reject(response.message)
                    }).catch(error => {
                        reject(error)
                    })
            })
        },
        getSingleCode(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/code/single/?highlighted=${data.isHighlighted}`, {
                    id: data.id,
                    user: data.user
                }).then(response => {
                    if (response.data) {
                        resolve(response.data.data)
                    }
                    reject(response.message)
                }).catch(error => reject(error))
            })
        },
        async geListCode(context) {
            context.dispatch('progress/updateProgress', true, { root: true })
            const url = `/code/list?highlighted=1`
            await axios.post(url, { user: context.rootGetters['user/getUserId'] })
                .then(response => {
                    if (response.data.data) {
                        context.commit('addCodes', response.data.data)
                    }
                }).catch(error => {
                    console.log(error)
                })
            context.dispatch('progress/updateProgress', false, { root: true })
        }

    }
}