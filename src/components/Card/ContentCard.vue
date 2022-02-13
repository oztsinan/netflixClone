<template>
  <div>
    <div id="default" class="card">
      <div
        class="card-default"
        :style="cardDefaultStyle"
        @mouseover="mouseOverDefault"
        @mouseleave="mouseLeaveDefault"
      >
        <img :src="item.img" alt="" />
      </div>
      <div :style="{ '--margin-value': marginValue + 'vw' }">
        <transition name="fade" mode="out-in" appear="">
          <div
            class="card-hover"
            :style="cardHoverzindex"
            v-if="cardHoverControl"
            @mouseleave="mouseLeaveHover"
          >
            <transition
              name="fade"
              mode="out-in"
              v-if="placeholderVideo"
              appear
            >
              <div class="logo-soundControl">
                <div class="logo-soundControl-img">
                  <img :src="item.logo" alt="" />
                </div>
                <div class="logo-soundControl-button">
                  <div class="buttons-sound" @click="VolumeControlf">
                    <i
                      :class="mutedControl ? mutedClass : mutedClassActive"
                    ></i>
                  </div>
                </div>
              </div>
            </transition>
            <div class="placeholder" :style="placeholderStyleControl">
              <img :style="borderStyle" :src="item.img" alt="" />

              <transition
                name="fade"
                mode="out-in"
                v-if="placeholderVideo"
                appear
              >
                <component :video="item.videosrc" :is="'BoxVideo'"></component>
              </transition>
            </div>
            <transition name="fade" mode="out-in" v-if="infoTransition" appear>
              <div class="info" :style="infoStyleControl">
                <div class="info-top">
                  <div class="info-top-left">
                    <router-link
                      :to="{ path: '/watch', query: { id: item.id } }"
                      ><div class="buttons-play">
                        <i class="bi bi-play-fill"></i></div
                    ></router-link>
                    <div
                      rel="preload"
                      @click="listeyeEklendi"
                      class="buttons-plus"
                    >
                      <i
                        :class="
                          listeyeEklendiClass ? 'bi bi-check' : 'bi bi-plus'
                        "
                      ></i>
                    </div>
                    <div rel="preload" @click="likeButtonf" class="buttons">
                      <i
                        :class="
                          likeButtonClass
                            ? 'bi bi-hand-thumbs-up-fill'
                            : 'bi bi-hand-thumbs-up'
                        "
                      ></i>
                    </div>
                    <div rel="preload" @click="dislikeButtonf" class="buttons">
                      <i
                        :class="
                          dislikeButtonClass
                            ? 'bi bi-hand-thumbs-down-fill'
                            : 'bi bi-hand-thumbs-down'
                        "
                      ></i>
                    </div>
                  </div>
                  <div class="info-top-right">
                    <router-link :to="{ query: { id: item.id } }"
                      ><div class="buttons" @click="openPopup">
                        <i class="bi bi-chevron-down"></i></div
                    ></router-link>
                  </div>
                </div>
                <div class="info-middle" v-if="newAndDateControl">
                  <div class="new-date" style="margin-left: 0.65vw">
                    <p>{{ item.newAndDate }}</p>
                  </div>
                  <div class="age">{{ item.age }}+</div>
                  <div class="time">{{ item.time }}</div>
                  <div class="hd">{{ item.videoQuality }}</div>
                </div>
                <div class="info-middle" v-if="!newAndDateControl">
                  <div class="age" style="margin-left: 0.7vw">
                    {{ item.age }}+
                  </div>
                  <div class="time">{{ item.time }}</div>
                  <div class="hd">{{ item.videoQuality }}</div>
                </div>
                <div class="info-bottom" style="margin-left: 0.65vw">
                  <p :key="index" v-for="(item, index) in item.altKategoriler">
                    {{ item }}
                    <label v-if="index < altKategorilerLength">●</label>
                  </p>
                </div>
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <div id="mobile" class="card">
      <router-link tag="div" @click.native="mobileOpenPopup" class="card-mobile" :to="{ query: { id: item.id } }" >
        <img style="border-radius:0.7vw" :src="item.img" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script>
import BoxVideo from "./BoxVideo.vue";
export default {
  components: {
    BoxVideo,
  },
  props: ["item", "uzunlukNumber", "title"],
  data() {
    return {
      mutedClass: "fas fa-volume-mute",
      mutedClassActive: "fas fa-volume-up",
      mutedControl: null,
      mouseControl: false,
      zindex: "",
      cardHoverControl: false,
      cardDefaultControl: true,
      cardDefaultStyle: "",
      infoClassControl: "info-active",
      placeholderStyleControl: "",
      cardHoverzindex: "",
      database: null,
      infoStyleControl: "opacity: 1; ",
      borderStyle: "",
      overInterval: null,
      marginValue: 0,
      placeholderVideo: false,
      infoTransition: false,
      cardAltkategorilerNokta: null,
      altKategorilerLength: Object.keys(this.item.altKategoriler).length - 1,
      newAndDateControl: false,
      mouseLeaveControlCounter: 0,
      listeyeEklendiClass: null,
      likeButtonClass: null,
      dislikeButtonClass: null,
    };
  },
  computed: {
    noktaKontrol() {
      var uzunluk = Object.keys(this.item.altKategoriler).length;
    },
  },
  created() {
    this.mutedControl = this.$store.state.cardSound;

    var filter = this.$store.state.listeyeEklenenler.filter(
      (item) => item == this.item.id
    );
    if (filter == (Array.length == 0)) {
      this.listeyeEklendiClass = false;
    } else {
      this.listeyeEklendiClass = true;
    }

    var filter2 = this.$store.state.begenilenIcerikler.filter(
      (item) => item == this.item.id
    );
    if (filter2 == (Array.length == 0)) {
      this.likeButtonClass = false;
    } else {
      this.likeButtonClass = true;
    }

    var filter3 = this.$store.state.begenilmeyenIcerikler.filter(
      (item) => item == this.item.id
    );
    if (filter3 == (Array.length == 0)) {
      this.dislikeButtonClass = false;
    } else {
      this.dislikeButtonClass = true;
    }

    if (typeof this.item.newAndDate == "string") {
      if (Object.keys(this.item.newAndDate).length >= 1) {
        this.newAndDateControl = true;
      }
    }

    if (this.uzunlukNumber == 0) {
      this.marginValue = 4;
    } else if (this.uzunlukNumber == 5) {
      this.marginValue = -3.8;
    } else if (this.uzunlukNumber > 3 && this.uzunlukNumber % 6 == 0) {
      this.marginValue = 4;
    } 

    for(let i=11;i<40;i+=6){
        if(this.uzunlukNumber == i){
          this.marginValue = -3.8;
        }
    }
  },
  methods: {
    openPopup() {

      this.$store.state.popup = true;
      this.$store.state.popupNextVideoSecond = this.$store.state.cardCounter;
      clearInterval(this.$store.state.cardInterval);
      this.item.popup = "card";
      this.mouseLeaveControlCounter++;
    },
    mobileOpenPopup(){
      this.$store.state.popup = true;
    },
    mouseOverDefault() {
      var sayac = 0;
      this.overInterval = setInterval(() => {
        sayac++;
        if (sayac == 1) {
          this.$store.commit("setBigVideoPlayerControl", false);
          this.placeholderStyleControl = "opacity : 1";
          this.cardHoverControl = true;
          this.cardHoverzindex = "z-index:3;";
          this.infoTransition = true;
          this.infoStyleControl = "opacity : 1 ;";

          setTimeout(() => {
            var cardCounter = 0;
            var cardInterval = setInterval(() => {
              cardCounter++;
              this.$store.state.cardCounter = cardCounter;
            }, 1000);
            this.$store.state.cardInterval = cardInterval;

            this.placeholderVideo = true;
          }, 800);
        }
      }, 600);
    },
    mouseLeaveHover() {
      if (this.mouseLeaveControlCounter == 1) {
        this.$store.commit("setBigVideoPlayerControl", false);
        this.mouseLeaveControlCounter = 0;
      } else if (this.mouseLeaveControlCounter == 0) {
        setTimeout(() => {
          this.$store.commit("setBigVideoPlayerControl", true);
        }, 400);
      }

      clearInterval(this.$store.state.cardInterval);

      this.placeholderVideo = false;
      this.placeholderStyleControl = "opacity : 0;    transition: 5s;";
      this.infoStyleControl = "opacity :0";
      this.borderStyle =
        "border-bottom-left-radius: 0.2vw; border-bottom-right-radius: 0.2vw;";
      setTimeout(() => {
        this.cardDefaultStyle = "opacity : 1";
      }, 300);
      setTimeout(() => {
        this.cardHoverzindex = "opacity :0; transition: 0.25s; z-index:2;";
        this.cardHoverControl = false;
        var zindexset = "z-index : 2";
      }, 600);
    },
    mouseLeaveDefault() {
      clearInterval(this.overInterval);
    },
    VolumeControlf() {
      this.$store.state.cardSound = !this.$store.state.cardSound;
    },
    listeyeEklendi() {
      this.listeyeEklendiClass = !this.listeyeEklendiClass;
      var data = this.$store.state.listeyeEklenenler;

      if (this.listeyeEklendiClass == false) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == this.item.id) {
            data.splice(i, 1);
          }
        }
      } else {
        this.$store.state.listeyeEklenenler.push(this.item.id);
      }
    },
    likeButtonf() {
      if (this.dislikeButtonClass == true) {
        var data2 = this.$store.state.begenilmeyenIcerikler;
        for (let i = 0; i < data2.length; i++) {
          if (data2[i] == this.item.id) {
            data2.splice(i, 1);
          }
        }
      }

      var data = this.$store.state.begenilenIcerikler;
      this.likeButtonClass = !this.likeButtonClass;
      if (this.likeButtonClass == false) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == this.item.id) {
            data.splice(i, 1);
          }
        }
      } else {
        this.$store.state.begenilenIcerikler.push(this.item.id);
      }
    },
    dislikeButtonf() {
      if (this.likeButtonClass == true) {
        var data2 = this.$store.state.begenilenIcerikler;
        for (let i = 0; i < data2.length; i++) {
          if (data2[i] == this.item.id) {
            data2.splice(i, 1);
          }
        }
      }

      var data = this.$store.state.begenilmeyenIcerikler;
      this.dislikeButtonClass = !this.dislikeButtonClass;
      if (this.dislikeButtonClass == false) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == this.item.id) {
            data.splice(i, 1);
          }
        }
      } else {
        this.$store.state.begenilmeyenIcerikler.push(this.item.id);
      }
    },
  },
  watch: {
    "$store.state.cardSound"(gelenveri) {
      this.mutedControl = gelenveri;
    },
    "$store.state.begenilenIcerikler"() {
      var filter2 = this.$store.state.begenilenIcerikler.filter(
        (item) => item == this.item.id
      );
      if (filter2 == (Array.length == 0)) {
        this.likeButtonClass = false;
      } else {
        this.likeButtonClass = true;
      }
    },
    "$store.state.begenilmeyenIcerikler"() {
      var filter3 = this.$store.state.begenilmeyenIcerikler.filter(
        (item) => item == this.item.id
      );
      if (filter3 == (Array.length == 0)) {
        this.dislikeButtonClass = false;
      } else {
        this.dislikeButtonClass = true;
      }
    },
    "$store.state.listeyeEklenenler"() {
      var filter3 = this.$store.state.listeyeEklenenler.filter(
        (item) => item == this.item.id
      );
      if (filter3 == (Array.length == 0)) {
        this.listeyeEklendiClass = false;
      } else {
        this.listeyeEklendiClass = true;
      }
    },
  },
};
</script>

<style scoped>

#mobile {
  display: none;
}

#mobile:hover{
  cursor: pointer;
}

@media (max-width: 786px) {
  #default {
    display: none;
  }

  #mobile {
    display: block;
  }

  .card-mobile {
    position: absolute;
    width: 24vw;
    transition: 0.3s;
  }
}


@media (max-width: 425px) {
  #default {
    display: none;
  }

  #mobile {
    display: block;
  }

  .card-mobile {
    position: absolute;
    width: 30vw;
    transition: 0.3s;
  }
}

.logo-soundControl-img img {
  width: 70%;
  margin-left: 0.6vw;
}

.logo-soundControl-img {
  display: flex;
  width: 80%;
}

.logo-soundControl-button {
  display: flex;
  justify-content: flex-end;
  width: 20%;
  margin-right: 0.46vw;
  z-index: 3;
}

.logo-soundControl {
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  width: 100%;
  height: 83%;
  z-index: 3;
  align-items: flex-end;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-bottom {
  margin-top: -0.4vw;
  margin-left: 0.5vw;
  display: flex;
  justify-content: flex-start;
  font-size: 0.5vw;
  align-items: center;
  color: white;
}

.info-bottom p {
  margin-right: 0.37vw;
  color: #e5e5e5;
  font-size: 0.55vw;
}

.info-bottom label {
  font-size: 0.24vw;
  color: #595959;
  margin-left: 0.37vw;
}

.hd {
  border: 0.1vw solid #747474;
  width: 0.8vw;
  height: 0.4vw;
  border-radius: 0.1vw;
  font-size: 0.35vw;
  background: #181818;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.33vw;
}

.time {
  font-size: 0.53vw;
  margin-right: 0.33vw;
}

.age {
  height: 0.54vw;
  border: 0.1vw solid #747474;
  width: 1.2vw;
  background: #181818;
  font-size: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.33vw;
}

.new-date {
  margin-left: 0.55vw;
  font-size: 0.55vw;
  font-weight: 600;
  color: #46d369;
  margin-right: 0.33vw;
}

.year {
  margin-left: 0.55vw;
  font-size: 0.55vw;
  font-weight: 600;
  margin-right: 0.33vw;
}

.info-middle {
  margin-top: -0.2vw;
  display: flex;
  width: 100%;
  font-size: 0.6vw;
  justify-content: flex-start;
  align-items: center;
  color: white;
}

.info-top {
  margin-top: 0.37vw;
  display: flex;
}

.info-top-left {
  width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.5vw;
}

.info-top-right {
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 0.45vw;
}

.buttons {
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.7vw;
  height: 1.7vw;
  background-image: url("https://i.ibb.co/7SnYQYn/buttonbg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
  color: white;
  margin-right: 0.15vw;
}

.buttons:hover {
  cursor: pointer;
  background-image: url("https://i.ibb.co/JctwFLk/buttonbg-hover.png");
}

.buttons-sound {
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.7vw;
  height: 1.7vw;
  background-image: url("https://i.ibb.co/D4YtP6J/buttonbg-sound.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
  color: white;
  margin-right: 0.15vw;
  opacity: 0.38;
  transition: 0.35s;
}

.buttons-sound:hover {
  cursor: pointer;
  opacity: 1;
}

.buttons-plus {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.7vw;
  height: 1.7vw;
  background-image: url("https://i.ibb.co/7SnYQYn/buttonbg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
  color: white;
  margin-right: 0.15vw;
  font-size: 1.44vw;
}

.buttons-plus i {
  margin-top: 0vw;
}

.buttons-plus:hover {
  cursor: pointer;
  background-image: url("https://i.ibb.co/JctwFLk/buttonbg-hover.png");
}

.buttons-play {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.7vw;
  height: 1.7vw;
  background-image: url("https://i.ibb.co/6gQ9d4Z/buttonbg-play.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
  color: black;
  margin-right: 0.15vw;
  font-size: 1.47vw;
}

.buttons-play i {
  margin-left: 0.2vw;
}

.buttons-play:hover {
  cursor: pointer;
  background-image: url("https://i.ibb.co/1bMRBzy/buttonbg-play-hover.png");
}

.placeholder img {
  border-top-left-radius: 0.2vw;
  border-top-right-radius: 0.2vw;
}

.card-default {
  position: absolute;
  width: 15.23vw;
  height: 8.6vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.3s;
}

.card-default img {
  border-radius: 0.2vw;
}

.card-default:hover {
  cursor: pointer;
}

.card-hover {
  position: absolute;
  width: 15.23vw;
  height: 10vw;
  transition: 0.25s;
}

.card-hover:hover {
  margin-left: var(--margin-value);
  margin-top: -3.5vw;
  cursor: pointer;
  transition: 0.3s;
  /*transform: scale(1.52);*/
  transform: scale(1.52);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.8);
}

.info {
  font-family: FreeSans;
  position: absolute;
  margin-top: -0.4vw;
  background: #181818;
  width: 100%;
  height: 5.5vw;
  border-bottom-left-radius: 0.2vw;
  border-bottom-right-radius: 0.2vw;
  transition: 0.25s;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
}

.info-active {
  animation: fadeIn 0.25s;
  position: absolute;
  margin-top: -0.4vw;
  animation: fadeIn 0.25s;
  background: #181818;
  width: 100%;
  height: 5.5vw;
  opacity: 1;
  border-bottom-left-radius: 0.2vw;
  border-bottom-right-radius: 0.2vw;
  transition: 0.25s;
}

.info-top {
  width: 100%;
  height: 40%;
}

.info-middle {
  width: 100%;
  height: 30%;
}

.info-bottom {
  width: 100%;
  height: 30%;

  border-bottom-left-radius: 0.2vw;
  border-bottom-right-radius: 0.2vw;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

img {
  width: 100%;
}

.cardGecis-enter-active,
.cardGecis-leave-active {
  transition: opacity 0.5s;
}
.cardGecis-enter, .cardGecis-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave {
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
