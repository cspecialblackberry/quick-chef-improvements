import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import * as React from 'react'
import App from './App.tsx'
import Home from './pages/home.tsx'
import Favorites from './pages/favorites.tsx';
import MealPlanner from './pages/mealPlanner.tsx';
import Login from './pages/login.tsx';
import './reset.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <React.StrictMode>
        <App/>
      </React.StrictMode>,
    // errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/meal_planner',
        element: <MealPlanner />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
