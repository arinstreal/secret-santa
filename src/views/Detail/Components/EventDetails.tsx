import { FC, MouseEvent, useEffect, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import EventFields from "../../../shared/EventForm/Components/EventFields";
import { IEvent } from "../../../interfaces/event";
import useFetch from "../../../hooks/useFetch";
import { IDrawingResult } from "../../../interfaces/drawingResults";
import { useParams } from "react-router-dom";

const initialValues: IEvent = {
  organizerName: '',
  organizerEmail: '',
  name: '',
  endDate: null,
  budget: 0,
  message: ''
}

interface IEventDetails {
  eventData?: IEvent;
}

const EventDetails: FC<IEventDetails> = ({ eventData }) => {
  let { eventId } = useParams();
  const [readOnly, setReadOnly] = useState(true);
  const { fetchResponseData: editEvent, success } = useFetch<IDrawingResult[]>({
    type: 'PUT',
    url: `Events/${eventId}/Edit`
  });

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setReadOnly(prev => (!prev));
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...(eventData || initialValues), organizerInEvent: false },
    onSubmit: values => {
      const { name, endDate, budget, message } = values;
      editEvent({ name, date: endDate, budget, message });
    }
  });

  useEffect(() => {
    if (success) {
      setReadOnly(true);
    }
  }, [success]);
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <EventFields
          readOnly={readOnly}
        />
        <div className="end">
          {
            !readOnly ?
              <button type="submit">Save</button> :
              <button onClick={handleEdit} type="button">Edit</button>
          }
        </div>
      </form>
    </FormikProvider>
  )
}
export default EventDetails;