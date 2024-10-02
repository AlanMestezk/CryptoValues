import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "./pages/NotFound";
import { Details }  from "./pages/Details";
import {Home}       from './pages/Home'
import { Layout } from "./components/Layout";

export const router = createBrowserRouter(

    [
       
        {
            element: <Layout/>,
            children: [

               {
                    path: "/",
                    element:<Home/>
               },
               {
                    path: "/detail/:crypto",
                    element:<Details/>
               },
               {
                    path: "*",
                    element:<NotFound/>
               }
            ]
        }
    ]
    
)