const logo = document.querySelector(".logo")
const filterButton = document.querySelector(".filter_button")
const profileButton = document.querySelector(".profile_button")
const html = document.querySelector("html")
const sidebar = document.querySelector("aside")
const dimmedOverlay = document.querySelector(".dimmed_overlay")
const filterMenu = document.querySelector(".filter_menu")

initialize()

function initialize() {
    logo.addEventListener("click", scrollToTop)
    filterButton.addEventListener("click", openFilterMenu)
    profileButton.addEventListener("click", function () {
        openSidebar(200)
    }) //TODO: maybe fade color in/out?
    dimmedOverlay.addEventListener("click", function () {
        closeSidebar()
    })

    filterMenu.addEventListener("click", closeFilterMenu)

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

function openFilterMenu() {
    filterButton.src = "images/filter_icon_filled.png"
    filterMenu.style.top = "100px"
}

function closeFilterMenu() {
    filterButton.src = "images/filter_icon.png"
    filterMenu.style.top = "-500px"
}
