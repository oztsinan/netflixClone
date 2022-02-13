<template>

  <div id="ana">

    <Preloader v-if="!isLoading" />

    <app-big-video v-if="isLoading"  :selectType="'Dizi'" :database="dataKaynak" ></app-big-video>

    <div id="slider" v-if="isLoading">
      <app-slider :database="dataKaynak" :type="'Dizi'" :filterData="'kategori'" :searchValue="'Sürükleyici'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'Dizi'" :filterData="'kategori'" :searchValue="'Duygusal'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'Dizi'" :filterData="'kategori'" :searchValue="'Bilim Kurgu ve Fantastik'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'Dizi'" :filterData="'kategori'" :searchValue="'Yerli Diziler'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'Dizi'" :filterData="'kategori'" :searchValue="'Aksiyon'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'Dizi'" :filterData="'kategori'" :searchValue="'Komediler'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
      <app-slider :database="dataKaynak" :type="'Dizi'" :filterData="'kategori'" :searchValue="'Korku'" class="app-slider" @indexSensor="index_sensor($event)"     ></app-slider>
    </div> 

  <app-footer></app-footer>


  </div>

</template>

<script>
import appBigVideo from '../appBigVideo.vue'
import appSlider from '../Card/Slider.vue'
import Preloader from '../Preloader.vue'
import appFooter from '../Footer.vue'
export default {
    components : {
        appBigVideo,appSlider,Preloader,appFooter
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
        this.$router.push('/browse/diziler')
        //this.$store.state.popup = true
      }
      
    }
    
}
</script>

<style scoped>

#slider{
  width: 100%;
  height: 90vw;
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
}

.app-slider:nth-child(6){
  margin-top: 55vw;
}

.app-slider:nth-child(7){
  margin-top: 69.7vw;
}

@media (max-width: 786px) {
  #slider{
  height: 200vw;
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
  margin-top: 100vw;
}

.app-slider:nth-child(6){
  margin-top: 125vw;
}

.app-slider:nth-child(7){
  margin-top: 150vw;
}
}


body{
  margin: 0;
  padding: 0;
  background-color: #141414;
  font-family: sans-serif;
}


</style>