class App{

    get stopInterval() {
        return this._stopInterval;
    }

    set stopInterval(value) {
        this._stopInterval = value;
    }

    constructor(){
        this._stopInterval = 0 ;
       // this.screenAnimationSetup();
    }

    screenAnimationSetup(){
        let selfObject = this;
        let interval = setInterval(function () {

            if( selfObject.stopInterval ){
                clearInterval( interval );
            }

            let screenItemActive = document.getElementById('screen-content').querySelector('.screen-item.active');
            let nextElementSibling = null ;
            if( screenItemActive.length === 0 ){
                nextElementSibling = document.getElementById('screen-content').querySelector('.screen-item');
                console.log( nextElementSibling );
            }else{
                nextElementSibling = screenItemActive.nextElementSibling;
                console.log( nextElementSibling );
            }

            if( nextElementSibling === null ){
                nextElementSibling = document.getElementById('screen-content').querySelector('.screen-item');
            }

            console.log(screenItemActive);
            console.log(nextElementSibling);

            screenItemActive.classList.remove('active');
            nextElementSibling.classList.add('active');
            setTimeout(function () {
                screenItemActive.querySelector('.screen-regular').classList.remove('active');
                nextElementSibling.querySelector('.screen-regular').classList.add('active');
            },1000);

        },5000);

    }



}

let app = null;
window.addEventListener('load',function () {
      app = new App();
});



