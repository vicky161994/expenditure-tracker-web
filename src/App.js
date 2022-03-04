import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/layouts/Header.jsx";
import Footer from "./components/layouts/Footer.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import { useSelector } from "react-redux";
import Helper from "./Helper";
import Item from "./pages/Item";
import ItemList from "./pages/ItemList";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  return (
    <BrowserRouter>
      <Header />
      {navigator.onLine && <Helper />}
      <main>
        <Route path="/" component={user ? Homepage : Login} exact />
        <Route path="/login" component={Login} exact />
        <Route
          path="/:type/:groupId"
          component={user ? ItemList : Login}
          exact
        />
        <Route
          path="/:type/:groupId/:bypass"
          component={user ? Item : Login}
          exact
        />
        <Route path="/signup" component={Signup} exact />
      </main>
      <Footer pathName={window.location.pathname} />
    </BrowserRouter>
  );
}

export default App;
