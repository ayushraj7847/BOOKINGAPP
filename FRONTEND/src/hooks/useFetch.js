import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      console.log("FETCH URL:", `${API_URL}${URL}`);

      try {
        const res = await axios.get(`${API_URL}${URL}`, {
          withCredentials: true,
        });

        console.log("API RESPONSE:", res.data);
        setData(res.data);
      } catch (error) {
        console.log("FETCH ERROR:", error);
        console.log(
          "ERROR RESPONSE:",
          error.response?.data
        );
        setError(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [URL]);

  const reFetch = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}${URL}`, {
        withCredentials: true,
      });

      console.log("REFETCH RESPONSE:", res.data);
      setData(res.data);
    } catch (error) {
      console.log("REFETCH ERROR:", error);
      setError(error);
    }

    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;