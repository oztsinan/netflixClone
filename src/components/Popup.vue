<template>

<transition v-if="onOff" name="fade"  appear>
<div class="main" >
        <div class="overlay" >
            <div class="popupFrame" >
                <div class="popup" v-click-outside="onClickOutside" >
                    <div class="popupContent" >
                          <div class="popupContent-top">
                            <div class="video-top-info">
                                <div class="video-top-info-top">
                                    <router-link to="" class="video-top-info-top-close" tag="div" @click.native="closePopup"><p>x</p></router-link>
                                </div>
                                <div class="video-top-info-bottom">
                                    <div class="video-top-info-bottom-left">
                                        <div class="logo" style="margin-top:-2vw"><img :src="aktifData.logo" alt=""></div>
                                        <div class="button">
                                            
                                            <router-link :to="{ path: '/watch' , query : {id: aktifData.id} }"  tag="div"><div class="iconDiv-play" @click="playButtonF"><i :class="playButtonClass"></i><label>Oynat</label></div></router-link>
                                            <div class="iconDiv" @click="plusButtonf" ><i :class="listClass ? plusButtonClassActive : plusButtonClass" ></i></div>
                                            <div class="iconDiv" @click="likeButtonf" ><i :class="likeClass  ? likeButtonClassActive : likeButtonClass " ></i></div>
                                            <div class="iconDiv" @click="dislikeButtonf"><i :class="dislikeClass  ? dislikeButtonClassActive : dislikeButtonClass" ></i></div>

                                        </div>
                                    </div>
                                    <div class="video-top-info-bottom-right">
                                        <div  class="iconDiv" @click="soundControl" ><i :class="mutedControl ? mutedClass : mutedClassActive"></i></div>
                                    </div>
                                </div>


                            </div>


                            <div class="video-frame">
                                 <div class="video">
                                 <div class="videoShadow">
                                     <img src="https://i.ibb.co/LvLSd6G/shadow.png" alt="">
                                 </div>
                                <video id="videoPopup" ref="videoPopup" playsinline autoplay :current-time.prop="currentTime"   :src="aktifData.videosrc" :key="aktifData.videosrc" loop :muted="mutedControl"></video>
                            </div>
                            </div>

                        </div>


                        <div class="popupContent-info">

                            <div class="top-info">
                                <div class="top-info-left">
                                    <div class="infos">
                                        <p class="green"> {{aktifData.newAndDate}} </p>
                                        <p> {{aktifData.year}} </p>
                                        <p  class="age"> {{aktifData.age}} +</p>
                                        <p>{{aktifData.time}}</p>
                                        <p class="hd">{{aktifData.videoQuality}}</p>
                                    </div>

                                    <div class="aciklama"><p>{{aktifData.videoDescription}}</p></div>
                                </div>

                                <div id="top-info-kadro" class="top-info-right">
                                        <div class="oyuncu-kadrosu">
                                            <p><label class="title">Oyuncu Kadrosu:</label>  <label class="title-alt" :key="index" v-for="(item,index) in aktifData.oyuncuKadrosu"> <router-link @click.native="$store.state.popup = false" tag="a" :to="{path : '/genre' , query : { p : item}}" >{{item}}</router-link> <label v-if="index < oyuncuKadrosuLength">, </label> </label> </p> 
                                        </div>
                                        <div class="türler">
                                            <p><label class="title">Türler:</label>  <label class="title-alt" :key="index" v-for="(item,index) in aktifData.altKategoriler"> <router-link @click.native="$store.state.popup = false" tag="a" :to="{path : '/genre' , query : { p : item}}" >{{item}}</router-link> <label v-if="index < altKategorilerLength">, </label> </label> </p> 
                                        </div>
                                         <div class="bu-icerik">
                                            <p><label class="title">Bu içerik:</label>  <label class="title-alt" :key="index" v-for="(item,index) in aktifData.category"> <router-link @click.native="$store.state.popup = false" tag="a" :to="{path : '/genre' , query : { p : item}}" >{{item}}</router-link> <label v-if="index < categoryLength">, </label> </label> </p> 
                                        </div>
                                </div>
                            </div>

                            <div class="benzerleri">
                                <div class="benzerleri-title"><h1>Benzerleri</h1></div>

                               <div class="box-frame">
                                   <div class="boxbenzerleri" :key="item.id" v-for="item in filter()">
                                       
                                       
                                        <div class="boxbenzerleri-top-sure"><label>{{item.time}}</label></div>
                                        <div class="boxbenzerleri-top-shadow"><img src="https://i.ibb.co/vmWXfB7/benzerleri-shadow.png" alt=""></div>
                                        <div class="boxbenzerleri-top-image-hover" @click="boxBenzerleriPlay(item.id)"><div class="boxbenzerleri-top-image-hover-button"><i class="bi bi-play-fill"></i></div></div>
                                        
                                        <div class="boxbenzerleri-top-image">  <img :src="item.img" alt=""></div>
                                        

                                        <div class="boxbenzerleri-info-top">

                                        <div class="boxbenzerleri-info-top-left">
                                            <div><p class="age-benzerleri"> {{item.age}}+ </p></div>
                                            <div><p class="year-benzerleri"> {{item.year}} </p></div>
                                        </div>

                                        <div class="boxbenzerleri-info-top-right">
                                        <div style="color:white ;width:35px ; height:35px" class="iconDiv"  @click="plusButtonBenzerleri(item.id)" ><i :class="$store.state.listeyeEklenenler.includes(item.id) ? plusButtonClassActive : plusButtonClass" ></i></div>

                                        </div>

                                        </div>
                                    

                                    <div class="boxbenzerleri-info-aciklama">
                                        <p>{{item.videoDescription}}</p>
                                    </div>
                                       

                                   </div>
                               </div>



                            </div>

                            <div class="icerikHakkinda">
                                <p class="hakkinda-text"> <strong> {{aktifData.title}} </strong>  Hakkında</p>
                                <p class="digerinfolar">Yönetmen : <label :key="index" v-for="(item,index) in aktifData.yonetmen"><router-link @click.native="$store.state.popup = false" tag="a" :to="{path : '/genre' , query : { p : item}}" >{{item}}</router-link> <label v-if="index < yonetmenLength">, </label> </label> </p>
                                <p class="digerinfolar">Oyuncu Kadrosu : <label :key="index" v-for="(item,index) in aktifData.oyuncuKadrosu"> <router-link @click.native="$store.state.popup = false" tag="a" :to="{path : '/genre' , query : { p : item}}" >{{item}}</router-link> <label v-if="index < oyuncuKadrosuLength">, </label> </label>  </p>
                                <p class="digerinfolar">Senarist : <label :key="index" v-for="(item,index) in aktifData.senarist"> <router-link @click.native="$store.state.popup = false" tag="a" :to="{path : '/genre' , query : { p : item}}" >{{item}}</router-link> <label v-if="index < senaristLength">, </label>  </label>  </p>
                                <p class="digerinfolar">Türler : <label :key="index" v-for="(item,index) in aktifData.altKategoriler"> <router-link @click.native="$store.state.popup = false" tag="a" :to="{path : '/genre' , query : { p : item}}" >{{item}}</router-link> <label v-if="index < altKategorilerLength">, </label> </label>  </p>
                                <p class="digerinfolar">Bu film : <label :key="index" v-for="(item,index) in aktifData.category"> <router-link @click.native="$store.state.popup = false" tag="a" :to="{path : '/genre' , query : { p : item}}" >{{item}}</router-link> <label v-if="index < categoryLength">, </label> </label>  </p>
                                <p class="digerinfolar">Yetişkinlik Düzeyi : <label> {{aktifData.age}}  yaş ve üzeri için uygun</label>  </p>

                            </div>



                        </div>
                        
                    </div>
                </div>
            </div>
        </div>           

 
</div>
</transition>


</template>

<script>
import Vue from "vue";

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

export default {  
    data(){
        return{
            playButtonClass : "fas fa-play",
            plusButtonClass : "fas fa-plus",
            likeButtonClass : 'far fa-thumbs-up',
            dislikeButtonClass : "far fa-thumbs-down",
            mutedClass : "fas fa-volume-mute",
            mutedClassActive : "fas fa-volume-up",
            mutedControl : null,
            likeButtonClassActive : 'fas fa-thumbs-up',
            dislikeButtonClassActive : 'fas fa-thumbs-down',
            plusButtonClassActive : "fas fa-check",
            aktifData : {
                id : null,
                title : null,
                img : null,
                logo : null,
                videosrc : null,
                newAndDate : null,
                age : null,
                year : null,
                category : null,
                time : null,
                videoQuality : null,
                altKategoriler : null,
                videoDescription : null,
                yonetmen : null,
                oyuncuKadrosu : null,
                senarist : null,
                likeButton : null,
                dislikeButton : null,
                listeyeEklendi : null,
                populer : null,
                izlenilmeSayisi : null,
                type : null,
            },
            myVid : null,
            currentTime : null,
            oyuncuKadrosuLength : null,
            yonetmenLength : null,
            senaristLength : null,
            altKategorilerLength : null, 
            categoryLength : null,
            onOff : false,
            listClass : false,
            likeClass : false,
            dislikeClass : false,
            outsideCounter : 0,
            guncelListeyeEklenenler : null,
            benzerleriImageHover : false,
            boxBenzerleriCounter : 0

        }
    },
    methods : {
        soundControl(){
            this.$store.state.cardSound = !this.$store.state.cardSound
        },
        closePopup(){
            this.outsideCounter = 0
            this.$store.state.popup = false
            document.querySelector("#videoPopup").pause()
            this.$store.state.bigVideoPlayerControl = true
            this.currentTime = 0
        },
        plusButtonf(){
            this.listClass = !this.listClass
            var data = this.$store.state.listeyeEklenenler
            
            if(this.listClass == false){
                for(let i =0 ;i<data.length;i++){
                if(data[i] == this.aktifData.id){
                    data.splice(i,1)
                }
                }
            }else{
                this.$store.state.listeyeEklenenler.push(this.aktifData.id)
            }
        },
        likeButtonf(){
            if(this.dislikeClass == true){
                var data2 = this.$store.state.begenilmeyenIcerikler
                for(let i =0 ;i<data2.length;i++){
                if(data2[i] == this.aktifData.id){
                data2.splice(i,1)
                }
                }
            }


            var data = this.$store.state.begenilenIcerikler
            this.likeClass = !this.likeClass
            if(this.likeClass == false){
                for(let i =0 ;i<data.length;i++){
                if(data[i] == this.aktifData.id){
                    data.splice(i,1)
                }
                }
            }else{
                this.$store.state.begenilenIcerikler.push(this.aktifData.id)
                
            }
        },
        dislikeButtonf(){
            if(this.likeClass == true){
                var data2 = this.$store.state.begenilenIcerikler
                for(let i =0 ;i<data2.length;i++){
                if(data2[i] == this.aktifData.id){
                data2.splice(i,1)
        
                }
                }
            }

            var data = this.$store.state.begenilmeyenIcerikler
            this.dislikeClass = !this.dislikeClass
            if(this.dislikeClass == false){
                for(let i =0 ;i<data.length;i++){
                if(data[i] == this.aktifData.id){
                    data.splice(i,1)
                }
                }
            }else{
                this.$store.state.begenilmeyenIcerikler.push(this.aktifData.id)
                
            }
        },
        playButtonF(){
            this.$store.state.popup = false
            document.querySelector("#videoPopup").pause()
        },
        filter() {
            var icerikTitle = this.aktifData.title
            var kategori = this.aktifData.category
            var kategoriUzunluk = this.aktifData.category.length
            var database = this.$store.state.firebaseData

            for(let i=0;i<kategoriUzunluk;i++){
            
              var data = database.filter(function(value){
              for(let i =0;i<3 ; i++){
                if(value.category[i] == kategori[i]){
                  return value.category[i]
                }
              }
            })
            this.uzunluk = data.length
            var gonderilecekveri = this.uzunluk
            this.$emit("rowCount",gonderilecekveri)

            var datalast = []
            for(let i =0;i<data.length;i++){
                if(data[i].title == icerikTitle){

                }else{
                    datalast.push(data[i])
                }
            }

            return datalast;


            }




  


            /*
             if(veri == "altkategori"){
          if(type == "Film" || type == "Dizi"){
            var data = this.database.filter((item) => item.type == type);
              var datalast = data.filter(function(value){
              for(let i =0;i<3 ; i++){
                if(value.altKategoriler[i] == deger){
                  return value.altKategoriler[i]
                }
              }
            })


            this.uzunluk = datalast.length
            var gonderilecekveri = this.uzunluk
            this.$emit("rowCount",gonderilecekveri)

            return datalast;
        }
            }

            */
        },
        benzerleriClick(){
            this.$store.state.popup = false
        },
        plusButtonBenzerleri(gelenid){
            var data = this.$store.state.listeyeEklenenler
            if(data.includes(gelenid) == true){
                    for(let i =0 ;i<data.length;i++){
                    if(data[i] == gelenid){
                        data.splice(i,1)
                    }
                    }
            }else{
                data.push(gelenid)
            }
        },
        onClickOutside() {
            this.outsideCounter++
            if(this.outsideCounter==2){
                this.$store.state.popup = false
                document.querySelector("#videoPopup").pause()
                this.$store.state.bigVideoPlayerControl = true
                this.currentTime = 0
                this.outsideCounter = 0
                if(this.boxBenzerleriCounter != 1){
                    this.$router.go(-1) 
                }else if(this.boxBenzerleriCounter == 1){
                    this.boxBenzerleriCounter = 0
                }     
            }
        },
        boxBenzerleriPlay(id){
            this.boxBenzerleriCounter +=1
            this.$router.push({ path : '/watch' , query : {id : id}})  
            this.$store.state.popup = false
        }
    },
    watch: {
        "$route"(gelenVeri){
            
            var data=this.$store.state.firebaseData.filter(item=> item.id == this.$route.query.id)

            this.aktifData = data[0]

            this.oyuncuKadrosuLength = Object.keys(this.aktifData.oyuncuKadrosu).length-1
            this.yonetmenLength = Object.keys(this.aktifData.yonetmen).length-1
            this.senaristLength = Object.keys(this.aktifData.senarist).length-1
            this.altKategorilerLength = Object.keys(this.aktifData.altKategoriler).length-1
            this.categoryLength = Object.keys(this.aktifData.category).length-1


           
            var filter1 = this.$store.state.listeyeEklenenler.filter(item=> item == this.aktifData.id)
            if(filter1 ==( Array.length==0)){
                this.listClass = false
            }else{
                this.listClass = true
            }

            var filter2 = this.$store.state.begenilenIcerikler.filter(item=> item == this.aktifData.id)
            if(filter2 ==( Array.length==0)){
                this.likeClass = false
            }else{
                this.likeClass = true
            }
   
            var filter3 = this.$store.state.begenilmeyenIcerikler.filter(item=> item == this.aktifData.id)
            if(filter3 ==( Array.length==0)){
                this.dislikeClass = false
            }else{
                this.dislikeClass = true
            }


   
        },
        "$store.state.cardSound"(){
            this.mutedControl = this.$store.state.cardSound
        },
        "$store.state.popup"(){
            this.onOff = this.$store.state.popup
        },
        "$store.state.popupNextVideoSecond"(){
            this.currentTime = this.$store.state.popupNextVideoSecond
        },
        "$store.state.listeyeEklenenler"(){
            var filter1 = this.$store.state.listeyeEklenenler.filter(item=> item == this.aktifData.id)
            if(filter1 ==( Array.length==0)){
                this.listClass = false
            }else{
                this.listClass = true
            }
            this.guncelListeyeEklenenler = this.$store.state.listeyeEklenenler
        },
        "$store.state.begenilenIcerikler"(){
            var filter2 = this.$store.state.begenilenIcerikler.filter(item=> item == this.aktifData.id)
            if(filter2 ==( Array.length==0)){
                this.likeClass = false
            }else{
                this.likeClass = true
            }
        },
        "$store.state.begenilmeyenIcerikler"(){
            var filter3 = this.$store.state.begenilmeyenIcerikler.filter(item=> item == this.aktifData.id)
            if(filter3 ==( Array.length==0)){
                this.dislikeClass = false
            }else{
                this.dislikeClass = true
            }
        },


    },
    created(){
        this.mutedControl = this.$store.state.cardSound
    },
}
</script>

<style scoped>

.boxbenzerleri:hover  .boxbenzerleri-top-image-hover-button{
    opacity: 1;
    transition: 0.5s;
}

.boxbenzerleri-top-image-hover-button{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.45);
    justify-content: center;
    align-items: center;
    display: flex;
    color:white;
    font-size: 30px;
    border: 1px solid white;
    opacity: 0;
    transition: 0.3s;
}

.boxbenzerleri-top-image-hover{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 132px;
    width: 232px;;
}

.boxbenzerleri-top-image-hover:hover{
    cursor: pointer;
}



.video-frame{
    height: 440px;
    overflow: hidden;
}

.top-info-right a{
    text-decoration: none;
    color: white;   
}

.top-info-right a:hover{
  text-decoration: underline; 
}

.icerikHakkinda a{
    text-decoration: none;
    color: white;
}

.icerikHakkinda a:hover{
    text-decoration: underline;
}

.boxbenzerleri a{
    text-decoration: none;
}

.video-top-info-bottom-right .iconDiv{
    display: flex;
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba(23, 23, 23, 0.7);
    opacity: 0.4;
    border: 2px solid #8e8e8e;
    margin-right: 10px;
    transition: 0.5s;
    color: white;
    font-size : 15px
}

.video-top-info-bottom-right .iconDiv:hover{
    opacity: 1.0;
}

.overlay::-webkit-scrollbar{
    display: none;
}

.overlay{

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    overflow: auto;
}

.popupFrame{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.popup{
    position: relative;
    width: 810px;
    height: auto;
    background-color: #181818;
    border-radius: 5px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);
}

.popupContent{
    display: flex;
    flex-direction: column;

}

.popupContent-top{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    
}

.videoShadow{
    position: absolute;
    width: 810px;
    height: 490px;
    /* box-shadow: inset 0px -100px 50px rgb(24, 24, 24); */
    z-index: 1;
    margin-top: -30px;
}

.videoShadow img{

}

.button{
    justify-content: center;
    align-items: center;
    margin-top:2vw ;
    display: flex; 
    color:white;
}

.video{
    display: flex;
    width: 100%;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.video video{
    transform: scale(1.4);
    width: 100%;
    z-index: 0;
}

.popupContent-info{
    margin-top: 70px;
    width: 100%;
    height: 400px;


}

.video-top-info{
    position: absolute;
    width: 810px;
    height: 490px;
    z-index: 2;
}

.video-top-info-top{
    display: flex;
    width: 100%;
    height: 45%;
    justify-content: flex-end;
}


.video-top-info-top-close{
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
}

.video-top-info-top-close a{
    text-decoration: none;
}



.video-top-info-top-close:hover{
    cursor: pointer;
}

.video-top-info-top-close i {
    color: white;
    font-size: 18px;
}

.video-top-info-top-close p{
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 25px;
    margin-top: 16px;
}

.video-top-info-bottom{
    display: flex;
    width: 100%;
    height: 55%;

}

.video-top-info-bottom-left{
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 3vw;
}

.video-top-info-bottom-left img{
    width: 65%;
}
.video-top-info-bottom-right{
    display: flex;
    width: 40%;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
}

.boxbenzerleri-info-top-right .iconDiv{
    
}


.video-top-info-bottom-right .iconDiv{
    margin-bottom: 100px;
    margin-right: 38px;
}



.iconDiv{
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #232323;
    border: 2px solid #8e8e8e;
    margin-right: 10px;
    transition: 0.5s;
}

.iconDiv:hover{
    cursor: pointer;
    border: 2px solid #ffff;
    transition: 0.5s;
}

.iconDiv-play{
    margin-top: 1px;
    display: flex;
    width: 160px;
    height: 38px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-right: 10px;
    transition: 0.5s;
    background-color: white;
    color: black;
}

.iconDiv-play label{
    margin-left: 10px;
    font-size: 16.5px;
    font-family: sans-serif;
    font-weight: 600;
}
.iconDiv-play label:hover{
    cursor: pointer;
}

.iconDiv-play i{
    font-size: 25px;
}

.iconDiv-play:hover{
    cursor: pointer;
    background-color: #e6e6e6;
    transition: 0.5s;
}

.top-info{
    position: absolute;
    z-index: 4;
    margin-top: -15px;
    width: 100%;
    height: 230px;
    display: flex;
    color: white;
    margin-top: -67px;
}

.top-info-left{
    display: flex;
    flex-direction: column;
    width: 63%;
    padding-left:42px;
    padding-right: 40px;
}



.top-info-left .green{
    color:#3eb25a;
    font-weight: bold
}

.top-info-right{
    display: flex;
    width: 37%;
}

.top-info-right p{
    width: 230px;
}

.infos{
    display: flex;
    flex-direction: row;
}

.infos p{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-left: 8px;
    font-size: 15px;
    font-weight: 500;
}

.infos p:nth-child(1){
    margin-left: 0px;
}

.age{
    width: 40px;
    text-align: center;
    background: #181818;
    border: 1px solid #747474;
    color: white;
}

.age-benzerleri{
    width: 40px;
    text-align: center;
    font-family: FreeSans;   
    font-weight: 500;
    font-size: 15px;
    background: #2f2f2f;
    border: 1px solid #747474;
    color: white;
}

.infos .hd{
    display: flex;
    width: 40px;
    height: auto;
    align-items: center;
    justify-content: center;
    background: #181818;
    border: 1px solid #747474;
    border-radius: 5px;
    transform: scale(0.8);
    color: #cccccc;
}

.aciklama{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 18px;
}
.top-info-right {
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.top-info-right .title{
    color: #8a8a8a;
}

.top-info-right .title-alt{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}

.benzerleri{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: auto;
    background-color: #181818;
    margin-top: 140px;
}

.benzerleri h1{
    padding-left: 40px;
    color: white;
    font-size: 23px;
}

.benzerleri .boxbenzerleri{
    display: flex;
    flex-direction: column;
    width: 232px;
    height: 340px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right:15px ;
    margin-bottom: 15px;
}

.box-frame{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 40px;
}

.boxbenzerleri-top-image{
    width: 100%;
}

.boxbenzerleri-top-image img{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
}

.boxbenzerleri-top-sure{
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 232px;
}

.boxbenzerleri-top-sure label{
    display: flex;
    width: 100%;
    margin-top: 6px;
    margin-right: 5px;
    justify-content: flex-end;
    color: white;
}

.boxbenzerleri-top-shadow{
    width: 232px;
    position: absolute;

}

.boxbenzerleri-top-shadow img{
    width: 100%;
    border-top-right-radius: 5px;
}

.boxbenzerleri-info-top{
    display: flex;
    width: 100%;
    margin-top: 14px;
}

.boxbenzerleri-info-top p{
    margin-right: 10px;
    color: white;
}

.year-benzerleri{
    font-size: 14.5px;
    font-family: FreeSans;
    font-weight: 400;
}

.boxbenzerleri-info-top-left{
    width: 60%;
    display: flex;
    align-items: flex-end;
    margin-left: 15px;

}

.boxbenzerleri-info-top-right{
    width: 40%;
    margin-right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.boxbenzerleri-info-top-right .iconDiv{
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #2f2f2f;
    border: 2px solid #8e8e8e;
    margin-right: 10px;
    transition: 0.5s;
}

.boxbenzerleri-info-top-right .iconDiv:hover{
    border: 2px solid white;
}

.boxbenzerleri-info-aciklama{
    margin-top: -10px;
}

.boxbenzerleri-info-aciklama p{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0px 20px 0px 20px;
    color: #dadada;
    font-size: 13px;
    font-weight: 400;
}

.icerikHakkinda{
    width: 100%;
    background-color: #181818;
    margin-top: -30px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
}

.icerikHakkinda .hakkinda-text{
    padding-top: 30px;
    margin-left: 40px;
    font-family: FreeSans;
        font-size: 23px;
    color: white;
}

.icerikHakkinda .digerinfolar{
    margin-left: 40px;
    color: #807e7e;
    font-size: 13px;
    margin-bottom: -7px;
}

.icerikHakkinda .digerinfolar label{
    color: white;
    line-height: 20px;
    font-family: FreeSans;
    font-weight: 500;

}


@media (max-width:835px){



.boxbenzerleri-top-image-hover{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 23.2vw;
    width: 41vw;

}

.video-frame{
    height: 55vw;
    overflow: hidden;
}

.popupFrame{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.popup{
    position: relative;
    width: 95vw;
    height: auto;
    background-color: #181818;
    border-radius: 5px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);
}



.videoShadow{
    position: absolute;
    height: 60vh;
    /* box-shadow: inset 0px -100px 50px rgb(24, 24, 24); */
    z-index: 1;
}



.popupContent-info{
    margin-top: 10vw;
    width: 100%;  
}








.video-top-info{
    position: absolute;
    width: 100%;
    height: 60vw;
    z-index: 2;
}

.video-top-info-top{
    display: flex;
    width: 100%;
    height: 45%;
    justify-content: flex-end;
}


.video-top-info-top-close{
    margin-right: -8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
}


.video-top-info-top-close p{
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 2.4vw;
}

.video-top-info-bottom-left{
    width: 100vw;
}

.video-top-info-bottom-left img{
    width: 65%;
    padding-left: 6vw;
}


.video-top-info-bottom-right{
    display: flex;
    width: 400px;
    justify-content: flex-end;
    align-items: flex-end;
}

















.iconDiv{
    display: flex;
    width: 4vw;
    height: 4vw;
    justify-content: center;
    align-items: center;
    background-color: #232323;
    border: 0.3vw solid #8e8e8e;
    margin-right: 1vw;
    transition: 0.5s;
}


.iconDiv:hover{
    cursor: pointer;
    border: 0.3vw solid #ffff;
    transition: 0.5s;
}

.iconDiv-play{
    margin-top: 1px;
    display: flex;
    width: 18vw;
    height: 5vw;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vw;
    margin-right: 1vw;
    transition: 0.5s;
    background-color: white;
    color: black;
}

.iconDiv-play label{
    margin-left: 1vw;
    font-size: 2.2vw;
    font-family: sans-serif;
    font-weight: 600;
}
.iconDiv-play label:hover{
    cursor: pointer;
}

.iconDiv-play i{
    font-size: 3.4vw;
}

.iconDiv-play:hover{
    cursor: pointer;
    background-color: #e6e6e6;
    transition: 0.5s;
}

.top-info{
    position: absolute;
    z-index: 4;
    margin-top: -1.5vw;
    width: 100%;
    height: 23vw;
    display: flex;
    color: white;
    margin-top: -8vw;
}

.top-info-left{
    display: flex;
    flex-direction: column;
    width: 63%;
    padding-left:5vw;
    padding-right: 5vw;
}



.top-info-left .green{
    color:#3eb25a;
    font-weight: bold
}

.top-info-right{
    display: flex;
    width: 37%;
}

.top-info-right p{
    width: 200px;
}

.infos{
    display: flex;
    flex-direction: row;
}

.infos p{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-left: 8px;
    font-size: 15px;
    font-weight: 500;
}

.infos p:nth-child(1){
    margin-left: 0px;
}

.age{
    width: 40px;
    text-align: center;
    background: #181818;
    border: 1px solid #747474;
    color: white;
}

.age-benzerleri{
    width: 40px;
    text-align: center;
    font-family: FreeSans;   
    font-weight: 500;
    font-size: 15px;
    background: #2f2f2f;
    border: 1px solid #747474;
    color: white;
}

.infos .hd{
    display: flex;
    width: 4.5vw;
    height: auto;
    align-items: center;
    justify-content: center;
    background: #181818;
    border: 1px solid #747474;
    border-radius: 5px;
    transform: scale(0.8);
    color: #cccccc;
}

.aciklama{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 18px;
}





.benzerleri{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: auto;
    background-color: #181818;
    margin-top: 18vw;
}

.benzerleri h1{
    padding-left: 5vw;
    color: white;
    font-size: 23px;
}

.benzerleri .boxbenzerleri{                 
    display: flex;
    flex-direction: column;
    width: 27vw;
    height: 300px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right:1.5vw ;
    margin-bottom: 2vw;
}

.box-frame{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 5vw;
}

.boxbenzerleri-top-image{
    width: 100%;
}

.boxbenzerleri-top-image img{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
}

.boxbenzerleri-top-sure{
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 25.8vw;
}

.boxbenzerleri-top-sure label{
    display: flex;
    width: 100%;
    margin-top: 6px;
    margin-right: 5px;
    justify-content: flex-end;
    color: white;
}

.boxbenzerleri-top-shadow{
    width: 27vw;
    position: absolute;

}

.boxbenzerleri-top-shadow img{
    width: 100%;
    border-top-right-radius: 5px;
}

.boxbenzerleri-info-top{
    display: flex;
    width: 100%;
    margin-top: 4px;
}

.boxbenzerleri-info-top p{
    margin-right: 10px;
    color: white;
}

.year-benzerleri{
    font-size: 14.5px;
    font-family: FreeSans;
    font-weight: 400;
}

.boxbenzerleri-info-top-left{
    width: 60%;
    display: flex;
    align-items: flex-end;
    margin-left: 15px;

}

.boxbenzerleri-info-top-right{
    width: 40%;
    margin-right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.boxbenzerleri-info-top-right .iconDiv{
    display: flex;
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #2f2f2f;
    border: 2px solid #8e8e8e;
    margin-right: 10px;
    transition: 0.5s;
}

.boxbenzerleri-info-top-right .iconDiv:hover{
    border: 2px solid white;
}

.boxbenzerleri-info-aciklama{
    margin-top: -10px;
}

.boxbenzerleri-info-aciklama p{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0px 20px 0px 20px;
    color: #dadada;
    font-size: 12px;
    font-weight: 400;
}

.icerikHakkinda{
    width: 100%;
    background-color: #181818;
    margin-top: -30px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
}

.icerikHakkinda .hakkinda-text{
    padding-top: 30px;
    margin-left: 40px;
    font-family: FreeSans;
        font-size: 23px;
    color: white;
}

.icerikHakkinda .digerinfolar{
    margin-left: 40px;
    color: #807e7e;
    font-size: 13px;
    margin-bottom: -7px;
}

.icerikHakkinda .digerinfolar label{
    color: white;
    line-height: 20px;
    font-family: FreeSans;
    font-weight: 500;

}       
}

@media (max-width:768px){
    
.video video{
    transform: scale(1.4);
    width: 100%;
    height: 52vw;
    z-index: 0;
}
.videoShadow{
    position: absolute;
    /* box-shadow: inset 0px -100px 50px rgb(24, 24, 24); */
    z-index: 1;
    width: 300px;
    height: 60vw;
    margin-top: -4vw;
    opacity: 1;
}

.videoShadow img{
    width: 95vw
}

.benzerleri .iconDiv{
    margin-left: 1.3vw;
    margin-top: 0.5vw;   
}

.video-top-info-top-close{
    margin-right: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
}

.video-top-info-top-close p{
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 2.35vw;
}

}

@media (max-width:730px){

#top-info-kadro{
    display: none;
}

.popupFrame{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.popup{
    position: relative;
    width: 95vw;
    height: auto;
    background-color: #181818;
    border-radius: 5px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);
}



.videoShadow{
    margin-top: 0vw;
    position: absolute;
    opacity: 0.4;
    width: 100%;
    height: 53.5vw;
    /* box-shadow: inset 0px -100px 50px rgb(24, 24, 24); */
    z-index: 1;
}



.popupContent-info{
    margin-top: 10vw;
    width: 100%; 

}








.video-top-info{
    position: absolute;
    width: 90%;
    height: 60vw;
    z-index: 2;
}

.video-top-info-top{
    display: flex;
    width: 100%;
    height: 45%;
    justify-content: flex-end;
}


.video-top-info-top-close{
    margin-right: -8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
}


.video-top-info-top-close p{
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 2.4vw;
}

.video-top-info-bottom-left{
    width: 100vw;
}

.video-top-info-bottom-left img{
    width: 65%;
    padding-left: 6vw;
}


.video-top-info-bottom-right{
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}



.video-top-info-bottom-right .iconDiv{
    margin-bottom: 13.5vw;
    margin-right: -3vw;
}















.iconDiv{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #232323;
    border: 0.3vw solid #8e8e8e;
    margin-right: 1vw;
    transition: 0.5s;
}






.iconDiv:hover{
    cursor: pointer;
    border: 0.3vw solid #ffff;
    transition: 0.5s;
}

.iconDiv-play{
    margin-top: 1px;
    display: flex;
    width: 18vw;
    height: 5vw;
    justify-content: center;
    align-items: center;
    border-radius: 0.5vw;
    margin-right: 1vw;
    transition: 0.5s;
    background-color: white;
    color: black;
}

.iconDiv-play label{
    margin-left: 1vw;
    font-size: 2.2vw;
    font-family: sans-serif;
    font-weight: 600;
}
.iconDiv-play label:hover{
    cursor: pointer;
}

.iconDiv-play i{
    font-size: 3.4vw;
}

.iconDiv-play:hover{
    cursor: pointer;
    background-color: #e6e6e6;
    transition: 0.5s;
}


.top-info{
    z-index: 4;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: white;

}

.top-info-left{
    display: flex;
    text-align: center;
    flex-direction: column;
    width: 90%;
}



.top-info-left .green{
    color:#3eb25a;
    font-weight: bold
}


.infos{
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.infos p{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    font-size: 15px;
    font-weight: 500;
}

.infos p:nth-child(1){
    margin-left: 0px;
}

.age{
    width: 40px;
    text-align: center;
    background: #181818;
    border: 1px solid #747474;
    color: white;
}

.age-benzerleri{
    width: 40px;
    text-align: center;
    font-family: FreeSans;   
    font-weight: 500;
    font-size: 15px;
    background: #2f2f2f;
    border: 1px solid #747474;
    color: white;
}

.infos .hd{
    display: flex;
    width: 4.5vw;
    height: auto;
    align-items: center;
    justify-content: center;
    background: #181818;
    border: 1px solid #747474;
    border-radius: 5px;
    transform: scale(0.8);
    color: #cccccc;
}

.aciklama{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 18px;
}
.top-info-right {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1vw;
    margin-right: 6vw;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.top-info-right .title{
    color: #8a8a8a;
}

.top-info-right .title-alt{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}


.benzerleri{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
    background-color: #181818;
    margin-top: 16vw;
}

.benzerleri h1{
    padding-left: 5vw;
    color: white;
    font-size: 23px;
}

.benzerleri .boxbenzerleri{                 
    display: flex;
    flex-direction: column;
    width: 41vw;
    height: 320px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right:1.5vw ;
    margin-bottom: 2vw;
}

.box-frame{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 5vw;

}

.boxbenzerleri-top-image{
    width: 100%;
}

.boxbenzerleri-top-image img{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
}

.boxbenzerleri-top-sure{
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 41vw;
}

.boxbenzerleri-top-sure label{
    display: flex;
    width: 100%;
    margin-top: 6px;
    margin-right: 5px;
    justify-content: flex-end;
    color: white;
}

.boxbenzerleri-top-shadow{
    width: 41vw;
    position: absolute;

}

.boxbenzerleri-top-shadow img{
    width: 100%;
    border-top-right-radius: 5px;
}

.boxbenzerleri-info-top{
    display: flex;
    width: 100%;
    margin-top: 4px;
}

.boxbenzerleri-info-top p{
    margin-right: 10px;
    color: white;
}

.year-benzerleri{
    font-size: 14.5px;
    font-family: FreeSans;
    font-weight: 400;
}

.boxbenzerleri-info-top-left{
    width: 60%;
    display: flex;
    align-items: flex-end;
    margin-left: 15px;

}

.boxbenzerleri-info-top-right{
    width: 40%;
    margin-right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.boxbenzerleri-info-top-right .iconDiv{
    display: flex;
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #2f2f2f;
    border: 2px solid #8e8e8e;
    margin-right: 10px;
    transition: 0.5s;
}

.boxbenzerleri-info-top-right .iconDiv:hover{
    border: 2px solid white;
}

.boxbenzerleri-info-aciklama{
    margin-top: -10px;
}

.boxbenzerleri-info-aciklama p{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0px 20px 0px 20px;
    color: #dadada;
    font-size: 12px;
    font-weight: 400;
}

.icerikHakkinda{
    width: 100%;
    background-color: #181818;
    margin-top: -30px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
}

.icerikHakkinda .hakkinda-text{
    padding-top: 30px;
    margin-left: 40px;
    font-family: FreeSans;
        font-size: 23px;
    color: white;
}

.icerikHakkinda .digerinfolar{
    margin-left: 40px;
    color: #807e7e;
    font-size: 13px;
    margin-bottom: -7px;
}

.icerikHakkinda .digerinfolar label{
    color: white;
    line-height: 20px;
    font-family: FreeSans;
    font-weight: 500;

}       
}

@media (max-width:425px){
.boxbenzerleri-top-image-hover-button{
    opacity: 1;
}
.benzerleri{
    margin-top: 40vw;
}

.benzerleri .button{
    display: none;
}

.infos .hd{
    width: 40px;
}

.button .iconDiv{
    width: 32px;
    height: 32px;
}

.video-top-info{
    display: flex;
    flex-direction: column;
}

.video-top-info-bottom{
    display: flex;
    flex-direction: column;
}
.video-top-info-bottom-left{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -18vw;
}

.video-top-info-bottom-left img{
    margin-left: 9vw;
    margin-top: -10vw;
}

.iconDiv{
    width: 7vw;
    height: 7vw;
}

.iconDiv-play{
    width: 33vw;
    height: 8vw;
}

.iconDiv-play label{
    font-size: 14px;
}

.iconDiv-play i{
    font-size: 18px;
}

.video-top-info-bottom-right{
    position: absolute;
    margin-left: -85vw;
    margin-top: -61vw;
}


.video-top-info-top-close{
    margin-right: -6vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #181818;
    border-radius: 50%;
    text-decoration: none;
}

.video-top-info-top-close p{
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 4vw;
}

.videoShadow{
    position: absolute;
    /* box-shadow: inset 0px -100px 50px rgb(24, 24, 24); */
    z-index: 1;
    width: 300px;
    height: 60vw;
    margin-top: -4vw;
    opacity: 1;
}

.videoShadow img{
    width: 95vw
}

.benzerleri .iconDiv{
    margin-left: 1.3vw;
 margin-top: 1.4vw;   
}

.aciklama p{
    font-family: FreeSans;
    font-size: 17px;
}


}

@media (max-width:414px){
.boxbenzerleri-top-image-hover-button{
    opacity: 1;
}
.benzerleri{
    margin-top: 31vw;
}
.boxbenzerleri-top-shadow{
    width: 83vw;
    position: absolute;
}

.benzerleri .boxbenzerleri{                 
    display: flex;
    flex-direction: column;
    width: 83vw;
    height: 350px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right:1.5vw ;
    margin-bottom: 3vw;
}

.boxbenzerleri-top-sure{
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 83vw;
}

.boxbenzerleri p{
    font-size: 14px;
}

.video-top-info-bottom-right{
    position: absolute;
    margin-left: -87vw;
    margin-top: -61vw;
}



.videoShadow{
    position: absolute;
    /* box-shadow: inset 0px -100px 50px rgb(24, 24, 24); */
    z-index: 1;
    width: 300px;
    height: 60vw;
    margin-top: -4vw;
    opacity: 1;
}

.videoShadow img{
    width: 95vw
}

.benzerleri .iconDiv{
 margin-top: 1vw;   
 margin-left: -0.3vw;
}

.age-benzerleri{
    transform: scale(0.9);
}

.year-benzerleri{
    margin-left: -1vw;
}

.aciklama p{
    font-family: FreeSans;
    font-size: 16px;
}


}

@media (max-width:320px){
.boxbenzerleri-top-image-hover-button{
    opacity: 1;
}
.benzerleri{
    margin-top: 80vw;
}

.benzerleri .boxbenzerleri{                 
    display: flex;
    flex-direction: column;
    width: 41vw;
    height: 350px;
    background-color: #2f2f2f;
    justify-content: flex-start;
    border-radius: 5px;
    margin-right:1.5vw ;
    margin-bottom: 2vw;
}

.age-benzerleri{
    display: none;
}

.video-top-info-bottom-right{
    position: absolute;
    margin-left: -20vw;
    margin-top: -59vw;
}

.video-top-info-top-close p{
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 100;
    font-size: 28px;
    margin-top: 5vw;
}

.videoShadow{
    position: absolute;
    /* box-shadow: inset 0px -100px 50px rgb(24, 24, 24); */
    z-index: 1;
    width: 300px;
    height: 60vw;
    margin-top: -4vw;
    opacity: 1;
}

.videoShadow img{
    width: 95vw
}

.age{
    display: none;
}




}

@media (max-width:375px){
.benzerleri{
    margin-top: 40vw;
}
.boxbenzerleri-top-image-hover-button{
    opacity: 1;
    width: 70px;
    height: 70px;
    font-size: 50px;
}

.boxbenzerleri-top-image-hover{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 47vw;
    width: 83vw;

}

.video-top-info-bottom-right{
    position: absolute;
    margin-left: -93vw;
    margin-top: -59vw;
}
}

@media (max-width:390px){
.boxbenzerleri-top-image-hover-button{
    opacity: 1;
}
 .video-top-info-bottom-right{
    position: absolute;
    margin-left: -95vw;
    margin-top: -59vw;
}
.boxbenzerleri-top-image-hover-button{
    opacity: 1;
}
}











</style>