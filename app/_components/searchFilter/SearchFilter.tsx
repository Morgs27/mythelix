import { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";

type SearchFilterProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  searchInput: any;
  handleSearch: any;
};

const SearchFilter = ({
  setLoading,
  searchInput,
  handleSearch,
}: SearchFilterProps) => {
  return (
    <div className="searchFilter fade-in-normal">
      <input
        placeholder="Search"
        ref={searchInput}
        onChange={(e) => {
          setLoading(true);
          handleSearch(e);
        }}
      />
      <div className="searchIcon">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchFilter;
