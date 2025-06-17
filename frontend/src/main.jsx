import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import { AuthContextProvider } from './context/AuthContext.jsx';

import Register from "./routes/Register.jsx"
import Login from "./routes/Login.jsx"
import EditUser from "./routes/EditUser.jsx"
import Home from "./routes/Home.jsx"

//privateRoute 
import PrivateRoute from './privateRoutes/PrivateRoute.jsx';

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
   children:[
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
     {
      path: "/login",
      element: <Login/>,
    },
     {
      path: "/edit",
      element: (
        <PrivateRoute>
          <EditUser/>
        </PrivateRoute>
      ),
    },
    
   ]



},




])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  </StrictMode>,
)
