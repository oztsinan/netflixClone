<template>
    <div class="preloader">
        <div class="card-frame">
            <div class="top">
                <div class="card"></div>
            </div>
            <div class="bottom">
                <div class="bottom-inside">
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>


.top .card{
    width: 100px;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 0.2vw;
}

.bottom-inside{
    display: flex;
}

.card-frame{
    margin-left: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.top{
}

.bottom{
    display: flex;

}



.card{
    width: 250px;
    height: 150px;
    background: linear-gradient(90deg, rgba(51,51,51,1) 0%, rgba(25,25,25,1) 62%);
    border-radius: 0.5vw;
    background-size: 400% 400%;
	animation: gradient 2s ease infinite;
    margin-right: 5px;
}

.card:nth-child(1){
    animation-delay: 1s;
}

.card:nth-child(2){
    animation-delay: 1.5s;
}


.card:nth-child(3){
    animation-delay: 2s;
}

.card:nth-child(4){
    animation-delay: 2.5s;
}

.card:nth-child(5){
    animation-delay: 3s;
}


.card:nth-child(6){
    animation-delay: 3.5s;
}

.card:nth-child(7){
    animation-delay: 4s;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 200%;
	}
}


.preloader{
    width: 100%;
    height: auto;
    display: flex;
    z-index: 5;
    color: white;
    margin-top: 5vw;
}



@media (max-width:660px){
    .top{
        display: none;
    }
    .preloader{
        margin-top: 20vw;
    }
    .bottom-inside{
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .card{
        margin-bottom: 5vw;
        margin-right: 0px;
        width: 70vw;
    }
    .card-frame{
        margin-left: 0vw;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    
}



</style>