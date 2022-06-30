import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url) => {
      setIsLoading(true);

      try {
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData(dataUrl);
  }, [dataUrl]);

  return { data, error, isLoading };
}

export default useAxiosFetch;