import { useEffect, useState } from "react";
import "./App.css";
//import { getImages } from "./API.JS";
//import images from "./api.mock.json";
import { getImages, searchImages } from "./api";
//import { getImages } from "./api"; // Use correct casing for the filename
//import { getImages } from "./API"; // Use correct casing for the filename

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null); //available in api for reference of next 10 images
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    };
    fetchData();
  }, []);

  const handleMoreButton = async () => {
    const responseJson = await getImages(nextCursor);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const responseJson = await searchImages(searchValue, nextCursor);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
  };

  const resetForm = async () => {
    const responseJson = await getImages();
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    setSearchValue("");
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required="required"
          placeholder="Search..."
        ></input>
        <button type="submit"> Search</button>
        <button type="button" onClick={resetForm}>
          Clear
        </button>
      </form>
      <div className="image-grid">
        {imageList.map((image) => (
          <div key={image.public_id} className="image-container">
            <img
              src={image.url}
              alt={image.public_id} // Use image public_id as alt text
            ></img>
            <p>{image.public_id}</p> {/* Display image public_id as text */}
          </div>
        ))}
        <div className="footer">
          {nextCursor && (
            <button onClick={handleMoreButton}> Load More images </button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
