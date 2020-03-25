let app = null;
window.addEventListener('load',function () {
    app = new App();
    app.scroll.init();

    document.getElementById('mainMenu').addEventListener('click',function () {
        document.querySelector('.side-menu').classList.toggle('menu-activated');
    });

    document.querySelector('.side-menu').addEventListener('click',function () {
        document.querySelector('.side-menu').classList.toggle('menu-activated');
    });


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
                // console.log(this.parentElement);
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
        let screenItems = document.querySelectorAll('.screen-item');
        for( let i = 0 ; i < screenItems.length ; i++ ) {
            document.getElementById('screen-content').querySelector('.sub-section').classList.remove('screen-active-'+i);
        }
        Array.from(screenItems , function ( el , index ) {
             if( el.classList.contains('active') ){
                 document.getElementById('screen-content').querySelector('.sub-section').classList.add('screen-active-'+index);
             }
        });
        document.getElementById('screen-content').querySelector('.sub-section').classList.remove('screen-active-0');
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

        document.querySelector('.features.feature-1').classList.add('active');
        document.querySelector('.features.feature-2').classList.add('active');
        document.querySelector('.features.feature-3').classList.add('active');

    }

    activate(id) {
        super.activate(id);
        this.init()
    }

    deActivate(id) {
        super.deActivate(id);

        document.querySelector('.features.feature-1').classList.remove('active');
        document.querySelector('.features.feature-2').classList.remove('active');
        document.querySelector('.features.feature-3').classList.remove('active');

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

    get incrrement() {
        return this._incrrement;
    }

    set incrrement(value) {
        this._incrrement = value;
    }

    get slideNumber() {
        return this._slideNumber;
    }

    set slideNumber(value) {
        this._slideNumber = value;
    }

    constructor() {
        super();
        this._slideNumber = 1 ;
        this._incrrement = true ;
        this._stopInterval = 0 ;
        this.init();
    }

    get stopInterval() {
        return this._stopInterval;
    }

    set stopInterval(value) {
        this._stopInterval = value;
    }

    init() {
        super.init();
        let totalSlides = document.getElementById('testimonials-content').querySelector('.sub-section').querySelectorAll('.testimonial').length/2;

        let selfObject = this;
        // console.log( console.trace() );
        let interval = setInterval(function () {
            if( selfObject.stopInterval ){
                clearInterval( interval );
            }
            // console.log( console.trace() );
            selfObject.slide( selfObject.slideNumber );
        },5000);

    }

    activate(id) {
        super.activate(id);
    }

    deActivate(id) {
        super.deActivate(id);
    }

    slide( slideNumber ){

        let slideIsActive = false;
        let testimonials = document.getElementById('testimonials-content').querySelector('.sub-section').querySelectorAll('.testimonial').length/2;
        for( let i = 0 ; i < testimonials ; i++ ) {
            if( slideNumber !== i+1 ){
                document.getElementById('testimonials-content').querySelector('.sub-section').classList.remove('slide-active-'+(i+1));
            }
        }

        document.getElementById('testimonials-content').querySelector('.sub-section').classList.add( 'slide-active-'+slideNumber );

        let selfObject = this ;
        setTimeout(function () {
            if( selfObject.slideNumber === testimonials ){
                selfObject.slideNumber = 1;
            }else{
                selfObject.slideNumber = selfObject.slideNumber+1;
            }
        } , 5000 );

    }

}

class scroll extends base{
    constructor() {
        super();

        let aList = document.querySelectorAll('header nav>ul>li>a');
        Array.from( aList , function ( el , index ) {
            el.addEventListener('click', aClick );
        });

        aList = document.querySelectorAll('.side-menu nav>ul>li>a');
        Array.from( aList , function ( el , index ) {
            el.addEventListener('click', aClick );
        });

        aList = document.querySelectorAll('.footer-information ul>li>a');
        Array.from( aList , function ( el , index ) {
            el.addEventListener('click', aClick );
        });

    }

    init() {
        let selfObject = this;
        this._pageStatus = null ;

        let pageTop = window.visualViewport.pageTop ;
        let usePageTop = pageTop+( document.querySelector('.main-section').offsetHeight/2 );

        Array.from( document.querySelectorAll('.main-section') , function ( section ) {
            let sectionTopPoint = section.offsetTop ;
            let sectionBottomPoint = section.offsetTop+section.offsetHeight ;

            // if(  section.id === "top-content" ){
            //     console.log(  sectionTopPoint );
            //     console.log( usePageTop );
            //     console.log(  sectionBottomPoint );
            //
            //     console.log(  sectionTopPoint <= usePageTop );
            //     console.log( ( sectionTopPoint === 0 && usePageTop < 400 )  );
            //     console.log( sectionBottomPoint > usePageTop   );
            //     console.log( selfObject._pageStatus !== section.id  );
            //     console.log( selfObject._pageStatus  );
            //     console.log(  section.id  );
            // }

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
                        app.features.deActivate( "features-content" );
                        break;
                    case "features-content" :
                        app.features.activate( selfObject._pageStatus );
                        app.screens.deActivate( "screen-content" );
                        app.needs.deActivate( "needs-content" );
                        break;
                    case "screen-content" :
                        app.screens.activate( selfObject._pageStatus );
                        app.testimonials.deActivate( "testimonials-content" );
                        app.features.deActivate( "features-content" );
                        break;
                    case "testimonials-content" :
                        app.testimonials.activate( selfObject._pageStatus );
                        app.team.deActivate( "team-content" );
                        app.screens.deActivate( "screen-content" );
                        break;
                    case "team-content" :
                        app.team.activate( selfObject._pageStatus );
                        app.testimonials.deActivate( "testimonials-content" );
                        break;
                }

            }
        });

    }
}


document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        document.querySelector('.side-menu').classList.remove('menu-activated');
    }
};


let aClick = ( e ) => {
    e.preventDefault();
    let href = e.target.getAttribute('href');
    href = href.replace('#','');
    let offsetTop = document.getElementById(href).offsetTop-100;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
    });
};









