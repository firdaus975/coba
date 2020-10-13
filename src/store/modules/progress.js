
export default {
    namespaced: true,
    state: () => ({
        isLoading: false
    }),
    getters: {
        getProgress(state) {
            return state.isLoading
        }
    },
    mutations: {
        updateProgress(state, value) {
            state.isLoading = value
        }
    },
    actions: {
        updateProgress(context, value) {
            context.commit('updateProgress', value)
        }
    }
}

