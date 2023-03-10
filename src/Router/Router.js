import { createBrowserRouter } from 'react-router-dom'
import Home from "../Pages/Home/Home";
import Log from "../Pages/Log/Log";
import Reg from "../Pages/Reg/Reg";
import Main from "../Main/Main";
import Regdone from '../Pages/Reg/Regdone';
import Profiles from '../Pages/Profile/Profiles';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddCategory from '../Dashboard/Categories/AddCategory';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Log></Log>
            },
            {
                path: "/reg",
                element: <Reg></Reg>
            },
            {
                path: "/profile/:email",
                loader: ({ params }) => fetch(`https://server-salimalsazu.vercel.app/user/${params.email}`),
                element: <Profiles></Profiles>
            },
            {
                path: '/profile/addcategory',
                element: <AddCategory></AddCategory>
            },
            {
                path: "regdone",
                element: <Regdone></Regdone>
            }
        ]
    }
])