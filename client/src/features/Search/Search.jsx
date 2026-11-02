import { useState } from "react";
import useSearch from "./hooks/useSearch";


function Search() {

  const [searchItem, setSearchItem] = useState('');

  const { searchData } = useSearch();

  searchData(searchItem)

  return (
    <div>
      <input 
        type="search" 
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        />
    </div>
  )

}

export default Search;