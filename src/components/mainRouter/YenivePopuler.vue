<template>

  <div id="ana">

    <Preloader v-if="!isLoading" />

    <div id="slider" v-if="isLoading">
      <app-slider :database="dataKaynak" :searchValue="mainSliderText" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <slider-top :database="dataKaynak" :searchValue="topText" class="app-slider" @indexSensor="index_sensor($event)"     ></slider-top>


    </div> 

  <app-footer></app-footer>

  </div>

</template>

<script>
import appBigVideo from '../appBigVideo.vue'
import appSlider from '../Card/Slider.vue'
import Preloader from '../Preloader.vue'
import SliderTop from '../Card/populer/SliderTop.vue'
import appFooter from '../Footer.vue'

export default {
    components : {
        appBigVideo,appSlider,Preloader,SliderTop,appFooter
    },
    data(){
        return{
            dataKaynak : null,
            mainSliderText : "Netflix'te Popüler",
            topText : "Türkiye'de Bugünün Top 10 Listesi",
            isLoading : false,
        }
    },
    mounted(){
    this.dataKaynak = this.$store.state.firebaseData
    if(this.dataKaynak.length >= 0){
      setTimeout(()=>{
        this.isLoading=true
      },500)
    }


    /*
    var slider = document.querySelector('#slider')
    var elemanSec = slider.children[0].style.zIndex = "3"
    //var title = slider.children[0].children[0].children[0].textContent
    var title = slider.children[1].children[0].children[0].textContent
    */
    },
    methods : {
    index_sensor(sonuc) {



      var slider = document.querySelector('#slider')
      var sliderCount = slider.childElementCount


    for(let i=0;i<sliderCount ; i++){
      if(sonuc == slider.children[i].children[0].children[0].textContent ){
        slider.children[i].style.zIndex = "3"
      }else if(sonuc == slider.children[i].children[0].children[0].textContent+'end'){
        slider.children[i].style.zIndex = "1"
      }
    }


    }
    },
    created(){
      var path = this.$route.fullPath
      if(path.match('id')){
        this.$router.push('/browse/yenivepopuler')
        //this.$store.state.popup = true
      }
    }
    
}
</script>

<style scoped>

#slider{
  width: 100%;
  height: 40vw;
}


.loader{
  position: absolute;
  top: 0;
  width: 100%;
  height: 400px;
  background: red;
}

.app-slider{
  width: 100%;
  position: absolute;
  margin-top: 1vw;
  z-index: 1;
}


.app-slider:nth-child(2){
  margin-top: 14.7vw;
  /* +14.7  */
}

.app-slider:nth-child(3){
  margin-top: 31.7vw;
}

.app-slider:nth-child(4){
  margin-top: 46.4vw;
}

.app-slider:nth-child(5){
  margin-top: 61.1vw;
}



@media (max-width: 786px) {
    #slider{
  height: 80vw;
}
.app-slider{
  width: 100%;
  position: absolute;
  margin-top: 15vw;
  z-index: 1;
}
.app-slider:nth-child(2){
  margin-top: 40vw;
  /* +14.7  */
}

.app-slider:nth-child(3){
  margin-top: 65vw;
}

.app-slider:nth-child(4){
  margin-top: 90vw;
}

.app-slider:nth-child(5){
  margin-top: 115vw;
}




}


body{
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: sans-serif;
}


</style>