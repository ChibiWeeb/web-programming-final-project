let activePageNum = 1
let hotelTotalNumber


initialize()
showHotelList()
showDropdownOptions()


function initialize() {
    logo.addEventListener("click", scrollToTop)
    filterButton.addEventListener("click", openFilterMenu)
    profileButton.addEventListener("click", function () {
        openSidebar(250)
    })
    reservePopupCancelButton.addEventListener("click", closeReservePopup)
    sideMenuDimmedOverlay.addEventListener("click", closeSidebar)

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
    sideMenuDimmedOverlay.style.display = "block"
}

function closeSidebar() {
    sidebar.style.width = "0"
    html.style.overflow = "auto"
    sideMenuDimmedOverlay.style.display = "none"
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
    hotelWrapper.setAttribute("id", hotelObject.hotelID)

    hotelWrapper.appendChild(makeHotelNameElement(hotelObject.name))
    hotelWrapper.appendChild(makeCountryAndCityElement(hotelObject.country, hotelObject.city))
    hotelWrapper.appendChild(makeImageElement(hotelObject.imageURL, "hotel_image"))
    if (hotelObject.tags.length > 0) {
        hotelWrapper.appendChild(makeHotelTagsElement(hotelObject.tags))
    }
    hotelWrapper.appendChild(makeDescriptionElement(hotelObject.descriptionFileURL, "hotel_description"))
    makeRoomListElement(hotelObject.hotelID, hotelObject.roomsFileURL).then(function (roomListElement) {
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
    return getDataFromJSON(roomsFileURL).then(function (data) {
        const rooms = data.rooms
        const roomListElement = document.createElement("div")
        roomListElement.setAttribute("class", "room_list")
        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i]
            const hotelRoomID = hotelID + "_" + room.roomID
            const roomWrapper = document.createElement("div")
            roomWrapper.setAttribute("class", "room_wrapper")
            roomWrapper.setAttribute("id", hotelRoomID)

            roomWrapper.appendChild(makeImageElement(room.imageURL, "room_image"))
            roomWrapper.appendChild(makeRoomNameElement(room.name))
            roomWrapper.appendChild(makeDescriptionElement(room.infoFileURL, "room_info"))
            roomWrapper.appendChild(makeRoomPriceElement(room.price))
            roomWrapper.appendChild(makeReserveButtonElement(hotelRoomID))

            roomListElement.appendChild(roomWrapper)
        }
        return roomListElement
    })
}

function getDataFromJSON(roomsFileURL) {
    return fetch(roomsFileURL)
        .then(response => response.json())
        .then(data => data)
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

function makeReserveButtonElement(hotelRoomID) {
    const reserveButton = document.createElement("div")
    reserveButton.setAttribute("class", "reserve_button square_button")
    reserveButton.setAttribute("id", "button_" + hotelRoomID)
    reserveButton.appendChild(document.createTextNode("Reserve"))
    const reserveButtonHandle = function (e) {
        showReservePopup(e)
    }
    reserveButton.addEventListener("click", reserveButtonHandle)
    return reserveButton
}

function showReservePopup(mouseEvent) {
    if (mouseEvent.target && mouseEvent.target.parentNode && mouseEvent.target.parentNode.className === "room_wrapper") {
        html.style.overflow = "hidden"
        reservePopupDimmedOverlay.style.display = "block"
        reservePopup.style.display = "flex"

        const roomObject = document.querySelector("#" + mouseEvent.target.parentNode.id)
        reservePopupReserveButton.addEventListener("click", function () {
            reserveTheRoom(roomObject.id)
        })
        const nameAndPriceWrapperElement = document.createElement("div")
        nameAndPriceWrapperElement.setAttribute("class", "name_and_price_wrapper")

        const nameWrapper = document.createElement("div")
        nameWrapper.appendChild(document.createTextNode(roomObject.querySelector(".room_name").textContent))
        const priceWrapper = document.createElement("div")
        priceWrapper.appendChild(document.createTextNode(roomObject.querySelector(".room_price").textContent))

        nameAndPriceWrapperElement.appendChild(nameWrapper)
        nameAndPriceWrapperElement.appendChild(priceWrapper)

        reservePopup.insertBefore(nameAndPriceWrapperElement, reservePopup.firstChild)

        makeDatepickers(roomObject.id)
    }
}

function makeDatepickers(roomObjectID) {
    const dateFromInputElement = document.querySelector("#date_from_input")
    const datepickerFrom = new Datepicker(dateFromInputElement)
    const dateToInputElement = document.querySelector("#date_to_input")
    const datepickerTo = new Datepicker(dateToInputElement)

    configureDatepicker(datepickerFrom, roomObjectID)
    configureDatepicker(datepickerTo, roomObjectID)
}

function configureDatepicker(datepicker, roomObjectID) {
    const dateNow = new Date()
    datepicker.config({
        first_date: dateNow,
        last_date: new Date(dateNow.getFullYear(), dateNow.getMonth() + 4, dateNow.getDate()),
        initial_date: dateNow,
        enabled_days: d => dateIsNotReserved(d, JSON.parse(localStorage.getItem(roomObjectID))),
        format: d => {
            return [
                d.getFullYear(),
                formatMonth(d.getMonth() + 1),
                d.getDate(),
            ].join("-")
        }
    })
}

function dateIsNotReserved(date, roomReservedDates) {
    for (let i = 0; i < roomReservedDates.length; i++) {
        const datePeriod = roomReservedDates[i].split(":")
        const dateStart = new Date(datePeriod[0])
        dateStart.setHours(0, 0, 0, 0)
        const dateEnd = new Date(datePeriod[1])
        dateEnd.setHours(23, 59, 59, 999)
        if ((date.getTime() >= dateStart.getTime()) && (date.getTime() <= dateEnd.getTime())) {
            return false
        }
    }
    return true
}

function closeReservePopup() {
    html.style.overflow = "auto"
    reservePopupDimmedOverlay.style.display = "none"
    reservePopup.style.display = "none"
    reservePopup.removeChild(reservePopup.firstChild)
    document.querySelector(".credentials_inputs_wrapper").querySelectorAll("input")
        .forEach(function (element) {
            element.value = ""
        })
}

function reserveTheRoom(roomObjectID) {
    const dateFromInput = document.querySelector("#date_from_input")
    const dateFrom = new Date(dateFromInput.value)
    const dateToInput = document.querySelector("#date_to_input")
    const dateTo = new Date(dateToInput.value)
    const dateToIsEarlierThanDateFrom = (dateTo.getTime() < dateFrom.getTime())

    if (dateFromInput.value === "" || dateToInput.value === "") {
        alert("Date input cannot be empty")
    } else if (overlapsWithReservedDates(dateFrom, dateTo, roomObjectID)) {
        alert("Chosen date period contains already reserved dates")
    } else if (dateToIsEarlierThanDateFrom) {
        alert("End Date cannot be earlier than Start Date")
    } else {
        const formattedChosenDate = dateFromInput.value + ":" + dateToInput.value


        const roomReservedDates = JSON.parse(localStorage.getItem(roomObjectID))
        roomReservedDates.push(formattedChosenDate)
        localStorage.setItem(roomObjectID, JSON.stringify(roomReservedDates))

        location.reload()
    }
}


function overlapsWithReservedDates(dateFrom, dateTo, roomObjectID) {
    for (let currDate = dateFrom; currDate.getTime() <= dateTo.getTime(); currDate.setDate(currDate.getDate() + 1)) {
        if (!dateIsNotReserved(currDate, JSON.parse(localStorage.getItem(roomObjectID)))) {
            return true
        }
    }
    return false
}

function formatMonth(month) {
    return ((month < 10) ? ("0" + month) : month)
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