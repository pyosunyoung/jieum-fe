import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim() === "") return navigate("/studies");
    navigate(`?query=${search.trim()}`);
  };

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="study-search">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={onCheckEnter}
      />
      <SearchIcon className="search-icon" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
