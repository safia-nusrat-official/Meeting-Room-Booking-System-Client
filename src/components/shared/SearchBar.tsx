import Search, { SearchProps } from "antd/es/input/Search";
import React from "react";

const SearchBar = ({
  setSearchTerm,
}: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSearch: SearchProps["onSearch"] = (value, _e) =>
    setSearchTerm(value);

  return (
    <Search size="large" allowClear placeholder="Search Rooms" onSearch={handleSearch} />
  );
};

export default SearchBar;
