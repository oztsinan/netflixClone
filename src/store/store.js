import Vue from "vue";
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import axios from 'axios'


Vue.use(Vuex,VueResource)

export const store = new Vuex.Store({
    state : {
        cardSound : true,
        firebaseData : [],
        bigVideoPlayerControl : true,
        currentTime : 0,
        aktifPopupİcerik : {},
        popupNextVideoSecond : null,
        cardCounter : null,
        cardInterval : null,
        popup : false,
        searchValue : '',
        listeyeEklenenler : [],
        begenilenIcerikler : [],
        begenilmeyenIcerikler : [],
        rightclickcounterStore : 0,
        token : "",
        fbAPIKey : "AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA",
        baslangicEmail : null,
        userEmail : null,
        userLocalID  :null,

    },
    getters : {
        getFirebaseData(state){
            return state.firebaseData
        },
        getFirebaseDataLength(state){
            return state.firebaseData.length
        },
        getBigVideoPlayerControl(state){
            return state.bigVideoPlayerControl
        },
        getTokenIdLength(state){
            return state.token.length
        }

    },
    mutations : {
        setFirebaseData(state,value){
            state.firebaseData.push(value)
        },
        setBigVideoPlayerControl(state,value){
            state.bigVideoPlayerControl = value
        },
        setCurrentTime(state,value){
            state.currentTime = value
        },
        setAktifPopup(state,value){
            state.aktifPopupİcerik = value
        },
        setPopupInterval(state,value){
            state.popupInterval = value
        },
        setPopupCounter(state,value){
            state.popupCounter = value
        },
        clearToken(state){
            state.token = ""
        }

    },
    actions : {
        login({commit,dispatch,state},authData){
            let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
            if( authData.loginKontrol){ //kayıtol
                authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
            }

            axios.post(
                authLink+"AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA",
                { email: authData.email , password: authData.password , returnSecureToken : true}        
            ).then(response =>{
                console.log(response);
            })
        },
        logout({commit,dispatch,state}){

        }
    }
})