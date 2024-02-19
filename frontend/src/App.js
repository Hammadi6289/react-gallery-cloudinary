import { useState } from "react";
import "./App.css";
import images from "./api.mock.json";

const App = () => {
  const [imageList, setImageList] = useState(images.resources);
  return (
    <div className="image-grid">
      {imageList.map((image) => (
        <img src={image.url} alt="image.public_id"></img>
      ))}
    </div>
  );
};

export default App;
