import React, { useEffect, useState } from 'react';

function SearchView() {
  const [ary, setAry] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((data) => data.json())
      .then((response) => setAry(response));
  }, []);
  return (
    <>
      {ary.map((val) => <h1>{val}</h1>)}
    </>
  );
}

export default SearchView;
