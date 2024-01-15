const timeSlider = document.querySelector('#time-slider')

let foodInput

const userSelections = {
    includeIngredients: [],
    intolerances: ['dairy'],
    maxReadyTime: 0
}



let baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=36808371f778457eb823b528e2d0a3a6&instructionsRequired=true&sort=random`

const getRecipes = async () => {
    const response = await fetch(baseURL)
    const data = await response.json()
    console.log(data)
}

const joinFilters = (queryFilters) => {
    let newQueryFilters = queryFilters.slice(0,-1)
    baseURL+=newQueryFilters
    getRecipes(baseURL)
}

const createQueryFilters = (selection) => {

    let queryFilters = `?`

    for (key in selection) {
        if (key === 'includeIngredients' && selection[key] != '') {
            queryFilters += `${key}=${selection[key].join(',+')}&`
        } else if (key === 'intolerances' && selection[key] != '') {
            queryFilters += `${key}=${selection[key].join(',+')}&`
        } else if (key === 'maxReadyTime' && selection[key] != 0) {
            queryFilters += `${key}=${selection[key]}&`
        }
    }

    joinFilters(queryFilters)
}

createQueryFilters(userSelections)

const ingredients = 'chicken, rice, eggs'
const ingredients2 = ingredients.split(', ')
console.log(ingredients2)


/**
 * Uncomment the below code to POST data to the database
 */


// const postTrips = async(tripObj) => {
//     const response = await fetch('/api/trips', {
//         method: 'POST',
//         body: JSON.stringify(tripObj),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })

//     const data = await response.json()

//     console.log(data)
// }

// const newTrip = {
//     name: 'pretty cool mountain adventure',
//     description: 'more than okay!!!'
// }

// postTrips(newTrip)

/**
 * Uncomment the below code to GET data from the database
 */


// const getTrips = async() => {
//     const response = await fetch('/api/trips')
//     const data = await response.json()
//     console.log(data)
// }

// getTrips()


/**
 * Uncomment the below code to DELETE data from the database
 */


// const deleteTrips = async(id) => {
//    const response = await fetch(`/api/trips/{id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await response.json()
//     console.log(data)
// }

// deleteTrip(1)


/**
 * Uncomment the below code to Update data in the database
 */

// const newTrip = {
//     name: 'pretty cool mountain adventure',
//     description: 'WAY WAY more than okay!!!'
// }


// const updateTrip = async(id, newTripObj) => {
//    const response = await fetch(`/api/trips/{id}`, {
//         method: 'PUT',
//         body: JSON.stringify(newTripObj),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     const data = await response.json()
//     console.log(data)
// }

// updateTrip(1, newTrip)




