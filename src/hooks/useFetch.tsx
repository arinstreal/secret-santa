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

  const fetchData = ()=> {
    setLoading(true);
    fetch(`${API}${url}`, {
      method: type,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }

  return {
    data, error, loading, fetchData
  }
}