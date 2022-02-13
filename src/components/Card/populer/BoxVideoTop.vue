<template>
    <div class="placeholder-video">
        <video id="videoDiv" autoplay :muted="cardVideoControl" loop :src="video"></video>
    </div>
</template>

<script>
export default {
    props:['video'],
    data(){
        return{
        cardVideoControl : null,
        isloaded : false
        }
    },
    watch : {
        "$store.state.cardSound"(){
            this.cardVideoControl = this.$store.state.cardSound
        },
        "$store.state.cardCounter"(){
            if(this.$store.state.cardCounter > document.querySelector('#videoDiv').duration){
                this.$store.state.cardCounter = 0
                clearInterval(this.$store.state.cardInterval)
                var counter = 0
                var newcardinterval = setInterval(()=>{
                    counter++;
                    this.$store.state.cardCounter = counter
                },1000)
                newcardinterval = this.$store.state.cardInterval

            } 

        }
    },
    created(){
        this.cardVideoControl = this.$store.state.cardSound
    },
}
</script>

<style scoped>
.placeholder-video{
    position: absolute;
    z-index: 2;
    margin-top: -9vw;
    overflow: hidden;
    border-top-left-radius: 0.2vw;
    border-top-right-radius: 0.2vw;
    transition: 0.3s;
}

.placeholder-video video{
    transform: scale(1.44);

}

.placeholder video{
    width: 100%;

}
</style>