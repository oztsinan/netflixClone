<template>
  <div>
    <div class="maincont">
    <div style="margin-top:5.5vw">
        <h1>Listem</h1>
    <div class="gelenDegerler">
      <content-card
        v-for="item in result"
        :item="item"
        :key="item.id"
        class="card"
      >
      </content-card>
    </div>
    </div>
    </div>


    <app-footer></app-footer>
  </div> 
</template>

<script>
import ContentCard from "../Card/ContentCard.vue";
import appFooter from '../Footer.vue'

export default {
  components: {
    ContentCard,appFooter
  },
  data() {
    return {
      database: null,
      result : null,
    };
  },
  watch: {
    "$store.state.listeyeEklenenler"(gelenveri) {
      
       var sonuclar = []
      var data = this.$store.state.firebaseData;
      var uzunluk = this.$store.state.firebaseData.length;
      var aktifListe = gelenveri;
      for (let i = 0; i < uzunluk; i++) {
        for (let j = 0; j < aktifListe.length; j++) {
          if (data[i].id == aktifListe[j]) {
            sonuclar.push(data[i]);
          }
        }
      }
      
      const filteredArr = sonuclar.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    
    this.result = filteredArr
    },
  },
  mounted(){
    document.querySelector('.header').style.position = 'fixed'
    document.querySelector('.header').style.top = '0'
    document.querySelector('.header').style.left = '0'
  },

  created() {
    this.database = this.$store.state.firebaseData;
    var path = this.$route.fullPath
      if(path.match('id')){
        this.$router.push('/netflixClone/preview/browse/listem')
        //this.$store.state.popup = true
      }



    
     var sonuclar = []
      var data = this.$store.state.firebaseData;
      var uzunluk = this.$store.state.firebaseData.length;
      var aktifListe = this.$store.state.listeyeEklenenler;
      for (let i = 0; i < uzunluk; i++) {
        for (let j = 0; j < aktifListe.length; j++) {
          if (data[i].id == aktifListe[j]) {
            sonuclar.push(data[i]);
          }
        }
      }
      


    

      const filteredArr = sonuclar.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    
    this.result = filteredArr
  },
};
</script>

<style scoped>

h1 {
  font-family: FreeSans;
  font-weight: 100;
  font-size: 20px;
  margin-left: 4.5vw;
}

.maincont {
  display: flex;
  justify-content: flex-start;
  color: white;
  flex-direction: column;
  min-height: 30vw;
}

.card {
  height: 12.2vw;
  margin-right: 15.6vw;
}

.gelenDegerler {
  justify-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  transform: scale(0.95);
  margin-left: 2vw;
}

@media (max-width: 768px){
.maincont{
  margin-top: 5vw;
}
.card {
  height: 15vw;
  margin-right: 24.8vw;
}
}
@media (max-width:425px){
.maincont{
  margin-top: 5vw;
}
.card {
  height: 19vw;
  margin-right: 32vw;
}
}

@media (max-width:425px){
.maincont{
  margin-top: 15vw;
}

}
</style>