
import { Navigate, createBrowserRouter } from 'react-router-dom'
import HomePage from './routes/HomePage.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import App from './App.tsx'
import ArtShowPage from './routes/ArtShowPage.tsx'
import MarketPlace from './routes/MarketPlace.tsx'
import LoginPage from './routes/LoginPage.tsx'
import RegisterPage from './routes/RegisterPage.tsx'
import PageEstructure from './routes/pageEstructureNavBar.tsx'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <PageEstructure />,
                children: [
                    {
                        path: '/',
                        element: <Navigate to={'/Login'} />
                    },
                    {
                        path: '/Home',
                        element: <HomePage />
                    },
                    {
                        path: '/ArtPreview/:id',
                        element: <ArtShowPage />
                    },
                    {
                        path: '/MarketPlace',
                        element: <MarketPlace />
                    }
                ]
            },
            {
                path: '/Login',
                element: <LoginPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/Register',
                element: <RegisterPage />,
                errorElement: <ErrorPage />,
            }

        ]
    }

])

// export const router = createBrowserRouter([
//     {
//         path: 'Cyber-NFT/',
//         element: <App />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: '/Cyber-NFT/',
//                 element: <PageEstructure />,
//                 children: [
//                     {
//                         path: '/Cyber-NFT/',
//                         element: <Navigate to={'/Cyber-NFT/Login'} />
//                     },
//                     {
//                         path: '/Cyber-NFT/Home',
//                         element: <HomePage />
//                     },
//                     {
//                         path: '/Cyber-NFT/ArtPreview/:id',
//                         element: <ArtShowPage />
//                     },
//                     {
//                         path: '/Cyber-NFT/MarketPlace',
//                         element: <MarketPlace />
//                     }
//                 ]
//             },
//             {
//                 path: '/Cyber-NFT/Login',
//                 element: <LoginPage />,
//                 errorElement: <ErrorPage />,
//             },
//             {
//                 path: '/Cyber-NFT/Register',
//                 element: <RegisterPage />,
//                 errorElement: <ErrorPage />,
//             }

//         ]
//     }

// ])