import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventForm from "../../shared/EventForm/EventForm";
import useFetch from "../../hooks/useFetch";
import { get } from 'lodash';

const Detail = () => {
  let { eventId } = useParams();
  const { data, fetchData } = useFetch({ type: 'GET', url: `Events/${eventId}` });
  const [readOnly, setReadOnly] = useState(true);

  const handleEdit = () => {
    setReadOnly(prev => (!prev));
  }

  function handleDraw(){
    fetchData();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    // @ts-ignore
    fetch(`https://webapp-220201114916.azurewebsites.net/Events/${eventId}/DrawingResults`, requestOptions)
      .then(response => response.json())
  }

  useEffect(() => {
    fetchData();
  }, [eventId]);

  return (
    <div className="card">
      {
        get(data, 'id', false) ?
          <EventForm data={data} readOnly={readOnly} handleEdit={handleEdit} isNew={false}/>
          :
          <div>Loading...</div>
      }
      <div>
        <button onClick={handleDraw}>Losuj</button>
      </div>
    </div>)
}

export default Detail;