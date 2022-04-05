import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EventForm from "../../shared/EventForm/EventForm";
import useFetch from "../../hooks/useFetch";
import { get } from 'lodash';

const Detail = () => {
  let { eventId } = useParams();
  const { data } = useFetch({ type: 'GET', url: `Events/${eventId}` });
  const [readOnly, setReadOnly] = useState(true);

  const handleEdit = () => {
    setReadOnly(prev => (!prev));
  }
  return (
    <div className="card">
      {
        get(data, 'id', false) ?
          <EventForm data={data} readOnly={readOnly} handleEdit={handleEdit} isNew={false}/>
          :
          <div>Loading...</div>
      }
    </div>)
}

export default Detail;