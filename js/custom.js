const HEADER = document.querySelector('.header');
const ASIDE = document.querySelectorAll('.m_link li');
const SECTION = document.querySelectorAll('.section');

const COVER_BTN = document.querySelector('.util');
const COVER = document.querySelector('.cover');
const COVER_A = document.querySelectorAll('.cover>ul a');

const BOX_COVER = document.querySelector('.box_cover');



const SLIDE = document.querySelector('#slide_move');
const SLIDE_ITM = document.querySelectorAll('#slide_move .num');
const S_PAGENATION = document.querySelectorAll('.s_pagenation ul li');

const H_CASE = document.querySelector('.logo_txt');
const M_CASE = document.querySelector('.util .menu');


new fullpage('#main', {
    anchors: ['introduction', 'portfolio', 'training', 'profile'],
    css3: false,
    scrollOverflow: false, //line-height: 1에서 font-size가 box를 초과할 때 스크롤이 생기는 초기값을 false로 설정함.


    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',

    controlArrows: false, //슬라이드 화살표 숨김
    loopHorizontal: false, //슬라이드 반복 멈춤


    afterLoad: function (origin, destination, direction, trigger) {
        // console.log(destination.index, direction);
        ASIDE.forEach(it => it.classList.remove('on'));
        ASIDE[destination.index].classList.add('on');
        SECTION.forEach(it => it.classList.remove('on'));
        SECTION[destination.index].classList.add('on');

        if (destination.index == 0) {
            DDDD();
        }
        if (destination.index == 0) {
            BOX_COVER.classList.add('on');
            setTimeout(function () {
                BOX_COVER.classList.add('end');
            }, 2000);


        } else {


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

        if (destination.index == 1) {
            M_CASE.classList.add('on');
        } else if (destination.index == 2) {
            M_CASE.classList.add('on');
            H_CASE.classList.add('on');
        } else {
            M_CASE.classList.remove('on');
            H_CASE.classList.remove('on');
        }
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
            duration: 3,

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
    font-size: 20px;
    font-weight: 500;
    transform: translate(-50%, 0) rotate(${360 / LOGO_SPAN.length * idx}deg);
    `;
})

gsap.to(LOGO_T, {

    rotate: 360,
    duration: 10,
    repeat: -1,
    ease: 'linear',
})


// 별 파티클
particlesJS('introduction',
    {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": false,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "star",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "http://wiki.lexisnexis.com/academic/images/f/fb/Itunes_podcast_icon_300.jpg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 4,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "left",
                "random": false,
                "straight": true,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 200,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }
);




// 별 파티클
particlesJS('profiles',
    {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": false,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "star",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "http://wiki.lexisnexis.com/academic/images/f/fb/Itunes_podcast_icon_300.jpg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 4,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "left",
                "random": false,
                "straight": true,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 200,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }
);
