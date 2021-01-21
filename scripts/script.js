let activePageNum = 1
let hotelTotalNumber


databaseInit()
initialize()
showHotelList()
showDropdownOptions()

function databaseInit() {
    let openRequest = indexedDB.open("hotelsDatabase", 1)
    openRequest.onupgradeneeded = function () {
        let database = openRequest.result
        if (!database.objectStoreNames.contains(hotelObjectStoreName)) {
            database.createObjectStore(hotelObjectStoreName, {keyPath: "id"})
        }
    }

    openRequest.onsuccess = function () {
        let database = openRequest.result
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)

        let hotelObject01 = new Hotel(
            "hotel01",
            "name01",
            countryList.georgia.name,
            countryList.georgia.cities.tbilisi,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/645/300/200.jpg?hmac=zSwhK0ipngA3Q8gPxiRsL3NGUmKtCy89EcH8zONvh8M",
            "descriptions/name01.txt",
            "rooms/rooms01.json"
        )
        let hotelObject02 = new Hotel(
            "hotel02",
            "name02",
            countryList.georgia.name,
            countryList.georgia.cities.batumi,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking],
            "https://i.picsum.photos/id/641/300/200.jpg?hmac=YpOnhDuvo6GeXZPS8yR6Wf62YHrXGlWTDObszZf3zpI",
            "descriptions/name02.txt",
            "rooms/rooms01.json"
        )
        let hotelObject03 = new Hotel(
            "hotel03",
            "name03",
            countryList.georgia.name,
            countryList.georgia.cities.mestia,
            [tagList.free_wifi, tagList.underground_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/78/300/200.jpg?hmac=n7Sj8aECCS5WoJkWO-zflsPVDeezs5U4M7WgQjLACA0",
            "descriptions/name03.txt",
            "rooms/rooms01.json"
        )
        let hotelObject04 = new Hotel(
            "hotel04",
            "name04",
            countryList.usa.name,
            countryList.usa.cities.new_york,
            [],
            "https://i.picsum.photos/id/331/300/200.jpg?hmac=uIUrcfY5rEjbMirOCMEvEXzC0tIJzFIBfZBZ4qhvnd4",
            "descriptions/name04.txt",
            "rooms/rooms01.json"
        )
        let hotelObject05 = new Hotel(
            "hotel05",
            "name05",
            countryList.usa.name,
            countryList.usa.cities.los_angeles,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.underground_parking],
            "https://i.picsum.photos/id/816/300/200.jpg?hmac=LyDUxx5Jqqh7V5H3YZdOFIsgVEmG9IWw4H8Iwjfs46I",
            "descriptions/name05.txt",
            "rooms/rooms01.json"
        )
        let hotelObject06 = new Hotel(
            "hotel06",
            "name06",
            countryList.uk.name,
            countryList.uk.cities.edinburgh,
            [tagList.bar, tagList.free_wifi, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/721/300/200.jpg?hmac=a8J-TueLrN5E8F50mFD-1efhdFssR3Mj-FuuUHRpddY",
            "descriptions/name06.txt",
            "rooms/rooms01.json"
        )
        let hotelObject07 = new Hotel(
            "hotel07",
            "name07",
            countryList.france.name,
            countryList.france.cities.paris,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_parking],
            "https://i.picsum.photos/id/998/300/200.jpg?hmac=ABcJlM1FNcyP3AfTFRqfa64HxavGYS_EloO3wVKI6WY",
            "descriptions/name07.txt",
            "rooms/rooms01.json"
        )
        let hotelObject08 = new Hotel(
            "hotel08",
            "name08",
            countryList.japan.name,
            countryList.japan.cities.kyoto,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/173/300/200.jpg?hmac=QNv1dkRQYgkul__n_maFKcC5QLE7zBly8z3gwr3SmI0",
            "descriptions/name08.txt",
            "rooms/rooms01.json"
        )
        let hotelObject09 = new Hotel(
            "hotel09",
            "name09",
            countryList.japan.name,
            countryList.japan.cities.nara,
            [tagList.bar, tagList.free_wifi, tagList.free_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/203/300/200.jpg?hmac=FsCLTwngZ8-1jbxqdBKyoJy-ZHjbhlupNzeKiib04MI",
            "descriptions/name09.txt",
            "rooms/rooms01.json"
        )
        let hotelObject10 = new Hotel(
            "hotel10",
            "name10",
            countryList.georgia.name,
            countryList.georgia.cities.mestia,
            [tagList.free_parking],
            "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE",
            "descriptions/name10.txt",
            "rooms/rooms01.json"
        )

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
            let hotelObject = new Hotel(
                "hotel" + i,
                "Extra Hotel " + i,
                countryList.japan.name,
                countryList.japan.cities.sapporo,
                [tagList.free_wifi, tagList.free_parking],
                "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE",
                "descriptions/name" + i + ".txt",
                "rooms/rooms01.json"
            )
            addRequest = hotelObjectStore.add(hotelObject)
        }

        addRequest.onerror = function () {
            console.error("Add Request Error", addRequest.error)
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
        openSidebar(250)
    })
    dimmedOverlay.addEventListener("click", function () {
        closeSidebar()
    })

    for (let i = 0; i < filterTags.length; i++) {
        filterTags[i].addEventListener("click", function () {
            toggleFilterTag(i)
        })
    }
    filterResetButton.addEventListener("click", resetFilters)
    filterApplyButton.addEventListener("click", applyFilters)

    previousPage.addEventListener("click", goToPreviousPage)
    nextPage.addEventListener("click", goToNextPage)

    document.addEventListener("click", function (e) {
        if (e.target) {
            let targetedHotel
            if (e.target.className === "hotel") {
                targetedHotel = e.target
            } else if (e.target.parentNode && e.target.parentNode.className === "hotel") {
                targetedHotel = e.target.parentNode
            }

            if (targetedHotel !== undefined) expandHotel(targetedHotel)
        }
    })
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
    html.style.overflow = "auto"
    dimmedOverlay.style.display = "none"
}

function openFilterMenu() {
    filterButton.src = "images/filter_icon_filled.png"
    filterMenu.style.top = "100px"
}

function toggleFilterTag(index) {
    if (!filterTagValues[index]) {
        filterTags[index].style.backgroundColor = "darkred"
        filterTags[index].style.color = "white"
    } else {
        filterTags[index].style.backgroundColor = "black"
        filterTags[index].style.color = "darkred"
    }
    filterTagValues[index] = !filterTagValues[index]
}

function resetFilters() {
    filterTagValues.fill(false)
    for (let i = 0; i < filterTags.length; i++) {
        filterTags[i].style.backgroundColor = "black"
        filterTags[i].style.color = "darkred"
    }
    filterCountriesDropdownSelect.value = ""
    filterCitiesDropdownSelect.value = ""
}

function applyFilters() {
    filterButton.src = "images/filter_icon.png"
    filterMenu.style.top = "-1000px"

    showHotelList()
    activePageNum = 1
}

function showHotelList() {
    const selectedCountryName =
        (filterCountriesDropdownSelect.options[filterCountriesDropdownSelect.selectedIndex].value === "") ?
            undefined :
            filterCountriesDropdownSelect.options[filterCountriesDropdownSelect.selectedIndex].text
    const selectedCityName =
        (filterCitiesDropdownSelect.options[filterCitiesDropdownSelect.selectedIndex].value === "") ?
            undefined :
            filterCitiesDropdownSelect.options[filterCitiesDropdownSelect.selectedIndex].text
    let tags = []
    for (let i = 0; i < filterTagValues.length; i++) {
        if (filterTagValues[i]) {
            tags.push(Object.values(tagList)[i])
        }
    }

    getHotels(selectedCountryName, selectedCityName, tags).then(function (hotels) {
        let numberOfPages = (hotelTotalNumber % hotelNumberOnEachPage === 0) ?
            (hotelTotalNumber / hotelNumberOnEachPage) :
            (Math.floor(hotelTotalNumber / hotelNumberOnEachPage) + 1)

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

function getHotels(countryName, cityName, tags) {
    return new Promise(function (resolve) {
        let openRequest = indexedDB.open("hotelsDatabase", 1)
        openRequest.onsuccess = function () {
            let database = openRequest.result
            let transaction = database.transaction(hotelObjectStoreName)
            let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
            let getRequest = hotelObjectStore.getAll()

            getRequest.onsuccess = function () {
                if (hotelTotalNumber === undefined) hotelTotalNumber = getRequest.result.length
                let result = getRequest.result

                if (countryName !== undefined) {
                    result = result.filter(hotel => (hotel.country === countryName))
                }
                if (cityName !== undefined) {
                    result = result.filter(hotel => (hotel.city === cityName))
                }
                if (tags.length !== 0) {
                    result = result.filter(hotel => (tags.every(tag => hotel.tags.includes(tag))))
                }

                resolve(result)
            }

            getRequest.onerror = function () {
                console.error("Get Request Error", getRequest.error)
            }
        }

        openRequest.onerror = function () {
            console.error("Open Request Error", openRequest.error)
        }
    })
}

function makeHotelDiv(hotelObject) {
    const hotelWrapper = document.createElement("div")
    hotelWrapper.setAttribute("class", "hotel")
    hotelWrapper.setAttribute("id", hotelObject.id)

    hotelWrapper.appendChild(makeHotelNameElement(hotelObject.name))
    hotelWrapper.appendChild(makeCountryAndCityElement(hotelObject.country, hotelObject.city))
    hotelWrapper.appendChild(makeImageElement(hotelObject.imageURL, "hotel_image"))
    if (hotelObject.tags.length > 0) {
        hotelWrapper.appendChild(makeHotelTagsElement(hotelObject.tags))
    }
    hotelWrapper.appendChild(makeDescriptionElement(hotelObject.descriptionFileURL, "hotel_description"))
    makeRoomListElement(hotelObject.id, hotelObject.roomsFileURL).then(function (roomListElement) {
        hotelWrapper.appendChild(roomListElement)
    })

    hotelListArea.appendChild(hotelWrapper)
}

function makeHotelNameElement(hotelName) {
    const hotelNameElement = document.createElement("h1")
    hotelNameElement.setAttribute("class", "hotel_name")
    hotelNameElement.appendChild(document.createTextNode(hotelName))
    return hotelNameElement
}

function makeCountryAndCityElement(hotelCountry, hotelCity) {
    const hotelCountryAndCityElement = document.createElement("h4")
    hotelCountryAndCityElement.setAttribute("class", "country_and_city_wrapper")
    hotelCountryAndCityElement.appendChild(document.createTextNode(hotelCountry + ", " + hotelCity))
    return hotelCountryAndCityElement
}

function makeImageElement(imageURL, className) {
    const image = document.createElement("img")
    image.setAttribute("class", className)
    image.setAttribute("src", imageURL)
    return image
}

function makeHotelTagsElement(hotelTags) {
    const hotelTagsElement = document.createElement("p")
    hotelTagsElement.setAttribute("class", "hotel_tags")

    let i = 0
    for (; i < hotelTags.length - 1; i++) {
        hotelTagsElement.appendChild(document.createTextNode(hotelTags[i] + ", "))
    }
    hotelTagsElement.appendChild(document.createTextNode(hotelTags[i]))
    return hotelTagsElement
}

function makeDescriptionElement(fileURL, className) {
    const descriptionElement = document.createElement("p")
    descriptionElement.classList.add(className)
    fetch(fileURL)
        .then(response => response.text())
        .then(text => descriptionElement.appendChild(document.createTextNode(text.toString())))
    return descriptionElement
}

function makeRoomListElement(hotelID, roomsFileURL) {
    return getRoomsFromJSON(roomsFileURL).then(function (rooms) {
        const roomListElement = document.createElement("div")
        roomListElement.setAttribute("class", "room_list")
        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i]
            const roomWrapper = document.createElement("div")
            roomWrapper.setAttribute("class", "room_wrapper")
            roomWrapper.setAttribute("id", hotelID + "_" + room.id)

            roomWrapper.appendChild(makeImageElement(room.imageURL, "room_image"))
            roomWrapper.appendChild(makeRoomNameElement(room.name))
            roomWrapper.appendChild(makeDescriptionElement(room.infoFileURL, "room_info"))
            roomWrapper.appendChild(makeRoomPriceElement(room.price))
            roomWrapper.appendChild(makeReserveButtonElement())

            roomListElement.appendChild(roomWrapper)
        }
        return roomListElement
    })
}

function getRoomsFromJSON(roomsFileURL) {
    return fetch(roomsFileURL)
        .then(response => response.json())
        .then(data => data.rooms)
}

function makeRoomNameElement(roomName) {
    const roomNameElement = document.createElement("h4")
    roomNameElement.setAttribute("class", "room_name")
    roomNameElement.appendChild(document.createTextNode(roomName))
    return roomNameElement
}

function makeRoomPriceElement(price) {
    const roomPriceElement = document.createElement("h3")
    roomPriceElement.setAttribute("class", "room_price")
    roomPriceElement.appendChild(document.createTextNode(price))
    return roomPriceElement
}

function makeReserveButtonElement() {
    const reserveButton = document.createElement("div")
    reserveButton.setAttribute("class", "reserve_button square_button")
    reserveButton.appendChild(document.createTextNode("Reserve"))
    return reserveButton
}

function goToPreviousPage() {
    activePageNum--
    showHotelList()
}

function goToNextPage() {
    activePageNum++
    showHotelList()
}

function showDropdownOptions() {
    for (let i = 0; i < filterDropdownOptions.length; i++) {
        const country = filterDropdownOptions[i]
        filterCountriesDropdownSelect.options[filterCountriesDropdownSelect.options.length] = new Option(country.name, country.index)
        filterCountriesDropdownSelect.onchange = function () {
            filterCitiesDropdownSelect.length = 1
            if (filterCountriesDropdownSelect.value !== "") {
                const citiProperties = filterDropdownOptions[filterCountriesDropdownSelect.value].cities
                for (let cityProperty in citiProperties) {
                    if (citiProperties.hasOwnProperty(cityProperty)) {
                        const city = citiProperties[cityProperty]
                        filterCitiesDropdownSelect.options[filterCitiesDropdownSelect.options.length] = new Option(city, city)
                    }
                }
            }
        }
    }
}

function expandHotel(hotelElement) {
    hotelElement.classList.add("hotel_expanded")
    html.style.overflow = "hidden"
    logo.style.cursor = "default"
    filterButton.style.cursor = "default"
    logo.removeEventListener("click", scrollToTop)
    filterButton.removeEventListener("click", openFilterMenu)

    let closeButton = document.createElement("div")
    closeButton.setAttribute("class", "close_button square_button")
    closeButton.appendChild(document.createTextNode("Close"))
    hotelElement.appendChild(closeButton)

    closeButton.addEventListener("click", function () {
        collapseHotel(hotelElement)
    })
}

function collapseHotel(hotelElement) {
    hotelElement.removeChild(hotelElement.lastChild)
    hotelElement.classList.remove("hotel_expanded")
    html.style.overflow = "auto"
    logo.addEventListener("click", scrollToTop)
    filterButton.addEventListener("click", openFilterMenu)
    logo.style.cursor = "pointer"
    filterButton.style.cursor = "pointer"
}