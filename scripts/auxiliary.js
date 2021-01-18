const hotelObjectStoreName = "hotelObjectStore"
const hotelNumberOnEachPage = 20


const html = document.querySelector("html")

const logo = document.querySelector(".logo")
const filterButton = document.querySelector(".filter_button")
const profileButton = document.querySelector(".profile_button")

const sidebar = document.querySelector("aside")
const dimmedOverlay = document.querySelector(".dimmed_overlay")

const filterMenu = document.querySelector(".filter_menu")
const filterCountriesDropdownSelect = document.querySelector("#countries")
const filterCitiesDropdownSelect = document.querySelector("#cities")
const filterTags = document.querySelectorAll(".filter_tag")
const filterResetButton = document.querySelector("#filter_reset_button")
const filterApplyButton = document.querySelector("#filter_apply_button")

const hotelListArea = document.querySelector(".hotel_list")

const previousPage = document.querySelector(".previous_page")
const nextPage = document.querySelector(".next_page")


const filterTagValues = new Array(filterTags.length).fill(false)
const tagList = {
    pool: "Pool",
    gym: "Gym",
    bar: "Bar",
    free_wifi: "Free WiFi",
    buffet: "Buffet",
    free_parking: "Free Parking",
    underground_parking: "Underground Parking",
    vending_machines: "Vending Machines"
}
const countryList = {
    georgia: {
        index: 0,
        name: "Georgia",
        cities: {
            tbilisi: "Tbilisi",
            batumi: "Batumi",
            telavi: "Telavi",
            mestia: "Mestia"
        }
    },
    japan: {
        index: 1,
        name: "Japan",
        cities: {
            tokyo: "Tokyo",
            kyoto: "Kyoto",
            osaka: "Osaka",
            sapporo: "Sapporo",
            hakodate: "Hakodate",
            fukuoka: "Fukuoka",
            nara: "Nara"
        }
    },
    usa: {
        index: 2,
        name: "USA",
        cities: {
            new_york: "New York",
            chicago: "Chicago",
            new_orleans: "New Orleans",
            los_angeles: "Los Angeles"
        }
    },
    uk: {
        index: 3,
        name: "UK",
        cities: {
            london: "London",
            edinburgh: "Edinburgh",
            manchester: "Manchester",
            liverpool: "Liverpool"
        }
    },
    france: {
        index: 4,
        name: "France",
        cities: {
            paris: "Paris",
            marseille: "Marseille",
            nice: "Nice"
        }
    }
}
const filterDropdownOptions = [countryList.georgia, countryList.japan, countryList.usa, countryList.uk, countryList.france]


class Hotel {
    constructor(name, country, city, tags, imageURL) {
        this.name = name
        this.country = country
        this.city = city
        this.tags = tags
        this.imageURL = imageURL
    }
}