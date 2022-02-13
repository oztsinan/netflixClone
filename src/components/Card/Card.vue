<template>
  <div class="row">
    <content-card
      v-for="(item, index) in datatest"
      :item="item"
      :key="index"
      :gelenVeriUzunlugu="uzunluk"
      :uzunlukNumber="index"
      class="card"
    >
    </content-card>
  </div>
</template>

<script>
import ContentCard from "./ContentCard.vue";
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


    if(this.searchValue == "Netflix'te Popüler"){
        var ilkFilter = this.database.filter((item) => item.populer == true);
        this.datatest = ilkFilter
        this.uzunluk = ilkFilter.length;
        var gonderilecekveri = this.uzunluk;
        this.$emit("rowCount", gonderilecekveri);      
    }else if(this.searchValue == "Netflix'teki Yeni İçerikler"){
        var uzunluk = this.database.length
        var newArray =[]
        let filtered = this.database.map(function(value, index) {
          if (index > uzunluk-14) {
            return value
          }
        })
        for(let i=0;i<13;i++){
          newArray.push(filtered[i+(uzunluk-13)])
        }

        this.datatest = newArray
        this.uzunluk = newArray.length;
        var gonderilecekveri = this.uzunluk;
        this.$emit("rowCount", gonderilecekveri); 
    }else{
        if(this.type == 'all'){
        var ilkFilter = this.database.filter((item) => item.category.includes(this.searchValue));
        this.datatest = ilkFilter
        this.uzunluk = ilkFilter.length;
        var gonderilecekveri = this.uzunluk;
        this.$emit("rowCount", gonderilecekveri);
        }else {
            var ilkFilter = this.database.filter((item) => item.type.includes(this.type));
            var sonFilter = ilkFilter.filter(item => item.category.includes(this.searchValue))
            this.datatest = sonFilter
            this.uzunluk = sonFilter.length;
            var gonderilecekveri = this.uzunluk;
            this.$emit("rowCount", gonderilecekveri);
        }
    }
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
