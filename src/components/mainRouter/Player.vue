<template>
    <div class="app">

    <div class="playerClose-top">
       <i @click="backTo" class="bi bi-arrow-left"></i>
    </div>
         
    <div  id="player" >
        <video  controls :src="aktifDataPlayer.videosrc"></video>
    </div>

</div>
</template>

<script>
import * as test from '../../playerjs'
export default {
    data(){
        return{
            database : this.$store.getters['getFirebaseData'],
            queryId : this.$route.query.id,
            aktifDataPlayer : {},

        }
    },
    created(){
        var gelenId = this.$route.query.id
        var dataUzunluk = Object.keys(this.database).length
        for(let i=0 ; i<dataUzunluk;i++){
            if(this.database[i].id == gelenId){
                 this.aktifDataPlayer = {
                        id : this.database[i].id,
                        title : this.database[i].title,
                        img : this.database[i].img,
                        logo : this.database[i].logo,
                        videosrc : this.database[i].videosrc,
                        newAndDate : this.database[i].newAndDate,
                        age : this.database[i].age,
                        year : this.database[i].year,
                        category : this.database[i].category,
                        time : this.database[i].time,
                        videoQuality : this.database[i].videoQuality,
                        altKategoriler : this.database[i].altKategoriler,
                        videoDescription : this.database[i].videoDescription,
                        yonetmen : this.database[i].yonetmen,
                        oyuncuKadrosu : this.database[i].oyuncuKadrosu,
                        senarist : this.database[i].senarist,
                        likeButton : this.database[i].likeButton,
                        dislikeButton : this.database[i].dislikeButton,
                        listeyeEklendi : this.database[i].listeyeEklendi,
                        populer : this.database[i].populer,
                        izlenilmeSayisi : this.database[i].izlenilmeSayisi,

                    }

            }
        }

        document.querySelector('.header').style.transition = '0.3s'
        document.querySelector('.header').style.opacity = '0'
    },
    mounted(){
    var player = new Playerjs({id:"player", file:this.aktifDataPlayer.videosrc , autoplay:1, fluid: true,title : this.aktifDataPlayer.title});
    document.querySelector('#footer').style.display= 'none'
    },
    methods : {
        backTo(){
            this.$router.go(-1)
            document.querySelector('.header').style.transition = '0.3s'
            document.querySelector('.header').style.opacity = '1'
        }
    },
}

</script>

<style scoped>

#player{
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 100vh;
}








.playerClose-top{
    position: absolute;
    z-index: 7;
    margin-top: 20px;
}



.playerClose-top i{
    color: white;
    font-size: 50px;
    padding: 30px ;
    z-index: 7;
}

.playerClose-top i:hover{
    cursor: pointer;


}



</style>