console.log('Javascript File is loaded!')

const url = 'http://puzzle.mead.io/puzzle'
const weatherForm = document.querySelector('form')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    const search = document.querySelector('input')
    const location = search.value
    const port = process.env.port || 3000;

    const url = '/weather?address=' + location

    fetch('/weather?address=' + location).then((response,) => {
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





