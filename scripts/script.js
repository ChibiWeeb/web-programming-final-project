let logo = document.querySelector(".logo");
let html = document.querySelector("html");

initialize();

function initialize() {
    logo.addEventListener("click", scrollToTop)

    window.onscroll = function() {scrolledTooFarDownCheck(15000)};
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function scrolledTooFarDownCheck(limit) {
    if (document.body.scrollTop > limit || document.documentElement.scrollTop > limit) {
        html.style.scrollBehavior = "auto"
    } else {
        html.style.scrollBehavior = "smooth"
    }
}