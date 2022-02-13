<template>
  <div id="app">   
    <app-popup id="popup"></app-popup>
    <app-header id="header"></app-header> 
    <transition name="fade" mode="out-in">
      <router-view v-if="veriKontrol"></router-view>
    </transition>
  </div>
</template>

<script>
import appHeader from "./components/Header.vue";
import appPopup from './components/Popup.vue'
import appFooter from './components/Footer.vue'
import axios from 'axios'

export default {
  components: {
    appHeader,appPopup,appFooter
  },
  data(){
    return{
      veriKontrol : true,
      anaKontrol : true,
    }
  },
  created(){
        axios.get('/data.json')
            .then((response)=>{
              var data = response.data
                for(let key in data){
                    this.$store.commit('setFirebaseData',data[key])
                }   
            })

    let token = localStorage.getItem('token')
    let email = localStorage.getItem('userEmail')
    let localID = localStorage.getItem('localId')
    if(token){
      this.$store.state.token = token
      this.$store.state.userEmail = email
      this.$store.state.userLocalID = localID

      axios.get('/userData/'+this.$store.state.userLocalID+'/list.json')
          .then((response)=>{
            this.$store.state.listeyeEklenenler = response.data
      })
      axios.get('/userData/'+this.$store.state.userLocalID+'/like.json')
          .then((response)=>{
            this.$store.state.begenilenIcerikler = response.data
      })
      axios.get('/userData/'+this.$store.state.userLocalID+'/dislike.json')
          .then((response)=>{
            this.$store.state.begenilmeyenIcerikler = response.data
      })

    if(this.$route.path == '/login' || this.$route.path == '/'){
      this.$router.push('/browse')
    }

    }


  },
  watch : {
    "$route"(gelenVeri){
      if(gelenVeri.path == '/browse/diziler'){
        document.title = 'Diziler - Netflix'
      }else if(gelenVeri.path == '/browse/filmler'){
        document.title = 'Filmler - Netflix'
      }else if(gelenVeri.path == '/browse/listem'){
        document.title = 'Listem - Netflix'
      }else if(gelenVeri.path == '/browse'){
        document.title = 'Anasayfa - Netflix'
      }else if(gelenVeri.path == '/browse/yenivepopuler'){
        document.title = 'Yeni ve Popüler - Netflix'
      }
    },
    "$store.state.popup"(){
      this.anaKontrol = this.$store.state.popup
    },
    "$store.state.listeyeEklenenler"(gelenveri){
      axios.put('/userData/'+this.$store.state.userLocalID+'/list.json',gelenveri)
            .then((response)=>{
              console.log(response);
      })
    },
    "$store.state.begenilenIcerikler"(gelenveri){
      axios.put('/userData/'+this.$store.state.userLocalID+'/like.json',gelenveri)
            .then((response)=>{
              console.log(response);
      })     
    },
    "$store.state.begenilmeyenIcerikler"(gelenveri){
      axios.put('/userData/'+this.$store.state.userLocalID+'/dislike.json',gelenveri)
            .then((response)=>{
              console.log(response);
      })     
    }
  }
};
</script>

<style>



#app{
 -webkit-user-select: none;
 
}

body {
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: sans-serif;
}

#header {
  z-index: 4;
}

#popup{
  position: fixed;
  width: 100%;
  z-index: 5;
}

.activeHeader{
  display: none;
}

.fade-enter{
    opacity: 0;
}

.fade-enter-active{

    transition: opacity 0.5s;;
}

.fade-leave{

}

.fade-leave-active{
    opacity: 0;
    transition: opacity 0.5s;
}





</style>
