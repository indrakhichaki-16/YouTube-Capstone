import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

function FilterProvider({ children }) {
  const [searchString, setSearchString] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Limited filter categories
  const filterCategories = [
    "All",
    "Gaming",
    "Music", 
    "Movies",
    "Sports",
    "News",
    "Education",
    "Technology",
    "Comedy",
    "Cooking",
    "Travel",
    "Fashion"
  ];

  return (
    <>
      <FilterContext.Provider
        value={{
          searchString,
          setSearchString,
          filteredVideos,
          setFilteredVideos,
          selectedCategory,
          setSelectedCategory,
          filterCategories
        }}
      >
        {children}
      </FilterContext.Provider>
    </>
  );
}

const useFilter = () => {
  return useContext(FilterContext);
};

export { FilterProvider, useFilter };
