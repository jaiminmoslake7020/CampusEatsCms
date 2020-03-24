let app = null;
window.addEventListener('load',function () {
    app = new App();
    app.scroll.init();
});


class base {

    constructor() {

    }

    init(){

    }

    activate( id ){
        let sections = document.querySelectorAll('.main-section');
        Array.from( sections , function ( section ) {
            section.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
    }

    deActivate( id ){
        document.getElementById(id).classList.remove('active');
    }

}

class App extends base{

    get topSection() {
        return this._topSection;
    }

    get needs() {
        return this._needs;
    }

    get features() {
        return this._features;
    }

    get team() {
        return this._team;
    }

    get testimonials() {
        return this._testimonials;
    }

    get screens() {
        return this._screens;
    }

    get scroll() {
        return this._scroll;
    }

    constructor() {
        super();
        this._topSection = new topSection();
        this._needs = new needs();
        this._features = new features();
        this._team = new team();
        this._testimonials = new testimonials();
        this._screens = new screens();
        this._scroll = new scroll();

        this.init();
    }

    init() {
        let selfObject = this;
        window.addEventListener('scroll',function(){
            selfObject.scroll.init();
        });
    }

}

class topSection extends base{
    constructor() {
        super();
        this.init();
    }

    init() {
        this._section = document.getElementById('top-content');
        let articleTitle = this._section.querySelector('.article-title');
        let appCafes = document.querySelector('.app-cafes').querySelectorAll('.cafe');
        setTimeout(function () {

            Array.from( appCafes , function ( appCafe ) {
                appCafe.classList.add('active');
            } );

            document.querySelector('.app-welcome-screen').querySelector('.screen-item').classList.add('active');
            articleTitle.classList.add('active');

        },500);
    }

    activate( id ){
        super.activate( id )
        this.init();
    }

    deActivate(id) {
        super.deActivate(id);
        this._section = document.getElementById('top-content');
        let articleTitle = this._section.querySelector('.article-title');
        let appCafes = document.querySelector('.app-cafes').querySelectorAll('.cafe');
        Array.from( appCafes , function ( appCafe ) {
            appCafe.classList.remove('active');
        } );
        document.querySelector('.app-welcome-screen').querySelector('.screen-item').classList.remove('active');
        articleTitle.classList.remove('active');
    }

}

class screens extends base {

    get stopInterval() {
        return this._stopInterval;
    }

    set stopInterval(value) {
        this._stopInterval = value;
    }

    constructor(){
        super();
        this.makeTitleInSpanList();
        this.init();
    }

    activate( id ){
        super.activate( id );
        let screenItemActive = document.getElementById('screen-content').querySelector('.screen-item.active');
        this.makePhoneAppearEffectStart( screenItemActive );
    }

    init() {
        super.init();

        let selfObject = this;
        this._stopInterval = 0 ;
        new Promise(function (resolve, reject) {
            selfObject.makeTitleInSpanList();
            resolve();
        }).then(function () {
            selfObject.screenAnimationSetup();
        }).catch(function ( error ) {
            console.log( error );
        });
    }

    makeTitleInSpanList(){
        let articleTitles = document.getElementById('screen-content').querySelectorAll('.article-title');
        Array.from( articleTitles , function ( articleTitle ) {
            let articleTitleHtml = articleTitle.textContent ;
            articleTitle.innerHTML = '<span>' + articleTitleHtml.split("").join('</span><span>') + '</span>';
        });
    }

    screenAnimationSetup(){
        let screenItemActive = document.getElementById('screen-content').querySelector('.screen-item.active');
        let selfObject = this;
        //selfObject.makePhoneAppearEffectStart( screenItemActive );
        let interval = setInterval(function () {
            if( selfObject.stopInterval ){
                clearInterval( interval );
            }
            selfObject.animateScreen( null );
        },5000);
        this.setupAnimationEvents();
    }

    setupAnimationEvents(){
        let selfObject = this;
        Array.from( document.querySelectorAll('.screen-item:not(.active)>.article-title') , function ( el ) {
            el.addEventListener('click',function () {
                console.log(this.parentElement);
                selfObject.animateScreen( this.parentElement );
            })
        });
    }

    animateScreen( nextElementSibling ){
        let screenItemActive = document.getElementById('screen-content').querySelector('.screen-item.active');
        if( nextElementSibling == null ){
            nextElementSibling = this.getNextElementSibling( screenItemActive );
        }
        screenItemActive.classList.remove('active');
        nextElementSibling.classList.add('active');
        this.makePhoneAppearEffect( screenItemActive , nextElementSibling );
    }

    makePhoneAppearEffect( screenItemActive , nextElementSibling ){
        setTimeout(function () {
            screenItemActive.querySelector('.screen-box').classList.remove('active');
            nextElementSibling.querySelector('.screen-box').classList.add('active');
            setTimeout(function () {
                screenItemActive.querySelector('.screen-regular').classList.remove('active');
                nextElementSibling.querySelector('.screen-regular').classList.add('active');
            },100);
        },600);
    }

    makePhoneAppearEffectStart( screenItemActive ){
        setTimeout(function () {
            screenItemActive.querySelector('.screen-box').classList.add('active');
            setTimeout(function () {
                screenItemActive.querySelector('.screen-regular').classList.add('active');
            },100);
        },600);
    }

    getNextElementSibling( screenItemActive ){
        let nextElementSibling = null ;
        if( screenItemActive.length === 0 ){
            nextElementSibling = document.getElementById('screen-content').querySelector('.screen-item');
        }else{
            nextElementSibling = screenItemActive.nextElementSibling;
        }
        if( nextElementSibling === null ){
            nextElementSibling = document.getElementById('screen-content').querySelector('.screen-item');
        }
        return nextElementSibling;
    }

}

class needs extends base{

    constructor() {
        super();
    }

    init() {
        super.init();

        document.querySelector('.question').classList.add('active');
        document.querySelector('.answers.answer-1').classList.add('active');
        document.querySelector('.answers.answer-2').classList.add('active');
        document.querySelector('.answers.answer-3').classList.add('active');

    }

    activate(id) {
        super.activate(id);
        this.init()
    }

    deActivate(id) {
        super.deActivate(id);

        document.querySelector('.question').classList.remove('active');
        document.querySelector('.answers.answer-1').classList.remove('active');
        document.querySelector('.answers.answer-2').classList.remove('active');
        document.querySelector('.answers.answer-3').classList.remove('active');

    }


}

class features extends base{

    constructor() {
        super();
    }

    init() {
        super.init();

    }

    activate(id) {
        super.activate(id);
        this.init()
    }

    deActivate(id) {
        super.deActivate(id);

    }

}

class team extends base{

    constructor() {
        super();
    }

    init() {
        super.init();

    }

    activate(id) {
        super.activate(id);
        this.init()
    }

    deActivate(id) {
        super.deActivate(id);

    }

}

class testimonials extends base{

    constructor() {
        super();
    }

    init() {
        super.init();

    }

    activate(id) {
        super.activate(id);
        this.init()
    }

    deActivate(id) {
        super.deActivate(id);

    }

}

class scroll extends base{
    constructor() {
        super();
    }

    init() {
        let selfObject = this;
        this._pageStatus = null ;

        let pageTop = window.visualViewport.pageTop ;
        let usePageTop = pageTop+( document.querySelector('.main-section').offsetHeight/2 );

        Array.from( document.querySelectorAll('.main-section') , function ( section ) {
            let sectionTopPoint = section.offsetTop ;
            let sectionBottomPoint = section.offsetTop+section.offsetHeight ;

            if(  section.id === "top-content" ){
                console.log(  sectionTopPoint );
                console.log( usePageTop );
                console.log(  sectionBottomPoint );

                console.log(  sectionTopPoint <= usePageTop );
                console.log( ( sectionTopPoint === 0 && usePageTop < 400 )  );
                console.log( sectionBottomPoint > usePageTop   );
                console.log( selfObject._pageStatus !== section.id  );
                console.log( selfObject._pageStatus  );
                console.log(  section.id  );
            }

            if( ( sectionTopPoint <= usePageTop || ( sectionTopPoint === 0 && usePageTop < 400 ) ) && sectionBottomPoint > usePageTop && selfObject._pageStatus !== section.id ){
                console.log('at '+section.id);
                selfObject._pageStatus = section.id;

                switch ( selfObject._pageStatus ) {
                    case "top-content" :
                        app.topSection.activate( selfObject._pageStatus );
                        app.needs.deActivate( "needs-content" );
                        break;
                    case "needs-content" :
                        app.needs.activate( selfObject._pageStatus );
                        app.topSection.deActivate( "top-content" );
                        app.topSection.deActivate( "features-content" );
                        break;
                    case "features-content" :
                        app.activate( selfObject._pageStatus );
                        app.screens.deActivate( "screen-content" );
                        app.needs.deActivate( "needs-content" );
                        break;
                    case "screen-content" :
                        app.screens.activate( selfObject._pageStatus );
                        app.topSection.deActivate( "testimonials-content" );
                        app.topSection.deActivate( "features-content" );
                        break;
                    case "testimonials-content" :
                        app.activate( selfObject._pageStatus );
                        app.topSection.deActivate( "team-content" );
                        app.screens.deActivate( "screen-content" );
                        break;
                    case "team-content" :
                        app.activate( selfObject._pageStatus );
                        app.topSection.deActivate( "testimonials-content" );
                        break;
                }

            }
        });

    }
}














