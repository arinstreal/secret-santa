import { useEffect, useState } from "react";
const API = 'https://webapp-220201114916.azurewebsites.net/';

interface IUseFetch {
  type: 'GET' | 'PUT' | 'POST',
  url: string,
  body?: any
}

export default function useFetch({ type, url, body }: IUseFetch) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}${url}`, {
      method: type,
      body: body
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url, type]);
  return {
    data, error, loading
  }
}