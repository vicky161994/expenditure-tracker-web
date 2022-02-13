import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/layouts/Header.jsx";
import Footer from "./components/layouts/Footer.jsx";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderDetail from "./pages/OrderDetail";
import { useSelector } from "react-redux";
import Helper from "./Helper";
import { useState } from "react";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const [pendingTask, setPendingTask] = useState([]);
  const { user } = userLogin;
  window.addEventListener("online", () => {
    setTimeout(function () {
      setPendingTask(
        localStorage.getItem("pendingTask")
          ? JSON.parse(localStorage.getItem("pendingTask"))
          : []
      );
    }, 10000);
  });
  window.addEventListener("offline", () => {
    console.log("offline");
  });
  return (
    <BrowserRouter>
      <Header />
      {navigator.onLine && <Helper />}
      <main>
        <Route path="/" component={user ? Homepage : Login} exact />
        <Route path="/login" component={Login} exact />

        <Route path="/cart" component={Cart} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/account" component={Account} exact />
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/payment" component={Payment} exact />
        <Route path="/order-history" component={OrderDetail} exact />

        <Route
          path="/product/:category/:title/:id"
          component={ProductDetail}
          exact
        />
      </main>
      <Footer pathName={window.location.pathname} />
    </BrowserRouter>
  );
}

export default App;
