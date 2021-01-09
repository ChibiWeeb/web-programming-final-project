let logo = document.querySelector(".logo")
let filterButton = document.querySelector(".filter_button")
let profileButton = document.querySelector(".profile_button")
let html = document.querySelector("html")
let sidebar = document.querySelector("aside")
let dimmedOverlay = document.querySelector(".dimmed_overlay")

initialize()

function initialize() {
    logo.addEventListener("click", scrollToTop)
    profileButton.addEventListener("click", function () {openSidebar(200)}) //TODO: maybe fade color in/out?
    dimmedOverlay.addEventListener("click", closeSidebar)

    window.onscroll = function () {
        scrolledTooFarDownCheck(10000)
    }
}

function scrollToTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

function scrolledTooFarDownCheck(limit) {
    if (document.body.scrollTop > limit || document.documentElement.scrollTop > limit) {
        html.style.scrollBehavior = "auto"
    } else {
        html.style.scrollBehavior = "smooth"
    }
}


function openSidebar(width) {
    sidebar.style.width = width.toString() + "px"
    html.style.overflow = "hidden"
    dimmedOverlay.style.display = "block"
}

function closeSidebar() {
    sidebar.style.width = "0"
    html.style.overflow = "visible"
    dimmedOverlay.style.display = "none"
}