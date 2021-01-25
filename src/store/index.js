import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        token:null,
        title: 'soy un titulo de vuex',
        user:'proof'
    },
    getters: {
        title: state => state.title,
        user: state => state.user
    },
    mutations:{
        setToken(state, token){
            state.token = token;
        }
    },
    actions:{

    },
    
})