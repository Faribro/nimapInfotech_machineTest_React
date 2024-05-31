import React, { useEffect, useState } from "react";
import { UPCOMING_MOVIES } from "../utils/constant";
import Header from "./Header";
import Card from "./Card";


const UpcomingPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = searchQuery
      ? data.filter((item) =>
          item.original_title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data;
    setFilteredData(filtered);
  }, [data, searchQuery]);

  async function fetchData() {
    try {
      const response = await fetch(UPCOMING_MOVIES);
      const result = await response.json();
      setData(result.results);
      setFilteredData(result.results);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container-fluid background-animation"> {/* Add background animation class */}
      <Header onSearch={handleSearch} />
      <div className="container"> {/* Wrap content inside a container for proper alignment */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-4">
          {filteredData.map((item) => (
            <div className="col mb-4" key={item.id}>
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingPage;
