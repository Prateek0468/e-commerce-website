import Home from "./routes/home/Home";

import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation";
import Authentication from "./routes/authentication/Authentication";
import Shop from "./routes/shop/Shop";

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
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
