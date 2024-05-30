  import React, { useEffect, useState } from "react";
  import { URL } from "../utils/constant";
  import Header from "./Header";
  import Card from "./Card";

  const Home = () => {
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

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const result = await response.json();
        setData(result.results);
        setFilteredData(result.results);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    const handleSearch = (query) => setSearchQuery(query);

    return (
      <div className="container-fluid">
        <Header onSearch={handleSearch} />
        <main className="row mt-4">
          {filteredData.map((item) => (
            <Card {...item} key={item.id} />
          ))}
        </main>
      </div>
    );
  };

  export default Home;
