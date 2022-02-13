<template>
  <div class="overlay">
    <div class="header">
      <img src="https://i.ibb.co/WtPHrz9/netflix-logo-png-2562-1.png" alt="" />
    </div>
    <div class="loginbutton">
      <button @click="login" class="login">Oturum Aç</button>
    </div>
    <div class="frame">
      <div class="content">
        <h1>Sınırsız film, dizi ve çok daha fazlası.</h1>
        <p>İstediğiniz yerde izleyin. İstediğiniz zaman iptal edin.</p>
        <p2
          >İzlemeye hazır mısınız? Üyelik oluşturmak veya üyeliğinize erişmek
          için e‑posta adresinizi girin.</p2
        >
        <div class="inputDiv">
          <input type="text" v-model="baslangic" placeholder="E-posta adresi" />
          <button @click="clickButton">
            Başlayın<i class="bi bi-chevron-right"></i>
          </button>
        </div>
        <div class="errorBox" v-if="errorBox">
          Lütfen geçerli bir e-mail adresi giriniz!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baslangic: null,
      errorBox: false,
    };
  },
  methods: {
    clickButton() {
        if(this.baslangic == null){
            this.errorBox = true
        }else{
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (this.baslangic.match(validRegex)) {
            this.$store.state.baslangicEmail = this.baslangic
            this.$router.push('/login')
            } else {


        }
        }
    },
    login(){
        this.$router.push('/login')
    }
  },
  mounted() {
    document.querySelector(".header").style.display = "none";
  },
};
</script>

<style scoped>
.errorBox {
  width: 455px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  margin-left: 48px;
  border-bottom-right-radius: 3px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  font-family: FreeSans;
  align-items: center;
}

.inputDiv i {
  font-size: 20px;
  margin-left: 7px;
}

.loginbutton {
  position: absolute;
  right: 0;
  z-index: 1;
  padding: 20px;
}

.login:hover {
  cursor: pointer;
}

.login {
  width: 113px;
  height: 33px;
  border-radius: 3px;
  border: 0px;
  outline: 0px;
  color: white;
  background: #e50914;
  font-family: FreeSans;
  font-weight: 500;
}

.inputDiv button {
  width: 200px;
  margin-top: 0.8px;
  height: 62.3px;
  border: 0px;
  outline: 0px;
  background-color: #e30914;
  color: white;
  font-size: 30px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputDiv button:hover {
  cursor: pointer;
  background-color: #f40612;
}

.inputDiv input {
  width: 450px;
  height: 60px;
  border: 0px;
  outline: 0px;
  text-indent: 10px;
}

.inputDiv {
  margin-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content p2 {
  margin-top: -18px;
  font-size: 17px;
}

.content p {
  margin-top: -18px;
  font-size: 24px;
}

.content {
  font-family: sans-serif;
  text-align: center;
  width: 750px;
  height: 500px;
  color: white;
  font-size: 28px;
}

.header {
  position: absolute;
  width: 200px;
  z-index: 1;
}

.header img {
  width: 80%;
  margin-top: 22px;
  margin-left: 48px;
}

.overlay {
  background: url("https://i.ibb.co/ynf52h8/zgeTuV.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.frame {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
}

@media (max-width: 748px) {
  .content {
    width: 90%;
  }
  .errorBox {
    width: 100%;
    margin-left: 0px;
  }
}
</style>