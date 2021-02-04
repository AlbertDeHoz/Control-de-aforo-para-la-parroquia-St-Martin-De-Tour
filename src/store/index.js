import jwtDecode from 'jwt-decode';
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
        //isUserAbleToSend: state => state.userEnabled===null?true:false  // si el usuario ya envió el formulario, no podrá volverlo a enviar
    },
    mutations:{
        SET_TOKEN(state, token){
            state.token = token;
        },
        SET_USERID(state,userid){
            state.userId = userid;
        },
        SET_ENABLE(state, enable){
            state.userEnabled = enable;
        },
    },
    actions:{
        KEEP_USERTOKEN({commit}, pToken){
            commit('SET_TOKEN',pToken);
            const tokenDecode = jwtDecode(pToken);
            console.log(tokenDecode)
            console.log(tokenDecode.enable)
            commit('SET_ENABLE',tokenDecode.enable);
        },
        KEEP_ENABLED({commit},enable){
            commit('SET_ENABLE',enable)
        },
        KEEP_USERID({commit}, userId){
            commit('SET_USERID',userId);
        },
    },
    
})