import { FC } from "react";
import { FormikProvider, useFormik } from "formik";
import EventFields from "../../../shared/EventForm/Components/EventFields";
import { omit } from "lodash";
import { IEvent } from "../../../interfaces/event";

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
  readOnly?: boolean;
}

const EventDetails: FC<IEventDetails> = ({ eventData, readOnly }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...(eventData || initialValues), organizerInEvent: false },
    onSubmit: values => {
      onEditEvent(omit(values, ['creatingDate', 'persons']));
    }
  });

  const onEditEvent = (values: any) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    // @ts-ignore
    fetch(`${API}Events/${eventId}/Edit`, requestOptions)
      .then(response => response.json())
  }

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <EventFields
          values={formik.values}
          handleChange={formik.handleChange}
          setFieldValue={formik.setFieldValue}
          readOnly={readOnly}
        />
        <div className="end">
          {
            !readOnly && <button type="submit">Save</button>
          }
        </div>
      </form>
    </FormikProvider>
  )
}
export default EventDetails;