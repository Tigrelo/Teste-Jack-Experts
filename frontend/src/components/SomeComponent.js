// src/components/SomeComponent.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Importe a configuração do axios

const SomeComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/protected/some-endpoint'); // Substitua pelo endpoint real
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default SomeComponent;