
import {Navigate, createBrowserRouter} from 'react-router-dom'
import HomePage from './routes/HomePage.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import App from './App.tsx'
import ArtShowPage from './routes/ArtShowPage.tsx'
import MarketPlace from './routes/MarketPlace.tsx'

console.log(window.location)

export const router = createBrowserRouter([
    {
        path: 'Cyber-NFT/',
        element: <App/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/Cyber-NFT/',
                element: <Navigate to={'/Cyber-NFT/Home'}/>
            },
            {
                path:'/Cyber-NFT/Home',
                // path:'/Home',
                element: <HomePage/>
            },
            {
                // path:'/ArtPreview/:id',
                path:'/Cyber-NFT/ArtPreview/:id',
                element: <ArtShowPage/>
            },
            {
                // path:'/MarketPlace',
                path:'/Cyber-NFT/MarketPlace',
                element: <MarketPlace/>
            }
        ]
    }
    
])