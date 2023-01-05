import Directory from "../../components/directory/Directory";

import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory />;
    </div>
  );
};

export default Home;
