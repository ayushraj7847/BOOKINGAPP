import axios from "axios";
import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://stayvora-backend.onrender.com/api";

const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const fullURL = `${API_URL}${URL}`;

        console.log("FETCH URL:", fullURL);

        const res = await axios.get(fullURL, {
          withCredentials: true,
        });

        console.log("API RESPONSE:", res.data);

        setData(res.data);
        setError(null);
      } catch (error) {
        console.log(
          "FETCH ERROR:",
          error.response?.data || error.message
        );

        console.log(
          "STATUS:",
          error.response?.status
        );

        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [URL]);

  const reFetch = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${API_URL}${URL}`,
        {
          withCredentials: true,
        }
      );

      setData(res.data);
      setError(null);
    } catch (error) {
      console.log(
        "REFETCH ERROR:",
        error.response?.data || error.message
      );

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    reFetch,
  };
};

export default useFetch;