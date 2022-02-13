<template>

  <div id="ana">

    <Preloader v-if="!isLoading" />

    <app-big-video v-if="isLoading"  :selectType="'all'" :database="dataKaynak" ></app-big-video>

    <div id="slider" v-if="isLoading">
      <app-slider :database="dataKaynak" :searchValue="mainSliderText" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'all'" :filterData="'kategori'" :searchValue="'Komediler'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'all'" :filterData="'kategori'" :searchValue="'Duygusal'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'all'" :filterData="'kategori'" :searchValue="'Bilim Kurgu ve Fantastik'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <slider-top :database="dataKaynak" :searchValue="topText" class="app-slider" @indexSensor="index_sensor($event)"     ></slider-top>
      <app-slider :database="dataKaynak" :type="'all'" :filterData="'kategori'" :searchValue="'Yerli Filmler'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'all'" :filterData="'kategori'" :searchValue="'Yerli Diziler'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'all'" :filterData="'kategori'" :searchValue="'Sürükleyici'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'all'" :filterData="'kategori'" :searchValue="'Aksiyon'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'all'" :filterData="'kategori'" :searchValue="'Korku'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
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
import axios from 'axios'
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

    document.querySelector('.header').style.display ='flex'
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

        axios.get('/data.json')
            .then((response)=>{
              var data = response.data
                for(let key in data){
                    this.$store.commit('setFirebaseData',data[key])
                }   
            })

      var path = this.$route.fullPath
      if(path.match('id')){
        this.$router.push('/browse')
        //this.$store.state.popup = true
      }
    }
    
}
</script>

<style scoped>

#slider{
  width: 100%;
  height: 140vw;
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
  margin-top: -18.5vw;
  z-index: 1;
}


.app-slider:nth-child(2){
  margin-top: -3.8vw;
  /* +14.7  */
}

.app-slider:nth-child(3){
  margin-top: 10.9vw;
}

.app-slider:nth-child(4){
  margin-top: 25.6vw;
}

.app-slider:nth-child(5){
  margin-top: 40.3vw;
  overflow-y: hidden;
}

.app-slider:nth-child(6){
  margin-top: 58vw;
}

.app-slider:nth-child(7){
  margin-top: 73vw;
}

.app-slider:nth-child(8){
  margin-top: 88vw;
}

.app-slider:nth-child(9){
  margin-top: 103vw;
}

.app-slider:nth-child(10){
  margin-top: 118vw;
}



@media (max-width: 786px) {
#slider{
  height: 280vw;
}

.app-slider{
  width: 100%;
  position: absolute;
  margin-top: -3vw;
  z-index: 1;
}
.app-slider:nth-child(2){
  margin-top: 25vw;
  /* +14.7  */
}

.app-slider:nth-child(3){
  margin-top: 50vw;
}

.app-slider:nth-child(4){
  margin-top: 75vw;
}

.app-slider:nth-child(5){
  margin-top: 102.4vw;
}

.app-slider:nth-child(6){
  margin-top: 130vw;
}

.app-slider:nth-child(7){
  margin-top: 155vw;
}

.app-slider:nth-child(8){
  margin-top: 180vw;
}

.app-slider:nth-child(9){
  margin-top: 205vw;
}

.app-slider:nth-child(10){
  margin-top: 230vw;
}

}


body{
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: sans-serif;
}


</style>