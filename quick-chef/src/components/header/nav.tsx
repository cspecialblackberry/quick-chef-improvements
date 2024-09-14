import { Link } from "react-router-dom"

export default function Navigation() {
    return (
        <>
            <nav>
                <Link to={'/home'}>Home</Link>
                <Link to={'/favorites'}>Favorites</Link>
                <Link to={'/meal_planner'}>Meal Planner</Link>
            </nav>
        </>
    )
}