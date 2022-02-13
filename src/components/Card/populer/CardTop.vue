<template>
  <div class="row">
    <content-card
      v-for="(item, index) in datatest"
      :item="item"
      :key="index"
      :getIndex="index"
      :gelenVeriUzunlugu="uzunluk"
      :uzunlukNumber="index"
      class="card"
    >
    </content-card>
  </div>
</template>

<script>
import ContentCard from "./ContentCardTop.vue";
export default {
  props: ["searchValue", "filterData", "database", "title", "type","rightClickCounter"],
  data() {
    return {
      uzunluk: "",
      datatest : '',
    };
  },
  components: {
    ContentCard,
  },
  methods: {
    filter(veri, deger, type) {
      if (veri == "populer") {
        var data = this.database.filter((item) => item.populer == true);
        this.uzunluk = data.length;

        var gonderilecekveri = this.uzunluk;
        this.$emit("rowCount", gonderilecekveri);
        this.data = data
        return data;
      } else if (veri == "category") {
        if (type == "Film" || type == "Dizi") {
          var data = this.database.filter((item) => item.type == type);
          var datalast = data.filter(function (value) {
            for (let i = 0; i < 3; i++) {
              if (value.category[i] == deger) {
                return value.category[i];
              }
            }
          });
          this.uzunluk = datalast.length;
          var gonderilecekveri = this.uzunluk;
          this.$emit("rowCount", gonderilecekveri);

          var sonveri = datalast.concat(datalast)

          for(let i=0;i<this.rightClickCounter;i++){
            var sonveri = datalast.concat(datalast)
          }
          this.data = sonveri
          return this.data;
        } else {
          var data = this.database.filter(function (value) {
            for (let i = 0; i < 3; i++) {
              if (value.category[i] == deger) {
                return value.category[i];
              }
            }
          });
          this.uzunluk = data.length;
          var gonderilecekveri = this.uzunluk;
          this.$emit("rowCount", gonderilecekveri);
          this.data = data
          return data;
        }
      } else if (veri == "all") {
        this.uzunluk = this.database.length;

        var gonderilecekveri = this.uzunluk;
        this.$emit("rowCount", gonderilecekveri);
        this.data = this.database
        return this.database;
      } else if (veri == "altkategori") {
        if (type == "Film" || type == "Dizi") {
          var data = this.database.filter((item) => item.type == type);
          var datalast = data.filter(function (value) {
            for (let i = 0; i < 3; i++) {
              if (value.altKategoriler[i] == deger) {
                
                return value.altKategoriler[i];
              }
            }
          });

          this.uzunluk = datalast.length;
          var gonderilecekveri = this.uzunluk;
          this.$emit("rowCount", gonderilecekveri);


          return datalast;
        }
      }
    },
  },
  watch : {
    "rightClickCounter"(value){
      var newValue = this.datatest.concat(this.datatest.slice(0,this.uzunluk))
      this.datatest = newValue
    }
  },
  created(){
       var ilkFilter = this.database.filter((item) => item.asPopuler == true);
        this.datatest = ilkFilter
        this.uzunluk = ilkFilter.length;
        var gonderilecekveri = this.uzunluk;
        this.$emit("rowCount", gonderilecekveri);    

  }
  

};
</script>

<style scoped>
.card {
  margin-right: 15.57vw;
}

@media (max-width: 786px) {
  .card {
    margin-right: 24.8vw;
  }
}

@media (max-width: 425px){
  .card {
    margin-right: 31vw;
  }
}

@media (max-width: 375px){
  .card {
    margin-right: 31vw;
  }
}

@media (max-width: 320px){
  .card {
    margin-right: 31vw;
  }
}

.row {
  display: flex;
}
</style>
