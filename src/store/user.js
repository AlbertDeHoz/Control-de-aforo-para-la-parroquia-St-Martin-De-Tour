'use strict'

export default {
    state:{
        token:null,
        username: null,
        userId:{
            idType:null,
            idNumber:null,
        },
        userEnabled: null,
        userBirth: null,
    },
    getters:{
        token: state => state.token,
        userId: state => state.userId,
        userEnabled: state => state.userEnabled,
        userBirth: state => state.userBirth,
        username: state => state.username,
    },
    mutation:{
        SET_USERID(state,userid){
            state.userId = userid;
        },
        SET_ENABLE(state, enable){
            state.userEnabled = enable;
        },
        SET_USER_BIRTH(state, userBirth){
            state.userBirth = userBirth
        },
        SET_USERNAME(state,username){
            state.username = username
        },
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
        KEEP_USERNAME({commit},username){
            commit('SET_USERNAME',username)
        },
    }
    
}