import { Link } from "react-router-dom"

export default function Navigation() {
    return (
        <>
            <nav>
                <p><Link to={'/home'}>Home</Link></p>
                <p><Link to={'/favorites'}>Favorites</Link></p>
                <p><Link to={'/meal_planner'}>Meal Planner</Link></p>
                <p><Link to={'/'}>Log Out</Link></p>
            </nav>
        </>
    )
}