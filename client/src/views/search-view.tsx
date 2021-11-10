import React from 'react';
import SearchBar from '@components/search-bar';

function SearchView() {
  // const [ary, setAry] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:3000/api')
  //     .then((data) => data.json())
  //     .then((response) => setAry(response));
  // }, []);
  return (
    <>
      <SearchBar />
    </>
  );
}

export default SearchView;
