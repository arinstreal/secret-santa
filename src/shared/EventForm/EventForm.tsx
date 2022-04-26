import { FormikProvider, useFormik } from "formik";
import { IEvent } from "../../interfaces/event";
import { FC } from "react";
import PersonsFields from "./Components/PersonsFields";
import { useParams } from "react-router-dom";
import { omit } from "lodash";
import EventFields from "./Components/EventFields";
import useFetch from "../../hooks/useFetch";
import { IPerson } from "../../interfaces/person";
import Button  from "@mui/material/Button";
import { Checkbox, FormControlLabel } from "@mui/material";

const initialValues: IEvent = {
  organizerName: '',
  organizerEmail: '',
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
    const { fetchResponseData: createEvent } = useFetch<IPerson[]>({
      type: 'PUT',
      url: `Events`
    });
    const { fetchResponseData: editEvent } = useFetch<IPerson[]>({
      type: 'PUT',
      url: `Events/${eventId}/Edit`
    });

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: { ...(data || initialValues), organizerInEvent: false },
      onSubmit: values => {
        isNew ? onCreateNew(values) : editEvent(omit(values, 'creatingDate'));
      }
    });

    const onCreateNew = (values: any) => {
      const entity = {
        ...values
      }
      if (values.organizerInEvent) {
        entity.persons.push({ name: values.organizerName, email: values.organizerEmail });
      }
      createEvent(entity);
    };

    return (
      <>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <EventFields
              readOnly={readOnly}
              isNew={isNew}
            />
            <FormControlLabel name="organizerInEvent" control={<Checkbox />} label="Czy organizator bierze udział w losowaniu?" />
            <PersonsFields
              readOnly={readOnly}
              isNew={isNew}
              persons={formik.values.persons}
              handleChange={formik.handleChange}
            />
            <div className="end">
              {
                !readOnly && <Button variant="contained" color="primary" type="submit">Wyślij</Button>
              }
            </div>
          </form>
        </FormikProvider>
        {
          readOnly &&
            <div className="end">
                <Button variant="contained" color="primary" onClick={handleEdit} type="button">Edytuj</Button>
            </div>
        }
      </>
    );
  }
;

export default EventForm;