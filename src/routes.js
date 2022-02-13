import Home from "./components/mainRouter/Home"
import Diziler from './components/mainRouter/Diziler'
import Filmler from './components/mainRouter/Filmler'
import Listem from './components/mainRouter/Listem'
import YenivePopuler from './components/mainRouter/YenivePopuler'
import Popup from './components/Popup'
import Player from './components/mainRouter/Player'
import HomeAfter from './components/HomeAfter'
import Search from './components/mainRouter/Search'
import Genre from './components/mainRouter/Genre'
import Login from './components/Login'

import { store } from './store/store'


export const routes = [
    { path : '/' , component : HomeAfter },
    { path:'/login' , component : Login},
    { path : '/browse' , component : Home, beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '/browse/diziler' , component : Diziler , name : 'diziler', beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '/browse/listem' , component : Listem , beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '/browse/filmler' , component : Filmler , beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '/browse/yenivepopuler' , component : YenivePopuler  , beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '/popup' , component : Popup , beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '/watch' , component : Player , beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '/search' , component : Search , name : 'search' , beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '/genre' , component : Genre , beforeEnter(to, from, next){
        if(store.getters['getTokenIdLength'] > 10){
            next()
        }else{
            next('/login')
        }
    }},
    { path : '*' , redirect : "/"}
]