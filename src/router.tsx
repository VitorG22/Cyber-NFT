
import {createBrowserRouter} from 'react-router-dom'
import HomePage from './routes/HomePage.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import App from './App.tsx'
import ArtShowPage from './routes/ArtShowPage.tsx'
import MarketPlace from './routes/MarketPlace.tsx'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/',
                element: <HomePage/>
            },
            {
                path:'/ArtPreview/:id',
                element: <ArtShowPage/>
            },
            {
                path:'/MarketPlace',
                element: <MarketPlace/>
            }
        ]
    }
    
])