import { useEffect, useState } from 'react';
import axios from 'axios';

//custom hook for fetching data from a given URL
const useFetch = (url) => {
    //state to store retrieved data
    const [data, setData] = useState([]);
    //state to manage loading status
    const [loading, setLoading] = useState(false);
    //state to handle any errors during fetch
    const [error, setError] = useState(false);

    //useEffect to fetch data when component mounts or url changes
   useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Setting loading to true before the fetch starts
      try {
        const res = await axios.get(url); // Making a GET request to the provided URL
        setData(res.data); // Storing the response data in state
      } catch (err) {
        setError(err); // Storing any errors that occur during the fetch
      }
      setLoading(false); // Setting loading to false after the fetch completes
    };

    fetchData(); // Calling the fetch function
  }, [url]); // Dependency array to refetch data when the URL changes
  // Function to manually refetch the data
  const reFetch = async () => {
    setLoading(true); // Setting loading to true before the fetch starts
    try {
      const res = await axios.get(url); // Making a GET request to the provided URL
      setData(res.data); // Storing the response data in state
    } catch (err) {
      setError(err); // Storing any errors that occur during the fetch
    }
    setLoading(false); // Setting loading to false after the fetch completes
  };

  // Returning the state and the refetch function
  return { data, loading, error, reFetch };
};

export default useFetch;