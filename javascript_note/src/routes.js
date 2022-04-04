//Aqui será feito a transição entre as telas

import React from "react";
import {
    BrowserRouter as Router,
    useRoutes,
  } from "react-router-dom";

import HomeScreen from './screens/home';
import RegisterScreen from './screens/auth/register';
import LoginScreen from './screens/auth/login';
import NotesIndexScreen from './screens/notes/index';
import UserEditScreen from './screens/users/edit';
import PrivateRoute from "./components/auth/private_router";


const App = () => {

    let routes = useRoutes([
      { path: "/", element: <HomeScreen/> },
      { path: "/register", element: <RegisterScreen/> },
      { path: "/login", element: <LoginScreen/> },
      { path: "/notes", element:<PrivateRoute>  <NotesIndexScreen/> </PrivateRoute> },
      { path: "/users/edit", element:<PrivateRoute> <UserEditScreen/> </PrivateRoute>  }
    ]);
    return routes;
};

const AppWrapper = () => {
    return (
      <Router>
        <App />
      </Router>
    );
  };


export default AppWrapper;