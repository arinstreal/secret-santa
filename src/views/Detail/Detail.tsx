import React from "react";
import { useParams } from "react-router-dom";
import EventForm from "../../shared/EventForm/EventForm";
import useFetch from "../../hooks/useFetch";
import { get } from 'lodash';

const Detail = () => {
  let { eventId } = useParams();
  const { data } = useFetch({ type: 'GET', url: `Events/${eventId}` });

  return (
    <div className="card">
      {
        get(data, 'id', false) ?
          <EventForm data={data} readOnly/>
          :
          <div>Loading...</div>
      }
    </div>)
}

export default Detail;