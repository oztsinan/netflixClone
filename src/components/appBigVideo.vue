<template>
  <div class="container">
    <div class="main-container">
      <div class="main-container-left">
        <div class="mainVideo-infos">
          <div class="imgaciklama">
            <img :src="database[randomNumber].logo" alt="" />
            <div class="description">
              <p>{{database[randomNumber].videoDescription}}</p>
            </div>
          </div>
          <div  class="buttons">
            <router-link
              :to="{ path: '/watch', query: { id: database[randomNumber].id } }"
              tag="div"
              class="play"
              ><i class="fas fa-play"></i>Oynat</router-link
            >
            <router-link tag="div" :to="{ query: { id: database[randomNumber].id } }">
              <div class="dahaFazlaBilgi" @click="dahafazlabilgi">
                <i class="bi bi-info-circle"></i>
                <p>Daha Fazla Bilgi</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="main-container-right">
        <div class="muted">
          <div  class="iconDiv" @click="sesFonksiyon">
            <i :class="mutedControl ? mutedClass : mutedClassActive"></i>
          </div>
        </div>
        <div class="fixedAge">
          <p>{{database[randomNumber].age}}+</p>
        </div>
      </div>
    </div>

    <div class="mobile">
      <img :src="database[randomNumber].logo" alt="" />
      <div class="description">
        <p>Guadalajara Karteli'nin yükselişinin gerçek öyküsünü anlatan bu yeni ve cesur Narcos hikâyesinde, Meksika'daki uyuşturucu savaşının 1980'lerdeki doğuşuna tanıklık edin.</p>
      </div>

      <div rel="peload" class="buttons">
        <router-link
          :to="{ path: '/watch', query: { id: database[randomNumber].id } }"
          tag="div"
          class="play"
          ><i class="fas fa-play"></i>Oynat</router-link
        >
        <router-link tag="div" :to="{ query: { id: database[randomNumber].id } }">
          <div  class="dahaFazlaBilgi" @click="dahafazlabilgi">
            <i class="bi bi-info-circle"></i>
            <p>Daha Fazla Bilgi</p>
          </div>
        </router-link>
      </div>

            <div class="main-container-right">
        <div class="muted">
          <div  class="iconDiv" @click="sesFonksiyon">
            <i :class="mutedControl ? mutedClass : mutedClassActive"></i>
          </div>
        </div>
        <div class="fixedAge">
          <p>{{database[randomNumber].age}}+</p>
        </div>
      </div>



    </div>

    <div class="top-shadow">
      <img src="https://i.ibb.co/ts2rccj/top-Header-shadow.png" alt="" />
    </div>
    <div class="bottom-shadow">
      <img src="https://i.ibb.co/82JvkhQ/main-Video-bottom-shadow.png" alt="" />
    </div>
    <video
      id="bigVideo"
      ref="bigVideo"
      :current-time.prop="currentTime"
      autoplay
      :muted="mutedControl"
      loop
      :src="database[randomNumber].videosrc"
      playsinline
    ></video>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ["database", "selectType"],
  data() {
    return {
      index: null,
      mutedClass: "fas fa-volume-mute",
      mutedClassActive: "fas fa-volume-up",
      mutedControl: true,
      videoPlayerControl: true,
      currentTime: null,
      popupLastStatus: false,
      randomNumber: 2

    };
  },
  methods: {
    dahafazlabilgi() {
      this.$store.state.popup = true;
      this.$refs["bigVideo"].pause();
    },
    sesFonksiyon() {
      this.$store.state.cardSound = !this.$store.state.cardSound;
    },
  },
  mounted() {

    this.videoPlayerControl = this.$store.getters["getBigVideoPlayerControl"];

    if(this.$store.state.popup == true){
      this.$refs['bigVideo'].pause()
    }


 
       setTimeout(() => {
      document.querySelector(".description").style.opacity = "0";
      document.querySelector(".description").style.marginTop = "18vw";
      document.querySelector(".imgaciklama").children[0].style.marginTop =
        "8vw";
      document.querySelector(".imgaciklama").children[0].style.width = "25%";
    }, 10000);
  },
  created() {
    if(this.selectType == 'all'){
      var newData = this.database
      this.database = newData
    }else if(this.selectType == 'Film' || this.selectType == 'Dizi'){
      var newData = this.database.filter(item => item.type== this.selectType)
      this.database = newData
    }




    
    var rastgelesayı = Math.floor(Math.random()*this.database.length)
    this.randomNumber = rastgelesayı


    this.mutedControl = this.$store.state.cardSound;
    this.$store.state.bigVideoPlayerControl = true

  },
  watch: {
    "$store.state.bigVideoPlayerControl"() {
      var veri = this.$store.state.bigVideoPlayerControl;
      if (veri == false) {
        //card tarafından duraklatma
        this.$refs["bigVideo"].pause();
      } else {
        this.$refs["bigVideo"].play();
      }
    },
    "$store.state.cardSound"() {
      this.mutedControl = this.$store.state.cardSound;
    },
    $route(gelenVeri) {
      if (
        gelenVeri.fullPath == "/browse" ||
        gelenVeri.fullPath == "/diziler" ||
        gelenVeri.fullPath == "/filmler"
      ) {
        this.$refs["bigVideo"].play();
      } else if(this.$route.query.id == this.database[this.randomNumber].id) {
        //popup duraklatma
        this.$refs["bigVideo"].pause();
      }
    },
    "$store.state.popup"(gelenveri) {
      if(gelenveri == false){
        this.$refs["bigVideo"].play();
      }
      this.popupLastStatus = this.$store.state.popup;
    },
  },
};
</script>

<style scoped>
@import url(//db.onlinewebfonts.com/c/160f151bb5c24f63117344faa604d58b?family=NexaW01-Heavy);

.mainVideo-infos img {
  position: absolute;
  width: 40%;
  transition: 1s;
  margin-top: -4vw;
}

.description {
  position: absolute;
  width: 40%;
  font-size: 1.34vw;
  color: white;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.8);
  transition: 1s;
  opacity: 1;
  margin-top: 12vw; /* 6vw  */
}

.muted {
  margin-bottom: 0.6vw;
}

.iconDiv {
  display: flex;
  width: 2.5vw;
  height: 2.5vw;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgba(23, 23, 23, 0.3);
  border: 2px solid #ffffff;
  color: white;
  margin-right: 1.2vw;
  font-size: 1.27vw;
}

.iconDiv:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.14);
  border: 2px solid #ffff;
}

.top-shadow {
  z-index: 1;
  width: 100vw;
  height: 50vw;
  position: absolute;
}

.top-shadow img {
  width: 100%;
  opacity: 0.7;
}

.bottom-shadow {
  margin-top: 38vw;
  z-index: 1;
  width: 100vw;
  height: 50vw;
  position: absolute;
}

.bottom-shadow img {
  width: 100%;
}

.main-container {
  display: flex;
  width: 100vw;
  position: absolute;
  z-index: 2, 3;
}

.main-container-left {
  display: flex;
  width: 50vw;
  margin-top: 1vw;
}

.main-container-right {
  margin-bottom: -24.4vw;
  width: 50vw;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 2;
}

.fixedAge {
  margin-bottom: 0.8vw;
  width: 7.2vw;
  height: 2.3vw;
  background: rgba(46, 46, 46, 0.3);
  border-left: 3px solid white;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.2vw;
  font-family: FreeSans;
}

.fixedAge p {
  margin-left: 0.65vw;
}

.container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

video {
  transform: scale(1.4);
  width: 100%;
  height: 55.8vw;
}

.buttons {
  position: absolute;
  margin-top: 20vw;
  display: flex;
}

.buttons .play {
  display: flex;
  width: 9.6vw;
  height: 3vw;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2vw;
}

.buttons .play:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.8);
}

.buttons .dahaFazlaBilgi {
  display: flex;
  width: 14.5vw;
  height: 3vw;
  background: rgba(255, 255, 255, 0.24);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  font-size: 1.2vw;
}

.buttons .dahaFazlaBilgi:hover {
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
}

.buttons i {
  font-size: 1.6vw;
  margin-right: 10px;
}

.buttons .dahaFazlaBilgi i {
  opacity: 1s;
}

.mainVideo {
}

.description p {
  margin-top: 2vw;
}

.mainVideo-infos {
  width: 100%;
  margin-top: 12vw;
  margin-left: 3vw;
  z-index: 3;
  transition: 1s;
}

.mainVideo-bottom-shadow {
  position: absolute;
  margin-top: 700px;
  z-index: 2;
}

.mainVideo-bottom-shadow img {
  width: 100%;
}

.mainVideoShadow {
  position: fixed;
  top: -10px;
  width: 100%;
  z-index: 1;
}

.mainVideoShadow img {
  opacity: 0.9;
}

.mobile {
  display: none;
}

@media (max-width: 786px) {
.main-container-right {
  position: absolute;
  width: 13vw;
  transform: scale(2);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 2;
  bottom: 0;
  right: 0;
  margin-bottom: -20vw;
}

.main-container-right .iconDiv{
  border: 1px solid white;
}

.main-container-right .iconDiv i{
  margin-top: 0.2vw;
}


  video {
    transform: scale(1.4);
    width: 100%;
    height: 63vw;
  }

  .bottom-shadow {
    margin-top: 45vw;
    z-index: 1;
    width: 100vw;
    height: 50vw;
    position: absolute;
  }

  .main-container {
    display: none;
  }

  .mobile {
    margin-top: 23vw;
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 2;
  }

  .mobile img {
    width: 60%;
    margin-top: -5vw;
  }

  .description {
    
    text-align: center;
    font-family: FreeSans;
    font-size: 2.4vw;
    width: 90%;
    margin-top: 18.3vw;
  }

  .buttons {
    position: absolute;
    margin-top: 33vw;
    display: flex;
  }

  .buttons .play {
    display: flex;
    width: 20vw;
    height: 5vw;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.8vw;
    margin-right: 12px;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.8vw;
  }

  .buttons .play:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }

  .buttons .dahaFazlaBilgi {
    display: flex;
    width: 20vw;
    height: 5vw;
    background: rgba(255, 255, 255, 0.24);
    border-radius: 0.8vw;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
    font-size: 1.3vw;
  }

  .buttons i {
    font-size: 2.4vw;
  }
}

@media (max-width: 425px) {


.main-container-right {

  margin-bottom: -24.5vw;
}





  video {
    transform: scale(1.9);
    width: 100%;
    height: 70vw;
  }

  .bottom-shadow {
    margin-top: 50vw;
    z-index: 1;
    width: 100vw;
    height: 50vw;
    position: absolute;
  }

  .main-container {
    display: none;
  }

  .mobile {
    margin-top: 23vw;
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 2;
  }

  .mobile img {
    width: 56%;
  }

  .description {
    font-family: FreeSans;
    font-size: 10px;
    text-align: center;
    width: 80%;
    margin-top: 20vw;
  }

  .buttons {
    position: absolute;
    margin-top: 36vw;
    display: flex;
  }

  .buttons .play {
    display: flex;
    width: 25vw;
    height: 7vw;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.8vw;
    margin-right: 12px;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 3vw;
  }

  .buttons .play:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.8);
  }

  .buttons .dahaFazlaBilgi {
    display: flex;
    width: 30vw;
    height: 7vw;
    background: rgba(255, 255, 255, 0.24);
    border-radius: 0.8vw;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
    font-size: 2.2vw;
  }

  .buttons i {
    font-size: 4vw;
  }
}

@media (max-width: 375px){
  .description {
    font-family: FreeSans;
    font-size: 9px;
    text-align: center;
    width: 70%;
    margin-top: 20vw;
  }
    .mobile img {
    margin-top: -1vw;
    width: 50%;
  }
  .main-container-right {

  margin-bottom: -23.5vw;
}

}

@media (max-width: 320px){
.description {
    font-family: FreeSans;
    font-size: 7px;
    text-align: center;
    width: 70%;
    margin-top: 20vw;
  }
  .mobile img {
    margin-top: -2vw;
    width: 50%;
  }


}
</style>