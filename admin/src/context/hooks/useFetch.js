import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8800/api${URL}`,
        {
          withCredentials: true,
        }
      );

      console.log("API RESPONSE:", res.data);

      setData(res.data);
      setError(null);
    } catch (error) {
      console.log(
        "FETCH ERROR:",
        error.response?.data || error
      );

      setError(error);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reFetch = async () => {
    await fetchData();
  };

  return {
    data,
    loading,
    error,
    reFetch,
  };
};

export default useFetch;