databaseInit()

function databaseInit() {
    let openRequest = indexedDB.open("hotelsDatabase", 1)
    openRequest.onupgradeneeded = function () {
        let database = openRequest.result
        if (!database.objectStoreNames.contains(hotelObjectStoreName)) {
            database.createObjectStore(hotelObjectStoreName, {keyPath: "hotelID"})
        }
    }

    openRequest.onsuccess = function () {
        addInitialHotels(openRequest.result)
    }

    openRequest.onerror = function () {
        console.error("Open Request Error", openRequest.error)
    }
}

function addInitialHotels(database) {
    makeHotelObject(
        "hotel01",
        "name01",
        countryList.georgia.name,
        countryList.georgia.cities.tbilisi,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/645/300/200.jpg?hmac=zSwhK0ipngA3Q8gPxiRsL3NGUmKtCy89EcH8zONvh8M",
        "descriptions/name01.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel02",
        "name02",
        countryList.georgia.name,
        countryList.georgia.cities.batumi,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking],
        "https://i.picsum.photos/id/641/300/200.jpg?hmac=YpOnhDuvo6GeXZPS8yR6Wf62YHrXGlWTDObszZf3zpI",
        "descriptions/name02.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel03",
        "name03",
        countryList.georgia.name,
        countryList.georgia.cities.mestia,
        [tagList.free_wifi, tagList.underground_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/78/300/200.jpg?hmac=n7Sj8aECCS5WoJkWO-zflsPVDeezs5U4M7WgQjLACA0",
        "descriptions/name03.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel04",
        "name04",
        countryList.usa.name,
        countryList.usa.cities.new_york,
        [],
        "https://i.picsum.photos/id/331/300/200.jpg?hmac=uIUrcfY5rEjbMirOCMEvEXzC0tIJzFIBfZBZ4qhvnd4",
        "descriptions/name04.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel05",
        "name05",
        countryList.usa.name,
        countryList.usa.cities.los_angeles,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.underground_parking],
        "https://i.picsum.photos/id/816/300/200.jpg?hmac=LyDUxx5Jqqh7V5H3YZdOFIsgVEmG9IWw4H8Iwjfs46I",
        "descriptions/name05.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel06",
        "name06",
        countryList.uk.name,
        countryList.uk.cities.edinburgh,
        [tagList.bar, tagList.free_wifi, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/721/300/200.jpg?hmac=a8J-TueLrN5E8F50mFD-1efhdFssR3Mj-FuuUHRpddY",
        "descriptions/name06.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel07",
        "name07",
        countryList.france.name,
        countryList.france.cities.paris,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_parking],
        "https://i.picsum.photos/id/998/300/200.jpg?hmac=ABcJlM1FNcyP3AfTFRqfa64HxavGYS_EloO3wVKI6WY",
        "descriptions/name07.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel08",
        "name08",
        countryList.japan.name,
        countryList.japan.cities.kyoto,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/173/300/200.jpg?hmac=QNv1dkRQYgkul__n_maFKcC5QLE7zBly8z3gwr3SmI0",
        "descriptions/name08.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel09",
        "name09",
        countryList.japan.name,
        countryList.japan.cities.nara,
        [tagList.bar, tagList.free_wifi, tagList.free_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/203/300/200.jpg?hmac=FsCLTwngZ8-1jbxqdBKyoJy-ZHjbhlupNzeKiib04MI",
        "descriptions/name09.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })
    makeHotelObject(
        "hotel10",
        "name10",
        countryList.georgia.name,
        countryList.georgia.cities.mestia,
        [tagList.free_parking],
        "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE",
        "descriptions/name10.txt",
        "rooms/hotel01.json"
    ).then(function (hotelObject) {
        let transaction = database.transaction(hotelObjectStoreName, "readwrite")
        let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
        hotelObjectStore.add(hotelObject)
    })

    for (let i = 11; i < 61; i++) {
        makeHotelObject(
            "hotel" + i,
            "Extra Hotel " + i,
            countryList.japan.name,
            countryList.japan.cities.sapporo,
            [tagList.free_wifi, tagList.free_parking],
            "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE",
            "descriptions/name" + i + ".txt",
            "rooms/hotel01.json"
        ).then(function (hotelObject) {
            let transaction = database.transaction(hotelObjectStoreName, "readwrite")
            let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)
            hotelObjectStore.add(hotelObject)
        })
    }
}

function makeHotelObject(hotelID, hotelName, countryName, cityName, tags, imageURL, descriptionFileURL, roomsFileURL) {
    return getDataFromJSON(roomsFileURL).then(function (data) {
        const rooms = data.rooms
        for (let i = 0; i < rooms.length; i++) {
            const reservedDatesID = hotelID + "_" + rooms[i].roomID
            const reservedDates = rooms[i].reservedDates
            if (reservedDates === undefined) {
                if (localStorage.getItem(reservedDatesID) === null) {
                    localStorage.setItem(reservedDatesID, "[]")
                }
            } else {
                for (let j = 0; j < reservedDates.length; j++) {
                    if (localStorage.getItem(reservedDatesID) === null) {
                        localStorage.setItem(reservedDatesID, JSON.stringify(reservedDates))
                    }
                }
            }
        }
        return new Hotel(hotelID, hotelName, countryName, cityName, tags, imageURL, descriptionFileURL, roomsFileURL)
    })
}