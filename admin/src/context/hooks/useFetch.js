import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://stayvora-backend.onrender.com/api";
  
const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${API_URL}${URL}`,
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
        error.response?.data || error.message
      );

      setError(error);
      setData([]);
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