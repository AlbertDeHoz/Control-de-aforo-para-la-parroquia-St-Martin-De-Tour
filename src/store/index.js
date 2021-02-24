import jwtDecode from 'jwt-decode';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        /**
         * para usuarios administradores
         */
        token:null,
        role: null,

        userId: null,
        userIdType: null,
        userEnabled: null,
        userBirth: null,
    },
    getters: {
        role: state => state.role,
        userId: state => state.userId,
        token: state => state.token,
        userEnabled: state => state.userEnabled,
        userIdType: state => state.userIdType,
        userBirth: state => state.userBirth
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
        },
        SET_USER_BIRTH(state, userBirth){
            state.userBirth = userBirth
        },
        SET_ROLE(state,Role){
            state.role = Role
        }
    },
    actions:{
        KEEP_USERTOKEN({commit}, pToken){
            commit('SET_TOKEN',pToken);
            const tokenDecode = jwtDecode(pToken);
            commit('SET_ENABLE',tokenDecode.enable);
            commit('SET_USER_BIRTH',tokenDecode.birth);
        },
        KEEP_ENABLED({commit},enable){
            commit('SET_ENABLE',enable);
        },
        KEEP_USERID({commit}, userId){
            commit('SET_USERID',userId.idNumber);
            commit('SET_USER_IDTYPE',userId.idType)
        },
        KEEP_USERBIRTH({commit}, userBirth){
            commit('SET_USER_BIRTH',userBirth)
        },
        KEEP_ROLE_FROM_TOKEN({commit},Token){
            const tokenDecode = jwtDecode(Token)
            commit('SET_ROLE',tokenDecode.role)
        }
    },
    
})