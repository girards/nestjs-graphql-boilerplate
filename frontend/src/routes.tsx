import React from "react"
import { Route } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home/HomePage"));
const Login = React.lazy(() => import("./pages/Auth/Login/LoginPage"));
const Signup = React.lazy(() => import("./pages/Auth/Signup/SignupPage"));
const ActivateAccount = React.lazy(() => import("./pages/Auth/ActivateAccount/ActivateAccountPage"));


const routes: { path: string, exact: boolean, renderComponent: React.FunctionComponent }[] = [
  { path: "/", exact: true, renderComponent: Home },
  { path: "/login", exact: true, renderComponent: Login },
  { path: "/signup", exact: true, renderComponent: Signup },
  { path: "/activate-account", exact: true, renderComponent: ActivateAccount },
];

export const getRoutes = () => {
  return routes.map((route) => {
    return (<Route path={route.path} component={route.renderComponent} exact={route.exact}></Route>)
  })
}