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

const hotelListArea = document.querySelector(".hotel_list")

const previousPage = document.querySelector(".previous_page")
const nextPage = document.querySelector(".next_page")


const filterItemValues = new Array(filterItems.length).fill(false)


const hotelObjectStoreName = "hotelObjectStore"
const hotelNumberOnEachPage = 20

let activePageNum = 1


databaseInit()
initialize()
showHotelList()

function databaseInit() {
    let openRequest = indexedDB.open("hotelsDatabase", 1)
    openRequest.onupgradeneeded = function () {
        let database = openRequest.result
        if (!database.objectStoreNames.contains(hotelObjectStoreName)) {
            database.createObjectStore(hotelObjectStoreName, {keyPath: "name"})
        }
    }

    openRequest.onsuccess = function () {
        let database = openRequest.result
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)

        let hotelObject01 = new Hotel("name01", "https://i.picsum.photos/id/645/300/200.jpg?hmac=zSwhK0ipngA3Q8gPxiRsL3NGUmKtCy89EcH8zONvh8M")
        let hotelObject02 = new Hotel("name02", "https://i.picsum.photos/id/78/300/200.jpg?hmac=n7Sj8aECCS5WoJkWO-zflsPVDeezs5U4M7WgQjLACA0")
        let hotelObject03 = new Hotel("name03", "https://i.picsum.photos/id/641/300/200.jpg?hmac=YpOnhDuvo6GeXZPS8yR6Wf62YHrXGlWTDObszZf3zpI")
        let hotelObject04 = new Hotel("name04", "https://i.picsum.photos/id/331/300/200.jpg?hmac=uIUrcfY5rEjbMirOCMEvEXzC0tIJzFIBfZBZ4qhvnd4")
        let hotelObject05 = new Hotel("name05", "https://i.picsum.photos/id/816/300/200.jpg?hmac=LyDUxx5Jqqh7V5H3YZdOFIsgVEmG9IWw4H8Iwjfs46I")
        let hotelObject06 = new Hotel("name06", "https://i.picsum.photos/id/721/300/200.jpg?hmac=a8J-TueLrN5E8F50mFD-1efhdFssR3Mj-FuuUHRpddY")
        let hotelObject07 = new Hotel("name07", "https://i.picsum.photos/id/998/300/200.jpg?hmac=ABcJlM1FNcyP3AfTFRqfa64HxavGYS_EloO3wVKI6WY")
        let hotelObject08 = new Hotel("name08", "https://i.picsum.photos/id/173/300/200.jpg?hmac=QNv1dkRQYgkul__n_maFKcC5QLE7zBly8z3gwr3SmI0")
        let hotelObject09 = new Hotel("name09", "https://i.picsum.photos/id/203/300/200.jpg?hmac=FsCLTwngZ8-1jbxqdBKyoJy-ZHjbhlupNzeKiib04MI")
        let hotelObject10 = new Hotel("name10", "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE")

        let addRequest = hotelObjectStore.add(hotelObject01)
        addRequest = hotelObjectStore.add(hotelObject02)
        addRequest = hotelObjectStore.add(hotelObject03)
        addRequest = hotelObjectStore.add(hotelObject04)
        addRequest = hotelObjectStore.add(hotelObject05)
        addRequest = hotelObjectStore.add(hotelObject06)
        addRequest = hotelObjectStore.add(hotelObject07)
        addRequest = hotelObjectStore.add(hotelObject08)
        addRequest = hotelObjectStore.add(hotelObject09)
        addRequest = hotelObjectStore.add(hotelObject10)

        for (let i = 11; i < 61; i++) {
            let hotelObject = new Hotel("name" + i, "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE")
            addRequest = hotelObjectStore.add(hotelObject)
        }

        addRequest.onerror = function () {
            console.log("Add Request Error", addRequest.error)
        }
    }

    openRequest.onerror = function () {
        console.error("Open Request Error", openRequest.error)
    }
}

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

    previousPage.addEventListener("click", goToPreviousPage)
    nextPage.addEventListener("click", goToNextPage)
}

function scrollToTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
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

function showHotelList() {
    getHotels().then(function (hotels) {
        const numberOfPages = (hotels.length % hotelNumberOnEachPage === 0) ?
            (hotels.length / hotelNumberOnEachPage) :
            (Math.floor(hotels.length / hotelNumberOnEachPage) + 1)
        if (activePageNum < 1) {
            activePageNum = 1
        } else if (activePageNum > numberOfPages) {
            activePageNum = numberOfPages
        } else {
            hotelListArea.textContent = ""
            const endBound = (hotelNumberOnEachPage * activePageNum < hotels.length) ?
                (hotelNumberOnEachPage * activePageNum) :
                hotels.length
            for (let i = hotelNumberOnEachPage * (activePageNum - 1); i < endBound; i++) {
                makeHotelDiv(hotels[i])
            }
            scrollToTop()
        }
    })
}

function getHotels() {
    return new Promise(function (resolve) {
        let openRequest = indexedDB.open("hotelsDatabase", 1)
        openRequest.onsuccess = function () {
            let database = openRequest.result
            let transaction = database.transaction(hotelObjectStoreName)
            let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)

            let getRequest = hotelObjectStore.getAll()
            getRequest.onsuccess = function () {
                resolve(getRequest.result)
            }

            getRequest.onerror = function () {
                console.log("Get Request Error", getRequest.error)
            }
        }

        openRequest.onerror = function () {
            console.error("Open Request Error", openRequest.error)
        }
    })
}

function makeHotelDiv(hotelObj) {
    const wrapper = document.createElement("div")
    wrapper.style.backgroundColor = "orange"

    const hotelNameElement = document.createElement("h1")
    hotelNameElement.style.textAlign = "center"
    hotelNameElement.style.userSelect = "none"
    hotelNameElement.appendChild(document.createTextNode(hotelObj.name))
    wrapper.appendChild(hotelNameElement)

    const image = document.createElement("img")
    image.setAttribute("src", hotelObj.imageURL)
    image.style.margin = "0 20px 25px"
    wrapper.appendChild(image)

    hotelListArea.appendChild(wrapper)
}

function goToPreviousPage() {
    activePageNum--
    showHotelList()
}

function goToNextPage() {
    activePageNum++
    showHotelList()
}