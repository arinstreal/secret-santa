import { Field, FormikProvider, useFormik } from "formik";
import { IEvent } from "../../interfaces/event";
import { FC } from "react";
import PersonsFields from "./Components/PersonsFields";
import { useParams } from "react-router-dom";
import { omit } from "lodash";
import EventFields from "./Components/EventFields";

const API = 'https://webapp-220201114916.azurewebsites.net/';

const initialValues: IEvent = {
  organizerName: '',
  organizerEmail: '',
  eventName: '',
  name: '',
  endDate: null,
  budget: 0,
  message: '',
  persons: [{ name: '', email: '' }]
}

interface IEventForm {
  data?: IEvent | null;
  readOnly?: boolean;
  isNew?: boolean;
  handleEdit?: () => void;
}

const EventForm: FC<IEventForm> = ({ data, readOnly, isNew, handleEdit }) => {
  let { eventId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...(data || initialValues), organizerInEvent: false },
    onSubmit: values => {
      isNew ? onCreateNew(values) : onEditEvent(omit(values, 'creatingDate'));
    }
  });

  const onCreateNew = (values: any) => {
    const entity = {
      ...values
    }
    if (values.organizerInEvent) {
      entity.persons.push({ name: values.organizerName, email: values.organizerEmail });
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entity)
    };

    // @ts-ignore
    fetch(`${API}Events`, requestOptions)
      .then(response => response.json())
    // .then(data => setPostId(data.id));
    alert(JSON.stringify(entity, null, 2));
  }

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
    // .then(data => setPostId(data.id));
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <EventFields
            values={formik.values}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            readOnly={readOnly}
            isNew={isNew}
          />
          <label>
            <Field type="checkbox" name="organizerInEvent" disabled={readOnly}/>
            Czy organizator bierze udział w losowaniu?
          </label>
          <PersonsFields readOnly={readOnly} isNew={isNew} persons={formik.values.persons}
                         handleChange={formik.handleChange}/>
          <div className="end">
            {
              !readOnly && <button type="submit">Submit</button>
            }
          </div>
        </form>
      </FormikProvider>
      {
        readOnly && <div className="end">
              <button onClick={handleEdit} type="button">Edit</button>
          </div>
      }
    </>
  );
};

export default EventForm;