import axios from "axios";
import { useState } from "react";

function Gallery() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // loading state

  const searchImages = async () => {
    setLoading(true); // loading start

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: query, per_page: 20 },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_Salman}`,
          },
        }
      );

      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <h1>Image Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchImages}>Search</button>
      </div>

      {/* Task 1: Loading State */}
      {loading && <h2>Loading...</h2>}

      <div className="image-grid">
        {!loading &&
          images.map((image) => (
            <div className="card" key={image.id}>
              <img
                src={image.urls.small}
                alt={image.alt_description}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Gallery;