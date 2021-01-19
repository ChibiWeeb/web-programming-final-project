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
            database.createObjectStore(hotelObjectStoreName, {keyPath: "name"})
        }
    }

    openRequest.onsuccess = function () {
        let database = openRequest.result
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)

        let hotelObject01 = new Hotel(
            "name01",
            countryList.georgia.name,
            countryList.georgia.cities.tbilisi,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/645/300/200.jpg?hmac=zSwhK0ipngA3Q8gPxiRsL3NGUmKtCy89EcH8zONvh8M"
        )
        let hotelObject02 = new Hotel(
            "name02",
            countryList.georgia.name,
            countryList.georgia.cities.batumi,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking],
            "https://i.picsum.photos/id/641/300/200.jpg?hmac=YpOnhDuvo6GeXZPS8yR6Wf62YHrXGlWTDObszZf3zpI"
        )
        let hotelObject03 = new Hotel(
            "name03",
            countryList.georgia.name,
            countryList.georgia.cities.mestia,
            [tagList.free_wifi, tagList.underground_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/78/300/200.jpg?hmac=n7Sj8aECCS5WoJkWO-zflsPVDeezs5U4M7WgQjLACA0"
        )
        let hotelObject04 = new Hotel(
            "name04",
            countryList.usa.name,
            countryList.usa.cities.new_york,
            [],
            "https://i.picsum.photos/id/331/300/200.jpg?hmac=uIUrcfY5rEjbMirOCMEvEXzC0tIJzFIBfZBZ4qhvnd4"
        )
        let hotelObject05 = new Hotel(
            "name05",
            countryList.usa.name,
            countryList.usa.cities.los_angeles,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.underground_parking],
            "https://i.picsum.photos/id/816/300/200.jpg?hmac=LyDUxx5Jqqh7V5H3YZdOFIsgVEmG9IWw4H8Iwjfs46I"
        )
        let hotelObject06 = new Hotel(
            "name06",
            countryList.uk.name,
            countryList.uk.cities.edinburgh,
            [tagList.bar, tagList.free_wifi, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/721/300/200.jpg?hmac=a8J-TueLrN5E8F50mFD-1efhdFssR3Mj-FuuUHRpddY"
        )
        let hotelObject07 = new Hotel(
            "name07",
            countryList.france.name,
            countryList.france.cities.paris,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_parking],
            "https://i.picsum.photos/id/998/300/200.jpg?hmac=ABcJlM1FNcyP3AfTFRqfa64HxavGYS_EloO3wVKI6WY"
        )
        let hotelObject08 = new Hotel(
            "name08",
            countryList.japan.name,
            countryList.japan.cities.kyoto,
            [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/173/300/200.jpg?hmac=QNv1dkRQYgkul__n_maFKcC5QLE7zBly8z3gwr3SmI0"
        )
        let hotelObject09 = new Hotel(
            "name09",
            countryList.japan.name,
            countryList.japan.cities.nara,
            [tagList.bar, tagList.free_wifi, tagList.free_parking, tagList.vending_machines],
            "https://i.picsum.photos/id/203/300/200.jpg?hmac=FsCLTwngZ8-1jbxqdBKyoJy-ZHjbhlupNzeKiib04MI"
        )
        let hotelObject10 = new Hotel(
            "name10",
            countryList.georgia.name,
            countryList.georgia.cities.mestia,
            [tagList.free_parking],
            "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE"
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
                "name" + i,
                countryList.japan.name,
                countryList.japan.cities.sapporo,
                [tagList.free_wifi, tagList.free_parking],
                "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE"
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
        openSidebar(200)
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
            } else if (e.target.parentNode.className === "hotel") {
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

function makeHotelDiv(hotelObj) {
    const hotelWrapper = document.createElement("div")
    hotelWrapper.setAttribute("class", "hotel")
    hotelWrapper.setAttribute("id", "hotel_" + hotelObj.name)
    hotelWrapper.style.display = "flex"
    hotelWrapper.style.flexDirection = "column"
    hotelWrapper.style.alignItems = "center"
    hotelWrapper.style.backgroundColor = "orange"

    const hotelNameElement = document.createElement("h1")
    hotelNameElement.style.userSelect = "none"
    hotelNameElement.appendChild(document.createTextNode(hotelObj.name))
    hotelWrapper.appendChild(hotelNameElement)

    const hotelCountryAndCityElement = document.createElement("h4")
    hotelCountryAndCityElement.style.textAlign = "center"
    hotelCountryAndCityElement.style.userSelect = "none"
    hotelCountryAndCityElement.appendChild(document.createTextNode(hotelObj.country + ", " + hotelObj.city))
    hotelWrapper.appendChild(hotelCountryAndCityElement)

    const image = document.createElement("img")
    image.setAttribute("src", hotelObj.imageURL)
    image.style.margin = "0 20px 25px"
    image.style.userSelect = "none"
    hotelWrapper.appendChild(image)

    const hotelTagsElement = document.createElement("p")
    hotelTagsElement.style.textAlign = "center"
    hotelTagsElement.style.userSelect = "none"
    if (hotelObj.tags.length > 0) {
        let i = 0
        for (; i < hotelObj.tags.length - 1; i++) {
            hotelTagsElement.appendChild(document.createTextNode(hotelObj.tags[i] + ", "))
        }
        hotelTagsElement.appendChild(document.createTextNode(hotelObj.tags[i]))
        hotelWrapper.appendChild(hotelTagsElement)
    }

    hotelListArea.appendChild(hotelWrapper)
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
    closeButton.classList.add("close_button")
    closeButton.appendChild(document.createTextNode("Close"))
    hotelElement.appendChild(closeButton)

    hotelElement.appendChild(document.createTextNode(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum massa tincidunt urna vulputate eleifend eget sit amet diam. Suspendisse potenti. Maecenas luctus blandit ex, non aliquet eros convallis et. Nam ut aliquam nisl. Fusce fermentum sem lorem, et vehicula lorem finibus non. In interdum augue eget elit interdum, sit amet varius lacus viverra. Aliquam convallis volutpat faucibus.

Curabitur lobortis ex nec nisi ornare, non venenatis enim dictum. Praesent auctor, metus eu pretium elementum, purus elit euismod felis, sit amet feugiat lectus enim sed risus. Maecenas cursus libero non velit viverra sollicitudin. Cras aliquet nibh vel dui ultrices, sit amet auctor sapien gravida. Integer sodales, massa ut congue tempor, lacus lacus tempor ante, a pretium tortor augue eu ligula. Praesent tempus arcu ac ante ornare eleifend. Nullam sed tincidunt dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit ex non rhoncus fringilla.

Donec ut mollis nisi. Donec quis vulputate lorem, eu bibendum massa. Quisque a auctor magna, quis bibendum sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc faucibus maximus ipsum, a accumsan nibh dictum ut. Fusce vel suscipit lorem. Etiam convallis, dolor non venenatis egestas, felis diam fermentum purus, auctor placerat justo neque eget nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In tristique ipsum lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id ullamcorper nunc, non venenatis est. Quisque et gravida sem, sodales fermentum est.

Donec facilisis tortor tincidunt, eleifend libero ultrices, efficitur ante. Ut id urna consectetur, tristique tortor sit amet, pellentesque sapien. Aliquam ut augue augue. Aenean vulputate sapien ut imperdiet suscipit. Nam odio neque, viverra at ligula nec, ultricies eleifend orci. Suspendisse ullamcorper sagittis euismod. Integer sit amet nibh dignissim, dignissim est vitae, lobortis quam. Mauris blandit, nibh at accumsan ultrices, magna est scelerisque dolor, at vestibulum sapien erat in erat.

In vel sodales sapien, vitae varius mi. Nulla aliquam vestibulum purus. Nam commodo enim non tortor tincidunt imperdiet. Suspendisse in lorem imperdiet, feugiat augue id, placerat neque. Vivamus risus diam, aliquet ut nulla vel, placerat convallis tortor. Suspendisse potenti. Proin faucibus at libero quis euismod. Nulla id nulla eu lacus consectetur consequat quis a metus. Nunc euismod efficitur molestie. Nam ligula mi, rutrum nec dignissim id, posuere eu magna. Integer semper scelerisque nisl, a elementum nulla dignissim id. Fusce nibh nisi, tempor mollis varius in, eleifend sit amet enim. Quisque condimentum nisi ut nisl fermentum porta. Nunc aliquet eros nec fringilla feugiat.


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum massa tincidunt urna vulputate eleifend eget sit amet diam. Suspendisse potenti. Maecenas luctus blandit ex, non aliquet eros convallis et. Nam ut aliquam nisl. Fusce fermentum sem lorem, et vehicula lorem finibus non. In interdum augue eget elit interdum, sit amet varius lacus viverra. Aliquam convallis volutpat faucibus.

Curabitur lobortis ex nec nisi ornare, non venenatis enim dictum. Praesent auctor, metus eu pretium elementum, purus elit euismod felis, sit amet feugiat lectus enim sed risus. Maecenas cursus libero non velit viverra sollicitudin. Cras aliquet nibh vel dui ultrices, sit amet auctor sapien gravida. Integer sodales, massa ut congue tempor, lacus lacus tempor ante, a pretium tortor augue eu ligula. Praesent tempus arcu ac ante ornare eleifend. Nullam sed tincidunt dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit ex non rhoncus fringilla.

Donec ut mollis nisi. Donec quis vulputate lorem, eu bibendum massa. Quisque a auctor magna, quis bibendum sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc faucibus maximus ipsum, a accumsan nibh dictum ut. Fusce vel suscipit lorem. Etiam convallis, dolor non venenatis egestas, felis diam fermentum purus, auctor placerat justo neque eget nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In tristique ipsum lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id ullamcorper nunc, non venenatis est. Quisque et gravida sem, sodales fermentum est.

Donec facilisis tortor tincidunt, eleifend libero ultrices, efficitur ante. Ut id urna consectetur, tristique tortor sit amet, pellentesque sapien. Aliquam ut augue augue. Aenean vulputate sapien ut imperdiet suscipit. Nam odio neque, viverra at ligula nec, ultricies eleifend orci. Suspendisse ullamcorper sagittis euismod. Integer sit amet nibh dignissim, dignissim est vitae, lobortis quam. Mauris blandit, nibh at accumsan ultrices, magna est scelerisque dolor, at vestibulum sapien erat in erat.

In vel sodales sapien, vitae varius mi. Nulla aliquam vestibulum purus. Nam commodo enim non tortor tincidunt imperdiet. Suspendisse in lorem imperdiet, feugiat augue id, placerat neque. Vivamus risus diam, aliquet ut nulla vel, placerat convallis tortor. Suspendisse potenti. Proin faucibus at libero quis euismod. Nulla id nulla eu lacus consectetur consequat quis a metus. Nunc euismod efficitur molestie. Nam ligula mi, rutrum nec dignissim id, posuere eu magna. Integer semper scelerisque nisl, a elementum nulla dignissim id. Fusce nibh nisi, tempor mollis varius in, eleifend sit amet enim. Quisque condimentum nisi ut nisl fermentum porta. Nunc aliquet eros nec fringilla feugiat.


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum massa tincidunt urna vulputate eleifend eget sit amet diam. Suspendisse potenti. Maecenas luctus blandit ex, non aliquet eros convallis et. Nam ut aliquam nisl. Fusce fermentum sem lorem, et vehicula lorem finibus non. In interdum augue eget elit interdum, sit amet varius lacus viverra. Aliquam convallis volutpat faucibus.

Curabitur lobortis ex nec nisi ornare, non venenatis enim dictum. Praesent auctor, metus eu pretium elementum, purus elit euismod felis, sit amet feugiat lectus enim sed risus. Maecenas cursus libero non velit viverra sollicitudin. Cras aliquet nibh vel dui ultrices, sit amet auctor sapien gravida. Integer sodales, massa ut congue tempor, lacus lacus tempor ante, a pretium tortor augue eu ligula. Praesent tempus arcu ac ante ornare eleifend. Nullam sed tincidunt dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit ex non rhoncus fringilla.

Donec ut mollis nisi. Donec quis vulputate lorem, eu bibendum massa. Quisque a auctor magna, quis bibendum sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc faucibus maximus ipsum, a accumsan nibh dictum ut. Fusce vel suscipit lorem. Etiam convallis, dolor non venenatis egestas, felis diam fermentum purus, auctor placerat justo neque eget nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In tristique ipsum lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id ullamcorper nunc, non venenatis est. Quisque et gravida sem, sodales fermentum est.

Donec facilisis tortor tincidunt, eleifend libero ultrices, efficitur ante. Ut id urna consectetur, tristique tortor sit amet, pellentesque sapien. Aliquam ut augue augue. Aenean vulputate sapien ut imperdiet suscipit. Nam odio neque, viverra at ligula nec, ultricies eleifend orci. Suspendisse ullamcorper sagittis euismod. Integer sit amet nibh dignissim, dignissim est vitae, lobortis quam. Mauris blandit, nibh at accumsan ultrices, magna est scelerisque dolor, at vestibulum sapien erat in erat.

In vel sodales sapien, vitae varius mi. Nulla aliquam vestibulum purus. Nam commodo enim non tortor tincidunt imperdiet. Suspendisse in lorem imperdiet, feugiat augue id, placerat neque. Vivamus risus diam, aliquet ut nulla vel, placerat convallis tortor. Suspendisse potenti. Proin faucibus at libero quis euismod. Nulla id nulla eu lacus consectetur consequat quis a metus. Nunc euismod efficitur molestie. Nam ligula mi, rutrum nec dignissim id, posuere eu magna. Integer semper scelerisque nisl, a elementum nulla dignissim id. Fusce nibh nisi, tempor mollis varius in, eleifend sit amet enim. Quisque condimentum nisi ut nisl fermentum porta. Nunc aliquet eros nec fringilla feugiat.`))
    closeButton.addEventListener("click", function () {
        closeButton.classList.remove("close_button")
        collapseHotel(hotelElement)
    })
}

function collapseHotel(hotelElement) {
    hotelElement.removeChild(hotelElement.lastChild)
    hotelElement.removeChild(hotelElement.lastChild)
    hotelElement.classList.remove("hotel_expanded")
    html.style.overflow = "auto"
    logo.addEventListener("click", scrollToTop)
    filterButton.addEventListener("click", openFilterMenu)
    logo.style.cursor = "pointer"
    filterButton.style.cursor = "pointer"
}