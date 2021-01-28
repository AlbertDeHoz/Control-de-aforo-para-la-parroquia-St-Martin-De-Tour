import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        token:null,
        title: 'soy un titulo de vuex',
        userId: -1,
        userEnabled: null,
        userSend: null
    },
    getters: {
        title: state => state.title,
        userId: state => state.userId,
        token: state => state.token,
        userEnabled: state => state.userEnabled,
        isUserAbleToSend: state => state.userEnabled===null?true:false  // si el usuario ya envió el formulario, no podrá volverlo a enviar
    },
    mutations:{
        SET_TOKEN(state, token){
            state.token = token;
        },
        SET_USERID(state,userid){
            state.userId = userid;
        },


    },
    actions:{
        KEEP_USERTOKEN({commit}, pToken){
            commit('SET_TOKEN',pToken)
        },

        GET_USERID({commit}, userId){
            commit('SET_USERID',userId)
        },
    },
    
})