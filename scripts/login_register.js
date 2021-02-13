const loginAccountID = document.querySelector("#login_account_id")
const loginPassword = document.querySelector("#login_password")
const loginFormButton = document.querySelector("#login_button")
const registerAccountID = document.querySelector("#register_account_id")
const registerPassword = document.querySelector("#register_password")
const registerFormButton = document.querySelector("#register_button")

addListeners()

function addListeners() {
    loginFormButton.addEventListener("click", login)
    registerFormButton.addEventListener("click", register)
}

function register() {
    const accountID = registerAccountID.value
    const password = registerPassword.value
    if (accountID === "" || password === "") {
        alert("Fields cannot be empty")
    } else if (localStorage.getItem(accountID) !== null) {
        alert("Account ID is taken. Try something different")
    } else {
        localStorage.setItem(accountID, password)
        alert("Registration successful")
        sessionStorage.setItem("logged_in", accountID)
        location.href = "index.html"
    }
}

function login() {
    const accountID = loginAccountID.value
    const password = loginPassword.value
    if (accountID === "" || password === "") {
        alert("Fields cannot be empty")
    } else if (localStorage.getItem(accountID) === null) {
        alert("Account ID does not exist")
    } else if (localStorage.getItem(accountID) !== password){
        alert("Password is incorrect")
    } else {
        sessionStorage.setItem("logged_in", accountID)
        location.href = "index.html"
    }
}