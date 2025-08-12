import { useRef, useState } from "react";
import { useEffect } from "react";
import { useFilter } from "../context/FilterContext";
import "../App.css";

function Chips() {
  const { filterCategories, selectedCategory, setSelectedCategory, setFilteredVideos } = useFilter();
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const scrollContainerRef = useRef(null);

  // Function to handle category selection and filter videos
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    
    if (category === "All") {
      setFilteredVideos([]);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/videos");
      const videos = await res.json();
      const videosData = videos.data || [];
      
      // Filter videos by category (checking tags and title)
      const filteredVideos = videosData.filter((video) => {
        const title = video.title.toLowerCase();
        const tags = video.tags ? video.tags.map(tag => tag.toLowerCase()) : [];
        const categoryLower = category.toLowerCase();
        
        // Special handling for Movies category to include trailer videos
        if (category === "Movies") {
          // Check if video title or tags contain "movie", "film", "cinema", etc.
          const movieKeywords = ["movie", "film", "cinema", "theater", "box office"];
          const hasMovieContent = movieKeywords.some(keyword => 
            title.includes(keyword) || tags.some(tag => tag.includes(keyword))
          );
          
          // Check if video has trailer-related tags
          const trailerKeywords = ["trailer", "official trailer", "teaser", "preview", "sneak peek"];
          const hasTrailerContent = trailerKeywords.some(keyword => 
            title.includes(keyword) || tags.some(tag => tag.includes(keyword))
          );
          
          // Include videos that are either movie-related OR have trailer tags
          return hasMovieContent || hasTrailerContent;
        }
        
        // For other categories, check if video title or tags contain the selected category
        return title.includes(categoryLower) || tags.some(tag => tag.includes(categoryLower));
      });
      
      setFilteredVideos(filteredVideos);
    } catch (error) {
      console.error("Error filtering videos:", error);
      setFilteredVideos([]);
    }
  };

  // Functionality for sliding chips:-
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
    setShowLeftBtn(true)
  };

  return (
    <>
      <div className="w-full h-[56px] flex items-center gap-2.5 px-1.5 relative">
        {showLeftBtn && (
          <button
            type="button"
            onClick={scrollLeft}
            className="absolute left-0.5 z-10 hover:cursor-pointer hover:bg-slate-300 bg-slate-200 px-1.5 py-0.5 rounded-lg"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        )}

        <div className="w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scroll-smooth no-scrollbar whitespace-nowrap"
          >
            {filterCategories.map((category, index) => (
              <span
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`whitespace-nowrap px-2.5 py-1 text-sm rounded-lg hover:cursor-pointer transition-colors ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {showRightBtn && (
          <button
            type="button"
            onClick={scrollRight}
            className="absolute right-0.5 z-10 hover:cursor-pointer hover:bg-slate-300 bg-slate-200 px-1.5 py-0.5 rounded-lg"
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        )}
      </div>
    </>
  );
}

export default Chips;
