import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import NewList from "./pages/newList/NewList";
import { useEffect } from "react";
import { auth } from "./context/authContext/apiCalls";
import CastList from "./pages/castList/CastList";
import NewCast from "./pages/newCast/NewCast";
import Cast from "./pages/cast/Cast";

function App() {
  const { isAuth, dispatch } = useContext(AuthContext);

  useEffect(() => {
    auth(dispatch);
  }, []);

  return (
    <Router>
      <Switch>
        {!isAuth ? (
          <>
            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect to="/login" />
          </>
        ) : (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <ProductList />
              </Route>
              <Route path="/casts">
                <CastList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/cast/:castId">
                <Cast />
              </Route>
              <Route path="/newmovie">
                <NewProduct />
              </Route>
              <Route path="/newcast">
                <NewCast />
              </Route>
              <Route path="/lists">
                <ListList />
              </Route>
              <Route path="/newlist">
                <NewList />
              </Route>
              <Route exact path="*" render={() => <Redirect to="/" />} />
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
