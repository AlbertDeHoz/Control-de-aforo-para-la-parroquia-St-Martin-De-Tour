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
        username: null,

        userId:{
            idNumber:null,
            idType:null,
        },
        userEnabled: null,
        userBirth: null,

        attendanceMax: null
    },
    getters: {
        role: state => state.role,
        userId: state => state.userId,
        token: state => state.token,
        userEnabled: state => state.userEnabled,
        userBirth: state => state.userBirth,
        username: state => state.username,
        attendanceMax: state => state.attendanceMax
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
        SET_USER_BIRTH(state, userBirth){
            state.userBirth = userBirth
        },
        SET_ROLE(state,Role){
            state.role = Role
        },
        SET_USERNAME(state,username){
            state.username = username
        },
        SET_ATTENDANCEMAX(state,attendanceMax){
            state.attendanceMax = attendanceMax
        }
    },
    actions:{
        KEEP_USERTOKEN({commit}, pToken){
            commit('SET_TOKEN',pToken);
            const tokenDecode = jwtDecode(pToken);
            commit('SET_ENABLE',tokenDecode.enable);
            commit('SET_USER_BIRTH',tokenDecode.birth);
            commit('SET_USERNAME',tokenDecode.name);
        },
        KEEP_ENABLED({commit},enable){
            commit('SET_ENABLE',enable);
        },
        KEEP_USERID({commit}, userId){
            commit('SET_USERID',userId);
        },
        KEEP_USERBIRTH({commit}, userBirth){
            commit('SET_USER_BIRTH',userBirth)
        },
        KEEP_ROLE_AND_TOKEN({commit},Token){
            const tokenDecode = jwtDecode(Token)
            commit('SET_TOKEN',Token)
            commit('SET_ROLE',tokenDecode.role)
        },
        KEEP_USERNAME({commit},username){
            commit('SET_USERNAME',username)
        },

        KEEP_ATTENDANCEMAX({commit},attendanceMax){
            commit('SET_ATTENDANCEMAX',attendanceMax)
        }
    },
    
})