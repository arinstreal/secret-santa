import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { get } from 'lodash';
import DrawingResultsList from "./Components/DrawingResultsList";
import { IEvent } from "../../interfaces/event";
import EventDetails from "./Components/EventDetails";
import { Loader } from "../../shared/Loader/Loader";
import PersonsDetails from "./Components/PersonsDetails";

const Detail = () => {
  let { eventId } = useParams();
  const { responseData: event, fetchResponseData } = useFetch<IEvent>({ type: 'GET', url: `Events/${eventId}` });

  useEffect(() => {
    fetchResponseData();
  }, [eventId]); // eslint-disable-line react-hooks/exhaustive-deps

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
      {
        get(event, 'id', false) ?
          event?.persons && <PersonsDetails persons={event?.persons}/>
          :
          <Loader/>
      }
    </div>)
}

export default Detail;