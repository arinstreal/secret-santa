import { FieldArray, useFormik, Field, FormikProvider } from "formik";
import { IEvent } from "../../../interfaces/event";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import PersonField from "./PersonField";

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

const EventForm = () => {

  useEffect(() => {
    // fetch(API, {
    //   "method": "GET",
    // })
    //   .then(response => response.json())
    //   .catch(err => { console.log(err);
    //   });
  }, []);

  const formik = useFormik({
    initialValues: { ...initialValues },
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
      <label htmlFor="organizerName">Organizer name</label>
      <input
        id="organizerName"
        onChange={formik.handleChange}
        value={formik.values.organizerName}
      />
      <label htmlFor="organizerEmail">Organizer email</label>
      <input
        id="organizerEmail"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.organizerEmail}
      />
      <label htmlFor="eventName">Event name</label>
      <input
        id="eventName"
        type="eventName"
        onChange={formik.handleChange}
        value={formik.values.eventName}
      />
      <label htmlFor="eventName">Data zakończenia</label>
      <DatePicker
        selected={formik.values.endDate}
        onChange={date => formik.setFieldValue('endDate', date)}
      />
      <label htmlFor="eventName">Budget</label>
      <input
        id="budget"
        type="number"
        min={0}
        onChange={formik.handleChange}
        value={formik.values.budget}
      />
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        onChange={formik.handleChange}
        value={formik.values.message}
      />
      <FormikProvider value={formik}>
        <FieldArray
          name="persons"
          render={arrayHelpers => (
            <div>
              {
                formik.values.persons.map((person, index) => (
                  <PersonField
                    key={index}
                    person={formik.values.persons[index]}
                    prefixName={`persons.${index}.`}
                    onChange={formik.handleChange}
                  />

                ))
              }
            </div>
          )
          }
        />
      </FormikProvider>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventForm;