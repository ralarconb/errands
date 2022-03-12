const errandIDDOM = document.querySelector('.errand-edit-id')
const errandNameDOM = document.querySelector('.errand-edit-name')
const errandCompletedDOM = document.querySelector('.errand-edit-completed')
const editFormDOM = document.querySelector('.single-errand-form')
const editBtnDOM = document.querySelector('.errand-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showErrand = async () => {
    try {
        const {
            data: { errand },
        } = await axios.get(`/api/v1/errands/${id}`)
        const { _id: errandID, completed, name } = errand

        errandIDDOM.textContent = errandID
        errandNameDOM.value = name
        tempName = name
        if (completed) {
            errandCompletedDOM.checked = true
        }
    } catch (error) {
        console.log(error)
    }
}

showErrand()

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...'
    e.preventDefault()
    try {
        const errandName = errandNameDOM.value
        const errandCompleted = errandCompletedDOM.checked

        const {
            data: { errand },
        } = await axios.patch(`/api/v1/errands/${id}`, {
            name: errandName,
            completed: errandCompleted,
        })

        const { _id: errandID, completed, name } = errand

        errandIDDOM.textContent = errandID
        errandNameDOM.value = name
        tempName = name
        if (completed) {
            errandCompletedDOM.checked = true
        }
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, edited errand`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        console.error(error)
        errandNameDOM.value = tempName
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    editBtnDOM.textContent = 'Edit'
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})
