const errandsDOM = document.querySelector('.errands')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.errand-form')
const errandInputDOM = document.querySelector('.errand-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load errands from /api/errands
const showErrands = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
        const {
            data: { errands: errands },
        } = await axios.get('/api/v1/errands')
        if (errands.length < 1) {
            errandsDOM.innerHTML = '<h5 class="empty-list">No errands in your list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        }
        const allErrands = errands
            .map((errand) => {
                const { completed, _id: errandID, name } = errand
                return `<div class="single-errand ${completed && 'errand-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="errand-links">



<!-- edit link -->
<a href="errand.html?id=${errandID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${errandID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
            })
            .join('')
        errandsDOM.innerHTML = allErrands
    } catch (error) {
        errandsDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
}

showErrands()

// delete errand /api/errands/:id

errandsDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible'
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`/api/v1/errands/${id}`)
            showErrands()
        } catch (error) {
            console.log(error)
        }
    }
    loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = errandInputDOM.value

    try {
        await axios.post('/api/v1/errands', { name })
        showErrands()
        errandInputDOM.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, errand added`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})
