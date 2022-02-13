<template>
<div>
    <div class="maincont">
    <div style="margin-top:5.5vw">
      <h1>Aranan Deger : {{ gelenArananDeger }}</h1>

    <div class="gelenDegerler" v-if="gelenArananDeger.length > 1">
      <content-card
        v-for="item in filter(gelenArananDeger)"
        :item="item"
        :key="item.id"
        class="card"
      >
      </content-card>
    </div>

    <div class="notFounded" v-if="veriuzunluk == 0">
      <p>"{{gelenArananDeger}}" aramanız herhangi bir sonuç getirmedi.</p>      
      <p>Öneriler :</p>
      <ul>
        <li>Farklı anahtar sözcükleri deneyin</li>
        <li>Bir filmi veya diziyi mi arıyorsunuz?</li>
        <li>Film,dizi,program,oyuncu veya yönetmen adıyla deneyin</li>
        <li>Komedi , aşk , spor veya drama gibi bir tür deneyin</li>
      </ul>
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
      gelenArananDeger: null,
      database: null,
      veriuzunluk : null,
    };
  },
  watch: {
    "$store.state.searchValue"(gelenveri) {
      this.gelenArananDeger = gelenveri;
    },
  },
  methods: {
    filter(deger) {
      var database = this.database;
      
      var result = database.filter(
        (item) =>
          item.title.toLowerCase().match(deger.toLowerCase()) ||
          item.oyuncuKadrosu[0].toLowerCase().match(deger.toLowerCase()) ||
          item.category[0].toLowerCase().match(deger.toLowerCase()) ||
          item.category.includes(deger.toLowerCase()) ||
          item.altKategoriler.includes(deger.toLowerCase()) ||
          item.oyuncuKadrosu.includes(deger.toLowerCase()) ||
          item.senarist.includes(deger.toLowerCase()) ||
          item.yonetmen.includes(deger.toLowerCase())

      ); // isim[0]

      const filteredArr = result.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

      this.veriuzunluk = filteredArr.length
      return filteredArr;


    },
  },
  mounted(){
    document.querySelector('.header').style.position = 'fixed'
    document.querySelector('.header').style.top = '0'
    document.querySelector('.header').style.left = '0'
  },
  created() {
    this.gelenArananDeger = this.$store.state.searchValue
    this.database = this.$store.state.firebaseData;
  },
};
</script>

<style scoped>

.notFounded{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
}

h1 {
  font-family: FreeSans;
  font-weight: 100;
  font-size: 17px;
  margin-left: 4.5vw;
}

.maincont {
  display: flex;
  justify-content: flex-start;
  color: white;
  flex-direction: column;
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

@media (max-width: 786px){
.maincont{
  margin-top: 3vw;
}
.card {
  height: 15vw;
  margin-right: 25vw;
}
}

@media (max-width: 425px){
.maincont{
  margin-top: 18vw;
}
.card {
  height: 19vw;
  margin-right: 32vw;
}
}

@media (max-width: 320px){
.maincont{
  margin-top: 22vw;
}
}
</style>