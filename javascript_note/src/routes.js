//Aqui será feito a transição entre as telas

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
  } from "react-router-dom";

import HomeScreen from './screens/home';
import RegisterScreen from './screens/auth/register';
import LoginScreen from './screens/auth/login';
import NotesIndexScreen from './screens/notes/index';
import UserEditScreen from './screens/users/edit';



const App = () => {
    let routes = useRoutes([
      { path: "/", element: <HomeScreen/> },
      { path: "/register", element: <RegisterScreen/> },
      { path: "/login", element: <LoginScreen/> },
      { path: "/notes", element: <NotesIndexScreen/> },
      { path: "/users/edit", element: <UserEditScreen/> }
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