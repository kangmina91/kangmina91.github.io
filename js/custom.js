// 사이드 도트 메뉴
const ASIDE = document.querySelectorAll('.m_link li');

// 상단 메뉴바와 인 메뉴 커버  
const COVER_BTN = document.querySelector('.util');
const COVER = document.querySelector('.cover');
const COVER_A = document.querySelectorAll('.cover>ul a');

// 슬로건
const SLOGAN = document.querySelector('.intro .slogan');


// 포트폴리오 가로 슬라이드
const SLIDE = document.querySelector('#slide_move');
const SLIDE_ITM = document.querySelectorAll('#slide_move .num');
const S_PAGENATION = document.querySelectorAll('.s_pagenation ul li');


new fullpage('#main', {
    anchors: ['introduction', 'portfolio', 'training', 'profile'],
    css3: false,
    scrollOverflow: false, //line-height: 1에서 font-size가 box를 초과할 때 스크롤이 생기는 초기값을 false로 설정함.
    navigation: false,
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',

    controlArrows: false, //슬라이드 화살표 숨김
    loopHorizontal: false, //슬라이드 반복 멈춤

    // Demo 페이지 구조가 생성된 직후에 이 콜백이 실행
    afterRender: function () {
        CHARS_FALL();
        SLOGAN.classList.add('on');
    },

    //풀페이지 화면이 전환되고 나서 실행
    afterLoad: function (origin, destination, direction, trigger) {
        //사이드 도트 메뉴
        ASIDE.forEach(it => it.classList.remove('on'));
        ASIDE[destination.index].classList.add('on');

    },

    onLeave(origin, destination, direction, trigger) {


    },
    afterSlideLoad: function (section, origin, destination, direction, trigger) {
        document.querySelector('.num').innerHTML = `0${destination.index + 1}`
        S_PAGENATION.forEach(it => it.classList.remove('on'));
        S_PAGENATION[destination.index].classList.add('on');
    },



});

// 가로 슬라이드에 훨 이동 이벤트 달기!
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
});




// 인트로 제목 글자 하나 하나 떨어지기
function CHARS_FALL() {
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



// 로고 글자들 원으로 돌게 만들기

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
    } else if (window.innerWidth < '390') {
        it.style.cssText = `
        font-size: 8px;
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



// 유에프오 모션 패스
// function UFO() {

//     if (window.innerWidth < '540') {
//         gsap.to(".ufo_box", {
//             duration: 8,
//             motionPath: {
//                 path: "#pathM",
//                 align: "#pathM",
//                 autoRotate: false,
//                 alignOrigin: [0.5, 0.5]
//             }
//         });
//     } else {
//         gsap.to(".ufo_box", {
//             duration: 8,
//             motionPath: {
//                 path: "#path",
//                 align: "#path",
//                 autoRotate: false,
//                 alignOrigin: [0.5, 0.5]
//             }
//         });
//     }

// }


particlesJS("introduction", { "particles": { "number": { "value": 8, "density": { "enable": false, "value_area": 2209.6133965703634 } }, "color": { "value": "#000000" }, "shape": { "type": "star", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "http://wiki.lexisnexis.com/academic/images/f/fb/Itunes_podcast_icon_300.jpg", "width": 100, "height": 100 } }, "opacity": { "value": 1, "random": true, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 12.02559045649142, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "top-right", "random": false, "straight": true, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "grab" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }); var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function () { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);