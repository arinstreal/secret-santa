import { useFormik } from "formik";
import { IEvent } from "../../interfaces/event";
import { FC } from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import PersonsFields from "./Components/PersonsFields";

const API = 'https://webapp-220201114916.azurewebsites.net/';

const initialValues: IEvent = {
  organizerName: '',
  organizerEmail: '',
  eventName: '',
  endDate: null,
  budget: 0,
  message: '',
  persons: [{ name: '', email: '' }]
}

interface IEventForm {
  data?: IEvent | null
  readOnly?: boolean;
}

const EventForm: FC<IEventForm> = ({ data, readOnly }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...(data || initialValues) },
    onSubmit: values => {
      const requestOptions = {
        method: 'POST',
        // mode: "cors",
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      };
      // @ts-ignore
      fetch(`${API}Events`, requestOptions)
        .then(response => response.json())
      // .then(data => setPostId(data.id));
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Event</h2>
      <InputWithLabel
        id="organizerName"
        label="Organizer name"
        handleChange={formik.handleChange}
        value={formik.values.organizerName}
        readOnly={readOnly}
      />
      <InputWithLabel
        id="organizerEmail"
        label="Organizer email"
        type="email"
        handleChange={formik.handleChange}
        value={formik.values.organizerEmail}
        readOnly={readOnly}
      />
      <InputWithLabel
        id="eventName"
        label="Event name"
        handleChange={formik.handleChange}
        value={formik.values.eventName}
        readOnly={readOnly}
      />
      {/*<div>*/}
      {/*  <label htmlFor="eventName">Data zakończenia</label>*/}
      {/*  <DatePicker*/}
      {/*    selected={formik.values.endDate}*/}
      {/*    onChange={date => formik.setFieldValue('endDate', date)}*/}
      {/*  />*/}
      {/*</div>*/}
      <InputWithLabel
        id="budget"
        label="Budget"
        handleChange={formik.handleChange}
        value={formik.values.budget}
        type="number"
        min={0}
        readOnly={readOnly}
      />
      <InputWithLabel
        id="message"
        label="Message"
        handleChange={formik.handleChange}
        value={formik.values.message}
        readOnly={readOnly}
      />
      <h2>Persons</h2>
      <PersonsFields formik={formik}/>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EventForm;