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


const filterItemValues = new Array(filterItems.length).fill(false)


const hotelObjectStoreName = "hotelObjectStore"


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

        let hotelObject1 = new Hotel("name1", "https://i.picsum.photos/id/645/300/200.jpg?hmac=zSwhK0ipngA3Q8gPxiRsL3NGUmKtCy89EcH8zONvh8M")
        let hotelObject2 = new Hotel("name2", "https://i.picsum.photos/id/78/300/200.jpg?hmac=n7Sj8aECCS5WoJkWO-zflsPVDeezs5U4M7WgQjLACA0")
        let hotelObject3 = new Hotel("name3", "https://i.picsum.photos/id/641/300/200.jpg?hmac=YpOnhDuvo6GeXZPS8yR6Wf62YHrXGlWTDObszZf3zpI")
        let hotelObject4 = new Hotel("name4", "https://i.picsum.photos/id/331/300/200.jpg?hmac=uIUrcfY5rEjbMirOCMEvEXzC0tIJzFIBfZBZ4qhvnd4")
        let hotelObject5 = new Hotel("name5", "https://i.picsum.photos/id/816/300/200.jpg?hmac=LyDUxx5Jqqh7V5H3YZdOFIsgVEmG9IWw4H8Iwjfs46I")
        let hotelObject6 = new Hotel("name6", "https://i.picsum.photos/id/721/300/200.jpg?hmac=a8J-TueLrN5E8F50mFD-1efhdFssR3Mj-FuuUHRpddY")
        let hotelObject7 = new Hotel("name7", "https://i.picsum.photos/id/998/300/200.jpg?hmac=ABcJlM1FNcyP3AfTFRqfa64HxavGYS_EloO3wVKI6WY")
        let hotelObject8 = new Hotel("name8", "https://i.picsum.photos/id/173/300/200.jpg?hmac=QNv1dkRQYgkul__n_maFKcC5QLE7zBly8z3gwr3SmI0")

        let addRequest = hotelObjectStore.add(hotelObject1)
        addRequest = hotelObjectStore.add(hotelObject2)
        addRequest = hotelObjectStore.add(hotelObject3)
        addRequest = hotelObjectStore.add(hotelObject4)
        addRequest = hotelObjectStore.add(hotelObject5)
        addRequest = hotelObjectStore.add(hotelObject6)
        addRequest = hotelObjectStore.add(hotelObject7)
        addRequest = hotelObjectStore.add(hotelObject8)

        addRequest.onerror = function () {
            console.log("Add Request Error", addRequest.error)
        }
    }

    openRequest.onerror = function () {
        console.error("Open Request Error", openRequest.error)
    }
}

function addMultiple(database, datas, callback) {
    const transaction = database.transaction(["people"], "readwrite")

    datas.forEach(data => {
        let request = transaction.objectStore("people").add(data)
    })

    transaction.oncomplete = function(event) {
        callback()
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

function showHotelList() {
    getHotels().then(function (hotels) {
        for (let i = 0; i < hotels.length; i++) {
            makeHotelDiv(hotels[i].name, hotels[i].imageURL)
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

function makeHotelDiv(name, imageURL) {
    const wrapper = document.createElement("div")

    const hotelNameElement = document.createElement("h1")
    hotelNameElement.appendChild(document.createTextNode(name))
    wrapper.appendChild(hotelNameElement)

    const image = document.createElement("img")
    image.setAttribute("src", imageURL)
    wrapper.appendChild(image)

    hotelListArea.appendChild(wrapper)
}