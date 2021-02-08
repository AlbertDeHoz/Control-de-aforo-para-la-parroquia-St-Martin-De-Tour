import jwtDecode from 'jwt-decode';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        token:null,
        userId: -1,
        userIdType: null,
        userEnabled: null,
    },
    getters: {
        userId: state => state.userId,
        token: state => state.token,
        userEnabled: state => state.userEnabled,
        userIdType: state => state.userIdType
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
        SET_USER_IDTYPE(state,userIdType){
            state.userIdType = userIdType;
        }
    },
    actions:{
        KEEP_USERTOKEN({commit}, pToken){
            commit('SET_TOKEN',pToken);
            const tokenDecode = jwtDecode(pToken);
            console.log(tokenDecode);
            console.log(tokenDecode.enable);
            commit('SET_ENABLE',tokenDecode.enable);
        },
        KEEP_ENABLED({commit},enable){
            commit('SET_ENABLE',enable);
        },
        KEEP_USERID({commit}, userId){
            commit('SET_USERID',userId.idNumber);
            commit('SET_USER_IDTYPE',userId.idType)
        },
    },
    
})