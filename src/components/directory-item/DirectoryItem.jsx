import { useNavigate } from "react-router-dom";

import "./DirectoryItem.scss";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const navigateHandler = () => navigate(route);

  return (
    <div className="directory-item-container" onClick={navigateHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-item-body-container">
        <h2>{title.toUpperCase()}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
