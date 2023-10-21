import { useState } from "react";

const API = 'https://app-giftgivinggenerator-prod-poland.azurewebsites.net/';

interface IUseFetch {
  type: 'GET' | 'PUT' | 'POST',
  url: string
}

export default function useFetch< T = unknown>({ type, url}: IUseFetch) {
  const [responseData, setResponseData] = useState<T>();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResponseData = (body?: any) => {
    setLoading(true);
    setSuccess(null);
    fetch(`${API}${url}`, {
      method: type,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if(response.ok)setSuccess(true);
        return response.json()
      })
      .then(data => setResponseData(data))
      .catch(err => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }

  return {
    responseData, error, success, loading, fetchResponseData
  }
}