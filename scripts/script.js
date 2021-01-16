const html = document.querySelector("html")

const logo = document.querySelector(".logo")
const filterButton = document.querySelector(".filter_button")
const profileButton = document.querySelector(".profile_button")

const sidebar = document.querySelector("aside")
const dimmedOverlay = document.querySelector(".dimmed_overlay")

const filterMenu = document.querySelector(".filter_menu")
const filterItems = document.querySelectorAll(".filter_item")
const filterCancelButton = document.querySelector(".filter_cancel_button")
const filterApplyButton = document.querySelector(".filter_apply_button")


const filterItemValues = new Array(filterItems.length).fill(false);


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

    for (let i = 0; i < filterItems.length; i++) {
        filterItems[i].addEventListener("click", function () {
            toggleFilterItem(i)
        })
    }
    filterCancelButton.addEventListener("click", cancelFilters)
    filterApplyButton.addEventListener("click", applyFilters)

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

function toggleFilterItem(index) {
    if (!filterItemValues[index]) {
        filterItems[index].style.backgroundColor = "darkred"
        filterItems[index].style.color = "white"
    } else {
        filterItems[index].style.backgroundColor = "black"
        filterItems[index].style.color = "darkred"
    }
    filterItemValues[index] = !filterItemValues[index]
}

function cancelFilters() {
    filterItemValues.fill(false)
    for (let i = 0; i < filterItems.length; i++) {
        filterItems[i].style.backgroundColor = "black"
        filterItems[i].style.color = "darkred"
    }
}

function applyFilters() {
    filterButton.src = "images/filter_icon.png"
    filterMenu.style.top = "-1000px"
}