

const filterSearchByName = (data, search) => {
  if (!search.trim()) return []; // If no search input, return

    //Find artistName either at the start of the string or right after a space, case-insensitive.
    const regex = new RegExp(`(^|\\s)${search}`, 'i');

    const filteredData = data.filter(data => {
      return regex.test(data.name);
    });


    if (!filteredData.length) {
      return [];
    } else {
      return filteredData;
    }
}

export default filterSearchByName;