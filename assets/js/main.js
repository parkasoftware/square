"use strict";

has_text();
function has_text() {
    "use strict";
    let names = document.getElementsByClassName('trex_has_text');
    [].forEach.call(names, function (el) {
        el.innerText = getFirstLetters(el.innerText);
    });
}

function getFirstLetters(str) {
    "use strict";
    const firstLetters = str
      .split(' ')
      .map(word => word[0])
      .join('');
  
    return firstLetters;
}

testimonial_posts();
function testimonial_posts() {
    document.addEventListener( 'DOMContentLoaded', function() {
        if(document.getElementById("trex_testimonial_posts")) {
            var testimonial_posts_ = new Splide('#trex_testimonial_posts', {
                perPage: 2,
                gap: '40px',
                pagination: false,
                autoplay: false,
                type: 'slide',
                resetProgress: false,
                lazyLoad: 'sequential',
                arrows: false,
                breakpoints: {
                    700: {
                        fixedWidth: '100%'
                    },
                }
            });
            testimonial_posts_.on( 'mounted', function () {
                let names = document.getElementsByClassName('trex_has_text_slide');
                [].forEach.call(names, function (el) {
                    el.innerText = getFirstLetters(el.innerHTML);
                });
            });
            testimonial_posts_.mount();

            document.getElementById("testi-next").addEventListener("click", function(){
                testimonial_posts_.go(">");
            });
            document.getElementById("testi-prev").addEventListener("click", function(){
                testimonial_posts_.go("<");
            });
        }
    });
}

load_more_posts();
function load_more_posts() {
    if(document.getElementById('trex_blog')) {
        let elem = document.getElementById('trex_blog');
        let infScroll = new InfiniteScroll( elem, {
            append: '.trex_post',
            button: '.infinite-scroll-button',
            debug: true,
            hideNav: '.pagination',
            history: false,
            path: '.pagination .older-posts',
            scrollThreshold: false,
            status: '.infinite-scroll-status',
        });
    }
}

project();
function project() {
    if(document.getElementById('project_single')) {
        if(document.getElementById("trex_project_infos")) {
            let infos = document.getElementById("trex_project_infos");
            let link = infos.getAttribute("data-trex-link");
            let price = infos.getAttribute("data-trex-price");
            let demo = infos.getAttribute("data-trex-demo");
            if(link || price) {
                document.getElementById("trex_project_info_wrapper").classList.remove("hidden");
                document.getElementById("trex_project_info_wrapper").classList.add("flex");
                document.querySelector("#trex_demo_btn").setAttribute("href", link);
                document.querySelector("#trex_buy_btn span").innerText = price;
                document.querySelector("#trex_buy_btn").setAttribute("href", demo);
            }
        }
    }
}


copy_url();
function copy_url() {
    const button = document.querySelector('#trex_copy')
    if(button) {
        button.onclick = () => {
        navigator.clipboard.writeText(window.location.href);
        document.getElementById('trex_copy_msg').classList.remove('hidden');
        const timeOut = setTimeout(function() {
            document.getElementById('trex_copy_msg').classList.add('hidden');
            clearTimeout(timeOut);
        }, 3000);
        return false;
        }
    }
}

reframe_video();
function reframe_video() {
    'use strict';
    reframe('iframe');
}

window.addEventListener('load', function () {
    Lightense('#trex_article_content img');
}, false);

show_comments();
function show_comments() {
    if(document.getElementById("trex_show_comments")) {
        document.getElementById("trex_show_comments").addEventListener("click", function(e){
            e.target.classList.toggle("hidden");
            document.getElementById("trex_hide_comments").classList.toggle("hidden");
            document.getElementById("trex_comments_content").classList.toggle("hidden");
        });

        document.getElementById("trex_hide_comments").addEventListener("click", function(e){
            e.target.classList.toggle("hidden");
            document.getElementById("trex_show_comments").classList.toggle("hidden");
            document.getElementById("trex_comments_content").classList.toggle("hidden");
        })
    }
}

contact();
function contact() {
    if(document.getElementById("w_days")) {
        var str = document.getElementById('w_days').innerHTML;
        document.getElementById('w_days').innerHTML = str.replace("*", "<br />");
    }

    if(document.getElementById("w_contact")) {
        var str = document.getElementById('w_contact').innerHTML;
        document.getElementById('w_contact').innerHTML = str.replace("*", "<br />");
    }

    if(document.getElementById("w_adress")) {
        var str = document.getElementById('w_adress').innerHTML;
        document.getElementById('w_adress').innerHTML = str.replace("*", "<br />");
    }
}

open_menu();
function open_menu() {
    if(document.getElementById("trex_open_menu")) {
        open = false;
        document.getElementById("trex_open_menu").addEventListener("click", function(e){
            if(!open) {
                document.getElementById("trex_menu").classList.remove("invisible");
                document.getElementById("trex_menu").classList.remove("hidden");
                open = true
            } else {
                document.getElementById("trex_menu").classList.add("invisible");
                document.getElementById("trex_menu").classList.add("hidden");
                open = false
            }
        });
    }
}

tippy('[data-tippy-content]');