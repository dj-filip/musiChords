import { BACKEND_URL } from "@config/serverConfig"


const useSearch = () => {

  const searchData = async (searchItem) => {
    const response = await fetch(`${BACKEND_URL}/songs`);
    
    const data = await response.json();

    console.log(data)

    return data;

  }

  return { searchData }

}

export default useSearch;