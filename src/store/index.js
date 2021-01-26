import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        token:null,
        title: 'soy un titulo de vuex',
        userId: null,
        username:''
    },
    getters: {
        title: state => state.title,
        userId: state => state.userId
    },
    mutations:{
        setToken(state, token){
            state.token = token;
        },
        SET_USERNAME(state,username){
            state.username = username;
        },
        SET_USERID(state,userId){
            state.userId = userId
        }
    },
    actions:{
       //async GET_USERNAME({commit}, pk){
       //    const res = await fetch(`http://localhost:3000/api/user/`);
       //    const username = await res.json();
       //    
       //    commit('SET_USERNAME',username)
       //},
        GET_USERID({commit}, userId){
            commit('SET_USERID',userId)
        }
    },
    
})