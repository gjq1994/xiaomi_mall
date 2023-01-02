import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
    state: {
        username: '',
        userList: '',
        data: 0,
        num: 0
    },
    getters: {
        hitState(state) {
            return `花Q ${state.username}`
        }
    },
    mutations: {
        setNumber(state, n) {
            state.num = n
        },
        setUser(state, user) {
            state.username = user
        },
        setUserList(state, list) {
            state.userList = list
        },
        setMyData(state, n) {
            state.data = n
        },
        clear(state) {
            state.username = ''
            state.userList = ''
            state.data = 0
            state.num = 0
        }
    },
    actions: {
        setUserName(content, user) {
            content.commit('setUser', user)
        },
        setList(content, list) {
            content.commit('setUserList', list)
        },
        setData(content, num) {
            content.commit('setMyData', num)
        },
        clear(content) {
            content.commit('clear')
        },
        setNum(content) {
            return new Promise(resolve => {
                setTimeout(() => {
                    content.commit('setNumber', Math.random())
                    resolve()
                }, 1000)
            })
        }
    }
})