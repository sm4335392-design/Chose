import axios from "axios";
import { useState } from "react";

function Gallery() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState(1); 

  const searchImages = async (newPage = 1) => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query,
            per_page: 20,
            page: newPage, 
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_Salman}`,
          },
        }
      );

      setImages(response.data.results);
      setSearched(true);
      setPage(newPage);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const nextPage = () => {
    searchImages(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      searchImages(page - 1);
    }
  };

  return (
    <div className={`container ${theme}-mode`}>
      <h1>Image Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchImages(1); // reset to page 1
            }
          }}
        />

        <button onClick={() => searchImages(1)}>Search</button>
      </div>

      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀"}
      </button>

      {loading && <h2>Loading...</h2>}

      {!loading && searched && images.length === 0 && (
        <h2>No Images Found</h2>
      )}

      <div className="image-grid">
        {!loading &&
          images.map((image) => (
            <div className="card" key={image.id}>
              <img src={image.urls.small} alt={image.alt_description} />
            </div>
          ))}
      </div>

      
      {searched && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={prevPage} disabled={page === 1}>
            ⬅ Previous
          </button>

          <span style={{ margin: "0 10px" }}>Page {page}</span>

          <button onClick={nextPage}>Next ➡</button>
        </div>
      )}
    </div>
  );
}

export default Gallery;