if (localStorage.getItem("databaseInitialized") === null) {
    databaseInit()
    localStorage.setItem("databaseInitialized", "initialized")
}


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
    let transaction = database.transaction(hotelObjectStoreName, "readwrite")
    let hotelObjectStore = transaction.objectStore(hotelObjectStoreName)

    const rooms01 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject01 = makeHotelObject(
        "hotel01",
        "name01",
        countryList.georgia.name,
        countryList.georgia.cities.tbilisi,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/645/300/200.jpg?hmac=zSwhK0ipngA3Q8gPxiRsL3NGUmKtCy89EcH8zONvh8M",
        "descriptions/name01.txt",
        rooms01,
        rooms01.length
    )
    const rooms02 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject02 = makeHotelObject(
        "hotel02",
        "name02",
        countryList.georgia.name,
        countryList.georgia.cities.batumi,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking],
        "https://i.picsum.photos/id/641/300/200.jpg?hmac=YpOnhDuvo6GeXZPS8yR6Wf62YHrXGlWTDObszZf3zpI",
        "descriptions/name02.txt",
        rooms02,
        rooms02.length
    )
    const rooms03 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject03 = makeHotelObject(
        "hotel03",
        "name03",
        countryList.georgia.name,
        countryList.georgia.cities.mestia,
        [tagList.free_wifi, tagList.underground_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/78/300/200.jpg?hmac=n7Sj8aECCS5WoJkWO-zflsPVDeezs5U4M7WgQjLACA0",
        "descriptions/name03.txt",
        rooms03,
        rooms03.length
    )
    const rooms04 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject04 = makeHotelObject(
        "hotel04",
        "name04",
        countryList.usa.name,
        countryList.usa.cities.new_york,
        [],
        "https://i.picsum.photos/id/331/300/200.jpg?hmac=uIUrcfY5rEjbMirOCMEvEXzC0tIJzFIBfZBZ4qhvnd4",
        "descriptions/name04.txt",
        rooms04,
        rooms04.length
    )
    const rooms05 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject05 = makeHotelObject(
        "hotel05",
        "name05",
        countryList.usa.name,
        countryList.usa.cities.los_angeles,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.underground_parking],
        "https://i.picsum.photos/id/816/300/200.jpg?hmac=LyDUxx5Jqqh7V5H3YZdOFIsgVEmG9IWw4H8Iwjfs46I",
        "descriptions/name05.txt",
        rooms05,
        rooms05.length
    )
    const rooms06 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject06 = makeHotelObject(
        "hotel06",
        "name06",
        countryList.uk.name,
        countryList.uk.cities.edinburgh,
        [tagList.bar, tagList.free_wifi, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/721/300/200.jpg?hmac=a8J-TueLrN5E8F50mFD-1efhdFssR3Mj-FuuUHRpddY",
        "descriptions/name06.txt",
        rooms06,
        rooms06.length
    )
    const rooms07 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject07 = makeHotelObject(
        "hotel07",
        "name07",
        countryList.france.name,
        countryList.france.cities.paris,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_parking],
        "https://i.picsum.photos/id/998/300/200.jpg?hmac=ABcJlM1FNcyP3AfTFRqfa64HxavGYS_EloO3wVKI6WY",
        "descriptions/name07.txt",
        rooms07,
        rooms07.length
    )
    const rooms08 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject08 = makeHotelObject(
        "hotel08",
        "name08",
        countryList.japan.name,
        countryList.japan.cities.kyoto,
        [tagList.pool, tagList.gym, tagList.bar, tagList.free_wifi, tagList.buffet, tagList.free_parking, tagList.underground_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/173/300/200.jpg?hmac=QNv1dkRQYgkul__n_maFKcC5QLE7zBly8z3gwr3SmI0",
        "descriptions/name08.txt",
        rooms08,
        rooms08.length
    )
    const rooms09 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject09 = makeHotelObject(
        "hotel09",
        "name09",
        countryList.japan.name,
        countryList.japan.cities.nara,
        [tagList.bar, tagList.free_wifi, tagList.free_parking, tagList.vending_machines],
        "https://i.picsum.photos/id/203/300/200.jpg?hmac=FsCLTwngZ8-1jbxqdBKyoJy-ZHjbhlupNzeKiib04MI",
        "descriptions/name09.txt",
        rooms09,
        rooms09.length
    )
    const rooms10 = [
        {
            "roomID": "room01",
            "name": "Standard Single Room",
            "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
            "infoFileURL": "descriptions/name01.txt",
            "price": "$100"
        },
        {
            "roomID": "room02",
            "name": "Standard Double Room",
            "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
            "infoFileURL": "descriptions/name02.txt",
            "price": "$200"
        },
        {
            "roomID": "room03",
            "name": "Standard Twin Room",
            "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
            "infoFileURL": "descriptions/name03.txt",
            "price": "$300"
        },
        {
            "roomID": "room04",
            "name": "Deluxe Twin Room",
            "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
            "infoFileURL": "descriptions/name04.txt",
            "price": "$400"
        }
    ]
    const hotelObject10 = makeHotelObject(
        "hotel10",
        "name10",
        countryList.georgia.name,
        countryList.georgia.cities.mestia,
        [tagList.free_parking],
        "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE",
        "descriptions/name10.txt",
        rooms10,
        rooms10.length
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
        const roomsI = [
            {
                "roomID": "room01",
                "name": "Standard Single Room",
                "imageURL": "https://i.picsum.photos/id/420/225/150.jpg?hmac=2qrNMYBCGbNfU4g_ZoQ0HfNFyc1cjZLjMr0pekwH3NQ",
                "infoFileURL": "descriptions/name01.txt",
                "price": "$100"
            },
            {
                "roomID": "room02",
                "name": "Standard Double Room",
                "imageURL": "https://i.picsum.photos/id/883/225/150.jpg?hmac=2cNaasZVCBn7UVctivRAtHjXyD9JvdZxx131bXPxT6M",
                "infoFileURL": "descriptions/name02.txt",
                "price": "$200"
            },
            {
                "roomID": "room03",
                "name": "Standard Twin Room",
                "imageURL": "https://i.picsum.photos/id/1011/225/150.jpg?hmac=Kj18zq0ariZE18SAfWGJUQxtibbq9T8lzUgws62_cD4",
                "infoFileURL": "descriptions/name03.txt",
                "price": "$300"
            },
            {
                "roomID": "room04",
                "name": "Deluxe Twin Room",
                "imageURL": "https://i.picsum.photos/id/169/225/150.jpg?hmac=7n7aHVpBt4rZdBu35ihCgx0w2PSpAz2ow-8_RkRAR5k",
                "infoFileURL": "descriptions/name04.txt",
                "price": "$400"
            }
        ]
        const hotelObject = makeHotelObject(
            "hotel" + i,
            "Extra Hotel " + i,
            countryList.japan.name,
            countryList.japan.cities.sapporo,
            [tagList.free_wifi, tagList.free_parking],
            "https://i.picsum.photos/id/718/300/200.jpg?hmac=2AXNXV_A7Vmp-rOv8sWOWmRkGUZUJmc8pP3Gvsmu-PE",
            "descriptions/name" + i + ".txt",
            roomsI,
            roomsI.length
        )
        addRequest = hotelObjectStore.add(hotelObject)
    }

    addRequest.onerror = function () {
        console.error("Add Request Error", addRequest.error)
    }
}

function makeHotelObject(hotelID, hotelName, countryName, cityName, tags, imageURL, descriptionFileURL, rooms, numberOfRooms) {
    for (let i = 1; i < numberOfRooms; i++) {
        const adjustedI = (i < 9) ? ("0" + i) : ("" + i)
        const reservedDatesID = hotelID + "_" + "room" + adjustedI
        if (localStorage.getItem(reservedDatesID) === null) {
            localStorage.setItem(reservedDatesID, "[]")
        }
    }
    localStorage.setItem(accountID, "[]")
    return new Hotel(hotelID, hotelName, countryName, cityName, tags, imageURL, descriptionFileURL, rooms)

}