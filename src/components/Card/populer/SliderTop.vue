<template>
<div class="app">

    <div class="title"><h1>{{searchValue}}</h1></div>

    <div class="rectangle" v-if="rectangleBoxShow">
        <div :key="index" v-for="(item,index) in sliderBox">
            <div :style="rectangleSlider(index)" class="rectangle-box"></div>
        </div>
    </div>

    <div class="mainslider"  :style="zindexStyle">
        <div class="slider">
        <div ><button :class="lefticon"   @mouseleave="righticon = 'right-icon' , rectangleBoxShow = false" @mouseover="righticon = 'right-icon-active' , rectangleBoxShow = true"  v-if="leftIconShow" :disabled="isDisable" @click="leftClick"><i class="bi bi-chevron-left"></i></button></div>
        <div ><button :class="righticon"   @mouseleave="lefticon = 'left-icon' , rectangleBoxShow = false" @mouseover="lefticon = 'left-icon-active' , rectangleBoxShow = true"  v-if="rightIconShow" :disabled="isDisable" @click="rightClick"><i class="bi bi-chevron-right"></i></button></div>
    </div>

    <div class="sbox">
        <div class="main">
        <div :style="ClickTransform" class="overflowClass"><card @rowCount="gelen($event)" :rightClickCounter="rightclickcounter" @mouseenter.native="mouseEnterCard" @mouseleave.native="mouseLeaveCard" :database="database" :type="type" :filterData="filterData" :searchValue="searchValue" class="topPosition"></card></div>
    </div>
   
    </div>
    </div>

</div>
</template>

<script>
import Card from './CardTop.vue'
export default {
    props : ['filterData','searchValue','database','type'],
    components:{
        Card
    },
    data(){
        return{
            translateX : 0,
            ClickTransform : '',
            buttonLimit : 0,
            gelenUzunluk : 0,
            lefticon : 'left-icon',
            righticon : 'right-icon',
            zindexdiv : 'z-index:1',
            zindexStyle : '',
            rightclickcounter: 0,
            sliderBox : 0,
            rectangleBoxShow : false,
            leftEnter : 0,
            rightEnter : 0,
            isDisable : false,
        }
    },
    computed : {
        leftIconShow(){
            if(Math.floor(this.translateX) == 0){
                this.righticon = 'right-icon'
                return false
            } 
            else{
                return true
            }
        },
        rightIconShow(){
            /*
            var basmaHakki = Math.floor(this.gelenUzunluk / 6)
                /*
            if(this.buttonLimit == 1){
                this.lefticon =  'left-icon'
            }else if(basmaHakki > 1){
                if(this.buttonLimit == basmaHakki){
                this.lefticon =  'left-icon'
                return false
            }else{
                return true
            }
            }
            */

                    /*
            if(basmaHakki > 1){
                if(this.buttonLimit == basmaHakki){
                this.lefticon =  'left-icon'
                return false
            }else{
                return true
            }
            }
            */
           return true
            

            
        },
    },
    methods :{
        gelen(gonderilecekveri){
            this.gelenUzunluk = gonderilecekveri
        },
        leftClick(){
            this.isDisable = true
            setTimeout(()=>{
                this.isDisable = false
            },1200)

            this.buttonLimit--;
            this.translateX = this.translateX + 62.5;
            var gidicekCLass = 'transform: translateX('+ this.translateX +'vw);  transition: 1s;'
            this.ClickTransform = gidicekCLass
            if(this.rightclickcounter != 0){
                this.rightclickcounter--
            }else if(this.rightclickcounter == 0){
                this.rightclickcounter = this.sliderBox-1
            }

        },
        rightClick(){
            this.isDisable = true
            setTimeout(()=>{
                this.isDisable = false
            },1200)
           
            if(this.rightclickcounter >= this.sliderBox-1){
                setTimeout(()=>{
                this.rightclickcounter = 0
                },900)
            }else{
                var test = 0
                setTimeout(()=>{
                    test++
                this.rightclickcounter++
                },900)
            }

                this.translateX = this.translateX - 62.5
                var gidicekCLass = 'transform: translateX('+ this.translateX +'vw);  transition: 1s;'
                this.ClickTransform = gidicekCLass
       
        },
        mouseEnterCard(){
            this.$emit("indexSensor", this.searchValue);
        },
        mouseLeaveCard(){
            this.$emit("indexSensor", this.searchValue+'end');
        },
        rectangleSlider(index){
            if(index == this.rightclickcounter){
                return 'background: #aaaaaa;'
            }
        },
        beforeDestroy () {
        clearTimeout(this.timeout)
        }
    },
    mounted(){
            this.sliderBox = Math.floor(this.gelenUzunluk/5)

    }

}
</script>

<style scoped>

.rectangle{
    position: absolute;
    display: flex;
    width: 100%;
    height: 10px;
    margin-top: 7.4vw;
    justify-content: flex-end;
    margin-left: -4vw;
}

.rectangle-box{
    width: 0.7vw;
    height: 0.1vw;
    background: #4d4d4d;
    margin-right: 1px;
}




.title{
    position: absolute;
    color: #e5e5e5;
    font-size: 0.7vw;
    font-family: sans-serif;
    margin-left: 3vw;
    margin-top: 4vw;
    z-index: 2;
}

.title h1:hover{
    cursor: pointer;
    color: white;
}

.topPosition{
    margin-top: 8vw;
}


::-webkit-scrollbar{
    display: none;
}

.overflowClass{
  transition: 0.5s;
  position: absolute;

}

.main{
    margin-left: 3vw;
}

.sbox{
    position:relative;
    float:left;
    width:100%; 
    height:24vw;
    overflow: auto;
}

@media (max-width: 786px) {
.sbox{
    height: 27vw;
}
.title{

    font-size: 1.5vw;
    margin-top: 0.3vw;


}
}



.left-icon{
    margin-top: 8vw;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.7vw;
    height: 11.5vw;
    background: rgba(20, 20, 20, 0.35);
    color : white;
    z-index: 3;
    border-bottom-right-radius: 0.4vw;
    border-top-right-radius: 0.4vw;
    border: 0px solid;
    outline: 0px solid;
}

.right-icon{
    margin-top: 8vw;
    right: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75vw;
    height: 11.5vw;
    color : white;
    background: rgba(20, 20, 20, 0.35);
    z-index: 3;
    border-bottom-left-radius: 0.4vw;
    border-top-left-radius: 0.4vw;
    border: 0px solid;
    outline: 0px solid;

}




.left-icon i {
    display: none;
    font-size: 2.3vw;
}

.left-icon:hover i{
    display: block;
}

.left-icon:hover{
    background: rgba(20, 20, 20, 0.5);
    cursor: pointer;
}



.right-icon i{
    display: none;
    font-size: 2.3vw;
}


.right-icon:hover i{
    display: block;
}

.right-icon:hover{
    background: rgba(20, 20, 20, 0.5);
    cursor: pointer;
}
 


.left-icon-active{
    margin-top: 8vw;
    left: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.8vw;
    height: 11.5vw;
    background: rgba(20, 20, 20, 0.35);
    color : white;
    z-index: 2;
    border-bottom-right-radius: 0.4vw;
    border-top-right-radius: 0.4vw;
    cursor: pointer;
    border: 0px solid;
    outline: 0px solid;
}

.right-icon-active{
    margin-top: 8vw;
    right: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.88vw;
    height: 11.5vw;
    background: rgba(20, 20, 20, 0.35);
    z-index: 2;
    border-bottom-left-radius: 0.4vw;
    border-top-left-radius: 0.4vw;
    border: 0px solid;
    outline: 0px solid;
}


@media (max-width:786px){

.right-icon,.right-icon-active,.left-icon,.left-icon-active{
    display: none;
}


}

.right-icon-active i{
    font-size: 1.5vw;
}

.left-icon-active i{
    font-size: 1.5vw;
}




</style>