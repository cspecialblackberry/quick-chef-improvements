import { useState } from "react"

export default function SearchFields () {
    const intoleranceOptions = ["dairy", "egg", "gluten", "grain", "peanut", "seafood"]
    const [ingredients, setIngredients] = useState("")
    const [time, setTime] = useState(27)
    const [intolerances, setIntolerances] = useState([])

    const handleSubmit = () => {

    }
    const handleIngredients = (value: string) => {
        setIngredients(value)
    }
    const handleTime = (value: number) => {
        setTime(value)
    }
    const handleIntolerances = () => {

    }
    return (
        <>
        <form id="search-container" onSubmit={() => handleSubmit}>
            <div id="ingredients-container">
                <label htmlFor="ingredients">What ingredient do you want to use?</label>
                <input type="text" id="ingredients" placeholder="Search by ingredient" onInput={(value) => handleIngredients(value.toString())}/>
            </div>
            <div id="time-container">
                <label htmlFor="time-slider">How much time do you have?</label>
                <input type="range" min="10" max="45" id="time-slider" onInput={(value) => handleTime(parseInt(value.toString()))}/>
                <output htmlFor="time-slider" id="time-slider-label">{time}</output>
            </div>
            <div id="multiselect">
                <label htmlFor="intolerances">Any allergies or intolerances?</label>
                <select name="intolerances" id="intolerances" multiple onInput={() => handleIntolerances}>
                    {intoleranceOptions.map((intolerance) => <option value={intolerance}>{intolerance}</option>)}
                </select>
            </div>
            <div className="break"></div>
            <button id="recipe-search" type="submit">Find Recipes</button>
        </form>
        </>
    )
}