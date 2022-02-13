<template>
    <div id="footer" class="mainFooter">
        <div class="frame">
            <div class="iconlar">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-youtube"></i>
            </div>
            <div class="linkler">
                <div class="row">
                    <label>Seslendirme ve Alt Yazı</label>
                    <label>Medya Merkezi</label>
                    <label>Gizlilik</label>
                    <label>Bize Ulaşın</label>
                </div>
                <div class="row">
                    <label>Sesli Betimleme</label>
                    <label>Yatırımcı İlişkileri</label>
                    <label>Yasal Hükümler</label>
                </div>
                <div class="row">
                    <label>Yardım Merkezi</label>
                    <label>İş İmkanları</label>
                    <label>Çerez Tercihleri</label>
                </div>
                <div class="row">
                    <label>Hediye Kartları</label>
                    <label>Kullanım Koşulları</label>
                    <label>Kurumsal Bilgiler</label>
                </div>


            </div>
            <div class="hizmet-kodu"><p>Hizmet Kodu</p></div>
            <div class="footer">© 2022 Netflix Clone - Vue Js</div>
        </div>
        <div class="frame2">
            <div class="iconlar">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-youtube"></i>
            </div>
            <div class="linkler2">
                <div class="row">
                    <label>Seslendirme ve Alt Yazı</label>
                    <label>Yardım Merkezi</label>
                    <label>Medya Merkezi</label>
                    <label>İş İmkanları</label>
                    <label>Gizlilik</label>
                    <label>Çerez Tercihleri</label>
                    <label>Bize Ulaşın</label>
                </div>
                <div class="row">
                    <label>Sesli Betimleme</label>
                    <label>Hediye Kartları</label>
                    <label>Yatırımcı İlişkileri</label>
                    <label>Kullanım Koşulları</label>
                    <label>Yasal Hükümler</label>
                    <label>Kurumsal Bilgiler</label>
                </div>


            </div>
            <div class="hizmet-kodu"><p>Hizmet Kodu</p></div>
            <div class="footer">© 2022 Netflix Clone - Vue Js</div>
        </div>
    </div>
</template>

<style scoped>


.mainFooter{
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.frame{
    display: flex;
    flex-direction: column;
    width: 890px;
    height: 250px;
    color: #808080;
    padding-left: 20px;
    padding-right: 20px;
}

.frame2{
    display: none;
    flex-direction: column;
    width: 890px;
    height: 350px;
    color: #808080;
    padding-left: 20px;
    padding-right: 20px;
}

.linkler2{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 46%;
}

.linkler2 .row:nth-child(2){
    margin-right: 80px;
}

@media (max-width:580px){
    .frame{
        display: none;
    }
    .frame2{
        display: flex;
    }
}

.frame2 .hizmet-kodu{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}

.footer{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    font-size: 10.2px;
    height: 10%;

}

.hizmet-kodu{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 24%;
}

.hizmet-kodu p{
    font-size: 12px;
    padding: 6px;
    border: 1px solid #808080;;
}
.hizmet-kodu p:hover{
    color :white;
    cursor: pointer;
}

.linkler{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 46%;

}

.iconlar{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 20%;
    margin-left: 9px;
    margin-bottom: 4px;
}

.iconlar i{
    font-size: 20px;
    margin-right: 30px;
    color: white;
}

.row{
    display: flex;
    flex-direction: column;
}

.row label{
    font-size: 12px;
    margin-bottom: 15px;
}

.row label:hover{
    cursor: pointer;
    text-decoration: underline;
}
</style>