import Home from "./routes/home/Home";

import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation";
import SignIn from "./routes/sign-in/SignIn";

const Shop = () => {
  return (
    <div>
      <h1>I am the Shop</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Below is demonstrated multiple routes for same page
      {["/", "/home"].map((path, index) => (
        <Route path={path} element={<Home />} key={index} />
      ))}
      */}
      <Route path={"/"} element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
