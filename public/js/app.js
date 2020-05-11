console.log('Javascript File is loaded!')

const weatherForm = document.querySelector('form')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    const search = document.querySelector('input')
    const location = search.value
    //const url1 = 'http://localhost:3000/weather?address=' + location
    const url2 = '/weather?address=' + location

    fetch(url2).then((response,) => {
        response.json().then((data) => {

            if (data.error) {

                message1.textContent = data.error

            } else {

                const locationOutput = data.location
                const forecast = data.forecast

                message1.textContent = locationOutput
                message2.textContent = forecast
            }
        })


    })

})





