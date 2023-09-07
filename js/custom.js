const HEADER = document.querySelector('.header');
const ASIDE = document.querySelectorAll('.m_link li');
const SECTION = document.querySelectorAll('.section');

const COVER_BTN = document.querySelector('.util');
const COVER = document.querySelector('.cover');
const COVER_A = document.querySelectorAll('.cover>ul a');
const SLOGAN = document.querySelector('.intro .slogan');
const BOX_COVER = document.querySelector('.box_cover');


const SLIDE = document.querySelector('#slide_move');
const SLIDE_ITM = document.querySelectorAll('#slide_move .num');
const S_PAGENATION = document.querySelectorAll('.s_pagenation ul li');

let NUM = true;

new fullpage('#main', {
    anchors: ['introduction', 'portfolio', 'training', 'profile'],
    css3: false,
    scrollOverflow: false, //line-height: 1에서 font-size가 box를 초과할 때 스크롤이 생기는 초기값을 false로 설정함.
    navigation: false,
    // responsiveWidth: 768,
    //responsiveSlides: true,
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',

    controlArrows: false, //슬라이드 화살표 숨김
    loopHorizontal: false, //슬라이드 반복 멈춤

    afterLoad: function (origin, destination, direction, trigger) {
        ASIDE.forEach(it => it.classList.remove('on'));
        ASIDE[destination.index].classList.add('on');
        SECTION.forEach(it => it.classList.remove('on'));
        SECTION[destination.index].classList.add('on');



        if (destination.index == 0) {

            BOX_COVER.classList.add('on');
            UFO();

            if (NUM == false) {
                DDDD();
                SLOGAN.classList.add('on');
            } else {
                setTimeout(function () {
                    DDDD();
                    SLOGAN.classList.add('on');
                }, 7000);
                NUM = false;
            }


            if (BOX_COVER.classList.contains('on'))
                setTimeout(function () {
                    BOX_COVER.classList.add('end');
                }, 9000);


        } else {
            SLOGAN.classList.remove('on');
        }




        if (destination.index > 0) {
            HEADER.classList.add('on');
        } else {
            HEADER.classList.remove('on');
        }

        if (direction == 'up') {
            HEADER.classList.remove('on');
        }


    },
    onLeave(origin, destination, direction, trigger) {


    },
    afterSlideLoad: function (section, origin, destination, direction, trigger) {

        document.querySelector('.num').innerHTML = `0${destination.index + 1}`
        S_PAGENATION.forEach(it => it.classList.remove('on'));
        S_PAGENATION[destination.index].classList.add('on');
    },



});




//슬라이드에 훨이벤트 달기...

SLIDE.addEventListener('wheel', (e) => {

    console.log(e, e.deltaY); // e.deltaY 100, -100

    if (e.deltaY > 0) {
        fullpage_api.moveSlideRight();
    } else {
        fullpage_api.moveSlideLeft();
    }

})



COVER_BTN.addEventListener('click', function (e) {
    e.currentTarget.classList.toggle('on');
    //this.classList.toggle('on');
    COVER.classList.toggle('on');
});

COVER_A.forEach((lnk, idx) => {
    lnk.addEventListener('click', () => {
        COVER.classList.remove('on');
        COVER_BTN.classList.remove('on');
        console.log(idx);
    });
});

COVER.addEventListener('wheel', e => {
    //e.preventDefault(); 이벤트 자체를 막음
    e.stopPropagation(); // 이벤트의 전파를 막음.
    console.log(e.deltaY) // 방향이 찍힌다. 
});

function DDDD() {
    const INTROTXT = gsap.utils.toArray('#introduction .slogan h2');

    INTROTXT.forEach((it, idx, arry) => {
        const a = it.innerText;
        const t = [...a].map(it => `<span>${it}</span>`).join('');

        it.innerHTML = t;
        const chars = it.querySelectorAll('span');


        gsap.from(chars, {
            yPercent: 200,
            autoAlpha: 0,
            delay: 1,
            duration: 2,

            ease: "bounce",
            stagger: {
                amount: 1,
                from: "random"
            },

        });
    });
}




const LOGO_T = document.querySelector('.header .case .logo_txt');
const LOGO_TXT = document.querySelector('.header .case .logo_txt').innerText;
console.log([...LOGO_TXT]);

const LOGO_STXT = [...LOGO_TXT].map(it => `<span>${it}</span>`).join('');
LOGO_T.innerHTML = LOGO_STXT;

const LOGO_SPAN = LOGO_T.querySelectorAll('span');

LOGO_SPAN.forEach((it, idx) => {
    it.style.cssText = `
    font-size: 12px;
    font-weight: 500;
    transform: translate(-50%, 0) rotate(${360 / LOGO_SPAN.length * idx}deg);
    `;

    if (window.innerWidth < '720') {
        it.style.cssText = `
        font-size: 10px;
        font-weight: 500;
        transform: translate(-50%, 0) rotate(${360 / LOGO_SPAN.length * idx}deg);
        `;

    }
})

gsap.to(LOGO_T, {

    rotate: 360,
    duration: 15,
    repeat: -1,
    ease: 'linear',
})

function UFO() {

    if (window.innerWidth < '540') {
        gsap.to(".ufo_box", {
            duration: 8,
            motionPath: {
                path: "#pathM",
                align: "#pathM",
                autoRotate: false,
                alignOrigin: [0.5, 0.5]
            }
        });
    } else {
        gsap.to(".ufo_box", {
            duration: 8,
            motionPath: {
                path: "#path",
                align: "#path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5]
            }
        });
    }

}
