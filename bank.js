let account, form, inputName, inputBalance, singUp, atm, userInfo, userName, balanceAccount, consignButton, withdrawalsButton

function initialize() {
    account = {
        name: ' ',
        balance: 0
    }

    form = document.querySelector('#singUp')
    form.addEventListener('submit', () => openAccount(event))

    inputName = document.querySelector('input#name')
    inputBalance = document.querySelector('input#balance')

    singUp = document.querySelector('.form-main')
    atm = document.querySelector('.atm')
    userName = document.querySelector('#userName')
    userInfo = document.querySelector('.header-user')
    balanceAccount = document.querySelector('#balanceAccount')

    consignButton = document.querySelector('#consignButton')
    consignButton.addEventListener('click', consign)

    withdrawalsBut = document.querySelector('#withdrawalsButton')
    withdrawalsButton.addEventListener('click', withdrawals)


    loadDataFromDatabase()
}

function loadDataFromDatabase() {

    const accountDB = JSON.parse(localStorage.getItem('account'))

    if (accountDB !== undefined && accountDB !== null && typeof accountDB.name === 'string' &&
        accountDB.name !== '') {
        account = accountDB
        showATM()

    }
}

function openAccount(event) {

    event.preventDefault()
    event.stopPropagation()


    const nameInput = document.value
    const balanceInput = document.value

    account.name = nameInput
    account.balance = parseInt(balanceInput)

    updateDatabase(account)
    showATM()
}

function updateBalance(balance) {
    balanceAccount.innerHTML = `$ ${balance}`
}

function updateDatabase(account) {


    localStorage.setItem('account', JSON.stringify(account))


    // user.style.display = 'flex'

}

function showATM() {
    singUp.style.display = 'none'
    atm.style.display = 'block'

    userName.innerHTML = account.name
    updateBalance(account.balance)


    userInfo.style.display = 'block'

}

function consign() {
    const consignmentValue = parseInt(prompt('Ingrese el valor a consignar'))

    if (!Number.isNaN(consignmentValue) && consignmentValue >= 0) {
        account.balance = account.balance + consignmentValue
        updateBalance(account.balance)
    } else {
        swal({
            title: "Error",
            text: "No ingresaste un valor valido",
            icon: 'error'
        })
    }
}

function withdrawals() {
    const withdrawalsValue = parseInt(prompt('Ingrese el valor a retirar'))

    if (!Number.isNaN(withdrawalsValue) && withdrawalsValue > 0) {

        if ((account.balance - withdrawalsValue) >= 0) {
            account.balance = account.balance - withdrawalsValue
            updateBalance(account.balance)
        } else {
            swal({
                title: "Error",
                text: "Fondos insuficientes",
                icon: 'error'
            })
        }
    } else {
        swal({
            title: "Error",
            text: "No ingresaste un valor valido",
            icon: 'error'
        })
    }
}

initialize()


