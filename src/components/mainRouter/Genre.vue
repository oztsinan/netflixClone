<template>
<div>
    <div class="main" v-if="true">
        <p>{{$route.query.p}}</p>
        <div class="card-frame">
            <content-card class="card" :key="item.id" v-for="item in sonuc" :item="item"></content-card>
        </div>
    </div>    

    <app-footer></app-footer>

</div>
</template>

<script>
import ContentCard from '../Card/ContentCard.vue'
import appFooter from '../Footer.vue'
export default {
    components : {
        ContentCard,appFooter
    },
    data(){
        return{
            result : '',
            sonuc : ''
        }
    },
    created(){

        window.scrollTo(0,0);
        this.database = this.$store.state.firebaseData;
        this.result = this.database.filter( item=> item.oyuncuKadrosu.indexOf(this.$route.query.p) >=0)

        if(this.result.length == 0){
            this.result = this.database.filter(item=> item.category.indexOf(this.$route.query.p) >=0)
        }

        if(this.result.length == 0){
            this.result = this.database.filter(item=> item.yonetmen.indexOf(this.$route.query.p) >=0)
        }

        if(this.result.length == 0){
            this.result = this.database.filter(item=> item.senarist.indexOf(this.$route.query.p) >=0)
        }
            var data = this.result
            const filteredArr = data.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
            }, []);    

            this.sonuc = filteredArr


    },
}
</script>

<style scoped>
p{
    color:white;
    font-size: 25px;
    margin-left: 5vw;
}
.main{
  display: flex;
  justify-content: flex-start;
  color: white;
  flex-direction: column;
  margin-top: 5vw;
}

.card{
    height: 12.2vw;
    margin-right: 15.6vw;
}

.card-frame{
    width: 90%;
    height: auto;
    justify-content: flex-start;
    margin-left: 5vw;
    flex-wrap: wrap;
    display: flex;
}

@media (max-width: 786px){
    .card{
        margin-right: 25vw;
        margin-bottom: 3vw;
    }
    .main{
        margin-top: 10vw;
    }

}

@media (max-width: 425px){
    .card{
        transform: scale(1.3);
        margin-right: 41vw;
        margin-bottom: 12vw;
    }
    .main{
        margin-top: 10vw;
    }
    .card-frame{
        justify-content: center;
    }
    p{
        width: 100%;
        font-size: 30px;
        text-align: center;
        margin-left: 0px;
    }


}


</style>