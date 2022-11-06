import React, { FC, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { get } from "lodash";
import { IDrawingResult } from "../../../interfaces/drawingResults";

const DrawingResultsList: FC = () => {
  let { eventId } = useParams();
  const { fetchResponseData, responseData } = useFetch<IDrawingResult[]>({
    type: 'GET',
    url: `Events/${eventId}/DrawingResults`
  });

  function handleDraw() {
    fetchResponseData();
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
    if (eventId) fetchResponseData()
  }, [eventId, fetchResponseData]);

  if (!responseData?.[0]) return (
    <div>
      <button onClick={handleDraw}>Losuj</button>
    </div>
  )
  else return (
    <div>
      <h2>List of drawing results</h2>
      {
        (responseData || []).map(item => <Link
          to={`/drawing-result/${get(item, 'id')}`}>{get(item, 'giverName')}, </Link>)
      }
    </div>
  )
}

export default DrawingResultsList;