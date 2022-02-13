<template>
    <div class="overlay">
        <div class="header">
            <img src="https://i.ibb.co/WtPHrz9/netflix-logo-png-2562-1.png" alt="">
        </div>
        <div class="frame">
        <div class="loginbox" v-if="!loginKontrol">
            <h1>Oturum Aç</h1>
            <div v-if="errorDiv" class="errorDiv">
                <div v-if="emailError"> Lütfen geçerli bir e-mail adresi giriniz!</div>
                <div v-if="passwordErrorFirst">Lütfen geçerli bir parola giriniz!</div>
                <div v-if="passwordError"><strong>Parola veya E-mail yanlış.</strong><br> Lütfen yeniden deneyin!</div>
            </div>
            <transition name="fade" appear="">
            <div v-if="successDiv" class="successDiv">
                Kayıt başarılı , giriş yapınız
            </div>
            </transition>
            <input type="text" v-model="user.email" placeholder="E-posta veya telefon numarası">
            <input type="password" v-model="user.password" placeholder="Parola">
            <button @click.prevent="onSubmit">Oturum Aç</button>
            <div class="kayit-ol"><p>Netflix'e katılmak ister misiniz? <a @click="loginKontrol = true">Şimdi kaydolun.</a></p></div>
            <div class="kayit-ol-m"><p>Netflix'e üye misiniz? <br> <a @click="loginKontrol = false">Giriş Yap.</a></p></div>

        </div>
         <div id="kayit" class="loginbox" v-if="loginKontrol">
            <h1>Kayıt Ol</h1>
            <div v-if="errorDiv" class="errorDiv">
                <div v-if="emailError"> Lütfen geçerli bir e-mail adresi giriniz!</div>
                <div v-if="passwordErrorFirst">Lütfen geçerli bir parola giriniz!</div>
                <div v-if="passwordError">Email kullanımda ,lütfen farklı email giriniz!</div>
            </div>
            <input type="text" v-model="user.email" placeholder="E-posta veya telefon numarası">
            <input type="password" v-model="user.password" placeholder="Parola">
            <button @click.prevent="kayitOl">Kayıt Ol</button>
            <div class="kayit-ol"><p>Netflix'e üye misiniz? <a @click="loginKontrol = false">Giriş Yap.</a></p></div>
            <div class="kayit-ol-m"><p>Netflix'e üye misiniz? <br> <a @click="loginKontrol = false">Giriş Yap.</a></p></div>


        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'


export default {
    data(){
        return{
            user : {
                email : null,
                password : null,
            },
            loginKontrol : false,
            key : 'AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA',
            errorDiv : false,
            passwordError : false,
            emailError : false,
            passwordErrorFirst : false,
            anaKontrol : [],
            successDiv : false
        }
    },
    methods : {
        onSubmit(){
            var girisYapildi = false

            if(this.anaKontrol[0] == 'devam' && this.anaKontrol[1] == 'devam' ){
                let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
                if(this.loginKontrol){ //kayıtol
                    authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
                }

                axios.post(
                    authLink+'AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA',
                    { email: this.user.email , password:this.user.password , returnSecureToken : true}        
                ).then(response =>{
                    if(response.data.registered == true){
                        this.$store.state.token = response.data.idToken
                        this.$store.state.userEmail= response.data.email 
                        this.$store.state.userLocalID = response.data.localId
                        console.log(response.data);
                        localStorage.setItem("token",this.$store.state.token)
                        localStorage.setItem("userEmail",this.$store.state.userEmail)
                        localStorage.setItem("localId",this.$store.state.userLocalID)
                        this.$router.push('/browse')
                        girisYapildi = true
                    }
                })

                setTimeout(()=>{
                        if(girisYapildi == false){
                            this.errorDiv = true
                            this.passwordError = true
                        }
                },1000)
             
            }

                 
        },
        kayitOl(){
            
            if(this.anaKontrol[0] == 'devam' && this.anaKontrol[1] == 'devam' ){

                
                var authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
                axios.post(
                    authLink+'AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA',
                    { email: this.user.email , password:this.user.password , returnSecureToken : true}        
                ).then(response =>{

                    if(response.data.idToken != ''){
                        this.loginKontrol = !this.loginKontrol
                        this.successDiv = true
                        setTimeout(()=>{
                            this.successDiv = false
                            this.errorDiv = false
                            this.passwordError = false
                        },3000)
                    }
                })

                setTimeout(()=>{
                if(this.successDiv == false){
                 
                    this.errorDiv=true
                    this.passwordError = true
                 
                }
                },1000)

            }
        },
    },
    mounted(){
        document.querySelector('.header').style.display ='none'
    },
    created(){
        if(this.$store.state.baslangicEmail !== null){
            this.user.email = this.$store.state.baslangicEmail
        }
    },
    watch:{
        "user.email"(){
            function emailIsValid (email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            }
           if(emailIsValid(this.user.email)){
               this.emailError = false
               this.errorDiv = false
               this.anaKontrol[0] = 'devam'

           }else{
               this.emailError = true
               this.errorDiv = true
           }
        },
        "user.password"(){

            if(this.user.password == null || this.user.password.length <6){
                this.errorDiv = true
                this.passwordErrorFirst = true
            }

            if(this.user.password.length >=6){
                this.passwordErrorFirst= false
                this.errorDiv = false
                this.anaKontrol[1] = 'devam'
            }
        },
        "loginKontrol"(){
            this.errorDiv = false    
            this.passwordError = false
            this.emailError = false
            this.passwordErrorFirst = false
        }
        
    }
};
</script>

<style scoped>

.kayit-ol-m{
    display: none;
}

.successDiv{
    width: 300px;
    height: auto;
    padding: 10px 0px 10px 0px;
    background: #95f319;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: FreeSans;
    font-size: 13px;
    text-align: center;
    color:rgb(0, 0, 0)   
}

.errorDiv{
    width: 300px;
    height: auto;
    padding: 10px 0px 10px 0px;
    background: #e87c03;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: FreeSans;
    font-size: 13px;
    text-align: center;
    color:white
}

#kayit h1{
    margin-right: 190px;
}

.kayit-ol a{
    color: white;
}

.kayit-ol a:hover{
    cursor: pointer;
    text-decoration: underline;
}

.kayit-ol p{
    color: #8c8c8c;
}

.kayit-ol{
    margin-top: 10px;
}

.header{
    position: absolute;
    width: 200px;
    z-index: 1;
}

.header img{
    width: 80%;
    margin-top: 22px;
    margin-left: 48px;
}

.frame{
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
}

.overlay{
    background: url('https://i.ibb.co/ynf52h8/zgeTuV.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.loginbox h1{
    color: white;
    font-size: 29px;
    margin-right: 150px;
    margin-top: 55px;
}

.loginbox button{
    margin-top: 25px;
    width: 300px;
    height: 45px;
    background: #e50914;
    border: 0px;
    outline: 0px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border-radius: 5px;
}

.loginbox button:hover{
    cursor: pointer;
}

.loginbox input:focus{
   background: #454545;
}

.loginbox input::placeholder{
    color: #8c8c8c;
    font-family: FreeSans;
    font-size: 15px;
}


.loginbox input{
    width: 300px;
    height: 42px;
    background: #333333;
    border: 0px;
    outline: none;
    margin-bottom: 10px;
    border-radius: 5px;
    color: white;
    text-indent:20px;
}


.loginbox{
    width: 423px;
    height: auto;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 50px;
}

@media (max-width:425px){
    .loginbox{
    width: 90%;
    height: auto;
    padding-bottom: 50px;
    }
    .kayit-ol{
        display: none;
    }
    .kayit-ol-m{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .kayit-ol-m a{
    color: white;
    }

    .kayit-ol-m a:hover{
        cursor: pointer;
        text-decoration: underline;
    }

    .kayit-ol-m p{
        color: #8c8c8c;
    }

    .kayit-ol-m{
        margin-top: 10px;
    }
}


</style>