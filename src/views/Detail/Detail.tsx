import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { get } from 'lodash';
import DrawingResultsList from "./Components/DrawingResultsList";
import { IEvent } from "../../interfaces/event";
import EventDetails from "./Components/EventDetails";
import { Loader } from "../../shared/Loader/Loader";

const Detail = () => {
  let { eventId } = useParams();
  const { responseData: event, fetchResponseData } = useFetch<IEvent>({ type: 'GET', url: `Events/${eventId}` });
  const [readOnly, setReadOnly] = useState(true);

  const handleEdit = () => {
    setReadOnly(prev => (!prev));
  }

  useEffect(() => {
    fetchResponseData();
  }, [eventId]);

  return (
    <div className="card">
      {
        get(event, 'id', false) ?
          <>
            <EventDetails eventData={event}/>
            <DrawingResultsList/>
          </>
          :
          <Loader/>
      }
      {/*{*/}
      {/*  get(event, 'id', false) ?*/}
      {/*    <EventForm data={event} readOnly={readOnly} handleEdit={handleEdit} isNew={false}/>*/}
      {/*    :*/}
      {/*    <div>Loading...</div>*/}
      {/*}*/}
    </div>)
}

export default Detail;